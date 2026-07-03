// ============================================
// JAVASCRIPT - Funcionalidades Interativas
// ============================================

// 1. MENU MOBILE RESPONSIVO
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

// Abre/fecha o menu mobile ao clicar no hamburger
hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Fecha o menu ao clicar em um link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// ============================================
// 2. SCROLL SUAVE ENTRE SEÇÕES
// ============================================

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
        // Fecha menu se estiver aberto
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    }
}

// ============================================
// 3. BOTÃO SCROLL TO TOP
// ============================================

const scrollTopBtn = document.getElementById('scrollTopBtn');

// Mostra/esconde o botão conforme scroll
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollTopBtn.classList.add('show');
    } else {
        scrollTopBtn.classList.remove('show');
    }
});

// Voltar ao topo ao clicar
scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ============================================
// 4. VALIDAÇÃO E ENVIO DE FORMULÁRIO DE CONTATO
// ============================================

const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Obtém valores do formulário
    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();
    const assunto = document.getElementById('assunto').value.trim();
    const mensagem = document.getElementById('mensagem').value.trim();

    // Validação básica
    if (!nome || !email || !assunto || !mensagem) {
        exibirAlerta('Por favor, preencha todos os campos!', 'erro');
        return;
    }

    // Validação de email
    if (!validarEmail(email)) {
        exibirAlerta('Por favor, insira um email válido!', 'erro');
        return;
    }

    // Se tudo está correto, exibe mensagem de sucesso
    exibirAlerta('Mensagem enviada com sucesso! Em breve entraremos em contato.', 'sucesso');

    // Limpa o formulário
    contactForm.reset();

    // Aqui você poderia enviar os dados para um servidor
    console.log({
        nome: nome,
        email: email,
        assunto: assunto,
        mensagem: mensagem,
        data: new Date().toLocaleString('pt-BR')
    });
});

// ============================================
// 5. FUNÇÃO DE VALIDAÇÃO DE EMAIL
// ============================================

function validarEmail(email) {
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regexEmail.test(email);
}

// ============================================
// 6. FUNÇÃO DE ALERTA PERSONALIZADO
// ============================================

function exibirAlerta(mensagem, tipo) {
    // Remove alertas anteriores
    const alertaAnterior = document.querySelector('.alerta');
    if (alertaAnterior) {
        alertaAnterior.remove();
    }

    // Cria novo alerta
    const alerta = document.createElement('div');
    alerta.className = `alerta alerta-${tipo}`;
    alerta.textContent = mensagem;

    // Adiciona estilos ao alerta
    alerta.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 5px;
        z-index: 1000;
        animation: slideInRight 0.3s ease;
        font-weight: 600;
        max-width: 400px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    `;

    // Define cores baseado no tipo
    if (tipo === 'sucesso') {
        alerta.style.backgroundColor = '#10b981';
        alerta.style.color = 'white';
    } else if (tipo === 'erro') {
        alerta.style.backgroundColor = '#ef4444';
        alerta.style.color = 'white';
    }

    // Adiciona à página
    document.body.appendChild(alerta);

    // Remove após 4 segundos
    setTimeout(() => {
        alerta.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => alerta.remove(), 300);
    }, 4000);
}

// ============================================
// 7. NEWSLETTER FORM
// ============================================

const newsletterForm = document.getElementById('newsletterForm');

if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const emailInput = newsletterForm.querySelector('input[type="email"]');
        const email = emailInput.value.trim();

        if (!email || !validarEmail(email)) {
            exibirAlerta('Por favor, insira um email válido!', 'erro');
            return;
        }

        exibirAlerta('Inscrição realizada com sucesso! Obrigada por se inscrever.', 'sucesso');
        emailInput.value = '';

        console.log('Newsletter inscrito:', {
            email: email,
            data: new Date().toLocaleString('pt-BR')
        });
    });
}

// ============================================
// 8. EFEITO DE FADE IN AO SCROLL
// ============================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeIn 0.6s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observa todos os elementos de seção
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    observer.observe(section);
});

// ============================================
// 9. CONTADOR DE ANIMAÇÃO (OPCIONAL)
// ============================================

function animarNumero(elemento, alvo, duracao = 2000) {
    let inicio = 0;
    const incremento = alvo / (duracao / 16);
    let atual = inicio;

    const timer = setInterval(() => {
        atual += incremento;
        if (atual >= alvo) {
            elemento.textContent = alvo;
            clearInterval(timer);
        } else {
            elemento.textContent = Math.floor(atual);
        }
    }, 16);
}

// ============================================
// 10. MODO ESCURO (OPCIONAL)
// ============================================

function ativarModoEscuro() {
    const htmlElement = document.documentElement;
    const temaAtual = localStorage.getItem('tema') || 'claro';

    if (temaAtual === 'claro') {
        htmlElement.style.colorScheme = 'dark';
        document.body.style.backgroundColor = '#1f2937';
        document.body.style.color = '#f3f4f6';
        localStorage.setItem('tema', 'escuro');
    } else {
        htmlElement.style.colorScheme = 'light';
        document.body.style.backgroundColor = '#ffffff';
        document.body.style.color = '#374151';
        localStorage.setItem('tema', 'claro');
    }
}

// Aplica o tema salvo ao carregar
document.addEventListener('DOMContentLoaded', () => {
    const temaSalvo = localStorage.getItem('tema') || 'claro';
    if (temaSalvo === 'escuro') {
        document.documentElement.style.colorScheme = 'dark';
        document.body.style.backgroundColor = '#1f2937';
        document.body.style.color = '#f3f4f6';
    }
});

// ============================================
// 11. LOG DE CARREGAMENTO
// ============================================

console.log('%c🚀 Portfólio Digital Carregado!', 'color: #6366f1; font-size: 16px; font-weight: bold;');
console.log('%cDesenvolvido com ❤️ por Ana Júlia', 'color: #ec4899; font-size: 12px;');

// ============================================
// 12. FUNÇÃO DE INICIALIZAÇÃO
// ============================================

function inicializarPagina() {
    console.log('✅ Página iniciada com sucesso');
    
    // Verifica se todos os elementos principais existem
    const elementosObrigatorios = [
        'contactForm',
        'scrollTopBtn',
        'newsletterForm'
    ];

    elementosObrigatorios.forEach(id => {
        if (document.getElementById(id)) {
            console.log(`✓ ${id} carregado`);
        } else {
            console.warn(`⚠ ${id} não encontrado`);
        }
    });
}

// Executa a inicialização quando o DOM estiver pronto
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inicializarPagina);
} else {
    inicializarPagina();
}

// ============================================
// FIM DO SCRIPT
// ============================================
