// --- Lógica para o Sistema de Abas ---
document.addEventListener('DOMContentLoaded', () => {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove a classe 'active' de todos os botões e painéis
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));

            // Adiciona a classe 'active' ao botão clicado e ao painel correspondente
            button.classList.add('active');
            const targetPane = document.querySelector(button.dataset.target);
            if (targetPane) {
                targetPane.classList.add('active');
            }
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    // Seleciona o elemento que aciona o submenu
    const vagasTrigger = document.getElementById('vagas-trigger');

    if (vagasTrigger) {
        vagasTrigger.addEventListener('click', () => {
            // Seleciona o submenu associado
            // O nextElementSibling pega o próximo elemento irmão, que é a nossa <ul>
            const submenu = vagasTrigger.nextElementSibling;

            // Alterna a classe 'open' no gatilho (para a seta) e no submenu (para expandir)
            vagasTrigger.classList.toggle('open');
            submenu.classList.toggle('open');
        });
    }
});