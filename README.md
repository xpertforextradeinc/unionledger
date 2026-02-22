# 🏦 UnionLedger — Modular Online Banking Platform

UnionLedger is a secure, audit-friendly banking system designed for global contributors and client ecosystems. Built with modular architecture and emoji-coded diagnostics, it empowers users with branded workflows, transparent transactions, and fallback alerting.

[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen)](https://nodejs.org/)

---

## 🚀 Features

- 💼 **Account Dashboard** - Balance tracking and transaction history
- 💸 **Transfer Module** - Scheduling and fallback alerts
- 📥 **Deposit & Withdrawal** - Secure flows with audit logging
- 📝 **Wallet + KYC** - Onboarding with Slack alert triggers
- 🤖 **Real-Time Trading Bot** - WebSocket-powered automated trading
- 🛡️ **Audit Dashboard** - Contributor activity and deployment hygiene
- 📘 **Contributor Guide** - Emoji-coded diagnostics

---

## ⚡ Quick Start

### Prerequisites

- Node.js 18+ 
- npm (comes with Node.js)

### Installation

```bash
# Clone the repository
git clone https://github.com/xpertforextradeinc/unionledger.git
cd unionledger

# Install dependencies
npm install

# Configure environment (optional)
cp .env.example .env
# Edit .env with your credentials

# Start the server
npm start
```

The application will be available at **http://localhost:8080**

---

## 🧩 Folder Structure

| Folder         | Purpose                                      |
|----------------|----------------------------------------------|
| `src/`         | Main landing page (HTML, CSS, JS)            |
| `🧾 src/`      | Banking interface pages (dashboard, transfer, etc.) |
| `backend/`     | API logic (auth, transactions, trading)      |
| `components/`  | Reusable UI blocks (navbar, footer)          |
| `docs/`        | Contributor guides and documentation         |
| `utils/`       | Helper functions and utilities               |
| `services/`    | External service integrations (Python)       |

---

## 🌐 Available Routes

Once the server is running, access these pages:

- **Homepage:** http://localhost:8080/
- **Register:** http://localhost:8080/register
- **Dashboard:** http://localhost:8080/dashboard
- **Transfer:** http://localhost:8080/transfer
- **Trading:** http://localhost:8080/trading
- **Audit:** http://localhost:8080/audit

---

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/wallet` - Verify wallet address
- `POST /api/auth/kyc` - Submit KYC documentation

### Transactions  
- `POST /api/tx/deposit` - Deposit funds
- `POST /api/tx/withdraw` - Withdraw funds
- `POST /api/tx/transfer` - Transfer between wallets
- `GET /api/wallet/balance/:wallet` - Get wallet balance

### Trading Bot
- `POST /api/trading/start` - Start trading bot
- `POST /api/trading/stop` - Stop trading bot
- `GET /api/trading/status` - Get bot status
- `GET /api/trading/history` - Get trading history

### WebSocket
- `ws://localhost:8080/trading-ws` - Real-time trading updates

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed API documentation and examples.

---

## 🔐 Security

- ✅ Environment-based configuration (.env)
- ✅ Input validation on all API endpoints
- ✅ Secure wallet address verification
- ✅ Audit logging for all transactions
- ✅ Slack alerts for critical events
- ✅ No hardcoded credentials

**Important:** Never commit your `.env` file. It's already in `.gitignore`.

---

## 🚀 Deployment

For production deployment instructions, see [DEPLOYMENT.md](DEPLOYMENT.md).

Quick deployment options:
- Traditional VPS/Server with PM2
- Docker containers
- Cloud platforms (Heroku, AWS, Google Cloud, Azure)

---

## 🧪 Testing

Test the API endpoints:

```bash
# Test wallet verification
curl -X POST http://localhost:8080/api/auth/wallet \
  -H "Content-Type: application/json" \
  -d '{"address": "0xABC123456789"}'

# Test deposit
curl -X POST http://localhost:8080/api/tx/deposit \
  -H "Content-Type: application/json" \
  -d '{"wallet": "0xABC123", "amount": 100}'

# Test transfer
curl -X POST http://localhost:8080/api/tx/transfer \
  -H "Content-Type: application/json" \
  -d '{"fromWallet": "0xABC123", "toWallet": "0xDEF456", "amount": 50}'

# Check trading status
curl http://localhost:8080/api/trading/status
```

---

## 🛠️ Technology Stack

### Backend
- **Node.js 18+** - Server runtime
- **Express 5.x** - Web framework
- **Web3.js 4.x** - Blockchain integration
- **WebSocket (ws)** - Real-time communication
- **Axios** - HTTP client

### Frontend
- **HTML5/CSS3/JavaScript** - Static files, no build system
- **Vanilla JavaScript** - No frameworks

### External Services
- **Infura/Alchemy** - Blockchain RPC (optional)
- **Flutterwave** - Payment processing (optional)
- **Slack** - Alerts and notifications (optional)

---

## 📚 Documentation

- [DEPLOYMENT.md](DEPLOYMENT.md) - Production deployment guide
- [SECURITY.md](SECURITY.md) - Security policies
- [docs/](docs/) - Additional documentation

---

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the ISC License.

---

## 🎯 Project Status

**Production Ready** ✅

- Server runs on port 8080
- All API endpoints functional
- WebSocket support for real-time trading
- Audit logging enabled
- Security best practices implemented

---

## 📞 Support

For issues and questions:
- Create an issue on [GitHub](https://github.com/xpertforextradeinc/unionledger/issues)
- Check the [documentation](docs/)
- Review code comments for implementation details

---

**Built with ❤️ for global banking accessibility**
