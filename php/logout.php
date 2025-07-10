<?php
session_start();

// Remove todas as variáveis de sessão
session_unset();

// Destrói a sessão
session_destroy();

// Redireciona para a página inicial
header("Location: ../index.php"); // Note que mudei para index.php
exit();
?>