// backend/routes/auth.js
const express = require('express');
const router = express.Router();
const { verifyWallet, verifyKYC } = require('../controllers/authController');

// POST /api/auth/wallet
router.post('/wallet', async (req, res) => {
  const { address } = req.body;
  try {
    const result = await verifyWallet(address);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/auth/kyc
router.post('/kyc', async (req, res) => {
  const kycData = req.body;
  try {
    const result = await verifyKYC(kycData);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
