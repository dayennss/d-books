// Arquivo de configuração para facilitar futuras adaptações da landing page
// Este arquivo centraliza todas as configurações que podem ser facilmente modificadas

const LANDING_PAGE_CONFIG = {
    // ========================================
    // INFORMAÇÕES BÁSICAS DO BLOG
    // ========================================
    blog: {
        name: "D-BOOKS",
        tagline: "Transforme sua Mentalidade para Alavancar sua Carreira na Tecnologia",
        description: "Blog especializado em eBooks para desenvolvedores que querem evoluir profissionalmente",
        url: "https://d-books.com",
        email: "contato@d-books.com",
        phone: "+55 (11) 99999-9999"
    },

    // ========================================
    // INFORMAÇÕES DO EBOOK ATUAL
    // ========================================
    currentEbook: {
        title: "MENTALIDADE SÊNIOR",
        subtitle: "Transforme sua Carreira na Tecnologia",
        description: "Um guia completo para desenvolvedores que querem evoluir profissionalmente e desenvolver a mentalidade estratégica necessária para o mercado de trabalho.",
        
        // Preços e ofertas
        pricing: {
            originalPrice: 49.90,
            currentPrice: 19.90,
            currency: "BRL",
            discountPercentage: 60
        },
        
        // Características do produto
        features: [
            "eBook completo 'MENTALIDADE SÊNIOR' (PDF)",
            "Checklist de implementação prática",
            "Templates de planejamento de carreira",
            "Acesso ao grupo exclusivo no Telegram",
            "Suporte por 30 dias",
            "Atualizações futuras gratuitas"
        ],
        
        // Benefícios principais
        benefits: [
            {
                icon: "fas fa-brain",
                title: "Mentalidade Estratégica",
                description: "Desenvolva uma abordagem sistemática para resolver problemas complexos e tomar decisões assertivas."
            },
            {
                icon: "fas fa-chart-line",
                title: "Gestão de Carreira",
                description: "Aprenda a planejar e executar estratégias para acelerar seu crescimento profissional na tecnologia."
            },
            {
                icon: "fas fa-users",
                title: "Liderança Técnica",
                description: "Desenvolva habilidades de liderança e comunicação para se tornar referência em sua equipe."
            },
            {
                icon: "fas fa-rocket",
                title: "Adaptabilidade",
                description: "Prepare-se para mudanças constantes e mantenha-se sempre relevante no mercado tecnológico."
            }
        ],
        
        // Problemas que resolve
        problems: [
            "Insegurança ao enfrentar novos desafios técnicos",
            "Dificuldade para se destacar no mercado competitivo",
            "Bloqueios mentais que impedem o crescimento",
            "Falta de estratégia para gestão de carreira",
            "Dificuldade de adaptação às mudanças tecnológicas"
        ],
        
        // Soluções oferecidas
        solutions: [
            "Mentalidade estratégica para enfrentar qualquer desafio",
            "Confiança para se posicionar como especialista",
            "Ferramentas práticas para superar bloqueios",
            "Plano de ação para acelerar sua carreira",
            "Adaptabilidade para mudanças constantes"
        ]
    },

    // ========================================
    // CONFIGURAÇÕES DE URGÊNCIA E ESCASSEZ
    // ========================================
    urgency: {
        enabled: true,
        endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 dias a partir de agora
        message: "Oferta válida por tempo limitado!",
        stockMessage: "Últimas cópias disponíveis!",
        limitedTime: true
    },

    // ========================================
    // LINKS E INTEGRAÇÕES
    // ========================================
    links: {
        // Links de compra
        purchase: {
            primary: "#", // URL principal de compra (ex: checkout)
            secondary: "#", // Link alternativo (ex: mais informações)
            paymentProcessor: "stripe" // ou "paypal", "pagseguro", etc.
        },
        
        // Links sociais
        social: {
            linkedin: "#",
            twitter: "#",
            github: "#",
            instagram: "#",
            youtube: "#"
        },
        
        // Links de navegação
        navigation: {
            home: "#home",
            about: "#sobre-ebook",
            blog: "#blog",
            contact: "#contato",
            faq: "#faq"
        }
    },

    // ========================================
    // TESTEMONIAIS E PROVAS SOCIAIS
    // ========================================
    testimonials: [
        {
            content: "Este eBook mudou completamente minha perspectiva sobre carreira. Em 3 meses consegui uma promoção e aumento de 40% no salário. A mentalidade estratégica faz toda a diferença!",
            author: "Carlos Silva",
            position: "Desenvolvedor Sênior - TechCorp",
            avatar: "fas fa-user"
        },
        {
            content: "Finalmente entendi como me posicionar como especialista. As técnicas de liderança técnica me ajudaram a liderar projetos complexos com confiança. Recomendo para qualquer dev que quer crescer!",
            author: "Ana Santos",
            position: "Tech Lead - StartupXYZ",
            avatar: "fas fa-user"
        },
        {
            content: "Os conceitos de adaptabilidade me salvaram durante uma grande mudança na empresa. Consegui me reposicionar rapidamente e até ganhei novas responsabilidades. Vale cada centavo!",
            author: "Roberto Lima",
            position: "Arquiteto de Software - BigTech",
            avatar: "fas fa-user"
        }
    ],

    // ========================================
    // ESTATÍSTICAS DE SUCESSO
    // ========================================
    stats: {
        hero: [
            { number: "500+", label: "Desenvolvedores Transformados" },
            { number: "95%", label: "Taxa de Satisfação" },
            { number: "30 dias", label: "Garantia Total" }
        ],
        socialProof: [
            { number: "87%", label: "Conseguiram promoção em 6 meses" },
            { number: "+R$ 15k", label: "Aumento médio de salário" },
            { number: "92%", label: "Recomendariam para colegas" }
        ]
    },

    // ========================================
    // FAQ (PERGUNTAS FREQUENTES)
    // ========================================
    faq: [
        {
            question: "Qual é o conteúdo do eBook?",
            answer: "O eBook 'MENTALIDADE SÊNIOR' contém 8 capítulos que abordam desde a transformação da mentalidade até estratégias práticas de carreira, incluindo técnicas de liderança técnica, gestão de projetos e adaptabilidade às mudanças do mercado."
        },
        {
            question: "Como posso aplicar os conceitos no meu dia a dia?",
            answer: "Cada capítulo inclui exercícios práticos e um checklist de implementação. Além disso, você terá acesso a templates prontos para usar e um grupo de suporte para tirar dúvidas e compartilhar experiências."
        },
        {
            question: "Qual a diferença entre este eBook e outros materiais similares?",
            answer: "Este eBook foi criado especificamente para desenvolvedores, com exemplos reais do mercado de tecnologia. Foca na mentalidade estratégica e não apenas em técnicas, oferecendo uma abordagem holística para o crescimento profissional."
        },
        {
            question: "Há suporte após a compra?",
            answer: "Sim! Você terá 30 dias de suporte direto via email e acesso ao grupo exclusivo no Telegram, onde pode interagir com outros desenvolvedores e tirar dúvidas sobre a implementação dos conceitos."
        },
        {
            question: "Posso devolver se não ficar satisfeito?",
            answer: "Oferecemos garantia total de 30 dias. Se por qualquer motivo não ficar satisfeito com o conteúdo, devolvemos 100% do seu dinheiro, sem perguntas."
        }
    ],

    // ========================================
    // CONFIGURAÇÕES DE DESIGN
    // ========================================
    design: {
        // Cores principais
        colors: {
            primary: "#2563eb",
            primaryDark: "#1d4ed8",
            secondary: "#f59e0b",
            accent: "#10b981",
            success: "#10b981",
            error: "#ef4444",
            warning: "#f59e0b"
        },
        
        // Tipografia
        typography: {
            fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
            headingFont: "'Inter', sans-serif"
        },
        
        // Animações
        animations: {
            enabled: true,
            duration: 600,
            delay: 100
        }
    },

    // ========================================
    // CONFIGURAÇÕES DE SEO
    // ========================================
    seo: {
        title: "MENTALIDADE SÊNIOR - Transforme sua Carreira na Tecnologia",
        description: "Transforme sua mentalidade para alavancar sua carreira na tecnologia. eBook MENTALIDADE SÊNIOR - Prepare-se para o mercado de trabalho com a mentalidade certa.",
        keywords: [
            "mentalidade para desenvolvedores",
            "carreira na tecnologia",
            "eBook para desenvolvedores sêniores",
            "desenvolvimento profissional",
            "tecnologia",
            "programação",
            "carreira tech"
        ],
        
        // Open Graph
        openGraph: {
            title: "MENTALIDADE SÊNIOR - Transforme sua Carreira na Tecnologia",
            description: "Prepare-se para o mercado de trabalho com a mentalidade certa. eBook exclusivo para desenvolvedores que querem alavancar sua carreira.",
            image: "https://d-books.com/assets/mentalidade-senior-og.jpg",
            url: "https://d-books.com/mentalidade-senior"
        },
        
        // Twitter Card
        twitter: {
            card: "summary_large_image",
            title: "MENTALIDADE SÊNIOR - Transforme sua Carreira na Tecnologia",
            description: "Prepare-se para o mercado de trabalho com a mentalidade certa. eBook exclusivo para desenvolvedores que querem alavancar sua carreira.",
            image: "https://d-books.com/assets/mentalidade-senior-og.jpg"
        }
    },

    // ========================================
    // CONFIGURAÇÕES DE ANALYTICS
    // ========================================
    analytics: {
        googleAnalytics: {
            enabled: false,
            trackingId: "GA_MEASUREMENT_ID" // Substitua pelo ID real
        },
        
        facebookPixel: {
            enabled: false,
            pixelId: "FACEBOOK_PIXEL_ID" // Substitua pelo ID real
        },
        
        // Eventos personalizados
        events: {
            purchaseClick: "purchase_click",
            newsletterSignup: "newsletter_signup",
            faqOpen: "faq_open",
            testimonialView: "testimonial_view"
        }
    },

    // ========================================
    // CONFIGURAÇÕES DE PERFORMANCE
    // ========================================
    performance: {
        lazyLoading: true,
        imageOptimization: true,
        minifyCSS: true,
        minifyJS: true,
        cacheControl: true
    },

    // ========================================
    // CONFIGURAÇÕES DE GARANTIA
    // ========================================
    guarantee: {
        enabled: true,
        days: 30,
        message: "Garantia de 30 dias ou seu dinheiro de volta",
        terms: "Se por qualquer motivo não ficar satisfeito com o conteúdo, devolvemos 100% do seu dinheiro, sem perguntas."
    },

    // ========================================
    // CONFIGURAÇÕES DE NEWSLETTER
    // ========================================
    newsletter: {
        enabled: true,
        title: "Newsletter",
        description: "Receba dicas exclusivas sobre carreira em tecnologia",
        placeholder: "Seu melhor email",
        buttonText: "Inscrever",
        successMessage: "Obrigado! Você foi inscrito com sucesso.",
        errorMessage: "Por favor, insira um email válido."
    }
};

