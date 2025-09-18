require('dotenv').config();
const Web3 = require('web3');

// ✅ Use your Alchemy RPC endpoint
const web3 = new Web3(`https://eth-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_KEY}`);

web3.eth.getBlockNumber()
  .then(block => {
    console.log(`✅ Latest block: ${block}`);
  })
  .catch(err => {
    console.error(`❌ Error: ${err.message}`);
  });
