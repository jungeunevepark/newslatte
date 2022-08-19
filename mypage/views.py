from django.shortcuts import render, get_object_or_404
from accounts.models import Profile
from post.models import Post



def mypage(request, profile_id):
    profile = get_object_or_404(Profile, pk=profile_id)
    posts = Post.objects.filter(author = profile).order_by('-created_at')

    return render(request, 'mypage.html', {'profile': profile, 'posts': posts})
