/**
 * Lógica de Interface do Usuário - Programa ARCA
 * Controla comportamentos dinâmicos globais e estados responsivos.
 */
document.addEventListener('DOMContentLoaded', () => {
    // O "Cérebro" do site: espera o HTML carregar para ativar as funções
    initMenuResponsivo();
    initFiltrosMobile();
    initFormularioAdocao();
});

/**
 * Controla abertura e fechamento do menu em resoluções mobile/tablet
 */
function initMenuResponsivo() {
    const hamburger = document.querySelector('.menu-hamburger');
    const menuLinks = document.querySelector('.menu-links');

    if (hamburger && menuLinks) {
        hamburger.addEventListener('click', () => {
            // Alterna classe de exibição da lista de links
            menuLinks.classList.toggle('active');
            
            // Efeito visual sutil no botão hambúrguer transformando em 'X'
            const spans = hamburger.querySelectorAll('span');
            if(menuLinks.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(6px, 6px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(6px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }
}

/**
 * Simula o envio do formulário de adoção com feedback visual
 */
function initFormularioAdocao() {
    const formAdocao = document.querySelector('form[action="solicitacoes.html"]');
    
    if (formAdocao) {
        formAdocao.addEventListener('submit', (e) => {
            e.preventDefault(); // Interrompe o envio automático para mostrar o aviso primeiro
            
            const btn = formAdocao.querySelector('.btn-enviar-solicitacao');
            
            // Muda o texto do botão para o usuário saber que algo está acontecendo
            btn.innerText = 'Enviando Solicitação...';
            btn.style.opacity = '0.7';
            btn.style.pointerEvents = 'none';

            // Cria um "atraso artificial" de 1.5s para simular o tempo de resposta da internet
            setTimeout(() => {
                alert('✅ Sua solicitação foi enviada com sucesso! O GBEA entrará em contato em breve.');
                window.location.href = 'solicitacoes.html';
            }, 1500);
        });
    }
}

/**
 * Controla a expansão dos filtros na página de listagem (mobile)
 */
function initFiltrosMobile() {
    const btnToggle = document.querySelector('.btn-toggle-filtros');
    const container = document.querySelector('.barra-filtros-container');

    if (btnToggle && container) {
        btnToggle.addEventListener('click', () => {
            container.classList.toggle('active');
        });
    }
}