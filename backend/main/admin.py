from django.contrib import admin
from .models import Course

@admin.register(Course)
class CourseAdmin(admin.ModelAdmin):
    list_display = ("title", "instructor", "price", "rating", "created_at")
    search_fields = ("title", "instructor")
    list_filter = ("rating",)
