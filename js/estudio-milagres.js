(() => {
  'use strict';

  const DATA = window.HarmoniaMiracleStudioData;
  const page = window.location.pathname.split('/').filter(Boolean).pop();
  if (!DATA || page !== 'construcao-guiada.html') return;
  if (document.documentElement.dataset.miracleStudioReady === 'true') return;
  document.documentElement.dataset.miracleStudioReady = 'true';

  const STORAGE_KEY = 'harmonia-caotica:estudio-milagres:v1';
  const currentScript = document.currentScript;
  const scriptBase = currentScript?.src ? new URL('.', currentScript.src) : new URL('../js/', document.baseURI);

  const ensureStylesheet = () => {
    if (document.getElementById('miracle-studio-style')) return;
    const link = document.createElement('link');
    link.id = 'miracle-studio-style';
    link.rel = 'stylesheet';
    link.href = new URL('../css/estudio-milagres.css?v=20260720a', scriptBase).href;
    document.head.appendChild(link);
  };

  const esc = (value = '') => String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');

  const defaults = {
    step: 1,
    name: '',
    idea: '',
    deity: '',
    domain: '',
    branch: '',
    rank: 'I',
    functions: [],
    potency: '',
    activation: 'Ação',
    range: 'Pessoal ou Contato',
    targetMode: 'one',
    targetCount: '1',
    area: '0',
    duration: 'Instantânea',
    cadence: 'Comum',
    effect: '',
    limits: '',
    resistance: '',
    success: '',
    failure: '',
    endCondition: '',
    manifestationLimit: '',
    extraCostLabel: '',
    extraCost: '0',
    controlAuthority: '',
    controlWay: '',
    controlUses: '1',
    controlOrder: '',
    creationResistance: 'Básica',
    creationAction: 'Contínua',
    creationLimit: '',
    traversalType: '',
    transformationScope: 'Superficial',
    resourceFunction: '',
    informationFunction: '',
    informationDepth: 'Presença',
    protectionFunction: '',
    combatProfile: 'Nenhum',
    damageFunction: 'Dano Direto',
    healingFunction: '',
    costFunction: 'Nenhuma'
  };

  const loadState = () => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
      return { ...defaults, ...saved, functions: Array.isArray(saved.functions) ? saved.functions : [] };
    } catch {
      return { ...defaults };
    }
  };

  let state = loadState();
  let lastFocused = null;

  const saveState = () => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // O Estúdio continua funcional quando o armazenamento estiver indisponível.
    }
  };

  const findOption = (options, value) => options.find((item) => String(item.value) === String(value));

  const selectMarkup = (id, label, options, value, help = '') => `
    <label class="studio-field" for="studio-${esc(id)}">
      <span>${esc(label)}${help ? `<button class="studio-term" type="button" data-term="${esc(help)}" aria-label="Explicar ${esc(help)}">?</button>` : ''}</span>
      <select id="studio-${esc(id)}" data-state="${esc(id)}">
        ${options.map((item) => `<option value="${esc(item.value)}" ${String(item.value) === String(value) ? 'selected' : ''}>${esc(item.label)}${item.cost ? ` · ${item.cost} pt${item.cost === 1 ? '' : 's'}` : ''}</option>`).join('')}
      </select>
    </label>`;

  const textFieldMarkup = (id, label, value, placeholder = '', type = 'text') => `
    <label class="studio-field" for="studio-${esc(id)}">
      <span>${esc(label)}</span>
      <input id="studio-${esc(id)}" type="${esc(type)}" data-state="${esc(id)}" value="${esc(value)}" placeholder="${esc(placeholder)}">
    </label>`;

  const textareaMarkup = (id, label, value, placeholder = '', rows = 4) => `
    <label class="studio-field studio-field--wide" for="studio-${esc(id)}">
      <span>${esc(label)}</span>
      <textarea id="studio-${esc(id)}" data-state="${esc(id)}" rows="${rows}" placeholder="${esc(placeholder)}">${esc(value)}</textarea>
    </label>`;

  const selectedDomain = () => DATA.deities[state.deity]?.domains?.[state.domain] || null;

  const selectedFunctions = () => DATA.functions.filter((item) => state.functions.includes(item.id));

  const optionCost = (options, value) => Number(findOption(options, value)?.cost || 0);

  const costBreakdown = () => {
    const parts = [];
    const add = (label, cost) => {
      const numeric = Number(cost || 0);
      if (numeric > 0) parts.push({ label, cost: numeric });
    };

    const potency = findOption(DATA.core.potency, state.potency);
    if (potency) add(`Potência ${potency.label}`, potency.cost);

    add(`Ativação por ${state.activation}`, optionCost(DATA.core.activation, state.activation));
    add(`Alcance de ${state.range}`, optionCost(DATA.core.range, state.range));

    if (state.targetMode === 'shared') {
      const item = findOption(DATA.core.sharedTargets, state.targetCount);
      if (item) add(`Alvos Compartilhados: ${item.label}`, item.cost);
    } else if (state.targetMode === 'complete') {
      const item = findOption(DATA.core.completeTargets, state.targetCount);
      if (item) add(`Alvos Completos: ${item.label}`, item.cost);
    } else if (state.targetMode === 'area') {
      const item = findOption(DATA.core.area, state.area);
      if (item) add(`Área de ${item.label}`, item.cost);
    }

    add(`Duração ${state.duration}`, optionCost(DATA.core.duration, state.duration));

    selectedFunctions().forEach((fn) => {
      const module = DATA.modules[fn.id];
      if (!module) return;
      module.fields.forEach((field) => {
        if (field.type !== 'select') return;
        const item = findOption(field.options, state[field.id]);
        if (item) add(`${module.title}: ${item.label}`, item.cost);
      });
    });

    const extra = Math.max(0, Number(state.extraCost || 0));
    if (extra) add(state.extraCostLabel || 'Compra adicional', extra);

    return parts;
  };

  const totalCost = () => costBreakdown().reduce((total, item) => total + item.cost, 0);
  const budget = () => DATA.budgets[state.rank] || 0;

  const validations = () => {
    const issues = [];
    const warnings = [];

    if (!state.name.trim()) issues.push('Defina o nome do Milagre.');
    if (!state.idea.trim()) issues.push('Explique em uma frase o que o Milagre faz.');
    if (!state.deity || !state.domain || !state.branch) issues.push('Defina Divindade, Domínio e Vertente.');
    if (!state.functions.length) issues.push('Escolha ao menos uma função mecânica.');
    if (!state.potency) issues.push('Escolha a Potência.');
    if (!state.effect.trim()) issues.push('Escreva o efeito mecânico final.');

    if (totalCost() > budget()) issues.push(`O custo atual excede o orçamento do Rank ${state.rank} em ${totalCost() - budget()} ponto${totalCost() - budget() === 1 ? '' : 's'}.`);

    if (state.targetMode === 'area' && state.area === '0') issues.push('O modo Área foi escolhido, mas seu tamanho ainda não foi definido.');

    if (state.duration === 'Persistente') {
      if (!state.manifestationLimit.trim()) issues.push('Duração Persistente exige um limite de manifestações ativas.');
      if (!state.endCondition.trim()) issues.push('Duração Persistente exige uma forma clara de encerramento.');
    }

    if (state.functions.includes('control')) {
      if (!state.controlAuthority) issues.push('Controle exige uma Autoridade.');
      if (!state.controlWay) issues.push('Controle exige uma Via.');
      if (!state.controlOrder.trim()) issues.push('Controle exige a emoção, ordem ou instrução imposta.');
      if ((state.controlAuthority === 'Compulsão' || state.controlAuthority === 'Dominação') && !state.controlUses) issues.push('Compulsão ou Dominação exige quantidade de Usos.');
    }

    if (state.functions.includes('creation') && !state.creationLimit.trim()) warnings.push('Declare quantas Criações podem permanecer ativas ao mesmo tempo.');
    if (!state.resistance.trim()) warnings.push('Considere registrar como o efeito pode ser resistido ou superado.');
    if (!state.success.trim() || !state.failure.trim()) warnings.push('Sucesso e falha ainda não estão descritos separadamente.');
    if (!state.limits.trim()) warnings.push('O Milagre ainda não possui limites explícitos.');

    const domain = selectedDomain();
    if (domain && state.idea.trim() && !state.idea.toLocaleLowerCase('pt-BR').includes(state.branch.toLocaleLowerCase('pt-BR'))) {
      warnings.push('Retire o nome e a estética do poder: o princípio restante ainda demonstra claramente a Vertente escolhida?');
    }

    return { issues, warnings };
  };

  const targetLabel = () => {
    if (state.targetMode === 'one') return 'Um alvo';
    if (state.targetMode === 'shared') return `Alvos Compartilhados: ${findOption(DATA.core.sharedTargets, state.targetCount)?.label || ''}`;
    if (state.targetMode === 'complete') return `Alvos Completos: ${findOption(DATA.core.completeTargets, state.targetCount)?.label || ''}`;
    return `Área de ${findOption(DATA.core.area, state.area)?.label || 'tamanho indefinido'}`;
  };

  const summaryMarkup = () => {
    const cost = totalCost();
    const max = budget();
    const status = cost > max ? 'over' : cost === max ? 'full' : 'ok';
    const functions = selectedFunctions().map((item) => item.name).join(', ') || 'Não definida';

    return `
      <div class="studio-summary__identity">
        <span>Rascunho atual</span>
        <strong>${esc(state.name || 'Milagre sem nome')}</strong>
        <p>${esc(state.deity || 'Divindade')} · ${esc(state.domain || 'Domínio')} · ${esc(state.branch || 'Vertente')}</p>
      </div>
      <dl class="studio-summary__facts">
        <div><dt>Rank</dt><dd>${esc(state.rank)}</dd></div>
        <div><dt>Potência</dt><dd>${esc(findOption(DATA.core.potency, state.potency)?.label || 'Não definida')}</dd></div>
        <div><dt>Função</dt><dd>${esc(functions)}</dd></div>
        <div><dt>Espaço</dt><dd>${esc(state.range)} · ${esc(targetLabel())}</dd></div>
        <div><dt>Tempo</dt><dd>${esc(state.activation)} · ${esc(state.duration)}</dd></div>
      </dl>
      <div class="studio-budget" data-status="${status}">
        <div><span>Custo atual</span><strong>${cost} / ${max}</strong></div>
        <div class="studio-budget__track"><span style="width:${Math.min(100, max ? (cost / max) * 100 : 0)}%"></span></div>
        <p>${cost > max ? `Excede o Rank em ${cost - max}.` : `${max - cost} ponto${max - cost === 1 ? '' : 's'} disponível${max - cost === 1 ? '' : 'is'}.`}</p>
      </div>`;
  };

  const stepOne = () => `
    <section class="studio-step" aria-labelledby="studio-step-title-1">
      <p class="studio-step__eyebrow">Etapa 1 de 6 · Ideia</p>
      <h2 id="studio-step-title-1">Descreva o resultado antes das regras</h2>
      <p class="studio-step__lead">Não procure nomes técnicos ainda. Diga apenas o que muda quando o poder funciona.</p>
      <div class="studio-form-grid">
        ${textFieldMarkup('name', 'Nome do Milagre', state.name, 'Ex.: Voz da Devoção')}
        ${textareaMarkup('idea', 'O que este Milagre faz?', state.idea, 'Ex.: Obriga uma criatura a me proteger durante o combate.', 5)}
      </div>
      <aside class="studio-inline-help"><strong>Teste da frase</strong><p>Uma pessoa que não conhece a estética do personagem consegue identificar o resultado mecânico apenas por esta descrição?</p></aside>
    </section>`;

  const stepTwo = () => {
    const deityOptions = [{ value: '', label: 'Selecione a Divindade', cost: 0 }, ...Object.keys(DATA.deities).map((name) => ({ value: name, label: name, cost: 0 }))];
    const domains = state.deity ? Object.keys(DATA.deities[state.deity]?.domains || {}) : [];
    const domainOptions = [{ value: '', label: 'Selecione o Domínio', cost: 0 }, ...domains.map((name) => ({ value: name, label: name, cost: 0 }))];
    const branches = selectedDomain()?.branches || {};
    const branchOptions = [{ value: '', label: 'Selecione a Vertente', cost: 0 }, ...Object.keys(branches).map((name) => ({ value: name, label: name, cost: 0 }))];
    const branchText = state.branch ? branches[state.branch] : '';

    return `
      <section class="studio-step" aria-labelledby="studio-step-title-2">
        <p class="studio-step__eyebrow">Etapa 2 de 6 · Origem divina</p>
        <h2 id="studio-step-title-2">Escolha o princípio que produz o efeito</h2>
        <p class="studio-step__lead">A aparência não decide a classificação. Escolha a Vertente que explica como o resultado acontece.</p>
        <div class="studio-form-grid studio-form-grid--three">
          ${selectMarkup('deity', 'Divindade', deityOptions, state.deity)}
          ${selectMarkup('domain', 'Domínio', domainOptions, state.domain, 'Domínio')}
          ${selectMarkup('branch', 'Vertente', branchOptions, state.branch, 'Vertente')}
        </div>
        <div class="studio-origin-card">
          <span>${esc(state.domain || 'Domínio ainda não escolhido')}</span>
          <strong>${esc(state.branch || 'Escolha uma Vertente')}</strong>
          <p>${esc(branchText || selectedDomain()?.summary || 'A explicação da origem aparecerá aqui sem exigir outra página.')}</p>
          ${state.domain ? `<button type="button" data-domain-rule="${esc(state.domain)}">Ler o Domínio sem sair do Estúdio</button>` : ''}
        </div>
        <aside class="studio-inline-help"><strong>Teste de coerência</strong><p>Retire o nome, a cor, a voz e os símbolos do poder. O mecanismo restante ainda pertence à Vertente selecionada?</p></aside>
      </section>`;
  };

  const stepThree = () => `
    <section class="studio-step" aria-labelledby="studio-step-title-3">
      <p class="studio-step__eyebrow">Etapa 3 de 6 · Funções</p>
      <h2 id="studio-step-title-3">Marque tudo que o Milagre realmente faz</h2>
      <p class="studio-step__lead">Um poder pode usar mais de uma função. Cada escolha abre somente as perguntas necessárias nas próximas etapas.</p>
      <div class="studio-function-grid">
        ${DATA.functions.map((fn) => `
          <article class="studio-function ${state.functions.includes(fn.id) ? 'is-selected' : ''}">
            <label>
              <input type="checkbox" data-function="${esc(fn.id)}" ${state.functions.includes(fn.id) ? 'checked' : ''}>
              <span><strong>${esc(fn.name)}</strong><small>${esc(fn.short)}</small></span>
            </label>
            <p>${esc(fn.question)}</p>
            <button type="button" data-rule-page="${esc(fn.page)}" data-rule-anchor="${esc(fn.anchor)}" data-rule-title="${esc(fn.name)}">Entender aqui</button>
          </article>`).join('')}
      </div>
    </section>`;

  const targetOptionsMarkup = () => {
    if (state.targetMode === 'shared') return selectMarkup('targetCount', 'Quantidade', DATA.core.sharedTargets, state.targetCount);
    if (state.targetMode === 'complete') return selectMarkup('targetCount', 'Quantidade', DATA.core.completeTargets, state.targetCount);
    if (state.targetMode === 'area') return selectMarkup('area', 'Maior dimensão da Área', DATA.core.area, state.area, 'Área');
    return '<div class="studio-field studio-field--static"><span>Quantidade</span><strong>Um alvo · 0 pontos</strong></div>';
  };

  const stepFour = () => `
    <section class="studio-step" aria-labelledby="studio-step-title-4">
      <p class="studio-step__eyebrow">Etapa 4 de 6 · Escala</p>
      <h2 id="studio-step-title-4">Defina os parâmetros com o custo visível</h2>
      <p class="studio-step__lead">O total é calculado nesta tela. Nenhuma tabela precisa permanecer aberta em outra página.</p>
      <div class="studio-form-grid studio-form-grid--three">
        ${selectMarkup('rank', 'Rank', DATA.ranks, state.rank, 'Rank')}
        ${selectMarkup('potency', 'Potência', [{ value: '', label: 'Selecione', cost: 0 }, ...DATA.core.potency], state.potency, 'Potência')}
        ${selectMarkup('activation', 'Ativação', DATA.core.activation, state.activation)}
        ${selectMarkup('range', 'Alcance', DATA.core.range, state.range, 'Alcance')}
        ${selectMarkup('targetMode', 'Modelo de destino', DATA.core.targetMode, state.targetMode)}
        ${targetOptionsMarkup()}
        ${selectMarkup('duration', 'Duração', DATA.core.duration, state.duration, 'Duração')}
        ${textFieldMarkup('cadence', 'Cadência', state.cadence, 'Ex.: Comum')}
      </div>
      ${state.duration === 'Persistente' ? `
        <div class="studio-conditional">
          <h3>Exigências da Duração Persistente</h3>
          <div class="studio-form-grid">
            ${textFieldMarkup('manifestationLimit', 'Manifestações ativas', state.manifestationLimit, 'Ex.: Uma manifestação ativa.')}
            ${textareaMarkup('endCondition', 'Como o efeito termina?', state.endCondition, 'Ex.: Encerra quando o vínculo é rompido ou o usuário o desfaz.', 3)}
          </div>
        </div>` : ''}
      <button class="studio-inline-rule" type="button" data-rule-page="consulta-rapida.html" data-rule-anchor="ranks-e-potencia" data-rule-title="Tabelas de construção">Abrir todas as tabelas dentro do Estúdio</button>
    </section>`;

  const moduleFieldMarkup = (field) => {
    if (field.type === 'select') return selectMarkup(field.id, field.label, field.options, state[field.id]);
    return textFieldMarkup(field.id, field.label, state[field.id], field.placeholder || '');
  };

  const moduleMarkup = (fn) => {
    const module = DATA.modules[fn.id];
    if (!module) return '';
    return `
      <section class="studio-module">
        <header><div><span>Função selecionada</span><h3>${esc(module.title)}</h3></div><button type="button" data-rule-page="${esc(fn.page)}" data-rule-anchor="${esc(fn.anchor)}" data-rule-title="${esc(module.title)}">Consultar regra aqui</button></header>
        <div class="studio-form-grid studio-form-grid--three">
          ${module.fields.map(moduleFieldMarkup).join('')}
        </div>
        <div class="studio-required">
          <strong>O texto final precisa responder</strong>
          <ul>${fn.required.map((item) => `<li>${esc(item)}</li>`).join('')}</ul>
        </div>
      </section>`;
  };

  const stepFive = () => `
    <section class="studio-step" aria-labelledby="studio-step-title-5">
      <p class="studio-step__eyebrow">Etapa 5 de 6 · Resolução</p>
      <h2 id="studio-step-title-5">Feche as regras específicas sem procurar capítulos</h2>
      <p class="studio-step__lead">Somente os módulos correspondentes às funções escolhidas aparecem abaixo.</p>
      ${selectedFunctions().map(moduleMarkup).filter(Boolean).join('') || '<div class="studio-empty">Escolha funções na etapa anterior para abrir os módulos necessários.</div>'}
      <section class="studio-module studio-module--resolution">
        <header><div><span>Texto do Milagre</span><h3>Resolução e limites</h3></div></header>
        <div class="studio-form-grid">
          ${textareaMarkup('effect', 'Efeito mecânico', state.effect, 'Escreva o que acontece, em que ordem e quais oportunidades ou recursos são utilizados.', 6)}
          ${textareaMarkup('resistance', 'Como o efeito é resistido ou superado?', state.resistance, 'Ex.: O alvo precisa superar a Potência do Milagre.', 3)}
          ${textareaMarkup('success', 'O que ocorre no sucesso?', state.success, 'Resultado quando a aplicação funciona.', 3)}
          ${textareaMarkup('failure', 'O que ocorre na falha?', state.failure, 'Resultado quando a aplicação não funciona ou é resistida.', 3)}
          ${textareaMarkup('limits', 'Limites e contrajogo', state.limits, 'Registre somente limites que não estejam claros nos parâmetros.', 5)}
          ${textareaMarkup('endCondition', 'Encerramento', state.endCondition, 'Quando e por que o efeito termina?', 3)}
          ${textFieldMarkup('extraCostLabel', 'Nome de uma compra ainda não catalogada', state.extraCostLabel, 'Ex.: Alternância entre modos')}
          ${textFieldMarkup('extraCost', 'Custo adicional', state.extraCost, '0', 'number')}
        </div>
      </section>
    </section>`;

  const validationMarkup = () => {
    const result = validations();
    return `
      <div class="studio-validation ${result.issues.length ? 'has-errors' : 'is-valid'}">
        <header><span>${result.issues.length ? 'Ainda não está pronto' : 'Estrutura principal completa'}</span><strong>${result.issues.length ? `${result.issues.length} pendência${result.issues.length === 1 ? '' : 's'}` : 'Pronto para revisão humana'}</strong></header>
        ${result.issues.length ? `<ul>${result.issues.map((item) => `<li>${esc(item)}</li>`).join('')}</ul>` : '<p>O formulário possui as informações mínimas para produzir uma ficha. A aprovação ainda depende da coerência do conteúdo.</p>'}
        ${result.warnings.length ? `<details><summary>${result.warnings.length} ponto${result.warnings.length === 1 ? '' : 's'} de atenção</summary><ul>${result.warnings.map((item) => `<li>${esc(item)}</li>`).join('')}</ul></details>` : ''}
      </div>`;
  };

  const buildExport = () => {
    const functions = selectedFunctions().map((item) => item.name).join(' / ') || 'Não definida';
    const costs = costBreakdown();
    const moduleLines = [];

    selectedFunctions().forEach((fn) => {
      const module = DATA.modules[fn.id];
      if (!module) return;
      module.fields.forEach((field) => {
        const value = state[field.id];
        if (!value) return;
        moduleLines.push(`${field.label}: ${value}`);
      });
    });

    return `${state.name ? `✦ ${state.name.toUpperCase()}` : '✦ MILAGRE SEM NOME'}

Rank: ${state.rank}
Divindade: ${state.deity || 'Não definida'}
Domínio: ${state.domain || 'Não definido'}
Vertente: ${state.branch || 'Não definida'}
Função: ${functions}
Potência: ${findOption(DATA.core.potency, state.potency)?.label || 'Não definida'}
Ativação: ${state.activation}
Alcance: ${state.range}
Destino: ${targetLabel()}
Duração: ${state.duration}
Cadência: ${state.cadence || 'Não definida'}
${moduleLines.length ? `\nREGRAS ESPECÍFICAS\n\n${moduleLines.join('\n')}\n` : ''}
DESCRIÇÃO

${state.idea || 'Não definida.'}

EFEITO

${state.effect || 'Não definido.'}

RESISTÊNCIA

${state.resistance || 'Não definida.'}

SUCESSO

${state.success || 'Não definido.'}

FALHA

${state.failure || 'Não definida.'}

LIMITES

${state.limits || 'Não definidos.'}

ENCERRAMENTO

${state.endCondition || 'Conforme a Duração.'}

CUSTOS

${costs.length ? costs.map((item) => `${item.label}: ${item.cost} ponto${item.cost === 1 ? '' : 's'}`).join('\n') : 'Nenhum custo selecionado.'}

TOTAL: ${totalCost()} / ${budget()} PONTOS`;
  };

  const stepSix = () => `
    <section class="studio-step" aria-labelledby="studio-step-title-6">
      <p class="studio-step__eyebrow">Etapa 6 de 6 · Revisão</p>
      <h2 id="studio-step-title-6">Confira a ficha inteira nesta página</h2>
      <p class="studio-step__lead">Nenhum capítulo adicional é obrigatório para copiar o rascunho. As regras completas continuam disponíveis no painel lateral apenas quando surgir uma dúvida.</p>
      ${validationMarkup()}
      <div class="studio-cost-review">
        <h3>Composição do custo</h3>
        <dl>${costBreakdown().map((item) => `<div><dt>${esc(item.label)}</dt><dd>${item.cost}</dd></div>`).join('') || '<div><dt>Nenhuma compra selecionada</dt><dd>0</dd></div>'}</dl>
        <strong>Total: ${totalCost()} / ${budget()} pontos</strong>
      </div>
      <label class="studio-export"><span>Ficha gerada</span><textarea readonly rows="24" id="studio-export-text">${esc(buildExport())}</textarea></label>
      <div class="studio-review-actions">
        <button type="button" data-copy-export>Copiar ficha</button>
        <button type="button" data-reset-studio>Começar outra ficha</button>
      </div>
    </section>`;

  const steps = [stepOne, stepTwo, stepThree, stepFour, stepFive, stepSix];

  const progressMarkup = () => {
    const names = ['Ideia', 'Origem', 'Funções', 'Escala', 'Resolução', 'Revisão'];
    return `<nav class="studio-progress" aria-label="Etapas da construção">${names.map((name, index) => {
      const number = index + 1;
      const status = number === state.step ? 'current' : number < state.step ? 'done' : 'future';
      return `<button type="button" data-go-step="${number}" data-status="${status}" ${number === state.step ? 'aria-current="step"' : ''}><span>${number}</span><small>${name}</small></button>`;
    }).join('')}</nav>`;
  };

  const studioMarkup = () => `
    <section class="miracle-studio" aria-labelledby="miracle-studio-title">
      <header class="miracle-studio__header">
        <div><p>Ferramenta integrada</p><h1 id="miracle-studio-title">Estúdio de Milagres</h1><span>Construa, consulte, calcule e revise sem abandonar esta página.</span></div>
        <button type="button" data-open-manual>Manual completo</button>
      </header>
      ${progressMarkup()}
      <div class="miracle-studio__layout">
        <main class="miracle-studio__workspace">${steps[state.step - 1]()}</main>
        <aside class="studio-summary" aria-label="Resumo do Milagre"><div class="studio-summary__body">${summaryMarkup()}</div></aside>
      </div>
      <footer class="studio-navigation">
        <button type="button" data-prev-step ${state.step === 1 ? 'disabled' : ''}>Voltar</button>
        <span>Etapa ${state.step} de 6</span>
        <button type="button" data-next-step ${state.step === 6 ? 'disabled' : ''}>Continuar</button>
      </footer>
    </section>`;

  const drawerMarkup = () => `
    <div class="studio-drawer" hidden aria-hidden="true">
      <button class="studio-drawer__backdrop" type="button" data-close-drawer aria-label="Fechar explicação"></button>
      <aside class="studio-drawer__panel" role="dialog" aria-modal="true" aria-labelledby="studio-drawer-title">
        <header><div><span>Regra consultada sem sair da ficha</span><h2 id="studio-drawer-title">Explicação</h2></div><button type="button" data-close-drawer aria-label="Fechar">×</button></header>
        <div class="studio-drawer__content" data-drawer-content><p>Selecione uma regra para consultá-la aqui.</p></div>
      </aside>
    </div>`;

  let article;
  let studioHost;
  let manual;

  const wrapExistingManual = () => {
    article = document.querySelector('.systems-page .domain-article');
    if (!article) return false;

    const breadcrumb = article.querySelector(':scope > .system-breadcrumb');
    const nodes = [...article.children].filter((node) => node !== breadcrumb);

    manual = document.createElement('details');
    manual.className = 'studio-manual';
    manual.innerHTML = '<summary><span>Manual canônico completo</span><small>Abra somente quando precisar examinar todos os capítulos e exemplos da página anterior.</small></summary><div class="studio-manual__body"></div>';
    const body = manual.querySelector('.studio-manual__body');
    nodes.forEach((node) => body.appendChild(node));

    studioHost = document.createElement('div');
    studioHost.className = 'miracle-studio-host';
    studioHost.innerHTML = studioMarkup() + drawerMarkup();

    if (breadcrumb) breadcrumb.after(studioHost);
    else article.prepend(studioHost);
    article.appendChild(manual);
    return true;
  };

  const render = () => {
    const oldWorkspace = studioHost?.querySelector('.miracle-studio');
    if (!oldWorkspace) return;
    oldWorkspace.outerHTML = studioMarkup();
    saveState();
    bindDynamicAccessibility();
    window.requestAnimationFrame(() => {
      studioHost.querySelector('.miracle-studio__workspace')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  };

  const refreshSummary = () => {
    const summary = studioHost?.querySelector('.studio-summary__body');
    if (summary) summary.innerHTML = summaryMarkup();
    const exportArea = studioHost?.querySelector('#studio-export-text');
    if (exportArea) exportArea.value = buildExport();
    saveState();
  };

  const bindDynamicAccessibility = () => {
    studioHost?.querySelectorAll('.studio-term').forEach((button) => {
      button.title = DATA.glossary[button.dataset.term] || `Explicação de ${button.dataset.term}`;
    });
  };

  const goToStep = (step) => {
    state.step = Math.min(6, Math.max(1, Number(step) || 1));
    render();
  };

  const updateStateFromElement = (element) => {
    const key = element.dataset.state;
    if (!key) return;
    state[key] = element.value;

    if (key === 'deity') {
      state.domain = '';
      state.branch = '';
    }
    if (key === 'domain') state.branch = '';
    if (key === 'targetMode') {
      state.targetCount = '1';
      state.area = state.targetMode === 'area' ? '2' : '0';
    }
  };

  const copyText = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const area = document.createElement('textarea');
      area.value = text;
      area.setAttribute('readonly', '');
      area.style.position = 'fixed';
      area.style.opacity = '0';
      document.body.appendChild(area);
      area.select();
      document.execCommand('copy');
      area.remove();
    }
  };

  const domainPageMap = {
    Doenças: '../dominios/doencas.html', Parasitas: '../dominios/parasitas.html',
    Morte: '../dominios/morte.html', Trevas: '../dominios/trevas.html',
    Vida: '../dominios/vida.html', Luz: '../dominios/luz.html',
    Céu: '../dominios/ceu.html', Sol: '../dominios/sol.html',
    Sonhos: '../dominios/sonhos.html', Pesadelos: '../dominios/pesadelos.html'
  };

  const sanitizeRuleFragment = (fragment) => {
    fragment.querySelectorAll('script, style, nav, footer, .back-to-index, .system-inline-actions, .article-navigation').forEach((node) => node.remove());
    fragment.querySelectorAll('[id]').forEach((node) => node.removeAttribute('id'));
    fragment.querySelectorAll('a[href]').forEach((link) => {
      link.setAttribute('data-inline-rule-link', '');
      link.removeAttribute('target');
    });
    return fragment;
  };

  const openDrawer = async (path, anchor = '', title = 'Explicação') => {
    const drawer = studioHost.querySelector('.studio-drawer');
    const content = drawer.querySelector('[data-drawer-content]');
    const heading = drawer.querySelector('#studio-drawer-title');
    lastFocused = document.activeElement;
    heading.textContent = title;
    content.innerHTML = '<p class="studio-drawer__loading">Carregando a regra…</p>';
    drawer.hidden = false;
    drawer.setAttribute('aria-hidden', 'false');
    document.body.classList.add('studio-drawer-open');
    drawer.querySelector('[data-close-drawer]')?.focus();

    try {
      const url = new URL(path, window.location.href);
      if (anchor) url.hash = anchor;
      const response = await fetch(url.href);
      if (!response.ok) throw new Error(`Falha ${response.status}`);
      const html = await response.text();
      const doc = new DOMParser().parseFromString(html, 'text/html');
      const target = anchor ? doc.getElementById(anchor) : null;
      let source = target?.closest('section, details') || target || doc.querySelector('.domain-article, article');
      if (!source) throw new Error('Trecho não encontrado');

      const wrapper = document.createElement('div');
      const lead = doc.querySelector('.article-lead');
      if (lead && !source.contains(lead)) wrapper.appendChild(lead.cloneNode(true));
      wrapper.appendChild(source.cloneNode(true));
      sanitizeRuleFragment(wrapper);
      content.replaceChildren(...wrapper.childNodes);
    } catch (error) {
      content.innerHTML = `<div class="studio-drawer__error"><strong>Não foi possível abrir este trecho.</strong><p>${esc(error.message)}</p><a href="${esc(path)}">Abrir a página completa</a></div>`;
    }
  };

  const closeDrawer = () => {
    const drawer = studioHost.querySelector('.studio-drawer');
    drawer.hidden = true;
    drawer.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('studio-drawer-open');
    lastFocused?.focus?.();
  };

  const handleClick = (event) => {
    const target = event.target.closest('button, a');
    if (!target) return;

    if (target.matches('[data-next-step]')) goToStep(state.step + 1);
    if (target.matches('[data-prev-step]')) goToStep(state.step - 1);
    if (target.matches('[data-go-step]')) goToStep(target.dataset.goStep);

    if (target.matches('[data-rule-page]')) {
      openDrawer(target.dataset.rulePage, target.dataset.ruleAnchor || '', target.dataset.ruleTitle || 'Regra');
    }

    if (target.matches('[data-domain-rule]')) {
      const domain = target.dataset.domainRule;
      openDrawer(domainPageMap[domain], state.branch ? state.branch.toLocaleLowerCase('pt-BR').normalize('NFD').replace(/[\u0300-\u036f]/g, '') : '', `${domain} — ${state.branch || 'Domínio'}`);
    }

    if (target.matches('[data-term]')) {
      const term = target.dataset.term;
      const text = DATA.glossary[term] || 'Este termo ainda não possui uma definição resumida.';
      const drawer = studioHost.querySelector('.studio-drawer');
      drawer.querySelector('#studio-drawer-title').textContent = term;
      drawer.querySelector('[data-drawer-content]').innerHTML = `<div class="studio-term-card"><strong>Em palavras simples</strong><p>${esc(text)}</p></div>`;
      lastFocused = target;
      drawer.hidden = false;
      drawer.setAttribute('aria-hidden', 'false');
      document.body.classList.add('studio-drawer-open');
      drawer.querySelector('[data-close-drawer]')?.focus();
    }

    if (target.matches('[data-close-drawer]')) closeDrawer();

    if (target.matches('[data-open-manual]')) {
      manual.open = true;
      manual.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    if (target.matches('[data-copy-export]')) {
      copyText(buildExport()).then(() => {
        target.textContent = 'Ficha copiada';
        window.setTimeout(() => { target.textContent = 'Copiar ficha'; }, 1800);
      });
    }

    if (target.matches('[data-reset-studio]')) {
      const confirmed = window.confirm('Apagar este rascunho e começar uma nova ficha?');
      if (!confirmed) return;
      state = { ...defaults, functions: [] };
      saveState();
      render();
    }

    if (target.matches('a[data-inline-rule-link]')) {
      const url = new URL(target.href, window.location.href);
      if (url.origin === window.location.origin && url.pathname.includes('/sistemas/')) {
        event.preventDefault();
        openDrawer(url.pathname.split('/').pop(), url.hash.slice(1), target.textContent.trim());
      }
    }
  };

  const handleChange = (event) => {
    const element = event.target;

    if (element.matches('[data-function]')) {
      const id = element.dataset.function;
      state.functions = element.checked
        ? [...new Set([...state.functions, id])]
        : state.functions.filter((item) => item !== id);
      render();
      return;
    }

    if (element.matches('[data-state]')) {
      updateStateFromElement(element);
      render();
    }
  };

  const handleInput = (event) => {
    const element = event.target;
    if (!element.matches('[data-state]')) return;
    state[element.dataset.state] = element.value;
    refreshSummary();
  };

  const interceptManualLinks = (event) => {
    const link = event.target.closest('a[href]');
    if (!link) return;
    const url = new URL(link.href, window.location.href);
    if (url.origin !== window.location.origin || !url.pathname.includes('/sistemas/')) return;
    if (url.pathname.endsWith('index.html')) return;
    event.preventDefault();
    openDrawer(url.pathname.split('/').pop(), url.hash.slice(1), link.textContent.trim());
  };

  const start = () => {
    ensureStylesheet();
    document.body.classList.add('miracle-studio-page');
    if (!wrapExistingManual()) return;

    studioHost.addEventListener('click', handleClick);
    studioHost.addEventListener('change', handleChange);
    studioHost.addEventListener('input', handleInput);
    manual.addEventListener('click', interceptManualLinks);

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && document.body.classList.contains('studio-drawer-open')) closeDrawer();
    });

    bindDynamicAccessibility();
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, { once: true });
  else start();
})();
