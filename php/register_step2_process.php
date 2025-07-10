<?php
session_start();
require 'db_connection.php';

// Verificar se os dados do passo 1 estão na sessão
if (!isset($_SESSION['registration_data'])) {
    header("Location: ../pages/register/register.html");
    exit();
}

// Verificação do método da requisição
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    header("Location: ../pages/register/register-step-2.html");
    exit();
}

// Recuperar dados da sessão
$reg_data = $_SESSION['registration_data'];

// Iniciar transação para garantir a integridade dos dados
$pdo->beginTransaction();

try {
    // 1. Inserir na tabela 'usuarios'
    $sql_user = "INSERT INTO usuarios (nome, email, doc, celular, endereco, senha, tipo_conta) VALUES (?, ?, ?, ?, ?, ?, ?)";
    $stmt_user = $pdo->prepare($sql_user);
    $stmt_user->execute([
        $reg_data['nome'], $reg_data['email'], $reg_data['doc'], $reg_data['celular'],
        $reg_data['endereco'], $reg_data['senha_hash'], $reg_data['tipo_conta']
    ]);
    $usuario_id = $pdo->lastInsertId();

    // 2. Inserir na tabela de perfil correspondente
    if ($reg_data['tipo_conta'] === 'candidate') {
        // Lógica para candidato
        $area = trim($_POST['area']);
        $experience = trim($_POST['experience']);
        $linkedin = trim($_POST['linkedin']);
        $cv_path = null;

        // Tratamento do upload do currículo
        if (isset($_FILES['cv']) && $_FILES['cv']['error'] == 0) {
            $target_dir = "../../uploads/cvs/";
            if (!is_dir($target_dir)) { mkdir($target_dir, 0755, true); }
            
            $file_extension = strtolower(pathinfo($_FILES["cv"]["name"], PATHINFO_EXTENSION));
            $safe_filename = "cv_" . $usuario_id . "_" . time() . "." . $file_extension;
            $target_file = $target_dir . $safe_filename;

            $allowed_types = ['pdf', 'doc', 'docx'];
            if (in_array($file_extension, $allowed_types) && move_uploaded_file($_FILES["cv"]["tmp_name"], $target_file)) {
                $cv_path = "uploads/cvs/" . $safe_filename;
            }
        }

        $sql_profile = "INSERT INTO perfis_candidatos (usuario_id, area_interesse, nivel_experiencia, linkedin_url, cv_path) VALUES (?, ?, ?, ?, ?)";
        $stmt_profile = $pdo->prepare($sql_profile);
        $stmt_profile->execute([$usuario_id, $area, $experience, $linkedin, $cv_path]);

    } elseif ($reg_data['tipo_conta'] === 'company') {
        // Lógica para empresa
        $website = trim($_POST['website']);
        $sector = trim($_POST['sector']);
        $employees = trim($_POST['employees']);
        $about = trim($_POST['about']);

        $sql_profile = "INSERT INTO perfis_empresas (usuario_id, site_empresa, setor_atuacao, num_funcionarios, sobre_empresa) VALUES (?, ?, ?, ?, ?)";
        $stmt_profile = $pdo->prepare($sql_profile);
        $stmt_profile->execute([$usuario_id, $website, $sector, $employees, $about]);
    }

    // 3. Finalizar a transação
    $pdo->commit();

    // 4. Limpar dados da sessão e preparar para a página de sucesso
    unset($_SESSION['registration_data']);
    $_SESSION['registration_success'] = true;
    $_SESSION['user_type'] = $reg_data['tipo_conta']; // Para a página de sucesso saber o que mostrar

    // 5. Redirecionar para a página de sucesso
    header("Location: ../pages/register/register-step-3.php");
    exit();

} catch (PDOException $e) {
    // Em caso de erro, reverter a transação
    $pdo->rollBack();
    // Em produção, logar o erro em vez de exibi-lo
    die("Erro ao finalizar o cadastro: " . $e->getMessage());
}
?>