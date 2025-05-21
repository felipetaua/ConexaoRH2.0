const hamburger = document.querySelector('.hamburger');
const nav = document.querySelector('.nav-bar'); 

hamburger.addEventListener('click', () => {
    nav.classList.toggle('ativo');
});

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


