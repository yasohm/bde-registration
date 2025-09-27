<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
header('Access-Control-Allow-Headers: Content-Type');

require_once 'config.php';

$method = $_SERVER['REQUEST_METHOD'];
$action = $_GET['action'] ?? '';

try {
    $pdo = getDBConnection();
    
    switch($action) {
        case 'register':
            if ($method === 'POST') {
                registerMember($pdo);
            }
            break;
            
        case 'get_members':
            if ($method === 'GET') {
                getMembers($pdo);
            }
            break;
            
        case 'delete_member':
            if ($method === 'DELETE') {
                deleteMember($pdo);
            }
            break;
            
        case 'admin_login':
            if ($method === 'POST') {
                adminLogin();
            }
            break;
            
        case 'get_stats':
            if ($method === 'GET') {
                getStats($pdo);
            }
            break;
            
        case 'logout':
            if ($method === 'POST') {
                logout();
            }
            break;
            
        default:
            http_response_code(404);
            echo json_encode(['error' => 'Action not found']);
    }
    
} catch(Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}

function registerMember($pdo) {
    $input = json_decode(file_get_contents('php://input'), true);
    
    // Validate required fields
    $required = ['fullName', 'email', 'whatsapp', 'filiere', 'niveau', 'role'];
    foreach($required as $field) {
        if (empty($input[$field])) {
            http_response_code(400);
            echo json_encode(['error' => "Field $field is required"]);
            return;
        }
    }
    
    // Validate email format
    if (!filter_var($input['email'], FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid email format']);
        return;
    }
    
    // Check if email already exists
    $stmt = $pdo->prepare("SELECT id FROM members WHERE email = ?");
    $stmt->execute([$input['email']]);
    if ($stmt->fetch()) {
        http_response_code(409);
        echo json_encode(['error' => 'Email already registered']);
        return;
    }
    
    // Insert new member
    $stmt = $pdo->prepare("
        INSERT INTO members (full_name, email, whatsapp, filiere, niveau, role) 
        VALUES (?, ?, ?, ?, ?, ?)
    ");
    
    $stmt->execute([
        $input['fullName'],
        $input['email'],
        $input['whatsapp'],
        $input['filiere'],
        $input['niveau'],
        $input['role']
    ]);
    
    $memberId = $pdo->lastInsertId();
    
    echo json_encode([
        'success' => true,
        'message' => 'Member registered successfully',
        'memberId' => $memberId
    ]);
}

function getMembers($pdo) {
    $stmt = $pdo->query("
        SELECT id, full_name, email, whatsapp, filiere, niveau, role, 
               DATE_FORMAT(registration_date, '%M %d, %Y') as registration_date
        FROM members 
        ORDER BY registration_date DESC
    ");
    
    $members = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    echo json_encode([
        'success' => true,
        'members' => $members
    ]);
}

function deleteMember($pdo) {
    $memberId = $_GET['id'] ?? '';
    
    if (empty($memberId)) {
        http_response_code(400);
        echo json_encode(['error' => 'Member ID is required']);
        return;
    }
    
    $stmt = $pdo->prepare("DELETE FROM members WHERE id = ?");
    $stmt->execute([$memberId]);
    
    if ($stmt->rowCount() > 0) {
        echo json_encode(['success' => true, 'message' => 'Member deleted successfully']);
    } else {
        http_response_code(404);
        echo json_encode(['error' => 'Member not found']);
    }
}

function adminLogin() {
    $input = json_decode(file_get_contents('php://input'), true);
    $password = $input['password'] ?? '';
    
    if ($password === ADMIN_PASSWORD) {
        session_start();
        $_SESSION['admin_logged_in'] = true;
        
        echo json_encode(['success' => true, 'message' => 'Login successful']);
    } else {
        http_response_code(401);
        echo json_encode(['error' => 'Invalid password']);
    }
}

function getStats($pdo) {
    // Total members
    $stmt = $pdo->query("SELECT COUNT(*) as total FROM members");
    $total = $stmt->fetch()['total'];
    
    // By filiere
    $stmt = $pdo->query("
        SELECT filiere, COUNT(*) as count 
        FROM members 
        GROUP BY filiere
    ");
    $filiereStats = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    // By niveau
    $stmt = $pdo->query("
        SELECT niveau, COUNT(*) as count 
        FROM members 
        GROUP BY niveau
    ");
    $niveauStats = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    echo json_encode([
        'success' => true,
        'stats' => [
            'total' => $total,
            'filiere' => $filiereStats,
            'niveau' => $niveauStats
        ]
    ]);
}

function logout() {
    session_start();
    session_destroy();
    echo json_encode(['success' => true, 'message' => 'Logged out successfully']);
}
?>
