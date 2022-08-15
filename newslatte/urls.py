from django.contrib import admin
from django.urls import path, include
from news import views
from accounts import views as accounts_views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.home, name = 'home'),
    path('accounts/', include('allauth.urls')),
    path('login/', accounts_views.login, name='login'),
    path('logout/', accounts_views.logout, name='logout'),
    path('signup/', accounts_views.signup, name='signup'),
    path('active/<str:uidb64>/<str:token>/', accounts_views.active, name='active'),
]
