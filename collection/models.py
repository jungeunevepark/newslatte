from django.db import models
from accounts.models import User, Profile
from news.models import News 
# # Create your models here.

# class CollectionTag(models.Model): # this model should be referenced by Post and Collection 
#     name = models.CharField(max_length=128)

#     def __str__(self):
#         return self.name

class Collection(models.Model):
    
    CATEGORY_CHOICES = (('politics', '정치'), ('economy', '경제'), ('society', '사회'), ('culture', '생활/문화'),
                ('science','IT/과학'), ('world', '세계'))


    title = models.CharField(max_length=120, verbose_name="컬렉션제목")
    author = models.ForeignKey(Profile, on_delete=models.SET_NULL, null=True, verbose_name="작성자")
    news = models.ManyToManyField(News)
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="만든 날짜")
    likes = models.IntegerField(default=0, verbose_name="좋아요수")
    views = models.IntegerField(default=0, verbose_name="조회수")
    refCount = models.IntegerField(default=0, verbose_name="참조수")
    tag = models.ManyToManyField(to='post.Tag', null=True)
    comment = models.CharField(max_length = 120, null =True, verbose_name="코멘트")
    image = models.URLField(null=True, blank=True),
    category = models.CharField(max_length=120, choices=CATEGORY_CHOICES)

    def __str__(self):
        return self.title

    





