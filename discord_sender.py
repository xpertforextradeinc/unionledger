import requests
from config import DISCORD_WEBHOOK_URL

def send_discord(msg: str) -> None:
    if not DISCORD_WEBHOOK_URL:
        print("Discord webhook missing; skipping send.")
        return

    try:
        resp = requests.post(DISCORD_WEBHOOK_URL, json={"content": msg}, timeout=5)
        resp.raise_for_status()
    except requests.RequestException as e:
        print(f"Discord send error: {e}")
