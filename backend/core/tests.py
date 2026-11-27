import importlib
import json
from datetime import timedelta
from io import StringIO
import shutil
import tempfile
from io import BytesIO

from django.contrib.auth import get_user_model
from django.core.management import call_command
from django.core.files.uploadedfile import SimpleUploadedFile
from django.test import TestCase, override_settings
from django.utils import timezone
from PIL import Image

from .models import ContactRequest, Project, ProjectScreenshot


class ProjectApiTests(TestCase):
    @classmethod
    def setUpClass(cls):
        super().setUpClass()
        cls.media_root = tempfile.mkdtemp()
        cls.media_override = override_settings(MEDIA_ROOT=cls.media_root)
        cls.media_override.enable()

    @classmethod
    def tearDownClass(cls):
        cls.media_override.disable()
        shutil.rmtree(cls.media_root, ignore_errors=True)
        super().tearDownClass()

    def setUp(self):
        self.staff = get_user_model().objects.create_user('staff', password='test-password', is_staff=True)
        self.project = Project.objects.create(
            title='Existing project', description='Description',
            category='custom-software-business-automation', stack=['Django'],
            development_time='1 week', published=True,
        )

    def project_data(self, **overrides):
        return {
            'title': 'New project', 'description': 'New description',
            'category': 'custom-software-business-automation',
            'stack': 'Django, Docker', 'development_time': '2 weeks',
            'published': 'true', **overrides,
        }

    def image(self, name, size=(2400, 1200)):
        buffer = BytesIO()
        Image.new('RGB', size, (31, 182, 196)).save(buffer, 'PNG')
        return SimpleUploadedFile(name, buffer.getvalue(), content_type='image/png')

    def test_public_list_hides_drafts(self):
        Project.objects.create(
            title='Draft', description='Hidden', category='custom-software-business-automation',
            stack=[], development_time='1 day', published=False,
        )

        response = self.client.get('/api/projects/')

        self.assertEqual(response.status_code, 200)
        self.assertEqual([project['title'] for project in response.json()['projects']], ['Existing project'])

    def test_mutations_require_staff_user(self):
        response = self.client.post('/api/projects/create/', self.project_data())

        self.assertEqual(response.status_code, 401)
        self.assertEqual(Project.objects.count(), 1)

    def test_staff_can_create_project_with_image(self):
        self.client.force_login(self.staff)

        response = self.client.post('/api/projects/create/', self.project_data(screenshots=[self.image('project.png')]))

        self.assertEqual(response.status_code, 201)
        project = Project.objects.get(title='New project')
        self.assertEqual(project.stack, ['Django', 'Docker'])
        self.assertEqual(project.screenshots.count(), 1)
        url = response.json()['project']['screenshots'][0]
        self.assertTrue(url.endswith('project.webp'))
        with Image.open(project.screenshots.get().image) as stored:
            self.assertEqual((stored.format, stored.size), ('WEBP', (1600, 800)))

    def test_invalid_image_is_rejected_without_saving(self):
        self.client.force_login(self.staff)
        broken = SimpleUploadedFile('broken.png', b'not an image', content_type='image/png')

        response = self.client.post('/api/projects/create/', self.project_data(screenshots=[broken]))

        self.assertEqual(response.status_code, 400)
        self.assertFalse(Project.objects.filter(title='New project').exists())

    def test_migration_converts_existing_png_screenshots(self):
        legacy = ProjectScreenshot.objects.create(project=self.project, image=self.image('legacy.png'))
        migration = importlib.import_module('core.migrations.0006_optimize_screenshots')

        from django.apps import apps
        migration.forwards(apps, None)

        legacy.refresh_from_db()
        self.assertTrue(legacy.image.name.endswith('.webp'))

    def test_latest_uploaded_image_is_primary(self):
        ProjectScreenshot.objects.create(project=self.project, image=self.image('old.png', (10, 10)))
        self.client.force_login(self.staff)

        response = self.client.post(
            f'/api/projects/{self.project.id}/update/',
            self.project_data(title=self.project.title, screenshots=[self.image('new.png')]),
        )

        self.assertEqual(response.status_code, 200)
        self.assertEqual(self.project.screenshots.count(), 2)
        self.assertTrue(response.json()['project']['screenshots'][0].endswith('new.webp'))

    def picture(self, name, **fields):
        return ProjectScreenshot.objects.create(project=self.project, image=self.image(name, (10, 10)), **fields)

    def save_project(self, project_id=None, **data):
        url = f'/api/projects/{project_id or self.project.id}/update/'
        return self.client.post(url, self.project_data(title=self.project.title, **data))

    def names(self, response):
        # Without the extension (uploads become WebP) and the suffix storage adds when a file name is taken.
        return [url.rsplit('/', 1)[1].split('.')[0].split('_')[0] for url in response.json()['project']['screenshots']]

    def test_own_label_and_integrations_are_saved_and_kept_when_not_sent(self):
        self.client.force_login(self.staff)

        response = self.save_project(own='true', integrations=' Afterbuy, Klarna ,')
        self.assertEqual((response.json()['project']['own'], response.json()['project']['integrations']), (True, ['Afterbuy', 'Klarna']))

        kept = self.save_project().json()['project']  # a form without these fields
        self.assertEqual((kept['own'], kept['integrations']), (True, ['Afterbuy', 'Klarna']))
        cleared = self.save_project(own='false', integrations='').json()['project']
        self.assertEqual((cleared['own'], cleared['integrations']), (False, []))

    def test_pictures_can_be_reordered_captioned_and_removed(self):
        self.client.force_login(self.staff)
        first, second, third = (self.picture(f'{name}.png') for name in ('first', 'second', 'third'))
        third.alt = {'de': 'Alt', 'fr': 'Reste'}
        third.save()

        response = self.save_project(pictures=json.dumps([
            {'id': second.id, 'alt': {'de': ' Übersicht ', 'en': 'Overview'}},
            {'id': third.id, 'alt': {'de': '', 'en': 'List'}},
            {'id': first.id, 'remove': True},
        ]))

        self.assertEqual(self.names(response), ['second', 'third'])
        self.assertEqual(response.json()['project']['screenshot_alts'], [{'de': 'Übersicht', 'en': 'Overview'}, {'en': 'List', 'fr': 'Reste'}])
        self.assertEqual(response.json()['project']['screenshot_ids'], [second.id, third.id])
        self.assertFalse(first.image.storage.exists(first.image.name))
        self.assertTrue(second.image.storage.exists(second.image.name))

    def test_new_pictures_follow_the_listed_ones_in_the_order_picked(self):
        self.client.force_login(self.staff)
        old = self.picture('old.png')

        response = self.save_project(pictures=json.dumps([{'id': old.id}]), screenshots=[self.image('a.png'), self.image('b.png')])

        self.assertEqual(self.names(response), ['old', 'a', 'b'])

    def test_a_picture_the_list_does_not_name_is_left_alone_and_foreign_ids_are_ignored(self):
        self.client.force_login(self.staff)
        mine, unnamed = self.picture('mine.png'), self.picture('unnamed.png')
        other = Project.objects.create(title='Other', description='x', stack=[], development_time='—')
        foreign = ProjectScreenshot.objects.create(project=other, image=self.image('foreign.png', (10, 10)))

        self.save_project(pictures=json.dumps([{'id': mine.id}, {'id': foreign.id, 'remove': True}, {'id': 999999}]))

        self.assertTrue(ProjectScreenshot.objects.filter(pk__in=[unnamed.pk, foreign.pk]).count() == 2)

    def test_an_invalid_picture_list_changes_nothing(self):
        self.client.force_login(self.staff)
        picture = self.picture('keep.png')
        bad = ('x', '{}', '[1]', '[{"id": "1"}]', '[{"id": true}]', json.dumps([{'id': picture.id, 'alt': {'de': 'x' * 301}}]),
               json.dumps([{'id': picture.id, 'alt': {'de': 5}}]))

        for value in bad:
            response = self.client.post(f'/api/projects/{self.project.id}/update/', self.project_data(title='Changed', pictures=value))
            self.assertEqual(response.status_code, 400, value)
        self.assertEqual((Project.objects.get(pk=self.project.id).title, self.project.screenshots.count()), ('Existing project', 1))

    def test_english_translation_is_saved_and_cleared(self):
        self.client.force_login(self.staff)
        url = f'/api/projects/{self.project.id}/update/'

        response = self.client.post(url, self.project_data(description_en='English text', stack_en='Django, Docker'))
        self.assertEqual(response.json()['project']['translations'], {'en': {'description': 'English text', 'stack': ['Django', 'Docker']}})

        self.client.post(url, self.project_data())
        self.project.refresh_from_db()
        self.assertEqual(self.project.translations, {})

    def test_seed_adds_missing_cards_and_keeps_existing_ones(self):
        from django.core.management import call_command
        Project.objects.create(title='Cashbook', description='Edited', category='finance-accounting-automation', stack=[], development_time='—', translations={'en': {'description': 'Kept'}})

        call_command('seed_portfolio', stdout=open('/dev/null', 'w'))

        self.assertEqual(Project.objects.get(title='Cashbook').translations, {'en': {'description': 'Kept'}})
        self.assertIn('en', Project.objects.get(title='Hubnity').translations)

    def test_landing_page_fields_and_unique_slug(self):
        self.client.force_login(self.staff)

        response = self.client.post('/api/projects/create/', self.project_data(
            title='Existing project', challenge='Manual work', features='Sync orders\n\n Reports ',
            results='-50 % effort', website='https://example.com', features_en='Order sync',
        ))

        project = response.json()['project']
        self.assertEqual(self.project.slug, 'existing-project')
        self.assertEqual(project['slug'], 'existing-project-2')
        self.assertEqual((project['challenge'], project['features'], project['results']), ('Manual work', ['Sync orders', 'Reports'], ['-50 % effort']))
        self.assertEqual(project['translations'], {'en': {'features': ['Order sync']}})

    def test_slug_is_kept_on_update_and_invalid_website_rejected(self):
        self.client.force_login(self.staff)
        url = f'/api/projects/{self.project.id}/update/'

        self.client.post(url, self.project_data(title='Renamed', slug=self.project.slug))
        self.assertEqual(Project.objects.get(pk=self.project.id).slug, 'existing-project')
        self.assertEqual(self.client.post(url, self.project_data(website='javascript:alert(1)')).status_code, 400)

    def places(self):
        return [(item['title'], item['position']) for item in self.client.get('/api/projects/').json()['projects']]

    def create(self, title):
        return self.client.post('/api/projects/create/', self.project_data(title=title)).json()['project']

    def move(self, project_id, body):
        return self.client.post(f'/api/projects/{project_id}/move/', body, content_type='application/json')

    def test_new_projects_go_last_and_deleting_closes_the_gap(self):
        self.client.force_login(self.staff)

        self.assertEqual(self.create('Second')['position'], 2)
        self.create('Third')
        self.client.delete(f'/api/projects/{self.project.id}/delete/')

        self.assertEqual(self.places(), [('Second', 1), ('Third', 2)])

    def test_moving_a_project_shifts_the_others(self):
        self.client.force_login(self.staff)
        self.create('Second')
        third = self.create('Third')['id']

        self.assertEqual(self.move(third, {'place': 1}).status_code, 204)
        self.assertEqual(self.places(), [('Third', 1), ('Existing project', 2), ('Second', 3)])
        self.move(third, {'place': 50})
        self.assertEqual(self.places(), [('Existing project', 1), ('Second', 2), ('Third', 3)])

    def test_move_needs_a_valid_place_and_a_staff_user(self):
        self.assertEqual(self.move(self.project.id, {'place': 1}).status_code, 401)
        self.client.force_login(self.staff)
        for body in ({}, {'place': 0}, {'place': 'abc'}, {'place': None}, [1]):
            self.assertEqual(self.move(self.project.id, body).status_code, 400, body)

    def test_saving_a_project_keeps_its_place(self):
        self.client.force_login(self.staff)
        second = self.create('Second')['id']

        self.client.post(f'/api/projects/{second}/update/', self.project_data(title='Second', position='1'))

        self.assertEqual(self.places(), [('Existing project', 1), ('Second', 2)])

    def test_migration_numbers_projects_in_the_order_the_site_showed(self):
        Project.objects.all().delete()
        for title, position, stack in (('first', 1, []), ('older', 100, []), ('concept', 100, ['Konzept']), ('newer', 100, [])):
            Project.objects.create(title=title, description='x', stack=stack, development_time='—', position=position)
        migration = importlib.import_module('core.migrations.0014_number_projects')

        from django.apps import apps
        migration.number_in_site_order(apps, None)

        self.assertEqual(list(Project.objects.values_list('title', 'position')), [('first', 1), ('newer', 2), ('older', 3), ('concept', 4)])

    def test_platforms_and_development_flag_are_saved_filtered_and_served(self):
        self.client.force_login(self.staff)
        url = f'/api/projects/{self.project.id}/update/'

        self.assertEqual(self.client.post(url, self.project_data(platforms=['mobile', 'web', 'tv'], in_development='true')).status_code, 200)
        item = self.client.get('/api/projects/').json()['projects'][0]
        self.assertEqual((item['platforms'], item['in_development']), (['web', 'mobile'], True))
        self.client.post(url, self.project_data())
        item = self.client.get('/api/projects/').json()['projects'][0]
        self.assertEqual((item['platforms'], item['in_development']), ([], False))

    def test_staff_can_delete_project(self):
        self.client.force_login(self.staff)

        response = self.client.delete(f'/api/projects/{self.project.id}/delete/')

        self.assertEqual(response.status_code, 204)
        self.assertFalse(Project.objects.filter(pk=self.project.id).exists())


