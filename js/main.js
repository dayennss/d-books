// ===== MAIN.JS - HOMEPAGE FUNCTIONALITY =====

// Global variables
let ebooksData = [];
let currentFilter = 'all';

// DOM elements
const loading = document.getElementById('loading');
const featuredEbooksContainer = document.getElementById('featured-ebooks');
const allEbooksContainer = document.getElementById('all-ebooks');
const filterButtons = document.querySelectorAll('.filter__btn');
const newsletterForm = document.getElementById('newsletter-form');
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

async function initializeApp() {
    try {
        showLoading();
        await loadEbooksData();
        renderFeaturedEbooks();
        renderAllEbooks();
        setupEventListeners();
        hideLoading();
    } catch (error) {
        console.error('Erro ao inicializar aplicação:', error);
        hideLoading();
        showError('Erro ao carregar os e-books. Tente novamente mais tarde.');
    }
}

// ===== DATA LOADING =====
async function loadEbooksData() {
    try {
        const response = await fetch('data/ebooks.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        ebooksData = data.ebooks;
        console.log('D-Books: E-books carregados:', ebooksData.length);
    } catch (error) {
        console.error('Erro ao carregar dados dos e-books:', error);
        console.log('Tentando carregar dados de fallback...');
        
        // Fallback: carrega dados diretamente se o fetch falhar
        try {
            ebooksData = getFallbackEbooksData();
            console.log('D-Books: E-books carregados via fallback:', ebooksData.length);
        } catch (fallbackError) {
            console.error('Erro no fallback:', fallbackError);
            throw error;
        }
    }
}

// ===== FALLBACK DATA =====
function getFallbackEbooksData() {
    // Fallback data - apenas para casos de emergência
    // Em produção, sempre use o arquivo ebooks.json
    return [
        {
            "id": 1,
            "title": "MATURIDADE SENIOR",
            "slug": "maturidade-senior",
            "price": 19.90,
            "originalPrice": 39.90,
            "description": "Desenvolva a maturidade profissional necessária para alcançar o nível sênior.",
            "longDescription": "A maturidade profissional é fundamental para o crescimento na carreira. Neste e-book completo, você descobrirá como desenvolver pensamento estratégico, técnicas de liderança e muito mais.",
            "images": ["maturidade-senior-capa.jpg"],
            "downloadLink": "#",
            "category": "Desenvolvimento Pessoal",
            "tags": ["maturidade", "senior", "carreira", "liderança"],
            "pages": 41,
            "format": "PDF",
            "language": "Português",
            "isFree": false,
            "isFeatured": true,
            "rating": 4.8,
            "reviews": 156
        },
        {
            "id": 2,
            "title": "DO JUNIOR AO PLENO",
            "slug": "do-junior-ao-pleno",
            "price": 19.90,
            "originalPrice": 19.90,
            "description": "EM BREVE",
            "longDescription": "EM BREVE",
            "images": ["do-junior-ao-pleno-capa.jpg"],
            "downloadLink": "#",
            "category": "Desenvolvimento Pessoal",
            "tags": ["maturidade", "pleno", "carreira", "liderança"],
            "pages": 41,
            "format": "PDF",
            "language": "Português",
            "isFree": false,
            "isFeatured": true,
            "rating": 4.8,
            "reviews": 156
        }
    ];
}

// ===== RENDERING FUNCTIONS =====
function renderFeaturedEbooks() {
    if (!featuredEbooksContainer) return;
    
    const featuredEbooks = ebooksData.filter(ebook => ebook.isFeatured);
    
    if (featuredEbooks.length === 0) {
        featuredEbooksContainer.innerHTML = '<p class="no-results">Nenhum e-book em destaque encontrado.</p>';
        return;
    }
    
    featuredEbooksContainer.innerHTML = featuredEbooks
        .map(ebook => createEbookCard(ebook))
        .join('');
}

function renderAllEbooks() {
    if (!allEbooksContainer) return;
    
    const filteredEbooks = currentFilter === 'all' 
        ? ebooksData 
        : ebooksData.filter(ebook => ebook.category === currentFilter);
    
    if (filteredEbooks.length === 0) {
        allEbooksContainer.innerHTML = '<p class="no-results">Nenhum e-book encontrado para esta categoria.</p>';
        return;
    }
    
    allEbooksContainer.innerHTML = filteredEbooks
        .map(ebook => createEbookCard(ebook))
        .join('');
}

function createEbookCard(ebook) {
    const priceHtml = generatePriceHtml(ebook);
    const badgesHtml = generateBadgesHtml(ebook);
    const ratingHtml = generateRatingHtml(ebook);
    
    const comingSoonClass = ebook.isComingSoon ? 'ebook-card--coming-soon' : '';
    const comingSoonBtn = ebook.isComingSoon ? 'EM BREVE' : (ebook.isFree ? 'Baixar Gratuitamente' : 'Ver Detalhes');
    
    return `
        <article class="ebook-card ${comingSoonClass}" data-category="${ebook.category}" data-id="${ebook.id}">
            <div class="ebook-card__image">
                <img src="images/${ebook.images[0]}" 
                     alt="${ebook.title}" 
                     class="ebook-card__img" 
                     loading="lazy"
                     onerror="this.src='data:image/svg+xml;base64,${generatePlaceholderImage(ebook.title)}'">
                ${badgesHtml}
            </div>
            <div class="ebook-card__content">
                <div class="ebook-card__category">${ebook.category}</div>
                <h3 class="ebook-card__title">${ebook.title}</h3>
                <p class="ebook-card__description">${ebook.description}</p>
                <div class="ebook-card__meta">
                    <span class="ebook-card__pages">${ebook.pages} páginas</span>
                    <span class="ebook-card__format">${ebook.format}</span>
                </div>
                <div class="ebook-card__rating">
                    <div class="ebook-card__stars">
                        ${ratingHtml}
                    </div>
                    <span class="ebook-card__reviews">(${ebook.reviews})</span>
                </div>
                <div class="ebook-card__price-container">
                    ${priceHtml}
                </div>
                <a href="ebook.html?slug=${ebook.slug}" class="btn btn--primary ebook-card__btn">
                    ${comingSoonBtn}
                </a>
            </div>
        </article>
    `;
}

function generatePriceHtml(ebook) {
    if (ebook.isFree) {
        return '<span class="ebook-card__price ebook-card__price--free">Gratuito</span>';
    }
    
    if (ebook.originalPrice > ebook.price) {
        const discount = Math.round(((ebook.originalPrice - ebook.price) / ebook.originalPrice) * 100);
        return `
            <span class="ebook-card__price ebook-card__price--discount">R$ ${ebook.price.toFixed(2)}</span>
            <span class="ebook-card__original-price">R$ ${ebook.originalPrice.toFixed(2)}</span>
            <span class="ebook-card__discount-badge">-${discount}% OFF</span>
        `;
    }
    
    return `<span class="ebook-card__price">R$ ${ebook.price.toFixed(2)}</span>`;
}

function generateBadgesHtml(ebook) {
    let badges = '';
    
    if (ebook.isFree) {
        badges += '<span class="ebook-card__badge ebook-card__badge--free">Gratuito</span>';
    }
    
    if (ebook.isFeatured) {
        badges += '<span class="ebook-card__badge ebook-card__badge--featured">Mais Vendido</span>';
    }
    
    if (ebook.isComingSoon) {
        badges += '<span class="ebook-card__badge ebook-card__badge--coming-soon">EM BREVE</span>';
    }
    
    if (ebook.originalPrice > ebook.price) {
        const discount = Math.round(((ebook.originalPrice - ebook.price) / ebook.originalPrice) * 100);
        badges += `<span class="ebook-card__badge ebook-card__badge--discount">-${discount}% OFF</span>`;
    }
    
    return badges;
}

function generateRatingHtml(ebook) {
    const fullStars = Math.floor(ebook.rating);
    const hasHalfStar = ebook.rating % 1 !== 0;
    let stars = '';
    
    // Full stars
    for (let i = 0; i < fullStars; i++) {
        stars += '<span class="star star--full">★</span>';
    }
    
    // Half star
    if (hasHalfStar) {
        stars += '<span class="star star--half">★</span>';
    }
    
    // Empty stars
    const emptyStars = 5 - Math.ceil(ebook.rating);
    for (let i = 0; i < emptyStars; i++) {
        stars += '<span class="star star--empty">★</span>';
    }
    
    return stars;
}

function generatePlaceholderImage(title) {
    const svg = `
        <svg xmlns="http://www.w3.org/2000/svg" width="300" height="400" viewBox="0 0 300 400" fill="none">
            <rect width="300" height="400" fill="#F3F4F6"/>
            <path d="M150 150L120 180H180L150 150Z" fill="#9CA3AF"/>
            <text x="150" y="220" text-anchor="middle" fill="#6B7280" font-family="Arial" font-size="14">E-Book</text>
        </svg>
    `;
    return btoa(svg);
}

// ===== EVENT LISTENERS =====
function setupEventListeners() {
    // Filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', handleFilterClick);
    });
    
    // Newsletter form
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', handleNewsletterSubmit);
    }
    
    // Mobile navigation
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', toggleMobileMenu);
    }
    
    // Close mobile menu when clicking on links
    const navLinks = document.querySelectorAll('.nav__link');
    navLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
            closeMobileMenu();
        }
    });
    
    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', handleSmoothScroll);
    });
}

