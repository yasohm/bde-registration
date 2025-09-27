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

### For Members (Registration)
1. Open `index.html` in your browser
2. Fill out the registration form
3. Click "Register Me"
4. Success! You're now a BDE member

### For Admins (Management)
1. Open `admin.html` in your browser
2. Enter password: `BDE2024`
3. Access full admin panel with all management features

## 📁 File Structure

```
page_register_membres/
├── index.html          # Main registration page
├── script.js           # Registration functionality
├── style.css           # Main page styling
├── admin.html          # Admin panel page
├── admin-script.js     # Admin functionality
├── admin-style.css     # Admin panel styling
└── README.md           # This file
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
