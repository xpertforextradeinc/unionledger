"""
telegram_sender.py
------------------
Reusable Telegram message sender with retries, logging, and
GitHub Secrets / environment variable support.
"""

import os
import time
import logging
from typing import Optional
import requests

# ================== CONFIG ==================

TELEGRAM_TOKEN: Optional[str] = os.getenv("TELEGRAM_BOT_TOKEN")
TELEGRAM_CHAT_ID: Optional[str] = os.getenv("TELEGRAM_CHAT_ID")

TELEGRAM_API_URL = "https://api.telegram.org/bot{token}/sendMessage"

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(levelname)s - %(message)s"
)
logger = logging.getLogger(__name__)

# ================== FUNCTION ==================

def send_telegram(
    message: str,
    parse_mode: str = "Markdown",
    disable_notification: bool = False,
    retries: int = 3,
    timeout: int = 5
) -> bool:
    """
    Send a Telegram message.

    :param message: Message text
    :param parse_mode: Markdown | HTML | None
    :param disable_notification: Send silently
    :param retries: Number of retry attempts
    :param timeout: Request timeout in seconds
    :return: True if sent successfully, else False
    """

    if not TELEGRAM_TOKEN or not TELEGRAM_CHAT_ID:
        logger.warning("Telegram credentials missing. Message not sent.")
        return False

    url = TELEGRAM_API_URL.format(token=TELEGRAM_TOKEN)
    payload = {
        "chat_id": TELEGRAM_CHAT_ID,
        "text": message,
        "parse_mode": parse_mode,
        "disable_notification": disable_notification,
    }

    for attempt in range(1, retries + 1):
        try:
            response = requests.post(url, json=payload, timeout=timeout)
            response.raise_for_status()
            logger.info("Telegram message sent successfully.")
            return True

        except requests.RequestException as error:
            logger.error(
                f"Telegram send failed (attempt {attempt}/{retries}): {error}"
            )
            time.sleep(2)

    logger.critical("Telegram message failed after all retries.")
    return False


# ================== TEST (Optional) ==================
if __name__ == "__main__":
    send_telegram("✅ Telegram sender is working!")
