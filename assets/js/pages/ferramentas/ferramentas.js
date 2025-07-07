const openBtn = document.querySelector('.open-modal-btn');
const modal = document.getElementById('modal');
const closeBtn = document.querySelector('.close-modal');

openBtn.addEventListener('click', () => {
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
});

closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
});

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

function openModal(id) {
    document.getElementById(id).style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeModal(id) {
    document.getElementById(id).style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Efeito de digitação no input da IA
const heroInput = document.querySelector('.hero-input');
const frases = [
    'Pergunte à nossa IA, vai te ajudar muito',
    'Como melhorar o clima organizacional?',
    'Dicas para engajar colaboradores?',
    'Como otimizar o recrutamento?',
    'Como criar um curriculo incrível?',
    'Sugestões para desenvolvimento de talentos?'
];
let fraseIndex = 0;
let charIndex = 0;
let typingInterval;

function digitarFrase() {
    if (!heroInput) return;
    heroInput.placeholder = '';
    charIndex = 0;
    typingInterval = setInterval(() => {
        heroInput.placeholder = frases[fraseIndex].slice(0, charIndex + 1);
        charIndex++;
        if (charIndex === frases[fraseIndex].length) {
            clearInterval(typingInterval);
            setTimeout(apagarFrase, 1800);
        }
    }, 55);
}

function apagarFrase() {
    typingInterval = setInterval(() => {
        heroInput.placeholder = frases[fraseIndex].slice(0, charIndex - 1);
        charIndex--;
        if (charIndex === 0) {
            clearInterval(typingInterval);
            fraseIndex = (fraseIndex + 1) % frases.length;
            setTimeout(digitarFrase, 600);
        }
    }, 30);
}

digitarFrase();

document.addEventListener('DOMContentLoaded', function() {
    const btn = document.querySelector('.hero-btn');
    if (btn) {
        btn.addEventListener('click', function() {
            window.location.href = 'https://chatgpt.com/g/g-6809798f94e48191b2c9216afd9c478e';
        });
    }
});

