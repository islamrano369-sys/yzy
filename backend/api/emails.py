from djoser.email import ActivationEmail as DjoserActivationEmail
from django.conf import settings

class ActivationEmail(DjoserActivationEmail):
    def get_context_data(self):
        context = super().get_context_data()
        
        # 强制指定前端的域名和端口，防止 Djoser 默认从 request 中取后端接口端口 (8000)
        djoser_settings = getattr(settings, "DJOSER", {})
        context["domain"] = djoser_settings.get("DOMAIN", "localhost:3000")
        context["site_name"] = djoser_settings.get("SITE_NAME", "NOVA AI")
        
        return context
