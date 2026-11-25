from pathlib import Path

from django.core.management.base import BaseCommand

from core.models import Project
from core.portfolio_import import load_file


PROJECTS = (
    ('industrial-ai-manufacturing', 'Woodguard', 'Teil unseres Portfolios für Industrie und Fertigung. Eine ausführliche Beschreibung dieser Lösung ergänzen wir in Kürze.', ['In Vorbereitung']),
)


# English versions of the seeded projects, keyed by title. Applied only where no translation exists yet,
# so edits made in the dashboard are never overwritten.
TRANSLATIONS_EN = {
    'Woodguard': ('Part of our industry and manufacturing portfolio. A detailed description of this solution will follow shortly.', ['In preparation']),
}


class Command(BaseCommand):
    help = 'Import the original static portfolio cards when they are not in the database yet.'

    def handle(self, *args, **options):
        created = translated = 0
        for category, title, description, stack in PROJECTS:
            project, was_created = Project.objects.get_or_create(
                title=title,
                defaults={'category': category, 'description': description, 'stack': stack, 'development_time': '—', 'published': True},
            )
            created += was_created
            if not project.translations and title in TRANSLATIONS_EN:
                description_en, stack_en = TRANSLATIONS_EN[title]
                project.translations = {'en': {'description': description_en, 'stack': stack_en}}
                project.save(update_fields=['translations'])
                translated += 1
        # Projects kept as JSON in core/portfolio_data: added when missing, never overwritten (dashboard edits win).
        for path in sorted((Path(__file__).resolve().parents[2] / 'portfolio_data').glob('*.json')):
            load_file(path)
        self.stdout.write(self.style.SUCCESS(f'Portfolio seed complete: {created} created, {len(PROJECTS) - created} already present, {translated} translated.'))
