// UnionLedger Server
const express = require('express');
const path = require('path');

const app = express();

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

app.get('/audit', (req, res) => {
  res.sendFile(path.join(__dirname, '🧾 src', 'audit.html'));
});

// API Routes
const { verifyWallet, verifyKYC } = require('./backend/auth');
const { deposit, withdraw, transfer } = require('./backend/transactions');

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

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`✅ UnionLedger server running on port ${PORT}`);
  console.log(`🌐 Access the application at: http://localhost:${PORT}`);
});
