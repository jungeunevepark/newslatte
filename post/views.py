from django.shortcuts import render, get_object_or_404
from django.http import JsonResponse
from django.core.serializers.json import DjangoJSONEncoder
from rest_framework import serializers

import json 
from django.db import models

from .forms import PostForm 
from collection.models import Collection
from news.models import  NewsImage

# Create your views here.

def create_post(request):
    
    if request.method == 'GET':

        # 인증된 유저인지 여부 확인 


        collections = Collection.objects.all()
        context = {'collections': collections}
        return render(request, 'writeArticle.html', context)

    elif request.method == 'POST': # request 에 들어온 요청을 처리 
        
        """
        if 인증된 유저가 아닌 경우(애초에 접속이 되면 안된다.)
            success = 400
            staus_code = 401 
            msg = "User Not Authenticated"
        
        elif required 필드(title가 비어있는 경우 
            success = 400
            status_code = 400
            msg = 

        """





        pass


    






def create_post_test(request):
    
    if request.method == 'POST':
        print('wow, it works!')
        collection_id = request.POST.get('collectionId', None)
        
        title = request.POST.get('title')
        content = request.POST.get('content')

        print(title, content)

        # collection = Collection.objects.filter(pk=collection_id)[0]
        collection = get_object_or_404(Collection, pk=collection_id)

        news_set = list(collection.news.all().values(
            'title', 'press', 'date', 'image_id', 'summary', 'main_content'))

        for news in news_set:
            image_id = news.pop('image_id')
            try:
                newsImage = NewsImage.objects.get(id=image_id)
                news['imageUrl'] = newsImage.image
            except models.Model.DoesNotExist: # 사진이 없어요. 이런 일은 없어야 합니다 
                news['imageUrl'] = None 
        

        response = {
            'code': 200,
            'result': news_set
        }

        return JsonResponse(response, safe=False) 
        
        
        # return render(request, 'write_test.html')





        # print(request.POST.get('id', None))
        

    collections = Collection.objects.all() 
    context = {'collections': collections}

    return render(request, 'write_test.html', context)

# def create_post(request):

#     form = PostForm() 
    
#     return render(request, 'test2.html', {'form': form} )
