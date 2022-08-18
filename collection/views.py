from django.shortcuts import render, get_object_or_404
from django.http import JsonResponse
from django.db.models import Model 

from .models import Collection
from news.models import NewsImage
import json
# Create your views here.


def show_collection_detail(request, id):

    collection = get_object_or_404(Collection, pk=id)

    return render(request, 'test_detail.html', {'collection':collection})



def detail(request, collection_id):
    collection = get_object_or_404(Collection, pk=collection_id)
    newss = collection.news.all()
    first_news = collection.news.first()
    return render(request, 'collection.html', {'collection': collection, 'newss':newss, 'first_news': first_news})


def fetch_news_from_collection(request, id):
 
    collection = get_object_or_404(Collection, id=id)

    news_set = list(collection.news.all().values(
        'title','press','date','image_id','summary','main_content'
    ))

    for news in news_set: 
        image_id = news.pop('image_id')
        try:
            newsImage = NewsImage.objects.get(id=image_id)
            news['imageUrl'] = newsImage.image
        except:
            news['imageUrl'] = None



    response = {
        'success': 200,
        'result': news_set
    }

    return JsonResponse(response, safe=False, json_dumps_params={'ensure_ascii':False})

def test1(request):
    return render(request, 'test.html')

def test2(request):
    jsonObject = json.loads(request.body)
    print(jsonObject.get('title'))
    return JsonResponse(jsonObject)