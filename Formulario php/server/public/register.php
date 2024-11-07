<?php
header('Access-Control-Allow-Origin: http://localhost:3000'); 
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Content-Type: application/json');
require_once '../config/db.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    $username = $data['username'] ?? '';
    $email = $data['email'] ?? '';
    $password = $data['password'] ?? '';

    if (!empty($username) && !empty($email) && !empty($password)) {
        try {
            $stmt = $pdo->prepare("SELECT * FROM usuarios WHERE username = :username OR email = :email LIMIT 1");
            $stmt->execute([':username' => $username, ':email' => $email]);
            $existingUser = $stmt->fetch(PDO::FETCH_ASSOC);

            if ($existingUser) {
                echo json_encode(['success' => false, 'message' => 'El usuario o el email ya están registrados']);
            } else {
                $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
                $stmt = $pdo->prepare("INSERT INTO usuarios (username, email, password) VALUES (:username, :email, :password)");
                $stmt->execute([':username' => $username, ':email' => $email, ':password' => $hashedPassword]);
                echo json_encode(['success' => true, 'message' => 'Usuario registrado exitosamente']);
            }
        } catch (PDOException $e) {
            echo json_encode(['success' => false, 'message' => 'Error al registrar usuario: ' . $e->getMessage()]);
        }
    } else {
        echo json_encode(['success' => false, 'message' => 'Por favor, llena todos los campos']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Método de solicitud no permitido']);
}
?>
