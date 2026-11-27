from datetime import timedelta

from django.core.management.base import BaseCommand
from django.db.models import Q
from django.utils import timezone

from core.models import ContactRequest


class Command(BaseCommand):
    help = ('Delete contact requests whose retention period is over (privacy policy: 12 months after the last contact). '
            'The last contact is the last change of status or note, else the day the request came in. Clients are kept.')

    def add_arguments(self, parser):
        parser.add_argument('--months', type=int, default=12)

    def handle(self, *args, months, **options):
        limit = timezone.now() - timedelta(days=30 * months)
        expired = Q(marked_at__lt=limit) | Q(marked_at__isnull=True, created_at__lt=limit)
        deleted, _ = ContactRequest.objects.filter(expired).exclude(status=ContactRequest.CLIENT).delete()
        self.stdout.write(f'Deleted {deleted} contact requests without contact for {months} months.')
