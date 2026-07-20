(() => {
  'use strict';

  const root = document.documentElement;
  const currentScript = document.currentScript;
  const scriptBase = currentScript?.src ? new URL('.', currentScript.src) : new URL('./js/', document.baseURI);
  let frame = 0;

  const ensureStylesheet = () => {
    if (document.getElementById('final-responsive-fixes-style')) return;
    const link = document.createElement('link');
    link.id = 'final-responsive-fixes-style';
    link.rel = 'stylesheet';
    link.href = new URL('../css/correcao-final-responsiva.css?v=20260720k', scriptBase).href;
    document.head.appendChild(link);
  };

  const isDesktop = () => root.classList.contains('ui-desktop') || root.dataset.uiMode === 'desktop';

  const setInert = (element, value) => {
    if (!element) return;
    if ('inert' in element) element.inert = value;
    if (value) element.setAttribute('aria-hidden', 'true');
    else element.removeAttribute('aria-hidden');
  };

  const syncBodyMode = () => {
    const body = document.body;
    if (!body) return;
    const desktop = isDesktop();
    body.classList.toggle('ui-desktop', desktop);
    body.classList.toggle('ui-compact', !desktop);

    const navigation = document.querySelector('.atlas-global-nav, .site-header__nav');
    const index = document.querySelector('.content-index');
    const menuButton = document.querySelector('.atlas-menu-toggle');
    const indexButton = document.querySelector('.atlas-index-toggle');

    if (desktop) {
      body.classList.remove('menu-open', 'index-open');
      menuButton?.setAttribute('aria-expanded', 'false');
      indexButton?.setAttribute('aria-expanded', 'false');
      setInert(navigation, false);
      setInert(index, false);
    } else {
      if (!body.classList.contains('menu-open')) {
        menuButton?.setAttribute('aria-expanded', 'false');
        setInert(navigation, true);
      }
      if (!body.classList.contains('index-open')) {
        indexButton?.setAttribute('aria-expanded', 'false');
        setInert(index, true);
      }
    }
  };

  const arrangeStudio = () => {
    const body = document.body;
    if (!body?.classList.contains('miracle-studio-page')) return;

    const studio = document.querySelector('.miracle-studio');
    const layout = studio?.querySelector('.miracle-studio__layout');
    const progress = studio?.querySelector('.studio-progress');
    if (!studio || !layout || !progress) return;

    if (isDesktop()) {
      studio.dataset.desktopLayout = 'true';
      if (progress.parentElement !== layout) layout.insertBefore(progress, layout.firstChild);
      body.classList.remove('studio-summary-open');
    } else {
      delete studio.dataset.desktopLayout;
      if (progress.parentElement === layout) studio.insertBefore(progress, layout);
    }
  };

  const enhanceGuides = () => {
    document.querySelectorAll('.def-option-guide').forEach((guide) => {
      if (guide.dataset.compactGuide === 'true') return;
      if (!guide.querySelector(':scope > div')) return;
      guide.dataset.compactGuide = 'true';
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'audit-guide-toggle';
      button.setAttribute('aria-expanded', 'false');
      button.textContent = 'Entender melhor';
      button.addEventListener('click', () => {
        const expanded = button.getAttribute('aria-expanded') === 'true';
        button.setAttribute('aria-expanded', String(!expanded));
        button.textContent = expanded ? 'Entender melhor' : 'Ocultar detalhes';
        guide.classList.toggle('is-expanded', !expanded);
      });
      guide.insertAdjacentElement('afterend', button);
    });
  };

  const enhanceCreationAccordion = () => {
    document.querySelectorAll('.def-creation-builder').forEach((builder) => {
      if (builder.dataset.accordionReady === 'true') return;
      builder.dataset.accordionReady = 'true';
      const sections = [...builder.querySelectorAll(':scope > details')];
      sections.forEach((details, index) => {
        details.open = index === 0;
        details.addEventListener('toggle', () => {
          if (!details.open) return;
          sections.forEach((other) => {
            if (other !== details) other.open = false;
          });
        });
      });
    });
  };

  const enhanceHeritages = () => {
    document.querySelectorAll('.def-heritage').forEach((heritage) => {
      if (heritage.dataset.compactHeritage === 'true') return;
      const movable = [...heritage.children].filter((child) => ['DL', 'ASIDE', 'FOOTER'].includes(child.tagName));
      if (!movable.length) return;
      heritage.dataset.compactHeritage = 'true';
      const details = document.createElement('details');
      details.className = 'def-heritage__details';
      const summary = document.createElement('summary');
      summary.textContent = 'Ver regra completa da Herança';
      details.appendChild(summary);
      movable.forEach((child) => details.appendChild(child));
      heritage.appendChild(details);
    });
  };

  const summaryCost = () => {
    const strong = document.querySelector('.studio-budget strong');
    return strong?.textContent?.trim() || '0 / 0';
  };

  const enhanceMobileSummary = () => {
    const body = document.body;
    if (!body?.classList.contains('miracle-studio-page')) return;
    const studio = document.querySelector('.miracle-studio');
    const summary = studio?.querySelector('.studio-summary');
    if (!studio || !summary) return;

    let toggle = document.querySelector('.studio-mobile-summary-toggle');
    if (!toggle) {
      toggle = document.createElement('button');
      toggle.type = 'button';
      toggle.className = 'studio-mobile-summary-toggle';
      toggle.innerHTML = '<span>Resumo do Milagre</span><strong></strong>';
      toggle.addEventListener('click', () => body.classList.add('studio-summary-open'));
      body.appendChild(toggle);
    }
    const cost = toggle.querySelector('strong');
    if (cost) cost.textContent = summaryCost();

    if (!summary.querySelector('.studio-mobile-summary-close')) {
      const close = document.createElement('button');
      close.type = 'button';
      close.className = 'studio-mobile-summary-close';
      close.setAttribute('aria-label', 'Fechar resumo');
      close.textContent = '×';
      close.addEventListener('click', () => body.classList.remove('studio-summary-open'));
      summary.prepend(close);
    }
  };

  const stabilizeCompactPanels = () => {
    const body = document.body;
    if (!body || isDesktop()) return;
    if (!body.classList.contains('menu-open')) {
      document.querySelector('.atlas-menu-toggle')?.setAttribute('aria-expanded', 'false');
      setInert(document.querySelector('.atlas-global-nav, .site-header__nav'), true);
    }
    if (!body.classList.contains('index-open')) {
      document.querySelector('.atlas-index-toggle')?.setAttribute('aria-expanded', 'false');
      setInert(document.querySelector('.content-index'), true);
    }
  };

  const apply = () => {
    frame = 0;
    syncBodyMode();
    arrangeStudio();
    enhanceGuides();
    enhanceCreationAccordion();
    enhanceHeritages();
    enhanceMobileSummary();
    stabilizeCompactPanels();
  };

  const schedule = () => {
    if (frame) return;
    frame = window.requestAnimationFrame(apply);
  };

  const start = () => {
    ensureStylesheet();
    apply();
    new MutationObserver(schedule).observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class', 'data-ui-mode'],
      childList: true,
      subtree: true
    });
    window.addEventListener('resize', schedule, { passive: true });
    window.addEventListener('orientationchange', schedule, { passive: true });
    window.addEventListener('pageshow', schedule);
    window.visualViewport?.addEventListener('resize', schedule, { passive: true });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') document.body?.classList.remove('studio-summary-open');
    });
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, { once: true });
  else start();
})();
