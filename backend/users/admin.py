from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User


@admin.register(User)
class CustomUserAdmin(UserAdmin):
    list_display = ["username", "email", "role", "is_approved", "date_joined"]
    list_filter = ["role", "is_approved"]
    fieldsets = UserAdmin.fieldsets + (
        ("ReCoin", {"fields": ("role", "phone", "address", "is_approved")}),
    )
    actions = ["approve_users"]

    @admin.action(description="Approve selected users")
    def approve_users(self, request, queryset):
        queryset.update(is_approved=True)
