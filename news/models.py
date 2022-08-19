from unicodedata import category
from django.db import models
from django.forms import URLField




class NewsImage(models.Model):
    image = models.URLField(null=True)


class News(models.Model) :
    journalist = models.CharField(max_length=10, null=True)
    press= models.CharField(max_length=10, null=True)
    date = models.DateField(null=True)
    section = models.CharField(max_length=10)
    link = models.URLField()
    image = models.ForeignKey(NewsImage, on_delete=models.SET_NULL, null=True)
    title = models.CharField(max_length=200)
    main_content = models.TextField()
    summary = models.TextField(null=True)
    views = models.IntegerField(default=0)

    def __str__(self):
        return self.title


    