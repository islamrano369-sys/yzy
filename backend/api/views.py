from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import SystemMessage
from .serializers import SystemMessageSerializer

class SystemMessageViewSet(viewsets.ModelViewSet):
    queryset = SystemMessage.objects.all().order_by('-created_at')
    serializer_class = SystemMessageSerializer

@api_view(['GET'])
def api_status(request):
    """
    检查 API 服务的运行状态
    """
    return Response({
        "status": "ok",
        "message": "后端接口运行正常！",
        "framework": "Django 6.0 + Django REST Framework"
    })

