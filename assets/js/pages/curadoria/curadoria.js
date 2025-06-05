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
    setupCuradoriaSearch();
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

// Scroll suave para a seção Featured ao clicar no botão "Posts"
document.addEventListener('DOMContentLoaded', function() {
    const postsBtn = document.querySelector('.hero-buttons .btn:not(.dark)');
    const featuredSection = document.querySelector('.featured');
    if (postsBtn && featuredSection) {
        postsBtn.addEventListener('click', function(e) {
            e.preventDefault();
            featuredSection.scrollIntoView({ behavior: 'smooth' });
            // Animação de destaque
            featuredSection.classList.add('featured-animate');
            setTimeout(() => {
                featuredSection.classList.remove('featured-animate');
            }, 1200);
        });
    }
});

// Pesquisa inteligente com sugestões
function setupCuradoriaSearch() {
    const input = document.querySelector('.search-input');
    const suggestions = document.querySelector('.search-suggestions');
    if (!input || !suggestions) return;

    // Lista de conteúdos pesquisáveis (pode ser expandida)
    const items = [
        { title: 'Processo de Demissão', url: './lista-postagens/detalhe-e1.html' },
        { title: 'Entrevista de Emprego', url: './lista-postagens/detalhe-e2.html' },
        { title: 'Perguntas que não deve fazer', url: './lista-postagens/detalhe-e3.html' },
        { title: 'Legislação Trabalhista', url: './lista-postagens/detalhe-e4.html' },
        { title: 'Férias', url: './lista-postagens/detalhe-e5.html' },
        { title: 'Recrutamento e Seleção', url: './lista-postagens/detalhe-e6.html' },
        { title: 'Benefícios', url: './lista-postagens/detalhe-e7.html' },
        { title: 'Processo de Admissão', url: './lista-postagens/detalhe-e8.html' },
        { title: 'Departamento Pessoal', url: './lista-postagens/detalhe-e9.html' },
        { title: 'Treinamento e Desenvolvimento', url: './lista-postagens/detalhe-e10.html' },
        { title: 'Cultura Organizacional', url: './lista-postagens/detalhe-e11.html' },
        { title: 'História do RH', url: './lista-postagens/detalhe-e12.html' },
        { title: 'RH Digital', url: '#' },
        { title: 'Gestão Humanizada', url: '#' },
        { title: 'RH Ágil', url: '#' },
        { title: 'Como reter talentos', url: '#' },
        { title: 'Feedback Eficaz', url: '#' },
        { title: 'Desenvolvimento Pessoal', url: '#' },
        { title: 'Saúde Mental', url: '#' },
        { title: 'Diversidade e Inclusão', url: '#' },
        { title: 'Vídeo RH 2024', url: '#' },
        { title: 'Entrevista com Especialista', url: '#' }
    ];

    function normalize(str) {
        return str.normalize('NFD').replace(/[ -- --]/g, '').toLowerCase();
    }

    function getSuggestions(query) {
        if (!query) return [];
        const q = normalize(query);
        // Ordena por quão parecido (começa, inclui, etc)
        return items
            .map(item => ({
                ...item,
                score: normalize(item.title).startsWith(q) ? 2 : (normalize(item.title).includes(q) ? 1 : 0)
            }))
            .filter(item => item.score > 0)
            .sort((a, b) => b.score - a.score || a.title.localeCompare(b.title));
    }

    input.addEventListener('input', function() {
        const val = input.value.trim();
        const found = getSuggestions(val);
        if (found.length) {
            suggestions.innerHTML = found.map(item => `<li tabindex="0" data-url="${item.url}">${item.title}</li>`).join('');
            suggestions.classList.add('active');
        } else if (val.length > 0) {
            suggestions.innerHTML = `<li class="no-result">Nenhum resultado encontrado</li>`;
            suggestions.classList.add('active');
        } else {
            suggestions.innerHTML = '';
            suggestions.classList.remove('active');
        }
    });

    suggestions.addEventListener('click', function(e) {
        const li = e.target.closest('li[data-url]');
        if (li) {
            window.location.href = li.getAttribute('data-url');
        }
    });
    // Acessibilidade: enter/tecla
    suggestions.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            const li = document.activeElement;
            if (li && li.hasAttribute('data-url')) {
                window.location.href = li.getAttribute('data-url');
            }
        }
    });
    // Fecha sugestões ao clicar fora
    document.addEventListener('click', function(e) {
        if (!input.contains(e.target) && !suggestions.contains(e.target)) {
            suggestions.classList.remove('active');
        }
    });
}

