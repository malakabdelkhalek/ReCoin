from django.urls import path
from .views import MaterialListView, DeclarationListCreateView

urlpatterns = [
    path("materials/", MaterialListView.as_view(), name="materials"),
    path("declarations/", DeclarationListCreateView.as_view(), name="declarations"),
]
