from django.db import models
from django.contrib.auth.models import User 

from news.models import News 
# Create your models here.

class Collection(models.Model):
    
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    news = models.ManyToManyField(News)
    name = models.CharField(max_length=120)
    created_at = models.DateTimeField(auto_now_add=True)
    likes = models.IntegerField(default=0)
    views = models.IntegerField(default=0)
    refCount = models.IntegerField(default=0)

