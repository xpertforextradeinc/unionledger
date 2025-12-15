import os

TELEGRAM_TOKEN = os.getenv("TELEGRAM_BOT_TOKEN")
TELEGRAM_CHAT_ID = os.getenv("TELEGRAM_CHAT_ID")

DISCORD_WEBHOOK_URL = os.getenv("DISCORD_WEBHOOK_URL")

WHATSAPP_TOKEN = os.getenv("WHATSAPP_TOKEN")
WHATSAPP_PHONE_ID = os.getenv("WHATSAPP_PHONE_ID")
WHATSAPP_TO_NUMBER = os.getenv("WHATSAPP_TO_NUMBER")

# Auto-posting API keys (for Gemini and OpenAI)
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
RSS_FEED_URL = os.getenv("RSS_FEED_URL", "https://example.com/sports/feed.xml")
KOFI_API_KEY = os.getenv("KOFI_API_KEY")
