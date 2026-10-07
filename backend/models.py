from django.db import models


PORTFOLIO_CATEGORIES = (
    ('ecommerce-marketplace-automation', 'E-Commerce & Marketplace'),
    ('workforce-hr-automation', 'Workforce & HR'),
    ('ai-business-solutions', 'AI Business Solutions'),
    ('supply-chain-warehouse', 'Supply Chain & Warehouse'),
    ('industrial-ai-manufacturing', 'Industrial AI & Manufacturing'),
    ('hospitality-hotel-software', 'Hospitality'),
    ('automotive-software', 'Automotive'),
    ('finance-accounting-automation', 'Finance & Accounting'),
    ('custom-software-business-automation', 'Custom Software'),
)


class Project(models.Model):
    title = models.CharField(max_length=160)
    description = models.TextField()
    category = models.CharField(max_length=64, choices=PORTFOLIO_CATEGORIES, default='custom-software-business-automation')
    stack = models.JSONField(default=list)
    development_time = models.CharField(max_length=120)
    published = models.BooleanField(default=True)
    # Per-locale overrides of the German base content, e.g. {'en': {'description': ..., 'stack': [...]}}
    translations = models.JSONField(default=dict, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ('-created_at',)

    def __str__(self):
        return self.title


class ProjectScreenshot(models.Model):
    project = models.ForeignKey(Project, related_name='screenshots', on_delete=models.CASCADE)
    image = models.FileField(upload_to='projects/%Y/%m/')
    created_at = models.DateTimeField(auto_now_add=True)


class ContactRequest(models.Model):
    name = models.CharField(max_length=160)
    email = models.EmailField()
    company = models.CharField(max_length=160, blank=True)
    phone = models.CharField(max_length=60, blank=True)
    message = models.TextField(max_length=5000)
    locale = models.CharField(max_length=8, blank=True)
    attribution = models.JSONField(default=dict, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ('-created_at',)

    def __str__(self):
        return f'{self.name} <{self.email}>'
