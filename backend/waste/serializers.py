from rest_framework import serializers
from .models import Material, Declaration


class MaterialSerializer(serializers.ModelSerializer):
    class Meta:
        model = Material
        fields = ["id", "name", "unit", "coins_per_unit"]


class DeclarationSerializer(serializers.ModelSerializer):
    # Show material name in responses, accept material id on create
    material_name = serializers.CharField(source="material.name", read_only=True)

    class Meta:
        model = Declaration
        fields = ["id", "material", "material_name", "quantity", "photo", "status", "created_at"]
        read_only_fields = ["id", "status", "created_at"]

    def create(self, validated_data):
        # Attach the logged-in user automatically
        validated_data["user"] = self.context["request"].user
        return super().create(validated_data)
