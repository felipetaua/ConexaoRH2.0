document.addEventListener('DOMContentLoaded', function() {
    const cvInput = document.getElementById('cv');
    const fileUploadText = document.querySelector('.file-upload-text');
    const fileUploadButton = document.querySelector('.file-upload-button');

    if (cvInput && fileUploadText && fileUploadButton) {
        cvInput.addEventListener('change', function() {
            if (this.files && this.files.length > 0) {
                fileUploadText.textContent = this.files[0].name;
            } else {
                fileUploadText.textContent = 'Nenhum arquivo selecionado';
            }
        });

        fileUploadButton.addEventListener('click', function() {
            cvInput.click();
        });
    }

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
            let valid = true;

            if (userTypeSelector.value === 'candidate') {
                const area = document.getElementById('area');
                const experience = document.getElementById('experience');

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

            if (!valid) {
                e.preventDefault();
                alert('Por favor, preencha todos os campos obrigatórios antes de finalizar o cadastro.');
            }
        });
    }
});