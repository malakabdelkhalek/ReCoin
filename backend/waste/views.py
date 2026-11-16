from rest_framework import generics, permissions
from .models import Material, Declaration
from .serializers import MaterialSerializer, DeclarationSerializer
from users.permissions import IsApproved


class MaterialListView(generics.ListAPIView):
    """Public list of recyclable materials and their coin rates."""
    queryset = Material.objects.all()
    serializer_class = MaterialSerializer
    permission_classes = [permissions.IsAuthenticated]


class DeclarationListCreateView(generics.ListCreateAPIView):
    serializer_class = DeclarationSerializer
    permission_classes = [permissions.IsAuthenticated, IsApproved]

    def get_queryset(self):
        # Users only see their own declarations
        return Declaration.objects.filter(user=self.request.user).order_by("-created_at")
