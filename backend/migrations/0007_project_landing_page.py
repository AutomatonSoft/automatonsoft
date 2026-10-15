from django.db import migrations, models
from django.utils.text import slugify


def fill_slugs(apps, schema_editor):
    Project = apps.get_model('backend', 'Project')
    taken = set()
    for project in Project.objects.order_by('id'):
        base = slugify(project.title).replace('_', '-').strip('-')[:170] or 'projekt'
        slug, number = base, 2
        while slug in taken:
            slug, number = f'{base}-{number}', number + 1
        taken.add(slug)
        project.slug = slug
        project.save(update_fields=['slug'])


class Migration(migrations.Migration):
    dependencies = [('backend', '0006_optimize_screenshots')]
    operations = [
        migrations.AddField('project', 'slug', models.SlugField(max_length=180, blank=True, default='')),
        migrations.RunPython(fill_slugs, migrations.RunPython.noop),
        migrations.AlterField('project', 'slug', models.SlugField(max_length=180, unique=True, blank=True)),
        migrations.AddField('project', 'challenge', models.TextField(blank=True)),
        migrations.AddField('project', 'features', models.JSONField(blank=True, default=list)),
        migrations.AddField('project', 'results', models.JSONField(blank=True, default=list)),
        migrations.AddField('project', 'website', models.URLField(blank=True)),
    ]
