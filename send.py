import requests
from flask import Flask, request, jsonify
import os

app = Flask(__name__)

# 🔐 Telegram bot token va chat ID
TOKEN = "8087735167:AAHhimpG71xx8UJz8fd_NSHgSZSbQNRU_oI"
CHAT_ID = "5845778698"

# 🌐 Bosh sahifa - test uchun
@app.route('/', methods=['GET'])
def home():
    return "<h1>✅ Telegram bot server ishlayapti</h1><p>POST so‘rov yuborish uchun <code>/send</code> endpointdan foydalaning.</p>"

# 📬 Telegramga xabar yuborish uchun endpoint
@app.route('/send', methods=['POST'])
def send_to_telegram():
    name = request.form.get('name')
    phone = request.form.get('phone')
    message = request.form.get('message')

    if not name or not phone or not message:
        return jsonify({
            "success": False,
            "status": 400,
            "detail": "Iltimos, barcha maydonlarni to‘ldiring."
        })

    text = (
        "📬 *Yangi murojaat!*\n"
        f"👤 *Ism:* {name}\n"
        f"📞 *Telefon:* {phone}\n"
        f"📝 *Xabar:* {message}"
    )

    url = f"https://api.telegram.org/bot{TOKEN}/sendMessage"
    payload = {
        'chat_id': CHAT_ID,
        'text': text,
        'parse_mode': 'Markdown'
    }

    try:
        response = requests.post(url, data=payload, timeout=5)
        if response.status_code == 200:
            return jsonify({
                "success": True,
                "status": 200,
                "message": "Xabar muvaffaqiyatli yuborildi!"
            })
        else:
            return jsonify({
                "success": False,
                "status": response.status_code,
                "detail": response.text
            })
    except requests.exceptions.RequestException as e:
        return jsonify({
            "success": False,
            "status": 500,
            "detail": str(e)
        })
