from unittest.mock import patch

from django.core import mail
from django.test import TestCase, override_settings

from .models import ContactRequest
from .notifications import MAILS_PER_HOUR


class NowThread:
    """Stands in for threading.Thread so that the mail is sent before the test looks for it."""

    def __init__(self, target, args):
        self.start = lambda: target(*args)


@override_settings(LEADS_NOTIFY_TO=['team@example.com', 'boss@example.com'], SITE_URL='https://example.com')
@patch('core.notifications.threading.Thread', NowThread)
class RequestMailTests(TestCase):
    def send(self, **fields):
        payload = {'name': 'Ada Lovelace', 'email': 'ada@example.com', 'message': 'We need an ERP.', 'locale': 'en', 'consent': True,
                   'attribution': {'landing_page': '/en/industries', 'utm_source': 'google', 'gclid': 'x'}, **fields}
        return self.client.post('/api/contact/', payload, content_type='application/json')

    def test_the_team_is_told_and_can_answer_directly(self):
        self.assertEqual(self.send(company='Engines Ltd').status_code, 201)

        message = mail.outbox[0]
        self.assertEqual((message.to, message.reply_to), (['team@example.com', 'boss@example.com'], ['ada@example.com']))
        self.assertEqual(message.subject, 'Neue Anfrage von Ada Lovelace')
        for text in ('Firma: Engines Ltd', 'Erste Seite: /en/industries', 'Quelle: google · Google Ads', 'We need an ERP.',
                     'https://example.com/dashboard#leads'):
            self.assertIn(text, message.body)
        self.assertNotIn('Telefon', message.body)

    def test_a_line_break_in_the_name_does_not_stop_the_mail(self):
        self.send(name='Ada\r\nBcc: someone@example.com')

        self.assertEqual(mail.outbox[0].subject, 'Neue Anfrage von Ada Bcc: someone@example.com')
        self.assertEqual(mail.outbox[0].bcc, [])

    @override_settings(LEADS_NOTIFY_TO=[])
    def test_without_a_recipient_nothing_is_sent(self):
        self.assertEqual(self.send().status_code, 201)
        self.assertEqual(mail.outbox, [])

    def test_a_failing_mail_server_does_not_lose_the_request(self):
        with patch('django.core.mail.EmailMessage.send', side_effect=OSError('unreachable')), self.assertLogs('core.notifications', 'ERROR'):
            self.assertEqual(self.send().status_code, 201)
        self.assertEqual(ContactRequest.objects.count(), 1)

    def test_a_flood_stops_the_mails_but_not_the_requests(self):
        with self.assertLogs('core.notifications', 'WARNING'):
            for _ in range(MAILS_PER_HOUR + 2):
                self.send()
        self.assertEqual((len(mail.outbox), ContactRequest.objects.count()), (MAILS_PER_HOUR, MAILS_PER_HOUR + 2))

    def test_spam_caught_by_the_hidden_field_sends_nothing(self):
        self.send(website='spam')
        self.assertEqual(mail.outbox, [])
