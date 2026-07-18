(() => {
  'use strict';

  const currentScript = document.currentScript;
  const baseUrl = currentScript?.src
    ? new URL('.', currentScript.src)
    : new URL('./js/', document.baseURI);

  const loadScript = (name, version = '') => new Promise((resolve, reject) => {
    const script = document.createElement('script');
    const url = new URL(name, baseUrl);
    if (version) url.searchParams.set('v', version);
    script.src = url.href;
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
        return loadScript('sistemas.js', '20260718a');
      }
      return undefined;
    })
    .catch((error) => {
      console.error('Falha ao carregar os recursos editoriais de Harmonia Caótica.', error);
    });
})();
