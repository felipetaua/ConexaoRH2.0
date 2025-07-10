<?php
session_start();

// Verifica se o usuário veio da página de sucesso do cadastro
if (!isset($_SESSION['registration_success']) || !$_SESSION['registration_success']) {
    // Se não, redireciona para a primeira página de registro
    header("Location: ./register.html");
    exit();
}

// Pega o tipo de usuário da sessão para mostrar as ações corretas
$user_type = $_SESSION['user_type'] ?? 'candidate';

// Limpa as variáveis de sessão para não mostrar esta página novamente ao recarregar
unset($_SESSION['registration_success']);
unset($_SESSION['user_type']);
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" href="../../assets/images/global/RHconexao-logo.svg" type="image/png">
    <title>Cadastro Concluído! - Conexão RH</title>
    <link rel="stylesheet" href="../../assets/css/pages/register-3/step3.css">
    <script defer src="../../assets/js/pages/register-3/step3.js"></script>
</head>
<body>

    <div class="info-section">
        <div class="logo">CONEXÃO RH</div>
        <h1>Tudo pronto!</h1>
        <p>Seu cadastro foi concluído com sucesso. Bem-vindo(a) à plataforma que vai impulsionar sua carreira e sua empresa.</p>
    </div>

    <div class="form-section">
        <div class="form-content">
            <div class="stepper">
                <div class="step completed"></div>
                <div class="step completed"></div>
                <div class="step active"></div>
            </div>

            <h2>Cadastro concluído!</h2>
            <p class="subtitle">O que você gostaria de fazer agora?</p>

            <!-- Bloco de ações para Candidatos -->
            <div id="candidate-actions" style="<?php echo ($user_type === 'candidate') ? 'display: block;' : 'display: none;'; ?>">
                <div class="action-cards-container">
                    <a href="../vagas/vagas.html" class="action-card"> <!-- Link para a página de vagas -->
                        <div class="icon">🔍</div>
                        <h3>Procurar Vagas</h3>
                        <p>Encontre a oportunidade ideal para sua carreira em milhares de vagas.</p>
                    </a>
                    <a href="../dashboard/dashboard.php" class="action-card"> <!-- Link para o dashboard -->
                        <div class="icon">📝</div>
                        <h3>Editar meu Perfil</h3>
                        <p>Mantenha suas informações atualizadas para atrair os melhores recrutadores.</p>
                    </a>
                </div>
            </div>

            <!-- Bloco de ações para Empresas -->
            <div id="company-actions" style="<?php echo ($user_type === 'company') ? 'display: block;' : 'display: none;'; ?>">
                <div class="action-cards-container">
                    <a href="../vagas/publicar-vaga.html" class="action-card"> <!-- Link para publicar vaga -->
                        <div class="icon">📄</div>
                        <h3>Publicar uma Vaga</h3>
                        <p>Descreva sua vaga e encontre os talentos ideais para sua equipe.</p>
                    </a>
                    <a href="../candidatos/buscar.html" class="action-card"> <!-- Link para buscar candidatos -->
                        <div class="icon">👥</div>
                        <h3>Buscar Candidatos</h3>
                        <p>Navegue em nossa base de talentos e encontre o profissional perfeito.</p>
                    </a>
                </div>
            </div>

            <a href="../login/login.html" class="dashboard-button">Ir para o Login</a>
        </div>
    </div>
</body>
</html>