// ========================================
// FUNÇÕES UTILITÁRIAS PARA CONFIGURAÇÃO
// ========================================

// Função para atualizar informações do eBook
function updateEbookInfo(newEbookInfo) {
    Object.assign(LANDING_PAGE_CONFIG.currentEbook, newEbookInfo);
    console.log('Informações do eBook atualizadas:', LANDING_PAGE_CONFIG.currentEbook);
}

// Função para atualizar preços
function updatePricing(originalPrice, currentPrice) {
    LANDING_PAGE_CONFIG.currentEbook.pricing.originalPrice = originalPrice;
    LANDING_PAGE_CONFIG.currentEbook.pricing.currentPrice = currentPrice;
    LANDING_PAGE_CONFIG.currentEbook.pricing.discountPercentage = 
        Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
    
    console.log('Preços atualizados:', LANDING_PAGE_CONFIG.currentEbook.pricing);
}

// Função para adicionar novo testemunho
function addTestimonial(testimonial) {
    LANDING_PAGE_CONFIG.testimonials.push(testimonial);
    console.log('Novo testemunho adicionado:', testimonial);
}

// Função para adicionar nova pergunta ao FAQ
function addFAQItem(question, answer) {
    LANDING_PAGE_CONFIG.faq.push({ question, answer });
    console.log('Nova pergunta FAQ adicionada:', { question, answer });
}

