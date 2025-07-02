function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

document.addEventListener('DOMContentLoaded', function() {
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

    function showTestimonial(idx) {
        card.innerHTML = `
            <p>${testimonials[idx].text}</p>
            <div class="testimonial-author">
                <span>${testimonials[idx].author}</span>
                <span class="stars">${testimonials[idx].stars}</span>
            </div>
        `;
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
        showTestimonial(current);
        animateProgressBar();
    }

    showTestimonial(current);
    animateProgressBar();
    setInterval(nextTestimonial, duration);

    const loginForm = document.getElementById('login-form');

    function setupPasswordToggle(wrapper) {
        const input = wrapper.querySelector('input');
        const toggle = wrapper.querySelector('.toggle-password');

        if (input && toggle) {
            toggle.addEventListener('click', function() {
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
