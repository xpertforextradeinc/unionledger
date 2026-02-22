# Security Policy (UnionLedger)

UnionLedger is a security-first banking + wallet platform. We take vulnerabilities seriously and aim to keep reports confidential until a fix is available.

## Supported Versions

We recommend running the latest commit on the default branch and keeping dependencies patched.
Security fixes are applied to the latest stable release line.

| Version/Branch | Supported |
| --- | --- |
| main (latest) | ✅ |
| older releases | ⚠️ best-effort |
| unmaintained forks | ❌ |

## Reporting a Vulnerability

### ✅ Where to report
- **Preferred:** GitHub **Private Vulnerability Reporting** (Security tab → “Report a vulnerability”)
- **Fallback email:** security@yourdomain.tld
- **Do not** open public issues for security bugs.

### ✅ What to include
- A clear description and impact
- Steps to reproduce / proof of concept (if safe)
- Affected file/module (e.g., `backend/transactions.js`, `services/payment.py`)
- Any logs/screenshots (remove secrets)

### Response targets (best-effort)
- Acknowledgement: **within 72 hours**
- Status update: **within 7 days**
- Fix or mitigation plan: **within 30 days** (severity dependent)

## Safe Harbor
If you follow this policy and act in good faith, we will not pursue legal action.

## Disclosure
We coordinate a fix before public disclosure. Critical issues may trigger rapid patch releases and secret rotation.

## Scope
In scope:
- Authentication / KYC flows
- Transaction processing, trading bot, webhook handlers
- Wallet/RPC fallback logic
- CI/CD and deployment configs

Out of scope:
- DoS via high traffic
- Issues requiring physical access
- Social engineering
