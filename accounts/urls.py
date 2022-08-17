from django.urls import path 
from .views import login, logout, signup, active, profile

urlpatterns = [
    path('login/', login, name='login'),
    path('logout/', logout, name='logout'),
    path('signup/', signup, name='signup'),
    path('profile/', profile, name="profile"),
    path('active/<str:uidb64>/<str:token>/', active, name='active'),
]