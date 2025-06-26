function isValidCPF(cpf) {
    cpf = cpf.replace(/[^\d]+/g, '');
    if (cpf.length !== 11 || !!cpf.match(/(\d)\1{10}/)) return false;
    let sum = 0;
    let remainder;
    for (let i = 1; i <= 9; i++) sum = sum + parseInt(cpf.substring(i - 1, i)) * (11 - i);
    remainder = (sum * 10) % 11;
    if ((remainder === 10) || (remainder === 11)) remainder = 0;
    if (remainder !== parseInt(cpf.substring(9, 10))) return false;
    sum = 0;
    for (let i = 1; i <= 10; i++) sum = sum + parseInt(cpf.substring(i - 1, i)) * (12 - i);
    remainder = (sum * 10) % 11;
    if ((remainder === 10) || (remainder === 11)) remainder = 0;
    if (remainder !== parseInt(cpf.substring(10, 11))) return false;
    return true;
}

function isValidCNPJ(cnpj) {
    cnpj = cnpj.replace(/[^\d]+/g, '');
    if (cnpj.length !== 14 || !!cnpj.match(/(\d)\1{13}/)) return false;
    let size = cnpj.length - 2;
    let numbers = cnpj.substring(0, size);
    let digits = cnpj.substring(size);
    let sum = 0;
    let pos = size - 7;
    for (let i = size; i >= 1; i--) {
        sum += parseInt(numbers.charAt(size - i)) * pos--;
        if (pos < 2) pos = 9;
    }
    let result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
    if (result !== parseInt(digits.charAt(0))) return false;
    size = size + 1;
    numbers = cnpj.substring(0, size);
    sum = 0;
    pos = size - 7;
    for (let i = size; i >= 1; i--) {
        sum += parseInt(numbers.charAt(size - i)) * pos--;
        if (pos < 2) pos = 9;
    }
    result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
    if (result !== parseInt(digits.charAt(1))) return false;
    return true;
}

document.addEventListener('DOMContentLoaded', () => {
    const userTypeRadios = document.querySelectorAll('input[name="userType"]');
    const labelName = document.getElementById('label-name');
    const inputName = document.getElementById('name');
    const labelDoc = document.getElementById('label-doc');
    const inputDoc = document.getElementById('doc');
    const docError = document.getElementById('doc-error');
    const inputCelular = document.getElementById('celular');
    const inputPassword = document.getElementById('password');
    const passwordError = document.getElementById('password-error');
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
        docError.textContent = ''; 
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
        docError.textContent = ''; 
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
                color = '#2da848';
                break;
        }
        strengthBar.style.width = password.length > 0 ? `${score * 20}%` : '0%';
        strengthBar.style.backgroundColor = color;
    };
    inputPassword.addEventListener('input', (e) => {
        checkPasswordStrength(e.target.value);
        passwordError.textContent = ''; 
    });

    const clearErrors = () => {
        docError.textContent = '';
        passwordError.textContent = '';
    };

    rhForm.addEventListener('submit', (e) => {
        e.preventDefault();
        clearErrors();

        const selectedType = document.querySelector('input[name="userType"]:checked').value;
        const docValue = inputDoc.value.replace(/[^\d]+/g, ''); 

        let isDocValid = false;
        if (selectedType === 'company') {
            isDocValid = isValidCNPJ(docValue);
            if (!isDocValid) {
                docError.textContent = 'Por favor, insira um CNPJ válido.';
            }
        } else {
            isDocValid = isValidCPF(docValue);
            if (!isDocValid) {
                docError.textContent = 'Por favor, insira um CPF válido.';
            }
        }

        const password = inputPassword.value;
        if (password.length < 8) {
            passwordError.textContent = 'Sua senha deve ter pelo menos 8 caracteres.';
        }

        if (isDocValid && password.length >= 8) {
            alert('Cadastro realizado com sucesso! (Isso é uma demonstração)');
        }
    });

    updateUserType();
});

document.addEventListener('DOMContentLoaded', function() {
    const backBtn = document.getElementById('backToHomeBtn');
    if (backBtn) {
        backBtn.addEventListener('click', function() {
            window.location.href = '../../index.html';
        });
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const alreadyBtn = document.getElementById('alreadyAccountBtn');
    if (alreadyBtn) {
        alreadyBtn.addEventListener('click', function() {
            window.location.href = '../../index.html';
        });
    }
});