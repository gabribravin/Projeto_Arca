/**
 * Lógica de Interface do Usuário - Programa ARCA
 * Controla comportamentos dinâmicos globais e estados responsivos.
 */
document.addEventListener('DOMContentLoaded', () => {
    // Inicialização da escuta do menu responsivo hambúrguer
    initMenuResponsivo();
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