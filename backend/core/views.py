import json

from django.contrib.auth import authenticate, login, logout
from django.core.exceptions import ValidationError
from django.core.validators import URLValidator, validate_email
from django.http import HttpResponse, JsonResponse
from django.shortcuts import get_object_or_404
from django.utils import timezone
from django.views.decorators.csrf import csrf_exempt, ensure_csrf_cookie
from django.views.decorators.http import require_GET, require_http_methods

from .images import InvalidImage, optimize_image
from .models import (
    LAST_POSITION, PLATFORMS, PORTFOLIO_CATEGORIES, ContactRequest, Project, ProjectScreenshot, number_projects, unique_slug,
)
from .notifications import notify_new_request


def serialize(project, request):
    pictures = list(project.screenshots.all())  # in the order of the model: the cover first
    return {
        'id': project.id, 'slug': project.slug, 'title': project.title, 'description': project.description,
        'challenge': project.challenge, 'features': project.features, 'results': project.results, 'website': project.website,
        'stack': project.stack, 'integrations': project.integrations, 'category': project.category, 'category_label': project.get_category_display(),
        'development_time': project.development_time, 'own': project.own, 'position': project.position, 'platforms': project.platforms, 'in_development': project.in_development,
        'published': project.published, 'translations': project.translations,
        'screenshots': [item.image.url for item in pictures],
        'screenshot_alts': [item.alt for item in pictures],
        'screenshot_ids': [item.id for item in pictures],
    }


def staff_required(view):
    def wrapped(request, *args, **kwargs):
        if not request.user.is_authenticated or not request.user.is_staff:
            return JsonResponse({'detail': 'Authentication required.'}, status=401)
        return view(request, *args, **kwargs)
    return wrapped


@ensure_csrf_cookie
@require_GET
def session(request):
    return JsonResponse({'authenticated': request.user.is_authenticated, 'username': request.user.get_username()})


@require_http_methods(['POST'])
def sign_in(request):
    payload = json.loads(request.body or '{}')
    user = authenticate(request, username=payload.get('username', ''), password=payload.get('password', ''))
    if not user or not user.is_staff:
        return JsonResponse({'detail': 'Invalid administrator credentials.'}, status=401)
    login(request, user)
    return JsonResponse({'username': user.get_username()})


@require_http_methods(['POST'])
def sign_out(request):
    logout(request)
    return JsonResponse({}, status=204)


@require_GET
def projects(request):
    queryset = Project.objects.prefetch_related('screenshots').filter(published=True)
    if request.user.is_staff:
        queryset = Project.objects.prefetch_related('screenshots').all()
    return JsonResponse({'projects': [serialize(project, request) for project in queryset], 'categories': [{'value': value, 'label': label} for value, label in PORTFOLIO_CATEGORIES]})


def parse_tags(value):
    return [item.strip() for item in value.split(',') if item.strip()]


def parse_lines(value):
    return [item.strip() for item in value.splitlines() if item.strip()]


ALT_LANGUAGES = ('de', 'en')
ALT_LENGTH = 300


def parse_pictures(value):
    """The dashboard's list of the saved pictures, cover first: [{"id": 1, "remove": false, "alt": {"de": "…", "en": "…"}}].
    Raises ValueError for anything else."""
    pictures = json.loads(value)
    if not isinstance(pictures, list):
        raise ValueError
    for item in pictures:
        if not isinstance(item, dict) or type(item.get('id')) is not int or not isinstance(item.get('alt', {}), dict):
            raise ValueError
        if any(not isinstance(text, str) or len(text) > ALT_LENGTH for text in item.get('alt', {}).values()):
            raise ValueError
    return pictures


