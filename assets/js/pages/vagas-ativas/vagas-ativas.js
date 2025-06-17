document.addEventListener('DOMContentLoaded', () => {
    const toggleButtons = document.querySelectorAll('.toggle-candidates-btn');

    toggleButtons.forEach(button => {
        console.log("Clicou")
        button.addEventListener('click', (event) => {
            
            event.preventDefault();

            const wrapper = button.closest('.job-listing-wrapper');
            const candidateList = wrapper.querySelector('.candidate-list-container');
            const isOpening = !candidateList.classList.contains('open');

            // Fecha todos os outros painéis abertos
            document.querySelectorAll('.candidate-list-container.open').forEach(openList => {
                // Se não for o painel que estamos tentando abrir/fechar, feche-o
                if (openList !== candidateList) {
                    openList.classList.remove('open');
                    const otherWrapper = openList.closest('.job-listing-wrapper');
                    otherWrapper.classList.remove('open');
                    otherWrapper.querySelector('.toggle-candidates-btn').textContent = 'Ver Candidatos';
                }
            });

            // Alterna o estado do painel clicado
            wrapper.classList.toggle('open');
            candidateList.classList.toggle('open');
            
            // Altera o texto do botão
            if (isOpening) {
                button.textContent = 'Ocultar Candidatos';
            } else {
                button.textContent = 'Ver Candidatos';
            }
        });
    });
});