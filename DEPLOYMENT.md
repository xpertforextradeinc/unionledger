# 🚀 UnionLedger Production Deployment Guide

This guide will help you deploy UnionLedger to production.

## 📋 Prerequisites

- **Node.js 18+** installed on your server
- **npm** package manager
- **Git** for version control
- Access to external services (optional):
  - Infura or Alchemy account for blockchain RPC
  - Flutterwave account for payment processing
  - Slack webhook for alerts

## 🔧 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/xpertforextradeinc/unionledger.git
cd unionledger
```

### 2. Install Dependencies

```bash
npm install
```

This will install all required packages:
- express (Web server)
- express-rate-limit (DDoS protection)
- web3 (Blockchain integration)
- axios (HTTP client)
- ws (WebSocket support)
- dotenv (Environment configuration)

### 3. Configure Environment Variables

Copy the example environment file and configure it:

```bash
cp .env.example .env
```

Edit the `.env` file with your actual credentials:

```bash
# Server Configuration
PORT=8080
NODE_ENV=production

# Blockchain RPC Providers (Optional - for wallet integration)
INFURA_KEY=your_infura_project_id
ALCHEMY_KEY=your_alchemy_api_key

# Payment Processing (Optional - for Flutterwave integration)
FLW_SECRET_KEY=your_flutterwave_secret_key

# Alert Configuration (Optional - for Slack notifications)
SLACK_WEBHOOK_URL=your_slack_webhook_url

# Trading Configuration (Optional)
TRADING_API_KEY=your_trading_api_key
```

**Note:** The application will work without external service credentials, but some features may be limited.

### 4. Start the Server

```bash
npm start
```

Or for development:

```bash
npm run dev
```

The server will start on port 8080 (or the PORT specified in .env).

You should see:
```
✅ UnionLedger server running on port 8080
🌐 Access the application at: http://localhost:8080
🤖 Trading WebSocket available at: ws://localhost:8080/trading-ws
```

## 🌐 Application URLs

Once deployed, your application will be available at:

- **Homepage:** `http://your-domain:8080/`
- **Registration:** `http://your-domain:8080/register`
- **Dashboard:** `http://your-domain:8080/dashboard`
- **Transfer:** `http://your-domain:8080/transfer`
- **Trading:** `http://your-domain:8080/trading`
- **Audit:** `http://your-domain:8080/audit`

## 📡 API Endpoints

### Authentication

- `POST /api/auth/wallet` - Verify wallet address
  ```bash
  curl -X POST http://localhost:8080/api/auth/wallet \
    -H "Content-Type: application/json" \
    -d '{"address": "0xABC123456789"}'
  ```

- `POST /api/auth/kyc` - Submit KYC documentation
  ```bash
  curl -X POST http://localhost:8080/api/auth/kyc \
    -H "Content-Type: application/json" \
    -d '{"type": "passport", "name": "document.pdf"}'
  ```

### Transactions

- `POST /api/tx/deposit` - Deposit funds
  ```bash
  curl -X POST http://localhost:8080/api/tx/deposit \
    -H "Content-Type: application/json" \
    -d '{"wallet": "0xABC123", "amount": 100}'
  ```

- `POST /api/tx/withdraw` - Withdraw funds
  ```bash
  curl -X POST http://localhost:8080/api/tx/withdraw \
    -H "Content-Type: application/json" \
    -d '{"wallet": "0xABC123", "amount": 50}'
  ```

- `POST /api/tx/transfer` - Transfer between wallets
  ```bash
  curl -X POST http://localhost:8080/api/tx/transfer \
    -H "Content-Type: application/json" \
    -d '{"fromWallet": "0xABC123", "toWallet": "0xDEF456", "amount": 25}'
  ```

### Trading Bot

- `POST /api/trading/start` - Start trading bot
- `POST /api/trading/stop` - Stop trading bot
- `GET /api/trading/status` - Get bot status
- `GET /api/trading/history` - Get trading history
- `POST /api/trading/strategy/:strategyKey` - Update strategy

