document.addEventListener('DOMContentLoaded', () => {
    // Seleciona os elementos do DOM
    const addMemberBtn = document.getElementById('add-member-btn');
    const addMemberModal = document.getElementById('add-member-modal');
    const closeModalBtn = document.getElementById('close-modal-btn');
    const cancelBtn = document.getElementById('cancel-btn');

    // Função para abrir o modal
    const openModal = () => {
        addMemberModal.classList.add('open');
    };

    // Função para fechar o modal
    const closeModal = () => {
        addMemberModal.classList.remove('open');
    };

    // Adiciona os event listeners
    if (addMemberBtn) {
        addMemberBtn.addEventListener('click', openModal);
    }
    
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeModal);
    }

    if (cancelBtn) {
        cancelBtn.addEventListener('click', closeModal);
    }

    // Fecha o modal se o usuário clicar no overlay (fundo)
    if (addMemberModal) {
        addMemberModal.addEventListener('click', (event) => {
            // Verifica se o clique foi no próprio overlay e não no container do modal
            if (event.target === addMemberModal) {
                closeModal();
            }
        });
    }
});