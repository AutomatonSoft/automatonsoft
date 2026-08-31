import shutil
import tempfile

from django.contrib.auth import get_user_model
from django.core.files.uploadedfile import SimpleUploadedFile
from django.test import TestCase, override_settings

from .models import Project, ProjectScreenshot


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

    def image(self, name):
        return SimpleUploadedFile(name, b'png-content', content_type='image/png')

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
        self.assertTrue(response.json()['project']['screenshots'][0].endswith('project.png'))

    def test_latest_uploaded_image_is_primary(self):
        ProjectScreenshot.objects.create(project=self.project, image=self.image('old.png'))
        self.client.force_login(self.staff)

        response = self.client.post(
            f'/api/projects/{self.project.id}/update/',
            self.project_data(title=self.project.title, screenshots=[self.image('new.png')]),
        )

        self.assertEqual(response.status_code, 200)
        self.assertEqual(self.project.screenshots.count(), 2)
        self.assertTrue(response.json()['project']['screenshots'][0].endswith('new.png'))

    def test_staff_can_delete_project(self):
        self.client.force_login(self.staff)

        response = self.client.delete(f'/api/projects/{self.project.id}/delete/')

        self.assertEqual(response.status_code, 204)
        self.assertFalse(Project.objects.filter(pk=self.project.id).exists())
