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
    const vagasTrigger = document.querySelector('.menu-item-trigger');
    const submenu = vagasTrigger ? vagasTrigger.nextElementSibling : null;

    // Abre automaticamente o submenu se estiver em uma das páginas de vagas
    if (submenu && (
        window.location.pathname.includes('/vagas/vagas.html') ||
        window.location.pathname.includes('/vagas/ativo.html') ||
        window.location.pathname.includes('/vagas/arquivadas.html')
    )) {
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
    
    // Listener específico para o salário para formatar como moeda
    const salaryInput = document.getElementById('salary');
    const salaryPreview = document.getElementById('previewSalary');
    
    if (salaryInput && salaryPreview) {
        salaryInput.addEventListener('input', () => {
            const value = parseFloat(salaryInput.value) || 0;
            const formattedSalary = value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
            salaryPreview.innerHTML = `${formattedSalary} <span>/mês</span>`;
        });
    }

    // Armazenar os textos placeholders iniciais
    document.querySelectorAll('[id^="preview"]').forEach(el => {
        el.dataset.placeholder = el.textContent;
    });
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