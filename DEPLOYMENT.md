# Deployment Guide for UnionLedger

## Overview
This guide explains how to deploy the updated UnionLedger homepage with Amazon affiliate links to GitHub Pages or other hosting services.

## GitHub Pages Deployment (Recommended)

### Current Setup
The repository is already configured with GitHub Pages deployment via GitHub Actions (`.github/workflows/static.yml`).

### Deployment Process
1. **Merge the PR** - Once this PR is merged to the `main` branch, GitHub Actions will automatically deploy the site
2. **Verify Deployment** - Check the Actions tab to ensure the deployment succeeds
3. **Access the Site** - Your site will be live at: `https://xpertforextradeinc.github.io/unionledger/`

### Manual Deployment (if needed)
If you need to manually trigger deployment:
1. Go to the "Actions" tab in your GitHub repository
2. Select "Deploy static content to Pages"
3. Click "Run workflow"
4. Select the `main` branch and run

## Alternative Hosting Services

### Netlify Deployment
1. Sign up at [netlify.com](https://netlify.com)
2. Connect your GitHub repository
3. Configure build settings:
   - Build command: (leave empty)
   - Publish directory: `/`
4. Deploy

### Vercel Deployment
1. Sign up at [vercel.com](https://vercel.com)
2. Import your GitHub repository
3. Configure:
   - Framework Preset: Other
   - Root Directory: `.`
   - Build Command: (leave empty)
   - Output Directory: `.`
4. Deploy

### Traditional Web Hosting
1. Run the Node.js server:
   ```bash
   npm install
   node server.js
   ```
2. Server runs on port 8080
3. Use a reverse proxy (nginx/Apache) to serve on port 80/443

## Features Included in the Updated Homepage

### SEO Optimization
- ✅ Meta description for search engines
- ✅ Keywords meta tag
- ✅ Open Graph tags for social media sharing
- ✅ Twitter Card meta tags
- ✅ Semantic HTML structure

### Amazon Affiliate Links
- ✅ Three affiliate links with unique CTAs:
  - https://amzn.to/48Qlt6X (Financial Planning Resource)
  - https://amzn.to/4agyRns (Banking Technology Solution)
  - https://amzn.to/4aK0p4E (Professional Finance Tools)
- ✅ Proper `rel="noopener noreferrer nofollow"` attributes
- ✅ FTC-compliant affiliate disclosure in footer

### Responsive Design
- ✅ Mobile-first responsive layout
- ✅ Tested on desktop (1400px), tablet (768px), and mobile (375px)
- ✅ Adaptive navigation and grid layouts
- ✅ Touch-friendly button sizes

### Design Features
- ✅ Modern gradient background
- ✅ Card-based layout with hover effects
- ✅ Professional color scheme matching UnionLedger branding
- ✅ Accessible typography and contrast ratios

## Testing the Site Locally

Before deployment, you can test the site locally:

```bash
# Install dependencies
npm install

# Start the development server
npm run dev

# Open in browser
# Navigate to: http://localhost:8080
```

## Post-Deployment Checklist

- [ ] Verify all three affiliate links are clickable
- [ ] Test on multiple devices (desktop, tablet, mobile)
- [ ] Check SEO meta tags using browser inspector
- [ ] Verify affiliate disclosure is visible in footer
- [ ] Test navigation links to other pages
- [ ] Monitor affiliate link click-through rates

## Monitoring and Analytics

Consider adding analytics to track:
- Page views and bounce rates
- Affiliate link click-through rates
- User demographics and behavior
- Mobile vs desktop traffic

Recommended tools:
- Google Analytics
- Amazon Associates reporting
- Hotjar for user behavior tracking

## Support

For issues or questions:
- Check the [GitHub Issues](https://github.com/xpertforextradeinc/unionledger/issues)
- Review the [README.md](README.md)
- Contact the development team

---

**Last Updated:** December 2025  
**Version:** 1.0.0
