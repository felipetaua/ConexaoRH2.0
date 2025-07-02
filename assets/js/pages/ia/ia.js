document.addEventListener('DOMContentLoaded', function () {
    // Menu hamburguer (já existente)
    const menuBtn = document.getElementById('mobile-menu-btn');
    const sidebar = document.getElementById('sidebar');
    if (menuBtn && sidebar) {
        menuBtn.addEventListener('click', function () {
            sidebar.classList.toggle('show');
        });
    }

    // Notificações
    const notificationBtn = document.getElementById('notification-trigger');
    const notificationPopup = document.getElementById('notification-popup');
    if (notificationBtn && notificationPopup) {
        notificationBtn.addEventListener('click', function (e) {
            e.stopPropagation();
            notificationPopup.classList.toggle('open');
        });

        // Fecha popup ao clicar fora
        document.addEventListener('click', function (e) {
            if (
                notificationPopup.classList.contains('open') &&
                !notificationPopup.contains(e.target) &&
                e.target !== notificationBtn
            ) {
                notificationPopup.classList.remove('open');
            }
        });
    }
});