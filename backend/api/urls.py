from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import SystemMessageViewSet, api_status

router = DefaultRouter()
router.register(r'messages', SystemMessageViewSet, basename='message')

urlpatterns = [
    path('status/', api_status, name='api_status'),
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.jwt')),
    path('', include(router.urls)),
]
