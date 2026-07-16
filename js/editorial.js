(() => {
  'use strict';

  const ROMAN_BY_SLUG = {
    'senhor-das-chagas': 'I',
    'senhor-do-crepusculo': 'II',
    'senhora-da-aurora': 'III',
    'soberana-do-ceu': 'IV',
    'senhor-dos-veus': 'V',
    ruvia: 'I',
    umbra: 'II',
    alba: 'III',
    tirena: 'IV',
    nevia: 'V'
  };

  const LABELS_BY_SLUG = {
    'senhor-das-chagas': 'Registro Divino I',
    'senhor-do-crepusculo': 'Registro Divino II',
    'senhora-da-aurora': 'Registro Divino III',
    'soberana-do-ceu': 'Registro Divino IV',
    'senhor-dos-veus': 'Registro Divino V',
    ruvia: 'Registro Territorial I',
    umbra: 'Registro Territorial II',
    alba: 'Registro Territorial III',
    tirena: 'Registro Territorial IV',
    nevia: 'Registro Territorial V',
    origem: 'Registro Fundamental',
    sistemas: 'Registro de Regras'
  };

  const INDEX_EXCLUSIONS = new Set([
    'Conhecer o território',
    'Conhecer Rúvia',
    'Conhecer Umbra',
    'Conhecer Alba',
    'Conhecer Tirena',
    'Conhecer Névia'
  ]);

  const slugify = (value) => value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '') || 'secao';

  const uniqueId = (base, used) => {
    let candidate = base;
    let index = 2;
    while (used.has(candidate) || document.getElementById(candidate)) {
      candidate = `${base}-${index}`;
      index += 1;
    }
    used.add(candidate);
    return candidate;
  };

  const pageSlug = () => {
    const file = window.location.pathname.split('/').filter(Boolean).pop() || 'index.html';
    const parent = window.location.pathname.split('/').filter(Boolean).slice(-2, -1)[0] || '';
    if (file === 'index.html' && parent === 'sistemas') return 'sistemas';
    if (file === 'index.html') return 'inicio';
    return file.replace(/\.html$/i, '');
  };

  const pageKind = () => {
    if (document.body.classList.contains('home-page')) return 'home';
    if (document.body.classList.contains('territory-page')) return 'territory';
    if (document.body.classList.contains('deity-page')) return 'deity';
    if (window.location.pathname.includes('/mundo/')) return 'world';
    if (window.location.pathname.includes('/sistemas/')) return 'system';
    return 'article';
  };

  const pageTitle = () => {
    const heading = document.querySelector('main h1');
    return heading ? heading.textContent.replace(/\s+/g, ' ').trim() : document.title.split('—')[0].trim();
  };

  const readingRoot = () => document.querySelector('main article, main .territory-content, main [class$="-content"], main') || document.body;

  const readingMinutes = () => {
    const root = readingRoot();
    const clone = root.cloneNode(true);
    clone.querySelectorAll('nav, script, style, .archive-record, .content-index, .back-to-index').forEach((node) => node.remove());
    const words = (clone.textContent || '').trim().split(/\s+/).filter(Boolean).length;
    return Math.max(1, Math.ceil(words / 220));
  };

  const normalizeTerritoryClasses = () => {
    if (pageKind() !== 'territory') return;

    const mapping = [
      ['[class$="-hero"]', 'territory-hero'],
      ['[class$="-hero__layout"]', 'territory-hero__layout'],
      ['[class$="-hero__content"]', 'territory-hero__content'],
      ['[class$="-hero__index"]', 'territory-hero__index'],
      ['[class$="-hero__title"]', 'territory-hero__title'],
      ['[class$="-hero__domain"]', 'territory-hero__domain'],
      ['[class$="-hero__summary"]', 'territory-hero__summary'],
      ['[class$="-facts"]', 'territory-facts'],
      ['[class$="-fact"]', 'territory-fact'],
      ['nav[class$="-index"]', 'territory-index'],
      ['[class$="-index__list"]', 'territory-index__list'],
      ['article[class$="-content"]', 'territory-content'],
      ['[class$="-opening"]', 'territory-opening'],
      ['[class$="-opening__copy"]', 'territory-opening__copy'],
      ['[class$="-opening__lead"]', 'territory-opening__lead'],
      ['[class$="-section"]', 'territory-section'],
      ['[class$="-section__heading"]', 'territory-section__heading'],
      ['[class$="-section__number"]', 'territory-section__number'],
      ['[class$="-section__kicker"]', 'territory-section__kicker'],
      ['[class$="-section__summary"]', 'territory-section__summary']
    ];

    mapping.forEach(([selector, className]) => {
      document.querySelectorAll(selector).forEach((node) => node.classList.add(className));
    });

    document.querySelectorAll('article :is(article, div, aside)').forEach((node) => {
      if ([...node.classList].some((name) => /(?:card|entry|panel|note)$/.test(name))) {
        node.classList.add('territory-card');
      }
      if ([...node.classList].some((name) => /(?:grid|ledger)$/.test(name))) {
        node.classList.add('territory-grid');
      }
    });
  };

  const normalizeImages = () => {
    document.querySelectorAll('img').forEach((image) => {
      image.classList.add('editorial-image');
      image.decoding = 'async';

      const isHero = image.classList.contains('internal-hero-image') ||
        image.closest('.internal-hero, .territory-hero, [class$="-hero"]');

      if (isHero) {
        image.setAttribute('fetchpriority', 'high');
        image.removeAttribute('loading');
      } else {
        image.loading = 'lazy';
      }
    });
  };

  const ensureArchiveRecord = () => {
    const kind = pageKind();
    if (kind === 'home') return null;

    let record = document.querySelector('[data-auto-record], .archive-record');
    if (!record) {
      record = document.createElement('aside');
      record.className = 'archive-record';
      record.dataset.autoRecord = '';

      const hero = document.querySelector('main > section:first-child, main .internal-hero, main .territory-hero, main [class$="-hero"]');
      if (hero) hero.insertAdjacentElement('afterend', record);
      else document.querySelector('main')?.prepend(record);
    }

    record.classList.add('archive-record');

    const slug = pageSlug();
    const label = LABELS_BY_SLUG[slug] || (kind === 'deity' ? 'Registro Divino' : kind === 'territory' ? 'Registro Territorial' : 'Registro Canônico');
    const minutes = readingMinutes();
    const title = pageTitle();

    record.innerHTML = `
      <div class="mobile-container archive-record__inner">
        <div class="archive-record__identity">
          <p class="archive-record__eyebrow">Arquivo de Vaelora</p>
          <strong class="archive-record__title">${label} · ${title}</strong>
        </div>
        <div class="archive-record__meta" aria-label="Informações editoriais">
          <span>Versão canônica</span>
          <span>${minutes} min de leitura</span>
          <span>${kind === 'deity' ? 'Divindade e Domínios' : kind === 'territory' ? 'Geografia, cultura e economia' : kind === 'world' ? 'Fundamentos do mundo' : kind === 'system' ? 'Sistema de jogo' : 'Registro de Vaelora'}</span>
        </div>
      </div>`;

    return record;
  };

  const collectHeadings = () => {
    const kind = pageKind();
    const root = readingRoot();
    const selectors = kind === 'territory'
      ? '.territory-section h2, [class$="-section"] h2'
      : 'h2';

    const used = new Set();
    return [...root.querySelectorAll(selectors)]
      .filter((heading) => {
        if (!heading.textContent.trim()) return false;
        if (heading.closest('.related-territory') && kind === 'deity') return false;
        return !INDEX_EXCLUSIONS.has(heading.textContent.trim());
      })
      .map((heading) => {
        const text = heading.textContent.replace(/\s+/g, ' ').trim();
        if (!heading.id) heading.id = uniqueId(slugify(text), used);
        else used.add(heading.id);
        return { heading, text, id: heading.id };
      });
  };

  const existingTerritoryIndex = () => {
    if (pageKind() !== 'territory') return null;
    return document.querySelector('nav.territory-index, nav[class$="-index"]');
  };

  const ensureIndex = (record) => {
    const kind = pageKind();
    if (kind === 'home') return null;

    const headings = collectHeadings();
    if (!headings.length) return null;

    let index = existingTerritoryIndex() || document.querySelector('[data-auto-index], nav.content-index');

    if (!index) {
      index = document.createElement('nav');
      index.dataset.autoIndex = '';
      const anchor = record || document.querySelector('main > section:first-child');
      if (anchor) anchor.insertAdjacentElement('afterend', index);
      else readingRoot().insertAdjacentElement('beforebegin', index);
    }

    index.id = 'indice-da-pagina';
    index.classList.add('content-index');
    if (kind === 'territory') index.classList.add('territory-index');
    if (kind === 'deity') index.classList.add('deity-index');
    index.setAttribute('aria-label', `Índice de ${pageTitle()}`);

    const existingList = index.querySelector('ul');
    const wrapper = index.querySelector(':scope > .mobile-container') || document.createElement('div');
    wrapper.classList.add('mobile-container');

    if (!wrapper.isConnected) {
      const nodes = [...index.childNodes];
      index.replaceChildren(wrapper);
      nodes.forEach((node) => wrapper.appendChild(node));
    }

    let label = wrapper.querySelector('.content-index__label');
    if (!label) {
      label = document.createElement('p');
      label.className = 'content-index__label';
      label.textContent = 'Neste registro';
      wrapper.prepend(label);
    }

    const list = existingList || document.createElement('ul');
    list.classList.add('content-index__list');
    if (!list.isConnected) wrapper.appendChild(list);

    list.replaceChildren(...headings.map(({ text, id }, position) => {
      const item = document.createElement('li');
      const link = document.createElement('a');
      link.href = `#${id}`;
      link.textContent = text;
      if (position === 0) {
        link.classList.add('active');
        link.setAttribute('aria-current', 'true');
      }
      item.appendChild(link);
      return item;
    }));

    activateIndex(index, headings);
    return { index, headings };
  };

  const activateIndex = (index, headings) => {
    if (!('IntersectionObserver' in window)) return;

    const links = new Map(
      [...index.querySelectorAll('a[href^="#"]')].map((link) => [decodeURIComponent(link.hash.slice(1)), link])
    );

    const setActive = (id) => {
      links.forEach((link, key) => {
        const active = key === id;
        link.classList.toggle('active', active);
        if (active) {
          link.setAttribute('aria-current', 'true');
          link.scrollIntoView({ block: 'nearest', inline: 'center', behavior: 'smooth' });
        } else {
          link.removeAttribute('aria-current');
        }
      });
    };

    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
      if (visible?.target?.id) setActive(visible.target.id);
    }, {
      rootMargin: '-24% 0px -62% 0px',
      threshold: [0, .2, .6]
    });

    headings.forEach(({ heading }) => observer.observe(heading));
  };

  const ensureBackLinks = (indexData) => {
    if (!indexData) return;
    const { headings } = indexData;
    const kind = pageKind();

    headings.forEach(({ heading }, position) => {
      const section = heading.closest('section');
      let insertionTarget = null;

      if (section && section.querySelectorAll('h2').length === 1) {
        insertionTarget = section;
      } else {
        const nextHeading = headings[position + 1]?.heading;
        if (nextHeading) {
          insertionTarget = nextHeading.previousElementSibling?.classList.contains('article-divider')
            ? nextHeading.previousElementSibling
            : nextHeading;
        } else {
          insertionTarget = heading.closest('article')?.querySelector('.article-navigation, .territory-navigation, [class$="-navigation"]') || heading.closest('article');
        }
      }

      const scope = section || heading.parentElement;
      if (scope?.querySelector(`.back-to-index[data-for="${heading.id}"]`)) return;

      const link = document.createElement('a');
      link.className = 'back-to-index';
      link.href = '#indice-da-pagina';
      link.dataset.for = heading.id;
      link.textContent = kind === 'territory' ? 'Retornar ao índice territorial' : 'Retornar ao índice';

      if (insertionTarget === section || insertionTarget === heading.closest('article')) {
        insertionTarget.appendChild(link);
      } else if (insertionTarget) {
        insertionTarget.insertAdjacentElement('beforebegin', link);
      }
    });
  };

  const enhanceExistingReadingProgress = () => {
    const progressBar = document.querySelector('.reading-progress');
    if (!progressBar || progressBar.dataset.editorialProgress === 'true') return;
    progressBar.dataset.editorialProgress = 'true';

    const update = () => {
      const height = document.documentElement.scrollHeight - window.innerHeight;
      const value = height > 0 ? Math.min(window.scrollY / height, 1) : 0;
      progressBar.style.width = `${value * 100}%`;
    };

    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    update();
  };

  const start = () => {
    normalizeTerritoryClasses();
    normalizeImages();
    const record = ensureArchiveRecord();
    const indexData = ensureIndex(record);
    ensureBackLinks(indexData);
    enhanceExistingReadingProgress();
    document.documentElement.classList.add('editorial-ready');
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start, { once: true });
  } else {
    start();
  }
})();
