const fs = require('fs');
const path = require('path');
const WALLET_FILE = path.join(__dirname, 'wallets.json');

// 🧠 In-memory cache — populated once on first access, kept in sync on writes
let cache = null;

// 🧠 Read wallet balances (from cache if available, otherwise from file)
function readWallets() {
  if (cache !== null) return cache;
  if (!fs.existsSync(WALLET_FILE)) {
    cache = {};
    return cache;
  }
  cache = JSON.parse(fs.readFileSync(WALLET_FILE));
  return cache;
}

// 💾 Write updated balances to file and keep cache in sync
function writeWallets(data) {
  cache = data;
  fs.writeFileSync(WALLET_FILE, JSON.stringify(data, null, 2));
}

// 💰 Get current balance for a wallet
function getBalance(wallet) {
  const wallets = readWallets();
  return wallets[wallet] || 0;
}

// 🔄 Update balance (positive or negative)
function updateBalance(wallet, amount) {
  const wallets = readWallets();
  wallets[wallet] = (wallets[wallet] || 0) + amount;
  writeWallets(wallets);
  return wallets[wallet];
}

module.exports = {
  getBalance,
  updateBalance
};
