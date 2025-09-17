const Web3 = require('web3');
const web3 = new Web3('https://blockchain.googleapis.com/v1/projects/xpert-forex-trade/.../ethereum-mainnet/rpc');

async function verifyWallet(address) {
  const balance = await web3.eth.getBalance(address);
  return balance;
}
