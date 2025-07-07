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

    const testimonials = [
        {
            text: '"A melhor plataforma para gestão de talentos que já utilizei. Simples, rápida e com resultados incríveis."',
            author: 'Marcos Andrade, CEO',
            stars: '★★★★★'
        },
        {
            text: '"Encontrei minha vaga dos sonhos em poucos dias. Recomendo para todos os profissionais!"',
            author: 'Juliana Souza, Analista de RH',
            stars: '★★★★★'
        },
        {
            text: '"A interface é intuitiva e o suporte é excelente. Facilitou muito o nosso recrutamento."',
            author: 'Carlos Lima, Diretor de Pessoas',
            stars: '★★★★★'
        }
    ];

    const card = document.getElementById('testimonialCard');
    const progressBar = document.getElementById('testimonialProgressBar');
    let current = 0;
    const duration = 5000; 

    function showTestimonial(idx, animate = false) {
        if (animate) {
            card.classList.add('slide-right');
            setTimeout(() => {
                card.innerHTML = `
                    <p>${testimonials[idx].text}</p>
                    <div class="testimonial-author">
                        <span>${testimonials[idx].author}</span>
                        <span class="stars">${testimonials[idx].stars}</span>
                    </div>
                `;
                card.classList.remove('slide-right');
            }, 350);
        } else {
            card.innerHTML = `
                <p>${testimonials[idx].text}</p>
                <div class="testimonial-author">
                    <span>${testimonials[idx].author}</span>
                    <span class="stars">${testimonials[idx].stars}</span>
                </div>
            `;
        }
    }

    function animateProgressBar() {
        progressBar.style.transition = 'none';
        progressBar.style.width = '0%';
        setTimeout(() => {
            progressBar.style.transition = `width ${duration}ms linear`;
            progressBar.style.width = '100%';
        }, 20);
    }

    function nextTestimonial() {
        current = (current + 1) % testimonials.length;
        showTestimonial(current, true);
        animateProgressBar();
    }

    showTestimonial(current);
    animateProgressBar();
    setInterval(nextTestimonial, duration);
});