# Scrape images from Animal Humane Society site
import requests
import urllib.request
from urllib.request import urlopen
import time
from bs4 import BeautifulSoup
import re

html = urlopen('https://animalhumanesociety.org/adoption')
response = requests.get(url)
response.content

print(response.status_code)

#soup = BeautifulSoup(response.text, "html.parser")
bs = BeautifulSoup(html, 'html.parser')
images = bs.find_all('img', {'src':re.compile('.jpg')})

for image in images:
    print(image['src']+'\n')