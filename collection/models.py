from django.db import models

from accounts.models import User
from news.models import News
# from post.models import Tag

# Create your models here.

class Collection(models.Model):
    
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    news = models.ManyToManyField(News)
    title = models.CharField(max_length=120)
    created_at = models.DateTimeField(auto_now_add=True)
    likes = models.IntegerField(default=0)
    views = models.IntegerField(default=0)
    refCount = models.IntegerField(default=0)
    tag = models.ManyToManyField(to='post.Tag', null=True)

    def __str__(self):
        return self.title 
    
    # TODO: image, editor_comment, tag, category  필드 추가 