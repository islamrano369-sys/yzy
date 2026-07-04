from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import SystemMessage
from .serializers import SystemMessageSerializer
from rest_framework import status
from rest_framework.views import APIView
from django.contrib.auth import get_user_model
from django.contrib.auth.hashers import make_password
from django.core import signing
from django.core.mail import send_mail
from django.conf import settings

User = get_user_model()

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

class CustomUserRegistrationView(APIView):
    def post(self, request, *args, **kwargs):
        username = request.data.get("username")
        email = request.data.get("email")
        password = request.data.get("password")
        re_password = request.data.get("re_password")

        if not username or not email or not password or not re_password:
            return Response({"detail": "所有字段都是必填的。"}, status=status.HTTP_400_BAD_REQUEST)

        if password != re_password:
            return Response({"password": ["两次输入的密码不一致。"]}, status=status.HTTP_400_BAD_REQUEST)

        if len(password) < 6:
            return Response({"password": ["密码长度至少为 6 位。"]}, status=status.HTTP_400_BAD_REQUEST)

        # 检查数据库中是否已存在该邮箱或用户名（并且是已激活的正式账户）
        if User.objects.filter(username=username, is_active=True).exists():
            return Response({"username": ["该用户名已被注册。"]}, status=status.HTTP_400_BAD_REQUEST)

        if User.objects.filter(email=email, is_active=True).exists():
            return Response({"email": ["该邮箱已被注册。"]}, status=status.HTTP_400_BAD_REQUEST)

        # 对密码进行安全哈希
        password_hash = make_password(password)

        # 把注册信息加密/签名打包为 Token
        token_data = {
            "username": username.strip(),
            "email": email.strip(),
            "password": password_hash,
            "first_name": username.strip(),
            "last_name": ""
        }
        token = signing.dumps(token_data)

        # 激活 URL
        activation_link = f"http://localhost:3000/activate/confirm/{token}"
        email_body = f"""您好，欢迎注册 NOVA AI！
请点击以下链接激活您的账户以完成注册：

{activation_link}

如果您没有进行过此注册操作，请忽略本邮件。
NOVA AI 团队"""

        try:
            send_mail(
                subject="激活您的 NOVA AI 账户",
                message=email_body,
                from_email=settings.DEFAULT_FROM_EMAIL,
                recipient_list=[email],
                fail_silently=False,
            )
        except Exception as e:
            # 同样支持 Fallback 控制台输出
            import sys
            sys.stderr.write(f"\n========================================================\n")
            sys.stderr.write(f"[邮件发送失败] SMTP 认证/发送出错: {e}\n")
            sys.stderr.write(f"[回退机制启用] 已将注册激活邮件内容输出到下方控制台日志中，请复制激活链接进行测试：\n")
            sys.stderr.write(f"--------------------------------------------------------\n")
            sys.stderr.write(email_body)
            sys.stderr.write(f"\n========================================================\n\n")

        return Response({"detail": "激活邮件已发送，请查收。"}, status=status.HTTP_201_CREATED)


class CustomUserActivationView(APIView):
    def post(self, request, *args, **kwargs):
        token = request.data.get("token")
        if not token:
            return Response({"detail": "无效的激活 Token。"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            # 解密/验签 Token（有效时间：1 天）
            data = signing.loads(token, max_age=86400)
        except signing.SignatureExpired:
            return Response({"detail": "激活链接已过期。"}, status=status.HTTP_400_BAD_REQUEST)
        except signing.BadSignature:
            return Response({"detail": "激活链接无效。"}, status=status.HTTP_400_BAD_REQUEST)

        username = data.get("username")
        email = data.get("email")
        password = data.get("password")
        first_name = data.get("first_name", "")
        last_name = data.get("last_name", "")

        # 检查是否在等待期间，用户名或邮箱已被其他账号捷足先登激活
        if User.objects.filter(username=username, is_active=True).exists():
            return Response({"detail": "该用户名已被其他账号注册。"}, status=status.HTTP_400_BAD_REQUEST)
        if User.objects.filter(email=email, is_active=True).exists():
            return Response({"detail": "该邮箱已被其他账号注册。"}, status=status.HTTP_400_BAD_REQUEST)

        # 激活时才正式入库创建已激活用户！
        # 如果存在同名或同邮箱的残留记录，进行清理
        User.objects.filter(username=username).delete()
        User.objects.filter(email=email).delete()

        user = User.objects.create(
            username=username,
            email=email,
            password=password, # 这里存的已经是 make_password 后的哈希，可以直接存入
            first_name=first_name,
            last_name=last_name,
            is_active=True
        )
        user.save()

        return Response(status=status.HTTP_204_NO_CONTENT)


