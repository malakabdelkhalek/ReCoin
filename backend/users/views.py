from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import User
from .serializers import RegisterSerializer, UserProfileSerializer, AdminUserSerializer
from .permissions import IsAdmin


class RegisterView(generics.CreateAPIView):
    serializer_class = RegisterSerializer
    permission_classes = [permissions.AllowAny]


class ProfileView(generics.RetrieveUpdateAPIView):
    serializer_class = UserProfileSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user


class PendingAccountsView(generics.ListAPIView):
    """Admin only: list accounts waiting for approval."""
    serializer_class = AdminUserSerializer
    permission_classes = [IsAdmin]

    def get_queryset(self):
        return User.objects.filter(is_approved=False).exclude(role="citizen")


class ApproveAccountView(APIView):
    """Admin only: approve a specific account by user ID."""
    permission_classes = [IsAdmin]

    def post(self, request, user_id):
        try:
            user = User.objects.get(id=user_id, is_approved=False)
        except User.DoesNotExist:
            return Response(
                {"detail": "User not found or already approved."},
                status=status.HTTP_404_NOT_FOUND,
            )
        user.is_approved = True
        user.save()
        return Response({"detail": f"{user.username} approved successfully."})
