document.addEventListener('DOMContentLoaded', () => {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));

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

document.addEventListener('DOMContentLoaded', () => {
    const fieldsToUpdate = {
        'jobTitle': 'previewTitle',
        'department': 'previewDepartment',
        'location': 'previewLocation',
        'workModel': 'previewWorkModel',
        'jobDescription': 'previewDescription',
    };

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

    document.querySelectorAll('[id^="preview"]').forEach(el => {
        el.dataset.placeholder = el.textContent;
    });
});

const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const sidebar = document.getElementById('sidebar');

mobileMenuBtn.addEventListener('click', () => {
    sidebar.classList.toggle('show');
});

document.addEventListener('click', (event) => {
    const isClickInsideSidebar = sidebar.contains(event.target);
    const isClickOnMenuBtn = mobileMenuBtn.contains(event.target);
    if (!isClickInsideSidebar && !isClickOnMenuBtn && sidebar.classList.contains('show')) {
        sidebar.classList.remove('show');
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));

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

notificationBtn.addEventListener('click', function (event) {
    event.stopPropagation(); 
    notificationPopup.classList.toggle('active');
});

window.addEventListener('click', function (event) {
    if (notificationPopup.classList.contains('active') && !notificationPopup.contains(event.target)) {
        notificationPopup.classList.remove('active');
    }
});