def edit_pictures(project, pictures):
    """Apply order, captions and removals; returns the number the next new picture gets. A picture the list does not
    name (uploaded elsewhere meanwhile) stays as it is."""
    saved = {item.id: item for item in project.screenshots.all()}
    place = 0
    for entry in pictures:
        item = saved.get(entry['id'])
        if item is None:
            continue
        if entry.get('remove'):
            file = item.image
            item.delete()
            if not ProjectScreenshot.objects.filter(image=file.name).exists():
                file.delete(save=False)
            continue
        place += 1
        item.position = place
        if 'alt' in entry:
            texts = {**item.alt, **{language: entry['alt'].get(language, '').strip() for language in ALT_LANGUAGES}}
            item.alt = {language: text for language, text in texts.items() if text}
        item.save(update_fields=['position', 'alt'])
    return place + 1


def apply_project_form(project, request):
    """Copy the dashboard form onto `project`; returns an error response or None."""
    category = request.POST.get('category', '')
    if category not in dict(PORTFOLIO_CATEGORIES):
        return JsonResponse({'detail': 'Invalid portfolio category.'}, status=400)
    website = request.POST.get('website', '').strip()
    try:
        if website:
            URLValidator(schemes=['http', 'https'])(website)
    except ValidationError:
        return JsonResponse({'detail': 'Invalid website URL.'}, status=400)
    project.title = request.POST['title']
    project.slug = unique_slug(request.POST.get('slug', '').strip() or project.title, exclude=project.pk)
    project.description = request.POST['description']
    project.challenge = request.POST.get('challenge', '').strip()
    project.features = parse_lines(request.POST.get('features', ''))
    project.results = parse_lines(request.POST.get('results', ''))
    project.website = website
    project.category = category
    project.stack = parse_tags(request.POST.get('stack', ''))
    project.development_time = request.POST['development_time']
    project.published = request.POST.get('published') == 'true'
    project.in_development = request.POST.get('in_development') == 'true'
    project.platforms = [item for item in PLATFORMS if item in request.POST.getlist('platforms')]
    # Fields a dashboard page loaded before they existed does not send: absent means "leave as it is".
    if 'own' in request.POST:
        project.own = request.POST['own'] == 'true'
    if 'integrations' in request.POST:
        project.integrations = parse_tags(request.POST['integrations'])
    try:
        pictures = parse_pictures(request.POST['pictures']) if 'pictures' in request.POST else None
    except ValueError:
        return JsonResponse({'detail': 'Invalid picture list.'}, status=400)
    english = {
        'description': request.POST.get('description_en', '').strip(), 'stack': parse_tags(request.POST.get('stack_en', '')),
        'challenge': request.POST.get('challenge_en', '').strip(),
        'features': parse_lines(request.POST.get('features_en', '')), 'results': parse_lines(request.POST.get('results_en', '')),
    }
    project.translations = {'en': {key: value for key, value in english.items() if value}} if any(english.values()) else {}
    try:
        images = [optimize_image(upload) for upload in request.FILES.getlist('screenshots')]
    except InvalidImage:
        return JsonResponse({'detail': 'Screenshots must be valid image files.'}, status=400)
    project.save()
    # With a picture list, new uploads follow the saved ones in the order picked; without one they lead, newest first.
    first = edit_pictures(project, pictures) if pictures is not None else None
    ProjectScreenshot.objects.bulk_create([
        ProjectScreenshot(project=project, image=image, position=0 if first is None else first + index)
        for index, image in enumerate(images)
    ])
    return None


@staff_required
@require_http_methods(['POST'])
def create_project(request):
    project = Project(position=LAST_POSITION)
    error = apply_project_form(project, request)
    if error:
        return error
    number_projects()
    project.refresh_from_db(fields=['position'])
    return JsonResponse({'project': serialize(project, request)}, status=201)


@staff_required
@require_http_methods(['POST'])
def update_project(request, project_id):
    project = get_object_or_404(Project, pk=project_id)
    error = apply_project_form(project, request)
    return error or JsonResponse({'project': serialize(project, request)})


