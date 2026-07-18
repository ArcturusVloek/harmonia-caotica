
/* ===== EDITORIAL ===== */
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
    return heading ? (heading.innerText || heading.textContent).replace(/\s+/g, ' ').trim() : document.title.split('—')[0].trim();
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
      if ([...node.classList].some((name) => /(?:card|entry|panel)$/.test(name))) {
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

  const enhanceReveals = () => {
    const elements = [...document.querySelectorAll('[data-reveal]')];
    if (!elements.length) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion || !('IntersectionObserver' in window)) {
      elements.forEach((element) => element.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: .12, rootMargin: '0px 0px -7% 0px' });

    elements.forEach((element) => observer.observe(element));
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
    enhanceReveals();
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

/* ===== SISTEMAS ===== */
(() => {
  'use strict';

  const cleanText = (value) => (value || '').replace(/\s+/g, ' ').trim();

  const currentScript = document.currentScript;
  const scriptBaseUrl = currentScript?.src
    ? new URL('.', currentScript.src)
    : new URL('./js/', document.baseURI);

  const ensureStylesheet = (id, relativePath) => {
    if (document.getElementById(id)) return;

    const existing = [...document.styleSheets].some((sheet) => {
      try {
        return sheet.href && new URL(sheet.href).pathname.endsWith(relativePath.replace('..', ''));
      } catch {
        return false;
      }
    });

    if (existing) return;

    const link = document.createElement('link');
    link.id = id;
    link.rel = 'stylesheet';
    link.href = new URL(relativePath, scriptBaseUrl).href;
    document.head.appendChild(link);
  };

  const pageName = () => {
    const name = new URL(document.location.href).pathname.split('/').filter(Boolean).pop();
    return name || 'index.html';
  };

  const PAGE_GUIDANCE = {
    'fundamentos-dos-milagres.html': {
      level: 'essential',
      label: 'Essencial',
      record: 'Registro editorial: Bloco 1',
      category: 'Fundamentos essenciais',
      categoryHref: 'biblioteca.html#fundamentos-essenciais',
      when: 'Você está aprendendo o sistema, criando qualquer Milagre ou precisa consultar Ranks, Pontos, Potência, Vida, Cadência e Duração.',
      skip: 'Nenhum personagem deve ignorar completamente estes fundamentos, mas a Consulta Rápida basta durante a partida depois que você já os compreendeu.',
      prerequisites: 'Nenhum. Esta é a principal porta de entrada para as regras.',
      time: 'Leitura orientada: aproximadamente 12 a 18 minutos.',
      related: [
        ['alcance-alvos-area-e-movimento.html', 'Próxima leitura: Alcance e Movimento'],
        ['consulta-rapida.html', 'Abrir Consulta Rápida'],
        ['construcao-guiada.html', 'Construir um Milagre']
      ]
    },
    'alcance-alvos-area-e-movimento.html': {
      level: 'essential',
      label: 'Essencial',
      record: 'Registro editorial: Bloco 2',
      category: 'Fundamentos essenciais',
      categoryHref: 'biblioteca.html#fundamentos-essenciais',
      when: 'Seu Milagre age a distância, escolhe vários alvos, ocupa uma Área, move o usuário, acompanha algo ou desloca outra existência.',
      skip: 'Apenas construções estritamente pessoais e sem mudança de posição usam poucas partes desta página. Mesmo assim, Alcance e espaço são fundamentos gerais.',
      prerequisites: 'Fundamentos dos Milagres.',
      time: 'Leitura orientada: aproximadamente 14 a 20 minutos.',
      related: [
        ['fundamentos-dos-milagres.html', 'Rever Fundamentos'],
        ['criacoes-invocacoes-e-manifestacoes-separadas.html', 'Criar algo separado'],
        ['consulta-rapida.html#alcance-alvos-area', 'Consultar tabelas espaciais']
      ]
    },
    'criacoes-invocacoes-e-manifestacoes-separadas.html': {
      level: 'construction',
      label: 'Construção',
      record: 'Registro editorial: Bloco 3',
      category: 'Construção de Milagres',
      categoryHref: 'biblioteca.html#construcao-de-milagres',
      when: 'Seu Milagre cria ou invoca criaturas, objetos, estruturas, barreiras, espíritos ou fenômenos que ocupam posição própria e podem ser afetados separadamente.',
      skip: 'Seu Milagre apenas aplica uma alteração diretamente ao corpo, objeto ou estado de um alvo, sem criar outra existência separada.',
      prerequisites: 'Fundamentos dos Milagres; Alcance, Alvos, Área e Movimento.',
      time: 'Leitura orientada: aproximadamente 25 a 35 minutos.',
      related: [
        ['alcance-alvos-area-e-movimento.html', 'Rever Alcance e Movimento'],
        ['propagacao-reproducao-e-crescimento.html', 'Adicionar Propagação'],
        ['consulta-rapida.html#criacoes', 'Consultar Criações']
      ]
    },
    'propagacao-reproducao-e-crescimento.html': {
      level: 'construction-advanced',
      label: 'Construção avançada',
      record: 'Registro editorial: Bloco 4',
      category: 'Construção de Milagres',
      categoryHref: 'biblioteca.html#construcao-de-milagres',
      when: 'Seu Milagre passa para novos hospedeiros, gera focos ou unidades depois da ativação, substitui perdas, cresce gradualmente ou deixa rastros sobrenaturais.',
      skip: 'Todos os destinos e espaços do Milagre são definidos na ativação inicial e nada novo é produzido durante a Duração.',
      prerequisites: 'Fundamentos; Alcance, Alvos, Área e Movimento. Criações também é recomendado quando existem unidades separadas.',
      time: 'Leitura orientada: aproximadamente 30 a 40 minutos.',
      related: [
        ['criacoes-invocacoes-e-manifestacoes-separadas.html', 'Rever Criações'],
        ['alcance-alvos-area-e-movimento.html', 'Rever Alvos e Área'],
        ['consulta-rapida.html#propagacao', 'Consultar Passos']
      ]
    }
  };

  const installTableLayoutFix = () => {
    if (document.getElementById('systems-table-layout-fix')) return;

    const style = document.createElement('style');
    style.id = 'systems-table-layout-fix';
    style.textContent = `
      .systems-page .table-wrap table {
        margin: 0 !important;
      }

      .systems-page .table-wrap caption {
        display: none !important;
      }

      .systems-page .table-wrap thead,
      .systems-page .table-wrap tbody,
      .systems-page .table-wrap tr {
        position: static !important;
        inset: auto !important;
        transform: none !important;
      }

      .systems-page .table-wrap th {
        position: static !important;
        top: auto !important;
        right: auto !important;
        bottom: auto !important;
        left: auto !important;
        z-index: auto !important;
        transform: none !important;
      }

      @media (min-width: 761px) {
        .systems-page .table-wrap thead {
          display: table-header-group !important;
          width: auto !important;
          height: auto !important;
          overflow: visible !important;
          clip: auto !important;
          clip-path: none !important;
        }

        .systems-page .table-wrap tbody {
          display: table-row-group !important;
        }

        .systems-page .table-wrap tr {
          display: table-row !important;
        }

        .systems-page .table-wrap th,
        .systems-page .table-wrap td {
          display: table-cell !important;
        }
      }
    `;

    document.head.appendChild(style);
  };

  const closestHeadingText = (wrapper) => {
    let node = wrapper.previousElementSibling;

    while (node) {
      if (/^H[23]$/.test(node.tagName)) return cleanText(node.textContent);

      const nestedHeading = node.querySelector?.('h2, h3');
      if (nestedHeading) return cleanText(nestedHeading.textContent);

      node = node.previousElementSibling;
    }

    const sectionHeading = wrapper.closest('section')?.querySelector('h2');
    return cleanText(sectionHeading?.textContent) || 'Tabela de regras';
  };

  const isNumericValue = (value) => {
    const text = cleanText(value)
      .replace(/[−–—]/g, '-')
      .replace(/\s*pontos?$/i, '')
      .replace(/\s*aplicações?$/i, '')
      .replace(/\s*rodadas?$/i, '');

    return /^-?\d+(?:[.,]\d+)?$/.test(text);
  };

  const enhanceTable = (table, index) => {
    const wrapper = table.closest('.table-wrap') || table.parentElement;
    if (!wrapper || wrapper.dataset.systemTableReady === 'true') return;

    wrapper.dataset.systemTableReady = 'true';
    wrapper.classList.add('system-table');
    wrapper.setAttribute('role', 'region');
    wrapper.setAttribute('tabindex', '0');

    const headers = [...table.querySelectorAll('thead th')].map((header) => cleanText(header.textContent));
    const title = closestHeadingText(wrapper);
    const tableId = table.id || `tabela-sistema-${index + 1}`;
    table.id = tableId;

    let caption = table.querySelector('caption');
    if (!caption) {
      caption = document.createElement('caption');
      caption.textContent = title;
      table.prepend(caption);
    }

    if (!wrapper.querySelector(':scope > .system-table-toolbar')) {
      const toolbar = document.createElement('div');
      toolbar.className = 'system-table-toolbar';
      toolbar.innerHTML = `<span>Tabela de consulta</span><strong>${title}</strong>`;
      wrapper.prepend(toolbar);
    }

    wrapper.setAttribute('aria-label', `Tabela: ${title}`);

    table.querySelectorAll('tbody tr').forEach((row) => {
      [...row.cells].forEach((cell, cellIndex) => {
        const label = headers[cellIndex] || `Coluna ${cellIndex + 1}`;
        cell.dataset.label = label;

        if (isNumericValue(cell.textContent)) {
          cell.classList.add('is-numeric');
          table.querySelector(`thead th:nth-child(${cellIndex + 1})`)?.classList.add('is-numeric');
        }
      });
    });

    wrapper.addEventListener('keydown', (event) => {
      if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
      if (window.matchMedia('(max-width: 760px)').matches) return;

      const direction = event.key === 'ArrowRight' ? 120 : -120;
      wrapper.scrollBy({ left: direction, behavior: 'smooth' });
    });
  };

  const improveSystemSections = () => {
    document.querySelectorAll('.systems-page .domain-section').forEach((section) => {
      section.classList.add('system-rule-section');

      const tables = section.querySelectorAll('.table-wrap');
      if (tables.length) section.classList.add('system-rule-section--with-table');
    });
  };

  const injectPageGuidance = () => {
    const guidance = PAGE_GUIDANCE[pageName()];
    if (!guidance) return;

    const article = document.querySelector('.systems-page .domain-article');
    if (!article || article.querySelector('.system-orientation')) return;

    const breadcrumb = document.createElement('nav');
    breadcrumb.className = 'system-breadcrumb';
    breadcrumb.setAttribute('aria-label', 'Localização na Biblioteca de Regras');
    breadcrumb.innerHTML = `
      <a href="index.html">Sistemas</a>
      <span aria-hidden="true">›</span>
      <a href="${guidance.categoryHref}">${guidance.category}</a>
      <span aria-hidden="true">›</span>
      <span>${cleanText(document.querySelector('.internal-title')?.textContent)}</span>
    `;

    const orientation = document.createElement('aside');
    orientation.className = 'system-orientation';
    orientation.setAttribute('aria-label', 'Orientação de leitura');
    orientation.innerHTML = `
      <div class="system-orientation__top">
        <span class="system-level" data-level="${guidance.level}">${guidance.label}</span>
        <span class="system-orientation__record">${guidance.record}</span>
      </div>
      <div class="system-orientation__grid">
        <div class="system-orientation__item"><strong>Leia esta página quando</strong><p>${guidance.when}</p></div>
        <div class="system-orientation__item"><strong>Você provavelmente não precisa dela quando</strong><p>${guidance.skip}</p></div>
        <div class="system-orientation__item"><strong>Pré-requisitos recomendados</strong><p>${guidance.prerequisites}</p></div>
        <div class="system-orientation__item"><strong>Tempo de leitura</strong><p>${guidance.time}</p></div>
      </div>
    `;

    article.prepend(orientation);
    article.prepend(breadcrumb);
  };

  const injectRelatedReading = () => {
    const guidance = PAGE_GUIDANCE[pageName()];
    if (!guidance) return;

    const article = document.querySelector('.systems-page .domain-article');
    const existingNavigation = article?.querySelector('.article-navigation');
    if (!article || !existingNavigation || article.querySelector('.system-related-reading')) return;

    const nav = document.createElement('nav');
    nav.className = 'system-related-reading';
    nav.setAttribute('aria-label', 'Leituras relacionadas');
    nav.innerHTML = guidance.related
      .map(([href, label]) => `<a href="${href}">${label}</a>`)
      .join('');

    existingNavigation.before(nav);
  };

  const start = () => {
    if (!document.body.classList.contains('systems-page')) return;
    installTableLayoutFix();
    injectPageGuidance();
    injectRelatedReading();
    improveSystemSections();
    document.querySelectorAll('.systems-page .table-wrap table').forEach(enhanceTable);
    document.documentElement.classList.add('systems-layout-ready');
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start, { once: true });
  } else {
    start();
  }
})();

