from .models import CustomUser
from rest_framework import serializers
from django.contrib.auth import authenticate


# User Serializer


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('id', 'username', 'email', 'first_name', 'last_name', 'balance', 'user_type')


# Login Serializer


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        else:
            raise serializers.ValidationError('Incorrect user\login pair')