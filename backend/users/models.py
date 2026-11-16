from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    class Role(models.TextChoices):
        CITIZEN = "citizen", "Citizen"
        BUSINESS = "business", "Business"
        COLLECTOR = "collector", "Collector"
        FACTORY = "factory", "Factory"
        ADMIN = "admin", "Admin"

    role = models.CharField(max_length=20, choices=Role.choices, default=Role.CITIZEN)
    phone = models.CharField(max_length=20, blank=True)
    address = models.TextField(blank=True)

    # Business/Collector/Factory accounts need admin approval before they can use the platform.
    # Citizens are approved by default since they don't need verification.
    is_approved = models.BooleanField(default=False)

    def save(self, *args, **kwargs):
        # Citizens don't need manual approval
        if self.role == self.Role.CITIZEN:
            self.is_approved = True
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.username} ({self.role})"
