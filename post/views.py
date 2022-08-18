from django.shortcuts import render, get_object_or_404, redirect
from django.http import JsonResponse
from django.core.serializers.json import DjangoJSONEncoder
from django.db import models
from django.core.paginator import Paginator, PageNotAnInteger, EmptyPage

from collection.models import Collection
from news.models import NewsImage
from accounts.models import Profile
from .models import Post, Comment
from news.models import News

from time import timezone

import json 


# Create your views here.


def fetch_post(request):
    """
    127.0.0.1:8000/post?order_by=asc[likes]&category=정치

    TODO: 다양한 쿼리 파라미터에 대한 요청 처리 
    """

    category  = request.GET.get('category', '')
    posts = list(Post.objects.filter(category = category).values())


    return JsonResponse(list(posts), safe=False) 



def create_post(request):

    
    if request.method == 'GET':

        # TODO: 인증된 유저인지 여부 확인 

        collections = Collection.objects.all()

        context = {'collections': collections}

        return render(request, 'write_test.html', context)

    elif request.method == 'POST': # request 에 들어온 요청을 처리 
    
        msg = [""]
        if is_user_authenticated(request.user, msg) == False: 
            success = 400 
            status_code = 401 
            
        elif is_form_valid(request.POST, msg) == False:
            success = 400
            status_code = 400
        
        else: # POST request is valid 
            success = status_code = 200 

        # post 객체를 불러서 저장
            post = Post()
            post.author = request.user.profile
            post.title = request.POST['title']
            post.subhead = request.POST['subhead']
            post.content = request.POST['content']
            post.collection = get_object_or_404(Collection, pk = request.POST['collectionId'])
            news = post.collection.news.first()
            post.img = news.image.image
            post.save()


            # data = {
            #     'author': request.user.profile,
            #     'title': request.POST['title'], 
            #     'subhead': request.POST['subhead'],
            #     'content': request.POST['content'],
            #     'collection_id': request.POST['collectionId']}

            # post = Post.objects.create(**data)

            post = Post.objects.create(**data)
            print(post)


        return JsonResponse(
            {'success': success,
            'status_code': status_code,
            'msg': msg[0] }
        )




def is_user_authenticated(user, msg):
    if user.is_authenticated:
        return True
    else: 
        msg[0] = "User Not Authenticaed"
        return False


def is_form_valid(POST, msg):   
    
    EMPTYSTRING = ""
    MAX_LENGTH = 120 

    try:
        title = POST['title']
        subhead = POST['subhead']
        content = POST['content']
        collection_id = POST['collectionId']
    except:
        msg[0] = "Some required data field has not been passed. Required Field: title, subhead, content, collection_id"
        return False

    if title == EMPTYSTRING:
        msg[0] = "Title is empty string"
        return False
    elif content == EMPTYSTRING:
        msg[0] = "Content is empty"
        return False
    elif len(title) > MAX_LENGTH:
        msg[0] = "Length of the title allowed has been exceeded."
        return False
    elif collection_id == None:
        msg[0] = "Collection ID has not been passed. post will be saved, though. "
        return True
    else: # Passed data is valid 
        return True        

    
    




        

    




def detail_page(request, post_id) :
    post_detail = get_object_or_404(Post, pk=post_id)                 # detail 페이지의 본문 post
    news = post_detail.collection.news.all()
    tags = post_detail.tag.all()
    posts = Post.objects.filter(author = post_detail.author).order_by('-created_at')     # post_detail의 작성자가 작성한 글 시간 역순으로
    paginator1 = Paginator(posts, 4)
    pagenum1 = request.GET.get('page1')                                              # page1 = post의 위치(input or current)

    for page in paginator1 :
        for post in page:
            if (post == post_detail):
                current_page = page   
    try:
        posts = paginator1.page(pagenum1)
    except PageNotAnInteger:                     # page를 입력하지 않을 시 발생하는 문제
        pagenum1= current_page.number
        posts = paginator1.page(pagenum1)
    except EmptyPage:                            # page를 너무 크게 입력할 때 발생하는 문제
        pagenum1 = paginator1.num_pages
        posts = paginator1.page(pagenum1)

                                                 # 페이지 5개씩 뜨게 만들기
    leftIndex = (int(posts.number)-2)
    if leftIndex < 1 :
        leftIndex = 1
    
    rightIndex = (int(posts.number)+2)
    if rightIndex > paginator1.num_pages:
        rightIndex = paginator1.num_pages
    
    custom_post_range = range(leftIndex, rightIndex+1)


    comments = Comment.objects.filter(post = post_detail).order_by('-date')          # 현재 post_detail에 달린 댓글 시간 역순대로
    paginator2 = Paginator(comments, 5)
    pagenum2 = request.GET.get('page2')

    try:
        comments = paginator2.page(pagenum2)
    except PageNotAnInteger:                     # page를 입력하지 않을 시 발생하는 문제
        pagenum2= 1
        comments = paginator2.page(pagenum2)
    except EmptyPage:                            # page를 너무 크게 입력할 때 발생하는 문제
        pagenum2 = paginator2.num_pages
        comments = paginator2.page(pagenum2)


    leftIndex = (int(comments.number)-2)
    if leftIndex < 1 :
        leftIndex = 1    
    rightIndex = (int(comments.number)+2)
    if rightIndex > paginator2.num_pages:
        rightIndex = paginator2.num_pages
    
    custom_comment_range = range(leftIndex, rightIndex+1)
    test = 0 
    return render(request, 'eachArticle.html', {'post_detail': post_detail, 'posts':posts, 'comments': comments, 'custom_post_range': custom_post_range, 'custom_comment_range': custom_comment_range, 'news':news, 'tags': tags, 'test': test })



def new_comment(request, post_id):

    if request.method == "POST":
        comment = Comment()
        comment.author = request.user.profile
        comment.post = get_object_or_404(Post, pk=post_id)
        comment.comment = request.POST["comment"]
        comment.save()
        return redirect('detail_page', post_id)
    
    # filed_form = CommentForm(request.POST)
    # if filed_form.is_valid():
    #     finished_form = filed_form.save(commit=False)
    #     finished_form.post = get_object_or_404(Post, pk=post_id)
    #     user = request.user
    #     finished_form.author = user.profile
    #     finished_form.save()
    #     return redirect('detail_page', post_id)


def create_comment(request): #, post_id):
    
    msg = [""]
    if is_user_authenticated(request.user, msg) == False: 
        success = 400 
        status_code = 401 
            
        
    else: # POST request is valid 
        success = status_code = 200 
        jsonObject = json.loads(request.body)
        # post 객체를 불러서 저장
        data = {
                'author': request.user.profile,
                'post_id': jsonObject.get('post_id'), 
                'comment': jsonObject.get('comment')
        }
        Comment.objects.create(**data)
    post_detail = get_object_or_404(Post, pk = jsonObject.get('post_id'))
    comments = Comment.objects.filter(post = post_detail).order_by('-date')
    return render(request, 'eachArticle.html',
            {'comments': comments})
    #         'status_code': status_code,
    #         'msg': msg[0] }
    # )
    # # return render(request, 'eachArticle.html')

