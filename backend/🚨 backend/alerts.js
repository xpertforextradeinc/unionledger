// 🚨 UnionLedger — Fallback Logging & Slack Alerts
const sendSlackAlert = async (message) => {
  const webhookUrl = process.env.SLACK_WEBHOOK_URL;
  if (!webhookUrl) {
    console.warn("❌ Slack webhook not configured");
    return { status: "error", message: "Missing webhook" };
  }

  const payload = {
    text: `🚨 UnionLedger Alert:\n${message}`
  };

  try {
    const slackResponse = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    console.log("✅ Slack alert sent");
    return { status: "success" };
  } catch (err) {
    console.error("❌ Slack alert failed", err);
    return { status: "error", message: err.message };
  }
};

const logEvent = (eventType, eventDetails) => {
  const timestamp = new Date().toISOString();
  console.log(`🛡️ [${timestamp}] ${eventType}: ${eventDetails}`);
};

module.exports = { sendSlackAlert, logEvent };
