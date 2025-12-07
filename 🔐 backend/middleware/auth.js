// Contributor validation middleware using API keys

module.exports = function (req, res, next) {
  const apiKey = req.headers['x-api-key'];
  const validKeys = [
    'xpert-forex-key',
    'unionledger-key',
    'slipmint-access',
    'paymint-auth'
  ]; // Add or rotate keys as needed

  if (!validKeys.includes(apiKey)) {
    console.warn(`❌ UNAUTHORIZED ACCESS | IP: ${req.ip}`);
    return res.status(403).json({
      status: 'error',
      message: 'Unauthorized: Invalid API key'
    });
  }

  console.log(`✅ AUTHORIZED | API Key: ${apiKey}`);
  next();
};
