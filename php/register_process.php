<?php
require 'db_connection.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nome = trim($_POST['nome']);
    $email = trim($_POST['email']);
    $senha = trim($_POST['senha']);
    $tipo_conta = $_POST['tipo_conta'];

    // Validação básica
    if (empty($nome) || empty($email) || empty($senha) || empty($tipo_conta)) {
        die("Por favor, preencha todos os campos.");
    }

    // Verificar se o e-mail já existe
    $sql = "SELECT id FROM usuarios WHERE email = ?";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$email]);
    if ($stmt->rowCount() > 0) {
        die("Este e-mail já está cadastrado. Tente outro.");
    }

    // Criptografar a senha com um hash seguro
    $senha_hash = password_hash($senha, PASSWORD_DEFAULT);

    // Inserir o novo usuário no banco de dados
    try {
        $sql = "INSERT INTO usuarios (nome, email, senha, tipo_conta) VALUES (?, ?, ?, ?)";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([$nome, $email, $senha_hash, $tipo_conta]);

        // Redirecionar para a página de login com uma mensagem de sucesso
        header("Location: ../pages/login/login.html?status=success");
        exit();
    } catch (PDOException $e) {
        die("Erro ao registrar o usuário: " . $e->getMessage());
    }
}
?>