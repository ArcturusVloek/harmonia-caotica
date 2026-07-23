(() => {
  'use strict';

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