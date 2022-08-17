from django.shortcuts import render, get_object_or_404
from django.http import JsonResponse
from django.db.models import Model 

from .models import Collection

# Create your views here.


def show_collection_detail(request, id):

    collection = get_object_or_404(Collection, pk=id)

    return render(request, 'test_detail.html', {'collection':collection})



def fetch_news_from_collection(request, id):


    print(123)
    
    collection = get_object_or_404(Collection, id)

    news_set = list(collection.news.all().values(
        'title','press','date','image_id','summary','main_content'
    ))



    for news in news_set: 
        image_id = news.pop('image_id')
        try:
            newsImage = newsImage.objects.get(id=image_id)
            news['imageUrl'] = newsImage.image
        except Model.DoesNotExist:
            news['imageUrl'] = None


    response = {
        'success': 200,
        'result': news_set
    }

    return JsonResponse(response, safe=False)

        