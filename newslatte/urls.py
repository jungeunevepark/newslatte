from django.contrib import admin
from django.urls import path, include 
from news import views
from accounts import views as accounts_views

from django.conf import settings
from django.conf.urls.static import static 
import post, collection, news 


urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.home, name = 'home'),
    path('post/', include('post.urls')),
    path('collection/', include('collection.urls')),
    path('news/', include('news.urls')),
    path('accounts/', include('allauth.urls')),
    path('login/', accounts_views.login, name='login'),
    path('logout/', accounts_views.logout, name='logout'),
] 

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)



