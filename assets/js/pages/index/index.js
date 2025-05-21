// Cards deslizantes
new Swiper('.card-wrapper', {
    loop: true,
    spaceBetween: 30,

    // Pagination bullets
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
        dynamicBullets: true
    },

    // Navigation arrows
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },

    // Responsive breakpoints
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


// MODAL LOGIN + SELEÇÃO DE USUÁRIO

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

    // Lógica de seleção
    options.forEach(option => {
        option.addEventListener('click', () => {
            options.forEach(o => o.classList.remove('selected'));
            option.classList.add('selected');
        });
    });

    nextButton.addEventListener('click', () => {
        const selected = document.querySelector('.option.selected');
        if (selected) {
            alert(`Você selecionou: ${selected.querySelector('h3').innerText}`);
            // Aqui você pode prosseguir com a lógica de envio ou redirecionamento
        } else {
            alert('Por favor, selecione um tipo de usuário.');
        }
    });
});
