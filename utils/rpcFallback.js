// 🔄 UnionLedger — Ethereum RPC Fallback Utility
const { Web3 } = require('web3');

// Example RPC endpoints - can be replaced with actual URLs as needed
const RPC_ENDPOINTS = [
  'https://blockchain.googleapis.com/v1/projects/xpert-forex-trade/.../ethereum-mainnet/rpc',
  'https://eth-mainnet.alchemyapi.io/v2/demo',
  'https://mainnet.infura.io/v3/demo',
  'https://ethereum.publicnode.com',
  'https://rpc.ankr.com/eth'
];

/**
 * Log error helper function
 * @param {string} endpoint - The RPC endpoint that failed
 * @param {Error} error - The error that occurred
 */
function logError(endpoint, error) {
  const timestamp = new Date().toISOString();
  console.error(`🚨 [${timestamp}] RPC Endpoint Failed: ${endpoint} - ${error.message}`);
}

/**
 * Get balance with fallback logic across multiple RPC endpoints
 * @param {string} address - Ethereum address to get balance for
 * @returns {Promise<string>} Balance in Wei as string
 * @throws {Error} If all endpoints fail
 */
async function getBalanceWithFallback(address) {
  // Validate address format using Web3 utils
  if (!address || !Web3.utils.isAddress(address)) {
    throw new Error('Invalid Ethereum address format');
  }

  const errors = [];

  // Try each RPC endpoint in sequence
  for (let i = 0; i < RPC_ENDPOINTS.length; i++) {
    const endpoint = RPC_ENDPOINTS[i];
    
    try {
      console.log(`🔄 Attempting RPC endpoint ${i + 1}/${RPC_ENDPOINTS.length}: ${endpoint}`);
      
      const web3 = new Web3(endpoint);
      const balance = await web3.eth.getBalance(address);
      
      console.log(`✅ Successfully retrieved balance from endpoint: ${endpoint}`);
      return balance;
      
    } catch (error) {
      logError(endpoint, error);
      errors.push({
        endpoint,
        error: error.message
      });
      
      // Continue to next endpoint
      continue;
    }
  }

  // All endpoints failed
  const errorMessage = `All RPC endpoints failed. Tried ${RPC_ENDPOINTS.length} endpoints: ${errors.map(e => `${e.endpoint} (${e.error})`).join(', ')}`;
  console.error(`❌ ${errorMessage}`);
  throw new Error(errorMessage);
}

module.exports = {
  getBalanceWithFallback,
  logError
};