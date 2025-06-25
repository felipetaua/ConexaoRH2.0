document.addEventListener('DOMContentLoaded', function() {
    const userTypeSelector = document.getElementById('userTypeSelector');
    const candidateFields = document.getElementById('candidate-fields');
    const companyFields = document.getElementById('company-fields');
    const cvInput = document.getElementById('cv');
    const fileUploadText = document.querySelector('.file-upload-text');
    const form = document.getElementById('step2-form');

    // Função para alternar entre os formulários
    function toggleFormFields() {
        if (userTypeSelector.value === 'candidate') {
            candidateFields.style.display = 'block';
            companyFields.style.display = 'none';
        } else {
            candidateFields.style.display = 'none';
            companyFields.style.display = 'block';
        }
    }
    
    // Atualiza o nome do arquivo de CV no campo
    if (cvInput) {
        cvInput.addEventListener('change', function() {
            if (this.files && this.files.length > 0) {
                fileUploadText.textContent = this.files[0].name;
            } else {
                fileUploadText.textContent = 'Nenhum arquivo selecionado';
            }
        });
    }

    // Adiciona o listener para o seletor de tipo de usuário
    userTypeSelector.addEventListener('change', toggleFormFields);

    // Listener para o formulário
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        alert('Cadastro finalizado com sucesso! (Isso é uma demonstração)');
        // Aqui você enviaria todos os dados (Passo 1 + Passo 2) para o servidor
    });

    // Inicializa o formulário com a visão correta
    toggleFormFields();
});