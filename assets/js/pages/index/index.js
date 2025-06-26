new Swiper('.card-wrapper', {
    loop: true,
    spaceBetween: 30,

    pagination: {
        el: '.swiper-pagination',
        clickable: true,
        dynamicBullets: true
    },

    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },

    breakpoints: {
        0: {
            slidesPerView: 1
        },
        768: {
            slidesPerView: 2
        },
        1024: {
            slidesPerView: 3
        }
    }
});

document.addEventListener('DOMContentLoaded', function () {
    const modal = document.getElementById('modal');
    const openBtn = document.getElementById('openModalBtn');
    const closeBtn = document.getElementById('closeModalBtn');
    const options = document.querySelectorAll('.option');
    const nextButton = document.querySelector('.next-button');

    if (openBtn && modal) {
        openBtn.onclick = function (e) {
            e.preventDefault();
            modal.style.display = 'flex';
        };
    }

    if (closeBtn && modal) {
        closeBtn.onclick = function (e) {
            e.preventDefault();
            modal.style.display = 'none';
        };
    }

    modal.addEventListener('mousedown', function (e) {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    options.forEach(option => {
        option.addEventListener('click', () => {
            options.forEach(o => o.classList.remove('selected'));
            option.classList.add('selected');
            // Habilita o botão ao selecionar
            nextButton.disabled = false;
            nextButton.classList.add('active');
        });
    });

    if (nextButton) {
        nextButton.disabled = true;
        nextButton.classList.remove('active');
    }

    nextButton.addEventListener('click', () => {
        const selected = document.querySelector('.option.selected');
        if (selected) {
            const title = selected.querySelector('h3').innerText.toLowerCase();
            if (title.includes('colaborador')) {
                window.location.href = './pages/register/register.html';
            } else if (title.includes('empresa')) {
                window.location.href = './pages/register/register.html';
            } else {
                alert(`Você selecionou: ${selected.querySelector('h3').innerText}`);
            }
        } else {
            alert('Por favor, selecione um tipo de usuário.');
        }
    });

    document.querySelectorAll('.btnUser').forEach(btn => {
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            document.body.classList.add('fade-out');
            setTimeout(() => {
                window.location.href = 'pages/register/register.html';
            }, 500); 
        });
    });
});

const videoCards = document.querySelectorAll('.card-list .card-item .card-link');
const videoModal = document.getElementById('videoModal');
const videoModalPlayer = document.getElementById('videoModalPlayer');
const videoModalTitle = document.getElementById('videoModalTitle');
const videoModalBadges = document.getElementById('videoModalBadges');
const videoModalCreator = document.getElementById('videoModalCreator');
const videoModalYoutube = document.getElementById('videoModalYoutube');
const closeVideoModal = document.getElementById('closeVideoModal');

const videoDetails = [
    {
        youtube: 'https://www.youtube.com/watch?v=F-mvgoG0lLc',
        embed: 'https://www.youtube.com/embed/F-mvgoG0lLc?si=rTQ3DaPBmSdXyF3h',
        title: 'Crédito do Trabalhador E-consignado - Econet',
        badges: [
            { text: 'Benefícios e Créditos', class: 'badge-designer' }
        ],
        creator: 'Econet'
    },
    {
        youtube: 'https://www.youtube.com/watch?v=FxfaBy7Dj2s',
        embed: 'https://www.youtube.com/embed/FxfaBy7Dj2s?si=JG_DqeBZ8ggMXKrL',
        title: 'Hora Extra - Econet',
        badges: [
            { text: 'Rotinas Trabalhistas', class: 'badge-developer' }
        ],
        creator: 'Econet'
    },
    {
        youtube: 'https://www.youtube.com/watch?v=LwS_Ex3Z-EA',
        embed: 'https://www.youtube.com/embed/LwS_Ex3Z-EA?si=yaibWY6JH0rYOvtS',
        title: 'Calculo do 13º Salário - Econet',
        badges: [
            { text: 'Direitos do Trabalhador', class: 'badge-marketer' }
        ],
        creator: 'Econet'
    },
    {
        youtube: 'https://www.youtube.com/watch?v=rVGaWZb_yMY',
        embed: 'https://www.youtube.com/embed/rVGaWZb_yMY?si=u8AbySUEVqOWQ8UL',
        title: 'Prazos para Recontratação de Ex-Funcionário - Econet',
        badges: [
            { text: 'Recursos Humanos', class: 'badge-gamer' },
            { text: 'Departamento Pessoal', class: 'badge-editor' }
        ],
        creator: 'Econet'
    },
    {
        youtube: 'https://www.youtube.com/watch?v=GNfMBeLhldo',
        embed: 'https://www.youtube.com/embed/GNfMBeLhldo?si=ENuvmvSFA__kwRjG',
        title: 'Carnaval é Feriado? Direitos e deveres do trabalhador. - Econet',
        badges: [
            { text: 'Legislação', class: 'badge-editor' }
        ],
        creator: 'Econet'
    }
];

videoCards.forEach((card, idx) => {
    card.addEventListener('click', function(e) {
        e.preventDefault();
        const data = videoDetails[idx];
        videoModalPlayer.innerHTML = `<iframe src="${data.embed}" frameborder="0" allowfullscreen loading="lazy" style="width:100%;height:100%;min-height:220px;border-radius:12px;"></iframe>`;
        videoModalTitle.textContent = data.title;
        videoModalBadges.innerHTML = data.badges.map(b => `<span class="badge ${b.class}">${b.text}</span>`).join('');
        videoModalCreator.textContent = `Criador: ${data.creator}`;
        videoModalYoutube.href = data.youtube;
        videoModal.removeAttribute('hidden');
        document.body.style.overflow = 'hidden';
    });
});

closeVideoModal.addEventListener('click', closeModal);
videoModal.addEventListener('click', function(e) {
    if (e.target === videoModal) closeModal();
});
function closeModal() {
    videoModal.setAttribute('hidden', '');
    videoModalPlayer.innerHTML = '';
    document.body.style.overflow = '';
}

// Navegação dos depoimentos
document.addEventListener('DOMContentLoaded', function() {
    const depoimentsSection = document.querySelector('.depoimentsSection');
    const btnPrev = document.getElementById('depoimentPrev');
    const btnNext = document.getElementById('depoimentNext');
    if (!depoimentsSection || !btnPrev || !btnNext) return;

    const scrollAmount = () => depoimentsSection.offsetWidth * 0.7;

    btnPrev.addEventListener('click', () => {
        depoimentsSection.scrollBy({ left: -scrollAmount(), behavior: 'smooth' });
    });
    btnNext.addEventListener('click', () => {
        depoimentsSection.scrollBy({ left: scrollAmount(), behavior: 'smooth' });
    });
});
