# Public Assets Directory

This folder contains static assets served to clients by Express.

## What Goes Here:
- CSS files
- Client-side JavaScript files
- Images, fonts, icons
- Any files meant for public browser access

## What Should NOT Go Here:
- Server-side scripts (keep in `backend/`)
- Environment files (`.env`)
- Configuration files
- Sensitive credentials

## Security:
Only files in this directory are served via `express.static()` middleware, preventing accidental exposure of backend code or secrets.
