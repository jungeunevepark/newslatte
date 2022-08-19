from pathlib import Path
from pickle import TRUE
import os
import json
from django.core.exceptions import ImproperlyConfigured





# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent
ROOT_DIR = os.path.dirname(BASE_DIR)
secret_file = os.path.join(BASE_DIR, 'secret.json')

# with open(secret_file) as f:
#     secret = json.loads(f.read())

# def get_secret(setting, secret=secret):
#     try:
#         return secret[setting]
#     except:
#         error_msg = "Set key '{0}' in secret.json".format(setting)
#         raise ImproperlyConfigured(error_msg)

SECRET_KEY = 'DJANGO_SECRET'
# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/4.0/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!


# SECURITY WARNING: don't run with debug turned on in production!

DEBUG = True


ALLOWED_HOSTS = ['*']


# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'django.contrib.sites',

    'news',
    'collection',
    'post',
    'ui',
    'accounts',
    'mypage',

    'allauth',
    'allauth.account',
    'allauth.socialaccount',

    # providers
    'allauth.socialaccount.providers.google',
    'allauth.socialaccount.providers.naver',
    'allauth.socialaccount.providers.kakao',

    # 이메일 인증
    'six',
    'django_summernote', # app for text editor(summernote)

    'corsheaders',


]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'newslatte.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'newslatte.wsgi.application'


# Database
# https://docs.djangoproject.com/en/4.0/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}


# Password validation
# https://docs.djangoproject.com/en/4.0/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/4.0/topics/i18n/

LANGUAGE_CODE = 'en-us'

# 한국 시간으로 수정 위해
TIME_ZONE = 'Asia/Seoul'

USE_I18N = True

# 한국시간으로 수정 위해
USE_TZ = False


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/4.0/howto/static-files/

STATIC_URL = 'static/'

STATICFILES_DIRS = [
    os.path.join(BASE_DIR, 'accounts', 'static'),
    os.path.join(BASE_DIR, 'collection', 'static'),
    # os.path.join(BASE_DIR, 'news', 'static'),
    os.path.join(BASE_DIR, 'post', 'static'),
    os.path.join(BASE_DIR, 'ui', 'static'),
    os.path.join(BASE_DIR, 'mypage', 'static'),
]

STATICFILES_FINDERS = [
    'django.contrib.staticfiles.finders.FileSystemFinder',
    'django.contrib.staticfiles.finders.AppDirectoriesFinder'
]

STATIC_ROOT = BASE_DIR / 'staticfiles'

# Default primary key field type
# https://docs.djangoproject.com/en/4.0/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'


MEDIA_ROOT = os.path.join(BASE_DIR, 'media')
MEDIA_URL = '/media/'

AUTHENTICATION_BACKENDS = [
    'django.contrib.auth.backends.ModelBackend',
    'allauth.account.auth_backends.AuthenticationBackend',
]

SITE_ID = 1


AUTH_USER_MODEL = "accounts.User"          # (appname.User) 재설정 언급
# ACCOUNT_USERNAME_REQUIRED = False          # social login error 해결
SOCIALACCOUNT_PROVIDERS = {
    'google': {
        'SCOPE': [
            'profile',
            'email',
        ],  
        'AUTH_PARAMS': {
            'access_type': 'online',
        }
    }
}

ACCOUNT_SESSION_REMEMBER = True            # 브라우저를 닫아도 세션 기록 유지(로그인 계속 되게)
SESSION_COOKIE_AGE = 3600                  # 쿠키를 한시간만 저장
ACCOUNT_AUTHENTICATION_METHOD = 'email'
ACCOUNT_EMAIL_REQUIRED = True
ACCOUNT_USERNAME_REQUIRED = False
ACCOUNT_UNIQUE_EMAIL = True
ACCOUNT_USER_MODEL_USERNAME_FIELD = None
LOGIN_REDIRECT_URL='/'
# SOCIAL_AUTH_LOGIN_REDIRECT_URL='/accounts/profile/'



# 이메일 인증 관련
EMAIL_HOST = 'smtp.gmail.com' 		         # 메일 호스트 서버
EMAIL_PORT = '587' 			                 # 서버 포트
EMAIL_HOST_USER = 'newslattee@gmail.com' 	 # 우리가 사용할 Gmail
EMAIL_HOST_PASSWORD = 'ybwwhxfuripmjhxj'		     # 우리가 사용할 Gmail pw
EMAIL_USE_TLS = True			             # TLS 보안 설정
DEFAULT_FROM_EMAIL = EMAIL_HOST_USER	     # 응답 메일 관련 설정

# 이떄 만료된 쿠키는 서버 session에 계속 남아있음!
# python manage.py clearsessions로 삭제해주기.
# 자동화하거나 수동으로


CORS_ORIGIN_ALLOW_ALL = True


CORS_ALLOW_CREDENTIALS = True


CORS_ALLOW_METHODS = (
    'DELETE',
    'GET',
    'OPTIONS',
    'PATCH',
    'POST',
    'PUT',
)

CORS_ALLOW_HEADERS = (
    'accept',
    'accept-encoding',
    'authorization',
    'content-type',
    'dnt',
    'origin',
    'user-agent',
    'x-csrftoken',
    'x-requested-with',
)