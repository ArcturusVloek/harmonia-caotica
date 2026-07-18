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

  /*
   * O índice editorial apenas destaca a seção atual. A versão anterior usava
   * scrollIntoView() em cada mudança de seção, o que podia mover o documento
   * principal e devolver o leitor ao topo. Mantemos somente uma centralização
   * horizontal local quando o índice móvel realmente possui overflow.
   */
  const stabilizeIndexNavigation = () => {
    document.querySelectorAll('.content-index a[href^="#"]').forEach((link) => {
      link.scrollIntoView = () => {
        const list = link.closest('.content-index__list, .territory-index__list');
        if (!list || list.scrollWidth <= list.clientWidth) return;

        const left = link.offsetLeft - ((list.clientWidth - link.clientWidth) / 2);
        list.scrollTo({ left: Math.max(0, left), behavior: 'auto' });
      };
    });
  };

  loadScript('editorial-core.js', '20260718b')
    .then(() => {
      stabilizeIndexNavigation();

      if (document.body.classList.contains('systems-page') && !systemsScriptAlreadyLoaded()) {
        return loadScript('sistemas.js', '20260718a');
      }
      return undefined;
    })
    .catch((error) => {
      console.error('Falha ao carregar os recursos editoriais de Harmonia Caótica.', error);
    });
})();
