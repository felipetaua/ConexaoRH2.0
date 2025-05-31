// Função utilitária para obter chave única por página
function getPageKey() {
    return window.location.pathname;
}

// Comentários
function renderComments() {
    const commentsSection = document.querySelector('.comments-section');
    if (!commentsSection) return;
    const key = 'comments_' + getPageKey();
    const comments = JSON.parse(localStorage.getItem(key) || '[]');
    let html = '<h3>Comentários</h3>';
    html += '<div class="comments-list">';
    comments.forEach(c => {
        html += `<div class="comment"><p><strong>${c.name}:</strong> ${c.text}</p></div>`;
    });
    html += '</div>';
    html += `
        <form class="comment-form">
            <input type="text" name="name" placeholder="Seu nome" required />
            <textarea name="text" placeholder="Escreva seu comentário..." required></textarea>
            <button type="submit">Comentar</button>
        </form>
    `;
    commentsSection.innerHTML = html;
    commentsSection.querySelector('.comment-form').onsubmit = function(e) {
        e.preventDefault();
        const name = this.name.value.trim();
        const text = this.text.value.trim();
        if (name && text) {
            comments.push({ name, text });
            localStorage.setItem(key, JSON.stringify(comments));
            renderComments();
        }
    };
}

// Likes
function renderLike() {
    const likeBtn = document.querySelector('.like-btn');
    const likeCount = document.querySelector('.like-count');
    if (!likeBtn || !likeCount) return;
    const key = 'like_' + getPageKey();
    let liked = localStorage.getItem(key) === '1';
    let count = parseInt(localStorage.getItem(key + '_count') || '0', 10);
    likeBtn.classList.toggle('liked', liked);
    likeCount.textContent = count;
    likeBtn.onclick = function() {
        liked = !liked;
        likeBtn.classList.toggle('liked', liked);
        if (liked) {
            count++;
            localStorage.setItem(key, '1');
        } else {
            count = Math.max(0, count - 1);
            localStorage.setItem(key, '0');
        }
        localStorage.setItem(key + '_count', count);
        likeCount.textContent = count;
    };
}

// Acessibilidade: mostrar/ocultar transcrição ao clicar no botão
function setupTranscriptionToggle() {
    const transcriptionBtns = document.querySelectorAll('.transcription-btn');
    const transcriptionContents = document.querySelectorAll('.transcription-content');
    transcriptionBtns.forEach((btn, i) => {
        btn.addEventListener('click', () => {
            const content = transcriptionContents[i];
            if (content.style.display === 'none' || content.style.display === '') {
                content.style.display = 'block';
                btn.textContent = 'Ocultar transcrição do vídeo ' + (i+1);
            } else {
                content.style.display = 'none';
                btn.textContent = 'Transcrição do vídeo ' + (i+1) + ' (Acessível)';
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', function() {
    renderComments();
    renderLike();
    setupTranscriptionToggle();
});
