from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0014_number_projects'),
    ]

    operations = [
        migrations.AddField(
            model_name='contactrequest',
            name='status',
            field=models.CharField(choices=[('new', 'New'), ('active', 'In progress'), ('client', 'Client'), ('declined', 'Declined')], default='new', max_length=16),
        ),
        migrations.AddField(
            model_name='contactrequest',
            name='note',
            field=models.TextField(blank=True, max_length=2000),
        ),
        migrations.AddField(
            model_name='contactrequest',
            name='marked_at',
            field=models.DateTimeField(blank=True, null=True),
        ),
    ]
