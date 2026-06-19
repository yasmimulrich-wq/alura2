// Script para atualizar dados e interatividade do website

// Dados simulados de mercado
const dadosMercado = {
    ibovespa: { valor: 133500, variacao: 2.5, tendencia: 'alta' },
    dolar: { valor: 4.95, variacao: -1.2, tendencia: 'baixa' },
    ouro: { valor: 2150, variacao: 0.8, tendencia: 'alta' },
    bitcoin: { valor: 65000, variacao: 3.5, tendencia: 'alta' }
};

// Atualizar informações de mercado
function atualizarDados() {
    // Ibovespa
    const ibovElement = document.getElementById('ibov');
    if (ibovElement) {
        const seta = dadosMercado.ibovespa.tendencia === 'alta' ? '↗' : '↘';
        const cor = dadosMercado.ibovespa.variacao > 0 ? '#00cc99' : '#ff4444';
        ibovElement.textContent = `${seta} ${Math.abs(dadosMercado.ibovespa.variacao)}%`;
        ibovElement.style.color = cor;
    }

    // Dólar
    const dolarElement = document.getElementById('dolar');
    if (dolarElement) {
        const seta = dadosMercado.dolar.tendencia === 'alta' ? '↗' : '↘';
        const cor = dadosMercado.dolar.variacao > 0 ? '#ff4444' : '#00cc99';
        dolarElement.textContent = `${seta} ${Math.abs(dadosMercado.dolar.variacao)}%`;
        dolarElement.style.color = cor;
    }

    // Ouro
    const ouroElement = document.getElementById('ouro');
    if (ouroElement) {
        const seta = dadosMercado.ouro.tendencia === 'alta' ? '↗' : '↘';
        const cor = dadosMercado.ouro.variacao > 0 ? '#00cc99' : '#ff4444';
        ouroElement.textContent = `${seta} ${Math.abs(dadosMercado.ouro.variacao)}%`;
        ouroElement.style.color = cor;
    }

    // Crypto
    const cryptoElement = document.getElementById('crypto');
    if (cryptoElement) {
        const seta = dadosMercado.bitcoin.tendencia === 'alta' ? '↗' : '↘';
        const cor = dadosMercado.bitcoin.variacao > 0 ? '#00cc99' : '#ff4444';
        cryptoElement.textContent = `${seta} ${Math.abs(dadosMercado.bitcoin.variacao)}%`;
        cryptoElement.style.color = cor;
    }
}

// Animação de números flutuantes
function animarNumeros() {
    const cards = document.querySelectorAll('.card .valor');
    cards.forEach(card => {
        card.style.animation = 'pulse 2s ease-in-out infinite';
    });
}

// Adicionar efeitos de hover nos cards
function adicionarEfeitosHover() {
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.borderColor = '#0066cc';
            this.style.boxShadow = '0 6px 12px rgba(0, 102, 204, 0.3)';
        });
        card.addEventListener('mouseleave', function() {
            this.style.borderColor = '#2a2f38';
            this.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.3)';
        });
    });
}

// Simular atualização de dados em tempo real
function simularAtualizacaoTempo() {
    setInterval(() => {
        // Simular variações aleatórias pequenas
        const chaves = Object.keys(dadosMercado);
        const chaveAleatoria = chaves[Math.floor(Math.random() * chaves.length)];
        const variacao = (Math.random() - 0.5) * 2;
        
        dadosMercado[chaveAleatoria].variacao += variacao;
        dadosMercado[chaveAleatoria].tendencia = dadosMercado[chaveAleatoria].variacao > 0 ? 'alta' : 'baixa';
        
        atualizarDados();
    }, 5000); // Atualiza a cada 5 segundos
}

// Scroll suave para links de navegação
function ativarScrollSuave() {
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

// Adicionar classe ativa ao link de navegação atual
function atualizarNavAtiva() {
    const secoes = document.querySelectorAll('section');
    const links = document.querySelectorAll('.nav a');
    
    window.addEventListener('scroll', () => {
        let current = '';
        secoes.forEach(secao => {
            const sectionTop = secao.offsetTop;
            if (pageYOffset >= sectionTop - 60) {
                current = secao.getAttribute('id');
            }
        });
        
        links.forEach(link => {
            link.classList.remove('ativo');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('ativo');
            }
        });
    });
}

// Inicializar tudo quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Website Mercado Financeiro carregado com sucesso!');
    
    atualizarDados();
    animarNumeros();
    adicionarEfeitosHover();
    simularAtualizacaoTempo();
    ativarScrollSuave();
    atualizarNavAtiva();
    
    // Log de carregamento
    console.log('✅ Todos os módulos inicializados');
});

// Adicionar estilos de animação dinamicamente
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0%, 100% {
            opacity: 1;
        }
        50% {
            opacity: 0.7;
        }
    }
    
    .nav a.ativo {
        color: #0066cc;
        border-bottom: 2px solid #0066cc;
    }
    
    @media (max-width: 768px) {
        .nav ul {
            gap: 0.5rem;
        }
    }
`;
document.head.appendChild(style);