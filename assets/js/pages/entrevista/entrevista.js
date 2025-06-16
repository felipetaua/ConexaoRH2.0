document.addEventListener('DOMContentLoaded', () => {
    // --- LÓGICA DO MODAL DE AGENDAMENTO ---

    // Seleciona os elementos do DOM para o modal
    const scheduleBtn = document.getElementById('schedule-interview-btn');
    const scheduleModal = document.getElementById('schedule-interview-modal');
    const closeModalBtn = document.getElementById('close-modal-btn');
    const cancelBtn = document.getElementById('cancel-btn');

    // Função para abrir o modal
    const openModal = () => {
        if (scheduleModal) scheduleModal.classList.add('open');
    };

    // Função para fechar o modal
    const closeModal = () => {
        if (scheduleModal) scheduleModal.classList.remove('open');
    };

    // Adiciona os event listeners para abrir e fechar
    if (scheduleBtn) {
        scheduleBtn.addEventListener('click', openModal);
    }
    
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeModal);
    }

    if (cancelBtn) {
        cancelBtn.addEventListener('click', closeModal);
    }

    // Fecha o modal se o usuário clicar no overlay (fundo)
    if (scheduleModal) {
        scheduleModal.addEventListener('click', (event) => {
            if (event.target === scheduleModal) {
                closeModal();
            }
        });
    }
});