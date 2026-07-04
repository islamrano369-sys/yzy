from django.contrib.auth.backends import ModelBackend
from django.contrib.auth import get_user_model

class EmailOrUsernameModelBackend(ModelBackend):
    def authenticate(self, request, username=None, password=None, **kwargs):
        UserModel = get_user_model()
        if username is None:
            username = kwargs.get(UserModel.USERNAME_FIELD)
        try:
            # 允许使用邮箱或用户名登录
            user = UserModel.objects.filter(email=username).first() or UserModel.objects.filter(username=username).first()
        except Exception:
            return None
        
        if user and user.check_password(password) and self.user_can_authenticate(user):
            return user
        return None
