from signal_parser import parse_signal, format_signal_for_message
from telegram_sender import send_telegram
from discord_sender import send_discord
from whatsapp_sender import send_whatsapp

def process_signal(
    raw_signal: str,
    stop_loss: float | None = None,
    take_profit: float | None = None,
    channels: list[str] | None = None,
) -> None:
    """
    raw_signal: e.g. 'BUY 25 TSLA'
    channels: subset of ['telegram', 'discord', 'whatsapp']
    """
    if channels is None:
        channels = ["telegram", "discord", "whatsapp"]

    sig = parse_signal(raw_signal, stop_loss=stop_loss, take_profit=take_profit)
    msg = format_signal_for_message(sig)

    if "telegram" in channels:
        send_telegram(msg)
    if "discord" in channels:
        send_discord(msg)
    if "whatsapp" in channels:
        send_whatsapp(msg)
