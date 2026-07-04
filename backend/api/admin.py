from django.contrib import admin
from .models import SystemMessage

@admin.register(SystemMessage)
class SystemMessageAdmin(admin.ModelAdmin):
    list_display = ("id", "title", "created_at", "updated_at")
    search_fields = ("title", "content")
    list_filter = ("created_at",)