// Exemplo de dados dos vídeos/podcasts (adicione todos que quiser)
const mediaDetails = [
    // Vídeo 1
    {
        type: 'video',
        thumb: '../../assets/images/pages/curadoria/rh-1.png',
        title: 'Como Engajar sua Equipe no Novo RH',
        meta: 'Por RH Conexão • 12 min • 2024',
        desc: 'Dicas práticas para líderes e profissionais de RH aumentarem o engajamento e a motivação dos times.',
        credits: 'Vídeo por RH Conexão. Ilustrações: Storyset.',
        url: 'https://www.youtube.com/watch?v=xxxxxxx'
    },
    // Podcast 1
    {
        type: 'podcast',
        thumb: '../../assets/images/pages/curadoria/duvidas-1.png',
        title: 'Tendências do RH Digital',
        meta: 'Por RH Conexão • 6:50 • 2024',
        desc: 'Um bate-papo sobre as principais tendências tecnológicas que estão transformando o RH.',
        credits: 'Podcast por RH Conexão. Arte: Freepik.',
        localVideo: '../../assets/video/PODCAST-1.mp4'
    },
    // Vídeo 2
    {
        type: 'video',
        thumb: '../../assets/images/pages/curadoria/rh-2.png',
        title: 'Diversidade nas Empresas',
        meta: 'Por RH Conexão • 15 min • 2024',
        desc: 'Como criar ambientes inclusivos e os benefícios da diversidade para o sucesso organizacional.',
        credits: 'Vídeo por RH Conexão.',
        url: 'https://www.youtube.com/watch?v=yyyyyyy'
    },
    // Podcast 2
    {
        type: 'podcast',
        thumb: '../../assets/images/pages/curadoria/duvidas-2.png',
        title: 'Liderança Humanizada',
        meta: 'Por RH Conexão • 6:50 min • 2024',
        desc: 'Reflexões e dicas para líderes que querem inspirar e transformar equipes.',
        credits: 'Podcast por RH Conexão.',
        url: 'https://open.spotify.com/episode/yyyyyyy',
        localVideo: '../../assets/video/PODCAST-2.mp4'
    },
    // YouTube 1
    {
        type: 'youtube',
        thumb: 'https://img.youtube.com/vi/F-mvgoG0lLc/hqdefault.jpg',
        title: 'Crédito do Trabalhador E-consignado - Econet',
        meta: 'YouTube • Econet',
        desc: 'Entenda como funciona o crédito do trabalhador e-consignado.',
        credits: 'Vídeo por Econet.',
        url: 'https://www.youtube.com/watch?v=F-mvgoG0lLc'
    },
    // YouTube 2
    {
        type: 'youtube',
        thumb: 'https://img.youtube.com/vi/FxfaBy7Dj2s/hqdefault.jpg',
        title: 'Hora Extra - Econet',
        meta: 'YouTube • Econet',
        desc: 'Tudo sobre hora extra e direitos do trabalhador.',
        credits: 'Vídeo por Econet.',
        url: 'https://www.youtube.com/watch?v=FxfaBy7Dj2s'
    },
    // YouTube 3
    {
        type: 'youtube',
        thumb: 'https://img.youtube.com/vi/LwS_Ex3Z-EA/hqdefault.jpg',
        title: 'Cálculo do 13º Salário - Econet',
        meta: 'YouTube • Econet',
        desc: 'Aprenda a calcular o 13º salário corretamente.',
        credits: 'Vídeo por Econet.',
        url: 'https://www.youtube.com/watch?v=LwS_Ex3Z-EA'
    },
    // YouTube 4
    {
        type: 'youtube',
        thumb: 'https://img.youtube.com/vi/rVGaWZb_yMY/hqdefault.jpg',
        title: 'Prazos para Recontratação de Ex-Funcionário - Econet',
        meta: 'YouTube • Econet',
        desc: 'Saiba os prazos legais para recontratar ex-funcionários.',
        credits: 'Vídeo por Econet.',
        url: 'https://www.youtube.com/watch?v=rVGaWZb_yMY'
    },
    // YouTube 5
    {
        type: 'youtube',
        thumb: 'https://img.youtube.com/vi/GNfMBeLhldo/hqdefault.jpg',
        title: 'Carnaval é Feriado? Direitos e deveres do trabalhador. - Econet',
        meta: 'YouTube • Econet',
        desc: 'Descubra se o Carnaval é feriado e os direitos do trabalhador.',
        credits: 'Vídeo por Econet.',
        url: 'https://www.youtube.com/watch?v=GNfMBeLhldo'
    }
];

