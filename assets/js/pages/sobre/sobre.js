const slider = document.getElementById('slider');
const slides = document.querySelectorAll('.slide');
const indicatorsContainer = document.getElementById('indicators');

let index = 0;

// Cria os indicadores dinamicamente
slides.forEach((_, i) => {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(i));
    indicatorsContainer.appendChild(dot);
});

const dots = document.querySelectorAll('.dot');

function goToSlide(i) {
    index = i;
    updateSlider();
}

function nextSlide() {
    index = (index + 1) % slides.length;
    updateSlider();
}

function updateSlider() {
    slider.style.transform = `translateX(-${index * 100}%)`;
    dots.forEach(dot => dot.classList.remove('active'));
    dots[index].classList.add('active');
}

setInterval(nextSlide, 3000); // Troca a cada 3 segundos