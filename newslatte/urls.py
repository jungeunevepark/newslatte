from django.contrib import admin
from django.urls import path, include 
from ui import views as ui_views 

from django.conf import settings
from django.conf.urls.static import static 
import post, collection, news 


urlpatterns = [
    path('admin/', admin.site.urls),
    path('', ui_views.home, name = 'home'),
    path('post/', include('post.urls')),
    path('collection/', include('collection.urls')),
    path('news/', include('news.urls')),
    path('mypage/', include('mypage.urls')),
    path('auth/', include('allauth.urls')),
    path('accounts/', include('accounts.urls')),
    path('summernote/', include('django_summernote.urls')), 
] 

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)


