document.addEventListener('DOMContentLoaded', function() {
    const userTypeSimulator = document.getElementById('userTypeSimulator');
    const candidateActions = document.getElementById('candidate-actions');
    const companyActions = document.getElementById('company-actions');

    const storedUserType = localStorage.getItem('conexaoRHUserType');

    if (userTypeSimulator) {
        if (storedUserType) {
            userTypeSimulator.value = storedUserType;
        } else {
            userTypeSimulator.value = 'candidate';
        }
    }

    function toggleActionCards() {
        if (userTypeSimulator && userTypeSimulator.value === 'candidate') {
            if (candidateActions) candidateActions.style.display = 'block';
            if (companyActions) companyActions.style.display = 'none';
        } else if (userTypeSimulator && userTypeSimulator.value === 'company') {
            if (candidateActions) candidateActions.style.display = 'none';
            if (companyActions) companyActions.style.display = 'block';
        }
    }
    
    // The userTypeSimulator is hidden, so no need for a change listener for user interaction.
    // Its value is set programmatically.

    document.querySelectorAll('.action-card, .dashboard-button').forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            alert('Navegando para a área correspondente... (Isso é uma demonstração)');
        });
    });

    // Initial call to set visibility based on the retrieved user type
    toggleActionCards();
});