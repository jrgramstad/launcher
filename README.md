# AJ Real Estate Group - App Launcher

iPhone-style web app launcher for AJ Real Estate Group's ecosystem.

## 🚀 Deploy to Netlify

### Option 1: Deploy via Netlify UI (Recommended)

1. **Go to Netlify**: https://app.netlify.com
2. **Sign in** to your Netlify account
3. **Click "Add new site"** → "Import an existing project"
4. **Connect to Git provider**: Choose GitHub/GitLab/Bitbucket
5. **Select repository**: `jrgramstad/launcher`
6. **Configure build settings**:
   - Branch to deploy: `claude/iphone-app-launcher-homepage-011CUzj8vrFTGzYaxSkv3L3m`
   - Build command: (leave empty)
   - Publish directory: `.` or `/` (root directory)
7. **Click "Deploy site"**

Your site will be live in seconds with a URL like: `https://random-name-12345.netlify.app`

### Option 2: Deploy via Netlify CLI

```bash
# Install Netlify CLI (if not already installed)
npm install -g netlify-cli

# Login to Netlify
netlify login

# Deploy from this directory
cd /path/to/launcher
netlify deploy --prod
```

### Option 3: Drag & Drop Deploy

1. Go to https://app.netlify.com/drop
2. Drag the entire `launcher` folder into the drop zone
3. Done! Your site is live instantly

## 📝 Updating Apps

All app configuration is now managed in **`apps-config.json`** for easy updates!

### Add a New App

Edit `apps-config.json` and add to the `apps` array:

```json
{
    "name": "Your App Name",
    "icon": "🎯",
    "status": "planned",
    "url": "https://your-app-url.com",
    "color": "#FF6B6B",
    "description": "Brief description of your app"
}
```

### Update App URLs

Find the app in `apps-config.json` and change the `url` property:

```json
{
    "name": "Credit Card Transactions",
    "icon": "💳",
    "status": "deployed",
    "url": "https://credit-cards.ajrealestate.com",
    "color": "#34C759",
    "description": "Process and categorize credit card transactions"
}
```

### Change App Status

Update the `status` property in `apps-config.json`:
- `"deployed"` → Green dot (live and working)
- `"in-progress"` → Yellow dot (being built)
- `"planned"` → Blue dot (in backlog)

After making changes, commit and push:

```bash
git add apps-config.json
git commit -m "Update app configuration"
git push
```

Netlify will automatically redeploy!

## 🎨 Current Apps

- 💳 Credit Card Transactions (Deployed)
- 📋 Property Inspection (In Progress)
- 🏠 Master Property Data (Deployed)
- 📊 Profit & Loss (Deployed)
- 💰 Balance Sheet (Deployed)
- 🏢 Property Portal (Deployed)
- 📈 P&L Legacy (Deployed)
- 🏘️ Rent or Flip (Deployed)
- 🔨 Auction Prepwork (Deployed)
- 🎯 Project Tracker (Deployed)
- 📈 KPI Dashboard (Planned)
- ⏱️ Crew Timesheet (Planned)
- 🔧 Maintenance Requests (Planned)
- 📊 Vendor Performance (Planned)
- 🚪 Eviction Tracking (Planned)

## 🛠 Technical Stack

- Pure HTML/CSS/JavaScript (no frameworks)
- JSON-based configuration for easy app management
- Mobile-first responsive design
- iOS-inspired UI design
- Real-time search functionality
- Accessible (WCAG compliant)

## 📱 Features

✅ Responsive grid (3/4/5 columns for mobile/tablet/desktop)
✅ Status indicators for each app
✅ Real-time search filtering
✅ Smooth hover animations
✅ Touch-friendly (44px minimum touch targets)
✅ Dark mode support
✅ Keyboard shortcuts (Cmd/Ctrl+K for search, Esc to clear)
✅ **JSON-based configuration** for easy app management

## 📦 Files

- `index.html` - Main HTML structure
- `styles.css` - iPhone-inspired styling
- `app.js` - App functionality and logic
- `apps-config.json` - **App configuration (edit this to manage apps!)**
- `netlify.toml` - Netlify configuration
- `README.md` - This file

## 🔒 Security

The `netlify.toml` includes security headers:
- X-Frame-Options
- X-XSS-Protection
- X-Content-Type-Options
- Referrer-Policy

## 📞 Support

For questions or issues, contact the development team.
