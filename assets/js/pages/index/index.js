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



// MODAL LOGIN

document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('modal');
    const openBtn = document.getElementById('openModalBtn');
    const closeBtn = document.getElementById('closeModalBtn');

    if (openBtn && modal) {
        openBtn.onclick = function(e) {
            e.preventDefault();
            modal.style.display = 'flex';
        };
    }
    if (closeBtn && modal) {
        closeBtn.onclick = function(e) {
            e.preventDefault();
            modal.style.display = 'none';
        };
    }
    // Fecha ao clicar fora do conteúdo
    modal.addEventListener('mousedown', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
});