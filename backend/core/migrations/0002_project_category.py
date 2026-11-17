from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [('backend', '0001_initial')]

    operations = [
        migrations.AddField(
            model_name='project',
            name='category',
            field=models.CharField(
                choices=[
                    ('ecommerce-marketplace-automation', 'E-Commerce & Marketplace'),
                    ('workforce-hr-automation', 'Workforce & HR'),
                    ('ai-business-solutions', 'AI Business Solutions'),
                    ('supply-chain-warehouse', 'Supply Chain & Warehouse'),
                    ('industrial-ai-manufacturing', 'Industrial AI & Manufacturing'),
                    ('hospitality-hotel-software', 'Hospitality'),
                    ('automotive-software', 'Automotive'),
                    ('finance-accounting-automation', 'Finance & Accounting'),
                    ('custom-software-business-automation', 'Custom Software'),
                ],
                default='custom-software-business-automation',
                max_length=64,
            ),
        ),
    ]
