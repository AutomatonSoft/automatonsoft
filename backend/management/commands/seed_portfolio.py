from django.core.management.base import BaseCommand

from backend.models import Project


PROJECTS = (
    ('ecommerce-marketplace-automation', 'E-Commerce Automation Suite', 'Automatisiertes Produktdatenmanagement für otto.de, kaufland.de, Google Merchant Center und Shopware – aus einer zentralen Produktdatenbank heraus.', ['Marketplace Automation', 'Produktdatenmanagement']),
    ('ecommerce-marketplace-automation', 'Aftercool', 'Teil unseres E-Commerce-Portfolios. Eine ausführliche Beschreibung dieser Lösung ergänzen wir in Kürze.', ['In Vorbereitung']),
    ('ecommerce-marketplace-automation', 'LizaBot', 'Teil unseres E-Commerce-Portfolios. Eine ausführliche Beschreibung dieser Lösung ergänzen wir in Kürze.', ['In Vorbereitung']),
    ('workforce-hr-automation', 'Hubnity Workforce Platform', 'Workforce-Management-Plattform für Personaleinsatzplanung, Zeiterfassung und Mitarbeiterverwaltung – mit Desktop-, Office-, Mobile- und branchenspezifischer Industries-Variante.', ['Workforce Management', 'Zeiterfassung']),
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


class Command(BaseCommand):
    help = 'Import the original static portfolio cards when they are not in the database yet.'

    def handle(self, *args, **options):
        created = 0
        for category, title, description, stack in PROJECTS:
            _, was_created = Project.objects.get_or_create(
                title=title,
                defaults={'category': category, 'description': description, 'stack': stack, 'development_time': '—', 'published': True},
            )
            created += was_created
        self.stdout.write(self.style.SUCCESS(f'Portfolio seed complete: {created} created, {len(PROJECTS) - created} already present.'))
