from django.urls import path 
from .views import create_post, detail_page, new_comment

urlpatterns = [
    path('', create_post),
    path('page/<int:post_id>', detail_page, name='detail_page'),
    path('new_comment/<int:post_id>', new_comment, name='new_comment'), 
]