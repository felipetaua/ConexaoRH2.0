document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    if (email) {
        alert(`Login bem-sucedido para o e-mail: ${email} (Isso é uma demonstração)`);
    } else {
        alert('Por favor, preencha o campo de e-mail.');
    }
});