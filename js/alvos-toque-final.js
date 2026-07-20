(() => {
  'use strict';

  const root = document.documentElement;
  const script = document.currentScript;
  const base = script?.src ? new URL('.', script.src) : new URL('./js/', document.baseURI);
  let link = document.getElementById('final-touch-targets-style');

  if (!link) {
    link = document.createElement('link');
    link.id = 'final-touch-targets-style';
    link.rel = 'stylesheet';
    link.href = new URL('../css/alvos-toque-final.css?v=20260720p', base).href;
  }

  const markReady = () => {
    if (link.parentElement === document.head) document.head.appendChild(link);
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        root.dataset.interfaceCorrectionsReady = 'true';
      });
    });
  };

  if (link.parentElement !== document.head) document.head.appendChild(link);

  if (link.sheet) markReady();
  else {
    link.addEventListener('load', markReady, { once: true });
    link.addEventListener('error', () => {
      root.dataset.interfaceCorrectionsReady = 'error';
    }, { once: true });
  }
})();
