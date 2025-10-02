// Platinum Creative Hub - JavaScript
// Design inspirado no GitHub atual

class PlatinumApp {
  constructor() {
    this.init();
  }

  init() {
    this.loadComponents();
    this.setupEventListeners();
    this.initializeAnimations();
  }

  // Carrega componentes externos (header, footer)
  async loadComponents() {
    try {
      await Promise.all([
        this.loadComponent('header', 'partners/header.html'),
        this.loadComponent('footer', 'partners/footer.html')
      ]);
    } catch (error) {
      console.error('Erro ao carregar componentes:', error);
    }
  }

  async loadComponent(elementId, url) {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`Erro ao carregar ${url}`);
      const data = await response.text();
      document.getElementById(elementId).innerHTML = data;
    } catch (error) {
      console.error(`Erro ao carregar ${url}:`, error);
    }
  }

  // Configura event listeners
  setupEventListeners() {
    this.setupEmailForm();
    this.setupFeatureCards();
    this.setupModalEvents();
    this.setupScrollAnimations();
    this.setupStatsCounter();
    this.setupTestimonialsCarousel();
  }

  // Configura formulário de email
  setupEmailForm() {
    const form = document.getElementById('emailForm');
    const emailInput = document.getElementById('emailInput');
    const errorElement = document.getElementById('email-error');
    const emailExample = document.getElementById('emailExample');

    if (!form || !emailInput || !errorElement || !emailExample) return;

    form.addEventListener('submit', (e) => this.handleEmailSubmit(e, emailInput, errorElement));
    emailInput.addEventListener('input', () => this.clearEmailError(errorElement));
    
    // Adiciona animação do placeholder e exemplo de email
    emailInput.addEventListener('focus', () => this.handleEmailFocus(emailInput, emailExample));
    emailInput.addEventListener('blur', () => this.handleEmailBlur(emailInput, emailExample));
    emailInput.addEventListener('input', () => this.handleEmailInput(emailInput, emailExample));
  }

  async handleEmailSubmit(event, emailInput, errorElement) {
    event.preventDefault();
    
    const email = emailInput.value.trim();
    if (!this.validateEmail(email)) {
      this.showEmailError('Por favor, insira um e-mail válido.', errorElement);
      return;
    }

    this.clearEmailError(errorElement);
    this.showEmailSuccess('E-mail cadastrado com sucesso!', errorElement);
    
    // Simula delay de rede
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Aqui você implementaria a lógica real de envio
    console.log('Email enviado:', email);
    emailInput.value = '';
  }

  validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  showEmailError(message, errorElement) {
    errorElement.textContent = message;
    errorElement.style.color = '#f85149';
  }

  showEmailSuccess(message, errorElement) {
    errorElement.textContent = message;
    errorElement.style.color = '#f39c12';
    
    // Remove a mensagem de sucesso após 3 segundos
    setTimeout(() => {
      errorElement.textContent = '';
    }, 3000);
  }

  clearEmailError(errorElement) {
    errorElement.textContent = '';
  }

  // Controla o foco no campo de email
  handleEmailFocus(emailInput, emailExample) {
    // Mostra o exemplo de email quando o campo ganha foco
    emailExample.classList.add('show');
    
    // Adiciona classe para animação do placeholder
    emailInput.classList.add('focused');
  }

  // Controla quando o campo de email perde o foco
  handleEmailBlur(emailInput, emailExample) {
    // Se não há texto, esconde o exemplo
    if (!emailInput.value.trim()) {
      emailExample.classList.remove('show');
      emailInput.classList.remove('focused');
    }
  }

  // Controla quando o usuário digita no campo
  handleEmailInput(emailInput, emailExample) {
    // Se há texto, esconde o exemplo
    if (emailInput.value.trim()) {
      emailExample.classList.remove('show');
    } else {
      // Se não há texto e o campo está focado, mostra o exemplo
      if (document.activeElement === emailInput) {
        emailExample.classList.add('show');
      }
    }
  }

  // Configura cards de features
  setupFeatureCards() {
    const featureCards = document.querySelectorAll('.feature-card');
    
    featureCards.forEach(card => {
      card.addEventListener('click', () => {
        // Remove active de todos os cards
        featureCards.forEach(c => c.classList.remove('active'));
        // Adiciona active ao card clicado
        card.classList.add('active');
        
        // Abre o modal com o conteúdo específico
        this.openFeatureModal(card);
      });
    });
  }

  // Abre o modal com conteúdo específico do card
  openFeatureModal(card) {
    const modal = document.getElementById('featureModal');
    const modalIcon = document.getElementById('modalIcon');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    const modalDetails = document.getElementById('modalDetails');
    const modalFeatures = document.getElementById('modalFeatures');

    if (!modal || !modalIcon || !modalTitle || !modalDescription || !modalDetails || !modalFeatures) return;

    // Obtém o conteúdo do card clicado
    const icon = card.querySelector('.feature-icon')?.textContent || '';
    const title = card.querySelector('h3')?.textContent || '';
    const description = card.querySelector('p')?.textContent || '';

    // Define o conteúdo do modal baseado no card clicado
    const modalData = this.getModalData(title);

    // Atualiza o conteúdo do modal
    modalIcon.textContent = icon;
    modalTitle.textContent = title;
    modalDescription.textContent = description;
    modalDetails.innerHTML = modalData.details;
    modalFeatures.innerHTML = modalData.features;

    // Mostra o modal
    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Previne scroll do body
  }

  // Fecha o modal
  closeFeatureModal() {
    const modal = document.getElementById('featureModal');
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = ''; // Restaura scroll do body
    }
  }

  // Dados específicos para cada modal
  getModalData(title) {
    const modalData = {
      'Criação': {
        details: `
          <h3>Sobre Nossa Criação</h3>
          <p>Transformamos ideias abstratas em conceitos sólidos e tangíveis. Nossa equipe de criativos trabalha para dar vida às suas visões mais ambiciosas.</p>
          <ul>
            <li>Desenvolvimento de conceitos criativos únicos</li>
            <li>Pesquisa de mercado e tendências</li>
            <li>Brainstorming colaborativo</li>
            <li>Validação de ideias com dados</li>
            <li>Prototipação de conceitos</li>
          </ul>
        `,
        features: `
          <div class="modal-feature-item">
            <h4>Conceitos Únicos</h4>
            <p>Ideias originais que se destacam no mercado</p>
          </div>
          <div class="modal-feature-item">
            <h4>Pesquisa Aprofundada</h4>
            <p>Análise detalhada do público e concorrência</p>
          </div>
          <div class="modal-feature-item">
            <h4>Validação Científica</h4>
            <p>Testes e métricas para validar conceitos</p>
          </div>
        `
      },
      'Design': {
        details: `
          <h3>Sobre Nosso Design</h3>
          <p>Damos forma e identidade visual aos seus conceitos, criando experiências visuais memoráveis que conectam com seu público.</p>
          <ul>
            <li>Identidade visual completa</li>
            <li>Design de interfaces e experiências</li>
            <li>Materiais gráficos diversos</li>
            <li>Branding e posicionamento visual</li>
            <li>Design responsivo e acessível</li>
          </ul>
        `,
        features: `
          <div class="modal-feature-item">
            <h4>Identidade Visual</h4>
            <p>Logotipos, cores e tipografia únicos</p>
          </div>
          <div class="modal-feature-item">
            <h4>UX/UI Design</h4>
            <p>Experiências digitais intuitivas e atrativas</p>
          </div>
          <div class="modal-feature-item">
            <h4>Materiais Gráficos</h4>
            <p>Cartões, banners, apresentações e mais</p>
          </div>
        `
      },
      'Produção': {
        details: `
          <h3>Sobre Nossa Produção</h3>
          <p>Executamos seus projetos com precisão técnica e qualidade excepcional, utilizando as melhores ferramentas e metodologias do mercado.</p>
          <ul>
            <li>Produção audiovisual completa</li>
            <li>Desenvolvimento de websites e apps</li>
            <li>Campanhas publicitárias</li>
            <li>Conteúdo para redes sociais</li>
            <li>Projetos multimídia</li>
          </ul>
        `,
        features: `
          <div class="modal-feature-item">
            <h4>Produção Audiovisual</h4>
            <p>Vídeos, podcasts e conteúdo multimídia</p>
          </div>
          <div class="modal-feature-item">
            <h4>Desenvolvimento Web</h4>
            <p>Sites e aplicações modernas e funcionais</p>
          </div>
          <div class="modal-feature-item">
            <h4>Campanhas Integradas</h4>
            <p>Estratégias completas de comunicação</p>
          </div>
        `
      },
      'Pós-Produção': {
        details: `
          <h3>Sobre Nossa Pós-Produção</h3>
          <p>Aprimoramos e finalizamos seu conteúdo com técnicas avançadas de edição, correção e otimização para garantir o melhor resultado.</p>
          <ul>
            <li>Edição e montagem profissional</li>
            <li>Correção de cor e tratamento de imagem</li>
            <li>Efeitos visuais e motion graphics</li>
            <li>Masterização de áudio e vídeo</li>
            <li>Otimização para diferentes plataformas</li>
          </ul>
        `,
        features: `
          <div class="modal-feature-item">
            <h4>Edição Profissional</h4>
            <p>Montagem e finalização de alta qualidade</p>
          </div>
          <div class="modal-feature-item">
            <h4>Efeitos Visuais</h4>
            <p>Motion graphics e pós-produção avançada</p>
          </div>
          <div class="modal-feature-item">
            <h4>Otimização</h4>
            <p>Adaptação para diferentes formatos e plataformas</p>
          </div>
        `
      }
    };

    return modalData[title] || modalData['Criação'];
  }

  // Configura eventos do modal
  setupModalEvents() {
    const modal = document.getElementById('featureModal');
    const closeBtn = document.querySelector('.modal-close');
    const overlay = document.querySelector('.modal-overlay');

    if (!modal || !closeBtn || !overlay) return;

    // Fecha modal ao clicar no botão X
    closeBtn.addEventListener('click', () => {
      this.closeFeatureModal();
    });

    // Fecha modal ao clicar no overlay
    overlay.addEventListener('click', () => {
      this.closeFeatureModal();
    });

    // Fecha modal ao pressionar ESC
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('active')) {
        this.closeFeatureModal();
      }
    });

    // Previne fechamento ao clicar no conteúdo do modal
    const modalContent = document.querySelector('.modal-content');
    if (modalContent) {
      modalContent.addEventListener('click', (e) => {
        e.stopPropagation();
      });
    }
  }

  // Configura animações de scroll
  setupScrollAnimations() {
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

    // Observa elementos que devem animar no scroll
    document.querySelectorAll('.feature-card, .feature-item, .stat-item, .client-logo').forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observer.observe(el);
    });
  }

  // Configura contador de estatísticas
  setupStatsCounter() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const observerOptions = {
      threshold: 0.5,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    statNumbers.forEach(stat => {
      observer.observe(stat);
    });
  }

  animateCounter(element) {
    const originalText = element.textContent;
    let target;
    
    // Tratar casos especiais como "24/7"
    if (originalText.includes('24/7')) {
      target = 24;
    } else {
      target = parseInt(originalText.replace(/\D/g, ''));
    }
    
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      
      if (originalText.includes('24/7')) {
        element.textContent = Math.floor(current) + '/7';
      } else if (originalText.includes('+')) {
        element.textContent = Math.floor(current) + '+';
      } else if (originalText.includes('/')) {
        element.textContent = Math.floor(current) + '/7';
      } else {
        element.textContent = Math.floor(current) + '+';
      }
    }, 16);
  }

  // Configura carrossel de depoimentos
  setupTestimonialsCarousel() {
    const testimonialsCarousel = document.querySelector('.testimonials-carousel');
    if (!testimonialsCarousel) return;

    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');
    
    let currentSlide = 0;
    const totalSlides = testimonialCards.length;

    // Função para mostrar slide específico
    const showSlide = (slideIndex) => {
      // Remove active de todos os cards e dots
      testimonialCards.forEach(card => card.classList.remove('active'));
      dots.forEach(dot => dot.classList.remove('active'));
      
      // Adiciona active ao slide atual
      testimonialCards[slideIndex].classList.add('active');
      dots[slideIndex].classList.add('active');
      
      currentSlide = slideIndex;
    };

    // Função para próximo slide
    const nextSlide = () => {
      const nextIndex = (currentSlide + 1) % totalSlides;
      showSlide(nextIndex);
    };

    // Função para slide anterior
    const prevSlide = () => {
      const prevIndex = (currentSlide - 1 + totalSlides) % totalSlides;
      showSlide(prevIndex);
    };

    // Event listeners para botões
    if (nextBtn) {
      nextBtn.addEventListener('click', nextSlide);
    }
    
    if (prevBtn) {
      prevBtn.addEventListener('click', prevSlide);
    }

    // Event listeners para dots
    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => showSlide(index));
    });

    // Auto-play (opcional)
    let autoPlayInterval;
    
    const startAutoPlay = () => {
      autoPlayInterval = setInterval(nextSlide, 5000); // Muda a cada 5 segundos
    };
    
    const stopAutoPlay = () => {
      clearInterval(autoPlayInterval);
    };

    // Pausa auto-play ao interagir
    testimonialsCarousel.addEventListener('mouseenter', stopAutoPlay);
    testimonialsCarousel.addEventListener('mouseleave', startAutoPlay);

    // Inicia auto-play
    startAutoPlay();

    // Navegação por teclado
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        prevSlide();
      } else if (e.key === 'ArrowRight') {
        nextSlide();
      }
    });
  }

  // Inicializa animações
  initializeAnimations() {
    // Animação dos cards do hero
    this.animateHeroCards();
  }

  animateHeroCards() {
    const cards = document.querySelectorAll('.feature-card');
    
    cards.forEach((card, index) => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(20px)';
      
      setTimeout(() => {
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }, index * 150);
    });
  }
}

// Inicializa a aplicação quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
  new PlatinumApp();
});

// Utilitários globais
window.PlatinumUtils = {
  // Debounce para otimizar performance
  debounce: (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },

  // Throttle para otimizar performance
  throttle: (func, limit) => {
    let inThrottle;
    return function() {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }
};