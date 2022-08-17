from django.db import models

from accounts.models import Profile
from news.models import News 
# Create your models here.

class Collection(models.Model):
    
    author = models.ForeignKey(Profile, on_delete=models.SET_NULL, null=True)
    news = models.ManyToManyField(News)
    title = models.CharField(max_length=120)
    created_at = models.DateTimeField(auto_now_add=True)
    likes = models.IntegerField(default=0)
    views = models.IntegerField(default=0)
    refCount = models.IntegerField(default=0)

    def __str__(self):
        return self.title

    # TODO: image, editor_comment, tag, category  필드 추가 



