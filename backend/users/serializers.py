from rest_framework import serializers
from django.contrib.auth.password_validation import validate_password
from .models import User


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, validators=[validate_password])

    class Meta:
        model = User
        fields = ["id", "username", "email", "password", "role", "phone", "address"]

    def create(self, validated_data):
        # Use create_user so the password is properly hashed
        return User.objects.create_user(**validated_data)


class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "email", "role", "phone", "address", "is_approved"]
        # These fields must not be changed through the profile endpoint
        read_only_fields = ["id", "role", "is_approved"]


class AdminUserSerializer(serializers.ModelSerializer):
    """Used by admins to list and approve accounts."""
    class Meta:
        model = User
        fields = ["id", "username", "email", "role", "phone", "is_approved", "date_joined"]
        read_only_fields = ["id", "username", "email", "role", "date_joined"]
