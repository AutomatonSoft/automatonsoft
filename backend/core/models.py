from django.db import models
from django.utils.text import slugify


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
    # Public landing page at /portfolio/<slug>; derived from the title when left empty.
    slug = models.SlugField(max_length=180, unique=True, blank=True)
    description = models.TextField()
    # Landing page content: the client's starting point, what the solution does and what it achieved.
    challenge = models.TextField(blank=True)
    features = models.JSONField(default=list, blank=True)
    results = models.JSONField(default=list, blank=True)
    website = models.URLField(blank=True)
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

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = unique_slug(self.title, exclude=self.pk)
        super().save(*args, **kwargs)


def unique_slug(text, exclude=None):
    base = slugify(text).replace('_', '-').strip('-')[:170] or 'projekt'
    slug, number = base, 2
    while Project.objects.filter(slug=slug).exclude(pk=exclude).exists():
        slug, number = f'{base}-{number}', number + 1
    return slug


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
