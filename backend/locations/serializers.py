from rest_framework import serializers
from .models import DropOffPoint


class DropOffPointSerializer(serializers.ModelSerializer):
    # Extract lat/lng from the PostGIS PointField for easy frontend consumption
    latitude = serializers.SerializerMethodField()
    longitude = serializers.SerializerMethodField()

    class Meta:
        model = DropOffPoint
        fields = ["id", "name", "address", "accepted_materials", "latitude", "longitude"]

    def get_latitude(self, obj):
        return obj.location.y

    def get_longitude(self, obj):
        return obj.location.x
