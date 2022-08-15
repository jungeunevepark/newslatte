from django.shortcuts import render, redirect
from django.contrib import auth
from .models import User


def login(request):
    if request.method == 'POST':
        email = request.POST["email"]
        password = request.POST["password"]
        user = auth.authenticate(request, email = email, password = password)

        if user is not None:
            auth.login(request, user)
            return redirect('home')
        else:
            return render(request, 'bad.html')
    else :
        return render(request, 'login.html')

def logout(request):
    auth.logout(request)
    return redirect('home')

def signup(request):
    if request.method == 'POST':
        if request.POST['password'] == request.POST['repeat']:
            new_user = User.objects.create_user(email=request.POST['email'], password=request.POST['password'], nickname=request.POST['nickname'], intro=request.POST['intro'])
            auth.login(request, new_user, backend='django.contrib.auth.backends.ModelBackend')
            return redirect('home')
    return render(request, 'signUp.html')
