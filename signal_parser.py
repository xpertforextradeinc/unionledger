import re
from dataclasses import dataclass
from typing import Optional

@dataclass
class Signal:
    side: str            # BUY / SELL
    quantity: float
    symbol: str
    stop_loss: Optional[float] = None
    take_profit: Optional[float] = None

SIGNAL_RE = re.compile(
    r"^(BUY|SELL)\s+(\d+(?:\.\d+)?)\s+([A-Z]+)$",
    re.IGNORECASE,
)

def parse_signal(text: str, stop_loss: float | None = None,
                 take_profit: float | None = None) -> Signal:
    """
    Examples:
        'BUY 25 TSLA'
        'SELL 10 BTC'
    """
    text = text.strip()
    m = SIGNAL_RE.match(text)
    if not m:
        raise ValueError(f"Cannot parse signal from: {text!r}")

    side, qty, symbol = m.groups()

    return Signal(
        side=side.upper(),
        quantity=float(qty),
        symbol=symbol.upper(),
        stop_loss=stop_loss,
        take_profit=take_profit,
    )

def format_signal_for_message(sig: Signal) -> str:
    lines = [
        f"{sig.side} {sig.quantity} {sig.symbol}",
    ]
    if sig.stop_loss is not None:
        lines.append(f"STOP LOSS {sig.stop_loss}")
    if sig.take_profit is not None:
        lines.append(f"TAKE PROFIT {sig.take_profit}")
    return "\n".join(lines)
