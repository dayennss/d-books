// ===== EBOOK.JS - INDIVIDUAL EBOOK PAGE FUNCTIONALITY =====

// Global variables
let currentEbook = null;
let allEbooksData = [];

// DOM elements
const loading = document.getElementById('loading');
const ebookContent = document.getElementById('ebook-content');
const breadcrumbCategory = document.getElementById('breadcrumb-category');
const relatedEbooksContainer = document.getElementById('related-ebooks');

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    initializeEbookPage();
});

async function initializeEbookPage() {
    try {
        showLoading();
        
        // Get slug from URL
        const urlParams = new URLSearchParams(window.location.search);
        const slug = urlParams.get('slug');
        
        if (!slug) {
            redirectTo404();
            return;
        }
        
        // Load e-books data
        await loadEbooksData();
        
        // Find current e-book
        currentEbook = allEbooksData.find(ebook => ebook.slug === slug);
        
        if (!currentEbook) {
            redirectTo404();
            return;
        }
        
        // Render e-book details
        renderEbookDetails();
        renderRelatedEbooks();
        updatePageMeta();
        setupEventListeners();
        
        hideLoading();
        
        // Track page view
        trackEbookView(currentEbook.id, currentEbook.title);
        
    } catch (error) {
        console.error('Erro ao inicializar página do e-book:', error);
        hideLoading();
        redirectTo404();
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
        allEbooksData = data.ebooks;
        console.log('D-Books: E-books carregados:', allEbooksData.length);
    } catch (error) {
        console.error('Erro ao carregar dados dos e-books:', error);
        console.log('Tentando carregar dados de fallback...');
        
        // Fallback: carrega dados diretamente se o fetch falhar
        try {
            allEbooksData = getFallbackEbooksData();
            console.log('D-Books: E-books carregados via fallback:', allEbooksData.length);
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
            "originalPrice": 19.90,
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
        }
    ];
}

// ===== RENDERING FUNCTIONS =====
function renderEbookDetails() {
    if (!ebookContent || !currentEbook) return;
    
    const priceHtml = generatePriceHtml(currentEbook);
    const ratingHtml = generateRatingHtml(currentEbook);
    const featuresHtml = generateFeaturesHtml(currentEbook);
    const tagsHtml = generateTagsHtml(currentEbook);
    
    ebookContent.innerHTML = `
        <div class="ebook-details__image">
            <img src="images/${currentEbook.images[0]}" 
                 alt="${currentEbook.title}" 
                 class="ebook-details__img"
                 onerror="this.src='data:image/svg+xml;base64,${generatePlaceholderImage(currentEbook.title)}'">
        </div>
        
        <div class="ebook-details__info">
            <div class="ebook-details__category">${currentEbook.category}</div>
            <h1 class="ebook-details__title">${currentEbook.title}</h1>
            <p class="ebook-details__description">${currentEbook.longDescription}</p>
            
            <div class="ebook-details__meta">
                <div class="ebook-details__meta-item">
                    <span class="ebook-details__meta-label">Páginas</span>
                    <span class="ebook-details__meta-value">${currentEbook.pages}</span>
                </div>
                <div class="ebook-details__meta-item">
                    <span class="ebook-details__meta-label">Formato</span>
                    <span class="ebook-details__meta-value">${currentEbook.format}</span>
                </div>
                <div class="ebook-details__meta-item">
                    <span class="ebook-details__meta-label">Idioma</span>
                    <span class="ebook-details__meta-value">${currentEbook.language}</span>
                </div>
                <div class="ebook-details__meta-item">
                    <span class="ebook-details__meta-label">Categoria</span>
                    <span class="ebook-details__meta-value">${currentEbook.category}</span>
                </div>
            </div>
            
            <div class="ebook-details__rating">
                <div class="ebook-details__stars">
                    ${ratingHtml}
                </div>
                <span class="ebook-details__rating-text">${currentEbook.rating}</span>
                <span class="ebook-details__reviews">(${currentEbook.reviews} avaliações)</span>
            </div>
            
            <div class="ebook-details__price-container">
                ${priceHtml}
            </div>
            
            <div class="ebook-details__actions">
                <button class="btn btn--primary ebook-details__btn" onclick="handleEbookAction('${currentEbook.slug}', '${currentEbook.isFree ? 'download' : 'purchase'}')">
                    ${currentEbook.isComingSoon ? 'EM BREVE' : (currentEbook.isFree ? 'Baixar Gratuitamente' : 'Comprar Agora')}
                </button>
                <button class="btn btn--secondary ebook-details__btn" onclick="shareEbook('${currentEbook.slug}', '${currentEbook.title}')">
                    <span class="btn__icon">↗</span>
                    Compartilhar
                </button>
            </div>
            
            <div class="ebook-details__guarantee">
                <div class="ebook-details__guarantee-item">
                    <span class="ebook-details__guarantee-icon">✓</span>
                    <span class="ebook-details__guarantee-text">Garantia de 30 dias</span>
                </div>
                <div class="ebook-details__guarantee-item">
                    <span class="ebook-details__guarantee-icon">⚡</span>
                    <span class="ebook-details__guarantee-text">Acesso imediato</span>
                </div>
                <div class="ebook-details__guarantee-item">
                    <span class="ebook-details__guarantee-icon">✓</span>
                    <span class="ebook-details__guarantee-text">Compatível com todos os dispositivos</span>
                </div>
            </div>
            
            <div class="ebook-details__features">
                <h3 class="ebook-details__features-title">O que você vai aprender:</h3>
                <ul class="ebook-details__features-list">
                    ${featuresHtml}
                </ul>
            </div>
            
            <div class="ebook-details__tags">
                ${tagsHtml}
            </div>
        </div>
    `;
    
    // Update breadcrumb
    if (breadcrumbCategory) {
        breadcrumbCategory.textContent = currentEbook.category;
    }
}

