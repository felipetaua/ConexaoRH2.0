document.addEventListener('DOMContentLoaded', () => {
    const userTypeRadios = document.querySelectorAll('input[name="userType"]');
    const labelName = document.getElementById('label-name');
    const inputName = document.getElementById('name');
    const labelDoc = document.getElementById('label-doc');
    const inputDoc = document.getElementById('doc');
    const inputCelular = document.getElementById('celular');
    const inputPassword = document.getElementById('password');
    const strengthBar = document.getElementById('password-strength-bar');
    const rhForm = document.getElementById('rh-form');

    const updateUserType = () => {
        const selectedType = document.querySelector('input[name="userType"]:checked').value;
        if (selectedType === 'company') {
            labelName.textContent = 'Razão Social';
            inputName.placeholder = 'Digite a razão social';
            labelDoc.textContent = 'CNPJ';
            inputDoc.placeholder = '00.000.000/0000-00';
        } else {
            labelName.textContent = 'Nome Completo';
            inputName.placeholder = 'Digite seu nome completo';
            labelDoc.textContent = 'CPF';
            inputDoc.placeholder = '000.000.000-00';
        }
        inputDoc.value = '';
    };

    userTypeRadios.forEach(radio => radio.addEventListener('change', updateUserType));

    const handleDocInput = (e) => {
        let value = e.target.value.replace(/\D/g, '');
        const selectedType = document.querySelector('input[name="userType"]:checked').value;

        if (selectedType === 'company') {
            value = value.replace(/(\d{2})(\d)/, '$1.$2');
            value = value.replace(/(\d{3})(\d)/, '$1.$2');
            value = value.replace(/(\d{3})(\d)/, '$1/$2');
            value = value.replace(/(\d{4})(\d)/, '$1-$2');
            e.target.value = value.slice(0, 18);
        } else {
            value = value.replace(/(\d{3})(\d)/, '$1.$2');
            value = value.replace(/(\d{3})(\d)/, '$1.$2');
            value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
            e.target.value = value.slice(0, 14);
        }
    };
    inputDoc.addEventListener('input', handleDocInput);
    
    const handleCelularInput = (e) => {
        let value = e.target.value.replace(/\D/g, '');
        value = value.replace(/^(\d{2})(\d)/g, '($1) $2');
        value = value.replace(/(\d{5})(\d)/, '$1-$2');
        e.target.value = value.slice(0, 15);
    };
    inputCelular.addEventListener('input', handleCelularInput);

    const checkPasswordStrength = (password) => {
        let score = 0;
        if (password.length >= 8) score++;
        if (/[A-Z]/.test(password)) score++;
        if (/[a-z]/.test(password)) score++;
        if (/[0-9]/.test(password)) score++;
        if (/[^A-Za-z0-9]/.test(password)) score++;

        let color = '#E0E0E0';
        switch (score) {
            case 1:
            case 2:
                color = '#e74c3c'; 
                break;
            case 3:
                color = '#f1c40f'; 
                break;
            case 4:
            case 5:
                color = '#0052FF';
                break;
        }
        strengthBar.style.width = password.length > 0 ? `${score * 20}%` : '0%';
        strengthBar.style.backgroundColor = color;
    };
    inputPassword.addEventListener('input', (e) => checkPasswordStrength(e.target.value));

    rhForm.addEventListener('submit', (e) => {
        e.preventDefault(); 
        const password = inputPassword.value;
        if (password.length < 8) {
            alert('Sua senha deve ter pelo menos 8 caracteres.');
            return;
        }
        alert('Cadastro realizado com sucesso! (Isso é uma demonstração)');
    });

    updateUserType();
});