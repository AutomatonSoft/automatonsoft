import json

from django.contrib.auth import authenticate, login, logout
from django.http import HttpResponse, JsonResponse
from django.shortcuts import get_object_or_404
from django.views.decorators.csrf import ensure_csrf_cookie
from django.views.decorators.http import require_GET, require_http_methods

from .models import PORTFOLIO_CATEGORIES, Project, ProjectScreenshot


def serialize(project, request):
    return {
        'id': project.id, 'title': project.title, 'description': project.description,
        'stack': project.stack, 'category': project.category, 'category_label': project.get_category_display(),
        'development_time': project.development_time,
        'published': project.published,
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


@staff_required
@require_http_methods(['POST'])
def create_project(request):
    category = request.POST.get('category', '')
    if category not in dict(PORTFOLIO_CATEGORIES):
        return JsonResponse({'detail': 'Invalid portfolio category.'}, status=400)
    project = Project.objects.create(
        title=request.POST['title'], description=request.POST['description'],
        stack=[item.strip() for item in request.POST.get('stack', '').split(',') if item.strip()],
        category=category, development_time=request.POST['development_time'], published=request.POST.get('published') == 'true',
    )
    ProjectScreenshot.objects.bulk_create([ProjectScreenshot(project=project, image=image) for image in request.FILES.getlist('screenshots')])
    return JsonResponse({'project': serialize(project, request)}, status=201)


@staff_required
@require_http_methods(['POST'])
def update_project(request, project_id):
    category = request.POST.get('category', '')
    if category not in dict(PORTFOLIO_CATEGORIES):
        return JsonResponse({'detail': 'Invalid portfolio category.'}, status=400)
    project = get_object_or_404(Project, pk=project_id)
    project.title = request.POST['title']
    project.description = request.POST['description']
    project.category = category
    project.stack = [item.strip() for item in request.POST.get('stack', '').split(',') if item.strip()]
    project.development_time = request.POST['development_time']
    project.published = request.POST.get('published') == 'true'
    project.save()
    ProjectScreenshot.objects.bulk_create([ProjectScreenshot(project=project, image=image) for image in request.FILES.getlist('screenshots')])
    return JsonResponse({'project': serialize(project, request)})


@staff_required
@require_http_methods(['DELETE'])
def delete_project(request, project_id):
    get_object_or_404(Project, pk=project_id).delete()
    return HttpResponse(status=204)
