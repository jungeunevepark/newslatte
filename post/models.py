from ssl import create_default_context
from django.db import models
from accounts.models import User, Profile
from typing import TYPE_CHECKING
# from collection.models  Collection


class Tag(models.Model):  # this model should be referenced by Post and Collection
    name = models.CharField(max_length=128)

    def __str__(self):
        return self.name


class Folder(models.Model):
    name = models.CharField(max_length=120)
    author = models.ForeignKey(
        Profile, on_delete=models.SET_NULL, null=True, blank=True)
    parentFolder = models.ForeignKey(
        'self', on_delete=models.SET_NULL, null=True, blank=True)


class Post(models.Model):

     
    CATEGORY_CHOICES = (('politics', '정치'), ('economy', '경제'), ('society', '사회'), ('culture', '생활/문화'),
                ('science','IT/과학'), ('world', '세계'))

    author = models.ForeignKey(Profile, on_delete=models.CASCADE, null=True, verbose_name="작성자") 
    folder = models.ForeignKey(Folder, on_delete=models.SET_NULL, null=True, blank=True ) # TODO: cascade->set null
    collection = models.ForeignKey(to='collection.Collection', on_delete=models.SET_NULL, null=True, verbose_name="참조 컬렉션")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="작성시간")
    views = models.IntegerField(default=0, verbose_name="조회수")
    likes = models.IntegerField(default=0, verbose_name="좋아요수")
    title = models.CharField(max_length=120, verbose_name="제목")
    subhead = models.CharField(max_length=200, null=True, blank=True)
    content = models.TextField()
    img = models.URLField(null=True, blank=True)
    tag = models.ManyToManyField(Tag)
    refCount = models.IntegerField(default=0, verbose_name="참조수")
    category = models.CharField(max_length=120, null=True, choices=CATEGORY_CHOICES)
    

    def __str__(self):
        return self.title


class Comment(models.Model):
    comment = models.TextField(max_length=200)
    date = models.DateTimeField(auto_now_add=True)
    post = models.ForeignKey(
        Post, null=True, blank=True, on_delete=models.CASCADE)
    author = models.ForeignKey(
        Profile, on_delete=models.CASCADE, null=True, blank=True)

    def __str__(self):
        return self.comment
