from flask import Flask, request, jsonify
from flask_cors import CORS
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC  # Adicione esta linha
import threading
import time

app = Flask(__name__)
CORS(app)

@app.route('/')
def index():
    return "Bem-vindo ao servidor Flask!"

def send_whatsapp_message(phone_number, message):
    chrome_options = Options()
    user_data_dir = "C:\\xampp\\htdocs\\Qdelicia\\User_Data"  # Mude para o caminho desejado
    chrome_options.add_argument(f"--user-data-dir={user_data_dir}")
    
    service = Service('C:\\chormedriver\\chromedriver.exe')
    driver = webdriver.Chrome(service=service, options=chrome_options)

    try:

        driver.get(f"https://web.whatsapp.com/send?phone={phone_number}&text={message}")
        send_button = WebDriverWait(driver, 20).until(EC.element_to_be_clickable((By.XPATH, "//span[@data-icon='send']")))
        
        print(f"Enviando mensagem para {phone_number}: {message}")
        send_button.click()
        time.sleep(5)  # Aguarda um pouco após enviar

    except Exception as e:
        print(f"Erro ao enviar mensagem: {e}")

    finally:
        driver.quit()

@app.route('/send-message', methods=['POST'])
def send_message():
    data = request.json
    print(data)
    phone_number = data['phone_number']
    order_code = data['order_code']
    message = f"O seu pedido ({order_code}) foi ACEITO, estamos encaminhando-o para a fila de preparo."

    threading.Thread(target=send_whatsapp_message, args=(phone_number, message)).start()
    
    return jsonify({"status": "Pedido confirmado, estamos encaminhando para a fila de preparo"}), 200

if __name__ == '__main__':
    app.run(port=5000)
