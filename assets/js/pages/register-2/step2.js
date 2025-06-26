document.addEventListener('DOMContentLoaded', function() {
    // Este seletor é apenas para simular a troca de visualização na demonstração.
    // Numa aplicação real, você verificaria o tipo do usuário no servidor.
    const userTypeSimulator = document.getElementById('userTypeSimulator');
    const candidateActions = document.getElementById('candidate-actions');
    const companyActions = document.getElementById('company-actions');

    // Simule a troca entre usuário candidato e empresa
    // Altere 'candidate' para 'company' para ver o outro layout
    const currentUserType = 'candidate'; 
    userTypeSimulator.value = currentUserType;

    function toggleActionCards() {
        if (userTypeSimulator.value === 'candidate') {
            candidateActions.style.display = 'block';
            companyActions.style.display = 'none';
        } else {
            candidateActions.style.display = 'none';
            companyActions.style.display = 'block';
        }
    }
    
    // Adiciona listeners de clique para demonstração
    document.querySelectorAll('.action-card, .dashboard-button').forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            alert('Navegando para a área correspondente... (Isso é uma demonstração)');
        });
    });

    // Inicializa a visão correta
    toggleActionCards();
});