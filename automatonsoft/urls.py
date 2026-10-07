"""
URL configuration for automatonsoft project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/6.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path
from backend import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/session/', views.session), path('api/session/login/', views.sign_in), path('api/session/logout/', views.sign_out),
    path('api/projects/', views.projects), path('api/projects/create/', views.create_project),
    path('api/projects/<int:project_id>/update/', views.update_project),
    path('api/projects/<int:project_id>/delete/', views.delete_project),
    path('api/contact/', views.contact), path('api/contact-requests/', views.contact_requests),
]

# Uploaded media is served by Nginx in production; the dev server needs this to show dashboard uploads locally.
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
