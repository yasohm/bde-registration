# 🚀 Quick Setup Guide - BDE Registration System

## 📥 **Step 1: Download XAMPP**
1. Go to: https://www.apachefriends.org/
2. Click **Download** (choose your operating system)
3. Run the installer
4. Install with default settings

## ⚡ **Step 2: Start XAMPP**
1. Open **XAMPP Control Panel**
2. Click **Start** next to **Apache**
3. Click **Start** next to **MySQL**
4. Both should show green "Running" status

## 📁 **Step 3: Upload Files**
1. Open File Explorer
2. Navigate to: `C:\xampp\htdocs\`
3. Create new folder: `bde-registration`
4. Copy ALL your files into this folder:
   - index.html
   - script.js
   - style.css
   - admin.php
   - admin-style.css
   - api.php
   - config.php

## 🌐 **Step 4: Access Your System**
Open your web browser and go to:

### **Main Registration Page:**
```
http://localhost/bde-registration/index.html
```

### **Admin Panel:**
```
http://localhost/bde-registration/admin.php
```
**Password:** `BDE2024`

## ✅ **Step 5: Test It**
1. Go to registration page
2. Fill out the form and register
3. Go to admin panel
4. You should see the registration!

## 🔧 **If Something Goes Wrong:**

### **Apache won't start:**
- Check if port 80 is being used by another program
- Try changing port in XAMPP settings

### **MySQL won't start:**
- Check if port 3306 is being used
- Try restarting your computer

### **Can't access the page:**
- Make sure Apache is running
- Check the file path is correct
- Try: `http://127.0.0.1/bde-registration/index.html`

### **Database error:**
- The system creates the database automatically
- Make sure MySQL is running
- Check `config.php` settings

## 🌍 **To Make It Live Online:**

### **Option A: Free Hosting**
1. Go to https://infinityfree.net/
2. Sign up for free
3. Upload your files
4. Create MySQL database
5. Update `config.php` with new database details

### **Option B: Paid Hosting**
1. Choose hosting provider (Hostinger, Bluehost, etc.)
2. Upload files via File Manager
3. Create MySQL database
4. Update `config.php`
5. Your site will be live!

## 📱 **Mobile Access:**
Once running locally, others on your network can access:
```
http://YOUR_IP_ADDRESS/bde-registration/index.html
```
Find your IP: Open Command Prompt, type `ipconfig`

## 🎉 **You're Done!**
Your BDE registration system is now running locally. Members can register, and you can manage them through the admin panel!
