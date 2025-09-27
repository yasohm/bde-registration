<?php
// Database configuration
define('DB_HOST', 'localhost');
define('DB_NAME', 'bde_members');
define('DB_USER', 'root');
define('DB_PASS', '');

// Admin password
define('ADMIN_PASSWORD', 'BDE2024');

// Create database connection
function getDBConnection() {
    try {
        $pdo = new PDO("mysql:host=" . DB_HOST . ";dbname=" . DB_NAME, DB_USER, DB_PASS);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        return $pdo;
    } catch(PDOException $e) {
        die("Connection failed: " . $e->getMessage());
    }
}

// Initialize database and create table if not exists
function initializeDatabase() {
    try {
        // First connect without database name to create it
        $pdo = new PDO("mysql:host=" . DB_HOST, DB_USER, DB_PASS);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        
        // Create database if not exists
        $pdo->exec("CREATE DATABASE IF NOT EXISTS " . DB_NAME);
        $pdo->exec("USE " . DB_NAME);
        
        // Create members table
        $sql = "CREATE TABLE IF NOT EXISTS members (
            id INT AUTO_INCREMENT PRIMARY KEY,
            full_name VARCHAR(255) NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            whatsapp VARCHAR(20) NOT NULL,
            filiere ENUM('DAI', 'PME', 'ESA', 'EII') NOT NULL,
            niveau ENUM('1st Year', '2nd Year') NOT NULL,
            role VARCHAR(100) NOT NULL,
            registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )";
        
        $pdo->exec($sql);
        
        return true;
    } catch(PDOException $e) {
        die("Database initialization failed: " . $e->getMessage());
    }
}

// Call initialization
initializeDatabase();
?>
