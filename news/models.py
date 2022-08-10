from unicodedata import category
from django.db import models
from django.forms import ImageField, URLField

class News(models.Model) :
    title = models.CharField(max_length=200)
    body = models.TextField()
    date = models.DateTimeField(auto_now_add = True)
    link = URLField()
    category = models.IntegerField()



    def __str__(self):
        return self.title

class Image(models.Model) :
    image = ImageField()
