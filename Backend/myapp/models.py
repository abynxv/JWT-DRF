from django.contrib.auth.models import AbstractUser
from django.db import models
from rest_framework_simplejwt.tokens import RefreshToken



class User(AbstractUser):
    email = models.EmailField(max_length=255, unique=True, db_index=True)

    USERNAME_FIELD = "email"  # ✅ Set email as the primary authentication field
    REQUIRED_FIELDS = ["username"]  # ✅ Keep username but make email required for login

    def __str__(self):
        return self.email  # ✅ Now represents the user with email

    def tokens(self):
        refresh = RefreshToken.for_user(self)
        return {
            "refresh": str(refresh),
            "access": str(refresh.access_token),
        }
