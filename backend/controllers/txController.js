// backend/controllers/txController.js
const { deposit, withdraw, transfer } = require('../transactions');

module.exports = {
  deposit,
  withdraw,
  transfer
};
