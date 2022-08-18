from django.urls import path
from .views import *
urlpatterns = [
    path('<int:post_id>/likes', thumb_up, name='thumb_up')
]
