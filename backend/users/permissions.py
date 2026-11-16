from rest_framework.permissions import BasePermission


class IsAdmin(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role == "admin"


class IsApproved(BasePermission):
    """Blocks access for accounts that haven't been approved yet."""
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.is_approved
