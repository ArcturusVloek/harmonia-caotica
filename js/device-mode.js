(() => {
  'use strict';

  const root = document.documentElement;
  const currentScript = document.currentScript;
  const scriptBaseUrl = currentScript?.src
    ? new URL('.', currentScript.src)
    : new URL('./js/', document.baseURI);

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

  const loadScript = (name, version) => new Promise((resolve, reject) => {
    const existing = [...document.scripts].find((script) => script.src.includes(`/${name}`));
    if (existing) {
      if (existing.dataset.loaded === 'true') resolve();
      else {
        existing.addEventListener('load', resolve, { once: true });
        existing.addEventListener('error', reject, { once: true });
      }
      return;
    }

    const script = document.createElement('script');
    const url = new URL(name, scriptBaseUrl);
    url.searchParams.set('v', version);
    script.src = url.href;
    script.async = false;
    script.addEventListener('load', () => {
      script.dataset.loaded = 'true';
      resolve();
    }, { once: true });
    script.addEventListener('error', reject, { once: true });
    document.head.appendChild(script);
  });

  const currentPage = () => window.location.pathname.split('/').filter(Boolean).pop() || 'index.html';

  const loadMiracleStudio = () => {
    if (currentPage() !== 'construcao-guiada.html') return Promise.resolve();

    return loadScript('estudio-milagres-data.js', '20260720d')
      .then(() => loadScript('estudio-definitivo-data.js', '20260720d'))
      .then(() => loadScript('estudio-milagres.js', '20260720d'))
      .then(() => loadScript('estudio-milagres-recomendador.js', '20260720d'))
      .then(() => loadScript('estudio-definitivo-ui.js', '20260720d'))
      .then(() => loadScript('estudio-desktop-layout.js', '20260720d'));
  };

  const loadContextualSystemGuide = () => {
    if (!document.body?.classList.contains('systems-page')) return;
    if (root.dataset.systemGuideBoot === 'true') return;
    root.dataset.systemGuideBoot = 'true';

    loadScript('base-regras-sistemas.js', '20260720a')
      .then(() => loadScript('sistema-guiado-core.js', '20260720a'))
      .then(() => loadScript('sistema-guiado-secoes.js', '20260720a'))
      .then(loadMiracleStudio)
      .catch((error) => {
        root.dataset.systemGuideBoot = 'error';
        console.error('Falha ao carregar a camada didática dos Sistemas.', error);
      });
  };

  window.addEventListener('resize', schedule, { passive: true });
  window.addEventListener('orientationchange', schedule, { passive: true });
  window.visualViewport?.addEventListener('resize', schedule, { passive: true });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadContextualSystemGuide, { once: true });
  } else {
    loadContextualSystemGuide();
  }
})();