class ContactApiTests(TestCase):
    def payload(self, **overrides):
        return {'name': 'Ada', 'email': 'ada@example.com', 'message': 'We need an ERP.', 'locale': 'en', 'consent': True,
                'attribution': {'utm_source': 'google', 'gclid': 'abc', 'unknown': 'dropped'}, **overrides}

    def post(self, payload):
        return self.client.post('/api/contact/', payload, content_type='application/json')

    def test_valid_request_is_stored_with_known_attribution_only(self):
        self.assertEqual(self.post(self.payload()).status_code, 201)
        lead = ContactRequest.objects.get()
        self.assertEqual((lead.email, lead.locale), ('ada@example.com', 'en'))
        self.assertEqual(lead.attribution, {'utm_source': 'google', 'gclid': 'abc'})

    def test_invalid_email_and_missing_consent_are_rejected(self):
        self.assertEqual(self.post(self.payload(email='nope')).json()['fields'], ['email'])
        self.assertEqual(self.post(self.payload(consent=False)).status_code, 400)
        self.assertFalse(ContactRequest.objects.exists())

    def test_honeypot_is_silently_ignored(self):
        self.assertEqual(self.post(self.payload(website='spam')).status_code, 201)
        self.assertFalse(ContactRequest.objects.exists())

    def test_leads_are_staff_only(self):
        self.post(self.payload())
        self.assertEqual(self.client.get('/api/contact-requests/').status_code, 401)
        self.client.force_login(get_user_model().objects.create_user('staff', password='pw', is_staff=True))
        self.assertEqual(self.client.get('/api/contact-requests/').json()['requests'][0]['name'], 'Ada')


