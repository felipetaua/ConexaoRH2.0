<?php
session_start();

// Se o usuário não estiver logado ou não for um candidato, redireciona para o login
if (!isset($_SESSION['user_id']) || $_SESSION['user_tipo'] !== 'candidate') {
    header("Location: ../../../pages/login/login.html");
    exit();
}
?>
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <title>Painel do Colaborador - Conexão RH</title>
</head>
<body>
    <h1>Painel do Colaborador</h1>
    <p>Bem-vindo, <?php echo htmlspecialchars($_SESSION['user_nome']); ?>!</p>
    <p>Aqui você pode gerenciar seu perfil, currículo e candidaturas.</p>
    <a href="../../../php/logout.php">Sair</a>
</body>
</html>