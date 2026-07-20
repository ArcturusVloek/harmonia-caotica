(() => {
  'use strict';

  const DATA = window.HarmoniaMiracleStudioData;
  const GUIDE = window.HarmoniaDefinitiveStudioData;
  if (!DATA || !GUIDE || window.location.pathname.split('/').pop() !== 'construcao-guiada.html') return;
  if (document.documentElement.dataset.definitiveStudioReady === 'true') return;
  document.documentElement.dataset.definitiveStudioReady = 'true';

  const MAIN_KEY = 'harmonia-caotica:estudio-milagres:v1';
  const CREATION_KEY = 'harmonia-caotica:estudio-criacao:v2';
  const currentScript = document.currentScript;
  const scriptBase = currentScript?.src ? new URL('.', currentScript.src) : new URL('../js/', document.baseURI);
  const heritageCache = new Map();
  let observer;
  let decorating = false;
  let syncing = false;
  let host;

  const esc = (value = '') => String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');

  const slug = (value = '') => String(value)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLocaleLowerCase('pt-BR')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

  const readJson = (key, fallback) => {
    try {
      const parsed = JSON.parse(localStorage.getItem(key) || 'null');
      return parsed && typeof parsed === 'object' ? parsed : fallback;
    } catch {
      return fallback;
    }
  };

  const writeJson = (key, value) => {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* armazenamento opcional */ }
  };

  const mainState = () => readJson(MAIN_KEY, {});

  const ensureStylesheet = () => {
    if (document.getElementById('miracle-studio-definitive-style')) return;
    const link = document.createElement('link');
    link.id = 'miracle-studio-definitive-style';
    link.rel = 'stylesheet';
    link.href = new URL('../css/estudio-definitivo.css?v=20260720d', scriptBase).href;
    document.head.appendChild(link);
  };

  const guideMarkup = (guide, title = 'Em palavras simples') => {
    if (!guide) return '';
    return `<aside class="def-option-guide">
      <strong>${esc(title)}</strong>
      <p>${esc(guide.summary || '')}</p>
      ${guide.useWhen ? `<div><span>Escolha quando</span><p>${esc(guide.useWhen)}</p></div>` : ''}
      ${guide.excludes ? `<div><span>Não concede</span><p>${esc(guide.excludes)}</p></div>` : ''}
      ${guide.example ? `<div><span>Exemplo</span><p>${esc(guide.example)}</p></div>` : ''}
    </aside>`;
  };

  const optionByValue = (options = [], value) => options.find((item) => String(item.value) === String(value));

  const getStandardGuide = (key, value) => {
    const specific = GUIDE.optionGuides[key]?.[value];
    if (specific) return specific;

    const dataOptionCollections = [
      DATA.ranks,
      DATA.core?.potency,
      DATA.core?.activation,
      DATA.core?.range,
      DATA.core?.targetMode,
      DATA.core?.sharedTargets,
      DATA.core?.completeTargets,
      DATA.core?.area,
      DATA.core?.duration,
      ...Object.values(DATA.modules || {}).flatMap((module) => module.fields || []).map((field) => field.options).filter(Boolean)
    ];
    for (const options of dataOptionCollections) {
      const item = optionByValue(options, value);
      if (item?.note) return { summary: item.note, useWhen: GUIDE.fieldGuides[key]?.useWhen || '' };
    }
    return GUIDE.fieldGuides[key] || null;
  };

  const decorateStandardFields = () => {
    host.querySelectorAll('.studio-field').forEach((field) => {
      const control = field.querySelector('[data-state]');
      if (!control) return;
      const key = control.dataset.state;
      const value = control.value;
      let guide = field.querySelector(':scope > .def-option-guide');
      const next = getStandardGuide(key, value);
      if (!next) return;
      const html = guideMarkup(next, control.tagName === 'SELECT' ? 'O que esta opção significa' : 'Como preencher');
      if (!guide) {
        field.insertAdjacentHTML('beforeend', html);
      } else if (guide.dataset.value !== String(value)) {
        guide.outerHTML = html;
      }
      guide = field.querySelector(':scope > .def-option-guide');
      if (guide) guide.dataset.value = String(value);
    });
  };

  const decorateFunctionCards = () => {
    host.querySelectorAll('.studio-function').forEach((card) => {
      const id = card.querySelector('[data-function]')?.dataset.function;
      const guide = GUIDE.functionGuides[id];
      if (!guide || card.querySelector('.def-function-guide')) return;
      const block = document.createElement('div');
      block.className = 'def-function-guide';
      block.innerHTML = `<p>${esc(guide.summary)}</p><dl><div><dt>Use para</dt><dd>${esc(guide.useWhen)}</dd></div>${guide.excludes ? `<div><dt>Não inclui</dt><dd>${esc(guide.excludes)}</dd></div>` : ''}</dl>`;
      card.appendChild(block);
    });
  };

  const domainPaths = {
    Doenças: '../dominios/doencas.html',
    Parasitas: '../dominios/parasitas.html',
    Morte: '../dominios/morte.html',
    Trevas: '../dominios/trevas.html',
    Vida: '../dominios/vida.html',
    Luz: '../dominios/luz.html',
    Céu: '../dominios/ceu.html',
    Sol: '../dominios/sol.html',
    Sonhos: '../dominios/sonhos.html',
    Pesadelos: '../dominios/pesadelos.html'
  };

  const parseHeritage = (doc, branch) => {
    const wanted = branch.trim().toLocaleLowerCase('pt-BR');
    const heading = [...doc.querySelectorAll('.domain-branch__heading h2, .domain-branch h2')]
      .find((item) => item.textContent.trim().toLocaleLowerCase('pt-BR') === wanted)
      || doc.getElementById(slug(branch));
    const container = heading?.closest('.domain-branch');
    const card = container?.querySelector('.heritage-card');
    if (!card) return null;

    const rules = [...card.querySelectorAll('.heritage-rule')].map((rule) => ({
      label: rule.querySelector('dt')?.textContent.trim() || 'Regra',
      text: rule.querySelector('dd')?.textContent.trim() || ''
    })).filter((rule) => rule.text);

    return {
      branch,
      title: card.querySelector('h3')?.textContent.trim() || `Herança de ${branch}`,
      summary: card.querySelector('.heritage-card__summary')?.textContent.trim() || '',
      rules,
      example: card.querySelector('.domain-example p')?.textContent.trim() || '',
      kicker: card.querySelector('.heritage-card__kicker')?.textContent.trim() || `Herança de ${branch}`
    };
  };

  const fetchHeritage = async (domain, branch) => {
    if (!domain || !branch || !domainPaths[domain]) return null;
    const key = `${domain}:${branch}`;
    if (heritageCache.has(key)) return heritageCache.get(key);

    try {
      const response = await fetch(new URL(domainPaths[domain], window.location.href));
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const html = await response.text();
      const doc = new DOMParser().parseFromString(html, 'text/html');
      const heritage = parseHeritage(doc, branch);
      heritageCache.set(key, heritage);
      return heritage;
    } catch (error) {
      console.warn('Não foi possível carregar a Herança da Vertente.', error);
      heritageCache.set(key, null);
      return null;
    }
  };

  const heritageMarkup = (heritage, compact = false) => {
    if (!heritage) return '';
    return `<section class="def-heritage ${compact ? 'def-heritage--compact' : ''}">
      <header><div><span>${esc(heritage.kicker)}</span><h3>${esc(heritage.title)}</h3></div><strong>Automática</strong></header>
      <p>${esc(heritage.summary)}</p>
      ${compact ? '' : `<dl>${heritage.rules.map((rule) => `<div><dt>${esc(rule.label)}</dt><dd>${esc(rule.text)}</dd></div>`).join('')}</dl>${heritage.example ? `<aside><strong>Exemplo em combate</strong><p>${esc(heritage.example)}</p></aside>` : ''}`}
      <footer>A Herança é uma propriedade passiva dos Milagres desta Vertente. Ela não precisa ser ativada nem comprada separadamente.</footer>
    </section>`;
  };

  const decorateHeritage = async () => {
    const state = mainState();
    if (!state.domain || !state.branch) {
      host.querySelectorAll('.def-heritage').forEach((node) => node.remove());
      return;
    }
    const heritage = await fetchHeritage(state.domain, state.branch);
    if (!heritage) return;

    const originCard = host.querySelector('.studio-origin-card');
    if (originCard && !originCard.parentElement.querySelector(':scope > .def-heritage')) {
      originCard.insertAdjacentHTML('afterend', heritageMarkup(heritage));
    }

    const review = host.querySelector('.studio-validation');
    if (review && !review.parentElement.querySelector(':scope > .def-heritage')) {
      review.insertAdjacentHTML('afterend', heritageMarkup(heritage));
    }

    const summary = host.querySelector('.studio-summary__identity');
    if (summary && !summary.querySelector('.def-summary-heritage')) {
      const line = document.createElement('p');
      line.className = 'def-summary-heritage';
      line.innerHTML = `<span>Herança</span><strong>${esc(heritage.title)}</strong>`;
      summary.appendChild(line);
    }

    enrichExport(heritage);
  };

  const creationDefaults = () => ({
    version: 2,
    form: '',
    nature: 'creature',
    position: '',
    existence: 'resistance',
    anchor: '',
    multiplicity: 'single',
    quantity: '1',
    bodyModel: 'compact',
    scale: 'Comum',
    bodyArea: '2',
    activeLimit: 'Uma manifestação ativa.',
    mobility: 'stationary',
    movement: '0',
    follows: '',
    transport: '0',
    communication: 'none',
    communicationRange: '15 metros',
    linkedOrigin: 'none',
    origins: '1',
    sustain: 'Sustentada pelo próprio Milagre.',
    endCondition: '',
    notes: '',
    abilities: [{
      id: `ability-${Date.now()}`,
      name: 'Função principal',
      type: 'damage',
      potencyMode: 'principal',
      potency: '3',
      acting: 'commandedAction',
      range: 'Pessoal ou Contato',
      targetMode: 'one',
      targetCount: '1',
      area: '0',
      duration: 'Instantânea',
      specificCost: '0',
      uses: '',
      details: ''
    }]
  });

  const getCreation = () => {
    const saved = readJson(CREATION_KEY, null);
    const base = creationDefaults();
    if (!saved) return base;
    return {
      ...base,
      ...saved,
      abilities: Array.isArray(saved.abilities) && saved.abilities.length
        ? saved.abilities.map((ability) => ({ ...base.abilities[0], ...ability }))
        : base.abilities
    };
  };

  let creation = getCreation();

  const saveCreation = () => writeJson(CREATION_KEY, creation);

  const selectMarkup = (path, label, options, value, extraClass = '') => {
    const selected = optionByValue(options, value) || options[0];
    return `<label class="def-field ${extraClass}">
      <span>${esc(label)}</span>
      <select data-def-path="${esc(path)}">
        ${options.map((item) => `<option value="${esc(item.value)}" ${String(item.value) === String(value) ? 'selected' : ''}>${esc(item.label)}${item.cost ? ` · ${item.cost} pt${item.cost === 1 ? '' : 's'}` : ''}</option>`).join('')}
      </select>
      ${guideMarkup({ summary: selected?.summary || '', excludes: selected?.excludes || '' }, 'O que significa')}
    </label>`;
  };

  const inputMarkup = (path, label, value, placeholder = '', type = 'text') => `<label class="def-field"><span>${esc(label)}</span><input type="${esc(type)}" data-def-path="${esc(path)}" value="${esc(value)}" placeholder="${esc(placeholder)}"></label>`;
  const textareaMarkup = (path, label, value, placeholder = '', rows = 3) => `<label class="def-field def-field--wide"><span>${esc(label)}</span><textarea data-def-path="${esc(path)}" rows="${rows}" placeholder="${esc(placeholder)}">${esc(value)}</textarea></label>`;

  const quantityOptions = () => creation.multiplicity === 'fragmented'
    ? GUIDE.creation.fragments
    : creation.multiplicity === 'complete'
      ? GUIDE.creation.complete
      : [GUIDE.creation.fragments[0]];

  const abilityTargetOptions = [
    { value: 'one', label: 'Um alvo', cost: 0, summary: 'A função escolhe um destino.' },
    { value: 'shared', label: 'Alvos Compartilhados', cost: 0, summary: 'Os destinos dividem o mesmo total.' },
    { value: 'complete', label: 'Alvos Completos', cost: 0, summary: 'Cada destino recebe o perfil integral.' },
    { value: 'area', label: 'Área', cost: 0, summary: 'A função alcança tudo que estiver na região.' }
  ];

  const abilityPotencyModes = [
    { value: 'principal', label: 'Usa a Potência principal da Criação', cost: 0, summary: 'A função usa o mesmo Valor que define a Resistência básica.' },
    { value: 'own', label: 'Compra Potência própria', cost: 0, summary: 'A função recebe outro Valor independente; o custo da Potência é somado.' },
    { value: 'none', label: 'Não utiliza Potência numérica', cost: 0, summary: 'Use apenas para capacidades qualitativas que não aplicam Valor.' }
  ];

  const abilityMarkup = (ability, index) => {
    const type = optionByValue(GUIDE.creation.capabilityTypes, ability.type) || GUIDE.creation.capabilityTypes[0];
    const targetCountOptions = ability.targetMode === 'shared' ? DATA.core.sharedTargets : DATA.core.completeTargets;
    return `<article class="def-ability" data-ability-id="${esc(ability.id)}">
      <header><div><span>Capacidade ${index + 1}</span><h4>${esc(ability.name || type.label)}</h4></div><button type="button" data-remove-ability="${esc(ability.id)}" ${creation.abilities.length === 1 ? 'disabled' : ''}>Remover</button></header>
      <div class="def-grid def-grid--three">
        ${inputMarkup(`abilities.${index}.name`, 'Nome da capacidade', ability.name, 'Ex.: Mordida Solar')}
        ${selectMarkup(`abilities.${index}.type`, 'Função mecânica', GUIDE.creation.capabilityTypes, ability.type)}
        ${selectMarkup(`abilities.${index}.potencyMode`, 'Potência da função', abilityPotencyModes, ability.potencyMode)}
        ${ability.potencyMode === 'own' ? selectMarkup(`abilities.${index}.potency`, 'Potência própria', DATA.core.potency, ability.potency) : ''}
        ${selectMarkup(`abilities.${index}.acting`, 'Forma de atuação', GUIDE.creation.abilityActing, ability.acting)}
        ${selectMarkup(`abilities.${index}.range`, 'Alcance a partir da Criação', GUIDE.creation.abilityRange, ability.range)}
        ${selectMarkup(`abilities.${index}.targetMode`, 'Destino da função', abilityTargetOptions, ability.targetMode)}
        ${ability.targetMode === 'shared' || ability.targetMode === 'complete' ? selectMarkup(`abilities.${index}.targetCount`, 'Quantidade de alvos', targetCountOptions, ability.targetCount) : ''}
        ${ability.targetMode === 'area' ? selectMarkup(`abilities.${index}.area`, 'Área da função', DATA.core.area.filter((item) => item.value !== '0'), ability.area === '0' ? '2' : ability.area) : ''}
        ${selectMarkup(`abilities.${index}.duration`, 'Duração da consequência', DATA.core.duration, ability.duration)}
        ${inputMarkup(`abilities.${index}.specificCost`, 'Custo específico adicional', ability.specificCost, '0', 'number')}
        ${inputMarkup(`abilities.${index}.uses`, 'Usos, Reserva ou limite', ability.uses, 'Ex.: 3 Usos compartilhados')}
        ${textareaMarkup(`abilities.${index}.details`, 'Efeito e resolução desta capacidade', ability.details, 'O que faz, como é resistida, o que acontece no sucesso e na falha.', 4)}
      </div>
      <footer><strong>Custo desta capacidade: ${abilityCost(ability)} pontos</strong><p>${esc(type.summary || '')}</p></footer>
    </article>`;
  };

  const creationMarkup = () => `<section class="def-creation-builder" aria-labelledby="def-creation-title">
    <header class="def-creation-builder__header"><div><span>Construtor completo</span><h3 id="def-creation-title">Projeto da Criação</h3><p>Registre a existência separada, sua forma, resistência, quantidade, movimento, vínculos e cada capacidade. O custo é incorporado automaticamente à ficha.</p></div><strong>${creationExtraCost()} pontos estruturais</strong></header>

    <details open><summary><span>1</span><div><strong>Identidade e existência</strong><small>O que é, onde existe e como pode terminar.</small></div></summary><div class="def-details-body"><div class="def-grid def-grid--three">
      ${inputMarkup('form', 'Forma da Criação', creation.form, 'Ex.: Serpente de sangue com três metros')}
      ${selectMarkup('nature', 'Natureza', GUIDE.creation.natures, creation.nature)}
      ${inputMarkup('position', 'Posição inicial e ocupação', creation.position, 'Ex.: Surge em um ponto livre a até 15 metros')}
      ${selectMarkup('existence', 'Modelo de existência', GUIDE.creation.existence, creation.existence)}
      ${inputMarkup('anchor', 'Âncora ou dependência', creation.anchor, 'Ex.: Permanece enquanto o selo existir')}
      ${inputMarkup('activeLimit', 'Limite de manifestações ativas', creation.activeLimit, 'Ex.: Uma manifestação ativa')}
      ${textareaMarkup('sustain', 'Sustentação', creation.sustain, 'O que precisa continuar válido para a Criação existir?', 3)}
      ${textareaMarkup('endCondition', 'Encerramento', creation.endCondition, 'Duração, destruição, perda da Âncora ou outra condição objetiva.', 3)}
    </div></div></details>

    <details open><summary><span>2</span><div><strong>Quantidade e corpo</strong><small>Unidade, coletivo, Fragmentos, perfis completos, Escala ou Área.</small></div></summary><div class="def-details-body"><div class="def-grid def-grid--three">
      ${selectMarkup('multiplicity', 'Estrutura de multiplicidade', GUIDE.creation.multiplicity, creation.multiplicity)}
      ${selectMarkup('quantity', 'Quantidade mecânica', quantityOptions(), creation.quantity)}
      ${selectMarkup('bodyModel', 'Forma de ocupação', GUIDE.creation.bodyModel, creation.bodyModel)}
      ${creation.bodyModel === 'compact' ? selectMarkup('scale', 'Escala do corpo', GUIDE.creation.scale, creation.scale) : selectMarkup('bodyArea', 'Área ocupada pelo corpo', GUIDE.creation.bodyArea, creation.bodyArea)}
    </div><aside class="def-rule-note"><strong>Quantidade narrativa não multiplica mecânica.</strong><p>Um enxame pode ter milhares de insetos e ainda funcionar como uma única Criação Coletiva. Fragmentos dividem valores. Criações Completas repetem o perfil, mas continuam compartilhando oportunidades.</p></aside></div></details>

    <details open><summary><span>3</span><div><strong>Movimento, transporte e vínculos</strong><small>Como muda de posição, recebe ordens, transmite informação e serve de origem.</small></div></summary><div class="def-details-body"><div class="def-grid def-grid--three">
      ${selectMarkup('mobility', 'Modelo de mobilidade', GUIDE.creation.mobility, creation.mobility)}
      ${creation.mobility === 'own' ? selectMarkup('movement', 'Movimento próprio', GUIDE.creation.movement, creation.movement) : ''}
      ${creation.mobility === 'follows' ? inputMarkup('follows', 'Quem ou o que acompanha', creation.follows, 'Ex.: acompanha o usuário') : ''}
      ${selectMarkup('transport', 'Transporte ou Deslocamento', GUIDE.creation.transport, creation.transport)}
      ${selectMarkup('communication', 'Comunicação vinculada', GUIDE.creation.communication, creation.communication)}
      ${creation.communication !== 'none' ? inputMarkup('communicationRange', 'Alcance do Vínculo', creation.communicationRange, 'Ex.: 100 metros') : ''}
      ${selectMarkup('linkedOrigin', 'Origem de outros Milagres', GUIDE.creation.linkedOrigin, creation.linkedOrigin)}
      ${creation.linkedOrigin === 'linked' ? selectMarkup('origins', 'Origens simultâneas', GUIDE.creation.origins, creation.origins) : ''}
    </div></div></details>

    <details open><summary><span>4</span><div><strong>Capacidades da Criação</strong><small>Cada função declara Potência, atuação, Alcance, destino, Duração e resolução.</small></div></summary><div class="def-details-body">
      <div class="def-abilities">${creation.abilities.map(abilityMarkup).join('')}</div>
      <button class="def-add-ability" type="button" data-add-ability>Adicionar outra capacidade</button>
      <aside class="def-rule-note"><strong>A primeira função pode usar a Potência principal.</strong><p>Funções numéricas independentes compram Potência própria. Ação Própria é paga uma vez e permanece compartilhada entre todas as Criações do personagem.</p></aside>
    </div></details>

    <details><summary><span>5</span><div><strong>Observações e exceções</strong><small>Registre apenas o que não foi coberto pelas escolhas anteriores.</small></div></summary><div class="def-details-body">${textareaMarkup('notes', 'Notas da Criação', creation.notes, 'Sentidos especiais, equipamentos reais, memórias, conhecimento, comportamento, limitações e interações específicas.', 5)}</div></details>

    <footer class="def-creation-total"><div><span>Custo estrutural incorporado</span><strong>${creationExtraCost()} pontos</strong></div><p>Resistência e Ação Própria são sincronizadas com os campos principais para não serem cobradas duas vezes.</p></footer>
  </section>`;

  const costOf = (options, value) => Number(optionByValue(options, value)?.cost || 0);

  function abilityCost(ability) {
    let total = costOf(GUIDE.creation.capabilityTypes, ability.type);
    if (ability.potencyMode === 'own') total += costOf(DATA.core.potency, ability.potency);
    total += costOf(GUIDE.creation.abilityRange, ability.range);
    if (ability.targetMode === 'shared') total += costOf(DATA.core.sharedTargets, ability.targetCount);
    if (ability.targetMode === 'complete') total += costOf(DATA.core.completeTargets, ability.targetCount);
    if (ability.targetMode === 'area') total += costOf(DATA.core.area, ability.area === '0' ? '2' : ability.area);
    total += costOf(DATA.core.duration, ability.duration);
    total += Math.max(0, Number(ability.specificCost || 0));
    return total;
  }

  function creationExtraCost() {
    let total = 0;
    if (creation.multiplicity === 'fragmented') total += costOf(GUIDE.creation.fragments, creation.quantity);
    if (creation.multiplicity === 'complete') total += costOf(GUIDE.creation.complete, creation.quantity);
    total += creation.bodyModel === 'compact'
      ? costOf(GUIDE.creation.scale, creation.scale)
      : costOf(GUIDE.creation.bodyArea, creation.bodyArea);
    total += costOf(GUIDE.creation.mobility, creation.mobility);
    if (creation.mobility === 'own') total += costOf(GUIDE.creation.movement, creation.movement);
    total += costOf(GUIDE.creation.transport, creation.transport);
    total += costOf(GUIDE.creation.communication, creation.communication);
    total += costOf(GUIDE.creation.linkedOrigin, creation.linkedOrigin);
    if (creation.linkedOrigin === 'linked') total += costOf(GUIDE.creation.origins, creation.origins);
    total += creation.abilities.reduce((sum, ability) => sum + abilityCost(ability), 0);
    return total;
  }

  const setPath = (object, path, value) => {
    const parts = path.split('.');
    let cursor = object;
    for (let index = 0; index < parts.length - 1; index += 1) {
      const part = /^\d+$/.test(parts[index]) ? Number(parts[index]) : parts[index];
      cursor = cursor[part];
    }
    const last = /^\d+$/.test(parts.at(-1)) ? Number(parts.at(-1)) : parts.at(-1);
    cursor[last] = value;
  };

  const syncMainInput = (key, value, eventType = 'input') => {
    const control = host.querySelector(`[data-state="${CSS.escape(key)}"]`);
    if (!control || String(control.value) === String(value)) return false;
    control.value = value;
    control.dispatchEvent(new Event(eventType, { bubbles: true }));
    return true;
  };

  const syncCreationToMain = () => {
    if (syncing) return;
    syncing = true;
    saveCreation();

    syncMainInput('creationLimit', creation.activeLimit, 'input');
    syncMainInput('extraCostLabel', 'Estrutura avançada da Criação', 'input');
    syncMainInput('extraCost', String(creationExtraCost()), 'input');

    const hasOwnAction = creation.abilities.some((ability) => ability.acting === 'own');
    const firstActing = creation.abilities[0]?.acting;
    const mainActing = hasOwnAction
      ? 'Ação Própria'
      : firstActing === 'continuous'
        ? 'Contínua'
        : firstActing === 'conditioned'
          ? 'Condicionada'
          : 'Comandada';
    const changed = syncMainInput('creationAction', mainActing, 'change');
    syncing = false;
    if (!changed) decorateCreation();
  };

  const hideManagedCreationFields = (module) => {
    ['creationAction', 'creationLimit'].forEach((key) => {
      const field = module.querySelector(`[data-state="${key}"]`)?.closest('.studio-field');
      if (field) field.classList.add('def-managed-field');
    });
    if (!module.querySelector('.def-managed-note')) {
      module.querySelector('.studio-form-grid')?.insertAdjacentHTML('afterend', '<aside class="def-managed-note"><strong>Atuação e limite são definidos no Projeto da Criação abaixo.</strong><p>Esses campos permanecem sincronizados internamente para que o custo final não seja duplicado.</p></aside>');
    }
  };

  const decorateCreation = () => {
    const state = mainState();
    if (!Array.isArray(state.functions) || !state.functions.includes('creation')) return;
    const modules = [...host.querySelectorAll('.studio-module')];
    const module = modules.find((item) => item.querySelector('h3')?.textContent.trim() === 'Criação ou Invocação');
    if (!module) return;
    hideManagedCreationFields(module);
    if (module.nextElementSibling?.classList.contains('def-creation-builder')) return;
    module.insertAdjacentHTML('afterend', creationMarkup());
    syncCreationToMain();
  };

  const updateAdvancedGuides = (panel) => {
    panel.querySelectorAll('.def-field select').forEach((select) => {
      const field = select.closest('.def-field');
      const selected = select.options[select.selectedIndex];
      const guide = field.querySelector(':scope > .def-option-guide');
      if (!guide || guide.dataset.selected === selected.value) return;
      const path = select.dataset.defPath;
      const value = select.value;
      let item;
      const root = path.split('.')[0];
      const index = Number(path.split('.')[1]);
      if (root === 'abilities' && Number.isInteger(index)) {
        const ability = creation.abilities[index];
        const key = path.split('.')[2];
        const map = {
          type: GUIDE.creation.capabilityTypes,
          acting: GUIDE.creation.abilityActing,
          range: GUIDE.creation.abilityRange,
          potency: DATA.core.potency,
          duration: DATA.core.duration,
          targetCount: ability.targetMode === 'shared' ? DATA.core.sharedTargets : DATA.core.completeTargets,
          area: DATA.core.area
        };
        item = optionByValue(map[key] || [], value);
      } else {
        item = optionByValue(GUIDE.creation[root] || [], value);
      }
      if (item) {
        guide.innerHTML = `<strong>O que significa</strong><p>${esc(item.summary || item.note || '')}</p>${item.excludes ? `<div><span>Não concede</span><p>${esc(item.excludes)}</p></div>` : ''}`;
        guide.dataset.selected = value;
      }
    });
  };

  const handleCreationInput = (event) => {
    const control = event.target.closest('[data-def-path]');
    if (!control) return;
    setPath(creation, control.dataset.defPath, control.value);
    saveCreation();
    syncCreationToMain();
  };

  const handleCreationChange = (event) => {
    const control = event.target.closest('[data-def-path]');
    if (!control) return;
    setPath(creation, control.dataset.defPath, control.value);

    if (control.dataset.defPath === 'multiplicity' && !['fragmented', 'complete'].includes(control.value)) creation.quantity = '1';
    if (control.dataset.defPath.endsWith('.targetMode')) {
      const [, index] = control.dataset.defPath.split('.');
      const ability = creation.abilities[Number(index)];
      ability.targetCount = '1';
      ability.area = control.value === 'area' ? '2' : '0';
    }

    saveCreation();
    const panel = control.closest('.def-creation-builder');
    if (panel) panel.outerHTML = creationMarkup();
    syncCreationToMain();
  };

  const handleCreationClick = (event) => {
    const add = event.target.closest('[data-add-ability]');
    if (add) {
      creation.abilities.push({
        ...creationDefaults().abilities[0],
        id: `ability-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        name: `Capacidade ${creation.abilities.length + 1}`,
        potencyMode: 'own'
      });
      saveCreation();
      add.closest('.def-creation-builder').outerHTML = creationMarkup();
      syncCreationToMain();
      return;
    }

    const remove = event.target.closest('[data-remove-ability]');
    if (remove && creation.abilities.length > 1) {
      creation.abilities = creation.abilities.filter((ability) => ability.id !== remove.dataset.removeAbility);
      saveCreation();
      remove.closest('.def-creation-builder').outerHTML = creationMarkup();
      syncCreationToMain();
    }
  };

  const creationExport = () => {
    const nature = optionByValue(GUIDE.creation.natures, creation.nature)?.label || creation.nature;
    const existence = optionByValue(GUIDE.creation.existence, creation.existence)?.label || creation.existence;
    const multiplicity = optionByValue(GUIDE.creation.multiplicity, creation.multiplicity)?.label || creation.multiplicity;
    const quantity = optionByValue(quantityOptions(), creation.quantity)?.label || creation.quantity;
    const body = creation.bodyModel === 'compact'
      ? optionByValue(GUIDE.creation.scale, creation.scale)?.label
      : `Área corporal de ${optionByValue(GUIDE.creation.bodyArea, creation.bodyArea)?.label}`;
    const mobility = optionByValue(GUIDE.creation.mobility, creation.mobility)?.label || creation.mobility;
    const communication = optionByValue(GUIDE.creation.communication, creation.communication)?.label || creation.communication;
    const linked = optionByValue(GUIDE.creation.linkedOrigin, creation.linkedOrigin)?.label || creation.linkedOrigin;

    const abilities = creation.abilities.map((ability, index) => {
      const type = optionByValue(GUIDE.creation.capabilityTypes, ability.type)?.label || ability.type;
      const potency = ability.potencyMode === 'principal'
        ? 'Potência principal da Criação'
        : ability.potencyMode === 'own'
          ? optionByValue(DATA.core.potency, ability.potency)?.label || ability.potency
          : 'Sem Potência numérica';
      const acting = optionByValue(GUIDE.creation.abilityActing, ability.acting)?.label || ability.acting;
      const destination = ability.targetMode === 'area'
        ? `Área de ${optionByValue(DATA.core.area, ability.area === '0' ? '2' : ability.area)?.label || ability.area}`
        : ability.targetMode === 'shared' || ability.targetMode === 'complete'
          ? `${ability.targetMode === 'shared' ? 'Alvos Compartilhados' : 'Alvos Completos'}: ${ability.targetCount}`
          : 'Um alvo';
      return `${index + 1}. ${ability.name || type}\nFunção: ${type}\nPotência: ${potency}\nAtuação: ${acting}\nAlcance: ${ability.range}\nDestino: ${destination}\nDuração: ${ability.duration}\nUsos ou limite: ${ability.uses || 'Conforme a atuação'}\nEfeito: ${ability.details || 'Não descrito'}\nCusto: ${abilityCost(ability)} pontos`;
    }).join('\n\n');

    return `PROJETO DA CRIAÇÃO\n\nForma: ${creation.form || 'Não definida'}\nNatureza: ${nature}\nPosição: ${creation.position || 'Não definida'}\nExistência: ${existence}\nÂncora: ${creation.anchor || 'Nenhuma declarada'}\nSustentação: ${creation.sustain || 'Pelo próprio Milagre'}\nLimite ativo: ${creation.activeLimit}\nEncerramento: ${creation.endCondition || 'Conforme a Duração, destruição ou perda da Sustentação'}\nMultiplicidade: ${multiplicity} — ${quantity}\nCorpo: ${body}\nMobilidade: ${mobility}${creation.mobility === 'own' ? ` — ${creation.movement} metros` : ''}${creation.mobility === 'follows' ? ` — ${creation.follows || 'vínculo não definido'}` : ''}\nTransporte: ${optionByValue(GUIDE.creation.transport, creation.transport)?.label || creation.transport}\nComunicação: ${communication}${creation.communication !== 'none' ? ` — Alcance ${creation.communicationRange}` : ''}\nOrigem Vinculada: ${linked}${creation.linkedOrigin === 'linked' ? ` — ${creation.origins} origens` : ''}\n\nCAPACIDADES DA CRIAÇÃO\n\n${abilities}\n\nOBSERVAÇÕES\n\n${creation.notes || 'Nenhuma.'}\n\nCUSTO ESTRUTURAL AUTOMÁTICO: ${creationExtraCost()} PONTOS`;
  };

  const heritageExport = (heritage) => {
    if (!heritage) return '';
    return `HERANÇA DA VERTENTE\n\n${heritage.title}\n${heritage.summary}\n${heritage.rules.map((rule) => `${rule.label}: ${rule.text}`).join('\n')}${heritage.example ? `\nExemplo: ${heritage.example}` : ''}\n\nA Herança é automática e não possui custo adicional.`;
  };

  const injectSections = (base, heritage) => {
    if (!base || base.includes('HERANÇA DA VERTENTE') || base.includes('PROJETO DA CRIAÇÃO')) return base;
    const state = mainState();
    const sections = [];
    if (heritage) sections.push(heritageExport(heritage));
    if (Array.isArray(state.functions) && state.functions.includes('creation')) sections.push(creationExport());
    if (!sections.length) return base;

    const marker = '\nDESCRIÇÃO\n';
    const index = base.indexOf(marker);
    if (index < 0) return `${base}\n\n${sections.join('\n\n')}`;
    return `${base.slice(0, index)}\n\n${sections.join('\n\n')}\n${base.slice(index)}`;
  };

  const enrichExport = async (knownHeritage = null) => {
    const area = host.querySelector('#studio-export-text');
    if (!area) return;
    const state = mainState();
    const heritage = knownHeritage || await fetchHeritage(state.domain, state.branch);
    area.value = injectSections(area.value, heritage);
  };

  const copyText = async (value) => {
    try { await navigator.clipboard.writeText(value); }
    catch {
      const area = document.createElement('textarea');
      area.value = value;
      area.style.position = 'fixed';
      area.style.opacity = '0';
      document.body.appendChild(area);
      area.select();
      document.execCommand('copy');
      area.remove();
    }
  };

  const interceptCopy = async (event) => {
    const button = event.target.closest('[data-copy-export]');
    if (!button || !host.contains(button)) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    const state = mainState();
    const heritage = await fetchHeritage(state.domain, state.branch);
    const area = host.querySelector('#studio-export-text');
    const value = injectSections(area?.value || '', heritage);
    await copyText(value);
    button.textContent = 'Ficha completa copiada';
    window.setTimeout(() => { button.textContent = 'Copiar ficha'; }, 1800);
  };

  const decorateCreationEvents = () => {
    const panel = host.querySelector('.def-creation-builder');
    if (!panel || panel.dataset.eventsReady === 'true') return;
    panel.dataset.eventsReady = 'true';
    panel.addEventListener('input', handleCreationInput);
    panel.addEventListener('change', handleCreationChange);
    panel.addEventListener('click', handleCreationClick);
    updateAdvancedGuides(panel);
  };

  const decorate = async () => {
    if (decorating || !host) return;
    decorating = true;
    try {
      decorateStandardFields();
      decorateFunctionCards();
      decorateCreation();
      decorateCreationEvents();
      await decorateHeritage();
      await enrichExport();
    } finally {
      decorating = false;
    }
  };

  const scheduleDecorate = () => window.requestAnimationFrame(() => { decorate(); });

  const start = () => {
    ensureStylesheet();
    host = document.querySelector('.miracle-studio-host');
    if (!host) {
      window.setTimeout(start, 80);
      return;
    }

    observer = new MutationObserver(scheduleDecorate);
    observer.observe(host, { childList: true, subtree: true });
    host.addEventListener('change', scheduleDecorate);
    host.addEventListener('input', scheduleDecorate);
    document.addEventListener('click', interceptCopy, true);
    decorate();
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, { once: true });
  else start();
})();