@staff_required
@require_http_methods(['POST'])
def move_project(request, project_id):
    project = get_object_or_404(Project, pk=project_id)
    try:
        place = int(json.loads(request.body)['place'])
        if place < 1:
            raise ValueError
    except (KeyError, TypeError, ValueError):
        return JsonResponse({'detail': 'Invalid place number.'}, status=400)
    number_projects(project, place)
    return HttpResponse(status=204)


@staff_required
@require_http_methods(['DELETE'])
def delete_project(request, project_id):
    get_object_or_404(Project, pk=project_id).delete()
    number_projects()
    return HttpResponse(status=204)


CONTACT_FIELDS = {'name': 160, 'email': 254, 'company': 160, 'phone': 60, 'message': 5000, 'locale': 8}
ATTRIBUTION_KEYS = ('utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'gclid', 'fbclid', 'msclkid', 'landing_page', 'referrer')


# Public lead form: no session or authentication involved, so CSRF protection adds nothing here.
@csrf_exempt
@require_http_methods(['POST'])
def contact(request):
    try:
        payload = json.loads(request.body or '{}')
    except json.JSONDecodeError:
        return JsonResponse({'detail': 'Invalid JSON.'}, status=400)
    if payload.get('website'):  # honeypot field, invisible to humans
        return JsonResponse({}, status=201)
    data = {field: str(payload.get(field, '')).strip()[:limit] for field, limit in CONTACT_FIELDS.items()}
    errors = [field for field in ('name', 'email', 'message') if not data[field]]
    try:
        validate_email(data['email'])
    except ValidationError:
        errors.append('email')
    if errors or payload.get('consent') is not True:
        return JsonResponse({'detail': 'Invalid contact request.', 'fields': sorted(set(errors))}, status=400)
    source = payload.get('attribution') if isinstance(payload.get('attribution'), dict) else {}
    item = ContactRequest.objects.create(**data, attribution={key: str(source[key])[:500] for key in ATTRIBUTION_KEYS if source.get(key)})
    notify_new_request(item)
    return JsonResponse({}, status=201)


def serialize_contact(item):
    return {'id': item.id, 'name': item.name, 'email': item.email, 'company': item.company, 'phone': item.phone,
            'message': item.message, 'locale': item.locale, 'attribution': item.attribution, 'status': item.status,
            'note': item.note, 'created_at': item.created_at.isoformat()}


@staff_required
@require_GET
def contact_requests(request):
    return JsonResponse({'requests': [serialize_contact(item) for item in ContactRequest.objects.all()[:500]]})


@staff_required
@require_http_methods(['POST'])
def update_contact_request(request, request_id):
    """Change the status, the note or both. Only what is sent is written, so two quick changes do not undo each other."""
    item = get_object_or_404(ContactRequest, pk=request_id)
    try:
        payload = json.loads(request.body)
        changes = {field: payload[field] for field in ('status', 'note') if field in payload}
        if not changes or not all(isinstance(value, str) for value in changes.values()):
            raise ValueError
    except (TypeError, ValueError):
        return JsonResponse({'detail': 'Nothing valid to change.'}, status=400)
    if changes.get('status', item.status) not in dict(ContactRequest.STATUSES):
        return JsonResponse({'detail': 'Invalid status.'}, status=400)
    if 'note' in changes:
        changes['note'] = changes['note'].strip()
        if len(changes['note']) > ContactRequest._meta.get_field('note').max_length:
            return JsonResponse({'detail': 'The note is too long.'}, status=400)
    changed = [field for field, value in changes.items() if getattr(item, field) != value]
    if changed:
        for field in changed:
            setattr(item, field, changes[field])
        item.marked_at = timezone.now()
        item.save(update_fields=[*changed, 'marked_at'])
    return JsonResponse({'request': serialize_contact(item)})


@staff_required
@require_http_methods(['DELETE'])
def delete_contact_request(request, request_id):
    get_object_or_404(ContactRequest, pk=request_id).delete()
    return HttpResponse(status=204)
