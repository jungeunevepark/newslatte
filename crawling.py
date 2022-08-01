from bs4 import BeautifulSoup
from selenium import webdriver
import time
import os
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "newslatte.settings")
import django
django.setup()
from news.models import News

def news_crawling() :
    browser = webdriver.Chrome("c:\chromedriver_win32\chromedriver.exe")

    # 보안된 사이트도 크롤링하기 위한 header 추가 -> 자기 header 검색후 두번째 ''에 넣기
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36'}
    time.sleep(2)

    browser.get(
        'https://news.naver.com/main/main.naver?mode=LSD&mid=shm&sid1=100') # 정치
        

    for i in range(0, 1):
        browser.find_element(
        "xpath", '//*[@id="section_body"]/ul[1]/li[' + str(i+1) +']').click()
        full_html = browser.page_source
        soup = BeautifulSoup(full_html, 'html.parser')  # html 파서로 페이지 분석

    return dir

if __name__ == '__main__' :
    news_dict = news_crawling()
    for i in news_dict:
        news = News()
        # for j in i :
        #     news.j = news_dict[j]
        news.save()
