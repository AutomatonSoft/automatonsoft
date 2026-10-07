import json

from django.contrib.auth import authenticate, login, logout
from django.core.exceptions import ValidationError
from django.core.validators import validate_email
from django.http import HttpResponse, JsonResponse
from django.shortcuts import get_object_or_404
from django.views.decorators.csrf import csrf_exempt, ensure_csrf_cookie
from django.views.decorators.http import require_GET, require_http_methods

from .models import PORTFOLIO_CATEGORIES, ContactRequest, Project, ProjectScreenshot


def serialize(project, request):
    return {
        'id': project.id, 'title': project.title, 'description': project.description,
        'stack': project.stack, 'category': project.category, 'category_label': project.get_category_display(),
        'development_time': project.development_time,
        'published': project.published, 'translations': project.translations,
        'screenshots': [item.image.url for item in project.screenshots.order_by('-id')],
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


def apply_project_form(project, request):
    """Copy the dashboard form onto `project`; returns an error response or None."""
    category = request.POST.get('category', '')
    if category not in dict(PORTFOLIO_CATEGORIES):
        return JsonResponse({'detail': 'Invalid portfolio category.'}, status=400)
    project.title = request.POST['title']
    project.description = request.POST['description']
    project.category = category
    project.stack = parse_tags(request.POST.get('stack', ''))
    project.development_time = request.POST['development_time']
    project.published = request.POST.get('published') == 'true'
    english = {'description': request.POST.get('description_en', '').strip(), 'stack': parse_tags(request.POST.get('stack_en', ''))}
    project.translations = {'en': {key: value for key, value in english.items() if value}} if any(english.values()) else {}
    project.save()
    ProjectScreenshot.objects.bulk_create([ProjectScreenshot(project=project, image=image) for image in request.FILES.getlist('screenshots')])
    return None


@staff_required
@require_http_methods(['POST'])
def create_project(request):
    project = Project()
    error = apply_project_form(project, request)
    return error or JsonResponse({'project': serialize(project, request)}, status=201)


@staff_required
@require_http_methods(['POST'])
def update_project(request, project_id):
    project = get_object_or_404(Project, pk=project_id)
    error = apply_project_form(project, request)
    return error or JsonResponse({'project': serialize(project, request)})


@staff_required
@require_http_methods(['DELETE'])
def delete_project(request, project_id):
    get_object_or_404(Project, pk=project_id).delete()
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
    ContactRequest.objects.create(**data, attribution={key: str(source[key])[:500] for key in ATTRIBUTION_KEYS if source.get(key)})
    return JsonResponse({}, status=201)


@staff_required
@require_GET
def contact_requests(request):
    return JsonResponse({'requests': [
        {'id': item.id, 'name': item.name, 'email': item.email, 'company': item.company, 'phone': item.phone,
         'message': item.message, 'locale': item.locale, 'attribution': item.attribution, 'created_at': item.created_at.isoformat()}
        for item in ContactRequest.objects.all()[:500]
    ]})
