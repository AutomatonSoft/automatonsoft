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
