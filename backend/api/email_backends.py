import sys
from django.core.mail.backends.smtp import EmailBackend as SmtpEmailBackend
from django.core.mail.backends.console import EmailBackend as ConsoleEmailBackend

class FallbackEmailBackend(SmtpEmailBackend):
    def send_messages(self, email_messages):
        try:
            # 尝试使用真实的 SMTP 发送邮件
            return super().send_messages(email_messages)
        except Exception as e:
            # 如果 SMTP 认证失败或连接超时，自动回退到控制台打印输出，防止接口报 500 错误
            sys.stderr.write(f"\n========================================================\n")
            sys.stderr.write(f"[邮件发送失败] SMTP 服务不可用或认证失败: {e}\n")
            sys.stderr.write(f"[回退机制启用] 已将注册激活邮件内容输出到下方控制台日志中，请复制激活链接进行测试：\n")
            sys.stderr.write(f"========================================================\n")
            
            console_backend = ConsoleEmailBackend()
            result = console_backend.send_messages(email_messages)
            
            sys.stderr.write(f"========================================================\n\n")
            return result
