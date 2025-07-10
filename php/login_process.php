<?php
// Sempre inicie a sessão no topo do script
session_start();

require 'db_connection.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $identifier = trim($_POST['identifier']);
    $senha = trim($_POST['password']);

    if (empty($identifier) || empty($senha)) {
        // Redirecionar de volta com erro
        header("Location: ../pages/login/login.html?error=emptyfields");
        exit();
    }

    // Permite login com email ou documento (CPF/CNPJ)
    $sql = "SELECT * FROM usuarios WHERE email = :identifier OR doc = :identifier";
    $stmt = $pdo->prepare($sql);
    $stmt->execute(['identifier' => $identifier]);
    
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    // Verifica se o usuário existe e se a senha está correta
    if ($user && password_verify($senha, $user['senha'])) {
        // Senha correta, login bem-sucedido
        // Armazenar dados na sessão
        $_SESSION['user_id'] = $user['id'];
        $_SESSION['user_nome'] = $user['nome'];
        $_SESSION['user_tipo'] = $user['tipo_conta'];

        // Redirecionar para uma página de dashboard/perfil
        header("Location: ../pages/dashboard/dashboard.php");
        exit();
    } else {
        // Credenciais inválidas
        header("Location: ../pages/login/login.html?error=invalidcredentials");
        exit();
    }
}
?>