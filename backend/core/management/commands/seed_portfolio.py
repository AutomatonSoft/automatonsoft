from pathlib import Path

from django.core.management.base import BaseCommand

from core.portfolio_import import load_file


class Command(BaseCommand):
    help = 'Add the portfolio projects kept in core/portfolio_data when they are not in the database yet.'

    def handle(self, *args, **options):
        # Existing projects are never overwritten (dashboard edits win).
        results = [load_file(path) for path in sorted((Path(__file__).resolve().parents[2] / 'portfolio_data').glob('*.json'))]
        created = results.count('created')
        self.stdout.write(self.style.SUCCESS(f'Portfolio seed complete: {created} created, {len(results) - created} already present.'))
