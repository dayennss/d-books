# 📚 D-Books - E-books de Tecnologia

Um site moderno e responsivo especializado em e-books de tecnologia e programação, construído com HTML, CSS e JavaScript puro (sem frameworks).

## ✨ Características

- **Design Moderno**: Interface limpa e profissional
- **Totalmente Responsivo**: Funciona perfeitamente em desktop, tablet e mobile
- **Carregamento Dinâmico**: E-books carregados via JSON
- **SEO Otimizado**: Meta tags e estrutura semântica
- **Performance**: Carregamento rápido e otimizado
- **Acessibilidade**: Navegação por teclado e leitores de tela

## 🚀 Funcionalidades

### Homepage
- Listagem de todos os e-books técnicos
- Filtros por categoria (Frontend, Backend, DevOps, IA/ML, Segurança)
- E-books em destaque
- Newsletter técnica
- Busca (funcionalidade adicional)

### Páginas Individuais
- Detalhes completos do e-book
- Galeria de imagens
- Informações de preço e avaliações
- E-books relacionados
- Compartilhamento social

### Sistema de Navegação
- Menu responsivo
- Breadcrumbs
- Página 404 personalizada

## 📁 Estrutura do Projeto

```
TECHBOOKS/
├── index.html              # Homepage
├── ebook.html              # Página individual do e-book
├── 404.html                # Página de erro
├── README.md               # Documentação
│
├── css/
│   └── style.css           # Estilos principais
│
├── js/
│   ├── main.js             # Funcionalidades da homepage
│   └── ebook.js            # Funcionalidades da página individual
│
├── data/
│   └── ebooks.json         # Dados dos e-books
│
└── images/
    ├── favicon.ico         # Ícone do site
    ├── javascript-moderno-capa.jpg
    ├── python-capa.jpg
    ├── react-interfaces-capa.jpg
    ├── nodejs-backend-capa.jpg
    ├── git-github-capa.jpg
    ├── docker-deploy-capa.jpg
    ├── ia-python-capa.jpg
    └── cybersecurity-capa.jpg
```

## 🛠️ Como Usar

### 1. Adicionar Novos E-books

Edite o arquivo `data/ebooks.json` e adicione um novo objeto:

```json
{
  "id": 6,
  "title": "Título do E-book",
  "slug": "titulo-do-ebook",
  "price": 29.90,
  "originalPrice": 39.90,
  "description": "Descrição curta",
  "longDescription": "Descrição longa e detalhada...",
  "images": [
    "nome-da-imagem.jpg"
  ],
  "downloadLink": "#",
  "category": "Categoria",
  "tags": ["tag1", "tag2"],
  "pages": 200,
  "format": "PDF",
  "language": "Português",
  "isFree": false,
  "isFeatured": true,
  "rating": 4.8,
  "reviews": 50
}
```

### 2. Adicionar Imagens

1. Adicione as imagens na pasta `images/`
2. Atualize o array `images` no JSON
3. As imagens devem ter proporção 3:4 (recomendado: 300x400px)

### 3. Personalizar Cores e Estilos

Edite as variáveis CSS no arquivo `css/style.css`:

```css
:root {
  --primary-color: #6366f1;
  --secondary-color: #f59e0b;
  --accent-color: #10b981;
  /* ... outras variáveis */
}
```

## 🎨 Design System

### Cores Principais
- **Primária**: #6366f1 (Indigo)
- **Secundária**: #f59e0b (Amber)
- **Sucesso**: #10b981 (Emerald)
- **Erro**: #ef4444 (Red)

### Tipografia
- **Fonte**: Inter (Google Fonts)
- **Tamanhos**: 12px a 48px
- **Pesos**: 300, 400, 500, 600, 700, 800

### Componentes
- Cards de e-books
- Botões com hover effects
- Formulários estilizados
- Navegação responsiva
- Loading states

## 📱 Responsividade

O site é totalmente responsivo com breakpoints:
- **Desktop**: 1024px+
- **Tablet**: 768px - 1023px
- **Mobile**: 320px - 767px

## 🔧 Funcionalidades Técnicas

### JavaScript
- Carregamento assíncrono de dados
- Filtros dinâmicos
- Sistema de notificações
- Navegação por teclado
- Tratamento de erros

### CSS
- Grid e Flexbox
- Animações CSS
- Variáveis CSS
- Media queries
- Print styles

### HTML
- Estrutura semântica
- Meta tags SEO
- Open Graph
- Twitter Cards
- Schema.org (preparado)

## 🚀 Deploy

### Opção 1: GitHub Pages
1. Faça upload dos arquivos para um repositório GitHub
2. Ative o GitHub Pages nas configurações
3. Acesse via `https://seuusuario.github.io/nome-do-repositorio`

### Opção 2: Netlify
1. Conecte seu repositório GitHub ao Netlify
2. Configure o build (não é necessário para arquivos estáticos)
3. Deploy automático a cada push

### Opção 3: Vercel
1. Conecte seu repositório ao Vercel
2. Configure como projeto estático
3. Deploy automático

## 📊 Analytics e Tracking

O código está preparado para integração com:
- Google Analytics
- Facebook Pixel
- Hotjar
- Outras ferramentas de analytics

## 🔒 Segurança

- Validação de entrada nos formulários
- Sanitização de dados
- HTTPS recomendado
- Headers de segurança (configurar no servidor)

## 🎯 SEO

### Implementado
- Meta tags otimizadas
- Estrutura semântica
- Open Graph
- Twitter Cards
- URLs amigáveis
- Sitemap (pode ser gerado)

### Recomendações
- Adicionar Schema.org
- Implementar breadcrumbs estruturados
- Otimizar imagens (WebP)
- Configurar Google Search Console

## 🐛 Solução de Problemas

### E-books não carregam
1. Verifique se o arquivo `data/ebooks.json` existe
2. Confirme se o JSON está válido
3. Verifique o console do navegador para erros

### Imagens não aparecem
1. Confirme se as imagens estão na pasta `images/`
2. Verifique os nomes dos arquivos no JSON
3. Teste se as imagens carregam diretamente

### Menu mobile não funciona
1. Verifique se o JavaScript está carregando
2. Confirme se não há erros no console
3. Teste em diferentes navegadores

## 📝 Licença

Este projeto é de código aberto e pode ser usado livremente para fins comerciais e pessoais.

## 🤝 Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para:
- Reportar bugs
- Sugerir melhorias
- Enviar pull requests
- Adicionar novos recursos

## 📞 Suporte

Para dúvidas ou suporte:
- Abra uma issue no GitHub
- Entre em contato via e-mail
- Consulte a documentação

---

**D-Books** - Transformando conhecimento técnico em oportunidades 📚✨
