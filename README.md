# unionledger
UnionLedger is a secure, scalable digital banking system designed for global users and contributors.
# 🏦 UnionLedger — Modular Online Banking Platform

UnionLedger is a secure, audit-friendly banking system designed for global contributors and client ecosystems. Built with modular architecture and emoji-coded diagnostics, it empowers users with branded workflows, transparent transactions, and fallback alerting.

---

## 🚀 Features

### Affiliate Marketing Platform
- 🏠 Enhanced homepage with hero section and product showcase
- 📖 About page explaining our mission and affiliate marketing approach
- 📧 Contact form for customer inquiries and support
- ⭐ Testimonials and success stories from satisfied members
- ❓ Comprehensive FAQ with 16+ common questions
- 💳 6 featured financial products with affiliate links
- 📱 Fully responsive design (mobile, tablet, desktop)

### Banking Features
- 💼 Account dashboard with balance + transaction history
- 💸 Transfer module with scheduling + fallback alerts
- 📥 Deposit & 📤 Withdrawal flows with audit logging
- 📝 Wallet + KYC onboarding with Slack alert triggers
- 🛡️ Audit dashboard for contributor activity + deployment hygiene
- 📘 Contributor onboarding guide with emoji-coded diagnostics

### 🤖 Auto-Posting & Content Automation
- **Gemini-Powered Auto-Posting**: AI-driven content summarization using Google Gemini Flash
- **OpenAI Fallback**: Automatic failover to OpenAI when Gemini is unavailable
- **RSS Feed Integration**: Parses contributor-submitted sports content automatically
- **Ko-fi Tier System**: Applies XML overlay templates based on contributor tier (Free, Bronze, Silver, Gold)
- **Audit Logging**: Tracks all publishing actions with monetization flags
- **Thumbnail Generation**: AI-powered thumbnail descriptions for social media
- **GitHub Actions Ready**: Automated scheduling via GitHub Secrets integration

---

## 🧩 Folder Structure

| Folder         | Purpose                                      |
|----------------|----------------------------------------------|
| `src/`         | Frontend modules (HTML, CSS, JS)             |
| `🧾 src/`      | Marketing pages (About, Contact, FAQ, etc.)  |
| `assets/`      | Stylesheets, scripts, and media files        |
| `backend/`     | API logic (auth, transactions, alerts)       |
| `components/`  | Reusable UI blocks (navbar, footer)          |
| `docs/`        | Contributor guides and audit documentation   |
| `config/`      | Deployment configs and environment settings  |

---

## 🔐 Audit Hygiene

- ✅ Signed commits
- ✅ Binary Authorization enabled
- ✅ Slack alerts for failed KYC, transfers, and unauthorized actions
- ✅ Fallback logger for contributor visibility

---

## 📣 Getting Started

```bash
git clone https://github.com/xpertforextradeinc/unionledger.git
cd unionledger
npm install
npm run dev
```

The server will start on http://localhost:8080

### Available Pages
- `/` - Homepage with product showcase
- `/about` - About us and mission
- `/contact` - Contact form
- `/testimonials` - Customer success stories
- `/faq` - Frequently asked questions
- `/dashboard` - Account dashboard
- `/register` - New user registration
- `/transfer` - Money transfers
- `/trading` - Trading platform
- `/audit` - Audit logs

### Testing

Run the automated link test:
```bash
npm run test:links
```

### 🤖 Auto-Posting Setup (Python)

For the AI-powered auto-posting script:

```bash
# Install Python dependencies
pip install -r requirements.txt

# Configure API keys
cp .env.example .env
# Edit .env and add your GEMINI_API_KEY and/or OPENAI_API_KEY

# Test installation
python test_auto_post.py

# Run auto-posting
python auto_post.py
```

**Full Documentation:** [`docs/AUTO_POST_GUIDE.md`](docs/AUTO_POST_GUIDE.md)

### Deployment

See [`docs/GITHUB_PAGES_DEPLOYMENT.md`](docs/GITHUB_PAGES_DEPLOYMENT.md) for deployment instructions.

---

## 📚 Documentation

- **Implementation Guide:** [`docs/IMPLEMENTATION_SUMMARY.md`](docs/IMPLEMENTATION_SUMMARY.md)
- **Deployment Guide:** [`docs/GITHUB_PAGES_DEPLOYMENT.md`](docs/GITHUB_PAGES_DEPLOYMENT.md)
- **Security Summary:** [`docs/SECURITY_SUMMARY.md`](docs/SECURITY_SUMMARY.md)
- **Auto-Post Guide:** [`docs/AUTO_POST_GUIDE.md`](docs/AUTO_POST_GUIDE.md) - Gemini-powered content automation
