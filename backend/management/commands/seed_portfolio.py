from django.core.management.base import BaseCommand

from backend.models import Project


PROJECTS = (
    ('ecommerce-marketplace-automation', 'E-Commerce Automation Suite', 'Automatisiertes Produktdatenmanagement für otto.de, kaufland.de, Google Merchant Center und Shopware – aus einer zentralen Produktdatenbank heraus.', ['Marketplace Automation', 'Produktdatenmanagement']),
    ('ecommerce-marketplace-automation', 'Aftercool', 'Teil unseres E-Commerce-Portfolios. Eine ausführliche Beschreibung dieser Lösung ergänzen wir in Kürze.', ['In Vorbereitung']),
    ('ai-business-solutions', 'Lisa', 'KI-Sprachassistentin für JV Möbel: nimmt Kundenanrufe rund um die Uhr an, verifiziert Anrufer, teilt den Bestellstatus aus Afterbuy mit und übermittelt Sprachnachrichten als Transkript per E-Mail – verwaltet in einer Mitarbeiterkonsole.', ['Voice AI', 'Twilio', 'Afterbuy']),
    ('workforce-hr-automation', 'Hubnity', 'Zeiterfassungs-SaaS für Agenturen, Remote- und Außendienst-Teams: automatische Zeit- und Aktivitätserfassung, Stundenzettel, abrechenbare Zeiten und Reports – im Web, als Desktop-App für Windows, macOS und Linux sowie unter Android.', ['TypeScript', 'NestJS', 'Next.js', 'React', 'PostgreSQL', 'Redis', 'BullMQ', 'Stripe']),
    ('workforce-hr-automation', 'Industry Human Organization', 'Organisatorische Ergänzung für Industriebetriebe im Umfeld der Hubnity Workforce Platform. Nähere Details folgen in Kürze.', ['In Vorbereitung']),
    ('ai-business-solutions', 'ProVocat', 'Bestehende KI-Lösung von Automatonsoft. Eine ausführliche Beschreibung ergänzen wir in Kürze.', ['In Vorbereitung']),
    ('ai-business-solutions', 'KIDOC_Office', 'KI-gestützte Verarbeitung von Bürodokumenten – von der Erkennung über die Datenextraktion bis zur strukturierten Ablage.', ['KI-Dokumentenverarbeitung']),
    ('ai-business-solutions', 'Automatonsoft AI Platform', 'Vier Themencluster mit insgesamt 16 KI-Erweiterungen in Konzeptphase: AI Commerce Agents, AI Operations Agents, AI Knowledge & Documents und AI Orchestration – als Ausbaustufen unserer bestehenden Automatisierungslösungen, konsequent als Konzept gekennzeichnet, nicht als bereits produktiv im Einsatz.', ['Konzept', 'KI-Erweiterung']),
    ('supply-chain-warehouse', 'Supply Chain Automation Suite', 'Zentrale Bestellverwaltung (OrderHub) und strukturierte Lagerorganisation (Warehouse Organizer, BerimDepom) aus einer Suite.', ['Supply Chain Software', 'Warehouse Automation']),
    ('industrial-ai-manufacturing', 'Woodguard', 'Teil unseres Portfolios für Industrie und Fertigung. Eine ausführliche Beschreibung dieser Lösung ergänzen wir in Kürze.', ['In Vorbereitung']),
    ('hospitality-hotel-software', 'Lunanitiz Hotel Software', 'Zentrale Verwaltung von Buchungen und Verfügbarkeiten für Hotellerie und Kurzzeitvermietung, mit Anbindung an Airbnb.', ['Hotel Software', 'Airbnb Integration']),
    ('automotive-software', 'AutoCar Software Suite', 'Verwaltung von Fahrzeug-, Kunden- und Auftragsdaten für Autohäuser und Werkstätten – im Backoffice und mobil.', ['Autohaus Software', 'Werkstattverwaltung']),
    ('finance-accounting-automation', 'Cashbook', 'Digitale Kassenbuchführung für kleine und mittlere Unternehmen mit Bargeldverkehr.', ['Digitales Kassenbuch', 'Finance Automation']),
    ('custom-software-business-automation', 'Router', 'Individuelle Lösung im Bereich Custom Software & Business Automation. Nähere Details folgen in Kürze.', ['In Vorbereitung']),
    ('custom-software-business-automation', 'Custom Software & Business Automation', 'Individuelle Softwareentwicklung und Automatisierung für Geschäftsprozesse, die über Standardlösungen hinausgehen – aufbauend auf unserer Erfahrung aus allen Portfolio-Kategorien.', ['Individuelle Softwareentwicklung', 'Business Automation']),
)


# English versions of the seeded projects, keyed by title. Applied only where no translation exists yet,
# so edits made in the dashboard are never overwritten.
TRANSLATIONS_EN = {
    'E-Commerce Automation Suite': ('Automated product data management for otto.de, kaufland.de, Google Merchant Center and Shopware – from one central product database.', ['Marketplace automation', 'Product data management']),
    'Aftercool': ('Part of our e-commerce portfolio. A detailed description of this solution will follow shortly.', ['In preparation']),
    'Lisa': ('AI voice assistant for JV Möbel: answers customer calls around the clock, verifies callers, shares order status from Afterbuy and forwards voice messages as transcripts by email – managed in a staff console.', ['Voice AI', 'Twilio', 'Afterbuy']),
    'Hubnity': ('Time tracking SaaS for agencies, remote and field teams: automatic time and activity tracking, timesheets, billable hours and reports – on the web, as a desktop app for Windows, macOS and Linux and on Android.', ['TypeScript', 'NestJS', 'Next.js', 'React', 'PostgreSQL', 'Redis', 'BullMQ', 'Stripe']),
    'Industry Human Organization': ('Organisational extension for industrial companies around our workforce solutions. Details will follow shortly.', ['In preparation']),
    'ProVocat': ('An existing AI solution by AutomatonSoft. A detailed description will follow shortly.', ['In preparation']),
    'KIDOC_Office': ('AI-powered processing of office documents – from recognition and data extraction to structured filing.', ['AI document processing']),
    'Automatonsoft AI Platform': ('Four topic clusters with 16 AI extensions in the concept phase: AI Commerce Agents, AI Operations Agents, AI Knowledge & Documents and AI Orchestration – as next stages of our existing automation solutions, clearly marked as concepts, not yet in production.', ['Concept', 'AI extension']),
    'Supply Chain Automation Suite': ('Central order management (OrderHub) and structured warehouse organisation (Warehouse Organizer, BerimDepom) in one suite.', ['Supply chain software', 'Warehouse automation']),
    'Woodguard': ('Part of our industry and manufacturing portfolio. A detailed description of this solution will follow shortly.', ['In preparation']),
    'Lunanitiz Hotel Software': ('Central management of bookings and availability for hotels and short-term rentals, connected to Airbnb.', ['Hotel software', 'Airbnb integration']),
    'AutoCar Software Suite': ('Management of vehicle, customer and order data for dealerships and workshops – in the back office and on mobile.', ['Dealership software', 'Workshop management']),
    'Cashbook': ('Digital cash book management for small and medium-sized businesses that handle cash.', ['Digital cash book', 'Finance automation']),
    'Router': ('Custom solution in the area of custom software and business automation. Details will follow shortly.', ['In preparation']),
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
        self.stdout.write(self.style.SUCCESS(f'Portfolio seed complete: {created} created, {len(PROJECTS) - created} already present, {translated} translated.'))
