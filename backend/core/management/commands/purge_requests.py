from datetime import timedelta

from django.core.management.base import BaseCommand
from django.utils import timezone

from core.models import ContactRequest


class Command(BaseCommand):
    help = 'Delete contact requests older than the retention period stated in the privacy policy (default 12 months).'

    def add_arguments(self, parser):
        parser.add_argument('--months', type=int, default=12)

    def handle(self, *args, months, **options):
        deleted, _ = ContactRequest.objects.filter(created_at__lt=timezone.now() - timedelta(days=30 * months)).delete()
        self.stdout.write(f'Deleted {deleted} contact requests older than {months} months.')
