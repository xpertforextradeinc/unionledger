import os
import httpx
from dotenv import load_dotenv
import logging

# Load environment variables
load_dotenv()

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Flutterwave API details
FLW_BASE_URL = "https://api.flutterwave.com/v3"
FLW_SECRET_KEY = os.getenv("FLW_SECRET_KEY")


class FlutterwaveService:
    def __init__(self):
        if not FLW_SECRET_KEY:
            raise ValueError("⚠️ Missing FLW_SECRET_KEY in .env")
        self.headers = {
            "Authorization": f"Bearer {FLW_SECRET_KEY}",
            "Content-Type": "application/json",
        }

    async def initialize_payment(self, amount: int, currency: str, email: str):
        """
        Initialize a payment with Flutterwave
        :param amount: Payment amount (int)
        :param currency: NGN, USD, GBP, EUR
        :param email: User email
        :return: Checkout link (string) or error (dict)
        """
        payload = {
            "tx_ref": f"txn-{os.urandom(8).hex()}",
            "amount": str(amount),
            "currency": currency,
            "redirect_url": "https://yourapp.com/payment/callback",
            "customer": {"email": email},
            "payment_options": "card,account,ussd",
        }

        async with httpx.AsyncClient() as client:
            response = await client.post(
                f"{FLW_BASE_URL}/payments", headers=self.headers, json=payload
            )

        data = response.json()
        if response.status_code == 200 and data.get("status") == "success":
            checkout_url = data["data"]["link"]
            logger.info(f"Payment initialized: {checkout_url}")
            return checkout_url
        else:
            logger.error(f"Payment init failed: {data}")
            return data

    async def verify_payment(self, transaction_id: str):
        """
        Verify payment status using transaction ID
        :param transaction_id: Flutterwave transaction ID
        :return: Transaction details (dict)
        """
        async with httpx.AsyncClient() as client:
            response = await client.get(
                f"{FLW_BASE_URL}/transactions/{transaction_id}/verify",
                headers=self.headers,
            )

        data = response.json()
        if response.status_code == 200 and data.get("status") == "success":
            logger.info(f"Payment verified: {data}")
            return data
        else:
            logger.error(f"Payment verification failed: {data}")
            return data
