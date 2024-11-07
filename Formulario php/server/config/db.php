<?php

header('Content-Type: application/json');
$host = 'localhost'; 
$dbname = 'formulario'; 
$username = 'root'; 
$password = 'Micontrasenia123segura#'; 


try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

} catch (PDOException $e) {
    echo json_encode(['success' => false, 'message' => 'Error de conexión a la base de datos: ' . $e->getMessage()]);
    exit;
}

?>
