from django.db import models

from accounts.models import Profile
from news.models import News 
# Create your models here.

class CollectionTag(models.Model): # this model should be referenced by Post and Collection 
    name = models.CharField(max_length=128)

    def __str__(self):
        return self.name

class Collection(models.Model):
    
    author = models.ForeignKey(Profile, on_delete=models.SET_NULL, null=True, verbose_name="작성자")
    news = models.ManyToManyField(News)
    title = models.CharField(max_length=120, verbose_name="컬렉션제목")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="만든 날짜")
    likes = models.IntegerField(default=0, verbose_name="좋아요수")
    views = models.IntegerField(default=0, verbose_name="조회수")
    refCount = models.IntegerField(default=0, verbose_name="참조수")
    tag = models.ManyToManyField(CollectionTag)
    comment = models.CharField(max_length = 120, null =True, verbose_name="코멘트")
    
    def __str__(self):
        return self.id

    # TODO: image, editor_comment, tag, category  필드 추가 