// Função para configurar data de expiração da oferta
function setOfferExpiration(daysFromNow) {
    LANDING_PAGE_CONFIG.urgency.endDate = new Date(Date.now() + daysFromNow * 24 * 60 * 60 * 1000);
    console.log('Data de expiração da oferta atualizada:', LANDING_PAGE_CONFIG.urgency.endDate);
}

// Função para configurar links de compra
function setPurchaseLinks(primaryLink, secondaryLink = null) {
    LANDING_PAGE_CONFIG.links.purchase.primary = primaryLink;
    if (secondaryLink) {
        LANDING_PAGE_CONFIG.links.purchase.secondary = secondaryLink;
    }
    console.log('Links de compra atualizados:', LANDING_PAGE_CONFIG.links.purchase);
}

// Função para configurar analytics
function setupAnalytics(googleAnalyticsId = null, facebookPixelId = null) {
    if (googleAnalyticsId) {
        LANDING_PAGE_CONFIG.analytics.googleAnalytics.enabled = true;
        LANDING_PAGE_CONFIG.analytics.googleAnalytics.trackingId = googleAnalyticsId;
    }
    
    if (facebookPixelId) {
        LANDING_PAGE_CONFIG.analytics.facebookPixel.enabled = true;
        LANDING_PAGE_CONFIG.analytics.facebookPixel.pixelId = facebookPixelId;
    }
    
    console.log('Analytics configurado:', LANDING_PAGE_CONFIG.analytics);
}

