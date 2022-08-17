from django.urls import path 
from .views import detail_page , new_comment, create_post_test


urlpatterns = [
    # path('create/', create_post),
    path('create_test/', create_post_test, name='create_post_test'),
    path('page/<int:post_id>', detail_page, name='detail_page'),
    path('new_comment/<int:post_id>', new_comment, name='new_comment'), 
]

