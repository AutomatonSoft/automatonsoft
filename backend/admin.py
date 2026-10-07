from django.contrib import admin
from .models import ContactRequest, Project, ProjectScreenshot


class ProjectScreenshotInline(admin.TabularInline):
    model = ProjectScreenshot
    extra = 0


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'development_time', 'published', 'updated_at')
    list_filter = ('category', 'published')
    search_fields = ('title', 'description')
    inlines = [ProjectScreenshotInline]


@admin.register(ContactRequest)
class ContactRequestAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'company', 'locale', 'created_at')
    list_filter = ('locale',)
    search_fields = ('name', 'email', 'company', 'message')
    readonly_fields = ('created_at',)
