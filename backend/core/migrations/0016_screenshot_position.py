from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0015_contact_request_status'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='projectscreenshot',
            options={'ordering': ('position', '-id')},
        ),
        migrations.AddField(
            model_name='projectscreenshot',
            name='position',
            field=models.PositiveSmallIntegerField(default=0),
        ),
    ]
