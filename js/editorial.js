(() => {
  'use strict';

  const currentScript = document.currentScript;
  const baseUrl = currentScript?.src
    ? new URL('.', currentScript.src)
    : new URL('./js/', document.baseURI);

  const loadScript = (name) => new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = new URL(name, baseUrl).href;
    script.async = false;
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });

  const systemsScriptAlreadyLoaded = () =>
    document.documentElement.classList.contains('systems-layout-ready') ||
    [...document.scripts].some((script) => /\/sistemas\.js(?:$|\?)/.test(script.src));

  loadScript('editorial-core.js')
    .then(() => {
      if (document.body.classList.contains('systems-page') && !systemsScriptAlreadyLoaded()) {
        return loadScript('sistemas.js');
      }
      return undefined;
    })
    .catch((error) => {
      console.error('Falha ao carregar os recursos editoriais de Harmonia Caótica.', error);
    });
})();
