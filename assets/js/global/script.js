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
    const vagasTrigger = document.querySelector('.menu-item-trigger');
    const submenu = vagasTrigger ? vagasTrigger.nextElementSibling : null;

    const currentPage = window.location.pathname.split('/').pop().toLowerCase().trim();

    // Abre automaticamente o submenu se estiver em uma das páginas de vagas
    if (
        submenu &&
        ['vagas.html', 'ativo.html', 'arquivadas.html'].includes(currentPage)
    ) {
        vagasTrigger.classList.add('open', 'active');
        submenu.classList.add('open');
    }

    if (vagasTrigger) {
        vagasTrigger.addEventListener('click', () => {
            submenu.classList.toggle('open');
            vagasTrigger.classList.toggle('open');
        });
    }
});

// --- Lógica para o Preview em Tempo Real ---
document.addEventListener('DOMContentLoaded', () => {
    // Mapeamento dos campos do formulário para os elementos do preview
    const fieldsToUpdate = {
        'jobTitle': 'previewTitle',
        'department': 'previewDepartment',
        'location': 'previewLocation',
        'workModel': 'previewWorkModel',
        'jobDescription': 'previewDescription',
    };

    // Adiciona um event listener para cada campo
    for (const inputId in fieldsToUpdate) {
        const inputElement = document.getElementById(inputId);
        const previewElementId = fieldsToUpdate[inputId];
        const previewElement = document.getElementById(previewElementId);
        
        if (inputElement && previewElement) {
            inputElement.addEventListener('input', () => {
                const placeholder = previewElement.dataset.placeholder || previewElement.textContent;
                previewElement.textContent = inputElement.value || placeholder;
            });
        }
    }
    
    const salaryInput = document.getElementById('salary');
    const salaryPreview = document.getElementById('previewSalary');
    const salaryHidden = document.getElementById('salaryHidden');

    function updateSalaryPreview() {
        if (salaryHidden && salaryHidden.checked) {
            salaryPreview.innerHTML = `<span style="color:#888">Salário oculto</span>`;
        } else if (salaryInput && salaryInput.value) {
            const value = parseFloat(salaryInput.value) || 0;
            const formattedSalary = value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
            salaryPreview.innerHTML = `${formattedSalary} <span>/mês</span>`;
        } else {
            salaryPreview.innerHTML = salaryPreview.dataset.placeholder || '';
        }
    }

    if (salaryInput && salaryPreview) {
        salaryInput.addEventListener('input', updateSalaryPreview);
    }
    if (salaryHidden && salaryPreview) {
        salaryHidden.addEventListener('change', updateSalaryPreview);
    }

    // Armazenar os textos placeholders iniciais
    document.querySelectorAll('[id^="preview"]').forEach(el => {
        el.dataset.placeholder = el.textContent;
    });
});

// --- Lógica para o Menu Móvel ---
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const sidebar = document.getElementById('sidebar');

mobileMenuBtn.addEventListener('click', () => {
    sidebar.classList.toggle('show');
});

// Fechar o menu se clicar fora dele (em modo mobile)
document.addEventListener('click', (event) => {
    const isClickInsideSidebar = sidebar.contains(event.target);
    const isClickOnMenuBtn = mobileMenuBtn.contains(event.target);
    if (!isClickInsideSidebar && !isClickOnMenuBtn && sidebar.classList.contains('show')) {
        sidebar.classList.remove('show');
    }
});

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


const notificationBtn = document.getElementById('notification-trigger');
const notificationPopup = document.getElementById('notification-popup');

// Adiciona um evento de 'click' ao botão
notificationBtn.addEventListener('click', function (event) {
    // Impede que o clique no botão feche o popup imediatamente
    event.stopPropagation(); 
    
    // Adiciona ou remove a classe 'active' do popup
    notificationPopup.classList.toggle('active');
});

// Adiciona um evento de 'click' a toda a janela para fechar o popup
window.addEventListener('click', function (event) {
    // Verifica se o popup está ativo e se o clique foi fora do popup
    if (notificationPopup.classList.contains('active') && !notificationPopup.contains(event.target)) {
        notificationPopup.classList.remove('active');
    }
});