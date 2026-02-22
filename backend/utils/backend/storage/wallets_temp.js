const fs = require('fs');
const path = require('path');

const WALLET_FILE = path.join(__dirname, 'wallets.json');

// 🧠 Read wallet balances from file
function readWallets() {
  if (!fs.existsSync(WALLET_FILE)) return {};
  return JSON.parse(fs.readFileSync(WALLET_FILE));
}

// 💾 Write updated balances to file
function writeWallets(data) {
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
