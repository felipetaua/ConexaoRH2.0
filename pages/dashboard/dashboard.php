<?php
session_start();

if (!isset($_SESSION['user_id'])) {
    header("Location: ../login/login.html");
    exit();
}
?>
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <title>Dashboard - Conexão RH</title>
</head>
<body>
    <h1>Bem-vindo, <?php echo htmlspecialchars($_SESSION['user_nome']); ?>!</h1>
    <p>Esta é a sua área pessoal na plataforma Conexão RH.</p>
    <p>Seu tipo de conta é: <strong><?php echo htmlspecialchars($_SESSION['user_tipo']); ?></strong>.</p>
    <a href="../../php/logout.php">Sair</a>
</body>
</html>