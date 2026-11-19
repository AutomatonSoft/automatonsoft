import json
from pathlib import Path

from django.core.files import File

from .images import optimize_image
from .models import PORTFOLIO_CATEGORIES, Project, ProjectScreenshot

CATEGORY_GUESS = {
    'ecommerce': 'ecommerce-marketplace-automation', 'workforce': 'workforce-hr-automation', 'ai': 'ai-business-solutions',
    'supply-chain': 'supply-chain-warehouse', 'manufacturing': 'industrial-ai-manufacturing', 'hospitality': 'hospitality-hotel-software',
    'automotive': 'automotive-software', 'finance': 'finance-accounting-automation', 'custom': 'custom-software-business-automation',
}


def import_project(data, update=False, base_dir=None):
    """Create a project from the JSON card (docs/project-fact-prompt.md). An existing one is changed only with update=True.
    Screenshots listed in data['screenshots'] (paths relative to base_dir) are attached when the project has none yet.
    Returns 'created', 'updated' or 'kept'."""
    title = data['title'].strip()
    category = data.get('category') or CATEGORY_GUESS.get(data.get('category_guess'), '')
    if category not in dict(PORTFOLIO_CATEGORIES):
        raise ValueError(f'Unknown category for {title!r}: {category!r}')
    project = Project.objects.filter(title=title).first()
    if project and not update:
        attach_screenshots(project, data, base_dir)
        return 'kept'
    german = lambda key, empty='': (data.get(key) or {}).get('de') or empty
    english = {key: (data.get(key) or {}).get('en') for key in ('description', 'challenge', 'features', 'results')}
    english['stack'] = data.get('stack_en') or data.get('stack') or []
    project = project or Project(title=title)
    project.category = category
    project.description = german('description')
    project.challenge = german('challenge')
    project.features = german('features', [])
    project.results = german('results', [])
    project.stack = data.get('stack') or []
    project.integrations = data.get('integrations') or []
    project.website = data.get('website') or ''
    project.development_time = data.get('development_time') or '—'
    project.published = bool(data.get('published', False))
    project.translations = {'en': {key: value for key, value in english.items() if value}}
    created = project.pk is None
    project.save()
    attach_screenshots(project, data, base_dir)
    return 'created' if created else 'updated'


def attach_screenshots(project, data, base_dir):
    if project.screenshots.exists():
        return
    # Entries are file names or {'file': name, 'alt': {'de': …, 'en': …}}. The last one becomes the cover (newest first).
    for entry in data.get('screenshots') or []:
        name, alt = (entry, {}) if isinstance(entry, str) else (entry['file'], entry.get('alt') or {})
        with open(Path(base_dir) / name, 'rb') as handle:
            ProjectScreenshot.objects.create(project=project, alt=alt, image=optimize_image(File(handle, name=Path(name).name)))


def load_file(path, update=False):
    with open(path, encoding='utf-8') as handle:
        return import_project(json.load(handle), update=update, base_dir=Path(path).parent)
