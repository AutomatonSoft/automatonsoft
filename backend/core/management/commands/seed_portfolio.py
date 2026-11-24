from pathlib import Path

from django.core.management.base import BaseCommand

from core.models import Project
from core.portfolio_import import load_file


PROJECTS = (
    ('ecommerce-marketplace-automation', 'E-Commerce Automation Suite', 'Automatisiertes Produktdatenmanagement für otto.de, kaufland.de und Shopware – aus einer zentralen Produktdatenbank heraus.', ['Marketplace Automation', 'Produktdatenmanagement']),
    ('ai-business-solutions', 'Lisa', 'KI-Sprachassistentin für JV Möbel: nimmt Kundenanrufe rund um die Uhr an, verifiziert Anrufer, teilt den Bestellstatus aus Afterbuy mit und übermittelt Sprachnachrichten als Transkript per E-Mail – verwaltet in einer Mitarbeiterkonsole.', ['Voice AI', 'Twilio', 'Afterbuy']),
    ('workforce-hr-automation', 'Industry Human Organization', 'Organisatorische Ergänzung für Industriebetriebe im Umfeld der Hubnity Workforce Platform. Nähere Details folgen in Kürze.', ['In Vorbereitung']),
    ('ai-business-solutions', 'ProVocat', 'Bestehende KI-Lösung von Automatonsoft. Eine ausführliche Beschreibung ergänzen wir in Kürze.', ['In Vorbereitung']),
    ('ai-business-solutions', 'KIDOC_Office', 'KI-gestützte Verarbeitung von Bürodokumenten – von der Erkennung über die Datenextraktion bis zur strukturierten Ablage.', ['KI-Dokumentenverarbeitung']),
    ('ai-business-solutions', 'Automatonsoft AI Platform', 'Vier Themencluster mit insgesamt 16 KI-Erweiterungen in Konzeptphase: AI Commerce Agents, AI Operations Agents, AI Knowledge & Documents und AI Orchestration – als Ausbaustufen unserer bestehenden Automatisierungslösungen, konsequent als Konzept gekennzeichnet, nicht als bereits produktiv im Einsatz.', ['Konzept', 'KI-Erweiterung']),
    ('industrial-ai-manufacturing', 'Woodguard', 'Teil unseres Portfolios für Industrie und Fertigung. Eine ausführliche Beschreibung dieser Lösung ergänzen wir in Kürze.', ['In Vorbereitung']),
    ('automotive-software', 'AutoCar Software Suite', 'Verwaltung von Fahrzeug-, Kunden- und Auftragsdaten für Autohäuser und Werkstätten – im Backoffice und mobil.', ['Autohaus Software', 'Werkstattverwaltung']),
    ('custom-software-business-automation', 'Custom Software & Business Automation', 'Individuelle Softwareentwicklung und Automatisierung für Geschäftsprozesse, die über Standardlösungen hinausgehen – aufbauend auf unserer Erfahrung aus allen Portfolio-Kategorien.', ['Individuelle Softwareentwicklung', 'Business Automation']),
)


# English versions of the seeded projects, keyed by title. Applied only where no translation exists yet,
# so edits made in the dashboard are never overwritten.
TRANSLATIONS_EN = {
    'E-Commerce Automation Suite': ('Automated product data management for otto.de, kaufland.de and Shopware – from one central product database.', ['Marketplace automation', 'Product data management']),
    'Lisa': ('AI voice assistant for JV Möbel: answers customer calls around the clock, verifies callers, shares order status from Afterbuy and forwards voice messages as transcripts by email – managed in a staff console.', ['Voice AI', 'Twilio', 'Afterbuy']),
    'Industry Human Organization': ('Organisational extension for industrial companies around our workforce solutions. Details will follow shortly.', ['In preparation']),
    'ProVocat': ('An existing AI solution by AutomatonSoft. A detailed description will follow shortly.', ['In preparation']),
    'KIDOC_Office': ('AI-powered processing of office documents – from recognition and data extraction to structured filing.', ['AI document processing']),
    'Automatonsoft AI Platform': ('Four topic clusters with 16 AI extensions in the concept phase: AI Commerce Agents, AI Operations Agents, AI Knowledge & Documents and AI Orchestration – as next stages of our existing automation solutions, clearly marked as concepts, not yet in production.', ['Concept', 'AI extension']),
    'Woodguard': ('Part of our industry and manufacturing portfolio. A detailed description of this solution will follow shortly.', ['In preparation']),
    'AutoCar Software Suite': ('Management of vehicle, customer and order data for dealerships and workshops – in the back office and on mobile.', ['Dealership software', 'Workshop management']),
    'Custom Software & Business Automation': ('Custom software development and automation for business processes that go beyond standard solutions – building on our experience across all portfolio categories.', ['Custom software development', 'Business automation']),
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
