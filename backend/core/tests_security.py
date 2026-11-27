import stat
import tempfile
from pathlib import Path

from django.test import SimpleTestCase

from automatonsoft.settings import installation_key


class InstallationKeyTests(SimpleTestCase):
    def test_the_key_is_made_once_kept_private_and_reused(self):
        with tempfile.TemporaryDirectory() as folder:
            path = Path(folder) / 'secret_key'

            key = installation_key(path)

            self.assertGreaterEqual(len(key), 50)
            self.assertEqual(installation_key(path), key)
            self.assertEqual(stat.S_IMODE(path.stat().st_mode), 0o600)
