from bs4 import BeautifulSoup as bs 
from selenium import webdriver
from webdriver_manager.chrome import ChromeDriverManager
from urllib.request import urlopen

import time
import os
import django
import sys 
import path

from news.models import News , NewsImage


def create_news_instances_from_naver():

    IndexOfSection = {'정치': 100, '경제': 101, '사회': 102, '생활/문화': 103, 'IT/과학': 104, '세계': 105}
    navernews_main_url = "https://news.naver.com/main/main.naver?mode=LSD&mid=shm&sid1="

    for section in IndexOfSection: 
        urllist = extract_news_list_from_naver(navernews_main_url + str(IndexOfSection[section]))   
        for url in urllist:
            news_data = extract_news_data_from_naver(url) 
            news_data['section'] = section  
            news_data['link'] = url 
            News.objects.create(**news_data)



def extract_news_list_from_naver(category_url):

    page = urlopen(category_url)
    soup = bs(page, "html.parser")
    news_class = "cluster_item"  # 기사 하나에 대한 정보가 담긴 클래스 이름
    news_list = []
 
    for li in soup.find_all("li", news_class):
        if 'as_line' in li.attrs['class']: 
            continue
        else: 
            anchor = li.find("a")
            news_list.append(anchor.attrs['href'])
    return news_list



# def crawl_news_from_naver():

#     browser = webdriver.Chrome(ChromeDriverManager().install())
#     headers = {
#         'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36'}
#     browser.get(
#         'https://news.naver.com/main/main.naver?mode=LSD&mid=shm&sid1=100')  # 카테고리 = 정치



#     # head-line
#     for k in range(1, 6):
#         # 헤드라인의 i 번째 블
#         try:
#             url = browser.find_element(
#                 "xpath", '//*[@id="main_content"]/div/div[2]/div[1]/div['+str(k)+']/div[1]/ul/li[1]/div[2]/a').get_attribute('href')       # 사진 있는 경우
        
#         except:
#             url = browser.find_element(
#                 "xpath", '//*[@id="main_content"]/div/div[2]/div[1]/div['+str(k)+']/div[1]/ul/li[1]/div/a').get_attribute('href')          # 사진 없는 경우

#         article_data = extract_news_data_from_naver(url)
        


        
#     # change-body
#     # change-body는 4개의 ul 태그 안에 5개의 기사가 존재한다.
#     for j in range(1, 5):
#         # j번째 ul 태그
#         for i in range(1, 6):
#             # ul 태그 안의 i 번째 기사
#             url = browser.find_element(
#                 "xpath", '//*[@id="section_body"]/ul[' + str(j) + ']/li[' + str(i) + ']/dl/dt[2]/a').get_attribute('href')  # url 저장
#             # 기사 페이지로 이동
        
#             article_data = extract_news_data_from_naver(url)
#             print(article_data['headline'])




#     # 경제 카테고리로 이동한다
#     browser.execute_script("window.open('');")   # 경제 페이지를 새로 열기위해 새창을 열어준다
#     # 가장 먼저 생성되는 페이지(정치 메인 페이지)는 0번 배열!
#     # 지금 생성되는건 1번 배열! 따라서 1번으로 포커스를 옮겨준다
#     browser.switch_to.window(browser.window_handles[1])
#     # 경제 url을 넘겨준다
#     browser.get(
#         'https://news.naver.com/main/main.naver?mode=LSD&mid=shm&sid1=101')


#     # 큰 for문의 m은 101-105의 (일의 자리 숫자+1)이다.
#     for m in range(2, 7):
#         # 10(m-1)번째의 카테고리 메인 페이지
#         for k in range(1, 6):
#             try:
#                 url = browser.find_element(
#                     "xpath", '//*[@id="main_content"]/div/div[2]/div[1]/div['+str(k)+']/div[2]/ul/li[1]/div[2]/a').get_attribute('href')
#             except:
#                 url = browser.find_element(
#                     "xpath", '//*[@id="main_content"]/div/div[2]/div[1]/div['+str(k)+']/div[2]/ul/li[1]/div/a').get_attribute('href')
            

#         for j in range(1, 5):
#             for i in range(1, 6):
#                 url = browser.find_element(
#                     "xpath", '//*[@id="section_body"]/ul[' + str(j) + ']/li[' + str(i) + ']/dl/dt[2]/a').get_attribute('href')  # url 저장
                
                
#                 article_data = extract_naver_article_data(url)
#                 print(article_data['headline'])


#         browser.execute_script("window.open('');")
#         browser.switch_to.window(browser.window_handles[m])
#         browser.get(
#             'https://news.naver.com/main/main.naver?mode=LSD&mid=shm&sid1=10'+str(m))




def extract_news_data_from_naver(url):
    """
    Input: 특정 기사 URL(네이버)(type: str)
    Output: 기사 관련 크롤링 데이터(type: dict) 

    헤드라인, 언론사, 기사작성일, 기사 본문, 이미지, 요약(기사 초두에 볼드체로 표시되는 n줄 요약) 크롤링하는 함수
    """
    page = urlopen(url)
    soup  = bs(page, 'html.parser')
   
    press = head_line = date = journalist = summary = main_content = ""
    img_url = []
    
    try:
        metadata = soup.find("div", class_= "media_end_head")
        headline = metadata.find("h2").contents[0]
        date = metadata.find(class_="media_end_head_info_datestamp_time").attrs['data-date-time'].split()[0]
        press = metadata.find("img").attrs['title']
        journalist = metadata.find(class_="media_end_head_journalist_name").contents[0]

    except:
        pass 

    content = soup.find("div", id="dic_area")
    ImageAlreadyIncluded = False
    newsImage = None
    for element in content:     
        try:
            # TODO: 하나의 뉴스 안에 이미지가 여러 개 있는 경우 코드 수정
                    
            if element.name == 'span' and not ImageAlreadyIncluded:          # 이미지가 저장되어 있는 태그 
                img = element.find("img")
                imgurl = img.attrs['data-src']
                ImageAlreadyIncluded = True 
                newsImage = NewsImage.objects.create(imgurl)

            elif element.name == 'b':           # 요약글이 저장되어 있는 태그 
                summary = '\n\n'.join(line for line in element.contents if type(line) is not bs4.element.Tag)
            elif element.name == 'br':          
                continue 
            else:                               # 문단                               
                main_content += element + '\n\n'
        except:
            pass

    return {'press': press, 'title': headline, 'date': date, 'journalist': journalist, 'main_content': main_content, 'image': newsImage, 'summary': summary}





if __name__ == "__main__":
    create_news_instances_from_naver()

    