function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form');

    function setupPasswordToggle(wrapper) {
        const input = wrapper.querySelector('input');
        const toggle = wrapper.querySelector('.toggle-password');

        if (input && toggle) {
            toggle.addEventListener('click', function() {
                const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
                input.setAttribute('type', type);
                this.textContent = type === 'password' ? '👁️' : '🙈';
            });
        }
    }

    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
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

        document.querySelectorAll('.password-wrapper').forEach(setupPasswordToggle);
    }
});
