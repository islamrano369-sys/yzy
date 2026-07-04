from rest_framework import serializers
from .models import SystemMessage
from djoser.serializers import UserCreateSerializer as BaseUserCreateSerializer, UserSerializer as BaseUserSerializer
from django.contrib.auth import get_user_model

User = get_user_model()

class SystemMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = SystemMessage
        fields = '__all__'

from django.db import models

class UserCreateSerializer(BaseUserCreateSerializer):
    class Meta(BaseUserCreateSerializer.Meta):
        model = User
        fields = tuple(User.REQUIRED_FIELDS) + (
            User.USERNAME_FIELD,
            "password",
            "first_name",
            "last_name",
        )

    def validate(self, attrs):
        username = attrs.get("username")
        email = attrs.get("email")
        
        # 查找是否存在相同用户名或邮箱的未激活用户
        inactive_user = User.objects.filter(
            models.Q(username=username) | models.Q(email=email),
            is_active=False
        ).first()
        
        if inactive_user:
            # 如果存在相同邮箱/用户名且未激活的临时账号，删除它，以便重新注册并触发新的激活邮件
            inactive_user.delete()
            
        return super().validate(attrs)

class UserSerializer(BaseUserSerializer):
    class Meta(BaseUserSerializer.Meta):
        model = User
        fields = (
            "id",
            "username",
            "email",
            "first_name",
            "last_name",
        )

