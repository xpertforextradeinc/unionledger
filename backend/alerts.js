/**
 * UnionLedger Alerts + Audit Logger
 * - Safe defaults (won't crash if Slack isn't configured)
 * - Uses SLACK_WEBHOOK_URL if present
 */

const axios = require('axios');

function nowISO() {
  return new Date().toISOString();
}

function safeStringify(obj) {
  try {
    return JSON.stringify(obj);
  } catch {
    return '[unstringifiable]';
  }
}

/**
 * Audit-friendly logger (stdout/stderr)
 * @param {string} event - short event key e.g. "tx.deposit"
 * @param {object} meta - structured metadata (no secrets)
 */
function logEvent(event, meta = {}) {
  const payload = {
    ts: nowISO(),
    brand: 'UnionLedger',
    event,
    meta,
  };

  // Keep logs machine-parseable for later SIEM ingestion
  console.log(safeStringify(payload));
}

/**
 * Slack alert (Incoming Webhook)
 * If SLACK_WEBHOOK_URL is missing, it logs a warning and returns gracefully.
 *
 * @param {object} params
 * @param {string} params.title
 * @param {string} [params.severity] - info|warning|error|critical
 * @param {string} [params.message]
 * @param {object} [params.context]
 */
async function sendSlackAlert({ title, severity = 'warning', message = '', context = {} }) {
  const url = process.env.SLACK_WEBHOOK_URL;

  const fallback = () => {
    console.warn(
      safeStringify({
        ts: nowISO(),
        brand: 'UnionLedger',
        event: 'slack.alert.skipped',
        meta: { reason: url ? 'send_failed' : 'SLACK_WEBHOOK_URL_not_set', title, severity, message, context },
      })
    );
  };

  if (!url) {
    fallback();
    return { ok: false, skipped: true, reason: 'SLACK_WEBHOOK_URL_not_set' };
  }

  const textLines = [
    `*🏦 UnionLedger Alert*`,
    `*${title}*`,
    `Severity: \`${severity}\``,
    message ? `Message: ${message}` : null,
    Object.keys(context || {}).length ? `Context: \`${safeStringify(context)}\`` : null,
    `Time: ${nowISO()}`,
  ].filter(Boolean);

  try {
    const res = await axios.post(
      url,
      { text: textLines.join('\n') },
      { timeout: 8000 }
    );

    logEvent('slack.alert.sent', { title, severity, status: res.status });
    return { ok: true };
  } catch (err) {
    logEvent('slack.alert.failed', {
      title,
      severity,
      error: err?.message || String(err),
    });
    fallback();
    return { ok: false, error: err?.message || String(err) };
  }
}

module.exports = {
  logEvent,
  sendSlackAlert,
};
