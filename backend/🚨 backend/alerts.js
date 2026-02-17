// 🚨 UnionLedger — Fallback Logging & Slack Alerts
const axios = require('axios')

const sendSlackAlert = async (message) => {
  const webhookUrl = process.env.SLACK_WEBHOOK_URL
  if (!webhookUrl) {
    console.warn("⚠️ Slack webhook not configured - skipping alert")
    return { status: "skipped", message: "Webhook not configured" }
  }

  const payload = {
    text: `🚨 UnionLedger Alert:\n${message}`
  }

  try {
    await axios.post(webhookUrl, payload, {
      headers: { "Content-Type": "application/json" }
    })
    console.log("✅ Slack alert sent")
    return { status: "success" }
  } catch (err) {
    console.error("❌ Slack alert failed", err.message)
    return { status: "error", message: err.message }
  }
}

const logEvent = (type, details) => {
  const timestamp = new Date().toISOString();
  console.log(`🛡️ [${timestamp}] ${type}: ${details}`);
};

module.exports = { sendSlackAlert, logEvent };
