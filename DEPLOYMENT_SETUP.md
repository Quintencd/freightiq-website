# FreightIQ Website Deployment Setup

## Overview
This folder contains the marketing website for FreightIQ, deployed separately from the main SaaS application.

## File Structure
```
freightiq-website/
├── build/           # Static files for deployment
├── static/          # Static assets (CSS, JS, images)
├── index.html       # Main landing page
├── netlify.toml     # Netlify deployment config
└── package.json     # Project metadata
```

## Deployment Configuration

### Netlify Settings
- **Build command**: `echo 'Static site - no build needed'`
- **Publish directory**: `build`
- **Base directory**: (leave empty - deploy from root)

### Custom Domain
- **Primary domain**: `freightiq.online`
- **Redirects**: `www.freightiq.online` → `freightiq.online`

## Deployment Process

1. **Push to GitHub**: 
   ```bash
   cd ../freightiq-website
   git add .
   git commit -m "Update website"
   git push origin main
   ```

2. **Netlify Auto-Deploy**: 
   - Connected to GitHub repo
   - Auto-deploys on push to main branch
   - Deploys to `freightiq.online`

## Local Development

To test locally:
```bash
cd ../freightiq-website
python -m http.server 8000
# or
npx serve build
```

## Notes
- This is a static site (no build process needed)
- All assets are in the `build/` folder
- Main app is deployed separately from `/Site` folder
