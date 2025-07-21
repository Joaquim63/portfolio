const PortfolioApp = {
  currentSlide: 0,
  slideInterval: null,
  progressInterval: null,
  autoSlideDelay: 4000, // 4 segundos
  currentProjectType: null, // Adiciona uma variável para armazenar o tipo de projeto selecionado
  techFilterStatusElement: null,
  currentTechFilter: null, // <-- ADICIONA VARIÁVEL PARA ARMAZENAR O FILTRO DE TECNOLOGIA ATIVO


  // Objeto de traduções movido para PortfolioApp para acesso global
  translations: { // <-- OBJETO DE TRADUÇÕES MOVIDO AQUI
    pt: {
      'description': 'Desenvolvedor especializado em <span class="highlight">Flutter para aplicações mobile iOS e Android</span> e <span class="highlight">Python para análise de dados e banco de dados</span>. Com mais de 4 anos dedicados ao desenvolvimento de software, transformo ideias em soluções digitais funcionais e eficientes. Minha paixão por tecnologia me levou a focar em criar aplicações mobile multiplataforma que oferecem excelente experiência do usuário, combinando design intuitivo com performance otimizada.',
      'public-projects-btn': 'Projetos Públicos',
      'private-projects-btn': 'Projetos Privados',
      'certificates-btn': 'Certificados',
      'pdf-button': 'Ver Currículo (PDF)',
      'access-code': 'Acessar Código',
      'view-preview': 'Ver Prévia do Projeto',
      'public-projects-title': 'Projetos Públicos',
      'private-projects-title': 'Projetos Privados',
      'certificates-title': 'Certificados',
      'incomplete-portfolio': 'Portfólio incompleto, estou trabalhando nele para adicionar o máximo de projetos.',
      'showing-tech-projects': 'Projetos feitos usando:',  // Texto atualizado
      'showing-all-tech-projects': 'Mostrando projetos de todas as tecnologias', 
    },
    en: {
      'description': 'Developer specialized in <span class="highlight">Flutter for iOS and Android mobile applications</span> and <span class="highlight">Python for data analysis and databases</span>. With over 4 years dedicated to software development, I transform ideas into functional and efficient digital solutions. My passion for technology drives me to create cross-platform mobile applications that deliver excellent user experience, combining intuitive design with optimized performance.',
      'public-projects-btn': 'Public Projects',
      'private-projects-btn': 'Private Projects',
      'certificates-btn': 'Certificates',
      'pdf-button': 'View Resume (PDF)',
      'access-code': 'Access Code',
      'view-preview': 'View Project Preview',
      'public-projects-title': 'Public Projects',
      'private-projects-title': 'Private Projects',
      'certificates-title': 'Certificates',
      'incomplete-portfolio': 'Portfolio incomplete, I am working on it to add the maximum number of projects.',
      'showing-tech-projects': 'Projects made using:',
      'showing-all-tech-projects': 'Showing projects from all technologies',
    },
    es: {
      'description': 'Desarrollador especializado en <span class="highlight">Flutter para aplicaciones móviles iOS y Android</span> y <span class="highlight">Python para análisis de datos y bases de datos</span>. Con más de 4 años dedicados al desarrollo de software, transformo ideas en soluciones digitales funcionales y eficientes. Mi pasión por la tecnología me impulsa a crear aplicaciones móviles multiplataforma que brindan una excelente experiencia de usuario, combinando diseño intuitivo con rendimiento optimizado.',
      'public-projects-btn': 'Proyectos Públicos',
      'private-projects-btn': 'Proyectos Privados',
      'certificates-btn': 'Certificados',
      'pdf-button': 'Ver Currículum (PDF)',
      'access-code': 'Acceder al Código',
      'view-preview': 'Ver Vista Previa del Proyecto',
      'public-projects-title': 'Proyectos Públicos',
      'private-projects-title': 'Proyectos Privados',
      'certificates-title': 'Certificados',
      'incomplete-portfolio': 'Portafolio incompleto, estoy trabajando en él para añadir el máximo número de proyectos.',
      'showing-tech-projects': 'Proyectos realizados con:',
      'showing-all-tech-projects': 'Mostrando proyectos de todas las tecnologías',
    }
  }, // <-- FIM DO OBJETO DE TRADUÇÕES

  // Troca de idioma
  initializeLanguageSwitch() {
    const brFlag = document.querySelector('.flag-br');
    const usFlag = document.querySelector('.flag-us');
    const esFlag = document.querySelector('.flag-es');
    const elementsToTranslate = document.querySelectorAll('[data-translate]');
    const pdfButton = document.getElementById('pdf-button'); // Botão do PDF

    let currentLanguage = 'pt'; // Idioma padrão é português

    // Mapeamento dos currículos por idioma
    const resumeFiles = {
      pt: 'image/curriculo/curriculo-pt.pdf',
      en: 'image/curriculo/curriculo-en.pdf',
      es: 'image/curriculo/curriculo-es.pdf'
    };

    // Função para atualizar o idioma e o currículo
    function updateLanguage() {
      elementsToTranslate.forEach((element) => {
        const key = element.dataset.translate;
        // Usa PortfolioApp.translations agora
        if (key && PortfolioApp.translations[currentLanguage] && PortfolioApp.translations[currentLanguage][key]) {
          element.innerHTML = PortfolioApp.translations[currentLanguage][key];
        }
      });

      // Atualizar o link do currículo
      if (pdfButton) {
        pdfButton.onclick = function() {
          window.open(resumeFiles[currentLanguage], '_blank');
        };
      }

      // --- ADICIONA LÓGICA PARA ATUALIZAR STATUS DO FILTRO AO TROCAR DE IDIOMA ---
      // Se um tipo de projeto (público/privado) e um filtro de tecnologia estiverem ativos,
      // re-aplica o filtro para atualizar o texto do status com o novo idioma.
      if (PortfolioApp.currentProjectType && PortfolioApp.currentTechFilter) {
        PortfolioApp.filterAndDisplayProjects(PortfolioApp.currentProjectType, PortfolioApp.currentTechFilter);
      }
      // --- FIM DA LÓGICA ADICIONADA ---
    }

    brFlag.addEventListener('click', function () {
      currentLanguage = 'pt';
      // Adiciona classe 'active' à bandeira clicada e remove das outras
      brFlag.classList.add('active');
      usFlag.classList.remove('active');
      esFlag.classList.remove('active');
      updateLanguage();
    });

    usFlag.addEventListener('click', function () {
      currentLanguage = 'en';
      // Adiciona classe 'active' à bandeira clicada e remove das outras
      usFlag.classList.add('active');
      brFlag.classList.remove('active');
      esFlag.classList.remove('active');
      updateLanguage();
    });

    esFlag.addEventListener('click', function () {
      currentLanguage = 'es';
      // Adiciona classe 'active' à bandeira clicada e remove das outras
      esFlag.classList.add('active');
      brFlag.classList.remove('active');
      usFlag.classList.remove('active');
      updateLanguage();
    });

    // Inicializa com o idioma padrão (português) e ativa a bandeira BR
    brFlag.classList.add('active'); // <-- ATIVA A BANDEIRA BR POR PADRÃO
    updateLanguage();
  },

  // Slider avançado com todos os controles
  initializeSlider() {
    const slides = document.querySelectorAll('.slider-item');
    const dots = document.querySelectorAll('.slider-dot');
    const prevBtn = document.querySelector('.slider-prev');
    const nextBtn = document.querySelector('.slider-next');
    const slider = document.querySelector('.slider');
    // const progressBar = document.querySelector('.slider-progress'); // Não precisa selecionar aqui

    if (!slides.length) {
      console.log("Slider não encontrado ou sem imagens");
      return;
    }

    console.log("Slider inicializado com", slides.length, "imagens");

    // Função para mostrar slide específico
    const showSlide = (index) => {
      // Remove classes de todos os slides e dots
      slides.forEach((slide, i) => {
        slide.classList.remove('active', 'prev');
        if (i === this.currentSlide && i !== index) {
          slide.classList.add('prev');
        }
      });

      dots.forEach(dot => dot.classList.remove('active'));

      // Ativa o slide e dot atual
      this.currentSlide = index;
      slides[this.currentSlide].classList.add('active');
      if (dots[this.currentSlide]) {
        dots[this.currentSlide].classList.add('active');
      }
    };

    // Função para próximo slide
    const nextSlide = () => {
      const nextIndex = (this.currentSlide + 1) % slides.length;
      showSlide(nextIndex);
      this.resetAutoSlide();
    };

    // Função para slide anterior
    const prevSlide = () => {
      const prevIndex = this.currentSlide === 0 ? slides.length - 1 : this.currentSlide - 1;
      showSlide(prevIndex);
      this.resetAutoSlide();
    };

    // Função para ir para slide específico
    const goToSlide = (index) => {
      showSlide(index);
      this.resetAutoSlide();
    };

    // Eventos dos botões de navegação
    prevBtn?.addEventListener('click', prevSlide);
    nextBtn?.addEventListener('click', nextSlide);

    // Eventos dos dots
    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => goToSlide(index));
    });

    // Navegação por teclado (apenas se a seção de certificados estiver visível)
    document.addEventListener('keydown', (e) => {
      const certificatesSection = document.getElementById('certificates');
      if (!certificatesSection || certificatesSection.classList.contains('hidden')) return;

      if (e.key === 'ArrowRight') {
        nextSlide();
      } else if (e.key === 'ArrowLeft') {
        prevSlide();
      }
    });


    // Inicializar
    showSlide(0);
    this.startAutoSlide();

    // Pausar/retomar no hover
    slider?.addEventListener('mouseenter', () => this.stopAutoSlide());
    slider?.addEventListener('mouseleave', () => this.startAutoSlide());
  },

  // Iniciar auto-slide com barra de progresso
  startAutoSlide() {
    this.stopAutoSlide(); // Limpa intervalos existentes

    // Barra de progresso
    this.startProgress();

    // Auto-slide
    this.slideInterval = setInterval(() => {
      const slides = document.querySelectorAll('.slider-item');
      const nextIndex = (this.currentSlide + 1) % slides.length;
      this.showSlideWithoutReset(nextIndex);
    }, this.autoSlideDelay);
  },

  // Parar auto-slide
  stopAutoSlide() {
    if (this.slideInterval) {
      clearInterval(this.slideInterval);
      this.slideInterval = null;
    }
    this.stopProgress();
  },

  // Resetar auto-slide (quando usuário interage)
  resetAutoSlide() {
    this.stopAutoSlide();
    this.startAutoSlide();
  },

  // Mostrar slide sem resetar timer (para auto-slide)
  showSlideWithoutReset(index) {
    const slides = document.querySelectorAll('.slider-item');
    const dots = document.querySelectorAll('.slider-dot');

    slides.forEach((slide, i) => {
      slide.classList.remove('active', 'prev');
      if (i === this.currentSlide && i !== index) {
        slide.classList.add('prev');
      }
    });

    dots.forEach(dot => dot.classList.remove('active'));

    this.currentSlide = index;
    slides[this.currentSlide].classList.add('active');
    if (dots[this.currentSlide]) {
      dots[this.currentSlide].classList.add('active');
    }
  },

  // Iniciar barra de progresso
  startProgress() {
    const progressBar = document.querySelector('.slider-progress');
    if (!progressBar) return;

    // Reset progress bar immediately
    progressBar.style.transition = 'none';
    progressBar.style.width = '0%';
    // Force reflow
    progressBar.offsetWidth;
    // Start animation
    progressBar.style.transition = `width ${this.autoSlideDelay}ms linear`;
    progressBar.style.width = '100%';

    // Clear previous interval if any
    if (this.progressInterval) {
      clearInterval(this.progressInterval);
    }

    // Set interval to reset and restart animation for each slide
    this.progressInterval = setInterval(() => {
      // Reset progress bar
      progressBar.style.transition = 'none';
      progressBar.style.width = '0%';
      // Force reflow
      progressBar.offsetWidth;
      // Start animation
      progressBar.style.transition = `width ${this.autoSlideDelay}ms linear`;
      progressBar.style.width = '100%';
    }, this.autoSlideDelay);
  },

  // Parar barra de progresso
  stopProgress() {
    if (this.progressInterval) {
      clearInterval(this.progressInterval);
      this.progressInterval = null;
    }
    const progressBar = document.querySelector('.slider-progress');
    if (progressBar) {
      progressBar.style.transition = 'none'; // Para qualquer transição em andamento
      progressBar.style.width = '0%';
    }
  },

  // Função para esconder todas as seções de conteúdo (projetos, certificados, filtro)
  hideAllContentSections() {
    const publicProjectsSection = document.getElementById('public-projects');
    const privateProjectsSection = document.getElementById('private-projects');
    const certificatesSection = document.getElementById('certificates');
    const techFilterSection = document.getElementById('tech-filter-section');

    publicProjectsSection?.classList.add('hidden');
    privateProjectsSection?.classList.add('hidden');
    certificatesSection?.classList.add('hidden');
    techFilterSection?.classList.add('hidden'); // Esconde a seção de filtro também

    // Esconde o status do filtro também
    if (this.techFilterStatusElement) {
      this.techFilterStatusElement.classList.add('hidden');
    }

    // Esconde todos os projetos individuais também
    document.querySelectorAll('.project').forEach(project => project.classList.add('hidden', 'is-visible')); // Adiciona hidden e remove is-visible
    this.stopAutoSlide(); // Para o slider quando mudar de seção
  },

  // Gerencia a exibição das seções principais e a etapa de filtro
  initializeSectionVisibility() {
    const publicProjectsBtn = document.getElementById('public-projects-btn');
    const privateProjectsBtn = document.getElementById('private-projects-btn');
    const certificatesBtn = document.getElementById('certificates-btn');

    const techFilterSection = document.getElementById('tech-filter-section'); // Nova seção de filtro

    // Event listeners para os botões principais
    publicProjectsBtn?.addEventListener('click', () => {
      this.hideAllContentSections();
      this.currentProjectType = 'public'; // Armazena o tipo selecionado
      techFilterSection?.classList.remove('hidden'); // Mostra a seção de filtro
      // Não chama filterAndDisplayProjects aqui, espera a seleção da tecnologia
      // Rola para a seção de filtro de tecnologia
      if (techFilterSection) {
        techFilterSection.scrollIntoView({ behavior: 'smooth' });
      }
    });

    privateProjectsBtn?.addEventListener('click', () => {
      this.hideAllContentSections();
      this.currentProjectType = 'private'; // Armazena o tipo selecionado
      techFilterSection?.classList.remove('hidden'); // Mostra a seção de filtro
      // Não chama filterAndDisplayProjects aqui, espera a seleção da tecnologia
      // Rola para a seção de filtro de tecnologia
      if (techFilterSection) {
        techFilterSection.scrollIntoView({ behavior: 'smooth' });
      }
    });

    certificatesBtn?.addEventListener('click', () => {
      this.hideAllContentSections();
      const certificatesSection = document.getElementById('certificates');
      certificatesSection?.classList.remove('hidden'); // Mostra a seção de certificados
      // Inicializa o slider com um pequeno delay para garantir que a seção esteja visível
      setTimeout(() => {
        this.initializeSlider();
      }, 100);
    });

    // ************** Nova lógica para botões de tecnologia **************
    this.initializeTechFilters(); // Chama a inicialização dos filtros de tecnologia

    // Estado inicial: Esconder todas as seções de conteúdo ao carregar a página
    // A descrição e os botões principais devem estar visíveis no HTML inicial
    this.hideAllContentSections();
  },

  // Inicializa os listeners para os botões de filtro por tecnologia
  initializeTechFilters() {
    // Seleciona todos os botões de tecnologia dentro da seção de filtro
    const techButtons = document.querySelectorAll('#tech-filter-section .tech-option');

    // --- ADICIONA LÓGICA PARA GERENCIAR CLASSE 'ACTIVE' E CHAMAR FILTRO ---
    techButtons.forEach(button => {
      button.addEventListener('click', function() {
        // Remove a classe 'active' de todos os botões de tecnologia
        techButtons.forEach(btn => btn.classList.remove('active'));
        // Adiciona a classe 'active' ao botão clicado
        this.classList.add('active');

        const selectedTech = this.dataset.tech; // Obtém a tecnologia do atributo data-tech
        PortfolioApp.currentTechFilter = selectedTech; // Armazena o filtro de tecnologia ativo

        const techFilterSection = document.getElementById('tech-filter-section');

        // Esconde a seção de filtro (comportamento existente do usuário)
        techFilterSection?.classList.add('hidden');

        // Filtra e exibe os projetos com base no tipo e tecnologia selecionados
        if (PortfolioApp.currentProjectType && selectedTech) {
          PortfolioApp.filterAndDisplayProjects(PortfolioApp.currentProjectType, selectedTech);
        } else {
          console.error("Tipo de projeto ou tecnologia não definidos.");
        }
      });
    });

    // Define o filtro inicial como "all" e simula um clique para ativar
    // Isso garante que o status inicial e a exibição padrão sejam definidos ao mostrar a seção de filtro.
    const defaultTechButton = document.querySelector('#tech-filter-section [data-tech="all"]');
    if (defaultTechButton) {
      defaultTechButton.click(); // Simula um clique para ativar o filtro padrão e status
    }
    // --- FIM DA LÓGICA ADICIONADA ---
  },

  // Filtra e exibe os projetos com base no tipo e tecnologia
  filterAndDisplayProjects(type, tech) {
    const projectsSectionId = `${type}-projects`; // Ex: 'public-projects' ou 'private-projects'
    const projectsSection = document.getElementById(projectsSectionId);

    if (projectsSection) {
      // Mostra a seção container dos projetos (pública ou privada)
      projectsSection.classList.remove('hidden');
      // Garante que o elemento de status do filtro de tecnologia esteja visível
      if (this.techFilterStatusElement) {
          this.techFilterStatusElement.classList.remove('hidden');
      }


      // Itera sobre todos os elementos com a classe 'project' dentro da seção correta
      const projects = projectsSection.querySelectorAll('.project');

      // Primeiro, esconde todos os projetos dentro da seção selecionada
      projects.forEach(project => project.classList.add('hidden', 'is-visible')); // Adiciona hidden e remove is-visible para resetar animação

      // --- Lógica para atualizar o status do filtro de tecnologia ---
      if (this.techFilterStatusElement) {
        // Obtém o idioma atual verificando qual bandeira está ativa
        let currentLanguage = 'pt'; // Padrão
        if (document.querySelector('.flag-us.active')) {
          currentLanguage = 'en';
        } else if (document.querySelector('.flag-es.active')) {
          currentLanguage = 'es';
        }

        if (tech === 'all') {
          this.techFilterStatusElement.textContent = this.translations[currentLanguage]['showing-all-tech-projects'];
        } else {
          // Encontra o botão ativo para obter o texto da tecnologia traduzida
          const techFilterButton = document.querySelector(`#tech-filter-section .tech-option[data-tech="${tech}"]`);
          const techName = techFilterButton ? techFilterButton.textContent : tech; // Usa o texto do botão ou o data-tech como fallback
          this.techFilterStatusElement.textContent = `${this.translations[currentLanguage]['showing-tech-projects']} ${techName}`;
        }
      }
      // --- Fim da lógica de status ---

      // Pequeno delay para garantir que a classe hidden seja aplicada antes de mostrar
      setTimeout(() => {
        let projectsShownCount = 0; // Contador para verificar se algum projeto foi mostrado
        projects.forEach(project => {
          const projectTech = project.dataset.tech; // Obtém a tecnologia do projeto

          // Se a tecnologia do projeto corresponder à tecnologia selecionada, mostra o projeto
          if (projectTech === tech || tech === 'all') { // Mostra se a tech bate OU se o filtro é 'all'
            project.classList.remove('hidden');
            projectsShownCount++;
            // A classe 'is-visible' será adicionada pelo IntersectionObserver se o elemento estiver na viewport
          }
        });

        // --- ADICIONA LÓGICA PARA ROLAR PARA A SEÇÃO DE PROJETOS APÓS O FILTRO ---
        // Rola para a seção de projetos para garantir que o usuário veja os resultados e o status
        if (projectsSection) {
          projectsSection.scrollIntoView({ behavior: 'smooth' });
        }
        // --- FIM DA LÓGICA ADICIONADA ---

        // Opcional: Exibir mensagem se nenhum projeto for encontrado para o filtro
        if (projectsShownCount === 0) {
          console.log(`Nenhum projeto encontrado para o filtro "${tech}" em ${type}.`);
          // Você pode adicionar um elemento no HTML para mostrar essa mensagem
          // Por exemplo: document.getElementById('no-projects-message').classList.remove('hidden');
          // E escondê-lo quando projectsShownCount > 0
        }

      }, 50); // Delay curto para permitir que a classe 'hidden' seja processada
    } else {
      console.error(`Seção de projetos "${projectsSectionId}" não encontrada.`);
    }
  },

  // Voltar ao início
  initializeBackToTopButton() {
    const backToTopBtn = document.getElementById('back-to-top-btn');
    if (!backToTopBtn) return;

    window.addEventListener('scroll', function () {
      // Adiciona a classe 'show' se a rolagem for maior que 200px, remove caso contrário
      if (window.scrollY > 200) {
        backToTopBtn.classList.add('show');
      } else {
        backToTopBtn.classList.remove('show');
      }
    });

    backToTopBtn.addEventListener('click', function () {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });

    backToTopBtn.addEventListener('keydown', function (event) {
      if (event.key === 'Enter' || event.key === ' ') {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }
    });
  },


  // Inicialização geral
  init() {
    // --- ADICIONA SELEÇÃO DO ELEMENTO DE STATUS DO FILTRO ---
    this.techFilterStatusElement = document.getElementById('tech-filter-status'); // Assumindo que o elemento tem o ID 'tech-filter-status'
    // --- FIM DA ADIÇÃO ---

    this.initializeLanguageSwitch();
    this.initializeSectionVisibility(); // Esta função agora também chama initializeTechFilters
    this.initializeBackToTopButton();
    this.initializeAnimations(); // Inicializa o observador de animações

    // O slider só é inicializado quando a seção de certificados é mostrada
  },

  // Inicializar animações de entrada
  initializeAnimations() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Adiciona a classe para acionar a animação
          entry.target.classList.add('is-visible');
          // Opcional: parar de observar o elemento depois que ele se torna visível
          // observer.unobserve(entry.target);
        } else {
          // Opcional: remover a classe se o elemento sair da viewport
          // entry.target.classList.remove('is-visible');
        }
      });
    }, observerOptions);

    // Seleciona todos os elementos que devem ter animação de entrada
    // O observador será aplicado a todos os .card, .tech-row e .project inicialmente
    const animatedElements = document.querySelectorAll('.card, .tech-row, .project');
    animatedElements.forEach(el => observer.observe(el));

    // Armazena o observador para uso futuro, se necessário (ex: re-observar elementos)
    this.animationObserver = observer;
  }
};