/* ===== INTERFACE ===== */
(() => {
  'use strict';

  const script = document.currentScript;
  const siteRoot = script?.src
    ? new URL('../', script.src)
    : new URL('/harmonia-caotica/', window.location.origin);
  const href = (path) => new URL(path, siteRoot).href;
  const body = document.body;
  const root = document.documentElement;
  const home = body.classList.contains('home-page');
  const systemsPage = body.classList.contains('systems-page');

  body.classList.add('atlas-site');
  root.classList.add('atlas-interface');

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

  const isDesktop = () => {
    window.HarmoniaDeviceMode?.detect?.();
    return root.classList.contains('ui-desktop');
  };

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
    indexButton.setAttribute('aria-label', 'Abrir sumário');
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
    const mayOpen = Boolean(open && !isDesktop() && navigation);
    body.classList.toggle('menu-open', mayOpen);
    menuButton?.setAttribute('aria-expanded', String(mayOpen));
    menuButton?.setAttribute('aria-label', mayOpen ? 'Fechar navegação' : 'Abrir navegação');
    setInert(navigation, !isDesktop() && !mayOpen);

    if (mayOpen && focusFirst) {
      window.requestAnimationFrame(() => navigation?.querySelector('a')?.focus());
    }
  };

  const setIndexOpen = (open, focusFirst = false) => {
    const mayOpen = Boolean(open && !isDesktop() && index);
    body.classList.toggle('index-open', mayOpen);
    indexButton?.setAttribute('aria-expanded', String(mayOpen));
    indexButton?.setAttribute('aria-label', mayOpen ? 'Fechar sumário' : 'Abrir sumário');
    setInert(index, !isDesktop() && !mayOpen);

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

  const classifyTitles = () => {
    document.querySelectorAll(
      '.home-hero__title, .internal-title, .territory-hero__title, [class$="-hero__title"]'
    ).forEach((title) => {
      const text = (title.innerText || title.textContent || '').replace(/\s+/g, ' ').trim();
      const length = text.length;
      const words = text.split(/\s+/).filter(Boolean);
      const longestWord = words.reduce((max, word) => Math.max(max, word.length), 0);

      title.classList.toggle('title-is-long', length > 30 || longestWord > 16);
      title.classList.toggle('title-is-very-long', length > 48 || longestWord > 23);
    });
  };

  const syncResponsiveState = () => {
    const desktop = isDesktop();
    body.classList.toggle('ui-desktop', desktop);
    body.classList.toggle('ui-compact', !desktop);
    closePanels();

    if (desktop) {
      setInert(navigation, false);
      setInert(index, false);
    } else {
      setInert(navigation, true);
      setInert(index, true);
    }

    classifyTitles();
  };

  let syncFrame = 0;
  const scheduleSync = () => {
    window.cancelAnimationFrame(syncFrame);
    syncFrame = window.requestAnimationFrame(syncResponsiveState);
  };

  window.addEventListener('resize', scheduleSync, { passive: true });
  window.addEventListener('orientationchange', scheduleSync, { passive: true });
  window.addEventListener('pageshow', scheduleSync);
  window.visualViewport?.addEventListener('resize', scheduleSync, { passive: true });

  if ('ResizeObserver' in window) {
    const titleObserver = new ResizeObserver(classifyTitles);
    document.querySelectorAll('.home-hero__content, .internal-hero-content, .territory-hero__content')
      .forEach((element) => titleObserver.observe(element));
  }

  classifyTitles();
  syncResponsiveState();

  document.fonts?.ready.then(() => {
    classifyTitles();
    scheduleSync();
  }).catch(() => {});

  root.classList.add('atlas-ready');
})();
