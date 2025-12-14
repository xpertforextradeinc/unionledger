# GitHub Pages Deployment Guide

This document provides instructions for deploying the UnionLedger affiliate marketing website to GitHub Pages.

## Prerequisites

- Repository must be hosted on GitHub
- GitHub Pages must be enabled in repository settings

## Deployment Steps

### Option 1: Deploy from Main Branch

1. Go to your repository on GitHub
2. Navigate to **Settings** → **Pages**
3. Under "Source", select the branch you want to deploy (e.g., `main` or `copilot/enhance-homepage-affiliate-products`)
4. Select the root folder (`/`) as the source directory
5. Click **Save**
6. GitHub will automatically build and deploy your site
7. Your site will be available at: `https://xpertforextradeinc.github.io/unionledger/`

### Option 2: Deploy with GitHub Actions

Create a `.github/workflows/deploy.yml` file with the following content:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./
```

## Important Notes

### Static vs Dynamic Content

GitHub Pages serves **static content only** (HTML, CSS, JavaScript). The Node.js backend (`server.js`) will **not run** on GitHub Pages.

For full functionality with backend features:
- Consider deploying the backend to a cloud service (Heroku, Vercel, AWS, Google Cloud)
- Use GitHub Pages only for the frontend static files
- Update API endpoints in your frontend code to point to your deployed backend

### File Structure for GitHub Pages

For GitHub Pages, the current structure works well:
- `src/index.html` is served as the homepage via server.js routing
- All other pages are in `🧾 src/` directory
- CSS and assets are in `assets/` directory

### Adjustments for Static-Only Hosting

If deploying without the Node.js backend, you may need to:

1. **Move index.html to root**: Copy `src/index.html` to the repository root
2. **Update paths**: Change CSS path from `../assets/styles/main.css` to `assets/styles/main.css`
3. **Update links**: Change route links from `/about` to `🧾 src/about.html`
4. **Remove server dependencies**: Backend features won't work without a server

### Testing Locally

Before deploying, test your changes locally:

```bash
# Install dependencies
npm install

# Start the development server
npm run dev

# Access the site at http://localhost:8080
```

### Custom Domain (Optional)

To use a custom domain:
1. Add a `CNAME` file to your repository root with your domain name
2. Configure DNS settings with your domain provider
3. Update GitHub Pages settings to use the custom domain

## Responsive Design

The website is fully responsive and optimized for:
- Mobile devices (320px - 768px)
- Tablets (769px - 1024px)
- Desktop (1025px+)

Test responsive behavior using browser developer tools before deployment.

## SEO Optimization

All pages include:
- Meta descriptions
- Proper heading hierarchy
- Semantic HTML
- Mobile-friendly viewport settings

## Browser Compatibility

The site is compatible with:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Support

For issues or questions:
- Check the FAQ page: `/faq`
- Contact support via the Contact page: `/contact`
- Review the main README.md for project information
