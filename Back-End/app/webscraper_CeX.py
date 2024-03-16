from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from bs4 import BeautifulSoup
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
import json



def itemToBeFound(item, my_css_class="wrapper-box"):
    try:
        baseUrl = f'https://uk.webuy.com/'
        url = f'https://uk.webuy.com/search?stext={item}'

        chrome_options = Options()
        chrome_options.add_argument('--headless')

        driver = webdriver.Chrome(options=chrome_options)  
        driver.get(url)

        wait = WebDriverWait(driver, 2)
        element_present = wait.until(EC.presence_of_element_located((By.XPATH, f'//div[@class="wrapper-box"]')))


        html_content = driver.page_source

        
        driver.quit()

        soup = BeautifulSoup(html_content, 'html.parser')

        target_divs= soup.find_all('div', class_=my_css_class)

        all_data = []
        for target_div in target_divs:
            data_dict = {}
            link = target_div.find(class_='line-clamp')
            link = link.attrs

            data_dict['href'] = baseUrl + link['href']
            data_dict['title'] = link['title']
            link = target_div.find(class_='product-main-price')
            price = (link.get_text())
            price = price[1:]
            
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
