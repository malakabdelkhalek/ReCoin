from django.db import models
from django.conf import settings


class Material(models.Model):
    """Types of recyclable material (plastic, oil, cans…) managed by the admin."""
    name = models.CharField(max_length=100, unique=True)
    unit = models.CharField(max_length=20)  # e.g. "kg", "litre", "unit"
    coins_per_unit = models.DecimalField(max_digits=8, decimal_places=2)

    def __str__(self):
        return f"{self.name} ({self.unit})"


class Declaration(models.Model):
    class Status(models.TextChoices):
        PENDING = "pending", "Pending"
        VERIFIED = "verified", "Verified"
        REJECTED = "rejected", "Rejected"

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="declarations",
    )
    material = models.ForeignKey(Material, on_delete=models.PROTECT)
    quantity = models.DecimalField(max_digits=10, decimal_places=2)
    photo = models.ImageField(upload_to="declarations/", blank=True, null=True)
    status = models.CharField(max_length=20, choices=Status.choices, default=Status.PENDING)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} — {self.material.name} x{self.quantity} [{self.status}]"