function handleFilterClick(e) {
    const button = e.currentTarget;
    const category = button.dataset.category;
    
    // Update active button
    filterButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
    
    // Update current filter
    currentFilter = category;
    
    // Re-render e-books
    renderAllEbooks();
    
    // Scroll to e-books section
    const ebooksSection = document.querySelector('.ebooks');
    if (ebooksSection) {
        ebooksSection.scrollIntoView({ behavior: 'smooth' });
    }
}

function handleNewsletterSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const email = formData.get('email') || e.target.querySelector('input[type="email"]').value;
    
    if (!email) {
        showNotification('Por favor, insira um e-mail válido.', 'error');
        return;
    }
    
    // Simulate newsletter subscription
    showNotification('Obrigado por se cadastrar! Você receberá nossas novidades em breve.', 'success');
    e.target.reset();
}

function toggleMobileMenu() {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
}

function closeMobileMenu() {
    navMenu.classList.remove('active');
    navToggle.classList.remove('active');
}

function handleSmoothScroll(e) {
    e.preventDefault();
    
    const targetId = e.currentTarget.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    
    if (targetElement) {
        targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// ===== UTILITY FUNCTIONS =====
function showLoading() {
    if (loading) {
        loading.style.display = 'flex';
    }
}

function hideLoading() {
    if (loading) {
        loading.style.display = 'none';
    }
}

function showError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.innerHTML = `
        <div class="error-message__content">
            <span class="error-message__icon">⚠️</span>
            <p class="error-message__text">${message}</p>
        </div>
    `;
    
    // Add error styles
    errorDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #fee2e2;
        color: #dc2626;
        padding: 1rem;
        border-radius: 0.5rem;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        z-index: 10000;
        max-width: 400px;
        animation: slideInRight 0.3s ease-out;
    `;
    
    document.body.appendChild(errorDiv);
    
    // Remove after 5 seconds
    setTimeout(() => {
        errorDiv.remove();
    }, 5000);
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    
    const colors = {
        success: { bg: '#d1fae5', color: '#065f46', icon: '✅' },
        error: { bg: '#fee2e2', color: '#dc2626', icon: '❌' },
        info: { bg: '#dbeafe', color: '#1e40af', icon: 'ℹ️' }
    };
    
    const config = colors[type] || colors.info;
    
    notification.innerHTML = `
        <div class="notification__content">
            <span class="notification__icon">${config.icon}</span>
            <p class="notification__text">${message}</p>
        </div>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${config.bg};
        color: ${config.color};
        padding: 1rem;
        border-radius: 0.5rem;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        z-index: 10000;
        max-width: 400px;
        animation: slideInRight 0.3s ease-out;
    `;
    
    document.body.appendChild(notification);
    
    // Remove after 4 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-in';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 4000);
}

// ===== ANIMATIONS =====
function addScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe e-book cards
    const ebookCards = document.querySelectorAll('.ebook-card');
    ebookCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(card);
    });
}

// ===== SEARCH FUNCTIONALITY =====
function addSearchFunctionality() {
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Buscar e-books...';
    searchInput.className = 'search-input';
    
    searchInput.style.cssText = `
        width: 100%;
        max-width: 400px;
        padding: 0.75rem 1rem;
        border: 2px solid #e5e7eb;
        border-radius: 0.5rem;
        font-size: 1rem;
        margin: 0 auto 2rem;
        display: block;
        transition: border-color 0.3s ease;
    `;
    
    searchInput.addEventListener('input', handleSearch);
    
    // Add search input to categories section
    const categoriesSection = document.querySelector('.categories .container');
    if (categoriesSection) {
        categoriesSection.appendChild(searchInput);
    }
}

function handleSearch(e) {
    const searchTerm = e.target.value.toLowerCase().trim();
    
    if (searchTerm === '') {
        renderAllEbooks();
        return;
    }
    
    const filteredEbooks = ebooksData.filter(ebook => 
        ebook.title.toLowerCase().includes(searchTerm) ||
        ebook.description.toLowerCase().includes(searchTerm) ||
        ebook.category.toLowerCase().includes(searchTerm) ||
        ebook.tags.some(tag => tag.toLowerCase().includes(searchTerm))
    );
    
    if (allEbooksContainer) {
        if (filteredEbooks.length === 0) {
            allEbooksContainer.innerHTML = '<p class="no-results">Nenhum e-book encontrado para sua busca.</p>';
        } else {
            allEbooksContainer.innerHTML = filteredEbooks
                .map(ebook => createEbookCard(ebook))
                .join('');
        }
    }
}

// ===== PERFORMANCE OPTIMIZATIONS =====
function optimizeImages() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
}

// ===== ANALYTICS & TRACKING =====
function trackEbookView(ebookId, ebookTitle) {
    // Simulate analytics tracking
    console.log(`E-book visualizado: ${ebookTitle} (ID: ${ebookId})`);
    
    // In a real application, you would send this data to your analytics service
    // Example: gtag('event', 'ebook_view', { ebook_id: ebookId, ebook_title: ebookTitle });
}

function trackEbookClick(ebookId, ebookTitle, action) {
    // Simulate analytics tracking
    console.log(`E-book clicado: ${ebookTitle} (ID: ${ebookId}, Ação: ${action})`);
    
    // In a real application, you would send this data to your analytics service
    // Example: gtag('event', 'ebook_click', { ebook_id: ebookId, ebook_title: ebookTitle, action: action });
}

// ===== ACCESSIBILITY ENHANCEMENTS =====
function enhanceAccessibility() {
    // Add keyboard navigation for e-book cards
    const ebookCards = document.querySelectorAll('.ebook-card');
    
    ebookCards.forEach(card => {
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'article');
        
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const link = card.querySelector('.ebook-card__btn');
                if (link) {
                    link.click();
                }
            }
        });
    });
    
    // Add ARIA labels
    const filterButtons = document.querySelectorAll('.filter__btn');
    filterButtons.forEach(button => {
        button.setAttribute('aria-label', `Filtrar por ${button.textContent}`);
    });
}

// ===== ERROR HANDLING =====
window.addEventListener('error', (e) => {
    console.error('Erro JavaScript:', e.error);
    showNotification('Ocorreu um erro inesperado. Tente recarregar a página.', 'error');
});

window.addEventListener('unhandledrejection', (e) => {
    console.error('Promise rejeitada:', e.reason);
    showNotification('Erro ao carregar dados. Verifique sua conexão.', 'error');
});

// ===== INITIALIZATION COMPLETE =====
console.log('D-Books: Aplicação inicializada com sucesso!');

// Export functions for use in other scripts
window.DBooks = {
    loadEbooksData,
    renderAllEbooks,
    createEbookCard,
    showNotification,
    trackEbookView,
    trackEbookClick
};
