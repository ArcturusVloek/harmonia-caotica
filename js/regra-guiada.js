(() => {
  'use strict';

  if (document.documentElement.dataset.ruleGuideLoaded === 'true') return;
  document.documentElement.dataset.ruleGuideLoaded = 'true';

  const currentScript = document.currentScript;
  const siteRoot = currentScript?.src
    ? new URL('../', currentScript.src)
    : new URL('/harmonia-caotica/', window.location.origin);

  const SYSTEM_LINKS = {
    construction: new URL('sistemas/construcao-guiada.html', siteRoot).href,
    quickReference: new URL('sistemas/consulta-rapida.html', siteRoot).href,
    foundations: new URL('sistemas/fundamentos-dos-milagres.html', siteRoot).href
  };

  const GLOSSARY = {
    'Domínio': {
      simple: 'A parte da realidade governada por uma Divindade.',
      apply: 'O Domínio responde de onde vem o poder e qual tipo de fenômeno ele pode produzir.'
    },
    'Vertente': {
      simple: 'Uma especialização dentro de um Domínio.',
      apply: 'A Vertente deve explicar o princípio sobrenatural do efeito, não apenas sua aparência.'
    },
    'Herança': {
      simple: 'A regra passiva própria de uma Vertente.',
      apply: 'A Herança modifica Milagres compatíveis quando seu gatilho é cumprido; ela não substitui a função principal do poder.'
    },
    'Potência': {
      simple: 'A intensidade mecânica do Milagre.',
      apply: 'A Potência é usada quando a regra exige valor, resistência ou comparação. Ela não compra Alcance, Área, Duração ou oportunidades.'
    },
    'Alcance': {
      simple: 'A distância máxima entre o usuário e o destino inicial do Milagre.',
      apply: 'Alcance não define o tamanho da região afetada. Uma Área precisa ser comprada separadamente.'
    },
    'Área': {
      simple: 'O espaço ocupado ou examinado pelo efeito.',
      apply: 'Quando várias criaturas são afetadas por estarem dentro de uma região, a Área e seu tamanho precisam estar definidos.'
    },
    'Duração': {
      simple: 'Por quanto tempo o efeito permanece.',
      apply: 'Duração mantém o que foi comprado, mas não concede novas aplicações, ações ou decisões automaticamente.'
    },
    'Persistente': {
      simple: 'Uma Duração que mantém a manifestação além da ativação inicial.',
      apply: 'Efeitos Persistentes precisam declarar como terminam e quantas manifestações podem permanecer ativas.'
    },
    'Uso': {
      simple: 'Uma unidade limitada de aplicação do Milagre.',
      apply: 'O texto precisa dizer exatamente qual acontecimento consome um Uso e o que ocorre quando eles terminam.'
    },
    'Cadência': {
      simple: 'A frequência com que o Milagre pode ser utilizado.',
      apply: 'A Cadência regula novas ativações e não deve ser confundida com Duração ou quantidade de Usos.'
    }
  };

  const normalize = (value = '') => value.replace(/\s+/g, ' ').trim();
  const escapeHtml = (value = '') => value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');

  const shorten = (value, limit = 260) => {
    const text = normalize(value);
    if (text.length <= limit) return text;
    const clipped = text.slice(0, limit);
    const sentence = clipped.match(/^(.+?[.!?])(?:\s|$)/);
    if (sentence && sentence[1].length > limit * .48) return sentence[1];
    const lastSpace = clipped.lastIndexOf(' ');
    return `${clipped.slice(0, Math.max(lastSpace, limit - 24))}…`;
  };

  const pageTitle = () => normalize(
    document.querySelector('main h1')?.textContent ||
    document.title.split('—')[0] ||
    'Esta regra'
  );

  const articleRoot = () => document.querySelector(
    'main article, main .territory-content, main [class$="-content"]'
  );

  const pageLead = () => normalize(
    document.querySelector('.article-lead, .internal-summary, .territory-opening__lead')?.textContent || ''
  );

  const collectCapabilities = () => [...document.querySelectorAll('.domain-capability')]
    .map((node) => ({
      title: normalize(node.querySelector('strong')?.textContent || ''),
      text: normalize(node.querySelector('span, p')?.textContent || '')
    }))
    .filter((item) => item.title && item.text);

  const collectBoundary = () => {
    const boundary = document.querySelector('.domain-boundary');
    if (!boundary) return '';
    return shorten([...boundary.querySelectorAll('p')]
      .map((paragraph) => normalize(paragraph.textContent))
      .filter(Boolean)
      .join(' '), 420);
  };

  const extractBranchSections = (content) => {
    const sections = [];
    let current = null;

    for (const child of [...content.children]) {
      if (child.classList.contains('heritage-card')) break;

      if (child.matches('h3')) {
        current = { title: normalize(child.textContent), parts: [] };
        sections.push(current);
        continue;
      }

      if (!current) continue;
      if (child.matches('p')) current.parts.push(normalize(child.textContent));
      if (child.matches('ul, ol')) {
        current.parts.push(
          [...child.querySelectorAll(':scope > li')]
            .map((item) => normalize(item.textContent))
            .filter(Boolean)
            .join(' ')
        );
      }
    }

    return sections.map((section) => ({
      title: section.title,
      text: normalize(section.parts.join(' '))
    }));
  };

  const findSection = (sections, pattern) =>
    sections.find((section) => pattern.test(section.title))?.text || '';

  const collectBranches = () => [...document.querySelectorAll('details.domain-branch')]
    .map((details) => {
      const heading = details.querySelector('.domain-branch__heading h2, summary h2');
      const summary = details.querySelector('.domain-branch__heading p, summary p');
      const content = details.querySelector('.domain-branch__content');
      if (!heading || !content) return null;

      const sections = extractBranchSections(content);
      const examples = [...content.querySelectorAll('.miracle-list li')]
        .slice(0, 3)
        .map((item) => normalize(item.textContent));

      return {
        details,
        content,
        id: heading.id || '',
        name: normalize(heading.textContent),
        summary: normalize(summary?.textContent || ''),
        definition: findSection(sections, /^O que é$/i) || sections[0]?.text || '',
        allows: findSection(sections, /permite|possibilidades|aplicaç/i),
        limits: findSection(sections, /limites?|não pertence|não pode/i),
        examples
      };
    })
    .filter(Boolean);

  const capabilitiesMarkup = (capabilities) => {
    if (!capabilities.length) {
      return '<p class="rule-guide__empty">Leia a definição inicial para identificar o fenômeno central desta página.</p>';
    }

    return `<div class="rule-guide__cards">${capabilities.slice(0, 6).map((item) => `
      <article class="rule-guide__card">
        <strong>${escapeHtml(item.title)}</strong>
        <p>${escapeHtml(item.text)}</p>
      </article>`).join('')}</div>`;
  };

  const branchLinksMarkup = (branches) => {
    if (!branches.length) return '';
    return `<div class="rule-guide__branch-links" aria-label="Vertentes desta página">
      ${branches.map((branch) => `<a href="#${escapeHtml(branch.id)}" data-guide-branch="${escapeHtml(branch.id)}">${escapeHtml(branch.name)}</a>`).join('')}
    </div>`;
  };

  const evaluationMarkup = () => {
    const questions = [
      'O Domínio escolhido explica a origem sobrenatural do efeito?',
      'A Vertente descreve o princípio do poder, e não apenas sua aparência?',
      'O resultado mecânico está escrito sem depender da interpretação narrativa?',
      'Alvo, Alcance, Área, Duração, Usos e Cadência estão definidos quando necessários?',
      'A regra informa como resistir, o que ocorre no sucesso e o que ocorre na falha?',
      'Os limites impedem aplicações que não foram compradas ou pertencem a outra regra?'
    ];

    return `<div class="rule-guide__checklist">${questions.map((question) => `
      <label><input type="checkbox"><span>${escapeHtml(question)}</span></label>`).join('')}</div>`;
  };

  const createGuide = (branches) => {
    const article = articleRoot();
    if (!article || article.querySelector(':scope > .rule-guide')) return null;

    const title = pageTitle();
    const lead = pageLead();
    const capabilities = collectCapabilities();
    const boundary = collectBoundary();

    const guide = document.createElement('section');
    guide.className = 'rule-guide';
    guide.id = 'guia-da-regra';
    guide.setAttribute('aria-labelledby', 'guia-da-regra-titulo');
    guide.innerHTML = `
      <header class="rule-guide__header">
        <div>
          <p class="rule-guide__eyebrow">Camada didática</p>
          <h2 id="guia-da-regra-titulo">Entenda e aplique ${escapeHtml(title)}</h2>
          <p>Consulte a explicação, transforme o conceito em uma regra e revise os pontos que costumam causar dúvidas.</p>
        </div>
        <button class="rule-guide__collapse" type="button" aria-expanded="true" aria-controls="rule-guide-body">Recolher</button>
      </header>

      <div id="rule-guide-body" class="rule-guide__body">
        <div class="rule-guide__tabs" role="tablist" aria-label="Modos de consulta">
          <button id="guide-tab-understand" type="button" role="tab" aria-selected="true" aria-controls="guide-panel-understand" data-guide-tab="understand">Entender</button>
          <button id="guide-tab-apply" type="button" role="tab" aria-selected="false" aria-controls="guide-panel-apply" data-guide-tab="apply">Aplicar</button>
          <button id="guide-tab-evaluate" type="button" role="tab" aria-selected="false" aria-controls="guide-panel-evaluate" data-guide-tab="evaluate">Avaliar</button>
        </div>

        <section id="guide-panel-understand" class="rule-guide__panel" role="tabpanel" aria-labelledby="guide-tab-understand" data-guide-panel="understand">
          <div class="rule-guide__answer">
            <span>Em poucas palavras</span>
            <p>${escapeHtml(lead || `Esta página explica o funcionamento e os limites de ${title}.`)}</p>
          </div>
          <h3>O que este conceito consegue produzir</h3>
          ${capabilitiesMarkup(capabilities)}
          ${boundary ? `<div class="rule-guide__boundary"><strong>Limite decisivo</strong><p>${escapeHtml(boundary)}</p></div>` : ''}
          <p class="rule-guide__principle"><strong>Regra de identificação:</strong> a aparência narrativa não define a Vertente. O princípio sobrenatural que produz o efeito é o que determina sua classificação.</p>
          ${branchLinksMarkup(branches)}
        </section>

        <section id="guide-panel-apply" class="rule-guide__panel" role="tabpanel" aria-labelledby="guide-tab-apply" data-guide-panel="apply" hidden>
          <ol class="rule-guide__steps">
            <li><strong>Declare o resultado.</strong><span>Escreva em uma frase o que muda na regra quando o Milagre funciona.</span></li>
            <li><strong>Identifique o princípio.</strong><span>Escolha a Vertente que explica como o fenômeno é produzido.</span></li>
            <li><strong>Defina o destino.</strong><span>Informe quem ou o que é afetado, a distância e a região ocupada.</span></li>
            <li><strong>Escreva a resolução.</strong><span>Determine resistência, sucesso, falha, consumo de recursos e encerramento.</span></li>
            <li><strong>Compre cada capacidade.</strong><span>Potência não substitui Alcance, Área, Duração, Usos ou atuação.</span></li>
          </ol>
          <div class="rule-guide__notice"><strong>Teste rápido</strong><p>Retire o nome e a estética do Milagre. A descrição restante ainda aponta claramente para esta Vertente? Caso contrário, a classificação precisa ser revista.</p></div>
          ${branchLinksMarkup(branches)}
          <div class="rule-guide__actions">
            <a href="${SYSTEM_LINKS.construction}">Abrir Construção Guiada</a>
            <a href="${SYSTEM_LINKS.quickReference}">Consultar custos e parâmetros</a>
          </div>
        </section>

        <section id="guide-panel-evaluate" class="rule-guide__panel" role="tabpanel" aria-labelledby="guide-tab-evaluate" data-guide-panel="evaluate" hidden>
          <p class="rule-guide__panel-lead">Marque cada item antes de aprovar uma criação. Um campo não marcado indica uma dúvida que precisa ser resolvida no texto do poder.</p>
          ${evaluationMarkup()}
          <div class="rule-guide__actions">
            <a href="${SYSTEM_LINKS.foundations}">Rever Fundamentos dos Milagres</a>
            <a href="${SYSTEM_LINKS.quickReference}">Abrir Consulta Rápida</a>
          </div>
        </section>

        <aside class="rule-guide__glossary" aria-label="Dicionário rápido">
          <div>
            <strong>Dicionário rápido</strong>
            <p>Selecione um termo para ver sua função prática sem abandonar a página.</p>
          </div>
          <div class="rule-guide__term-buttons">
            ${Object.keys(GLOSSARY).map((term) => `<button type="button" data-guide-term="${escapeHtml(term)}">${escapeHtml(term)}</button>`).join('')}
          </div>
          <div class="rule-guide__term-answer" data-guide-term-answer hidden aria-live="polite"></div>
        </aside>
      </div>`;

    const firstContent = article.querySelector('.article-lead, .system-breadcrumb, .system-orientation');
    if (firstContent) firstContent.insertAdjacentElement('beforebegin', guide);
    else article.prepend(guide);

    return guide;
  };

  const enhanceBranches = (branches, guide) => {
    branches.forEach((branch) => {
      if (branch.content.querySelector(':scope > .rule-branch-summary')) return;

      const card = document.createElement('aside');
      card.className = 'rule-branch-summary';
      card.setAttribute('aria-label', `Leitura rápida da Vertente ${branch.name}`);

      const definition = shorten(branch.definition || branch.summary, 280);
      const allows = shorten(branch.allows || branch.examples.join(' '), 300);
      const limits = shorten(branch.limits || 'Os limites desta Vertente devem permanecer explícitos no texto do Milagre.', 300);

      card.innerHTML = `
        <div class="rule-branch-summary__heading">
          <div><span>Leitura rápida</span><strong>${escapeHtml(branch.name)}</strong></div>
          <button type="button" data-branch-evaluate="${escapeHtml(branch.id)}">Avaliar uma criação</button>
        </div>
        <div class="rule-branch-summary__grid">
          <section><span>O princípio</span><p>${escapeHtml(definition)}</p></section>
          <section><span>Pode produzir</span><p>${escapeHtml(allows)}</p></section>
          <section><span>Limite decisivo</span><p>${escapeHtml(limits)}</p></section>
        </div>`;

      branch.content.prepend(card);

      card.querySelector('[data-branch-evaluate]')?.addEventListener('click', () => {
        guide?.querySelector('[data-guide-tab="evaluate"]')?.click();
        guide?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });
  };

  const activateGuide = (guide, branches) => {
    if (!guide) return;

    const tabButtons = [...guide.querySelectorAll('[data-guide-tab]')];
    const panels = [...guide.querySelectorAll('[data-guide-panel]')];

    const setTab = (name) => {
      tabButtons.forEach((button) => {
        const active = button.dataset.guideTab === name;
        button.setAttribute('aria-selected', active ? 'true' : 'false');
        button.tabIndex = active ? 0 : -1;
      });
      panels.forEach((panel) => {
        panel.hidden = panel.dataset.guidePanel !== name;
      });
    };

    tabButtons.forEach((button) => {
      button.addEventListener('click', () => setTab(button.dataset.guideTab));
      button.addEventListener('keydown', (event) => {
        if (!['ArrowLeft', 'ArrowRight'].includes(event.key)) return;
        event.preventDefault();
        const current = tabButtons.indexOf(button);
        const direction = event.key === 'ArrowRight' ? 1 : -1;
        const next = tabButtons[(current + direction + tabButtons.length) % tabButtons.length];
        next.focus();
        setTab(next.dataset.guideTab);
      });
    });

    guide.querySelector('.rule-guide__collapse')?.addEventListener('click', (event) => {
      const button = event.currentTarget;
      const body = guide.querySelector('#rule-guide-body');
      const expanded = button.getAttribute('aria-expanded') === 'true';
      button.setAttribute('aria-expanded', expanded ? 'false' : 'true');
      button.textContent = expanded ? 'Expandir' : 'Recolher';
      body.hidden = expanded;
    });

    guide.querySelectorAll('[data-guide-term]').forEach((button) => {
      button.addEventListener('click', () => {
        const term = button.dataset.guideTerm;
        const entry = GLOSSARY[term];
        const answer = guide.querySelector('[data-guide-term-answer]');
        if (!entry || !answer) return;

        guide.querySelectorAll('[data-guide-term]').forEach((termButton) => {
          termButton.classList.toggle('is-active', termButton === button);
        });

        answer.hidden = false;
        answer.innerHTML = `<strong>${escapeHtml(term)}</strong><p>${escapeHtml(entry.simple)}</p><p><span>Na prática:</span> ${escapeHtml(entry.apply)}</p>`;
      });
    });

    guide.querySelectorAll('[data-guide-branch]').forEach((link) => {
      link.addEventListener('click', () => {
        const branch = branches.find((item) => item.id === link.dataset.guideBranch);
        if (branch) branch.details.open = true;
      });
    });
  };

  const start = () => {
    const branches = collectBranches();
    const guide = createGuide(branches);
    enhanceBranches(branches, guide);
    activateGuide(guide, branches);
    document.documentElement.classList.add('rule-guide-ready');
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start, { once: true });
  } else {
    start();
  }
})();
