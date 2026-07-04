from django.db import models

class SystemMessage(models.Model):
    title = models.CharField("标题", max_length=100)
    content = models.TextField("内容")
    created_at = models.DateTimeField("创建时间", auto_now_add=True)
    updated_at = models.DateTimeField("更新时间", auto_now=True)

    class Meta:
        verbose_name = "系统消息"
        verbose_name_plural = verbose_name

    def __str__(self):
        return self.title
