# UnionLedger Copilot Instructions

**ALWAYS follow these instructions first and fallback to additional search and context gathering only if the information in the instructions is incomplete or found to be in error.**

## 🏦 Project Overview

UnionLedger is a secure, audit-friendly modular online banking platform designed for global users and contributors. It combines traditional banking features with modern blockchain wallet integration, KYC verification, transaction processing, real-time trading capabilities, and comprehensive audit logging.

**Core Features:**
- 💼 Account dashboard with balance and transaction history
- 💸 Transfer module with scheduling and fallback alerts
- 📥 Deposit & 📤 Withdrawal flows with audit logging
- 📝 Wallet + KYC onboarding with alert triggers
- 🤖 Real-time trading bot with WebSocket support
- 🛡️ Audit dashboard for contributor activity and deployment hygiene
- 📘 Contributor onboarding with emoji-coded diagnostics

**Target Users:**
- Global banking customers requiring secure digital transactions
- Contributors and developers building on the platform
- Financial institutions seeking modular banking solutions

## 🛠️ Tech Stack

### Backend
- **Node.js 18+** with Express 5.x for HTTP server
- **Python 3.8+** for payment processing and trading services (httpx requires 3.8+)
- **Web3.js 4.x** for blockchain wallet integration
- **WebSocket (ws)** for real-time trading updates
- **Axios** for external API calls

### Frontend
- **HTML5/CSS3/JavaScript (ES6+)** - Static files, no build system
- **No frameworks** - Vanilla JavaScript for UI interactions
- **WebSocket client** for real-time data streaming

### External Services
- **Flutterwave** for payment processing
- **Infura/Alchemy** for blockchain RPC endpoints
- **Forex APIs** for trading data

### Development Tools
- **npm** for dependency management
- **dotenv** for environment variable management
- No linters, no bundlers, no build tools by design

## 📁 Repository Structure

```
unionledger/
├── .github/              # GitHub configuration and workflows
│   ├── copilot-instructions.md
│   ├── workflows/        # CI/CD pipelines
│   └── ISSUE_TEMPLATE/   # Issue templates
├── src/                  # Main HTML pages
│   └── index.html        # Landing page
├── 🧾 src/               # Banking interface pages (emoji-prefixed)
│   ├── register.html     # User registration & KYC
│   ├── dashboard.html    # Account dashboard
│   ├── transfer.html     # Transfer interface
│   ├── trading.html      # Trading bot UI
│   └── audit.html        # Audit logs viewer
├── backend/              # Node.js API logic
│   ├── auth.js           # Wallet & KYC verification
│   ├── transactions.js   # Deposit/withdraw/transfer logic
│   ├── tradingBot.js     # Real-time trading bot engine
│   ├── onboard.js        # User onboarding flows
│   ├── controllers/      # Additional API controllers
│   ├── 🔧 backend/       # Core transaction logic (emoji-prefixed)
│   └── 🚨 backend/       # Alerting system (emoji-prefixed)
├── services/             # Python microservices
│   ├── payment.py        # Flutterwave payment integration
│   └── forex_api.py      # Forex data provider
├── components/           # Reusable UI components
│   ├── navbar/           # Navigation bar
│   └── footer/           # Page footer
├── utils/                # Utility functions
│   └── rpc_fallback.js   # Blockchain RPC fallback logic
├── docs/                 # Documentation
│   └── onboarding.md     # Contributor guide
├── ⚙️ config/            # Deployment configs (emoji-prefixed)
├── 📘 docs/              # Additional docs (emoji-prefixed)
├── server.js             # Main Express server entry point
├── package.json          # Node.js dependencies
└── .env                  # Environment variables (not committed)
```

**Note on Emoji Prefixes:**
- Some directories use emoji prefixes for visual organization
- Always use quotes when referencing in shell: `"🧾 src/register.html"`
- These are actual directory/file names, not decorative

## 🎨 Coding Style Guidelines

### JavaScript (Node.js & Frontend)

**General Principles:**
- Use **ES6+ syntax** (const/let, arrow functions, async/await)
- **No semicolons** - This codebase follows ASI (Automatic Semicolon Insertion)
  - Existing code consistently omits semicolons
  - Maintain this convention for consistency
  - Be aware of ASI edge cases with return statements and line breaks
- Use **camelCase** for variables and functions
- Use **PascalCase** for classes
- Keep functions **short and focused** (single responsibility)

