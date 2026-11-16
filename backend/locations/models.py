from django.contrib.gis.db import models


class DropOffPoint(models.Model):
    name = models.CharField(max_length=200)
    address = models.TextField(blank=True)
    location = models.PointField()  # PostGIS point (longitude, latitude)
    accepted_materials = models.TextField(blank=True, help_text="Comma-separated list of accepted materials")
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.name
