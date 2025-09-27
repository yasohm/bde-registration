# 🚀 BDE Registration System - Apache Server Setup

## 📋 Requirements
- **Apache Web Server** (XAMPP, WAMP, or LAMP)
- **PHP 7.4+** with PDO MySQL extension
- **MySQL 5.7+** or **MariaDB 10.3+**

## 🔧 Installation Steps

### 1. Install Apache + PHP + MySQL
Choose one of these options:

#### Option A: XAMPP (Recommended for Windows/Mac)
1. Download XAMPP from https://www.apachefriends.org/
2. Install XAMPP
3. Start Apache and MySQL from XAMPP Control Panel

#### Option B: WAMP (Windows)
1. Download WAMP from http://www.wampserver.com/
2. Install WAMP
3. Start WAMP services

#### Option C: LAMP (Linux)
```bash
# Ubuntu/Debian
sudo apt update
sudo apt install apache2 php php-mysql mysql-server

# CentOS/RHEL
sudo yum install httpd php php-mysql mariadb-server
```

### 2. Setup Database
1. Open phpMyAdmin (usually at http://localhost/phpmyadmin)
2. Create a new database called `bde_members`
3. The system will automatically create the table when you first access it

### 3. Configure Database Connection
Edit `config.php` if needed:
```php
define('DB_HOST', 'localhost');     // Your MySQL host
define('DB_NAME', 'bde_members');   // Database name
define('DB_USER', 'root');          // MySQL username
define('DB_PASS', '');              // MySQL password
```

### 4. Upload Files
1. Copy all files to your web server directory:
   - **XAMPP**: `C:\xampp\htdocs\bde-registration\`
   - **WAMP**: `C:\wamp64\www\bde-registration\`
   - **LAMP**: `/var/www/html/bde-registration/`

### 5. Set Permissions (Linux only)
```bash
sudo chown -R www-data:www-data /var/www/html/bde-registration/
sudo chmod -R 755 /var/www/html/bde-registration/
```

## 🌐 Access Your System

### Main Registration Page
- **URL**: `http://localhost/bde-registration/index.html`
- **Purpose**: For members to register

### Admin Panel
- **URL**: `http://localhost/bde-registration/admin.php`
- **Password**: `BDE2024` (change in config.php)

## 🔐 Security Configuration

### Change Admin Password
Edit `config.php`:
```php
define('ADMIN_PASSWORD', 'YOUR_NEW_PASSWORD');
```

### Database Security
1. Create a dedicated MySQL user:
```sql
CREATE USER 'bde_user'@'localhost' IDENTIFIED BY 'strong_password';
GRANT ALL PRIVILEGES ON bde_members.* TO 'bde_user'@'localhost';
FLUSH PRIVILEGES;
```

2. Update `config.php`:
```php
define('DB_USER', 'bde_user');
define('DB_PASS', 'strong_password');
```

## 📁 File Structure
```
bde-registration/
├── index.html          # Main registration page
├── script.js           # Frontend JavaScript
├── style.css           # Main page styling
├── admin.php           # Admin panel (PHP)
├── admin-style.css     # Admin panel styling
├── api.php             # Backend API
├── config.php          # Database configuration
└── SETUP.md            # This file
```

## 🚀 Production Deployment

### For Live Server
1. **Upload to your web hosting** (cPanel, VPS, etc.)
2. **Create MySQL database** through hosting control panel
3. **Update database credentials** in `config.php`
4. **Set proper file permissions**
5. **Enable HTTPS** for security

### Domain Setup
- **Registration**: `https://yourdomain.com/bde-registration/`
- **Admin**: `https://yourdomain.com/bde-registration/admin.php`

## 🔧 Troubleshooting

### Common Issues

#### 1. Database Connection Error
- Check MySQL is running
- Verify database credentials in `config.php`
- Ensure database exists

#### 2. Permission Denied
- Check file permissions (755 for directories, 644 for files)
- Ensure Apache can read the files

#### 3. PHP Errors
- Enable error reporting in PHP
- Check PHP error logs
- Ensure PDO MySQL extension is installed

#### 4. 404 Not Found
- Check Apache virtual host configuration
- Ensure mod_rewrite is enabled
- Verify file paths

### Debug Mode
Add this to `config.php` for debugging:
```php
error_reporting(E_ALL);
ini_set('display_errors', 1);
```

## 📊 Features

### ✅ What Works
- ✅ Member registration with validation
- ✅ Real-time form validation
- ✅ Admin panel with password protection
- ✅ Member management (view, delete)
- ✅ Statistics dashboard
- ✅ Excel export functionality
- ✅ Search and filter
- ✅ Responsive design
- ✅ MySQL database storage
- ✅ Session-based admin authentication

### 🎯 Benefits Over GitHub Pages
- ✅ **Real database** - data persists and is shared
- ✅ **Server-side validation** - more secure
- ✅ **Admin authentication** - proper security
- ✅ **Automatic data sync** - all registrations appear in admin panel
- ✅ **Better performance** - server-side processing
- ✅ **Scalable** - can handle many registrations

## 🎉 Ready to Use!

Your BDE registration system is now ready with a real database and Apache server. Members can register, and you'll see all registrations automatically in your admin panel!
