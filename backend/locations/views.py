from rest_framework import generics, permissions
from .models import DropOffPoint
from .serializers import DropOffPointSerializer


class DropOffPointListView(generics.ListAPIView):
    """Returns all active drop-off points for the map."""
    serializer_class = DropOffPointSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return DropOffPoint.objects.filter(is_active=True)
