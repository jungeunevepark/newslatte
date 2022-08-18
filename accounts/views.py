from django.shortcuts import render, redirect, HttpResponse
from django.contrib import auth
from .models import User, Profile

# 이메일 인증을 위해 추가
from django.contrib.sites.shortcuts import get_current_site
from django.template.loader import render_to_string
from django.utils.http import urlsafe_base64_encode,urlsafe_base64_decode
from django.utils.encoding import force_bytes
from django.core.mail import EmailMessage
from .tokens import account_activation_token
from django.utils.encoding import force_bytes, force_str


#===========================REST API=============================

def crud_user(request, id):
    if request.method == 'POST':
        UpdateUser(request, id)
    # TODO: Create, Delete 등 다른 메소드에 대한 처리함수 구현 


def updateUser(request, id):
    pass
   # request body 부분을 봄으로써 수정되어야 







#=================================================================

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
        return render(request, 'signIn.html')

def logout(request):
    auth.logout(request)
    return redirect('home')

def signup(request):
    if request.method == 'POST':
        print("post요청")
        if request.POST['password'] == request.POST['repeat']:
            new_user = User.objects.create_user(email=request.POST['email'], password=request.POST['password'])
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
            return render(request, 'signUp_2.html')  #, {'new_profile':new_profile})
    else :
        return render(request, 'signUp_1.html')
    return render(request, 'bad.html')

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


def profile(request):
    if request.method == 'POST':
        profile = Profile()
        profile.user = request.user
        profile.nickname = request.POST["nickname"]
        profile.intro = request.POST["intro"]
        profile.save()
        nickname = profile.nickname
        return render(request, 'email_message.html', {'nickname': nickname})
    return render(request, 'signUp.html')

def signup2(request):
    if request.method == 'POST':
        profile = Profile()
        profile.user = request.user
        request.user.is_active = False
        request.user.save()
        profile.nickname = request.POST["nickname"]
        profile.intro = request.POST["intro"]
        profile.save()
        nickname = profile.nickname
        return render(request, 'email_message.html', {'nickname': nickname})
    return render(request, 'signUp_2.html')