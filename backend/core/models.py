from django.db import models, transaction
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


PLATFORMS = ('web', 'desktop', 'mobile')


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
    # Services the product connects to (Afterbuy, Klarna …); proper names, so one list for every language.
    integrations = models.JSONField(default=list, blank=True)
    development_time = models.CharField(max_length=120)
    # Our own product or in-house project, not client work; shown as a label on the card and the project page.
    own = models.BooleanField(default=False)
    # Where the product runs: any of PLATFORMS; shown as icons on the card and the project page.
    platforms = models.JSONField(default=list, blank=True)
    # The project is still being built; shown as a badge on the card and the project page.
    in_development = models.BooleanField(default=False)
    published = models.BooleanField(default=True)
    # Place in the portfolio lists (1 comes first). Set by number_projects(), never typed in directly.
    position = models.PositiveSmallIntegerField(default=100)
    # Per-locale overrides of the German base content, e.g. {'en': {'description': ..., 'stack': [...]}}
    translations = models.JSONField(default=dict, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ('position', '-created_at')

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = unique_slug(self.title, exclude=self.pk)
        super().save(*args, **kwargs)


# A new project starts behind all others until it gets its number.
LAST_POSITION = 32767


def number_projects(project=None, place=None):
    """Keep the places at 1..N without gaps or duplicates, in the current order. With `project` and `place`, that project
    moves there and the others shift; a place beyond the end means last."""
    with transaction.atomic():
        ids = list(Project.objects.values_list('pk', flat=True))
        if place is not None:
            ids.remove(project.pk)
            ids.insert(max(place, 1) - 1, project.pk)
        for position, pk in enumerate(ids, 1):
            Project.objects.filter(pk=pk).exclude(position=position).update(position=position)


def unique_slug(text, exclude=None):
    base = slugify(text).replace('_', '-').strip('-')[:170] or 'projekt'
    slug, number = base, 2
    while Project.objects.filter(slug=slug).exclude(pk=exclude).exists():
        slug, number = f'{base}-{number}', number + 1
    return slug


class ProjectScreenshot(models.Model):
    project = models.ForeignKey(Project, related_name='screenshots', on_delete=models.CASCADE)
    image = models.FileField(upload_to='projects/%Y/%m/')
    # Description per language, e.g. {'de': '…', 'en': '…'}; the page falls back to the project title.
    alt = models.JSONField(default=dict, blank=True)
    # Order on the site, set in the dashboard; the first picture is the cover. Pictures without a number (0) come first,
    # the newest before the older ones, so an imported card keeps its last picture as the cover.
    position = models.PositiveSmallIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ('position', '-id')


class ContactRequest(models.Model):
    # How far the request has got. Clients are exempt from the automatic deletion (purge_requests).
    CLIENT = 'client'
    STATUSES = (('new', 'New'), ('active', 'In progress'), (CLIENT, 'Client'), ('declined', 'Declined'))

    name = models.CharField(max_length=160)
    email = models.EmailField()
    company = models.CharField(max_length=160, blank=True)
    phone = models.CharField(max_length=60, blank=True)
    message = models.TextField(max_length=5000)
    locale = models.CharField(max_length=8, blank=True)
    attribution = models.JSONField(default=dict, blank=True)
    status = models.CharField(max_length=16, choices=STATUSES, default='new')
    note = models.TextField(max_length=2000, blank=True)
    # When the team last changed the status or the note; the retention period starts again from here.
    marked_at = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ('-created_at',)

    def __str__(self):
        return f'{self.name} <{self.email}>'
