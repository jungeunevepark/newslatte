from django.shortcuts import render
from collection.models import Collection
from post.models import Tag
# Create your views here.


def home(request):
    tag = Tag.objects.filter(name = '경제')
    searched = Collection.objects.filter(tag__in = tag)
    return render(request, 'index.html', {'searched' : searched})
