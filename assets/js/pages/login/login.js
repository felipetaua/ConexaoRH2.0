function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const identifier = document.getElementById('identifier').value.trim();

    if (!identifier) {
        alert('Por favor, preencha o campo de e-mail.');
        return;
    }

    if (isValidEmail(identifier)) {
        alert(`Login bem-sucedido para o e-mail: ${identifier} (Isso é uma demonstração)`);
    } else {
        alert('O identificador inserido não é um e-mail válido.');
    }
});