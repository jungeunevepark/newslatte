from django.contrib import admin
from django.urls import path, include 
from news import views

from django.conf import settings
from django.conf.urls.static import static 

import post, collection, news 


urlpatterns = [
    path('admin/', admin.site.urls),
    path('post/', include('post.urls')),
    path('collection/', include('collection.urls')),
    path('news/', include('news.urls'))
] 



urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

