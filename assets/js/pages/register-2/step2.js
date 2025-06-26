document.addEventListener('DOMContentLoaded', function() {
    const userTypeSimulator = document.getElementById('userTypeSimulator');
    const candidateActions = document.getElementById('candidate-actions');
    const companyActions = document.getElementById('company-actions');

    const currentUserType = 'candidate'; 
    userTypeSimulator.value = currentUserType;

    function toggleActionCards() {
        if (userTypeSimulator.value === 'candidate') {
            candidateActions.style.display = 'block';
            companyActions.style.display = 'none';
        } else {
            candidateActions.style.display = 'none';
            companyActions.style.display = 'block';
        }
    }
    
    document.querySelectorAll('.action-card, .dashboard-button').forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            alert('Navegando para a área correspondente... (Isso é uma demonstração)');
        });
    });

    toggleActionCards();

    const backBtn = document.querySelector('.back-btn');
    if (backBtn) {
        backBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.location.href = 'register.html';
        });
    }

    const step2Form = document.getElementById('step2-form');
    const userTypeSelector = document.getElementById('userTypeSelector');
    const candidateFields = document.getElementById('candidate-fields');
    const companyFields = document.getElementById('company-fields');

    function toggleFields() {
        if (userTypeSelector.value === 'candidate') {
            candidateFields.style.display = 'block';
            companyFields.style.display = 'none';
        } else {
            candidateFields.style.display = 'none';
            companyFields.style.display = 'block';
        }
    }
    if (userTypeSelector) {
        userTypeSelector.addEventListener('change', toggleFields);
        toggleFields();
    }

    if (step2Form) {
        step2Form.addEventListener('submit', function(e) {
            e.preventDefault();

            let valid = true;

            if (userTypeSelector.value === 'candidate') {
                const cv = document.getElementById('cv');
                const area = document.getElementById('area');
                const experience = document.getElementById('experience');
                if (!cv.value) valid = false;
                if (!area.value.trim()) valid = false;
                if (!experience.value) valid = false;
            } else {
                const website = document.getElementById('website');
                const sector = document.getElementById('sector');
                const employees = document.getElementById('employees');
                const about = document.getElementById('about');
                if (!website.value.trim()) valid = false;
                if (!sector.value.trim()) valid = false;
                if (!employees.value) valid = false;
                if (!about.value.trim()) valid = false;
            }

            if (valid) {
                window.location.href = 'register-step-3.html';
            } else {
                alert('Por favor, preencha todos os campos obrigatórios antes de finalizar o cadastro.');
            }
        });
    }
});