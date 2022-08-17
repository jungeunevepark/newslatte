from django.urls import path 
from .views import *

urlpatterns = [
    path('', show_collection_list, name='collection_list'),
    path('<int:id>/', show_collection_detail, name='collection_detail'),
    path('detail/<int:collection_id>', detail, name='detail'),

]