from django.shortcuts import render, redirect, HttpResponse, get_object_or_404
from django.http import JsonResponse
from django.contrib import auth

from .models import User, Profile
from collection.models import Collection 

# 이메일 인증을 위해 추가
from django.contrib.sites.shortcuts import get_current_site
from django.template.loader import render_to_string
from django.utils.http import urlsafe_base64_encode,urlsafe_base64_decode
from django.utils.encoding import force_bytes
from django.core.mail import EmailMessage
from .tokens import account_activation_token
from django.utils.encoding import force_bytes, force_str
import json
from django.http import JsonResponse
import re
import string
from django.core.exceptions import ValidationError

#===========================REST API=============================



def test_view(request):
    return render(request, 'test2.html')


def UpdateUserCollectionBucket(request, user_id, collection_id):

    user = get_object_or_404(User, id=user_id)
    selected_collection = get_object_or_404(Collection, id=collection_id)

    if request.method == "POST":
        user.collectionScrapped.add(selected_collection)

    elif request.method == "DELETE":
        user.collectionScrapped.remove(selected_collection)

    user.save()

    result = {
        'success': 200,
        'status_code': 200
    }

    return JsonResponse(result)
    


#=================================================================

def login(request):
    if request.method == 'POST':
        jsonObject = json.loads(request.body)
        email = jsonObject.get("email")
        password = jsonObject.get("password")
        user = auth.authenticate(request, email = email, password = password)
        if user is not None:
            auth.login(request, user)
            msg = ""
        else:
            msg="❗아이디와 비밀번호를 다시 확인해주세요"
        data = {'msg':msg}
        return JsonResponse(data)
   
    else : #처음 페이지 클릭했을 때 어디로 가는지
        return render(request, 'signIn.html')


def logout(request):
    auth.logout(request)
    return redirect('home')


def is__email__unique(email):
    if User.objects.filter(email = email).exists():
        return True
    else:
        return False

def is__email(email): # 이메일 유효성 검사
    a= re.compile('^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$')
    b = a.match(email)
    if b is None :
        return True
    else:
        return False

def is__pwd(password):
    p = re.compile('^[A-Za-z0-9]{6,12}$')
    c = p.match(password)
    if c is None:
        return True
    else:
        return False
    
def signup(request):
    if request.method == 'POST':
        msg=""
        jsonObject=json.loads(request.body)
        email=jsonObject.get('email')
        password=jsonObject.get('password')
        repeat=jsonObject.get('repeat')
        if password == repeat:   # 패스워드 불일치 : 메세지 불필요
            if is__email__unique(email):
                # false 값이 온다. unique하지 않음
                msg="exist"
            elif is__email(email):
                msg="email"
            elif is__pwd(password):
                msg="pwd"
            else:
                msg=""
                new_user = User.objects.create_user(email=email, password=password)
                auth.login(request, new_user, backend='django.contrib.auth.backends.ModelBackend')
                current_site = get_current_site(request)
                message = render_to_string('user_active_email.html',{
                    'user': new_user,
                    'domain': current_site.domain,
                    'uid':urlsafe_base64_encode(force_bytes(new_user.pk)).encode().decode(),
                    'token': account_activation_token.make_token(new_user),
                })
                mail_subject = "[NEWSLATTE] 회원가입 인증 메일입니다."
                user_email = new_user.email
                email = EmailMessage(mail_subject, message, to=[user_email])
                email.send()
            data = {'msg':msg}
            return JsonResponse(data)
        
    else : # 처음 회원가입 페이지로 들어갈때
        return render(request, 'signUp_1.html')

def active(request, uidb64, token):

    uid = force_str(urlsafe_base64_decode(uidb64))
    user = User.objects.get(pk=uid)

    if user is not None and account_activation_token.check_token(user, token):
        user.is_active = True
        user.save()
        auth.login(request, user, backend='django.contrib.auth.backends.ModelBackend')
        return redirect('home')
    else:
        return HttpResponse('비정상적인 접근입니다.')

def is__nickname__unique(nickname):
    if Profile.objects.filter(nickname = nickname).exists():
        return True
    else:
        return False

def profile(request):
    if request.method == 'POST':
        msg=""
        jsonObject=json.loads(request.body)
        nickname=jsonObject.get('nickname')
        intro=jsonObject.get('intro')
        if is__nickname__unique(nickname):
            msg="exist"
        else:
            msg=""
            profile = Profile()
            profile.user = request.user
            profile.nickname = nickname
            profile.intro = intro
            profile.save()
        data = {'msg':msg}
        return JsonResponse(data)
    return render(request, 'signUp.html')

def signup2(request):
    if request.method == 'POST':
        msg=""
        jsonObject=json.loads(request.body)
        nickname=jsonObject.get('nickname')
        intro=jsonObject.get('intro')
        if is__nickname__unique(nickname):
            msg="exist"
        else:
            msg=""
            profile = Profile()
            profile.user = request.user
            profile.nickname = nickname
            profile.intro = intro
            profile.save()
            request.user.is_active = False
            request.user.save()
        data = {'msg':msg}
        return JsonResponse(data)
    return render(request, 'signUp_2.html')

def message(request):
    return render(request, 'email_message.html')