### WebSocket

- `ws://your-domain:8080/trading-ws` - Real-time trading updates

## 🔒 Security Considerations

### Rate Limiting

UnionLedger includes built-in rate limiting to protect against DDoS attacks:
- 100 requests per IP address per 15 minutes
- Applies to all routes (API and static files)
- Returns HTTP 429 (Too Many Requests) when limit is exceeded

### Environment Variables

Never commit the `.env` file to version control. It's already in `.gitignore`.

### Input Validation

All API endpoints validate inputs:
- Wallet addresses must start with "0x"
- Transaction amounts must be positive numbers
- Required fields are checked before processing

### HTTPS

For production deployments, always use HTTPS. You can:

1. Use a reverse proxy (nginx, Apache) with SSL certificates
2. Use a cloud platform's built-in HTTPS (Heroku, AWS, etc.)
3. Use Let's Encrypt for free SSL certificates

### Firewall

Only expose necessary ports to the public:
- Port 80 (HTTP) and 443 (HTTPS) should be open
- Port 8080 should be accessible only through reverse proxy

## 🚀 Production Deployment Options

### Option 1: Traditional Server (VPS/Dedicated)

1. Install Node.js 18+ on your server
2. Clone the repository
3. Install dependencies: `npm install`
4. Configure environment variables
5. Use PM2 for process management:
   ```bash
   npm install -g pm2
   pm2 start server.js --name unionledger
   pm2 save
   pm2 startup
   ```

### Option 2: Docker Deployment

Create a `Dockerfile`:

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .
EXPOSE 8080
CMD ["node", "server.js"]
```

Build and run:
```bash
docker build -t unionledger .
docker run -p 8080:8080 --env-file .env unionledger
```

### Option 3: Cloud Platforms

#### Heroku
```bash
heroku create your-app-name
heroku config:set PORT=8080
heroku config:set NODE_ENV=production
git push heroku main
```

#### AWS, Google Cloud, Azure
Follow the respective platform's Node.js deployment guides.

## 🔍 Health Check

To verify your deployment is working:

```bash
# Check server is running
curl http://your-domain:8080/

# Test API endpoint
curl -X POST http://your-domain:8080/api/auth/wallet \
  -H "Content-Type: application/json" \
  -d '{"address": "0xABC123456789"}'

# Check trading status
curl http://your-domain:8080/api/trading/status
```

Expected responses:
- Homepage: HTML content (200 OK)
- Wallet verification: `{"status":"success","wallet":"0xABC123456789"}`
- Trading status: JSON with bot status

## 📊 Monitoring

### Application Logs

Check server logs for:
- ✅ Success messages (deposits, withdrawals, transfers)
- ❌ Error messages (invalid requests, failed operations)
- 🤖 Trading bot activity
- 🚨 Alert notifications

### Important Metrics

Monitor:
- Server uptime
- API response times
- Transaction success/failure rates
- WebSocket connection stability
- Trading bot performance

## 🐛 Troubleshooting

### Server won't start

**Issue:** Module not found errors
- **Solution:** Run `npm install` to install dependencies

**Issue:** Port already in use
- **Solution:** Change PORT in .env or kill existing process

### Pages not loading

**Issue:** 404 errors on HTML pages
- **Solution:** Verify HTML files exist in "🧾 src/" directory

### API errors

**Issue:** "Invalid wallet or amount" errors
- **Solution:** Ensure wallet addresses start with "0x" and amounts are positive

### Trading bot not working

**Issue:** Bot status shows inactive
- **Solution:** Start bot via POST /api/trading/start

## 📞 Support

For issues and questions:
- Create an issue on GitHub
- Check the documentation in `/docs`
- Review the code comments for implementation details

## 🎉 Success!

Your UnionLedger instance should now be live and ready to handle:
- User registration and KYC
- Wallet verification
- Deposits and withdrawals
- Transfers between accounts
- Real-time trading
- Audit logging

Monitor the logs and adjust configuration as needed for your specific deployment environment.
