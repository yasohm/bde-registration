# 🚀 Vercel + Supabase Setup Guide

## 🎯 **What This Gives You:**
- ✅ **Free hosting** on Vercel (like GitHub Pages but better)
- ✅ **Real database** with Supabase (PostgreSQL)
- ✅ **Automatic deployments** from GitHub
- ✅ **Same functionality** as PHP version
- ✅ **Professional grade** hosting

## 📋 **Step 1: Create Supabase Database**

### 1.1 Sign Up for Supabase
1. Go to https://supabase.com/
2. Click **"Start your project"**
3. Sign up with GitHub (recommended)
4. Create a new project

### 1.2 Create Database Table
1. In your Supabase dashboard, go to **"Table Editor"**
2. Click **"Create a new table"**
3. Name it: `members`
4. Add these columns:

| Column Name | Type | Default Value | Nullable |
|-------------|------|---------------|----------|
| id | int8 | auto-increment | No |
| full_name | text | - | No |
| email | text | - | No |
| whatsapp | text | - | No |
| filiere | text | - | No |
| niveau | text | - | No |
| role | text | - | No |
| created_at | timestamptz | now() | No |

5. Click **"Save"**

### 1.3 Get API Keys
1. Go to **"Settings"** → **"API"**
2. Copy these values:
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **anon public key** (starts with `eyJ...`)

## 📋 **Step 2: Setup Vercel**

### 2.1 Create Vercel Account
1. Go to https://vercel.com/
2. Click **"Sign Up"**
3. Sign up with GitHub (recommended)

### 2.2 Deploy from GitHub
1. In Vercel dashboard, click **"New Project"**
2. Import your GitHub repository
3. Vercel will automatically detect it's a Node.js project

### 2.3 Add Environment Variables
1. In your Vercel project settings, go to **"Environment Variables"**
2. Add these variables:

```
SUPABASE_URL = https://your-project.supabase.co
SUPABASE_ANON_KEY = your-anon-key-here
```

3. Click **"Save"**

### 2.4 Deploy
1. Click **"Deploy"**
2. Wait for deployment to complete
3. Your site will be live at: `https://your-project.vercel.app`

## 📋 **Step 3: Update Files**

### 3.1 Rename Admin File
Rename `admin-vercel.html` to `admin.html` (replace the old one)

### 3.2 Test Your System
1. **Registration**: `https://your-project.vercel.app/index.html`
2. **Admin Panel**: `https://your-project.vercel.app/admin.html`
3. **Password**: `BDE2024`

## 🔧 **Step 4: GitHub Integration**

### 4.1 Push to GitHub
```bash
git add .
git commit -m "Add Vercel + Supabase setup"
git push origin main
```

### 4.2 Automatic Deployments
- Every time you push to GitHub, Vercel automatically deploys
- No manual uploads needed!

## 🎯 **Benefits Over Traditional Hosting:**

### ✅ **Free Forever**
- Vercel: Free tier (perfect for BDE)
- Supabase: Free tier (500MB database)

### ✅ **Automatic Deployments**
- Push to GitHub → Auto deploy
- No manual uploads

### ✅ **Professional Grade**
- Global CDN
- Automatic HTTPS
- Serverless functions

### ✅ **Real Database**
- PostgreSQL database
- Real-time updates
- Professional queries

## 🔧 **Troubleshooting:**

### **Database Connection Error:**
- Check environment variables in Vercel
- Verify Supabase URL and key
- Make sure table exists

### **Deployment Fails:**
- Check `package.json` is correct
- Verify all files are in repository
- Check Vercel build logs

### **API Not Working:**
- Check function logs in Vercel dashboard
- Verify CORS settings
- Test API endpoints directly

## 📊 **File Structure:**
```
your-repo/
├── index.html              # Main registration page
├── admin.html              # Admin panel
├── script.js               # Frontend JavaScript
├── style.css               # Main page styling
├── admin-style.css         # Admin panel styling
├── api/
│   ├── register.js         # Registration API
│   ├── members.js          # Members API
│   └── stats.js            # Statistics API
├── package.json            # Dependencies
├── vercel.json             # Vercel configuration
└── VERCEL_SETUP.md         # This guide
```

## 🎉 **You're Done!**

Your BDE registration system is now:
- ✅ **Hosted for free** on Vercel
- ✅ **Connected to real database** (Supabase)
- ✅ **Automatically deployed** from GitHub
- ✅ **Professional grade** hosting

**Your URLs:**
- Registration: `https://your-project.vercel.app/index.html`
- Admin: `https://your-project.vercel.app/admin.html`

## 🚀 **Next Steps:**
1. Test everything works
2. Share the registration link with BDE members
3. Use admin panel to manage registrations
4. Enjoy automatic deployments from GitHub!
