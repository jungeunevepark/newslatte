from re import L
from ssl import create_default_context
from django.db import models
from django.contrib.auth.models import User 

from collection.models import Collection
# Create your models here.



class Tag(models.Model): # this model should be referenced by Post and Collection 
    name = models.CharField(max_length=128)



class Folder(models.Model):
    name = models.CharField(max_length=120)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    parentFolder = models.ForeignKey('self', on_delete=models.SET_NULL, null=True)



class Post(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True) 
    collection = models.ForeignKey(Collection, on_delete=models.SET_NULL, null=True)
    folder = models.ForeignKey(Folder, on_delete=models.SET_NULL, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    views = models.IntegerField(default=0)
    likes = models.IntegerField(default=0)
    title = models.CharField(max_length=120)
    content = models.TextField()
    tag = models.ForeignKey(Tag, on_delete=models.SET_NULL, null=True)













