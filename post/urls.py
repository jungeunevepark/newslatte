from django.urls import path 
from .views import create_post, create_post_test 

urlpatterns = [
    path('create/', create_post),
    path('create_test/', create_post_test, name='create_post_test')

]