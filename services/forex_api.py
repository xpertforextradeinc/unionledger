import httpx
import os
from dotenv import load_dotenv
import logging

# --- Setup Logging ---
# It's good practice to configure logging at the application entry point (e.g., main.py)
# but we'll set up a basic logger here for demonstration.
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

# --- Load Environment Variables ---
# This will load the .env file from the project root
load_dotenv()

def get_eur_usd_rate() -> float | None:
    """
    Fetches the latest EUR/USD exchange rate from AlphaVantage asynchronously.

    Returns:
        The exchange rate as a float, or None if an error occurs.
    """
    api_key = os.getenv("ALPHAVANTAGE_API_KEY")
    if not api_key:
        logging.error("AlphaVantage API key not found in .env file.")
        return None

    url = (
        "https://www.alphavantage.co/query"
        "?function=CURRENCY_EXCHANGE_RATE"
        "&from_currency=EUR"
        "&to_currency=USD"
        f"&apikey={api_key}"
    )

    try:
        async with httpx.AsyncClient() as client:
            response = await client.get(url)
            response.raise_for_status()  # Raises an exception for 4XX/5XX responses

            data = response.json()

            # --- Graceful API Error Handling ---
            if "Realtime Currency Exchange Rate" not in data:
                error_message = data.get("Error Message", "Unknown API error")
                logging.error(f"AlphaVantage API error: {error_message}")
                return None

            exchange_rate_data = data["Realtime Currency Exchange Rate"]
            price_str = exchange_rate_data.get("5. Exchange Rate")

            if price_str:
                logging.info(f"Successfully fetched EUR/USD rate: {price_str}")
                return float(price_str)
            else:
                logging.error("Could not parse exchange rate from API response.")
                return None

    except httpx.RequestError as e:
        logging.error(f"HTTP request failed: {e}")
        return None
    except (ValueError, TypeError):
        logging.error("Failed to convert exchange rate to float.")
        return None

# --- Example Usage (can be run from main.py) ---
# import asyncio
#
# async def main():
#     rate = await get_eur_usd_rate()
#     if rate is not None:
#         print(f"The current EUR/USD rate is: {rate}")
#     else:
#         print("Failed to retrieve the rate.")
#
# if __name__ == "__main__":
#     asyncio.run(main())
