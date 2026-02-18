// Wallet balance management stub
const wallets = {}

const getBalance = (wallet) => {
  return wallets[wallet] || 0
}

const updateBalance = (wallet, amount) => {
  if (!wallets[wallet]) {
    wallets[wallet] = 0
  }
  wallets[wallet] += amount
  console.log(`💼 Wallet ${wallet} balance updated: ${wallets[wallet]}`)
  return wallets[wallet]
}

module.exports = { getBalance, updateBalance }
