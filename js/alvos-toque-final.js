(() => {
  'use strict';
  if (document.getElementById('final-touch-targets-style')) return;
  const script = document.currentScript;
  const base = script?.src ? new URL('.', script.src) : new URL('./js/', document.baseURI);
  const link = document.createElement('link');
  link.id = 'final-touch-targets-style';
  link.rel = 'stylesheet';
  link.href = new URL('../css/alvos-toque-final.css?v=20260720l', base).href;
  document.head.appendChild(link);
})();
