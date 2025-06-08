const nav = document.querySelector('.nav-bar'); 

const config = {
    duration: 1200,      // tempo da animação
    distance: '50px',    // distância do movimento
    easing: 'ease',
    origin: 'top',    // direção de onde o elemento vem
    opacity: 0,
    interval: 80,
    reset: false 
};


// animações do painel de funcionalidades
// ScrollReveal().reveal('.cardOne', config);
// ScrollReveal().reveal('.cardTwo', config);
// ScrollReveal().reveal('.cardThree', config);
// ScrollReveal().reveal('.cardFour', config);
// ScrollReveal().reveal('.cardFive', config);



// Animações do celulares
// ScrollReveal().reveal('.cellA1', config);
// ScrollReveal().reveal('.cellA2', config);
// ScrollReveal().reveal('.cellA3', config);
// ScrollReveal().reveal('.cellA4', config);
// ScrollReveal().reveal('.cellA5', config);

// Overlay para menu mobile
function criarMenuOverlay() {
    if (!document.querySelector('.menu-overlay')) {
        const overlay = document.createElement('div');
        overlay.className = 'menu-overlay';
        document.body.appendChild(overlay);
        overlay.addEventListener('click', fecharMenuMobile);
    }
}

function abrirMenuMobile() {
    document.querySelector('.nav-bar').classList.add('ativo');
    document.querySelector('.hamburger').classList.add('ativo');
    document.querySelector('.menu-overlay').classList.add('ativo');
    document.body.style.overflow = 'hidden';
}

function fecharMenuMobile() {
    document.querySelector('.nav-bar').classList.remove('ativo');
    document.querySelector('.hamburger').classList.remove('ativo');
    document.querySelector('.menu-overlay').classList.remove('ativo');
    document.body.style.overflow = '';
}

function toggleMenuMobile() {
    const navBar = document.querySelector('.nav-bar');
    if (navBar.classList.contains('ativo')) {
        fecharMenuMobile();
    } else {
        abrirMenuMobile();
    }
}

window.addEventListener('DOMContentLoaded', function() {
    criarMenuOverlay();
    const hamburger = document.querySelector('.hamburger');
    if (hamburger) {
        hamburger.addEventListener('click', toggleMenuMobile);
    }
    document.querySelectorAll('.nav-bar a').forEach(link => {
        link.addEventListener('click', fecharMenuMobile);
    });
});

window.addEventListener('scroll', function() {
    const btn = document.getElementById('backToTopBtn');
    if (window.scrollY > window.innerHeight / 2) {
        btn.style.display = 'flex';
    } else {
        btn.style.display = 'none';
    }
});

document.getElementById('backToTopBtn').addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});