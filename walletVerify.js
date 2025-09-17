const { getBalanceWithFallback } = require('./utils/rpcFallback');

async function verifyWallet(address) {
  const balance = await getBalanceWithFallback(address);
  return balance;
}

module.exports = { verifyWallet };
