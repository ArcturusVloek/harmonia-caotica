(() => {
  'use strict';
  if (window.location.pathname.split('/').pop() !== 'construcao-guiada.html') return;
  if (document.getElementById('miracle-studio-options-style')) return;
  const script = document.currentScript;
  const base = script?.src ? new URL('.', script.src) : new URL('../js/', document.baseURI);
  const link = document.createElement('link');
  link.id = 'miracle-studio-options-style';
  link.rel = 'stylesheet';
  link.href = new URL('../css/estudio-opcoes.css?v=20260720d', base).href;
  document.head.appendChild(link);
})();