// Função para abrir painel
function openMediaDetail(index) {
    const panel = document.getElementById('mediaDetailPanel');
    const overlay = document.getElementById('mediaDetailOverlay');
    const content = document.getElementById('mediaDetailContent');
    const item = mediaDetails[index];

    content.innerHTML = `
        <div class="media-detail-thumb">
            ${
                item.localVideo
                    ? `<video controls style="width:100%;height:100%;border-radius:10px;" poster="${item.thumb}">
                            <source src="${item.localVideo}" type="video/mp4">
                            Seu navegador não suporta vídeo HTML5.
                       </video>`
                    : item.type === 'video' || item.type === 'youtube'
                        ? `<iframe src="${item.url.replace('watch?v=', 'embed/')}" frameborder="0" allowfullscreen loading="lazy" style="width:100%;height:100%;"></iframe>`
                        : `<img src="${item.thumb}" alt="${item.title}" style="width:100%;height:100%;object-fit:cover;">`
            }
        </div>
        <div class="media-detail-title">${item.title}</div>
        <div class="media-detail-meta">${item.meta}</div>
        <div class="media-detail-desc">${item.desc}</div>
        <div class="media-detail-credits">Créditos: ${item.credits}</div>
        <div class="media-detail-nav">
            <button ${index === 0 ? 'disabled' : ''} onclick="openMediaDetail(${index - 1})">&larr; Anterior</button>
            <button ${index === mediaDetails.length - 1 ? 'disabled' : ''} onclick="openMediaDetail(${index + 1})">Próximo &rarr;</button>
        </div>
    `;
    panel.classList.add('open');
    panel.removeAttribute('hidden');
    overlay.removeAttribute('hidden');
    panel.focus();
}

// Fechar painel
document.getElementById('closeMediaDetail').onclick = closeMediaDetail;
document.getElementById('mediaDetailOverlay').onclick = closeMediaDetail;
function closeMediaDetail() {
    document.getElementById('mediaDetailPanel').classList.remove('open');
    setTimeout(() => {
        document.getElementById('mediaDetailPanel').setAttribute('hidden', '');
        document.getElementById('mediaDetailOverlay').setAttribute('hidden', '');
    }, 350);
}

document.querySelectorAll('.media-card .play-btn').forEach((btn, idx) => {
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        openMediaDetail(idx);
    });
});

document.getElementById('showMoreVideosBtn').addEventListener('click', function(e) {
    e.preventDefault();
    const list = document.getElementById('mediaYoutubeList');
    const arrow = this.querySelector('.arrow');
    if (list.style.display === 'none' || !list.style.display) {
        list.style.display = 'block';
        arrow.classList.add('open');
    } else {
        list.style.display = 'none';
        arrow.classList.remove('open');
    }
});
