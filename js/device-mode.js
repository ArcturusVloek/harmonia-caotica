(() => {
  'use strict';

  const root = document.documentElement;

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

  window.addEventListener('resize', schedule, { passive: true });
  window.addEventListener('orientationchange', schedule, { passive: true });
  window.visualViewport?.addEventListener('resize', schedule, { passive: true });
})();
