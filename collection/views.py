from django.shortcuts import render, get_object_or_404
from .models import Collection

# Create your views here.



# 테스트 코드: 지울 예정 
def show_collection_list(request):
    collections = Collection.objects.all()

    return render(request, 'test_list.html', {'collections':collections})




def show_collection_detail(request, id):

    collection = get_object_or_404(Collection, pk=id)

    return render(request, 'test_detail.html', {'collection':collection})


