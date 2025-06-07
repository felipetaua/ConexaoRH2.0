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
            alert(`Você selecionou: ${selected.querySelector('h3').innerText}`);
        } else {
            alert('Por favor, selecione um tipo de usuário.');
        }
    });
});
