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
from django.contrib import admin
from django.http import Http404
from django.shortcuts import render
from django.urls import path

WEBSITE_PAGES = {
    'blog.html',
    'branchen.html',
    'datenschutz.html',
    'dienstleistungen.html',
    'entwickler-engagieren.html',
    'impressum.html',
    'index.html',
    'kontakt.html',
    'portfolio.html',
    'unternehmen.html',
}


def website_page(request, page='index.html'):
    if page not in WEBSITE_PAGES:
        raise Http404
    return render(request, page)


urlpatterns = [
    path('', website_page, name='home'),
    path('admin/', admin.site.urls),
    path('<str:page>', website_page, name='website-page'),
]
