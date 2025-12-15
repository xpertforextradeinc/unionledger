# 🚀 Quick Start Guide: Auto-Posting Script

Get your Gemini-powered auto-posting system running in **5 minutes**.

---

## Prerequisites

- Python 3.8+ installed
- GitHub repository access
- At least one AI API key (Gemini or OpenAI)

---

## Step 1: Install Dependencies (30 seconds)

```bash
cd /path/to/unionledger
pip install -r requirements.txt
```

This installs:
- `requests` - HTTP API calls
- `feedparser` - RSS parsing
- `python-dotenv` - Environment variables

---

## Step 2: Configure API Keys (2 minutes)

### Option A: Local Development

```bash
# Copy example environment file
cp .env.example .env

# Edit .env and add your API keys
nano .env  # or use your preferred editor
```

Add at minimum:
```env
GEMINI_API_KEY=your_actual_gemini_key_here
RSS_FEED_URL=https://your-sports-feed.com/rss.xml
```

### Option B: GitHub Actions (Recommended for Production)

1. Go to **Settings → Secrets and variables → Actions**
2. Click **New repository secret**
3. Add these secrets:
   - `GEMINI_API_KEY` - Your Gemini API key
   - `OPENAI_API_KEY` - OpenAI key (optional fallback)
   - `RSS_FEED_URL` - Your RSS feed URL
   - `KOFI_API_KEY` - Ko-fi key (optional)

### Get API Keys

#### Gemini (Free - Recommended)
1. Visit https://ai.google.dev/
2. Sign in with Google
3. Click "Get API Key"
4. Create new API key
5. Copy and save securely

#### OpenAI (Fallback - Paid)
1. Visit https://platform.openai.com/
2. Create account
3. Go to API keys section
4. Create new secret key
5. Copy and save securely

---

## Step 3: Test Installation (1 minute)

```bash
python test_auto_post.py
```

Expected output:
```
✅ Python Version: PASS
✅ Dependencies: PASS
✅ Module Import: PASS
⚠️  Configuration: FAIL (if no API keys set)
✅ Class Instantiation: PASS
✅ XML Generation: PASS

Results: 5/6 tests passed
```

**Note**: Configuration test only passes if API keys are set.

---

## Step 4: Run First Auto-Post (1 minute)

```bash
python auto_post.py
```

This will:
1. Fetch RSS feed from configured URL
2. Parse posts and extract tiers
3. Generate AI summaries with Gemini
4. Create XML overlays for each tier
5. Log all actions to audit files

### Expected Output

```
╔═══════════════════════════════════════════════════════════╗
║  🏆 GLOBAL SPORTS WATCH - Auto-Posting Script           ║
║  Powered by Gemini Flash with OpenAI Fallback            ║
╚═══════════════════════════════════════════════════════════╝

📡 Fetching RSS feed from: https://example.com/feed.xml
✅ Parsed 10 posts from RSS feed

============================================================
📄 Processing post 1/10: Lakers vs Warriors Preview
👤 Contributor: John Smith | 🎖️ Tier: gold

🤖 Calling Gemini API for summary generation...
✅ Gemini generated summary: 🏀 Lakers face Warriors...
📋 Generated XML overlay for tier: gold
💾 Saved overlay to: overlay_gold_20231215_143022.xml
```

---

## Step 5: Enable Automation (1 minute)

The GitHub Actions workflow is already configured to run every 6 hours.

To enable it:

1. Ensure all secrets are configured (Step 2, Option B)
2. Push code to GitHub
3. Go to **Actions** tab
4. Find "🤖 Auto-Post Sports Content" workflow
5. Click "Enable workflow" if disabled
6. Click "Run workflow" to test manually

---

## Verify It's Working

### Check Audit Logs

```bash
# View console logs
cat auto_post_audit.log

# View structured logs
cat publishing_audit.json | python -m json.tool

# List generated overlays
ls -lh overlay_*.xml
```

### Check Generated Files

After first run, you should see:
- `auto_post_audit.log` - Console output
- `publishing_audit.json` - Structured action logs
- `overlay_*.xml` - XML templates for each post

---

## Troubleshooting

### "No API keys configured"

**Solution**: Add at least `GEMINI_API_KEY` to `.env` file or GitHub Secrets

### "RSS parsing error"

**Solution**: Verify `RSS_FEED_URL` is accessible:
```bash
curl -I https://your-feed-url.com/feed.xml
```

### "Gemini API error: 401"

**Solution**: Invalid API key. Get a new key from https://ai.google.dev/

### "Both Gemini and OpenAI failed"

**Solution**: 
1. Check API keys are valid
2. Verify internet connection
3. Check API rate limits

---

## Next Steps

### Week 1: Foundation
- [ ] Configure RSS feed URL
- [ ] Add multiple RSS sources
- [ ] Monitor audit logs daily
- [ ] Verify summaries are generating

### Week 2: Optimization
- [ ] A/B test Gemini vs OpenAI summaries
- [ ] Add 2-3 high-commission affiliate programs
- [ ] Track which posts drive clicks
- [ ] Optimize AI prompts for CTR

### Week 3: Scale
- [ ] Add Ko-fi tier system
- [ ] Implement email capture
- [ ] Add sponsored content tier
- [ ] Scale to 100+ posts/day

---

## Key Files Reference

| File | Purpose |
|------|---------|
| `auto_post.py` | Main script |
| `test_auto_post.py` | Test suite |
| `requirements.txt` | Python dependencies |
| `.env` | Local API keys (git-ignored) |
| `.env.example` | Template for environment variables |
| `config.py` | Configuration loader |
| `docs/AUTO_POST_GUIDE.md` | Full documentation |
| `docs/REVENUE_STRATEGY.md` | Monetization guide |
| `.github/workflows/auto-post.yml` | GitHub Actions automation |

---

## Common Commands

```bash
# Install dependencies
pip install -r requirements.txt

# Test installation
python test_auto_post.py

# Run auto-posting
python auto_post.py

# View logs
tail -f auto_post_audit.log

# Check structured logs
cat publishing_audit.json | python -m json.tool | less

# Clean up old files
rm overlay_*.xml auto_post_audit.log publishing_audit.json
```

---

## Getting Help

1. **Check logs**: `auto_post_audit.log` has detailed error messages
2. **Read docs**: `docs/AUTO_POST_GUIDE.md` has comprehensive info
3. **Test components**: `python test_auto_post.py` validates setup
4. **Review examples**: Run with sample data to verify behavior

---

## Success Checklist

- [x] Python 3.8+ installed
- [x] Dependencies installed (`pip install -r requirements.txt`)
- [x] API keys configured (Gemini and/or OpenAI)
- [x] RSS feed URL configured
- [x] Test suite passes (5/6 or 6/6 tests)
- [x] First run completed successfully
- [x] Audit logs generated
- [x] XML overlays created
- [x] GitHub Actions secrets configured (for automation)

---

## Revenue Timeline

### Day 1-7: Setup
- Install and configure
- First 100 posts processed
- Monitor audit logs

### Week 2-4: Optimization
- A/B test summaries
- Add affiliate links
- Track conversions

### Month 2-3: Scale
- 1000+ posts/month
- Multiple RSS feeds
- $500-2000/month revenue

---

**You're ready!** Start with `python auto_post.py` and watch the magic happen. 🚀
