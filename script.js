// Configurações da landing page
const CONFIG = {
    // Informações do eBook
    ebook: {
        title: "MENTALIDADE SÊNIOR",
        subtitle: "Transforme sua Carreira na Tecnologia",
        price: {
            original: 97,
            current: 47,
            discount: 52
        },
        features: [
            "eBook completo 'MENTALIDADE SÊNIOR' (PDF)",
            "Checklist de implementação prática",
            "Templates de planejamento de carreira",
            "Acesso ao grupo exclusivo no Telegram",
            "Suporte por 30 dias",
            "Atualizações futuras gratuitas"
        ]
    },
    
    // Configurações de urgência
    urgency: {
        enabled: true,
        endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 dias a partir de agora
        message: "Oferta válida por tempo limitado!"
    },
    
    // Links de compra
    purchase: {
        primary: "#", // Substitua pela URL real de compra
        secondary: "#" // Link para mais informações
    },
    
    // Configurações de animação
    animations: {
        enabled: true,
        duration: 600,
        delay: 100
    }
};

// Inicialização quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    initializeLandingPage();
});

// Função principal de inicialização
function initializeLandingPage() {
    setupNavigation();
    setupCountdown();
    setupFAQ();
    setupAnimations();
    setupPurchaseButtons();
    setupNewsletter();
    setupScrollEffects();
    setupMobileMenu();
}

// Configuração do menu de navegação
function setupNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
        
        // Fechar menu ao clicar em um link
        const navLinks = document.querySelectorAll('.nav-menu a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });
    }
    
    // Efeito de scroll no header
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = 'none';
        }
    });
}

// Configuração do countdown
function setupCountdown() {
    if (!CONFIG.urgency.enabled) return;
    
    const countdownElement = document.getElementById('countdown');
    if (!countdownElement) return;
    
    const endDate = CONFIG.urgency.endDate;
    
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = endDate.getTime() - now;
        
        if (distance < 0) {
            countdownElement.innerHTML = '<div class="countdown-expired">Oferta expirada!</div>';
            return;
        }
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        document.getElementById('days').textContent = days.toString().padStart(2, '0');
        document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
    }
    
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// Configuração do FAQ
function setupFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            const isActive = item.classList.contains('active');
            
            // Fechar todos os outros itens
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle do item atual
            item.classList.toggle('active', !isActive);
        });
    });
}

// Configuração das animações
function setupAnimations() {
    if (!CONFIG.animations.enabled) return;
    
    // Intersection Observer para animações de entrada
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Elementos para animar
    const animatedElements = document.querySelectorAll(
        '.hero-content, .benefit-card, .testimonial, .stat-item, .faq-item'
    );
    
    animatedElements.forEach((element, index) => {
        element.style.animationDelay = `${index * CONFIG.animations.delay}ms`;
        observer.observe(element);
    });
}

// Configuração dos botões de compra
function setupPurchaseButtons() {
    const buyButtons = document.querySelectorAll('#buy-button, .btn-primary[href="#comprar"]');
    
    buyButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Adicionar estado de loading
            button.classList.add('loading');
            button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Redirecionando...';
            
            // Simular redirecionamento (substitua pela URL real)
            setTimeout(() => {
                // window.location.href = CONFIG.purchase.primary;
                console.log('Redirecionando para:', CONFIG.purchase.primary);
                
                // Remover loading após 2 segundos
                setTimeout(() => {
                    button.classList.remove('loading');
                    button.innerHTML = '<i class="fas fa-shopping-cart"></i> Comprar Agora - R$ 47,00';
                }, 2000);
            }, 1000);
        });
    });
}

// Configuração do newsletter
function setupNewsletter() {
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = this.querySelector('input[type="email"]').value;
            const button = this.querySelector('button');
            
            if (!isValidEmail(email)) {
                showNotification('Por favor, insira um email válido.', 'error');
                return;
            }
            
            // Simular envio
            button.textContent = 'Enviando...';
            button.disabled = true;
            
            setTimeout(() => {
                showNotification('Obrigado! Você foi inscrito com sucesso.', 'success');
                this.reset();
                button.textContent = 'Inscrever';
                button.disabled = false;
            }, 1500);
        });
    }
}

// Configuração dos efeitos de scroll
function setupScrollEffects() {
    // Parallax suave no hero
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        
        if (hero) {
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
    
    // Botão de voltar ao topo
    createBackToTopButton();
}

// Criar botão de voltar ao topo
function createBackToTopButton() {
    const backToTop = document.createElement('button');
    backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTop.className = 'back-to-top';
    backToTop.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        background: var(--primary-color);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
    `;
    
    document.body.appendChild(backToTop);
    
    // Mostrar/ocultar botão baseado no scroll
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTop.style.opacity = '1';
            backToTop.style.visibility = 'visible';
        } else {
            backToTop.style.opacity = '0';
            backToTop.style.visibility = 'hidden';
        }
    });
    
    // Funcionalidade do botão
    backToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Configuração do menu mobile
function setupMobileMenu() {
    // Fechar menu ao clicar fora
    document.addEventListener('click', function(e) {
        const navMenu = document.querySelector('.nav-menu');
        const navToggle = document.querySelector('.nav-toggle');
        
        if (navMenu && navToggle && !navMenu.contains(e.target) && !navToggle.contains(e.target)) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
    });
}

// Utilitários
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showNotification(message, type = 'info') {
    // Remover notificação existente
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Criar nova notificação
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    `;
    
    // Cores baseadas no tipo
    const colors = {
        success: '#10b981',
        error: '#ef4444',
        info: '#3b82f6',
        warning: '#f59e0b'
    };
    
    notification.style.background = colors[type] || colors.info;
    
    document.body.appendChild(notification);
    
    // Animar entrada
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remover após 5 segundos
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 5000);
}

