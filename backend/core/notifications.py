"""Mail to the team about a new contact request."""
import logging
import threading
from datetime import timedelta

from django.conf import settings
from django.core.mail import EmailMessage
from django.utils import timezone

from .models import ContactRequest

# More requests than this within an hour is a flood: all are still saved, but no further mail goes out.
MAILS_PER_HOUR = 20
logger = logging.getLogger(__name__)


def request_mail(item):
    """The mail for one request. "Reply" in the mail program answers the person who asked."""
    source = item.attribution
    origin = [source.get('utm_source'), source.get('utm_campaign'), source.get('gclid') and 'Google Ads', source.get('referrer')]
    details = (('Name', item.name), ('E-Mail', item.email), ('Firma', item.company), ('Telefon', item.phone),
               ('Sprache', item.locale.upper()), ('Erste Seite', source.get('landing_page')), ('Quelle', ' · '.join(filter(None, origin))))
    body = '\n'.join(f'{label}: {value}' for label, value in details if value)
    body += f'\n\n{item.message}\n\nZu den Anfragen: {settings.SITE_URL}/dashboard#leads\n'
    name = ' '.join(item.name.split())  # a line break must not reach a mail header
    return EmailMessage(f'Neue Anfrage von {name}', body, to=settings.LEADS_NOTIFY_TO, reply_to=[item.email])


def send_request_mail(item):
    try:
        request_mail(item).send()
    except Exception:  # the request is saved; trouble with the mail is worth a log entry, nothing more
        logger.exception('No mail was sent about contact request %s.', item.pk)


def notify_new_request(item):
    """Send in the background: the visitor does not wait for the mail server."""
    if not settings.LEADS_NOTIFY_TO:
        return
    if ContactRequest.objects.filter(created_at__gte=timezone.now() - timedelta(hours=1)).count() > MAILS_PER_HOUR:
        logger.warning('Over %s contact requests within an hour: no mail about request %s.', MAILS_PER_HOUR, item.pk)
        return
    threading.Thread(target=send_request_mail, args=(item,)).start()
