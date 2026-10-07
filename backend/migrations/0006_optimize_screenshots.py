from django.db import migrations

from backend.images import InvalidImage, optimize_image


def forwards(apps, schema_editor):
    """Re-encode existing screenshots as resized WebP. Originals stay in storage, so this is reversible."""
    ProjectScreenshot = apps.get_model('backend', 'ProjectScreenshot')
    for screenshot in ProjectScreenshot.objects.exclude(image__iendswith='.webp'):
        storage = screenshot.image.storage
        if not storage.exists(screenshot.image.name):
            continue
        try:
            with storage.open(screenshot.image.name, 'rb') as source:
                optimized = optimize_image(source)
        except InvalidImage:
            continue
        screenshot.image.save(optimized.name, optimized, save=True)


class Migration(migrations.Migration):
    dependencies = [('backend', '0005_project_translations')]
    operations = [migrations.RunPython(forwards, migrations.RunPython.noop)]
