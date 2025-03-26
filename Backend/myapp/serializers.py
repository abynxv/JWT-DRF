from rest_framework import serializers
from .models import User
from django.contrib import auth
from django.contrib.auth import authenticate
from rest_framework.exceptions import AuthenticationFailed
from rest_framework_simplejwt.tokens import RefreshToken, TokenError
from django.contrib.auth import get_user_model

User = get_user_model()


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=6)
    tokens = serializers.SerializerMethodField()  # Gets tokens from the model

    class Meta:
        model = User
        fields = ["email", "username", "password", "tokens"]

    def validate(self, attrs):
        if not attrs["username"].isalnum():
            raise serializers.ValidationError(
                {"username": "Username should only contain alphanumeric characters."}
            )
        return attrs

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)  # Create user

    def get_tokens(self, obj):
        return obj.tokens()

class LoginSerializer(serializers.ModelSerializer):
    email = serializers.EmailField()
    password = serializers.CharField(max_length=68, min_length=6, write_only=True)
    tokens = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ["email", "password", "tokens"]

    def get_tokens(self, obj):
        user = User.objects.get(email=obj["email"])
        return user.tokens()  # ✅ Get access & refresh tokens

    def validate(self, attrs):
        email = attrs.get("email", "")
        password = attrs.get("password", "")

        user = authenticate(username=email, password=password)  # ✅ Authenticate with email
        if not user:
            raise AuthenticationFailed("Invalid credentials, try again")
        if not user.is_active:
            raise AuthenticationFailed("Account disabled, contact admin")

        return {
            "email": user.email,
            "tokens": user.tokens(),
        }

class LogoutSerializer(serializers.Serializer):
    refresh = serializers.CharField()
    def validate(self, attrs):
        self.token = attrs['refresh']
        return attrs
    def save(self, **kwargs):
        try:
            RefreshToken(self.token).blacklist()
        except TokenError:
            self.fail('bad_token')
