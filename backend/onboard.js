const { getBalanceWithFallback } = require('../utils/rpcFallback');

async function verifyWallet(address) {
  try {
    const balance = await getBalanceWithFallback(address);
    console.log(`✅ Wallet verified: ${address} → Balance: ${balance}`);
    return balance;
  } catch (err) {
    console.error(`❌ Wallet verification failed: ${address}`, err);
    return null;
  }
}
