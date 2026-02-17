// UnionLedger Server
const express = require('express');
const path = require('path');
const WebSocket = require('ws');
const http = require('http');

// Alerts + Wallet Ledger
const { sendSlackAlert, logEvent } = require('./backend/🚨 backend/alerts')
const { getBalance, updateBalance } = require('./backend/utils/wallets')

const app = express();
const server = http.createServer(app);

// Middleware
app.use(express.json());
app.use(express.static('.'));

// Serve static HTML files
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'src', 'index.html'));
});

app.get('/dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, '🧾 src', 'dashboard.html'));
});

app.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, '🧾 src', 'register.html'));
});

app.get('/transfer', (req, res) => {
  res.sendFile(path.join(__dirname, '🧾 src', 'transfer.html'));
});

app.get('/trading', (req, res) => {
  res.sendFile(path.join(__dirname, '🧾 src', 'trading.html'));
});

app.get('/audit', (req, res) => {
  res.sendFile(path.join(__dirname, '🧾 src', 'audit.html'));
});

// API Routes
const { verifyWallet, verifyKYC } = require('./backend/auth');
const { deposit, withdraw, transfer } = require('./backend/transactions');
const { 
  startBot, 
  stopBot, 
  getBotStatus, 
  getTradingHistory, 
  updateStrategy, 
  getBotInstance 
} = require('./backend/tradingBot');

// Auth endpoints
app.post('/api/auth/wallet', async (req, res) => {
  try {
    const result = await verifyWallet(req.body.address);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/auth/kyc', async (req, res) => {
  try {
    const result = await verifyKYC(req.body);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Transaction endpoints
app.post('/api/tx/deposit', async (req, res) => {
  try {
    const { wallet, amount } = req.body;
    const result = await deposit(wallet, amount);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/tx/withdraw', async (req, res) => {
  try {
    const { wallet, amount } = req.body;
    const result = await withdraw(wallet, amount);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/tx/transfer', async (req, res) => {
  try {
    const { fromWallet, toWallet, amount } = req.body;
    const result = await transfer(fromWallet, toWallet, amount);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Internal wallet balance lookup
app.get('/api/wallet/balance/:wallet', (req, res) => {
  const balance = getBalance(req.params.wallet);
  res.json({ wallet: req.params.wallet, balance });
});

// Paystack Webhook
app.post('/api/paystack/webhook', async (req, res) => {
  if (!verifyPaystackSignature(req)) {
    return res.status(401).json({ error: 'Invalid signature' });
  }

  const event = req.body;

  try {
    logEvent("Paystack Webhook", `Event received: ${event.event}`);
    sendSlackAlert(`Paystack event: ${event.event}`);

    if (event.event === "charge.success") {
      const email = event.data.customer.email;
      const amount = event.data.amount / 100;

      // Update internal wallet ledger
      updateBalance(email, amount);

      // Alerts
      sendSlackAlert(`💰 Deposit credited: ${email} +₦${amount}`);
      logEvent("Deposit", `${email} credited with ₦${amount}`);
    }

    res.status(200).json({ status: "ok" });
  } catch (err) {
    console.error('[Paystack] Webhook error:', err.message);
    res.status(500).json({ error: 'Webhook processing failed' });
  }
});

// Trading Bot endpoints
app.post('/api/trading/start', async (req, res) => {
  try {
    const result = await startBot();
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/trading/stop', async (req, res) => {
  try {
    const result = await stopBot();
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/trading/status', (req, res) => {
  try {
    const status = getBotStatus();
    res.json(status);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/trading/history', (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 50;
    const history = getTradingHistory(limit);
    res.json(history);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/trading/strategy/:strategyKey', async (req, res) => {
  try {
    const { strategyKey } = req.params;
    const result = updateStrategy(strategyKey, req.body);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 8080;

// WebSocket server for real-time trading updates
const wss = new WebSocket.Server({ server, path: '/trading-ws' });

wss.on('connection', (ws) => {
  console.log('🔌 Trading WebSocket client connected');
  
  // Send current bot status on connection
  const status = getBotStatus();
  ws.send(JSON.stringify({ type: 'status', data: status }));
  
  ws.on('close', () => {
    console.log('🔌 Trading WebSocket client disconnected');
  });
});

// Setup real-time event listeners for trading bot
const botInstance = getBotInstance();

botInstance.on('marketUpdate', (data) => {
  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify({ type: 'marketUpdate', data }));
    }
  });
});

botInstance.on('tradeExecuted', (data) => {
  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify({ type: 'tradeExecuted', data }));
    }
  });
});

botInstance.on('botStarted', (data) => {
  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify({ type: 'botStarted', data }));
    }
  });
});

botInstance.on('botStopped', (data) => {
  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify({ type: 'botStopped', data }));
    }
  });
});

server.listen(PORT, () => {
  console.log(`✅ UnionLedger server running on port ${PORT}`);
  console.log(`🌐 Access the application at: http://localhost:${PORT}`);
  console.log(`🤖 Trading WebSocket available at: ws://localhost:${PORT}/trading-ws`);
});
