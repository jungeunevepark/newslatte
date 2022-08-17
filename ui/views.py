from django.shortcuts import render
from collection.models import Collection, CollectionTag
# Create your views here.


def home(request):
    tag = CollectionTag.objects.filter(name = '경제')
    searched = Collection.objects.filter(tag__in = tag)
    return render(request, 'index.html', {'searched' : searched})