**Module Pattern:**
```javascript
// ✅ Good - Module exports with clear function purpose
module.exports = {
  verifyWallet: async (walletAddress) => {
    // Implementation
  },
  
  verifyKYC: async (document) => {
    // Implementation
  }
};
```

**Error Handling:**
```javascript
// ✅ Always validate inputs and return structured responses
if (!walletAddress || !walletAddress.startsWith("0x")) {
  console.warn("❌ Invalid wallet format");
  return { status: "error", message: "Invalid wallet address" };
}
```

**Console Logging with Emojis:**
- Use emoji prefixes for visual clarity in logs
- ✅ Success: `console.log("✅ Operation completed")`
- ❌ Error: `console.warn("❌ Operation failed")`
- ⚠️ Warning: `console.warn("⚠️ Attention needed")`
- 🤖 Bot activity: `console.log("🤖 Trading bot started")`

### Python (Services)

**Follow PEP 8 Standards:**
- Use **type hints** for all function parameters and returns
- Use **async/await** for all API/network calls
- Import **httpx** for async HTTP (not requests)
- Use **python-dotenv** for environment variables
- Configure **logging** module (never use print())

**Example Pattern:**
```python
async def initialize_payment(self, amount: int, currency: str, email: str):
    """
    Initialize a payment with Flutterwave
    :param amount: Payment amount (int)
    :param currency: NGN, USD, GBP, EUR
    :param email: User email
    :return: Checkout link (string) or error (dict)
    """
    # Implementation with proper error handling
    logger.info(f"Payment initialized: {checkout_url}")
```

**Required Libraries:**
- `httpx` for async HTTP requests
- `pandas` for data handling
- `python-dotenv` for environment variables
- `logging` for structured logging

## 🔐 Security Expectations

**This is a financial application. Security is paramount.**

### Authentication & Authorization
- **ALWAYS** validate wallet addresses (must start with "0x")
- **NEVER** store private keys or secrets in code
- Use environment variables (.env) for all API keys and secrets
- Implement proper KYC verification flows

### Input Validation
```javascript
// ✅ Always validate before processing
if (!wallet || amount <= 0) {
  console.warn("❌ Invalid transaction request");
  return { status: "error", message: "Invalid wallet or amount" };
}
```

### Sensitive Data
- **NO hardcoded credentials** - Use process.env or .env files
- **NO logging of sensitive data** (wallet private keys, API secrets)
- API keys go in `.env`:
  ```
  INFURA_KEY=your_infura_key
  ALCHEMY_KEY=your_alchemy_key
  FLW_SECRET_KEY=your_flutterwave_key
  ```

### Transaction Safety
- Validate all transaction amounts (must be positive)
- Validate wallet addresses before any operation
- Log all transaction attempts for audit trail
- Use structured error responses with status codes

### API Security
- Validate all request bodies
- Return appropriate HTTP status codes (500 for errors)
- Never expose internal error details to clients
- Use HTTPS in production (enforced at deployment level)

## 🔌 API Patterns and Naming Conventions

### REST Endpoints

**Authentication:**
- `POST /api/auth/wallet` - Verify wallet address
- `POST /api/auth/kyc` - Submit KYC documentation

**Transactions:**
- `POST /api/tx/deposit` - Deposit funds
- `POST /api/tx/withdraw` - Withdraw funds
- `POST /api/tx/transfer` - Transfer between wallets

**Trading:**
- `POST /api/trading/start` - Start trading bot
- `POST /api/trading/stop` - Stop trading bot
- `GET /api/trading/status` - Get bot status
- `GET /api/trading/history` - Get trading history
- `POST /api/trading/strategy/:strategyKey` - Update strategy

### Request/Response Format

**Request Body:**
```javascript
// Deposit
{ "wallet": "0xABC123", "amount": 100 }

// Transfer
{ "fromWallet": "0xABC123", "toWallet": "0xDEF456", "amount": 50 }
```

**Success Response:**
```javascript
{
  "status": "success",
  "type": "deposit|withdrawal|transfer",
  "amount": 100
}
```

**Error Response:**
```javascript
{
  "status": "error",
  "message": "Invalid wallet or amount"
}
```

### WebSocket Events

**Endpoint:** `ws://localhost:8080/trading-ws`

