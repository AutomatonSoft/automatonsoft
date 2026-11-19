from django.core.management.base import BaseCommand

from core.portfolio_import import load_file


class Command(BaseCommand):
    help = 'Import one project card from a JSON file (format: docs/project-fact-prompt.md). Existing projects are kept unless --update is given.'

    def add_arguments(self, parser):
        parser.add_argument('path')
        parser.add_argument('--update', action='store_true', help='Overwrite an existing project with the same title.')

    def handle(self, *args, path, update, **options):
        self.stdout.write(f'{path}: {load_file(path, update=update)}')
