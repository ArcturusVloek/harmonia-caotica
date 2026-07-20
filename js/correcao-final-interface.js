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
    link.href = new URL('../css/correcao-final-responsiva.css?v=20260720q', scriptBase).href;
    document.head.appendChild(link);
  };

  const isDesktop = () => root.classList.contains('ui-desktop') || root.dataset.uiMode === 'desktop';

  const setInert = (element, value) => {
    if (!element) return;
    if ('inert' in element && element.inert !== value) element.inert = value;
    if (value) {
      if (element.getAttribute('aria-hidden') !== 'true') element.setAttribute('aria-hidden', 'true');
    } else if (element.hasAttribute('aria-hidden')) {
      element.removeAttribute('aria-hidden');
    }
  };

  const forceSize = (element, width, height = width) => {
    if (!element) return;
    element.style.setProperty('width', width, 'important');
    element.style.setProperty('height', height, 'important');
    element.style.setProperty('min-width', width, 'important');
    element.style.setProperty('min-height', height, 'important');
    element.style.setProperty('box-sizing', 'border-box', 'important');
  };

  const enforceTouchTargets = () => {
    const compact = !isDesktop();
    const square = compact ? '60px' : '44px';

    document.querySelectorAll('.atlas-menu-toggle, .atlas-index-close, .header-action, .studio-term, .studio-mobile-summary-close')
      .forEach((element) => forceSize(element, square));

    document.querySelectorAll('.atlas-menu-toggle, .header-action')
      .forEach((element) => element.style.setProperty('flex-basis', square, 'important'));

    document.querySelectorAll('.atlas-index-toggle').forEach((element) => {
      if (compact) {
        element.style.setProperty('width', '128px', 'important');
        element.style.setProperty('min-width', '128px', 'important');
        element.style.setProperty('height', '60px', 'important');
        element.style.setProperty('min-height', '60px', 'important');
        element.style.setProperty('padding-inline', '18px', 'important');
      } else {
        element.style.removeProperty('width');
        element.style.removeProperty('height');
        element.style.removeProperty('min-width');
        element.style.removeProperty('min-height');
        element.style.removeProperty('padding-inline');
      }
    });

    document.querySelectorAll('.studio-mobile-summary-toggle').forEach((element) => {
      element.style.setProperty('min-height', '60px', 'important');
      element.style.setProperty('box-sizing', 'border-box', 'important');
    });
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
      if (menuButton?.getAttribute('aria-expanded') !== 'false') menuButton?.setAttribute('aria-expanded', 'false');
      if (indexButton?.getAttribute('aria-expanded') !== 'false') indexButton?.setAttribute('aria-expanded', 'false');
      setInert(navigation, false);
      setInert(index, false);
    } else {
      if (!body.classList.contains('menu-open')) {
        if (menuButton?.getAttribute('aria-expanded') !== 'false') menuButton?.setAttribute('aria-expanded', 'false');
        setInert(navigation, true);
      }
      if (!body.classList.contains('index-open')) {
        if (indexButton?.getAttribute('aria-expanded') !== 'false') indexButton?.setAttribute('aria-expanded', 'false');
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
      if (studio.dataset.desktopLayout !== 'true') studio.dataset.desktopLayout = 'true';
      if (progress.parentElement !== layout) layout.insertBefore(progress, layout.firstChild);
      body.classList.remove('studio-summary-open');
    } else {
      if (studio.hasAttribute('data-desktop-layout')) delete studio.dataset.desktopLayout;
      if (progress.parentElement === layout) studio.insertBefore(progress, layout);
    }
  };

  const enhanceGuides = () => {
    document.querySelectorAll('.def-option-guide').forEach((guide) => {
      if (!guide.querySelector(':scope > div')) return;
      const existing = guide.nextElementSibling?.classList.contains('audit-guide-toggle')
        ? guide.nextElementSibling
        : null;
      if (guide.dataset.compactGuide === 'true' && existing) return;

      guide.dataset.compactGuide = 'true';
      const button = existing || document.createElement('button');
      button.type = 'button';
      button.className = 'audit-guide-toggle';
      button.setAttribute('aria-expanded', 'false');
      button.textContent = 'Entender melhor';
      if (!existing) guide.insertAdjacentElement('afterend', button);
      if (button.dataset.bound !== 'true') {
        button.dataset.bound = 'true';
        button.addEventListener('click', () => {
          const expanded = button.getAttribute('aria-expanded') === 'true';
          button.setAttribute('aria-expanded', String(!expanded));
          button.textContent = expanded ? 'Entender melhor' : 'Ocultar detalhes';
          guide.classList.toggle('is-expanded', !expanded);
        });
      }
    });

    document.querySelectorAll('.audit-guide-toggle').forEach((button) => {
      if (!button.previousElementSibling?.classList.contains('def-option-guide')) button.remove();
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
            if (other !== details && other.open) other.open = false;
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
    const nextCost = summaryCost();
    if (cost && cost.textContent !== nextCost) cost.textContent = nextCost;

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
      const button = document.querySelector('.atlas-menu-toggle');
      if (button?.getAttribute('aria-expanded') !== 'false') button?.setAttribute('aria-expanded', 'false');
      setInert(document.querySelector('.atlas-global-nav, .site-header__nav'), true);
    }
    if (!body.classList.contains('index-open')) {
      const button = document.querySelector('.atlas-index-toggle');
      if (button?.getAttribute('aria-expanded') !== 'false') button?.setAttribute('aria-expanded', 'false');
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
    enforceTouchTargets();
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
