from re import L
from ssl import create_default_context
from django.db import models
from accounts.models import User


from collection.models import Collection
# Create your models here.



class Tag(models.Model): # this model should be referenced by Post and Collection 
    name = models.CharField(max_length=128)



class Folder(models.Model):
    name = models.CharField(max_length=120)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    parentFolder = models.ForeignKey('self', on_delete=models.SET_NULL, null=True, blank=True)



class Post(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True) 
    collection = models.ForeignKey(Collection, on_delete=models.SET_NULL, null=True, blank=True)
    folder = models.ForeignKey(Folder, on_delete=models.SET_NULL, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    views = models.IntegerField(default=0)
    likes = models.IntegerField(default=0)
    title = models.CharField(max_length=120)
    subtitle=models.CharField(max_length=200, null=True)
    content = models.TextField()
    tag = models.ForeignKey(Tag, on_delete=models.SET_NULL, null=True)

    def __str__(self):
        return self.title

class Comment(models.Model):
    comment = models.TextField(max_length=200)
    date = models.DateTimeField(auto_now_add = True)
    post = models.ForeignKey(Post, null=True, blank=True, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)

    def __str__(self) :
        return self.comment








### 일단 collection고 folder에 대해 blank=True값 삽입





