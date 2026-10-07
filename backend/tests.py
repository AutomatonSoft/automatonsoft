import importlib
import shutil
import tempfile
from io import BytesIO

from django.contrib.auth import get_user_model
from django.core.files.uploadedfile import SimpleUploadedFile
from django.test import TestCase, override_settings
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
        migration = importlib.import_module('backend.migrations.0006_optimize_screenshots')

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

    def test_english_translation_is_saved_and_cleared(self):
        self.client.force_login(self.staff)
        url = f'/api/projects/{self.project.id}/update/'

        response = self.client.post(url, self.project_data(description_en='English text', stack_en='Django, Docker'))
        self.assertEqual(response.json()['project']['translations'], {'en': {'description': 'English text', 'stack': ['Django', 'Docker']}})

        self.client.post(url, self.project_data())
        self.project.refresh_from_db()
        self.assertEqual(self.project.translations, {})

    def test_seed_backfills_missing_translations_only(self):
        from django.core.management import call_command
        Project.objects.create(title='Cashbook', description='Edited', category='finance-accounting-automation', stack=[], development_time='—', translations={'en': {'description': 'Kept'}})

        call_command('seed_portfolio', stdout=open('/dev/null', 'w'))

        self.assertEqual(Project.objects.get(title='Cashbook').translations, {'en': {'description': 'Kept'}})
        self.assertIn('en', Project.objects.get(title='Hubnity').translations)

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
