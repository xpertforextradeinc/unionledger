// backend/routes/tx.js
const express = require('express');
const router = express.Router();
const { deposit, withdraw } = require('../controllers/txController');

// POST /api/tx/deposit
router.post('/deposit', async (req, res) => {
  try {
    const result = await deposit(req.body);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/tx/withdraw
router.post('/withdraw', async (req, res) => {
  try {
    const result = await withdraw(req.body);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
