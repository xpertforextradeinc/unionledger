import os
import requests

class TradingStrategyAPI:
    def __init__(self):
        self.api_key = os.getenv("TRADINGSTRATEGY_API_KEY", "")
        self.base_url = "https://tradingstrategy.ai/api/v1"

    def get_futures_markets(self):
        r = requests.get(f"{self.base_url}/markets?type=futures", headers={"Authorization": f"Bearer {self.api_key}"})
        return r.json()
