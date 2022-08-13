from django.urls import path 
from .views import *

urlpatterns = [
    path('', show_collection_list, name='collection_list')
]