**Event Types:**
- `status` - Current bot status
- `marketUpdate` - Real-time market data
- `tradeExecuted` - Trade execution notification
- `botStarted` - Bot started event
- `botStopped` - Bot stopped event

## 🧪 Testing Expectations

### Manual Testing (No Automated Framework)

**This repository does NOT have:**
- Automated test frameworks (Jest, Mocha, pytest)
- Linters (ESLint, Pylint)
- Build tools (webpack, gulp)

**Validation is done manually through:**

1. **Server Startup Test:**
```bash
node server.js  # Should start in 2-3 seconds on port 8080
```

2. **API Endpoint Testing:**
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
```

3. **Browser Testing:**
- Navigate to http://localhost:8080/register
- Fill out registration form
- Submit and verify API response in browser console

4. **Complete User Flow Testing:**
   - User registration (wallet + KYC)
   - Account dashboard access
   - Deposit transaction
   - Transfer between accounts
   - Trading bot activation
   - Audit log verification

### Expected Test Results

**Successful Deposit:**
```json
{"status":"success","type":"deposit","amount":100}
```

**Successful Withdrawal:**
```json
{"status":"success","type":"withdrawal","amount":50}
```

**Successful Transfer:**
```json
{"status":"success","type":"transfer","amount":25}
```

**Invalid Input:**
```json
{"status":"error","message":"Invalid wallet or amount"}
```

## 🚀 Deployment Notes

### Environment Setup

**Required Environment Variables:**
```bash
# Blockchain RPC Providers
INFURA_KEY=your_infura_project_id
ALCHEMY_KEY=your_alchemy_api_key

# Payment Processing
FLW_SECRET_KEY=your_flutterwave_secret_key

# Server Configuration
PORT=8080  # Default port, can be overridden
NODE_ENV=development  # or production
```

**Setup Commands:**
```bash
# Install dependencies (~1 second)
npm install

# Start development server
npm run dev
# OR
npm start
# OR
node server.js
```

### Production Deployment

**No Build Step Required:**
- This is a static HTML/CSS/JS application with Node.js backend
- No compilation, bundling, or transpilation needed
- JavaScript files are served directly
- Dependencies loaded via npm for backend only

**Deployment Checklist:**
1. Set environment variables in production environment
2. Ensure port 8080 is available (or set custom PORT)
3. Start server: `node server.js`
4. Verify WebSocket endpoint is accessible
5. Test all API endpoints
6. Check HTTPS is enforced (at infrastructure level)
7. Enable audit logging
8. Configure Slack/Discord alerts for critical events

### Known Deployment Issues

**Web3 Integration:**
- Web3 v4 requires destructured import: `const { Web3 } = require('web3');`
- Current scripts (backend/testAlchemy.js, walletVerify.js) need updating
- Workaround: Use Web3 v4 syntax or downgrade to v3

**Port Conflicts:**
- Default port 8080 may conflict with other services
- Always check port availability before deployment
- Use environment variable to override: `PORT=3000 node server.js`

## 💡 Working Effectively

### Bootstrap and Setup
ALWAYS run these commands to set up a fresh development environment:
```bash
npm install  # Takes ~1 second. Dependencies: express, web3, dotenv, ws, axios
```

### Build and Run 
```bash
npm run dev    # Starts server on port 8080 - takes ~2 seconds
# OR
npm start      # Same as npm run dev
# OR  
node server.js # Direct server start
```

**NEVER CANCEL SERVER STARTUP** - Server starts in 2-3 seconds consistently.

### Development Workflow

When making changes:
1. **ALWAYS run `node server.js`** to verify server starts
2. **Test API endpoints** with curl commands
3. **Navigate to web pages** to verify UI changes
4. **Test at least one complete user flow** (registration + transaction)
5. **Check browser console** for JavaScript errors
6. **Verify emoji-coded diagnostics** display correctly in UI

### Testing and Validation
After making changes, ALWAYS validate with these steps:
```bash
# 1. Test server starts successfully
node server.js

