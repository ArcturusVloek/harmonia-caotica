(() => {
  'use strict';
  if (document.documentElement.dataset.systemGuideLoaded === 'true') return;
  document.documentElement.dataset.systemGuideLoaded = 'true';

  const base = window.HARMONIA_SYSTEM_RULES;
  const article = document.querySelector('.systems-page .domain-article, .systems-page article');
  if (!base?.pages || !article || !document.body.classList.contains('systems-page')) return;

  const clean = (value = '') => value.replace(/\s+/g, ' ').trim();
  const escapeHtml = (value = '') => value
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#039;');
  const pageName = window.location.pathname.split('/').filter(Boolean).pop() || 'index.html';
  const title = clean(document.querySelector('.internal-title, main h1')?.textContent || 'esta regra');

  const genericProfile = () => {
    const lead = clean(article.querySelector('.article-lead')?.textContent || document.querySelector('.internal-summary')?.textContent || '');
    const decisions = [...article.querySelectorAll('.domain-capability')].slice(0, 3).map((card) => [
      clean(card.querySelector('strong')?.textContent || 'Decisão'),
      clean(card.querySelector('span, p')?.textContent || '')
    ]).filter(([, text]) => text);
    const fullText = clean(article.textContent);
    const terms = Object.keys(base.glossary).filter((term) => fullText.toLocaleLowerCase('pt-BR').includes(term.toLocaleLowerCase('pt-BR'))).slice(0, 10);
    const related = [...article.querySelectorAll('.system-related-reading a, .article-navigation a')].slice(0, 4).map((link) => [link.getAttribute('href') || '#', clean(link.textContent)]);
    return {
      short: lead || `Esta página explica o funcionamento e os limites de ${title}.`,
      centralQuestion: `O que precisa estar explícito para aplicar ${title} sem interpretação improvisada?`,
      principle: clean(article.querySelector('.lore-box:last-of-type p, .domain-boundary strong, .domain-guide strong')?.textContent || 'Cada resultado precisa declarar função, parâmetros, resolução e limites.'),
      decisions: decisions.length ? decisions : [
        ['Resultado', 'Defina exatamente o que muda quando a regra funciona.'],
        ['Parâmetros', 'Declare destino, intensidade, tempo, oportunidades e recursos.'],
        ['Resolução', 'Escreva oposição, sucesso, falha e encerramento.']
      ],
      procedure: [
        'Localize o resultado mecânico principal.',
        'Identifique parâmetros e compras exigidos.',
        'Declare quem atua, quem é afetado e quando.',
        'Defina oposição, sucesso, falha e consumo.',
        'Registre limites, combinações e encerramento.'
      ],
      mustDeclare: ['resultado', 'destino', 'intensidade', 'tempo', 'oportunidades', 'recursos e encerramento'],
      mistakes: ['Depender apenas da narrativa.', 'Omitir um parâmetro implícito.', 'Conceder função pertencente a outro capítulo.'],
      checklist: base.commonChecklist,
      terms,
      related
    };
  };

  const profile = base.pages[pageName] || genericProfile();
  if (!profile.related?.length) {
    profile.related = [...article.querySelectorAll('.system-related-reading a, .article-navigation a')].slice(0, 4).map((link) => [link.getAttribute('href') || '#', clean(link.textContent)]);
  }

  const currentScript = document.currentScript;
  const siteRoot = currentScript?.src ? new URL('../', currentScript.src) : new URL('/harmonia-caotica/', location.origin);
  if (!document.getElementById('system-guided-learning-style')) {
    const link = document.createElement('link');
    link.id = 'system-guided-learning-style';
    link.rel = 'stylesheet';
    link.href = new URL('css/sistema-guiado.css?v=20260720a', siteRoot).href;
    document.head.appendChild(link);
  }

  const storeKey = `harmonia:guia-sistema:${pageName}`;
  const checklist = (type, items) => `
    <div class="system-learning__progress" data-progress="${type}"><div><span>Progresso</span><strong>0 de ${items.length}</strong></div><div class="system-learning__progress-track"><span></span></div></div>
    <div class="system-learning__checklist" data-checklist="${type}">${items.map((item, index) => `<label><input type="checkbox" value="${index}"><span>${escapeHtml(item)}</span></label>`).join('')}</div>
    <button class="system-learning__reset" type="button" data-reset="${type}">Limpar marcações</button>`;

  const termsMarkup = () => (profile.terms || []).map((term) => [term, base.glossary[term]]).filter(([, item]) => item).map(([term, item]) => `
    <details><summary>${escapeHtml(term)}</summary><div><p>${escapeHtml(item.simple)}</p><p><strong>Na aplicação:</strong> ${escapeHtml(item.apply)}</p></div></details>`).join('');

  const guide = document.createElement('section');
  guide.className = 'system-learning';
  guide.id = 'guia-contextual';
  guide.innerHTML = `
    <header class="system-learning__header"><div><p class="system-learning__eyebrow">Guia contextual da regra</p><h2>Entender, aplicar e avaliar ${escapeHtml(title)}</h2><p>Localize a decisão principal antes de consultar todos os detalhes do capítulo.</p></div><button class="system-learning__collapse" type="button" aria-expanded="true">Recolher</button></header>
    <div class="system-learning__body">
      <div class="system-learning__tabs" role="tablist"><button role="tab" aria-selected="true" data-tab="understand">Entender</button><button role="tab" aria-selected="false" data-tab="apply">Aplicar</button><button role="tab" aria-selected="false" data-tab="evaluate">Avaliar</button><button role="tab" aria-selected="false" data-tab="terms">Termos</button></div>
      <section class="system-learning__panel" data-panel="understand">
        <div class="system-learning__answer"><span>Em poucas palavras</span><p>${escapeHtml(profile.short)}</p></div>
        <div class="system-learning__question"><span>Pergunta central</span><strong>${escapeHtml(profile.centralQuestion)}</strong></div>
        <div class="system-learning__principle"><span>Princípio decisivo</span><p>${escapeHtml(profile.principle)}</p></div>
        <h3>Decisões que organizam esta regra</h3><div class="system-learning__decision-grid">${(profile.decisions || []).map(([name, text]) => `<article class="system-learning__decision"><strong>${escapeHtml(name)}</strong><p>${escapeHtml(text)}</p></article>`).join('')}</div>
        <h3>O registro precisa declarar</h3><div class="system-learning__declarations">${(profile.mustDeclare || []).map((item) => `<span>${escapeHtml(item)}</span>`).join('')}</div>
        ${(profile.related || []).length ? `<nav class="system-learning__related"><strong>Regras relacionadas</strong><div>${profile.related.map(([href, label]) => `<a href="${escapeHtml(href)}">${escapeHtml(label)}</a>`).join('')}</div></nav>` : ''}
      </section>
      <section class="system-learning__panel" data-panel="apply" hidden><p class="system-learning__panel-lead">Marque somente quando a resposta já estiver escrita na ficha ou na situação.</p>${checklist('apply', profile.procedure || [])}<div class="system-learning__notice"><strong>Regra de uso</strong><p>Uma etapa marcada significa que a informação está explícita, não apenas pretendida.</p></div></section>
      <section class="system-learning__panel" data-panel="evaluate" hidden><p class="system-learning__panel-lead">Itens não marcados devem produzir uma correção objetiva.</p>${checklist('evaluate', profile.checklist || base.commonChecklist)}<h3>Erros que esta página deve impedir</h3><div class="system-learning__mistakes">${(profile.mistakes || []).map((item) => `<p>${escapeHtml(item)}</p>`).join('')}</div></section>
      <section class="system-learning__panel" data-panel="terms" hidden><p class="system-learning__panel-lead">Abra um termo para ver seu significado e sua aplicação.</p><div class="system-learning__glossary">${termsMarkup()}</div></section>
    </div>`;

  const anchor = article.querySelector(':scope > .system-orientation, :scope > .system-breadcrumb');
  if (anchor) anchor.insertAdjacentElement('afterend', guide); else article.prepend(guide);

  const selectTab = (name) => {
    guide.querySelectorAll('[data-tab]').forEach((tab) => tab.setAttribute('aria-selected', String(tab.dataset.tab === name)));
    guide.querySelectorAll('[data-panel]').forEach((panel) => { panel.hidden = panel.dataset.panel !== name; });
    try { sessionStorage.setItem(`${storeKey}:tab`, name); } catch {}
  };
  guide.querySelectorAll('[data-tab]').forEach((tab) => tab.addEventListener('click', () => selectTab(tab.dataset.tab)));
  try { selectTab(sessionStorage.getItem(`${storeKey}:tab`) || 'understand'); } catch { selectTab('understand'); }

  const collapse = guide.querySelector('.system-learning__collapse');
  collapse.addEventListener('click', () => {
    const expanded = collapse.getAttribute('aria-expanded') === 'true';
    collapse.setAttribute('aria-expanded', String(!expanded));
    collapse.textContent = expanded ? 'Expandir' : 'Recolher';
    guide.querySelector('.system-learning__body').hidden = expanded;
  });

  guide.querySelectorAll('[data-checklist]').forEach((container) => {
    const type = container.dataset.checklist;
    const inputs = [...container.querySelectorAll('input')];
    let saved = [];
    try { saved = JSON.parse(localStorage.getItem(`${storeKey}:${type}`) || '[]'); } catch {}
    inputs.forEach((input, index) => { input.checked = saved.includes(index); });
    const update = () => {
      const selected = inputs.map((input, index) => input.checked ? index : null).filter((value) => value !== null);
      try { localStorage.setItem(`${storeKey}:${type}`, JSON.stringify(selected)); } catch {}
      const progress = guide.querySelector(`[data-progress="${type}"]`);
      progress.querySelector('strong').textContent = `${selected.length} de ${inputs.length}`;
      progress.querySelector('.system-learning__progress-track span').style.width = `${inputs.length ? selected.length / inputs.length * 100 : 0}%`;
    };
    inputs.forEach((input) => input.addEventListener('change', update));
    guide.querySelector(`[data-reset="${type}"]`).addEventListener('click', () => { inputs.forEach((input) => { input.checked = false; }); update(); });
    update();
  });

  window.HarmoniaSystemGuideContext = { article, profile, clean, escapeHtml };
  document.documentElement.classList.add('system-learning-ready');
})();
