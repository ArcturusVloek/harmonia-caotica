(() => {
  'use strict';

  const root = document.documentElement;
  const scriptUrl = document.currentScript?.src;
  const siteRoot = scriptUrl
    ? new URL('../', scriptUrl)
    : new URL('/harmonia-caotica/', window.location.origin);

  const hiddenSystemsStyle = document.createElement('style');
  hiddenSystemsStyle.textContent = '#jogar,a[href*="sistemas/"]{display:none!important}';
  document.head.appendChild(hiddenSystemsStyle);

  const detect = () => {
    const ua = navigator.userAgent || '';
    const platform = navigator.platform || '';
    const maxTouchPoints = navigator.maxTouchPoints || 0;
    const ios = /iPad|iPhone|iPod/i.test(ua) || (platform === 'MacIntel' && maxTouchPoints > 1);
    const android = /Android/i.test(ua);
    const mobileUa = /Mobile|IEMobile|Opera Mini/i.test(ua);
    const coarse = window.matchMedia?.('(pointer: coarse)').matches ?? false;
    const fine = window.matchMedia?.('(pointer: fine)').matches ?? false;
    const hover = window.matchMedia?.('(hover: hover)').matches ?? false;
    const touch = maxTouchPoints > 0 || coarse;
    const width = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);

    const desktop = width >= 1024
      && fine
      && hover
      && !ios
      && !android
      && !mobileUa
      && !(touch && width < 1366);

    root.classList.toggle('ui-desktop', desktop);
    root.classList.toggle('ui-compact', !desktop);
    root.dataset.uiMode = desktop ? 'desktop' : 'compact';
    root.dataset.touchDevice = String(touch);
    root.style.setProperty('--visual-viewport-height', `${window.visualViewport?.height || window.innerHeight}px`);

    return desktop;
  };

  const normalizeMenuTargets = () => {
    const destinations = new Map([
      ['início', 'index.html'],
      ['inicio', 'index.html'],
      ['mundo', 'index.html#mundo'],
      ['divindades', 'index.html#divindades'],
      ['deuses', 'index.html#divindades'],
      ['territórios', 'index.html#territorios'],
      ['territorios', 'index.html#territorios'],
      ['terras', 'index.html#territorios']
    ]);

    document.querySelectorAll('.atlas-global-nav a, .site-header__nav a').forEach((link) => {
      const label = (link.textContent || '').trim().toLocaleLowerCase('pt-BR');
      const destination = destinations.get(label);

      if (destination) {
        link.href = new URL(destination, siteRoot).href;
      } else if (label === 'sistemas') {
        link.remove();
      }
    });
  };

  const removeSystemsSurface = () => {
    document.querySelector('#jogar')?.remove();

    const heroPrimary = document.querySelector('.home-hero__actions .button--primary[href*="sistemas/"]');
    if (heroPrimary) {
      heroPrimary.href = new URL('mundo/origem.html', siteRoot).href;
      heroPrimary.textContent = 'Conhecer a origem';
    }

    const scrollMark = document.querySelector('.home-hero .scroll-mark');
    if (scrollMark?.getAttribute('href') === '#jogar') {
      scrollMark.href = '#mundo';
      scrollMark.setAttribute('aria-label', 'Ir para a origem de Vaelora');
    }

    document.querySelectorAll('a[href*="sistemas/"]').forEach((link) => {
      const navigationItem = link.closest('nav li');
      if (navigationItem) navigationItem.remove();
      else link.remove();
    });

    document.querySelectorAll('.bottom-navigation-list').forEach((list) => {
      const itemCount = list.querySelectorAll(':scope > li').length;
      if (itemCount > 0) list.style.gridTemplateColumns = `repeat(${itemCount},1fr)`;
    });

    document.querySelectorAll('.archive-section__intro p').forEach((paragraph) => {
      paragraph.textContent = paragraph.textContent.replace('mapas, criaturas e sistemas', 'mapas, criaturas e registros');
    });

    normalizeMenuTargets();
  };

  const initializeControls = () => {
    const body = document.body;
    const menuButton = document.querySelector('.atlas-menu-toggle');
    const indexButton = document.querySelector('.atlas-index-toggle');
    const navigation = document.querySelector('.atlas-global-nav, .site-header__nav');
    const index = document.querySelector('.content-index');
    const scrim = document.querySelector('.atlas-scrim');

    if (!body || (!menuButton && !indexButton)) return;

    let desiredPanel = null;
    let applying = false;

    const makeUsable = (element, visible) => {
      if (!element) return;

      element.removeAttribute('inert');
      try {
        element.inert = false;
      } catch (_) {}

      if (visible) element.removeAttribute('aria-hidden');
      else element.setAttribute('aria-hidden', 'true');
    };

    const applyPanelState = () => {
      if (applying) return;
      applying = true;

      const compact = root.classList.contains('ui-compact');
      if (!compact) desiredPanel = null;

      const menuOpen = compact && desiredPanel === 'menu' && Boolean(navigation);
      const indexOpen = compact && desiredPanel === 'index' && Boolean(index);

      body.classList.toggle('menu-open', menuOpen);
      body.classList.toggle('index-open', indexOpen);

      menuButton?.setAttribute('aria-expanded', String(menuOpen));
      menuButton?.setAttribute('aria-label', menuOpen ? 'Fechar navegação' : 'Abrir navegação');
      indexButton?.setAttribute('aria-expanded', String(indexOpen));
      indexButton?.setAttribute('aria-label', indexOpen ? 'Fechar sumário' : 'Abrir sumário');

      makeUsable(navigation, menuOpen || !compact);
      makeUsable(index, indexOpen || !compact);

      applying = false;
    };

    const closePanels = () => {
      desiredPanel = null;
      applyPanelState();
    };

    const goTo = (link) => {
      const destination = link?.href;
      if (!destination) return;

      closePanels();
      window.location.assign(destination);
    };

    document.addEventListener('click', (event) => {
      const target = event.target instanceof Element ? event.target : null;
      if (!target) return;

      if (menuButton && (target === menuButton || menuButton.contains(target))) {
        event.preventDefault();
        event.stopImmediatePropagation();
        desiredPanel = desiredPanel === 'menu' ? null : 'menu';
        applyPanelState();
        return;
      }

      if (indexButton && (target === indexButton || indexButton.contains(target))) {
        event.preventDefault();
        event.stopImmediatePropagation();
        desiredPanel = desiredPanel === 'index' ? null : 'index';
        applyPanelState();
        return;
      }

      const closeButton = target.closest('.atlas-index-close');
      if (closeButton) {
        event.preventDefault();
        event.stopImmediatePropagation();
        closePanels();
        indexButton?.focus({ preventScroll: true });
        return;
      }

      if (scrim && (target === scrim || scrim.contains(target))) {
        event.preventDefault();
        event.stopImmediatePropagation();
        closePanels();
        return;
      }

      const link = target.closest('a[href]');
      if (!link) return;

      const insideNavigation = navigation?.contains(link);
      const insideIndex = index?.contains(link);
      if (!insideNavigation && !insideIndex) return;
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      event.preventDefault();
      event.stopImmediatePropagation();
      goTo(link);
    }, true);

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && desiredPanel) closePanels();
    });

    let observerFrame = 0;
    const scheduleRepair = () => {
      window.cancelAnimationFrame(observerFrame);
      observerFrame = window.requestAnimationFrame(() => {
        normalizeMenuTargets();
        applyPanelState();
      });
    };

    const observer = new MutationObserver(scheduleRepair);
    observer.observe(body, { attributes: true, attributeFilter: ['class'] });
    if (navigation) observer.observe(navigation, { attributes: true, childList: true, subtree: true });
    if (index) observer.observe(index, { attributes: true, childList: true, subtree: true });

    const handleViewportChange = () => {
      detect();
      scheduleRepair();
    };

    window.addEventListener('resize', handleViewportChange, { passive: true });
    window.addEventListener('orientationchange', handleViewportChange, { passive: true });
    window.addEventListener('pageshow', handleViewportChange);
    window.visualViewport?.addEventListener('resize', handleViewportChange, { passive: true });

    applyPanelState();
  };

  window.HarmoniaDeviceMode = { detect };
  detect();

  const initialize = () => {
    removeSystemsSurface();
    normalizeMenuTargets();
    initializeControls();

    window.setTimeout(() => {
      removeSystemsSurface();
      normalizeMenuTargets();
    }, 0);
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialize, { once: true });
  } else {
    initialize();
  }
})();