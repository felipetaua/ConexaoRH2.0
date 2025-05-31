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
    setupCuradoriaTabs();
});

// Função para tabs dinâmicas na curadoria
function setupCuradoriaTabs() {
    const tabs = document.querySelectorAll('.tabs button');
    const chosenWrapper = document.querySelector('.chosen-wrapper');
    if (!tabs.length || !chosenWrapper) return;

    // Conteúdo de cada categoria (agora com múltiplos cards por categoria)
    const tabContent = [
        // Destaques
        [
            {
                title: 'RH Digital',
                desc: 'Ferramentas e tendências para modernizar o setor de RH.',
                img: '../../assets/images/pages/curadoria/curadoria-1.jpg',
                meta: 'Tendências',
                link: '#',
            },
            {
                title: 'Gestão Humanizada',
                desc: 'Como valorizar pessoas e resultados ao mesmo tempo.',
                img: '../../assets/images/pages/curadoria/curadoria-2.jpg',
                meta: 'Gestão',
                link: '#',
            },
            {
                title: 'RH Ágil',
                desc: 'Adote metodologias ágeis no seu RH.',
                img: '../../assets/images/pages/curadoria/curadoria-3.jpg',
                meta: 'Inovação',
                link: '#',
            }
        ],
        // Artigos
        [
            {
                title: 'Como reter talentos',
                desc: 'Estratégias práticas para manter os melhores profissionais.',
                img: '../../assets/images/pages/curadoria/curadoria-4.png',
                meta: 'Artigo',
                link: '#',
            },
            {
                title: 'Feedback Eficaz',
                desc: 'Dicas para dar e receber feedbacks construtivos.',
                img: '../../assets/images/pages/curadoria/curadoria-5.webp',
                meta: 'Artigo',
                link: '#',
            }
        ],
        // Colaborador
        [
            {
                title: 'Desenvolvimento Pessoal',
                desc: 'Dicas para crescer na carreira e se destacar.',
                img: '../../assets/images/pages/curadoria/curadoria-6.jpg',
                meta: 'Colaborador',
                link: '#',
            },
            {
                title: 'Saúde Mental',
                desc: 'Como cuidar do bem-estar no ambiente de trabalho.',
                img: '../../assets/images/pages/curadoria/curadoria-7.jpg',
                meta: 'Colaborador',
                link: '#',
            }
        ],
        // Empresa
        [
            {
                title: 'Cultura Organizacional',
                desc: 'Como criar um ambiente saudável e produtivo.',
                img: '../../assets/images/pages/curadoria/curadoria-8.jpg',
                meta: 'Empresa',
                link: '#',
            },
            {
                title: 'Diversidade e Inclusão',
                desc: 'A importância de equipes diversas para o sucesso.',
                img: '../../assets/images/pages/curadoria/curadoria-9.webp',
                meta: 'Empresa',
                link: '#',
            }
        ],
        // Vídeos
        [
            {
                title: 'Vídeo RH 2024',
                desc: 'Assista aos principais insights do setor.',
                img: '../../assets/images/pages/curadoria/curadoria-10.webp',
                meta: 'Vídeo',
                link: '#',
            },
            {
                title: 'Entrevista com Especialista',
                desc: 'Especialistas comentam tendências do RH.',
                img: '../../assets/images/pages/curadoria/curadoria-11.jpg',
                meta: 'Vídeo',
                link: '#',
            }
        ],
    ];

    function renderTab(idx) {
        chosenWrapper.innerHTML = tabContent[idx].map(card => `
            <div class="mini-curadoria-card">
                <img src="${card.img}" alt="${card.title}" class="mini-curadoria-img">
                <div class="mini-curadoria-info">
                    <span class="mini-curadoria-meta">${card.meta}</span>
                    <h4 class="mini-curadoria-title">${card.title}</h4>
                    <p class="mini-curadoria-desc">${card.desc}</p>
                    <a href="${card.link}" class="mini-curadoria-link">Saiba mais</a>
                </div>
            </div>
        `).join('');
    }

    tabs.forEach((tab, idx) => {
        tab.addEventListener('click', function() {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            renderTab(idx);
        });
    });
    // Render inicial
    renderTab(0);
}
