from time import timezone
from django.shortcuts import render, get_object_or_404, redirect
from .forms import PostForm, CommentForm
from .models import Post, Comment
from accounts.models import User
from django.core.paginator import Paginator, PageNotAnInteger, EmptyPage
# Create your views here.

def create_post(request):

    form = PostForm() 
    
    return render(request, 'test2.html', {'form': form} )


def detail_page(request, post_id) :
    post_detail = get_object_or_404(Post, pk=post_id)
    comment_detail = CommentForm()
    posts = Post.objects.filter(user = post_detail.user).order_by('-created_at')
    paginator = Paginator(posts, 4)
    pagenum = request.GET.get('page')

    for page in paginator :
        for post in page:
            if (post == post_detail):
                current_page = page   
    try:
        posts = paginator.page(pagenum)
    except PageNotAnInteger:                     # page를 입력하지 않을 시 발생하는 문제

        pagenum= current_page.number
        posts = paginator.page(pagenum)

    except EmptyPage:                            # page를 너무 크게 입력할 때 발생하는 문제
        pagenum = paginator.num_pages
        posts = paginator.page(pagenum)

    # 페이지 5개씩 뜨게 만들기
    leftIndex = (int(posts.number)-2)
    if leftIndex < 1 :
        leftIndex = 1
    
    rightIndex = (int(posts.number)+2)
    if rightIndex > paginator.num_pages:
        rightIndex = paginator.num_pages
    
    custom_range = range(leftIndex, rightIndex+1)
     
    return render(request, 'eachArticle.html', {'post_detail': post_detail, 'comment_detail':comment_detail, 'posts':posts, 'current_page':current_page, 'paginator': paginator, 'custom_range': custom_range})

def new_comment(request, post_id):
    
    filed_form = CommentForm(request.POST)
    if filed_form.is_valid():
        finished_form = filed_form.save(commit=False)
        finished_form.post = get_object_or_404(Post, pk=post_id)
        finished_form.user = request.user
        finished_form.save()
        return redirect('detail_page', post_id)
