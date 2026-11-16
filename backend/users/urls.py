from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import RegisterView, ProfileView, PendingAccountsView, ApproveAccountView

urlpatterns = [
    path("register/", RegisterView.as_view(), name="register"),
    path("login/", TokenObtainPairView.as_view(), name="login"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("profile/", ProfileView.as_view(), name="profile"),
    # Admin endpoints
    path("admin/pending/", PendingAccountsView.as_view(), name="pending_accounts"),
    path("admin/approve/<int:user_id>/", ApproveAccountView.as_view(), name="approve_account"),
]
