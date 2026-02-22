// Emoji-coded diagnostics for audit hygiene and contributor clarity

function logSuccess(action, wallet, amount) {
  console.log(`✅ ${action.toUpperCase()} | Wallet: ${wallet} | Amount: $${amount}`);
}

function logError(action, reason) {
  console.warn(`❌ ${action.toUpperCase()} FAILED | Reason: ${reason}`);
}

function logTransfer(fromWallet, toWallet, amount) {
  console.log(`🔁 TRANSFER | From: ${fromWallet} → To: ${toWallet} | Amount: $${amount}`);
}

function logInfo(message) {
  console.log(`ℹ️ ${message}`);
}

module.exports = {
  logSuccess,
  logError,
  logTransfer,
  logInfo
};
