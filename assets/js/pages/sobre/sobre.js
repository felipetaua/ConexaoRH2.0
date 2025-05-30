
const slider = document.getElementById('slider');
const slides = document.querySelectorAll('.slide');
let index = 0;

function nextSlide() {
index++;
if (index >= slides.length) {
    index = 0;
}
updateSlider();
}

function updateSlider() {
const width = slider.clientWidth;
slider.style.transform = `translateX(-${index * 100}%)`;
}

setInterval(nextSlide, 3000); // Troca a cada 3 segundos
