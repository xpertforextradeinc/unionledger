// SlipMint audit log & Slack alert utility
const fs = require('fs');
const path = require('path');

// Store audit logs
function logEvent(event, description) {
  const logPath = path.join(__dirname, 'audit.log');
  const entry = `${new Date().toISOString()} | ${event} | ${description}\n`;
  fs.appendFile(logPath, entry, err => {
    if (err) console.error('[SlipMint] Logging error:', err);
  });
}

// Send fallback alert (Slack integration stub)
function sendSlackAlert(message) {
  // Implement Slack API call here (using Slack webhook URL from env)
  // For now, log to console as fallback.
  console.log(`[SlipMint][Slack] ${message}`);
}

module.exports = { sendSlackAlert, logEvent };
