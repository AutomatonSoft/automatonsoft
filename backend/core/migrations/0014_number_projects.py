from django.db import migrations


def rank(stack):
    # The public site's tie-break between equal numbers: finished work, then concepts, then placeholders.
    return 2 if 'In Vorbereitung' in stack else 1 if 'Konzept' in stack or 'Concept' in stack else 0


def number_in_site_order(apps, schema_editor):
    """Give every project its own number 1..N without changing the order visitors see."""
    project = apps.get_model('backend', 'Project')
    # sorted() is stable, so equal number and rank stay newest first.
    ordered = sorted(project.objects.order_by('-created_at', '-pk'), key=lambda item: (item.position, rank(item.stack)))
    for position, item in enumerate(ordered, 1):
        project.objects.filter(pk=item.pk).update(position=position)


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0013_delete_placeholder_projects'),
    ]

    operations = [
        migrations.RunPython(number_in_site_order, migrations.RunPython.noop),
    ]
