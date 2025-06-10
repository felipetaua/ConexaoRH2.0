document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.settings-nav a');
    const panes = document.querySelectorAll('.settings-pane');

    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();

            // Remove 'active' de todos
            navLinks.forEach(l => l.classList.remove('active'));
            panes.forEach(p => p.classList.remove('active'));

            // Adiciona 'active' ao clicado e ao seu alvo
            link.classList.add('active');
            const targetId = link.dataset.target;
            const targetPane = document.getElementById(targetId);
            if (targetPane) {
                targetPane.classList.add('active');
            }
        });
    });
});