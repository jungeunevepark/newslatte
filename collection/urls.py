from django.urls import path 
from .views import *

urlpatterns = [
    # path('', show_collection_list, name='collection_list'),
    path('<int:id>/', show_collection_detail, name='collection_detail'),
    path('<int:id>/news', fetch_news_from_collection, name='news_from_collection'),
    path('detail/<int:collection_id>', detail, name='detail'),
    path('test/', test1, name='test'),
    path('test2/', test2, name='test2'),
]
