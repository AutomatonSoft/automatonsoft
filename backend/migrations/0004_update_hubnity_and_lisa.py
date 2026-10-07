from django.db import migrations

# (old title, old seed description) -> new values. Values are frozen here on purpose: migrations must not
# change behaviour when the seed command evolves. Rows edited in the admin no longer match and stay untouched.
UPDATES = (
    (('Hubnity Workforce Platform', 'Workforce-Management-Plattform für Personaleinsatzplanung, Zeiterfassung und Mitarbeiterverwaltung – mit Desktop-, Office-, Mobile- und branchenspezifischer Industries-Variante.'),
     {'title': 'Hubnity', 'category': 'workforce-hr-automation',
      'description': 'Zeiterfassungs-SaaS für Agenturen, Remote- und Außendienst-Teams: automatische Zeit- und Aktivitätserfassung, Stundenzettel, abrechenbare Zeiten und Reports – im Web, als Desktop-App für Windows, macOS und Linux sowie unter Android.',
      'stack': ['TypeScript', 'NestJS', 'Next.js', 'React', 'PostgreSQL', 'Redis', 'BullMQ', 'Stripe']}),
    (('LizaBot', 'Teil unseres E-Commerce-Portfolios. Eine ausführliche Beschreibung dieser Lösung ergänzen wir in Kürze.'),
     {'title': 'Lisa', 'category': 'ai-business-solutions',
      'description': 'KI-Sprachassistentin für JV Möbel: nimmt Kundenanrufe rund um die Uhr an, verifiziert Anrufer, teilt den Bestellstatus aus Afterbuy mit und übermittelt Sprachnachrichten als Transkript per E-Mail – verwaltet in einer Mitarbeiterkonsole.',
      'stack': ['Voice AI', 'Twilio', 'Afterbuy']}),
)


def forwards(apps, schema_editor):
    Project = apps.get_model('backend', 'Project')
    for (old_title, old_description), values in UPDATES:
        Project.objects.filter(title=old_title, description=old_description).update(**values)


class Migration(migrations.Migration):
    dependencies = [('backend', '0003_contact_request')]
    operations = [migrations.RunPython(forwards, migrations.RunPython.noop)]
