from django.contrib import admin
from .models import Material, Declaration


@admin.register(Material)
class MaterialAdmin(admin.ModelAdmin):
    list_display = ["name", "unit", "coins_per_unit"]


@admin.register(Declaration)
class DeclarationAdmin(admin.ModelAdmin):
    list_display = ["user", "material", "quantity", "status", "created_at"]
    list_filter = ["status", "material"]
