from django.contrib import admin
from .models import DropOffPoint


@admin.register(DropOffPoint)
class DropOffPointAdmin(admin.ModelAdmin):
    list_display = ["name", "address", "is_active"]
    list_filter = ["is_active"]
