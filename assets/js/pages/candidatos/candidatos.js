document.addEventListener('DOMContentLoaded', function() {
    const addBtn = document.querySelector('.btn.btn-primary');
    const modal = document.getElementById('addCandidateModal');
    const closeModalBtn = document.getElementById('closeAddCandidateModal');
    const form = document.getElementById('addCandidateForm');
    const applicantList = document.querySelector('.applicant-list');

    if (addBtn && modal) {
        addBtn.addEventListener('click', function(e) {
            if (addBtn.textContent.includes('Adicionar Candidato')) {
                e.preventDefault();
                modal.style.display = 'flex';
            }
        });
    }

    if (closeModalBtn && modal) {
        closeModalBtn.addEventListener('click', function() {
            modal.style.display = 'none';
        });
    }
    // Fechar ao clicar fora
    if (modal) {
        modal.addEventListener('mousedown', function(e) {
            if (e.target === modal) modal.style.display = 'none';
        });
    }

    if (form && applicantList) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('candidateName').value;
            const date = document.getElementById('candidateDate').value.split('-').reverse().join('/');
            const stage = document.getElementById('candidateStage').value;
            const rating = parseInt(document.getElementById('candidateRating').value, 10);

            let stars = '';
            for (let i = 1; i <= 5; i++) {
                stars += `<svg fill="currentColor" viewBox="0 0 20 20" class="${i > rating ? 'empty' : ''}" style="width:1em;height:1em;"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>`;
            }

            const row = document.createElement('div');
            row.className = 'applicant-row';
            row.innerHTML = `
                <div><input type="checkbox"></div>
                <div class="applicant-info">
                    <img src="https://i.pravatar.cc/150?img=${Math.floor(Math.random()*70)+1}" alt="${name}">
                    <div>
                        <span class="name">${name}</span>
                        <span class="tag-new">Novo</span>
                    </div>
                </div>
                <div>${date}</div>
                <div class="progress-col">
                    <div class="progress-stepper">
                        <div class="step${stage==='triagem'?' completed':''}"></div>
                        <div class="step${stage==='entrevista'?' completed':''}"></div>
                        <div class="step${stage==='rejeitados'?' completed':''}"></div>
                        <div class="step"></div>
                    </div>
                </div>
                <div class="rating-col">
                    <div class="star-rating">${stars}</div>
                </div>
                <div class="actions-col">
                    <button class="btn btn-cv">Ver Currículo</button>
                </div>
            `;
            applicantList.appendChild(row);
            modal.style.display = 'none';
            form.reset();
        });
    }
});