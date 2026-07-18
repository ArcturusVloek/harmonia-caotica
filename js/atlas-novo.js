(() => {
  'use strict';

  const script = document.currentScript;
  const siteRoot = script?.src
    ? new URL('../', script.src)
    : new URL('/harmonia-caotica/', window.location.origin);
  const href = (path) => new URL(path, siteRoot).href;
  const body = document.body;
  const home = body.classList.contains('home-page');
  const systemsPage = body.classList.contains('systems-page');

  const ensureStylesheet = (id, path) => {
    if (document.getElementById(id)) return;
    const link = document.createElement('link');
    link.id = id;
    link.rel = 'stylesheet';
    link.href = href(path);
    document.head.appendChild(link);
  };

  const rootStyles = window.getComputedStyle(document.documentElement);
  const bodyStyles = window.getComputedStyle(body);

  /* Fallback para páginas que ainda estejam usando uma versão antiga do CSS em cache. */
  if (rootStyles.getPropertyValue('--interface-menu-breakpoint').trim() !== '900px') {
    ensureStylesheet('atlas-interface-stable', 'css/interface-estavel.css?v=20260718a');
  }

  if (systemsPage && !bodyStyles.getPropertyValue('--block-1-accent').trim()) {
    ensureStylesheet('systems-block-colors', 'css/sistemas-cores-v2.css?v=20260718a');
  }

  body.classList.add('atlas-site');
  document.documentElement.classList.add('atlas-interface');

  const currentFile = window.location.pathname.split('/').filter(Boolean).pop() || 'index.html';
  const systemBlocks = {
    'fundamentos-dos-milagres.html': 1,
    'alcance-alvos-area-e-movimento.html': 2,
    'criacoes-invocacoes-e-manifestacoes-separadas.html': 3,
    'propagacao-reproducao-e-crescimento.html': 4,
    'travessias-e-caminhos-sobrenaturais.html': 5
  };

  if (systemsPage && systemBlocks[currentFile]) {
    body.classList.add(`system-block-${systemBlocks[currentFile]}`);
  }

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
    if (systemsPage) return 'sistemas';
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
    navigation.id ||= 'atlas-global-navigation';

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

  const index = document.querySelector('.content-index');
  if (index) index.id ||= 'indice-da-pagina';

  const menuDesktop = window.matchMedia('(min-width: 900px)');
  const indexDesktop = window.matchMedia('(min-width: 1024px)');

  let menuButton = headerInner?.querySelector('.atlas-menu-toggle') || null;
  if (headerInner && navigation && !menuButton) {
    menuButton = document.createElement('button');
    menuButton.type = 'button';
    menuButton.className = 'atlas-menu-toggle';
    menuButton.textContent = 'Menu';
    headerInner.appendChild(menuButton);
  }

  if (menuButton && navigation) {
    menuButton.setAttribute('aria-controls', navigation.id);
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Abrir navegação');
  }

  let indexButton = headerInner?.querySelector('.atlas-index-toggle') || null;
  if (headerInner && index && !home && !indexButton) {
    indexButton = document.createElement('button');
    indexButton.type = 'button';
    indexButton.className = 'atlas-index-toggle';
    indexButton.textContent = 'Sumário';
    headerInner.appendChild(indexButton);
  }

  if (indexButton && index) {
    indexButton.setAttribute('aria-controls', index.id);
    indexButton.setAttribute('aria-expanded', 'false');
  }

  if (index && !home) {
    const wrapper = index.querySelector(':scope > .mobile-container') || index;
    if (!wrapper.querySelector('.atlas-index-close')) {
      const close = document.createElement('button');
      close.type = 'button';
      close.className = 'atlas-index-close';
      close.textContent = 'Fechar sumário';
      wrapper.prepend(close);
    }
  }

  let scrim = document.querySelector('.atlas-scrim');
  if (!scrim) {
    scrim = document.createElement('button');
    scrim.type = 'button';
    scrim.className = 'atlas-scrim';
    scrim.setAttribute('aria-label', 'Fechar painel aberto');
    body.appendChild(scrim);
  }

  const setInert = (element, value) => {
    if (!element) return;
    if ('inert' in element) element.inert = value;
    if (value) element.setAttribute('aria-hidden', 'true');
    else element.removeAttribute('aria-hidden');
  };

  const setMenuOpen = (open, focusFirst = false) => {
    const mayOpen = Boolean(open && !menuDesktop.matches && navigation);
    body.classList.toggle('menu-open', mayOpen);
    menuButton?.setAttribute('aria-expanded', String(mayOpen));
    menuButton?.setAttribute('aria-label', mayOpen ? 'Fechar navegação' : 'Abrir navegação');
    setInert(navigation, !menuDesktop.matches && !mayOpen);

    if (mayOpen && focusFirst) {
      window.requestAnimationFrame(() => navigation?.querySelector('a')?.focus());
    }
  };

  const setIndexOpen = (open, focusFirst = false) => {
    const mayOpen = Boolean(open && !indexDesktop.matches && index);
    body.classList.toggle('index-open', mayOpen);
    indexButton?.setAttribute('aria-expanded', String(mayOpen));
    setInert(index, !indexDesktop.matches && !mayOpen);

    if (mayOpen && focusFirst) {
      window.requestAnimationFrame(() => {
        index?.querySelector('.atlas-index-close, a')?.focus();
      });
    }
  };

  const closePanels = ({ restoreFocus = false } = {}) => {
    const menuWasOpen = body.classList.contains('menu-open');
    const indexWasOpen = body.classList.contains('index-open');
    setMenuOpen(false);
    setIndexOpen(false);

    if (restoreFocus) {
      if (menuWasOpen) menuButton?.focus();
      else if (indexWasOpen) indexButton?.focus();
    }
  };

  menuButton?.addEventListener('click', () => {
    const open = !body.classList.contains('menu-open');
    setIndexOpen(false);
    setMenuOpen(open, open);
  });

  indexButton?.addEventListener('click', () => {
    const open = !body.classList.contains('index-open');
    setMenuOpen(false);
    setIndexOpen(open, open);
  });

  index?.querySelector('.atlas-index-close')?.addEventListener('click', () => {
    closePanels({ restoreFocus: true });
  });

  scrim.addEventListener('click', () => closePanels({ restoreFocus: true }));

  navigation?.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => closePanels());
  });

  index?.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => closePanels());
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closePanels({ restoreFocus: true });
  });

  const syncResponsiveState = () => {
    if (menuDesktop.matches) setMenuOpen(false);
    else setInert(navigation, !body.classList.contains('menu-open'));

    if (indexDesktop.matches) setIndexOpen(false);
    else setInert(index, !body.classList.contains('index-open'));
  };

  if (menuDesktop.addEventListener) menuDesktop.addEventListener('change', syncResponsiveState);
  else menuDesktop.addListener(syncResponsiveState);

  if (indexDesktop.addEventListener) indexDesktop.addEventListener('change', syncResponsiveState);
  else indexDesktop.addListener(syncResponsiveState);

  window.addEventListener('pageshow', syncResponsiveState);
  syncResponsiveState();

  document.documentElement.classList.add('atlas-ready');
})();
