(() => {
  'use strict';

  const root = document.documentElement;
  const currentScript = document.currentScript;
  const scriptBaseUrl = currentScript?.src
    ? new URL('.', currentScript.src)
    : new URL('./js/', document.baseURI);

  const ensureCriticalStyles = () => {
    [
      ['final-responsive-fixes-style', '../css/correcao-final-responsiva.css?v=20260720m'],
      ['final-touch-targets-style', '../css/alvos-toque-final.css?v=20260720m']
    ].forEach(([id, path]) => {
      if (document.getElementById(id)) return;
      const link = document.createElement('link');
      link.id = id;
      link.rel = 'stylesheet';
      link.href = new URL(path, scriptBaseUrl).href;
      document.head.appendChild(link);
    });
  };

  ensureCriticalStyles();

  const syncBodyClasses = (desktop, touch) => {
    const body = document.body;
    if (!body) return;
    body.classList.toggle('ui-desktop', desktop);
    body.classList.toggle('ui-compact', !desktop);
    body.dataset.uiMode = desktop ? 'desktop' : 'compact';
    body.dataset.touchDevice = String(touch);
  };

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
    syncBodyClasses(desktop, touch);

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

  const loadGlobalCorrections = () => loadScript('correcao-final-interface.js', '20260720m')
    .then(() => loadScript('alvos-toque-final.js', '20260720m'));

  const loadMiracleStudio = () => {
    if (currentPage() !== 'construcao-guiada.html') return Promise.resolve();

    return loadScript('estudio-milagres-data.js', '20260720m')
      .then(() => loadScript('estudio-definitivo-data.js', '20260720m'))
      .then(() => loadScript('estudio-milagres.js', '20260720m'))
      .then(() => loadScript('cadencia-reformulada.js', '20260720m'))
      .then(() => loadScript('estudio-milagres-recomendador.js', '20260720m'))
      .then(() => loadScript('estudio-definitivo-ui.js', '20260720m'))
      .then(() => loadScript('estudio-opcoes-style.js', '20260720m'))
      .then(() => loadScript('estudio-definitivo-ajustes.js', '20260720m'))
      .then(() => loadScript('estudio-complexidade.js', '20260720m'))
      .then(() => loadScript('estudio-redacao-whatsapp.js', '20260720m'))
      .then(() => loadScript('estudio-coexistencia.js', '20260720m'))
      .then(() => loadScript('estudio-redacao-enxuta.js', '20260720m'))
      .then(() => loadScript('estudio-desktop-layout.js', '20260720m'))
      .then(() => loadScript('estudio-fluxo-final.js', '20260720m'))
      .then(loadGlobalCorrections);
  };

  const loadCadenceReference = () => {
    if (currentPage() === 'construcao-guiada.html') return Promise.resolve();
    return loadScript('cadencia-reformulada.js', '20260720m');
  };

  const loadContextualSystemGuide = () => {
    const systemsPage = document.body?.classList.contains('systems-page');
    if (!systemsPage) {
      loadGlobalCorrections().catch((error) => console.error('Falha ao carregar correções responsivas.', error));
      return;
    }
    if (root.dataset.systemGuideBoot === 'true') return;
    root.dataset.systemGuideBoot = 'true';

    loadScript('base-regras-sistemas.js', '20260720a')
      .then(() => loadScript('sistema-guiado-core.js', '20260720a'))
      .then(() => loadScript('sistema-guiado-secoes.js', '20260720a'))
      .then(loadCadenceReference)
      .then(loadMiracleStudio)
      .then(loadGlobalCorrections)
      .catch((error) => {
        root.dataset.systemGuideBoot = 'error';
        console.error('Falha ao carregar a camada didática dos Sistemas.', error);
      });
  };

  window.addEventListener('resize', schedule, { passive: true });
  window.addEventListener('orientationchange', schedule, { passive: true });
  window.visualViewport?.addEventListener('resize', schedule, { passive: true });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      detect();
      loadContextualSystemGuide();
    }, { once: true });
  } else {
    detect();
    loadContextualSystemGuide();
  }
})();
