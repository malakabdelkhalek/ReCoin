from django.urls import path
from .views import DropOffPointListView

urlpatterns = [
    path("dropoff-points/", DropOffPointListView.as_view(), name="dropoff_points"),
]