// Função para gerar configuração para novo eBook
function generateNewEbookConfig(ebookData) {
    const newConfig = JSON.parse(JSON.stringify(LANDING_PAGE_CONFIG));
    
    // Atualizar informações do eBook
    Object.assign(newConfig.currentEbook, ebookData);
    
    // Atualizar SEO
    newConfig.seo.title = `${ebookData.title} - ${ebookData.subtitle}`;
    newConfig.seo.description = ebookData.description;
    newConfig.seo.keywords = ebookData.keywords || newConfig.seo.keywords;
    
    // Atualizar Open Graph
    newConfig.seo.openGraph.title = `${ebookData.title} - ${ebookData.subtitle}`;
    newConfig.seo.openGraph.description = ebookData.description;
    
    return newConfig;
}

// Função para validar configuração
function validateConfig() {
    const required = [
        'blog.name',
        'currentEbook.title',
        'currentEbook.pricing.currentPrice',
        'links.purchase.primary'
    ];
    
    const errors = [];
    
    required.forEach(path => {
        const value = path.split('.').reduce((obj, key) => obj?.[key], LANDING_PAGE_CONFIG);
        if (!value) {
            errors.push(`Campo obrigatório ausente: ${path}`);
        }
    });
    
    if (errors.length > 0) {
        console.error('Erros na configuração:', errors);
        return false;
    }
    
    console.log('Configuração válida!');
    return true;
}

// Exportar configuração e funções
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        LANDING_PAGE_CONFIG,
        updateEbookInfo,
        updatePricing,
        addTestimonial,
        addFAQItem,
        setOfferExpiration,
        setPurchaseLinks,
        setupAnalytics,
        generateNewEbookConfig,
        validateConfig
    };
} else {
    // Para uso no navegador
    window.LandingPageConfig = {
        config: LANDING_PAGE_CONFIG,
        updateEbookInfo,
        updatePricing,
        addTestimonial,
        addFAQItem,
        setOfferExpiration,
        setPurchaseLinks,
        setupAnalytics,
        generateNewEbookConfig,
        validateConfig
    };
}

// Validar configuração ao carregar
validateConfig();
