from time import timezone
from django.shortcuts import render, get_object_or_404, redirect
from .forms import PostForm, CommentForm
from .models import Post, Comment
from accounts.models import Profile
from django.core.paginator import Paginator, PageNotAnInteger, EmptyPage
# Create your views here.

def create_post(request):

    form = PostForm() 
    
    return render(request, 'test2.html', {'form': form} )


def detail_page(request, post_id) :
    post_detail = get_object_or_404(Post, pk=post_id)                 # detail 페이지의 본문 post
    comment_detail = CommentForm()                                    # 댓글
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
     
    return render(request, 'eachArticle.html', {'post_detail': post_detail, 'comment_detail':comment_detail, 'posts':posts, 'comments': comments, 'custom_post_range': custom_post_range, 'custom_comment_range': custom_comment_range, 'news':news, 'tags': tags })

def new_comment(request, post_id):
    
    filed_form = CommentForm(request.POST)
    if filed_form.is_valid():
        finished_form = filed_form.save(commit=False)
        finished_form.post = get_object_or_404(Post, pk=post_id)
        user = request.user
        finished_form.author = user.profile_set.first()
        finished_form.save()
        return redirect('detail_page', post_id)