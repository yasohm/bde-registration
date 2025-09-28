# 🏛️ BDE Member Registration System

A modern, user-friendly web application for BDE (Bureau des Étudiants) member registration with admin panel management.

## ✨ Features

### 👥 **Member Registration**
- Clean, intuitive registration form
- Real-time form validation
- Support for all required fields:
  - Full Name
  - Email
  - WhatsApp Number
  - Filière (DAI, PME, ESA, EII)
  - Niveau (1st Year, 2nd Year)
  - Role
- Duplicate email prevention
- Success notifications

### 👨‍💼 **Admin Panel**
- Password-protected admin access
- Member statistics dashboard
- View all registered members
- Search and filter functionality
- Remove members
- Export to Excel functionality
- Real-time data refresh

## 🚀 Quick Start

### For Development (Local Testing)
1. Install dependencies: `npm install`
2. Start development server: `npm run dev`
3. Open `http://localhost:3000` in your browser
4. Test registration and admin panel functionality

### For Production Deployment
1. Follow the `VERCEL_SETUP.md` guide
2. Set up Supabase database using `supabase-setup.sql`
3. Deploy to Vercel with environment variables
4. Your system will be live and ready for BDE members!

### For Members (Registration)
1. Visit your deployed registration page
2. Fill out the registration form
3. Click "Join Now"
4. Success! You're now a BDE member

### For Admins (Management)
1. Visit your deployed admin panel
2. Enter password: `BDE2024`
3. Access full admin panel with all management features

## 📁 File Structure

```
bde-registration-system/
├── index.html              # Main registration page
├── admin.html              # Admin panel page
├── api/
│   ├── register.js         # Registration API endpoint
│   ├── members.js          # Members management API
│   └── stats.js            # Statistics API endpoint
├── package.json            # Dependencies and scripts
├── vercel.json             # Vercel deployment configuration
├── dev-server.js           # Development server (local testing)
├── supabase-setup.sql      # Database setup script
├── env.example             # Environment variables template
├── README.md               # This file
├── VERCEL_SETUP.md         # Production deployment guide
└── QUICK_SETUP.md          # Local development guide
```

## 🌐 GitHub Pages Deployment

### Step 1: Create GitHub Repository
1. Go to [GitHub](https://github.com) and create a new repository
2. Name it `bde-registration` (or any name you prefer)
3. Make it public (required for free GitHub Pages)

### Step 2: Upload Files
1. Upload all files to your repository:
   - `index.html`
   - `script.js`
   - `style.css`
   - `admin.html`
   - `admin-script.js`
   - `admin-style.css`
   - `README.md`

### Step 3: Enable GitHub Pages
1. Go to your repository settings
2. Scroll down to "Pages" section
3. Under "Source", select "Deploy from a branch"
4. Choose "main" branch and "/ (root)" folder
5. Click "Save"

### Step 4: Access Your Site
- Your site will be available at: `https://yourusername.github.io/repository-name`
- Main registration: `https://yourusername.github.io/repository-name/index.html`
- Admin panel: `https://yourusername.github.io/repository-name/admin.html`

## 🔧 Configuration

### Change Admin Password
To change the admin password, edit `admin-script.js`:
```javascript
this.adminPassword = 'YOUR_NEW_PASSWORD'; // Line 6
```

### Customize Styling
- Main page: Edit `style.css`
- Admin panel: Edit `admin-style.css`

## 📱 Features

- **Responsive Design**: Works on desktop, tablet, and mobile
- **Local Storage**: Data persists between sessions
- **Excel Export**: Download member data as Excel files
- **Real-time Validation**: Instant form feedback
- **Modern UI**: Beautiful, professional design
- **Password Protection**: Secure admin access

## 🛡️ Security

- Admin panel is password-protected
- Session-based authentication
- No server required - runs entirely in browser
- Data stored locally in browser

## 📊 Data Management

- All member data is stored in browser's local storage
- Data persists between browser sessions
- Export functionality for backup
- Admin can remove members if needed

## 🔄 Updates

To update the system:
1. Make changes to your local files
2. Commit and push to GitHub
3. GitHub Pages will automatically update

## 📞 Support

This system is designed to be self-contained and easy to use. All functionality works offline and doesn't require any external servers or databases.

## 🎯 Usage Tips

1. **For Members**: Simply open the main page and register
2. **For Admins**: Use the admin panel to manage all registrations
3. **Data Backup**: Regularly export to Excel for backup
4. **Mobile Friendly**: Works great on phones and tablets

---

**Ready to deploy!** 🚀 Your BDE registration system is now ready for GitHub Pages hosting.
