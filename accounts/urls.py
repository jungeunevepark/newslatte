from django.urls import path 
from .views import *

urlpatterns = [
    # path('user/<int:id>', crud_user),
    path('login/', login, name='login'),
    path('logout/', logout, name='logout'),
    path('signup/', signup, name='signup'),
    path('profile/', profile, name="profile"),
    path('signup2/', signup2, name="signup2"),
    path('message/', message, name='message'),
    path('active/<str:uidb64>/<str:token>/', active, name='active'),
]