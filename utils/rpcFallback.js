const Web3 = require('web3'); // Ensure web3 is installed and required

const rpcEndpoints = [
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
  for (const rpcEndpointUrl of rpcEndpoints) {
    try {
      const web3 = new Web3(rpcEndpointUrl);
      const walletBalance = await web3.eth.getBalance(address);
      if (walletBalance !== undefined && walletBalance !== null) {
        return walletBalance;
      }
    } catch (rpcConnectionError) {
      logError(`RPC failed: ${rpcEndpointUrl}`, rpcConnectionError);
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
