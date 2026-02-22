const fs = require('fs')
function logEvent(event) {
  const line = `${new Date().toISOString()} | ${event.emoji} | ${event.action} | ${event.details}\n`
  fs.appendFileSync('./audit.log', line)
  if (event.critical) {
    require('../backend/🚨 backend/alerting').sendSlackAlert(line)
  }
}
module.exports = { logEvent }