function renderRelatedEbooks() {
    if (!relatedEbooksContainer || !currentEbook) return;
    
    // Get related e-books (same category, excluding current)
    const relatedEbooks = allEbooksData
        .filter(ebook => 
            ebook.category === currentEbook.category && 
            ebook.id !== currentEbook.id
        )
        .slice(0, 3); // Show only 3 related e-books
    
    if (relatedEbooks.length === 0) {
        // If no related e-books in same category, show featured e-books
        const featuredEbooks = allEbooksData
            .filter(ebook => ebook.isFeatured && ebook.id !== currentEbook.id)
            .slice(0, 3);
        
        if (featuredEbooks.length > 0) {
            relatedEbooksContainer.innerHTML = featuredEbooks
                .map(ebook => createEbookCard(ebook))
                .join('');
        } else {
            relatedEbooksContainer.innerHTML = '<p class="no-results">Nenhum e-book relacionado encontrado.</p>';
        }
        return;
    }
    
    relatedEbooksContainer.innerHTML = relatedEbooks
        .map(ebook => createEbookCard(ebook))
        .join('');
}

function createEbookCard(ebook) {
    const priceHtml = generatePriceHtml(ebook);
    const badgesHtml = generateBadgesHtml(ebook);
    const ratingHtml = generateRatingHtml(ebook);
    
    return `
        <article class="ebook-card" data-category="${ebook.category}" data-id="${ebook.id}">
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
                    ${ebook.isFree ? 'Baixar Agora' : 'Ver Detalhes'}
                </a>
            </div>
        </article>
    `;
}

// ===== HELPER FUNCTIONS =====
function generatePriceHtml(ebook) {
    if (ebook.isFree) {
        return '<span class="ebook-details__price ebook-details__price--free">Gratuito</span>';
    }
    
    if (ebook.originalPrice > ebook.price) {
        const discount = Math.round(((ebook.originalPrice - ebook.price) / ebook.originalPrice) * 100);
        return `
            <span class="ebook-details__price ebook-details__price--discount">R$ ${ebook.price.toFixed(2)}</span>
            <span class="ebook-details__original-price">R$ ${ebook.originalPrice.toFixed(2)}</span>
            <span class="ebook-details__discount-badge">-${discount}% OFF</span>
        `;
    }
    
    return `<span class="ebook-details__price">R$ ${ebook.price.toFixed(2)}</span>`;
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

function generateFeaturesHtml(ebook) {
    // Extract features from description (simple approach)
    const features = [
        'Conteúdo prático e aplicável',
        'Exemplos reais e casos de uso',
        'Linguagem clara e didática',
        'Formato PDF de alta qualidade',
        'Acesso imediato após compra'
    ];
    
    return features.map(feature => `<li class="ebook-details__features-item">${feature}</li>`).join('');
}

function generateTagsHtml(ebook) {
    return ebook.tags.map(tag => 
        `<span class="ebook-details__tag">${tag}</span>`
    ).join('');
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

// ===== EVENT HANDLERS =====
function handleEbookAction(slug, action) {
    if (!currentEbook) return;
    
    if (currentEbook.isComingSoon) {
        showNotification('Este e-book estará disponível em breve! Cadastre-se na newsletter para ser notificado.', 'info');
        return;
    }
    
    // Track the action
    trackEbookClick(currentEbook.id, currentEbook.title, action);
    
    if (action === 'download') {
        handleDownload();
    } else if (action === 'purchase') {
        handlePurchase();
    }
}

function handleDownload() {
    if (!currentEbook) return;
    
    // Simulate download process
    showNotification('Preparando seu e-book gratuito...', 'info');
    
    setTimeout(() => {
        // In a real application, this would trigger the actual download
        showNotification('Download iniciado! Verifique sua pasta de downloads. Aproveite o conteúdo!', 'success');
        
        // Simulate opening download link
        if (currentEbook.downloadLink && currentEbook.downloadLink !== '#') {
            window.open(currentEbook.downloadLink, '_blank');
        }
    }, 1000);
}

function handlePurchase() {
    if (!currentEbook) return;
    
    // Simulate purchase process
    showNotification('Redirecionando para o pagamento seguro...', 'info');
    
    setTimeout(() => {
        // In a real application, this would redirect to payment gateway
        showNotification('Compra realizada com sucesso! Você receberá o e-book por e-mail em instantes.', 'success');
        
        // Simulate opening purchase link
        if (currentEbook.downloadLink && currentEbook.downloadLink !== '#') {
            window.open(currentEbook.downloadLink, '_blank');
        }
    }, 1000);
}

function shareEbook(slug, title) {
    if (!navigator.share) {
        // Fallback for browsers that don't support Web Share API
        copyToClipboard(`${title} - ${window.location.href}`);
        showNotification('Link copiado para a área de transferência!', 'success');
        return;
    }
    
    navigator.share({
        title: title,
        text: `Confira este e-book: ${title}`,
        url: window.location.href
    }).then(() => {
        showNotification('E-book compartilhado com sucesso!', 'success');
    }).catch((error) => {
        console.error('Erro ao compartilhar:', error);
        copyToClipboard(`${title} - ${window.location.href}`);
        showNotification('Link copiado para a área de transferência!', 'success');
    });
}

function copyToClipboard(text) {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text);
    } else {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
    }
}

