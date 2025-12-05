import requests
from config import WHATSAPP_TOKEN, WHATSAPP_PHONE_ID, WHATSAPP_TO_NUMBER

def send_whatsapp(msg: str) -> None:
    if not (WHATSAPP_TOKEN and WHATSAPP_PHONE_ID and WHATSAPP_TO_NUMBER):
        print("WhatsApp config missing; skipping send.")
        return

    url = f"https://graph.facebook.com/v18.0/{WHATSAPP_PHONE_ID}/messages"
    payload = {
        "messaging_product": "whatsapp",
        "to": WHATSAPP_TO_NUMBER,
        "type": "text",
        "text": {"body": msg},
    }
    headers = {"Authorization": f"Bearer {WHATSAPP_TOKEN}"}

    try:
        resp = requests.post(url, json=payload, headers=headers, timeout=5)
        resp.raise_for_status()
    except requests.RequestException as e:
        print(f"WhatsApp send error: {e}")
