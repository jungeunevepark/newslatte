from django.shortcuts import render
from .models import Collection

# Create your views here.



# 테스트 코드: 지울 예정 
def show_collection_list(request):
    collections = Collection.objects.all()

    return render(request, 'test.html', {'collections':collections})