class ContactManagementTests(TestCase):
    def setUp(self):
        self.staff = get_user_model().objects.create_user('staff', password='pw', is_staff=True)
        self.lead = ContactRequest.objects.create(name='Ada', email='ada@example.com', message='x')

    def update(self, body):
        return self.client.post(f'/api/contact-requests/{self.lead.id}/update/', body, content_type='application/json')

    def test_changes_need_a_staff_user(self):
        self.assertEqual(self.update({'status': 'client'}).status_code, 401)
        self.assertEqual(self.client.delete(f'/api/contact-requests/{self.lead.id}/delete/').status_code, 401)
        self.assertEqual(ContactRequest.objects.get().status, 'new')

    def test_status_and_note_are_saved_separately_and_dated(self):
        self.client.force_login(self.staff)
        self.assertEqual(self.update({'status': 'new'}).status_code, 200)
        self.assertIsNone(ContactRequest.objects.get().marked_at)  # nothing changed: no new date

        self.assertEqual(self.update({'status': 'active'}).status_code, 200)
        response = self.update({'note': '  Called, wants an offer.  '})

        self.assertEqual((response.json()['request']['status'], response.json()['request']['note']), ('active', 'Called, wants an offer.'))
        self.assertIsNotNone(ContactRequest.objects.get().marked_at)
        listed = self.client.get('/api/contact-requests/').json()['requests'][0]
        self.assertEqual((listed['status'], listed['note']), ('active', 'Called, wants an offer.'))

    def test_invalid_changes_are_rejected(self):
        self.client.force_login(self.staff)
        for body in ({}, {'status': 'done'}, {'status': 1}, {'note': None}, {'note': 'x' * 2001}, {'name': 'Eve'}, [1]):
            self.assertEqual(self.update(body).status_code, 400, body)
        self.assertEqual(list(ContactRequest.objects.values_list('name', 'status', 'note')), [('Ada', 'new', '')])

    def test_staff_can_delete_a_request(self):
        self.client.force_login(self.staff)
        self.assertEqual(self.client.delete(f'/api/contact-requests/{self.lead.id}/delete/').status_code, 204)
        self.assertFalse(ContactRequest.objects.exists())


