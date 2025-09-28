🧭 Copilot Guide for UnionLedger Trading Bot

📌 Project Overview

UnionLedger is a real-time trading bot project. Copilot should help generate modular, clean, and testable code that integrates with forex/crypto APIs, executes strategies, and handles errors gracefully.

⸻

📝 Coding Style
	•	Use Python 3.11+
	•	Follow PEP8 standards
	•	Always include type hints
	•	Use async/await for API/network calls
	•	Keep functions short & single-purpose
	•	Prefer list comprehensions over loops where simple

⸻

📚 Preferred Libraries
	•	HTTP & APIs: httpx (async), requests (sync only if necessary)
	•	Data Handling: pandas, numpy
	•	Trading Logic: custom modules under /strategies
	•	Logging: built-in logging module (no print())
	•	Environment Variables: python-dotenv for secrets (.env file)
	•	Testing: pytest

⸻

🏗️ Project Structure
unionledger/
├── core/          # core bot logic
├── strategies/    # trading strategies
├── services/      # API integrations (e.g., Binance, Forex API)
├── tests/         # pytest test cases
├── utils/         # helpers (logging, config, etc.)
└── main.py        # entry point