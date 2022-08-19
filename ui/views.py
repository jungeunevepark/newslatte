from django.shortcuts import render, get_object_or_404
from collection.models import Collection
from post.models import Tag, Post
from django.http import JsonResponse
# Create your views here.


def home(request):
    posts = Post.objects.filter().order_by('-likes')
    # post1 = posts[0]
    # post2 = posts[1]
    # post3 = posts[2]


    tag = Tag.objects.filter(name='경제')
    searched = Collection.objects.filter(tag__in=tag)
    # return render(request, 'index.html', {'searched': searched, 'post1': post1, 'post2': post2, 'post3': post3})
    return render(request, 'index.html', {'searched': searched, 'posts':posts})


def thumb_up(request, post_id):

    post = get_object_or_404(Post, id=post_id)
    # 포스트 라이크 개수 올리기 (수정 부분 구글링하기)
    post.likes += 1
    post.save()
    likes = post.likes

    response = {
        'success': 200,
        'result': likes
    }

    return JsonResponse(response, safe=False)
