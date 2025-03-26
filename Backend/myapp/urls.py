from . import views
from django.urls import path
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

app_name = 'myapp'

urlpatterns = [
    path('signup/',views.RegisterView.as_view(),name="register"),
    path('login/',views.LoginAPIView.as_view(),name="login"),
    path('logout/', views.LogoutAPIView.as_view(), name="logout"),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path("protected/", views.protected_view, name="protected"),
]