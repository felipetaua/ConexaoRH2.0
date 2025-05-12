const hamburger = document.querySelector('.hamburger');
const nav = document.querySelector('.nav-bar'); 

hamburger.addEventListener('click', () => {
    nav.classList.toggle('ativo');
});