# 2. Test API endpoints with curl
curl -X POST http://localhost:8080/api/auth/wallet -H "Content-Type: application/json" -d '{"address": "0xABC123456789"}'
curl -X POST http://localhost:8080/api/tx/deposit -H "Content-Type: application/json" -d '{"wallet": "0xABC123", "amount": 100}'
curl -X POST http://localhost:8080/api/tx/transfer -H "Content-Type: application/json" -d '{"fromWallet": "0xABC123", "toWallet": "0xDEF456", "amount": 50}'
```

## 🧪 Validation Scenarios

**ALWAYS test these complete user scenarios after making changes:**

### 1. User Registration Flow
- Navigate to http://localhost:8080/register
- Fill wallet address field with "0xABC123456789"
- Fill email field with "test@example.com" 
- Upload a KYC document (any file)
- Submit form and verify API response

### 2. Transaction Processing
- Test deposit: Should return `{"status":"success","type":"deposit","amount":100}`
- Test withdrawal: Should return `{"status":"success","type":"withdrawal","amount":50}` 
- Test transfer: Should return `{"status":"success","type":"transfer","amount":25}`

### 3. Web Interface Navigation
- Homepage: http://localhost:8080/ (shows file structure)
- Registration: http://localhost:8080/register
- Dashboard: http://localhost:8080/dashboard  
- Transfer: http://localhost:8080/transfer
- Trading: http://localhost:8080/trading
- Audit: http://localhost:8080/audit

## 📚 Additional Resources

### Common Commands Reference

**Repository Inventory:**
```bash
ls -la                    # Root directory contents
find . -name "*.js"       # All JavaScript files
find . -name "*.html"     # All HTML files
find . -name "*.py"       # All Python files
```

**Dependency Management:**
```bash
npm install               # Install all dependencies (~1 second)
npm list                  # Show installed packages
```

**Server Operations:**
```bash
node server.js                      # Start server (port 8080)
curl http://localhost:8080/         # Test server response
PORT=3000 node server.js            # Start on custom port
```

### Known Issues and Workarounds

**Web3 Integration:**
- Web3 scripts (backend/testAlchemy.js, walletVerify.js) currently have Web3 v4 syntax issues
- Error: "Web3 is not a constructor"
- **Fix required**: Change `const Web3 = require('web3');` to `const { Web3 } = require('web3');`
- These scripts are non-critical to core banking functionality
- Issue tracked for future resolution

**File Path Issues:**
- Some files use emoji prefixes (`🧾 src/`, `⚙️ config/`, `📘 docs/`)
- Use quotes when referencing these paths in bash: `"🧾 src/register.html"`
- These are actual directory names, not just decorative

**Testing Commands Status:**
```bash
# Server functionality
node server.js                    # ✅ Works - starts in ~2 seconds
npm run dev                       # ✅ Works - same as above
curl http://localhost:8080/api/tx/deposit # ✅ Works - API endpoints functional

# Wallet verification (currently broken - Web3 issue)
node backend/testAlchemy.js       # ❌ Fails - Web3 constructor issue
node walletVerify.js             # ❌ Fails - Web3 constructor issue
```

### Port and Access Information

- **Default port**: 8080
- **Local URLs**: 
  - Main: http://localhost:8080/
  - Registration: http://localhost:8080/register
  - Dashboard: http://localhost:8080/dashboard
  - Transfer: http://localhost:8080/transfer
  - Trading: http://localhost:8080/trading
  - Audit: http://localhost:8080/audit
  - WebSocket: ws://localhost:8080/trading-ws

**ALWAYS ensure no other service is using port 8080 before starting the server.**

## 🎯 Best Practices Summary

### When Writing New Code

1. **Security First:**
   - Validate all inputs
   - Use environment variables for secrets
   - Log all financial transactions
   - Return structured error responses

2. **Follow Existing Patterns:**
   - Match emoji logging convention
   - Use module.exports pattern for Node.js
   - Use async/await for async operations
   - Keep functions focused and simple

3. **Documentation:**
   - Add JSDoc comments for complex functions
   - Use docstrings for Python functions
   - Include parameter types and return types
   - Explain business logic, not obvious code

4. **Testing:**
   - Manually test server startup
   - Test API endpoints with curl
   - Verify UI in browser
   - Check browser console for errors
   - Test complete user flows

5. **Error Handling:**
   - Always validate inputs first
   - Return structured responses
   - Log errors with emoji prefixes
   - Never expose internal errors to clients

### When Reviewing Code

- Check for hardcoded credentials
- Verify input validation
- Ensure proper error handling
- Check emoji logging consistency
- Verify API response structure
- Test endpoints manually
- Review security implications for financial operations

---

**Remember:** UnionLedger is a financial platform. Security, reliability, and audit trails are critical. When in doubt, validate more, log more, and fail safely.