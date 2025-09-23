# UnionLedger Copilot Instructions

**ALWAYS follow these instructions first and fallback to additional search and context gathering only if the information in the instructions is incomplete or found to be in error.**

UnionLedger is a secure, audit-friendly modular online banking platform built with HTML, CSS, JavaScript, and Node.js. It provides wallet integration, KYC verification, transaction processing, and audit logging with emoji-coded diagnostics.

## Working Effectively

### Bootstrap and Setup
ALWAYS run these commands to set up a fresh development environment:
```bash
npm install  # Takes ~1 second. Dependencies: express, web3, dotenv
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

## Validation Scenarios

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
- Audit: http://localhost:8080/audit

## Build Information

- **No traditional build step required** - This is a static HTML/CSS/JS application with Node.js backend
- **No compilation needed** - JavaScript files are served directly
- **No bundling required** - Dependencies loaded via npm for backend only
- npm run build returns: "No build step required for this HTML/JS application"

## Repository Structure

Key directories and their purposes:
- `src/` - Main HTML pages (index.html)
- `🧾 src/` - Banking interface pages (register.html, transfer.html, dashboard.html, audit.html)
- `backend/` - API logic (auth.js, transactions.js, server controllers)
- `backend/🔧 backend/` - Core transaction logic module
- `backend/🚨 backend/` - Alerting and notification system
- `utils/` - RPC fallback utilities for blockchain connection
- `⚙️ config/` - Deployment configurations (deploy.yaml)
- `📘 docs/` - Documentation and onboarding guides

## Common Commands Reference

### Repository Inventory
```bash
ls -la                    # Root directory contents
find . -name "*.js"       # All JavaScript files
find . -name "*.html"     # All HTML files 
```

### Dependency Management  
```bash
npm install               # Install all dependencies (~1 second)
npm list                  # Show installed packages
```

### Server Operations
```bash
node server.js           # Start server (port 8080)
curl http://localhost:8080/  # Test server response
```

## Known Issues and Workarounds

### Web3 Integration
- Web3 scripts (backend/testAlchemy.js, walletVerify.js) require Web3 v4 syntax fixes
- Currently fails with "Web3 is not a constructor" error
- Requires: `const { Web3 } = require('web3');` instead of `const Web3 = require('web3');`

### File Path Issues
- Some files use emoji prefixes (`🧾 src/`, `⚙️ config/`)
- Use quotes when referencing these paths in bash: `"🧾 src/register.html"`

## Environment Setup

### Required Dependencies
```bash
npm install express dotenv web3
```

### Environment Variables
- Create `.env` file with:
  - `INFURA_KEY=your_infura_key` 
  - `ALCHEMY_KEY=your_alchemy_key`
- Sample values exist in `backend/.env`

## Testing Commands That Work

```bash
# Server functionality
node server.js                    # ✅ Works - starts in ~2 seconds
npm run dev                       # ✅ Works - same as above
curl http://localhost:8080/api/tx/deposit # ✅ Works - API endpoints functional

# Wallet verification (currently broken - Web3 issue)
node backend/testAlchemy.js       # ❌ Fails - Web3 constructor issue
node walletVerify.js             # ❌ Fails - Web3 constructor issue
```

## Development Workflow

When making changes:
1. **ALWAYS run `node server.js`** to verify server starts
2. **Test API endpoints** with curl commands above
3. **Navigate to web pages** to verify UI changes
4. **Test at least one complete user flow** (registration + transaction)
5. **Check browser console** for JavaScript errors
6. **Verify emoji-coded diagnostics** display correctly in UI

## No Linting or Additional Build Tools

This repository does not include:
- ESLint, JSHint, or other JavaScript linters
- webpack, gulp, or other build tools  
- Automated testing frameworks
- CSS preprocessors

Changes should be validated manually through the testing scenarios above.

## Port and Access Information

- **Default port**: 8080
- **Local URLs**: 
  - Main: http://localhost:8080/
  - Registration: http://localhost:8080/register
  - Dashboard: http://localhost:8080/dashboard
  - Transfer: http://localhost:8080/transfer
  - Audit: http://localhost:8080/audit

**ALWAYS ensure no other service is using port 8080 before starting the server.**