// Função para atualizar preços dinamicamente
function updatePricing(originalPrice, currentPrice) {
    const discount = Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
    
    // Atualizar elementos na página
    const priceOriginal = document.querySelector('.price-original span');
    const priceCurrent = document.querySelector('.amount');
    const priceDiscount = document.querySelector('.price-discount span');
    
    if (priceOriginal) priceOriginal.textContent = `De: R$ ${originalPrice},00`;
    if (priceCurrent) priceCurrent.textContent = currentPrice;
    if (priceDiscount) priceDiscount.textContent = `${discount}% de desconto`;
}

// Função para atualizar informações do eBook
function updateEbookInfo(title, subtitle) {
    const ebookTitle = document.querySelector('.ebook-cover h3');
    const ebookSubtitle = document.querySelector('.ebook-cover p');
    
    if (ebookTitle) ebookTitle.textContent = title;
    if (ebookSubtitle) ebookSubtitle.textContent = subtitle;
}

// Função para configurar links de compra
function setPurchaseLinks(primaryLink, secondaryLink) {
    CONFIG.purchase.primary = primaryLink;
    CONFIG.purchase.secondary = secondaryLink;
    
    // Atualizar botões na página
    const buyButtons = document.querySelectorAll('#buy-button, .btn-primary[href="#comprar"]');
    buyButtons.forEach(button => {
        button.setAttribute('data-href', primaryLink);
    });
}

// Função para configurar data de expiração da oferta
function setOfferExpiration(daysFromNow) {
    CONFIG.urgency.endDate = new Date(Date.now() + daysFromNow * 24 * 60 * 60 * 1000);
    setupCountdown(); // Reinicializar countdown
}

// Função para adicionar novo depoimento
function addTestimonial(content, author, position) {
    const testimonialsContainer = document.querySelector('.testimonials');
    if (!testimonialsContainer) return;
    
    const testimonialHTML = `
        <div class="testimonial">
            <div class="testimonial-content">
                <p>"${content}"</p>
            </div>
            <div class="testimonial-author">
                <div class="author-avatar">
                    <i class="fas fa-user"></i>
                </div>
                <div class="author-info">
                    <h4>${author}</h4>
                    <p>${position}</p>
                </div>
            </div>
        </div>
    `;
    
    testimonialsContainer.insertAdjacentHTML('beforeend', testimonialHTML);
}

// Função para adicionar nova pergunta ao FAQ
function addFAQItem(question, answer) {
    const faqContainer = document.querySelector('.faq-list');
    if (!faqContainer) return;
    
    const faqHTML = `
        <div class="faq-item">
            <div class="faq-question">
                <h3>${question}</h3>
                <i class="fas fa-chevron-down"></i>
            </div>
            <div class="faq-answer">
                <p>${answer}</p>
            </div>
        </div>
    `;
    
    faqContainer.insertAdjacentHTML('beforeend', faqHTML);
    
    // Reconfigurar FAQ para o novo item
    setupFAQ();
}

// Função para configurar analytics/tracking
function setupAnalytics() {
    // Exemplo de configuração para Google Analytics
    // gtag('config', 'GA_MEASUREMENT_ID');
    
    // Tracking de eventos de conversão
    const buyButtons = document.querySelectorAll('#buy-button, .btn-primary[href="#comprar"]');
    buyButtons.forEach(button => {
        button.addEventListener('click', function() {
            // gtag('event', 'purchase_click', {
            //     'event_category': 'engagement',
            //     'event_label': 'buy_button_click'
            // });
            console.log('Purchase button clicked - Analytics event fired');
        });
    });
}

// Função para otimização de performance
function optimizePerformance() {
    // Lazy loading para imagens
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
    
    // Preload de recursos críticos
    const criticalResources = [
        'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap',
        'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css'
    ];
    
    criticalResources.forEach(resource => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = resource;
        link.as = 'style';
        document.head.appendChild(link);
    });
}

// Inicializar otimizações quando a página carregar
window.addEventListener('load', function() {
    optimizePerformance();
    setupAnalytics();
});

// Exportar funções para uso externo (se necessário)
window.LandingPage = {
    updatePricing,
    updateEbookInfo,
    setPurchaseLinks,
    setOfferExpiration,
    addTestimonial,
    addFAQItem,
    showNotification
};
