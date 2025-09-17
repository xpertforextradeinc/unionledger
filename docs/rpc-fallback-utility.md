# Ethereum RPC Fallback Utility

## Overview
The `utils/rpcFallback.js` module provides robust fallback logic for Ethereum RPC endpoints. It automatically rotates through multiple endpoints when one fails, ensuring high availability for balance queries.

## Features
- **Multi-endpoint Support**: Automatically tries 5 different RPC endpoints
- **Proper Error Logging**: Logs each failure with timestamps
- **Address Validation**: Uses Web3.js native address validation
- **Comprehensive Error Handling**: Provides detailed error messages when all endpoints fail
- **Easy Integration**: Drop-in replacement for single-endpoint Web3 calls

## Usage

### Basic Usage
```javascript
const { getBalanceWithFallback, logError } = require('./utils/rpcFallback');

// Get balance with automatic fallback
async function checkBalance(address) {
  try {
    const balance = await getBalanceWithFallback(address);
    console.log(`Balance: ${balance} Wei`);
    return balance;
  } catch (error) {
    console.error('All RPC endpoints failed:', error.message);
  }
}

// Use the logging helper directly
logError('https://my-rpc-endpoint.com', new Error('Connection timeout'));
```

### Integration with Existing Code
The `walletVerify.js` file has been updated to use the fallback utility:

```javascript
const { getBalanceWithFallback } = require('./utils/rpcFallback');

async function verifyWallet(address) {
  const balance = await getBalanceWithFallback(address);
  return balance;
}
```

## RPC Endpoints
The utility currently includes these endpoints (can be customized):
1. `https://blockchain.googleapis.com/v1/projects/xpert-forex-trade/.../ethereum-mainnet/rpc`
2. `https://eth-mainnet.alchemyapi.io/v2/demo`
3. `https://mainnet.infura.io/v3/demo`
4. `https://ethereum.publicnode.com`
5. `https://rpc.ankr.com/eth`

## Error Handling
- **Invalid Address**: Throws immediate error for malformed addresses
- **Network Failures**: Logs each failure and tries next endpoint
- **All Endpoints Failed**: Throws comprehensive error with details from all attempts

## Logging Format
Error logs follow the project's emoji-coded format:
```
🚨 [2025-09-17T23:20:01.558Z] RPC Endpoint Failed: https://example.com - Connection timeout
```

## Dependencies
- `web3`: ^4.16.0 (automatically installed)

## Testing
The utility has been thoroughly tested with:
- Invalid address formats
- Valid addresses with network failures
- Integration with existing wallet verification
- Error logging functionality

All tests pass and demonstrate the fallback logic working correctly.