document.addEventListener('DOMContentLoaded', () => {
    const draggableCards = document.querySelectorAll('.candidate-card');
    const dropZones = document.querySelectorAll('.column-cards');

    // Adiciona listeners para os cards que podem ser arrastados
    draggableCards.forEach(card => {
        card.addEventListener('dragstart', () => {
            // Adiciona uma classe para dar feedback visual
            card.classList.add('is-dragging');
        });

        card.addEventListener('dragend', () => {
            // Remove a classe ao final do arraste
            card.classList.remove('is-dragging');
        });
    });

    // Adiciona listeners para as colunas onde os cards podem ser soltos
    dropZones.forEach(zone => {
        zone.addEventListener('dragover', event => {
            // Permite que o elemento seja solto aqui
            event.preventDefault(); 
        });

        zone.addEventListener('drop', event => {
            event.preventDefault();
            
            // Pega o card que está sendo arrastado
            const cardBeingDragged = document.querySelector('.is-dragging');
            
            // Adiciona o card à nova coluna
            if (cardBeingDragged) {
                zone.appendChild(cardBeingDragged);
            }
        });
    });
});