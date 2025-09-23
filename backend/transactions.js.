// 📦 backend/transactions.js
const { getBalance, updateBalance } = require('./storage/wallets');
const { logSuccess, logError, logTransfer } = require('./utils/logger');

async function processTransaction(fromWallet, toWallet, amount) {
  if (!fromWallet || !toWallet || amount <= 0) {
    logError('transfer', 'Missing wallet or invalid amount');
    return { status: 'error', message: 'Missing wallet or invalid amount' };
  }

  const fromBalance = getBalance(fromWallet);
  if (fromBalance < amount) {
    logError('transfer', 'Insufficient funds');
    return { status: 'error', message: 'Insufficient funds' };
  }

  updateBalance(fromWallet, -amount);
  const toBalance = updateBalance(toWallet, amount);

  logTransfer(fromWallet, toWallet, amount);
  logSuccess('transfer', `${fromWallet} → ${toWallet}`, amount);

  return {
    status: 'success',
    type: 'transfer',
    amount,
    fromBalance: fromBalance - amount,
    toBalance
  };
}

module.exports = { processTransaction };
