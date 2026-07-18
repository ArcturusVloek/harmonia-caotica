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

    ensureStylesheet('systems-base-style', '../css/sistemas.css');
    ensureStylesheet('systems-architecture-style', '../css/sistemas-arquitetura.css');
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