class PurgeRequestsTests(TestCase):
    def test_only_requests_older_than_the_retention_period_are_deleted(self):
        for name, days in (('old', 400), ('recent', 30)):
            lead = ContactRequest.objects.create(name=name, email='a@example.com', message='x')
            ContactRequest.objects.filter(pk=lead.pk).update(created_at=timezone.now() - timedelta(days=days))
        call_command('purge_requests', stdout=StringIO())
        self.assertEqual(list(ContactRequest.objects.values_list('name', flat=True)), ['recent'])

    def test_clients_are_kept_and_the_period_starts_at_the_last_mark(self):
        ago = lambda days: timezone.now() - timedelta(days=days)
        for name, status, marked in (('client', 'client', 400), ('talked recently', 'declined', 30), ('talked long ago', 'active', 400)):
            lead = ContactRequest.objects.create(name=name, email='a@example.com', message='x', status=status)
            ContactRequest.objects.filter(pk=lead.pk).update(created_at=ago(800), marked_at=ago(marked))
        call_command('purge_requests', stdout=StringIO())
        self.assertEqual(sorted(ContactRequest.objects.values_list('name', flat=True)), ['client', 'talked recently'])


class ImportProjectTests(TestCase):
    card = {'title': 'Demo', 'category_guess': 'ecommerce', 'published': True, 'development_time': 'seit 07/2026',
            'description': {'de': 'Beschreibung', 'en': 'Description'}, 'features': {'de': ['A'], 'en': ['B']}, 'stack': ['Next.js']}

    def test_creates_with_english_translation_and_keeps_existing_unless_update(self):
        from .portfolio_import import import_project
        self.assertEqual(import_project(self.card), 'created')
        project = Project.objects.get(title='Demo')
        self.assertEqual((project.category, project.features, project.translations['en']['features']), ('ecommerce-marketplace-automation', ['A'], ['B']))
        project.description = 'edited in dashboard'
        project.save()
        self.assertEqual(import_project(self.card), 'kept')
        self.assertEqual(Project.objects.get(title='Demo').description, 'edited in dashboard')
        self.assertEqual(import_project(self.card, update=True), 'updated')
        self.assertEqual(Project.objects.get(title='Demo').description, 'Beschreibung')

    def test_own_flag_is_imported_and_served(self):
        from .portfolio_import import import_project
        import_project({**self.card, 'own': True})
        project = Project.objects.get(title='Demo')
        self.assertTrue(project.own)
        self.assertTrue(self.client.get('/api/projects/').json()['projects'][0]['own'])

    def test_imported_projects_go_last_unless_the_card_names_a_place(self):
        from .portfolio_import import import_project
        order = lambda: list(Project.objects.values_list('title', 'position'))
        import_project(self.card)
        import_project({**self.card, 'title': 'Next'})
        self.assertEqual(order(), [('Demo', 1), ('Next', 2)])
        import_project({**self.card, 'title': 'Next', 'position': 1}, update=True)
        self.assertEqual(order(), [('Next', 1), ('Demo', 2)])
        import_project(self.card, update=True)  # no place in the card: it stays
        self.assertEqual(order(), [('Next', 1), ('Demo', 2)])

    def test_platforms_and_development_flag_are_imported_only_when_present(self):
        from .portfolio_import import import_project
        import_project({**self.card, 'platforms': ['mobile', 'web', 'tv'], 'in_development': True})
        project = Project.objects.get(title='Demo')
        self.assertEqual((project.platforms, project.in_development), (['web', 'mobile'], True))
        project.platforms = ['desktop']
        project.in_development = False
        project.save()
        import_project(self.card, update=True)
        project = Project.objects.get(title='Demo')
        self.assertEqual((project.platforms, project.in_development), (['desktop'], False))

    def test_empty_screenshot_list_removes_the_old_pictures_on_update(self):
        from .portfolio_import import import_project
        import_project(self.card)
        project = Project.objects.get(title='Demo')
        ProjectScreenshot.objects.create(project=project, image='projects/old.webp')
        import_project(self.card, update=True)
        self.assertEqual(project.screenshots.count(), 1)  # no key: pictures stay
        import_project({**self.card, 'screenshots': []}, update=True)
        self.assertEqual(project.screenshots.count(), 0)

    def test_unknown_category_is_rejected(self):
        from .portfolio_import import import_project
        with self.assertRaises(ValueError):
            import_project({**self.card, 'category_guess': 'nope'})

    def test_screenshots_are_attached_once_from_files_next_to_the_card(self):
        from .portfolio_import import import_project
        with tempfile.TemporaryDirectory() as folder, override_settings(MEDIA_ROOT=folder):
            Image.new('RGB', (40, 20), 'blue').save(f'{folder}/shot.png')
            card = {**self.card, 'integrations': ['Afterbuy'], 'screenshots': [{'file': 'shot.png', 'alt': {'de': 'Bild', 'en': 'Image'}}]}
            import_project(card, base_dir=folder)
            import_project(card, base_dir=folder)
            project = Project.objects.get(title='Demo')
            self.assertEqual((project.screenshots.count(), project.integrations, project.screenshots.get().alt['en']), (1, ['Afterbuy'], 'Image'))
            import_project({**card, 'screenshots': [{'file': 'shot.png', 'alt': {'en': 'New'}}]}, update=True, base_dir=folder)
            self.assertEqual((project.screenshots.count(), project.screenshots.get().alt['en']), (1, 'New'))
