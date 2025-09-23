// 💸 UnionLedger — Transaction Logic
module.exports = {
  deposit: async (wallet, amount) => {
    if (!wallet || amount <= 0) {
      console.warn("❌ Invalid deposit request");
      return { status: "error", message: "Invalid wallet or amount" };
    }
    console.log(`✅ Deposit of $${amount} to ${wallet}`);
    return { status: "success", type: "deposit", amount };
  },

  withdraw: async (wallet, amount) => {
    if (!wallet || amount <= 0) {
      console.warn("❌ Invalid withdrawal request");
      return { status: "error", message: "Invalid wallet or amount" };
    }
    console.log(`✅ Withdrawal of $${amount} from ${wallet}`);
    return { status: "success", type: "withdrawal", amount };
  },

  transfer: async (fromWallet, toWallet, amount) => {
    if (!fromWallet || !toWallet || amount <= 0) {
      console.warn("❌ Invalid transfer request");
      return { status: "error", message: "Missing wallet or invalid amount" };
    }
    console.log(`✅ Transfer of $${amount} from ${fromWallet} to ${toWallet}`);
    return { status: "success", type: "transfer", amount };
  }
};