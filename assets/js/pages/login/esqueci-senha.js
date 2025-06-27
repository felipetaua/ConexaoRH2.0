document.addEventListener('DOMContentLoaded', function() {
    const resetPasswordForm = document.getElementById('reset-password-form');
    const newPassword = document.getElementById('new-password');
    const confirmPassword = document.getElementById('confirm-password');
    const passwordError = document.getElementById('password-error');

    function setupPasswordToggle(wrapper) {
        const input = wrapper.querySelector('input');
        const toggle = wrapper.querySelector('.toggle-password');

        if (input && toggle) {
            toggle.addEventListener('click', function() {
                // alterna o atributo type
                const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
                input.setAttribute('type', type);
                const icon = this.querySelector('i');
                if (type === 'password') {
                    icon.classList.remove('fa-eye-slash');
                    icon.classList.add('fa-eye');
                } else {
                    icon.classList.remove('fa-eye');
                    icon.classList.add('fa-eye-slash');
                }
            });
        }
    }

    if (resetPasswordForm) {
        resetPasswordForm.addEventListener('submit', function(e) {
            e.preventDefault();

            passwordError.style.display = 'none';

            if (newPassword.value !== confirmPassword.value) {
                passwordError.style.display = 'block';
                return;
            }

            if (newPassword.value.length < 8) {
                alert('A senha deve ter no mínimo 8 caracteres.');
                return;
            }

            alert('Senha redefinida com sucesso! Você será redirecionado para a página de login.');
            window.location.href = 'login.html';
        });

        document.querySelectorAll('.password-wrapper').forEach(setupPasswordToggle);
    }
});