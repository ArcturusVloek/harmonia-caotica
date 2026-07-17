(() => {
  'use strict';

  const cleanText = (value) => (value || '').replace(/\s+/g, ' ').trim();

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

    const toolbar = document.createElement('div');
    toolbar.className = 'system-table-toolbar';
    toolbar.innerHTML = `<span>Tabela de consulta</span><strong>${title}</strong>`;
    wrapper.prepend(toolbar);
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

  const start = () => {
    if (!document.body.classList.contains('systems-page')) return;

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
