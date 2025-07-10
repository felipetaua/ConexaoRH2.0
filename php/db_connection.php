<?php

$servername = "localhost";
$username = "root"; // Usuário padrão do XAMPP
$password = ""; // Senha padrão do XAMPP
$dbname = "conexaorh"; // Crie este banco de dados no seu phpMyAdmin

try {
    $pdo = new PDO("mysql:host=$servername;dbname=$dbname;charset=utf8", $username, $password);
    // Define o modo de erro do PDO para exceção
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $e) {
    // Em produção, não exiba detalhes do erro. Apenas logue.
    die("ERRO: Não foi possível conectar. " . $e->getMessage());
}
?>