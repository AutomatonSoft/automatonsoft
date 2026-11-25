from django.db import migrations

# Placeholder cards removed from the portfolio for good. Their screenshot records go with them; uploaded files stay on disk.
SLUGS = (
    'autocar-software-suite', 'kidoc-office', 'e-commerce-automation-suite', 'automatonsoft-ai-platform',
    'industry-human-organization', 'custom-software-business-automation',
)


def delete(apps, schema_editor):
    apps.get_model('backend', 'Project').objects.filter(slug__in=SLUGS).delete()


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0012_project_platforms'),
    ]

    operations = [
        migrations.RunPython(delete, migrations.RunPython.noop),
    ]
