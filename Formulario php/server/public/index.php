<?php
header('Access-Control-Allow-Origin: http://localhost:3000'); 
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

session_start();

require '../config/db.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    if (!$data) {
        echo json_encode(['success' => false, 'message' => 'Datos no válidos']);
        exit;
    }
    $emailOrUsername = $data['emailOrUsername'] ?? '';
    $password = $data['password'] ?? '';

    if (!empty($emailOrUsername) && !empty($password)) {
        try {
            $stmt = $pdo->prepare("SELECT * FROM usuarios WHERE (username = :emailOrUsername or email = :emailOrUsername) limit 1");
            $stmt->bindParam(':emailOrUsername', $emailOrUsername);
            $stmt->execute();
            $user = $stmt->fetch(PDO::FETCH_ASSOC);

            if ($user && password_verify($password, $user['password'])) {
                $_SESSION['user_id'] = $user['id'];  // Guardar el ID del usuario en la sesión

                echo json_encode(['success' => true, 'message' => 'Inicio de sesión exitoso']);
            } else {
                echo json_encode(['success' => false, 'message' => 'Credenciales incorrectos']);
            }
        } catch (PDOException $e) {
            echo json_encode(['success' => false, 'message' => 'Error al verificar el usuario: ' . $e->getMessage()]);
        }
    } else {
        echo json_encode(['success' => false, 'message' => 'Por favor, ingresa ambos campos']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Método de solicitud no permitido']);
}
?>
