const Web3 = require('web3'); // Ensure web3 is installed and required

const endpoints = [
  'https://.../ethereum-mainnet/rpc',
  'https://.../ethereum-sepolia/rpc',
  'https://.../ethereum-holesky/rpc'
];

/**
 * Attempts to get the balance of an Ethereum address using a fallback strategy across multiple endpoints.
 * @param {string} address - The Ethereum address to check.
 * @returns {Promise<string>} The balance in wei as a string.
 * @throws If all endpoints fail.
 */
async function getBalanceWithFallback(address) {
  for (const url of endpoints) {
    try {
      const web3 = new Web3(url);
      const balance = await web3.eth.getBalance(address);
      if (balance !== undefined && balance !== null) {
        return balance;
      }
    } catch (err) {
      logError(`RPC failed: ${url}`, err);
    }
  }
  throw new Error("All RPC endpoints failed.");
}

/**
 * Logs error messages for debugging.
 * Replace with your preferred logging mechanism if necessary.
 * @param {string} message
 * @param {Error} [error]
 */
function logError(message, error) {
  // Example: integrate with your repo's logger if available.
  console.error(message, error);
}

module.exports = {
  getBalanceWithFallback,
};
