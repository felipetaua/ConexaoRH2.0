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

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const identifier = document.getElementById('identifier').value.trim(); 
    
    if (!identifier) {
        alert('Por favor, preencha o campo de identificador (E-mail, CPF ou CNPJ).');
        return;
    }

    if (isValidEmail(identifier)) {
        alert(`Login bem-sucedido para o e-mail: ${identifier} (Isso é uma demonstração)`);
    } else if (isValidCPF(identifier)) {
        alert(`Login bem-sucedido para o CPF: ${identifier} (Isso é uma demonstração)`);
    } else if (isValidCNPJ(identifier)) {
        alert(`Login bem-sucedido para o CNPJ: ${identifier} (Isso é uma demonstração)`);
    } else {
        alert('O identificador inserido não é um E-mail, CPF ou CNPJ válido.');
    }
});