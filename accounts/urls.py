from django.urls import path 
from .views import login, logout, signup, active, profile, signup2

urlpatterns = [
    path('login/', login, name='login'),
    path('logout/', logout, name='logout'),
    path('signup/', signup, name='signup'),
    path('profile/', profile, name="profile"),
    path('signup2/', signup2, name="signup2"),
    path('active/<str:uidb64>/<str:token>/', active, name='active'),
]