// ===== PAGE META UPDATES =====
function updatePageMeta() {
    if (!currentEbook) return;
    
    // Update page title
    document.title = `${currentEbook.title} - D-Books`;
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
        metaDescription.setAttribute('content', currentEbook.description);
    }
    
    // Update Open Graph tags
    updateOpenGraphTags();
    
    // Update Twitter Card tags
    updateTwitterCardTags();
}

function updateOpenGraphTags() {
    if (!currentEbook) return;
    
    const ogTitle = document.querySelector('meta[property="og:title"]');
    const ogDescription = document.querySelector('meta[property="og:description"]');
    const ogImage = document.querySelector('meta[property="og:image"]');
    const ogUrl = document.querySelector('meta[property="og:url"]');
    
    if (ogTitle) ogTitle.setAttribute('content', `${currentEbook.title} - D-Books`);
    if (ogDescription) ogDescription.setAttribute('content', currentEbook.description);
    if (ogImage) ogImage.setAttribute('content', `images/${currentEbook.images[0]}`);
    if (ogUrl) ogUrl.setAttribute('content', window.location.href);
}

function updateTwitterCardTags() {
    if (!currentEbook) return;
    
    const twitterTitle = document.querySelector('meta[property="twitter:title"]');
    const twitterDescription = document.querySelector('meta[property="twitter:description"]');
    const twitterImage = document.querySelector('meta[property="twitter:image"]');
    const twitterUrl = document.querySelector('meta[property="twitter:url"]');
    
    if (twitterTitle) twitterTitle.setAttribute('content', `${currentEbook.title} - D-Books`);
    if (twitterDescription) twitterDescription.setAttribute('content', currentEbook.description);
    if (twitterImage) twitterImage.setAttribute('content', `images/${currentEbook.images[0]}`);
    if (twitterUrl) twitterUrl.setAttribute('content', window.location.href);
}

// ===== EVENT LISTENERS =====
function setupEventListeners() {
    // Mobile navigation
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
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
        if (navMenu && !navMenu.contains(e.target) && !navToggle.contains(e.target)) {
            closeMobileMenu();
        }
    });
    
    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', handleSmoothScroll);
    });
    
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
}

function toggleMobileMenu() {
    const navMenu = document.getElementById('nav-menu');
    const navToggle = document.getElementById('nav-toggle');
    
    if (navMenu && navToggle) {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    }
}

function closeMobileMenu() {
    const navMenu = document.getElementById('nav-menu');
    const navToggle = document.getElementById('nav-toggle');
    
    if (navMenu && navToggle) {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    }
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

function redirectTo404() {
    window.location.href = '404.html';
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
console.log('D-Books: Página do e-book inicializada com sucesso!');

// Export functions for use in other scripts
window.DBooksEbook = {
    loadEbooksData,
    renderEbookDetails,
    createEbookCard,
    showNotification,
    trackEbookView,
    trackEbookClick
};
