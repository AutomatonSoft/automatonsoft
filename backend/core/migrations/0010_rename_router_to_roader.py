from django.db import migrations


def rename(apps, schema_editor):
    # The card was seeded as "Router" by mistake; keep its row (cover, dashboard edits) and only fix the name and URL.
    apps.get_model('backend', 'Project').objects.filter(title='Router').update(title='Roader', slug='roader')


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0009_project_own'),
    ]

    operations = [
        migrations.RunPython(rename, migrations.RunPython.noop),
    ]
