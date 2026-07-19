(() => {
  'use strict';

  if (window.location.pathname.split('/').pop() !== 'construcao-guiada.html') return;

  const root = document.documentElement;
  const currentScript = document.currentScript;
  const scriptBase = currentScript?.src ? new URL('.', currentScript.src) : new URL('../js/', document.baseURI);
  let frame = 0;

  const ensureStylesheet = () => {
    if (document.getElementById('miracle-studio-desktop-style')) return;
    const link = document.createElement('link');
    link.id = 'miracle-studio-desktop-style';
    link.rel = 'stylesheet';
    link.href = new URL('../css/estudio-desktop.css?v=20260720c', scriptBase).href;
    document.head.appendChild(link);
  };

  const isDesktop = () => root.classList.contains('ui-desktop') || window.matchMedia('(min-width: 1180px) and (pointer: fine)').matches;

  const apply = () => {
    frame = 0;
    const studio = document.querySelector('.miracle-studio');
    const progress = studio?.querySelector('.studio-progress');
    const layout = studio?.querySelector('.miracle-studio__layout');
    if (!studio || !progress || !layout) return;

    if (isDesktop()) {
      studio.dataset.desktopLayout = 'true';
      if (progress.parentElement !== layout) layout.insertBefore(progress, layout.firstChild);
    } else {
      delete studio.dataset.desktopLayout;
      if (progress.parentElement === layout) studio.insertBefore(progress, layout);
    }
  };

  const schedule = () => {
    if (frame) return;
    frame = window.requestAnimationFrame(apply);
  };

  const start = () => {
    ensureStylesheet();
    const host = document.querySelector('.miracle-studio-host');
    if (!host) {
      window.setTimeout(start, 80);
      return;
    }

    const observer = new MutationObserver(schedule);
    observer.observe(host, { childList: true, subtree: true });
    new MutationObserver(schedule).observe(root, { attributes: true, attributeFilter: ['class', 'data-ui-mode'] });
    window.addEventListener('resize', schedule, { passive: true });
    window.addEventListener('orientationchange', schedule, { passive: true });
    schedule();
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, { once: true });
  else start();
})();
