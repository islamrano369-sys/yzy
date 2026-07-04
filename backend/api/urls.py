from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    SystemMessageViewSet, 
    api_status, 
    CustomUserRegistrationView, 
    CustomUserActivationView
)
from main.views import CourseViewSet

router = DefaultRouter()
router.register(r'messages', SystemMessageViewSet, basename='message')
router.register(r'courses', CourseViewSet, basename='course')

urlpatterns = [
    path('status/', api_status, name='api_status'),
    # 拦截并重定向 Djoser 的注册与激活，改为无状态签名 Token 方案，避免在数据库存入未激活账户
    path('auth/users/', CustomUserRegistrationView.as_view(), name='custom_registration'),
    path('auth/users/activation/', CustomUserActivationView.as_view(), name='custom_activation'),
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.jwt')),
    path('', include(router.urls)),
]
