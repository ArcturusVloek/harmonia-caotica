(() => {
  'use strict';

  const root = document.documentElement;
  const removedSystemsStyle = document.createElement('style');
  removedSystemsStyle.textContent = '#jogar,a[href*="sistemas/"]{display:none!important}';
  document.head.appendChild(removedSystemsStyle);

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

    /*
     * O modo amplo só é liberado para uma janela larga com mouse ou touchpad.
     * Android, iOS e tablets continuam compactos mesmo quando solicitam a
     * versão para computador do navegador.
     */
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

  const removeSystemsSurface = () => {
    document.querySelector('#jogar')?.remove();

    const heroPrimary = document.querySelector('.home-hero__actions .button--primary[href*="sistemas/"]');
    if (heroPrimary) {
      heroPrimary.href = 'mundo/origem.html';
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
  };

  const repairHeaderControls = () => {
    const body = document.body;
    const menuButton = document.querySelector('.atlas-menu-toggle');
    const indexButton = document.querySelector('.atlas-index-toggle');
    const navigation = document.querySelector('.atlas-global-nav, .site-header__nav');
    const index = document.querySelector('.content-index');
    const indexClose = index?.querySelector('.atlas-index-close');
    const scrim = document.querySelector('.atlas-scrim');

    if (!body || (!menuButton && !indexButton)) return;

    let desiredPanel = null;

    const setInert = (element, value) => {
      if (!element) return;
      if ('inert' in element) element.inert = value;
      if (value) element.setAttribute('aria-hidden', 'true');
      else element.removeAttribute('aria-hidden');
    };

    const applyPanelState = () => {
      const compact = root.classList.contains('ui-compact');
      const menuOpen = compact && desiredPanel === 'menu' && Boolean(navigation);
      const indexOpen = compact && desiredPanel === 'index' && Boolean(index);

      body.classList.toggle('menu-open', menuOpen);
      body.classList.toggle('index-open', indexOpen);

      menuButton?.setAttribute('aria-expanded', String(menuOpen));
      menuButton?.setAttribute('aria-label', menuOpen ? 'Fechar navegação' : 'Abrir navegação');
      indexButton?.setAttribute('aria-expanded', String(indexOpen));
      indexButton?.setAttribute('aria-label', indexOpen ? 'Fechar sumário' : 'Abrir sumário');

      setInert(navigation, compact && !menuOpen);
      setInert(index, compact && !indexOpen);
    };

    const togglePanel = (panel) => {
      desiredPanel = desiredPanel === panel ? null : panel;
      applyPanelState();
    };

    const closePanels = () => {
      desiredPanel = null;
      applyPanelState();
    };

    menuButton?.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopImmediatePropagation();
      togglePanel('menu');
    }, true);

    indexButton?.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopImmediatePropagation();
      togglePanel('index');
    }, true);

    indexClose?.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopImmediatePropagation();
      closePanels();
      indexButton?.focus({ preventScroll: true });
    }, true);

    scrim?.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopImmediatePropagation();
      closePanels();
    }, true);

    navigation?.addEventListener('click', (event) => {
      if (event.target.closest('a')) closePanels();
    });

    index?.addEventListener('click', (event) => {
      if (event.target.closest('a')) closePanels();
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && desiredPanel) closePanels();
    });

    const restoreAfterViewportChange = () => {
      const wasDesktop = root.classList.contains('ui-desktop');
      detect();
      const isDesktop = root.classList.contains('ui-desktop');

      if (isDesktop) desiredPanel = null;
      else if (wasDesktop !== isDesktop) desiredPanel = null;

      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(applyPanelState);
      });
    };

    window.addEventListener('resize', restoreAfterViewportChange, { passive: true });
    window.addEventListener('orientationchange', restoreAfterViewportChange, { passive: true });
    window.addEventListener('pageshow', restoreAfterViewportChange);
    window.visualViewport?.addEventListener('resize', restoreAfterViewportChange, { passive: true });

    applyPanelState();
  };

  window.HarmoniaDeviceMode = { detect };
  detect();

  let scheduled = false;
  const schedule = () => {
    if (scheduled) return;
    scheduled = true;
    window.requestAnimationFrame(() => {
      scheduled = false;
      detect();
    });
  };

  window.addEventListener('resize', schedule, { passive: true });
  window.addEventListener('orientationchange', schedule, { passive: true });
  window.visualViewport?.addEventListener('resize', schedule, { passive: true });

  const initialize = () => {
    removeSystemsSurface();
    repairHeaderControls();
    window.setTimeout(removeSystemsSurface, 0);
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialize, { once: true });
  } else {
    initialize();
  }
})();