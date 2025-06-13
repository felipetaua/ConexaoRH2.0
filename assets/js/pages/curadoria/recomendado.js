document.addEventListener('DOMContentLoaded', function () {
    // Lista exclusiva de posts recomendados
    const postsRecomendados = [
        {
            titulo: "PROCESSO DE DEMISSÃO NA EMPRESA: COMO TORNAR O PROCESSO MAIS RESPEITOSO E AGRADÁVEL",
            imagem: "../../../../assets/images/pages/curadoria/curadoria-1.jpg",
            resumo: "Cuidar de um processo de desligamento de um funcionário, assim como o de integração no momento da contratação é algo que faz parte das funções.",
            link: "/pages/curadoria/lista-postagens/detalhe-e1.html"
        },
        {
            titulo: "ENTREVISTA DE EMPREGO: COMO MANDAR BEM E IMPRESSIONAR O RECRUTADOR",
            imagem: "../../../../assets/images/pages/curadoria/curadoria-2.jpg",
            resumo: "Muitas pessoas podem ficar nervosas diante de uma nova oportunidade de trabalho. E é extremamente comum não saber o que falar em uma entrevista de emprego.",
            link: "/pages/curadoria/lista-postagens/detalhe-e2.html"
        },
        {
            titulo: "ENTREVISTA: PERGUNTAS QUE NÃO DEVE FAZER",
            imagem: "../../../assets/images/pages/curadoria/curadoria-3.jpg",
            resumo: "Por que um roteiro é importante na hora de realizar uma entrevista? Um roteiro de entrevista, quando feito corretamente, traz ótimas contratações para todas as empresas.",
            link: "/pages/curadoria/lista-postagens/detalhe-e3.html"
        },
        {
            titulo: "LEGISLAÇÃO TRABALHISTAS",
            imagem: "../../../assets/images/pages/curadoria/curadoria-4.png",
            resumo: "As leis trabalhistas são de extrema importância para garantir os direitos e a proteção dos trabalhadores.",
            link: "/pages/curadoria/lista-postagens/detalhe-e4.html"
        },
        {
            titulo: "FÉRIAS",
            imagem: "../../../assets/images/pages/curadoria/curadoria-5.webp",
            resumo: "O que são férias no contexto do direito trabalhista? Férias são um período de descanso remunerado concedido ao trabalhador.",
            link: "/pages/curadoria/lista-postagens/detalhe-e5.html"
        },
        {
            titulo: "RECRUTAMENTO E SELEÇÃO",
            imagem: "../../../assets/images/pages/curadoria/curadoria-6.jpg",
            resumo: "Perguntas e Respostas sobre Recrutamento e Seleção. O recrutamento é um processo de atração que, por meio das redes de sociais...",
            link: "/pages/curadoria/lista-postagens/detalhe-e6.html"
        },
        {
            titulo: "BENEFÍCIOS",
            imagem: "../../../assets/images/pages/curadoria/curadoria-7.jpg",
            resumo: "Benefício é uma forma extra de que a empresa tem de recompensar seus colaboradores pelo trabalho exercido na empresa.",
            link: "/pages/curadoria/lista-postagens/detalhe-e7.html"
        },
        {
            titulo: "PROCESSO DE ADMISSÃO",
            imagem: "../../../assets/images/pages/curadoria/curadoria-8.jpg",
            resumo: "Admissão é um vínculo jurídico e um compromisso firmado entre o empregador e o empregado.",
            link: "/pages/curadoria/lista-postagens/detalhe-e8.html"
        },
        {
            titulo: "DEPARTAMENTO PESSOAL",
            imagem: "../../../assets/images/pages/curadoria/curadoria-9.webp",
            resumo: "O Departamento Pessoal é o setor onde se cuida de toda a parte burocrática da empresa.",
            link: "/pages/curadoria/lista-postagens/detalhe-e9.html"
        },
        {
            titulo: "TREINAMENTO E DESENVOLVIMENTO",
            imagem: "../../../assets/images/pages/curadoria/curadoria-10.webp",
            resumo: "Treinamento e desenvolvimento é um processo que busca treinar e desenvolver novos colaboradores de uma empresa.",
            link: "/pages/curadoria/lista-postagens/detalhe-e10.html"
        },
        {
            titulo: "CULTURA ORGANIZACIONAL",
            imagem: "../../../assets/images/pages/curadoria/curadoria-11.jpg",
            resumo: "A cultura organizacional de uma empresa se refere às crenças, valores e comportamentos compartilhados pelos membros de uma equipe.",
            link: "/pages/curadoria/lista-postagens/detalhe-e11.html"
        },
        {
            titulo: "HISTÓRIA DO RH",
            imagem: "../../../assets/images/pages/curadoria/curadoria-12.jpg",
            resumo: "A área de Recursos Humanos é relativamente recente, tendo surgido no início do século 20.",
            link: "/pages/curadoria/lista-postagens/detalhe-e12.html"
        },
        {
            titulo: "ROTINAS DE ADIMISSÃO",
            imagem: "../../../assets/images/pages/curadoria/curadoria-13.png",
            resumo: "Navegar pelo processo de admissão de novos colaboradores pode ser complexo. Saiba quais são as etapas essenciais.",
            link: "/pages/curadoria/lista-postagens/detalhe-e13.html"
        },
        {
            titulo: "GESTÃO DE BENEFÍCIOS",
            imagem: "../../../assets/images/pages/curadoria/curadoria-14.png",
            resumo: "Entenda a diferença entre benefícios legais e espontâneos e aprenda a criar um pacote de vantagens que vai além do obrigatório.",
            link: "/pages/curadoria/lista-postagens/detalhe-e14.html"
        },
        {
            titulo: "O Guia Essencial de RH: Leis Trabalhistas, Recrutamento e Avaliação de Desempenho",
            imagem: "../../../assets/images/pages/curadoria/curadoria-15.png",
            resumo: "Navegue pelos pilares da gestão de pessoas com este guia completo. Abordamos desde as principais normas e leis trabalhistas.",
            link: "/pages/curadoria/lista-postagens/detalhe-e15.html"
        },
        {
            titulo: "Guia Completo de Representação do Empregador: Direitos e Deveres nas Relações de Trabalho",
            imagem: "../../../assets/images/pages/curadoria/curadoria-16.png",
            resumo: "Entenda o que significa representar o empregador e como agir nas principais situações da relação de trabalho.",
            link: "/pages/curadoria/lista-postagens/detalhe-e16.html"
        },
        {
            titulo: "Admissão e Demissão: O Guia Definitivo do RH para Processos Legais e Humanizados",
            imagem: "../../../assets/images/pages/curadoria/curadoria-17.png",
            resumo: "Este guia detalha cada etapa do processo de admissão e aborda todos os tipos de demissão, com foco em uma condução legal, responsável e humanizada.",
            link: "/pages/curadoria/lista-postagens/detalhe-e17.html"
        },
        {
            titulo: "Cultura e Capacitação: Como Criar um Ambiente Organizacional Positivo e Investir em Treinamento e Desenvolvimento",
            imagem: "../../../assets/images/pages/curadoria/curadoria-18.png",
            resumo: "Descubra como o 'clima' da sua empresa impacta diretamente a produtividade e o bem-estar da equipe.",
            link: "/pages/curadoria/lista-postagens/detalhe-e18.html"
        }
    ];

    let indiceAtual = 0;
    const porPagina = 3;

    function mostrarRecomendados() {
        const container = document.getElementById('recommendedCards');
        if (!container) return;
        let html = '';
        for (let i = 0; i < porPagina; i++) {
            const idx = (indiceAtual + i) % postsRecomendados.length;
            const post = postsRecomendados[idx];
            html += `
                <div class="recommended-card">
                    <img src="${post.imagem}" alt="${post.titulo}">
                    <h4>${post.titulo}</h4>
                    <p>${post.resumo}</p>
                    <a href="${post.link}">Ler post</a>
                </div>
            `;
        }
        container.innerHTML = html;
    }

    mostrarRecomendados();

    const btn = document.getElementById('nextRecommendationsBtn');
    if (btn) {
        btn.addEventListener('click', function () {
            indiceAtual = (indiceAtual + porPagina) % postsRecomendados.length;
            mostrarRecomendados();
        });
    }
});