// Funcionalidades adicionais
const EnhancedFeatures = {
  // Suavizar a rolagem para âncoras
  initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        // Evita o comportamento padrão apenas se o link for uma âncora interna
        const href = this.getAttribute('href');
        if (href && href.length > 1 && href !== '#') {
          e.preventDefault();
          const target = document.querySelector(href);
          if (target) {
            target.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            });
        }
        }
      });
    });
  },

  // Adicionar feedback visual aos botões (efeito ripple)
  initButtonFeedback() {
    // Adicionar CSS do ripple (idealmente, isso estaria no seu arquivo CSS)
    if (!document.getElementById('ripple-style')) {
      const style = document.createElement('style');
      style.id = 'ripple-style';
      style.textContent = `
        @keyframes ripple {
          to {
            transform: scale(4);
            opacity: 0;
          }
        }
        .ripple-container {
          position: relative;
          overflow: hidden;
        }
        .ripple-effect {
          position: absolute;
          background: rgba(255, 255, 255, 0.5); /* Cor do ripple */
          border-radius: 50%;
          transform: scale(0);
          animation: ripple 0.6s linear;
          pointer-events: none;
          z-index: 1;
        }
      `;
      document.head.appendChild(style);
    }


    document.querySelectorAll('button, a.button').forEach(element => { // Inclui links com classe 'button'
      // Adiciona a classe ripple-container, exceto para o botão back-to-top
      if (element.id !== 'back-to-top-btn') {
        element.classList.add('ripple-container');
      }

      element.addEventListener('click', function(e) {
        // Não aplica o ripple se for o botão de voltar ao topo
        if (this.id === 'back-to-top-btn') {
          return;
        }

        // Remover ripples existentes para evitar acúmulo
        this.querySelectorAll('.ripple-effect').forEach(r => r.remove());

        // Criar efeito ripple
        const ripple = document.createElement('span');
        ripple.classList.add('ripple-effect');

        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.cssText = `
          width: ${size}px;
          height: ${size}px;
          left: ${x}px;
          top: ${y}px;
        `;

        // Adiciona o ripple ao botão
        this.appendChild(ripple);

        // Remove o ripple após a animação
        setTimeout(() => {
          ripple.remove();
        }, 600);
      });
    });
  }
};

// Inicia o aplicativo
document.addEventListener('DOMContentLoaded', function() {
  PortfolioApp.init();

  // Delay removido, assume-se que os elementos estão no DOM inicial
  EnhancedFeatures.initSmoothScrolling();
  EnhancedFeatures.initButtonFeedback();
});
