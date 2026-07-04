from django.db import models

class Course(models.Model):
    title = models.CharField(max_length=255, verbose_name="课程标题")
    cover_image = models.CharField(max_length=500, verbose_name="课程封面")
    summary = models.TextField(verbose_name="简介")
    price = models.DecimalField(max_digits=10, decimal_places=2, verbose_name="价格")
    original_price = models.DecimalField(max_digits=10, decimal_places=2, verbose_name="原价")
    instructor = models.CharField(max_length=100, verbose_name="讲师")
    rating = models.DecimalField(max_digits=3, decimal_places=1, verbose_name="评分")
    highlights = models.TextField(verbose_name="课程亮点", help_text="用于展示课程的特色亮点，换行分隔多个亮点")
    header_image = models.CharField(max_length=500, verbose_name="课程首图")
    detail_image = models.CharField(max_length=500, verbose_name="课程详情图")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="创建时间")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="更新时间")

    class Meta:
        db_table = "course"  # 显式指定表名为 "course"
        verbose_name = "AI 编程课"
        verbose_name_plural = verbose_name

    def __str__(self):
        return self.title
