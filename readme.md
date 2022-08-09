220802 crawling.py (정은 --> 정환)
코드 수정 사항

1. 맥 호환성을 위해 '''selenimu.exe'''의 경로 의존성을 피하고자 코드를 수정하였음. 

이전

'''
browser = webdriver.Chrome("chromedriver.exe")
'''

수정 후 
'''

