function getPageKey() {
    return window.location.pathname;
}

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

function setupCuradoriaTabs() {
    const tabs = document.querySelectorAll('.tabs button');
    const chosenWrapper = document.querySelector('.chosen-wrapper');
    if (!tabs.length || !chosenWrapper) return;

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
                title: 'Os 6 Tipos de Cultura Organizacional: Qual é a Ideal para o Seu Negócio?',
                desc: 'A cultura de uma empresa vai muito além de manuais e regras...',
                img: '../../assets/images/pages/curadoria/rh-1.png',
                meta: 'Vídeo',
                type: 'video',
                index: 0 
            },
            {
                title: 'Cultura Organizacional Tóxica: A Parábola dos Cinco Macacos',
                desc: 'Uma história sobre macacos que explica por que...',
                img: '../../assets/images/pages/curadoria/rh-2.png',
                meta: 'Vídeo',
                type: 'video',
                index: 2
            },
            {
                title: 'Crédito do Trabalhador E-consignado - Econet',
                desc: 'Entenda como funciona o crédito do trabalhador e-consignado.',
                img: 'https://img.youtube.com/vi/F-mvgoG0lLc/hqdefault.jpg',
                meta: 'YouTube',
                type: 'youtube',
                index: 4
            },
            
        ],
    ];

    function renderTab(idx) {
        chosenWrapper.innerHTML = tabContent[idx].map(card => `
            <div class="mini-curadoria-card">
                <img src="${card.img}" alt="${card.title}" class="mini-curadoria-img">
                <div class="mini-curadoria-info">
                    <span class="mini-curadoria-meta" data-meta="${card.meta}">${card.meta}</span>
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
    renderTab(0);

    chosenWrapper.querySelectorAll('.mini-curadoria-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const idx = parseInt(this.getAttribute('data-media-index'), 10);
            if (!isNaN(idx)) openMediaDetail(idx);
        });
    });
}

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

function setupCuradoriaSearch() {
    const input = document.querySelector('.search-input');
    const suggestions = document.querySelector('.search-suggestions');
    if (!input || !suggestions) return;

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
        { title: 'Entrevista com Especialista', url: '#' },
        { title: 'Os 6 Tipos de Cultura Organizacional: Qual é a Ideal para o Seu Negócio?', url: '#', type: 'video' },
        { title: 'POD OU NÃO POD RH - EP 1', url: '#', type: 'podcast' },
        { title: 'Cultura Organizacional Tóxica: A Parábola dos Cinco Macacos', url: '#', type: 'video' },
        { title: 'POD OU NÃO POD RH - EP 2', url: '#', type: 'podcast' },
        { title: 'Crédito do Trabalhador E-consignado - Econet', url: '#', type: 'youtube' },
        { title: 'Hora Extra - Econet', url: '#', type: 'youtube' },
        { title: 'Cálculo do 13º Salário - Econet', url: '#', type: 'youtube' },
        { title: 'Prazos para Recontratação de Ex-Funcionário - Econet', url: '#', type: 'youtube' },
        { title: 'Carnaval é Feriado? Direitos e deveres do trabalhador. - Econet', url: '#', type: 'youtube' },
    ];

    function normalize(str) {
        return str.normalize('NFD').replace(/[ -- --]/g, '').toLowerCase();
    }

    function getSuggestions(query) {
        if (!query) return [];
        const q = normalize(query);

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
    suggestions.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            const li = document.activeElement;
            if (li && li.hasAttribute('data-url')) {
                window.location.href = li.getAttribute('data-url');
            }
        }
    });
    document.addEventListener('click', function(e) {
        if (!input.contains(e.target) && !suggestions.contains(e.target)) {
            suggestions.classList.remove('active');
        }
    });
}

const mediaDetails = [
    // Vídeo 1
    {
        type: 'video',
        thumb: '../../assets/images/pages/curadoria/rh-1.png',
        title: 'Os 6 Tipos de Cultura Organizacional: Qual é a Ideal para o Seu Negócio?',
        meta: 'Por RH Conexão • 11:17 min • 2024',
        desc: 'A cultura de uma empresa vai muito além de manuais e regras. Ela é o conjunto de valores, comportamentos e práticas que define o ambiente de trabalho e impulsiona os resultados.',
        credits: 'Vídeo por RH Conexão. Ilustrações: Storyset.',
        localVideo: '../../assets/video/CULTURA-ORGANIZACIONAL-1.mp4'
    },
    // Podcast 1
    {
        type: 'podcast',
        thumb: '../../assets/images/pages/curadoria/duvidas-1.png',
        title: 'POD OU NÃO POD RH - EP 1',
        meta: 'Por RH Conexão • 6:50 • 2024',
        desc: 'Um bate-papo sobre as principais tendências, dicas e mudanças que estão transformando o RH.',
        credits: 'Podcast por RH Conexão. Arte: Freepik.',
        localVideo: '../../assets/video/PODCAST-1.mp4'
    },
    // Vídeo 2 
    {
        type: 'video',
        thumb: '../../assets/images/pages/curadoria/rh-2.png',
        title: 'Cultura Organizacional Tóxica: A Parábola dos Cinco Macacos',
        meta: 'Por RH Conexão • 1:22 min • 2024',
        desc: 'Uma história sobre macacos que explica por que, às vezes, as equipes têm medo de tentar algo novo. Entenda de forma simples o perigo da cultura do "sempre foi assim".',
        credits: 'Vídeo por RH Conexão.',
        localVideo: '../../assets/video/CULTURAR-ORGANIZACIONAL-2.mp4'
    },
    // Podcast 2
    {
        type: 'podcast',
        thumb: '../../assets/images/pages/curadoria/duvidas-2.png',
        title: 'POD OU NÃO POD RH - EP 2',
        meta: 'Por RH Conexão • 6:50 min • 2024',
        desc: 'Conversando com profissional da área, e contará um pouco da sua experiência no setor de RH.',
        credits: 'Podcast por RH Conexão.',
        url: 'https://open.spotify.com/episode/yyyyyyy',
        localVideo: '../../assets/video/PODCAST-2.mp4'
    },
    // YouTube 1
    {
        type: 'youtube',
        thumb: 'https://img.youtube.com/vi/F-mvgoG0lLc/hqdefault.jpg',
        title: 'Crédito do Trabalhador E-consignado - Econet',
        meta: 'YouTube • 10:50 min • Econet',
        desc: 'Entenda como funciona o crédito do trabalhador e-consignado.',
        credits: 'Vídeo criado por Econet.',
        url: 'https://www.youtube.com/watch?v=F-mvgoG0lLc'
    },
    // YouTube 2
    {
        type: 'youtube',
        thumb: 'https://img.youtube.com/vi/FxfaBy7Dj2s/hqdefault.jpg',
        title: 'Hora Extra - Econet',
        meta: 'YouTube • 9:29 min • Econet',
        desc: 'Tudo sobre hora extra e direitos do trabalhador.',
        credits: 'Vídeo criado por Econet.',
        url: 'https://www.youtube.com/watch?v=FxfaBy7Dj2s'
    },
    // YouTube 3
    {
        type: 'youtube',
        thumb: 'https://img.youtube.com/vi/LwS_Ex3Z-EA/hqdefault.jpg',
        title: 'Cálculo do 13º Salário - Econet',
        meta: 'YouTube • 8:23 min • Econet',
        desc: 'Aprenda a calcular o 13º salário corretamente.',
        credits: 'Vídeo criado por Econet.',
        url: 'https://www.youtube.com/watch?v=LwS_Ex3Z-EA'
    },
    // YouTube 4
    {
        type: 'youtube',
        thumb: 'https://img.youtube.com/vi/rVGaWZb_yMY/hqdefault.jpg',
        title: 'Prazos para Recontratação de Ex-Funcionário - Econet',
        meta: 'YouTube • 6:32 min • Econet',
        desc: 'Saiba os prazos legais para recontratar ex-funcionários.',
        credits: 'Vídeo criado por Econet.',
        url: 'https://www.youtube.com/watch?v=rVGaWZb_yMY'
    },
    // YouTube 5
    {
        type: 'youtube',
        thumb: 'https://img.youtube.com/vi/GNfMBeLhldo/hqdefault.jpg',
        title: 'Carnaval é Feriado? Direitos e deveres do trabalhador. - Econet',
        meta: 'YouTube • 5:09 min • Econet',
        desc: 'Descubra se o Carnaval é feriado e os direitos do trabalhador.',
        credits: 'Vídeo criado por Econet.',
        url: 'https://www.youtube.com/watch?v=GNfMBeLhldo'
    }
];

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
            <button ${index === 0 ? 'disabled' : ''} onclick="openMediaDetail(${index - 1})"><i class="fa-solid fa-arrow-left"></i> Anterior</button>
            <button ${index === mediaDetails.length - 1 ? 'disabled' : ''} onclick="openMediaDetail(${index + 1})">Próximo <i class="fa-solid fa-arrow-right"></i></button>
        </div>
    `;
    panel.classList.add('open');
    panel.removeAttribute('hidden');
    overlay.removeAttribute('hidden');
    panel.focus();
    document.body.style.overflow = 'hidden'; 
}

document.getElementById('closeMediaDetail').onclick = closeMediaDetail;
document.getElementById('mediaDetailOverlay').onclick = closeMediaDetail;
function closeMediaDetail() {
    document.getElementById('mediaDetailPanel').classList.remove('open');
    setTimeout(() => {
        document.getElementById('mediaDetailPanel').setAttribute('hidden', '');
        document.getElementById('mediaDetailOverlay').setAttribute('hidden', '');
        document.body.style.overflow = '';
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


