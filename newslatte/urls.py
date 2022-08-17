from django.contrib import admin
from django.urls import path, include 
from news import views
from accounts import views as accounts_views
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
    path('accounts/', include('allauth.urls')),
    
    path('login/', accounts_views.login, name='login'),
    path('logout/', accounts_views.logout, name='logout'),
    path('signup/', accounts_views.signup, name='signup'),
    path('active/<str:uidb64>/<str:token>/', accounts_views.active, name='active'),
    path('summernote/', include('django_summernote.urls')), 
] 

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)


