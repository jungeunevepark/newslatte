from django.urls import path 
from .views import *


urlpatterns = [
    path('<int:profile_id>/',mypage, name='mypage'),
]