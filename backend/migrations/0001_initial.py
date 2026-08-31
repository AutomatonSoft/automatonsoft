from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):
    initial = True
    dependencies = []
    operations = [
        migrations.CreateModel(
            name='Project',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=160)), ('description', models.TextField()),
                ('stack', models.JSONField(default=list)), ('development_time', models.CharField(max_length=120)),
                ('published', models.BooleanField(default=True)), ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
            ], options={'ordering': ('-created_at',)},
        ),
        migrations.CreateModel(
            name='ProjectScreenshot',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image', models.FileField(upload_to='projects/%Y/%m/')), ('created_at', models.DateTimeField(auto_now_add=True)),
                ('project', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='screenshots', to='backend.project')),
            ],
        ),
    ]
