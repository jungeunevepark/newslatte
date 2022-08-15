from django.shortcuts import render
from .forms import PostForm 
# Create your views here.

def create_post(request):

    form = PostForm() 
    
    return render(request, 'test2.html', {'form': form} )
