# GitHub Copilot Guide for UnionLedger Contributors

Welcome to UnionLedger! This guide helps you use GitHub Copilot effectively when contributing to this project.

## 🚀 Quick Start

GitHub Copilot has been configured with custom instructions for this repository. It understands:
- UnionLedger's architecture (Node.js backend, Python services, vanilla JS frontend)
- Security requirements for banking applications
- Emoji-coded logging conventions
- API patterns and naming standards
- Testing workflows (manual validation)

## 💡 Getting the Most from Copilot

### 1. Let Copilot Know Your Intent

Instead of writing code from scratch, describe what you need:

```javascript
// Good: Describe the business logic
// Create a function to validate a transfer between two wallets
// ensuring both wallets exist and the amount is positive

// Copilot will suggest:
async function validateTransfer(fromWallet, toWallet, amount) {
  if (!fromWallet || !toWallet || amount <= 0) {
    console.warn("❌ Invalid transfer request");
    return { status: "error", message: "Missing wallet or invalid amount" };
  }
  // Additional validation...
}
```

### 2. Use Inline Comments for Context

```javascript
// POST endpoint to start the trading bot
// Should validate user permissions and return bot status
app.post('/api/trading/start', async (req, res) => {
  // Copilot will complete with proper error handling
```

### 3. Follow Existing Patterns

Copilot learns from your codebase. When working in:
- **backend/auth.js**: Copilot knows to validate wallet addresses and use emoji logging
- **services/*.py**: Copilot will suggest async/await with type hints
- **server.js**: Copilot understands Express route patterns

### 4. Security-Aware Suggestions

Copilot is instructed about security requirements. It will help you:
- ✅ Validate all inputs before processing
- ✅ Use environment variables for secrets
- ✅ Return structured error responses
- ✅ Log financial transactions appropriately

**Example:**
```javascript
// When you start typing a payment function, Copilot suggests:
async function processPayment(wallet, amount) {
  // Input validation
  if (!wallet || !wallet.startsWith("0x")) {
    return { status: "error", message: "Invalid wallet address" };
  }
  
  if (amount <= 0) {
    return { status: "error", message: "Amount must be positive" };
  }
  
  // Process with proper logging...
}
```

## 🎯 Common Tasks

### Adding a New API Endpoint

Start with a comment describing the endpoint:
```javascript
// Create a POST endpoint for scheduled transfers
// Parameters: fromWallet, toWallet, amount, scheduleTime
// Validates wallet addresses and schedules the transfer

// Copilot will suggest the full implementation
```

### Adding a New Python Service

```python
# Create a service class for Binance API integration
# Methods: get_market_price, execute_trade, get_account_balance
# Use async/await and proper error handling

# Copilot will scaffold the class
```

### Creating Frontend Components

```html
<!-- Create a transaction history table with filtering -->
<!-- Columns: Date, Type, Amount, Status, From, To -->
<!-- Include search and date range filters -->

<!-- Copilot will generate the HTML structure -->
```

## 🔐 Security Reminders

Even with Copilot's help, always:
- ❌ Never commit API keys or secrets
- ✅ Use `process.env.VARIABLE_NAME` or `.env` files
- ✅ Validate all user inputs
- ✅ Use prepared statements for database queries (when applicable)
- ✅ Log sensitive operations for audit trails

## 🧪 Testing Your Code

After Copilot generates code:

1. **Start the server:**
   ```bash
   node server.js
   ```

2. **Test endpoints manually:**
   ```bash
   curl -X POST http://localhost:8080/api/your-endpoint \
     -H "Content-Type: application/json" \
     -d '{"param": "value"}'
   ```

3. **Test in browser:**
   - Navigate to the relevant page
   - Open DevTools Console (F12)
   - Verify functionality and check for errors

4. **Test complete user flows:**
   - Registration → Deposit → Transfer → Audit Log

## 📚 Helpful Prompts

Try these in Copilot Chat:

- "Explain the wallet verification flow in backend/auth.js"
- "How should I add logging to this function?"
- "What's the pattern for error handling in this codebase?"
- "Show me how to add a new transaction type"
- "How do I test the WebSocket connection?"

## 🐛 Troubleshooting

### Copilot suggests code that doesn't match our style

Use inline comments to guide it:
```javascript
// Follow the emoji logging pattern used in other files
// Use ✅ for success, ❌ for errors
function myNewFunction() {
  console.log("✅ Operation successful");
}
```

### Copilot suggests outdated patterns

Refer to recent files in the same directory. Copilot learns from context:
```javascript
// See backend/transactions.js for the current pattern
// Use async/await, not callbacks
```

### Copilot suggests using frameworks we don't use

Remind it in comments:
```javascript
// This project uses vanilla JavaScript, no React or Vue
// Create using plain DOM manipulation
```

## 🤝 Best Practices

1. **Review all suggestions** - Copilot is helpful but not perfect
2. **Test thoroughly** - Especially for financial operations
3. **Keep functions small** - Easier for Copilot to understand and extend
4. **Use descriptive names** - Helps Copilot suggest better code
5. **Comment business logic** - Helps future contributors and Copilot

## 📖 Learn More

- [Full Copilot Instructions](.github/copilot-instructions.md) - Complete technical guidelines
- [README.md](../README.md) - Project overview and setup
- [SECURITY.md](../SECURITY.md) - Security policies
- [docs/onboarding.md](../docs/onboarding.md) - Contributor onboarding guide

## 💬 Getting Help

- **Copilot Chat**: Ask specific questions about the codebase
- **Issues**: Check existing issues or create a new one
- **Documentation**: Review docs/ directory for guides

---

**Remember**: Copilot is a powerful assistant, but you're the developer. Always review, test, and validate its suggestions, especially for security-critical banking operations.
