from django.urls import path 
from .views import *


urlpatterns = [
    path('create/', create_post, name='create_post'),
    # path('create_test/', create_post_test, name='create_post_test'),
    path('page/<int:post_id>', detail_page, name='detail_page'),
    path('new_comment/<int:post_id>', new_comment, name='new_comment'), 
    # path('comment/', create_comment, name="create_comment"),
    path('', fetch_post)
]
