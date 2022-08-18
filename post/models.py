from ssl import create_default_context
from django.db import models
from accounts.models import User, Profile
from typing import TYPE_CHECKING 
from collection.models import Collection

class Tag(models.Model): # this model should be referenced by Post and Collection 
    name = models.CharField(max_length=128)

    def __str__(self):
        return self.name

class Folder(models.Model):
    name = models.CharField(max_length=120)
    author = models.ForeignKey(Profile, on_delete=models.SET_NULL, null=True, blank=True)
    parentFolder = models.ForeignKey('self', on_delete=models.SET_NULL, null=True, blank=True)


class Post(models.Model):
    author = models.ForeignKey(Profile, on_delete=models.CASCADE, null=True, verbose_name="작성자") 
    collection = models.ForeignKey(Collection, on_delete=models.SET_NULL, null=True, verbose_name="참조 컬렉션")
    folder = models.ForeignKey(Folder, on_delete=models.SET_NULL, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="작성시간")
    views = models.IntegerField(default=0, verbose_name="조회수")
    likes = models.IntegerField(default=0, verbose_name="좋아요수")
    title = models.CharField(max_length=120, verbose_name="제목")
    subhead=models.CharField(max_length=200, null=True)
    content = models.TextField()
    img = models.URLField(null=True, verbose_name="인사이트 대표 이미지")
    tag = models.ManyToManyField(Tag)
    refCount = models.IntegerField(default=0, verbose_name="참조수")

    def __str__(self):
        return self.title

class Comment(models.Model):
    comment = models.TextField(max_length=200)
    date = models.DateTimeField(auto_now_add = True)
    post = models.ForeignKey(Post, null=True, blank=True, on_delete=models.CASCADE)
    author = models.ForeignKey(Profile, on_delete=models.CASCADE, null=True, blank=True)

    def __str__(self) :
        return self.comment



### 일단 collection고 folder에 대해 blank=True값 삽입





