const axios = require('axios')

function sendSlackAlert(message) {
  const url = process.env.SLACK_WEBHOOK_URL
  if (!url) return
  axios.post(url, { text: `🚨 [UnionLedger] ALERT: ${message}` })
}

module.exports = { sendSlackAlert }
