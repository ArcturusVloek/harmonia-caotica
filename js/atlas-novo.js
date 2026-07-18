(() => {
  'use strict';

  const script = document.currentScript;
  const siteRoot = script?.src
    ? new URL('../', script.src)
    : new URL('/harmonia-caotica/', window.location.origin);
  const href = (path) => new URL(path, siteRoot).href;
  const body = document.body;
  const home = body.classList.contains('home-page');

  body.classList.add('atlas-site');
  document.documentElement.classList.add('atlas-interface');

  const main = document.querySelector('main');
  if (main && !main.id) main.id = 'conteudo-principal';

  if (!document.querySelector('.atlas-skip-link')) {
    const skip = document.createElement('a');
    skip.className = 'atlas-skip-link';
    skip.href = '#conteudo-principal';
    skip.textContent = 'Pular para o conteúdo';
    body.prepend(skip);
  }

  const header = document.querySelector('.site-header, .mobile-header');
  const headerInner = header?.querySelector('.site-header__inner, .mobile-header-inner');

  const pageKind = () => {
    if (home) return 'inicio';
    if (body.classList.contains('systems-page')) return 'sistemas';
    if (body.classList.contains('territory-page')) return 'territorios';
    if (body.classList.contains('deity-page') || body.classList.contains('domain-page')) return 'divindades';
    return 'mundo';
  };

  const navItems = [
    ['inicio', 'index.html', 'Início'],
    ['mundo', 'index.html#mundo', 'Mundo'],
    ['divindades', 'index.html#divindades', 'Divindades'],
    ['territorios', 'index.html#territorios', 'Territórios'],
    ['sistemas', 'sistemas/index.html', 'Sistemas']
  ];

  let navigation = header?.querySelector('.site-header__nav, .atlas-global-nav');
  if (headerInner && !navigation) {
    navigation = document.createElement('nav');
    navigation.setAttribute('aria-label', 'Navegação principal');
    headerInner.appendChild(navigation);
  }

  if (navigation) {
    navigation.classList.add('atlas-global-nav');
    if (!home) {
      navigation.replaceChildren(...navItems.map(([key, path, label]) => {
        const link = document.createElement('a');
        link.href = href(path);
        link.textContent = label;
        if (key === pageKind()) link.setAttribute('aria-current', 'page');
        return link;
      }));
    }
  }

  const closePanels = () => {
    body.classList.remove('menu-open', 'index-open');
    menuButton?.setAttribute('aria-expanded', 'false');
    indexButton?.setAttribute('aria-expanded', 'false');
  };

  let menuButton = null;
  if (headerInner && navigation) {
    menuButton = document.createElement('button');
    menuButton.type = 'button';
    menuButton.className = 'atlas-menu-toggle';
    menuButton.setAttribute('aria-label', 'Abrir navegação');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.textContent = 'Menu';
    menuButton.addEventListener('click', () => {
      const open = !body.classList.contains('menu-open');
      closePanels();
      body.classList.toggle('menu-open', open);
      menuButton.setAttribute('aria-expanded', String(open));
      menuButton.setAttribute('aria-label', open ? 'Fechar navegação' : 'Abrir navegação');
    });
    headerInner.appendChild(menuButton);
  }

  const index = document.querySelector('.content-index');
  let indexButton = null;

  if (headerInner && index && !home) {
    indexButton = document.createElement('button');
    indexButton.type = 'button';
    indexButton.className = 'atlas-index-toggle';
    indexButton.setAttribute('aria-controls', index.id || 'indice-da-pagina');
    indexButton.setAttribute('aria-expanded', 'false');
    indexButton.textContent = 'Sumário';
    indexButton.addEventListener('click', () => {
      const open = !body.classList.contains('index-open');
      closePanels();
      body.classList.toggle('index-open', open);
      indexButton.setAttribute('aria-expanded', String(open));
    });
    headerInner.appendChild(indexButton);

    const wrapper = index.querySelector(':scope > .mobile-container') || index;
    if (!wrapper.querySelector('.atlas-index-close')) {
      const close = document.createElement('button');
      close.type = 'button';
      close.className = 'atlas-index-close';
      close.textContent = 'Fechar sumário';
      close.addEventListener('click', closePanels);
      wrapper.prepend(close);
    }

    index.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', closePanels);
    });
  }

  if (!document.querySelector('.atlas-scrim')) {
    const scrim = document.createElement('button');
    scrim.type = 'button';
    scrim.className = 'atlas-scrim';
    scrim.setAttribute('aria-label', 'Fechar navegação');
    scrim.addEventListener('click', closePanels);
    body.appendChild(scrim);
  }

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closePanels();
  });

  navigation?.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closePanels);
  });

  const desktop = window.matchMedia('(min-width: 1024px)');
  const handleDesktop = (event) => {
    if (event.matches) closePanels();
  };

  if (desktop.addEventListener) desktop.addEventListener('change', handleDesktop);
  else desktop.addListener(handleDesktop);

  document.documentElement.classList.add('atlas-ready');
})();
