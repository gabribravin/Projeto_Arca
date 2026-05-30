/**
 * Lógica de Interface do Usuário - Programa ARCA
 * Controla comportamentos dinâmicos globais e estados responsivos.
 */
document.addEventListener('DOMContentLoaded', () => {
    // O "Cérebro" do site: espera o HTML carregar para ativar as funções
    initMenuResponsivo();
    initFiltrosMobile();
    initFormularioAdocao();
    initFavoritos();
    initDropdowns();
    initNavbarLogin();
    initProtecaoRotas();
    handleLogout();
});

/**
 * Verifica se o usuário está logado e impede ações caso negativo
 */
function checkAccess(e) {
    const logado = localStorage.getItem('usuarioLogado') === 'true';
    
    if (!logado) {
        e.preventDefault();
        e.stopPropagation();
        showModalAcesso();
        return false;
    }
    return true;
}

/**
 * Cria e exibe o modal de acesso personalizado
 */
function showModalAcesso() {
    // Remove modal anterior se existir
    const existing = document.querySelector('.modal-arca-overlay');
    if (existing) existing.remove();

    const modalHtml = `
        <div class="modal-arca-overlay" style="display: flex;">
            <div class="modal-arca-card">
                <span style="font-size: 50px;">🐾</span>
                <h2>Acesso Necessário</h2>
                <p>Para favoritar, adotar ou agendar castrações, você precisa estar conectado à sua conta.</p>
                <div style="display: flex; flex-direction: column; gap: 12px;">
                    <a href="login.html" class="btn-amarelo" style="max-width: 100%;">Já tenho uma conta</a>
                    <a href="cadastro.html" class="btn-escuro" style="max-width: 100%;">Criar meu cadastro</a>
                    <button onclick="this.closest('.modal-arca-overlay').remove()" style="background: none; border: none; color: #888; cursor: pointer; margin-top: 10px; font-size: 14px;">Depois eu faço isso</button>
                </div>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHtml);
    
    // Fecha o modal se clicar fora da caixa branca
    document.querySelector('.modal-arca-overlay').addEventListener('click', function(e) {
        if (e.target === this) this.remove();
    });
}

/**
 * Altera o texto do menu dependendo se o usuário está logado ou não
 */
function initNavbarLogin() {
    // Busca o link que aponta para o perfil ou login no menu
    const perfilLink = document.querySelector('.menu-links a[href="solicitacoes.html"], .menu-links a[href="login.html"]');
    const logado = localStorage.getItem('usuarioLogado') === 'true';

    if (perfilLink) {
        const li = perfilLink.parentElement;

        if (logado) {
            li.classList.add('dropdown');
            perfilLink.innerHTML = 'Olá, Tutor! 🐾';
            perfilLink.href = '#';
            perfilLink.classList.add('dropdown-toggle');

            // Cria o submenu se ele ainda não existir
            if (!li.querySelector('.dropdown-menu')) {
                const subMenu = document.createElement('ul');
                subMenu.className = 'dropdown-menu';
                subMenu.innerHTML = `
                    <li><a href="#">Meu Perfil</a></li>
                    <li><a href="#">Meus Favoritos</a></li>
                    <li><a href="solicitacoes.html">Minhas Solicitações</a></li>
                    <li><a href="#" id="btn-logout" class="logout-link">Sair da Conta</a></li>
                `;
                li.appendChild(subMenu);
            }
        } else {
            li.classList.remove('dropdown');
            perfilLink.innerHTML = 'Login / Cadastro';
            perfilLink.href = 'login.html';
            perfilLink.classList.remove('dropdown-toggle');
            const subMenu = li.querySelector('.dropdown-menu');
            if (subMenu) subMenu.remove();
        }
    }
}

/**
 * Gerencia a saída do usuário do sistema
 */
function handleLogout() {
    document.addEventListener('click', (e) => {
        const btnLogout = e.target.closest('#btn-logout');
        if (btnLogout) {
            e.preventDefault();
            localStorage.removeItem('usuarioLogado'); // Remove a sessão
            window.location.href = 'index.html'; // Redireciona para a home
        }
    });
}

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
                window.location.href = 'sucesso.html';
            }, 1500);
        });
    }
}

/**
 * Protege links de adoção, castração e perfil
 */
function initProtecaoRotas() {
    const linksProtegidos = document.querySelectorAll('a[href="formulario-adocao.html"], a[href="solicitacoes.html"], .dropdown-menu a[href="#"]');
    
    linksProtegidos.forEach(link => {
        link.addEventListener('click', (e) => checkAccess(e));
    });
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

/**
 * Gerencia a funcionalidade de favoritar animais
 */
function initFavoritos() {
    // Usamos delegação de eventos para funcionar também na página de listagem (adocao.html)
    document.addEventListener('click', (e) => {
        const btn = e.target.closest('.btn-favorito');
        if (btn) {
            if (!checkAccess(e)) return;
            btn.classList.toggle('favoritado');
            
            // Troca o emoji dependendo do estado
            if (btn.classList.contains('favoritado')) {
                btn.innerText = '❤️';
            } else {
                btn.innerText = '🤍';
            }
        }
    });
}

/**
 * Controla o comportamento do menu dropdown no mobile
 */
function initDropdowns() {
    // Usamos delegação de eventos para funcionar com menus criados dinamicamente
    document.addEventListener('click', (e) => {
        const toggle = e.target.closest('.dropdown-toggle');
        
        if (toggle && window.innerWidth <= 768) {
            e.preventDefault();
            const dropdown = toggle.parentElement;
            dropdown.classList.toggle('active');
        }
    });
}