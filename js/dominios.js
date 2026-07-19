(() => {
  'use strict';

  const currentScript = document.currentScript;
  const scriptBase = currentScript?.src
    ? new URL('.', currentScript.src)
    : new URL('./js/', document.baseURI);
  const siteRoot = new URL('../', scriptBase);

  const loadDidacticLayer = () => {
    if (!document.querySelector('link[data-rule-guide-style]')) {
      const stylesheet = document.createElement('link');
      stylesheet.rel = 'stylesheet';
      stylesheet.href = new URL('css/regra-guiada.css?v=20260719a', siteRoot).href;
      stylesheet.dataset.ruleGuideStyle = 'true';
      document.head.appendChild(stylesheet);
    }

    if (!document.querySelector('script[data-rule-guide-script]')) {
      const script = document.createElement('script');
      script.src = new URL('js/regra-guiada.js?v=20260719a', siteRoot).href;
      script.async = false;
      script.dataset.ruleGuideScript = 'true';
      document.head.appendChild(script);
    }
  };

  const openTargetBranch = () => {
    if (!window.location.hash) return;
    const id = decodeURIComponent(window.location.hash.slice(1));
    const target = document.getElementById(id);
    const branch = target?.closest('details.domain-branch');
    if (branch) branch.open = true;
  };

  const removeCrossDomainLinks = () => {
    const currentPath = window.location.pathname;
    const domainPagePattern = /\/dominios\/[^/]+\.html$/;

    document.querySelectorAll('a[href]').forEach((link) => {
      const rawHref = link.getAttribute('href');
      if (!rawHref) return;
      const destination = new URL(rawHref, window.location.href);
      const linksToAnotherDomain =
        destination.origin === window.location.origin &&
        domainPagePattern.test(destination.pathname) &&
        destination.pathname !== currentPath;
      if (linksToAnotherDomain) link.remove();
    });
  };

  loadDidacticLayer();

  document.addEventListener('DOMContentLoaded', () => {
    removeCrossDomainLinks();
    openTargetBranch();

    document.querySelectorAll('a[href^="#"]').forEach((link) => {
      link.addEventListener('click', () => {
        const id = decodeURIComponent(link.hash.slice(1));
        const target = document.getElementById(id);
        const branch = target?.closest('details.domain-branch');
        if (branch) branch.open = true;
      });
    });

    document.querySelectorAll('details.domain-branch').forEach((branch) => {
      branch.addEventListener('toggle', () => {
        const summary = branch.querySelector(':scope > summary');
        summary?.setAttribute('aria-expanded', branch.open ? 'true' : 'false');
      });
    });
  });

  window.addEventListener('hashchange', openTargetBranch);
})();
