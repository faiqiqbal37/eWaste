from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from bs4 import BeautifulSoup
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
import json



def itemToBeFound(item, my_css_class="s-item__info clearfix"):
    try:
        baseUrl = f'https://www.ebay.co.uk/'
        url = f'https://www.ebay.co.uk/sch/{item}'

        chrome_options = Options()
        chrome_options.add_argument('--headless')

        driver = webdriver.Chrome(options=chrome_options)  
        driver.get(url)

        wait = WebDriverWait(driver, 2)
        element_present = wait.until(EC.presence_of_element_located((By.XPATH, f'//div[@class="s-item__info clearfix"]')))


        html_content = driver.page_source

        
        driver.quit()

        soup = BeautifulSoup(html_content, 'html.parser')

        target_divs= soup.find_all('div', class_=my_css_class)

        all_data = []
        for target_div in target_divs:
            data_dict = {}

            link = target_div.find(class_='s-item__link')
            link = link.attrs
            data_dict['href'] = link['href']

            link = target_div.find(class_='s-item__title')
            data_dict['title'] = link.get_text()

            link = target_div.find(class_='s-item__price')
            price = (link.get_text().split()[0])
            data_dict['price'] = price

            all_data.append(data_dict)

        return all_data

    except Exception as e:
        return []


if __name__ == "__main__":
    data = itemToBeFound("iphone 11")
    for d in data:
       print()
       print(d)




