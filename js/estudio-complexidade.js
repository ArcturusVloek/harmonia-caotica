(() => {
  'use strict';

  const DATA = window.HarmoniaMiracleStudioData;
  const GUIDE = window.HarmoniaDefinitiveStudioData;
  if (!DATA || !GUIDE || window.location.pathname.split('/').pop() !== 'construcao-guiada.html') return;

  const MAIN_KEY = 'harmonia-caotica:estudio-milagres:v1';
  const CREATION_KEY = 'harmonia-caotica:estudio-criacao:v2';
  const COMPLEX_KEY = 'harmonia-caotica:estudio-composicao:v1';
  const currentScript = document.currentScript;
  const scriptBase = currentScript?.src ? new URL('.', currentScript.src) : new URL('../js/', document.baseURI);
  let host;
  let scheduled = false;
  let syncing = false;

  const esc = (value = '') => String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');

  const readJson = (key, fallback) => {
    try {
      const value = JSON.parse(localStorage.getItem(key) || 'null');
      return value && typeof value === 'object' ? value : fallback;
    } catch { return fallback; }
  };

  const writeJson = (key, value) => {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* opcional */ }
  };

  const option = (value, label, cost, summary, excludes = '') => ({ value, label, cost, summary, excludes });
  const byValue = (options = [], value) => options.find((item) => String(item.value) === String(value));
  const costOf = (options, value) => Number(byValue(options, value)?.cost || 0);

  const architectures = [
    option('simple', 'Estrutura simples', 0, 'Uma ativação produz um resultado principal sem modos ou etapas adicionais.'),
    option('simultaneous', 'Funções simultâneas', 0, 'Vários componentes são produzidos juntos pela mesma ativação.', 'Cada função independente ainda compra seus próprios parâmetros.'),
    option('alternative', 'Modos alternativos', 0, 'Na ativação, o usuário escolhe qual modo registrado utilizar.', 'Um modo não pode usar gratuitamente os parâmetros exclusivos de outro.'),
    option('sequence', 'Etapas sequenciais', 0, 'Um componente prepara, transforma ou conduz ao componente seguinte.', 'Uma etapa posterior precisa de gatilho, oportunidade e custo válidos.'),
    option('conditional', 'Estrutura condicionada', 0, 'A ativação prepara componentes que aguardam condições objetivas.', 'Condições não reconhecem intenção ou identidade sem percepção apropriada.'),
    option('hybrid', 'Estrutura híbrida', 0, 'Combina modos, etapas, condições e funções simultâneas.', 'A relação entre todos os componentes precisa ser declarada.')
  ];

  const relations = [
    option('principal', 'Resultado principal', 0, 'É o efeito central da ativação.'),
    option('simultaneous', 'Ocorre simultaneamente', 0, 'É resolvido junto do resultado principal.'),
    option('alternative', 'Modo alternativo', 0, 'Substitui os demais modos naquela ativação.'),
    option('afterSuccess', 'Após o sucesso anterior', 0, 'Só ocorre quando outro componente obtém sucesso.'),
    option('afterFailure', 'Após a falha anterior', 0, 'Só ocorre quando outro componente falha.'),
    option('triggered', 'Aguarda um gatilho', 0, 'Permanece preparado até uma condição objetiva.'),
    option('ending', 'Efeito de encerramento', 0, 'Ocorre quando a manifestação termina, se houver capacidade e recurso registrados.')
  ];

  const parameterModes = [
    option('shared', 'Usa os parâmetros principais', 0, 'Compartilha Potência, Alcance, destinos e Duração já comprados.', 'Não recebe uma segunda aplicação completa dos mesmos recursos.'),
    option('own', 'Possui parâmetros próprios', 0, 'Compra Potência, Alcance, destinos e Duração independentes.'),
    option('qualitative', 'É apenas uma relação qualitativa', 0, 'Não utiliza Valor numérico próprio.', 'Use somente quando a regra não exige Potência ou quantidade.')
  ];

  const componentFunctions = [
    option('none', 'Sem custo funcional adicional', 0, 'O componente apenas organiza uma função já comprada em outro campo.'),
    ...GUIDE.creation.capabilityTypes,
    option('neutralization', 'Neutralização', 3, 'Impede uma aplicação ao vencer a oposição apropriada.'),
    option('suppression', 'Supressão adicional', 5, 'Mantém uma função ou manifestação temporariamente inoperante.'),
    option('dissipation', 'Dissipação adicional', 7, 'Encerra uma manifestação sobrenatural válida.'),
    option('redirection', 'Redirecionamento', 5, 'Muda o destino ou a trajetória de uma aplicação.'),
    option('reflection', 'Reflexão adicional', 7, 'Devolve a aplicação ao emissor ou origem válida.'),
    option('observation', 'Observação Remota', 5, 'Estabelece um ponto de percepção distante.'),
    option('falsification', 'Falsificação', 3, 'Apresenta informação incorreta a uma leitura.'),
    option('regeneration', 'Regeneração Estrutural', 5, 'Reconstrói uma estrutura perdida ou destruída.'),
    option('return', 'Retorno', 10, 'Devolve uma identidade a um receptáculo válido.'),
    option('custom', 'Outra função publicada', 0, 'Use o campo de custo específico para registrar uma função canônica ainda não listada.')
  ];

  const potencyModes = [
    option('main', 'Usa a Potência principal', 0, 'Compartilha o Valor principal do Milagre.'),
    option('own', 'Compra Potência própria', 0, 'Recebe outro Valor e paga o custo correspondente.'),
    option('none', 'Sem Potência numérica', 0, 'O componente não realiza comparação nem aplica Valor.')
  ];

  const rangeModes = [
    option('main', 'Usa o Alcance principal', 0, 'O componente alcança os mesmos destinos da ativação.'),
    option('own', 'Compra Alcance próprio', 0, 'O componente possui distância independente.'),
    option('internal', 'Atua dentro de vínculo ou alvo já estabelecido', 0, 'Não mede nova distância externa.', 'O vínculo precisa existir antes.')
  ];

  const targetModes = [
    option('main', 'Usa os destinos principais', 0, 'Compartilha os Alvos ou a Área da ativação.'),
    option('one', 'Um alvo próprio', 0, 'Escolhe um destino para este componente.'),
    option('shared', 'Alvos Compartilhados próprios', 0, 'Divide os recursos entre vários destinos.'),
    option('complete', 'Alvos Completos próprios', 0, 'Entrega o perfil integral a cada destino.'),
    option('area', 'Área própria', 0, 'Afeta todos os destinos válidos na região.')
  ];

  const durationModes = [
    option('main', 'Usa a Duração principal', 0, 'Permanece pelo mesmo intervalo do Milagre.'),
    ...DATA.core.duration.map((item) => ({ ...item, summary: GUIDE.optionGuides.duration[item.value]?.summary || '' }))
  ];

  const propagationForms = [
    option('transfer', 'Transferência', 0, 'A manifestação abandona uma Fonte e continua em outro Destino sem aumentar a quantidade.', 'Conserva estado, Duração restante, Resistência e recursos consumidos.'),
    option('reproduction', 'Reprodução', 0, 'A Fonte permanece e uma nova manifestação é produzida.', 'A nova instância usa recursos compartilhados ou perfil completo conforme os Passos.'),
    option('growth', 'Crescimento', 0, 'A mesma manifestação amplia gradualmente o espaço que ocupa.', 'Não cria uma unidade separada e não supera a Área ou Escala comprada.')
  ];

  const propagationModels = [
    option('shared', 'Passos Compartilhados', 0, 'Mudanças posteriores dividem valores, Reservas ou outro total.'),
    option('complete', 'Passos Completos', 0, 'Cada nova instância recebe o perfil integral comprado.')
  ];

  const sharedSteps = [
    option('0', 'Sem Passos', 0, 'A manifestação não alcança novos destinos depois da ativação.'),
    option('1', '1 Passo', 1, 'Permite uma mudança posterior.'),
    option('2', 'Até 2 Passos', 2, 'Permite até duas mudanças posteriores.'),
    option('3', 'Até 3 Passos', 3, 'Permite até três mudanças posteriores.'),
    option('5', 'Até 5 Passos', 5, 'Permite até cinco mudanças posteriores.'),
    option('10', 'Até 10 Passos', 7, 'Permite até dez mudanças posteriores.'),
    option('20', 'Até 20 Passos', 10, 'Permite até vinte mudanças posteriores.'),
    option('50', 'Até 50 Passos', 14, 'Permite até cinquenta mudanças posteriores.')
  ];

  const completeSteps = [
    option('0', 'Sem Passos', 0, 'A manifestação não produz novos perfis completos.'),
    option('1', '1 Passo completo', 3, 'Produz uma instância integral posterior.'),
    option('2', 'Até 2 Passos completos', 6, 'Produz até duas instâncias integrais posteriores.'),
    option('3', 'Até 3 Passos completos', 10, 'Produz até três instâncias integrais posteriores.'),
    option('5', 'Até 5 Passos completos', 15, 'Produz até cinco instâncias integrais posteriores.'),
    option('10', 'Até 10 Passos completos', 21, 'Produz até dez instâncias integrais posteriores.'),
    option('20', 'Até 20 Passos completos', 28, 'Produz até vinte instâncias integrais posteriores.')
  ];

  const propagationRange = [
    option('contact', 'Contato ou adjacência', 0, 'A Fonte precisa tocar diretamente o novo Destino.'),
    option('5', '5 metros', 1, 'O novo Destino pode estar a até 5 metros da Fonte.'),
    option('15', '15 metros', 2, 'O novo Destino pode estar a até 15 metros da Fonte.'),
    option('30', '30 metros', 3, 'O novo Destino pode estar a até 30 metros da Fonte.'),
    option('100', '100 metros', 5, 'O novo Destino pode estar a até 100 metros da Fonte.'),
    option('500', '500 metros', 7, 'O novo Destino pode estar a até 500 metros da Fonte.'),
    option('5000', '5 quilômetros', 10, 'O novo Destino pode estar a até 5 quilômetros da Fonte.'),
    option('50000', '50 quilômetros', 14, 'O novo Destino pode estar a até 50 quilômetros da Fonte.')
  ];

  const propagationActing = [
    option('commandedAction', 'Ação comandada', 0, 'O usuário gasta a Ação para realizar normalmente um Passo.'),
    option('commandedReaction', 'Reação comandada', 0, 'O usuário gasta a Reação diante de um gatilho válido.'),
    option('conditioned', 'Atuação Condicionada', 0, 'O Passo ocorre quando uma condição objetiva é cumprida.'),
    option('own', 'Ação Própria de Criação', 8, 'Uma Criação usa a oportunidade compartilhada para propagar.'),
    option('continuous', 'Atuação Contínua', 0, 'Uma ocorrência objetiva consome normalmente um Passo.')
  ];

  const defaults = () => ({
    architecture: 'simple',
    relationship: '',
    sharedResources: 'Todos os componentes compartilham os recursos principais, salvo quando possuem compra própria.',
    switchRule: '',
    manualCost: '0',
    manualCostReason: '',
    components: [],
    propagation: {
      enabled: false,
      form: 'transfer',
      model: 'shared',
      steps: '1',
      range: 'contact',
      source: '',
      destination: '',
      path: '',
      acting: 'commandedAction',
      trigger: '',
      simultaneousTargets: '',
      quantityLimit: '',
      resourceRule: 'As manifestações compartilham o mesmo total, salvo perfil completo comprado.',
      endRule: '',
      noCascade: true
    }
  });

  let state = (() => {
    const base = defaults();
    const saved = readJson(COMPLEX_KEY, null);
    if (!saved) return base;
    return {
      ...base,
      ...saved,
      components: Array.isArray(saved.components) ? saved.components : [],
      propagation: { ...base.propagation, ...(saved.propagation || {}) }
    };
  })();

  const ensureStylesheet = () => {
    if (document.getElementById('miracle-studio-complex-style')) return;
    const link = document.createElement('link');
    link.id = 'miracle-studio-complex-style';
    link.rel = 'stylesheet';
    link.href = new URL('../css/estudio-complexidade.css?v=20260720e', scriptBase).href;
    document.head.appendChild(link);
  };

  const guide = (item) => `<aside class="complex-guide"><p>${esc(item?.summary || '')}</p>${item?.excludes ? `<small><b>Não concede:</b> ${esc(item.excludes)}</small>` : ''}</aside>`;

  const select = (path, label, options, value) => {
    const selected = byValue(options, value) || options[0];
    return `<label class="complex-field"><span>${esc(label)}</span><select data-complex-path="${esc(path)}">${options.map((item) => `<option value="${esc(item.value)}" ${String(item.value) === String(value) ? 'selected' : ''}>${esc(item.label)}${item.cost ? ` · ${item.cost} pt${item.cost === 1 ? '' : 's'}` : ''}</option>`).join('')}</select>${guide(selected)}</label>`;
  };

  const input = (path, label, value, placeholder = '', type = 'text') => `<label class="complex-field"><span>${esc(label)}</span><input data-complex-path="${esc(path)}" type="${esc(type)}" value="${esc(value)}" placeholder="${esc(placeholder)}"></label>`;
  const textarea = (path, label, value, placeholder = '', rows = 3) => `<label class="complex-field complex-field--wide"><span>${esc(label)}</span><textarea data-complex-path="${esc(path)}" rows="${rows}" placeholder="${esc(placeholder)}">${esc(value)}</textarea></label>`;

  const targetOptionsFor = (component) => component.targetMode === 'shared' ? DATA.core.sharedTargets : DATA.core.completeTargets;

  const componentCost = (component) => {
    let total = costOf(componentFunctions, component.functionType);
    if (component.potencyMode === 'own') total += costOf(DATA.core.potency, component.potency);
    if (component.rangeMode === 'own') total += costOf(DATA.core.range, component.range);
    if (component.targetMode === 'shared') total += costOf(DATA.core.sharedTargets, component.targetCount);
    if (component.targetMode === 'complete') total += costOf(DATA.core.completeTargets, component.targetCount);
    if (component.targetMode === 'area') total += costOf(DATA.core.area, component.area);
    if (component.durationMode !== 'main') total += costOf(DATA.core.duration, component.durationMode);
    total += Math.max(0, Number(component.specificCost || 0));
    return total;
  };

  const propagationCost = () => {
    if (!state.propagation.enabled) return 0;
    const steps = state.propagation.model === 'complete' ? completeSteps : sharedSteps;
    let total = costOf(steps, state.propagation.steps);
    total += costOf(propagationRange, state.propagation.range);
    if (state.propagation.acting === 'own') total += 8;
    return total;
  };

  const complexCost = () => state.components.reduce((sum, component) => sum + componentCost(component), 0)
    + propagationCost()
    + Math.max(0, Number(state.manualCost || 0));

  const creationCost = () => {
    const creation = readJson(CREATION_KEY, null);
    if (!creation) return 0;
    const multiplicity = creation.multiplicity === 'fragmented'
      ? costOf(GUIDE.creation.fragments, creation.quantity)
      : creation.multiplicity === 'complete'
        ? costOf(GUIDE.creation.complete, creation.quantity)
        : 0;
    const body = creation.bodyModel === 'distributed'
      ? costOf(GUIDE.creation.bodyArea, creation.bodyArea)
      : costOf(GUIDE.creation.scale, creation.scale);
    let total = multiplicity + body + costOf(GUIDE.creation.mobility, creation.mobility);
    if (creation.mobility === 'own') total += costOf(GUIDE.creation.movement, creation.movement);
    total += costOf(GUIDE.creation.transport, creation.transport);
    total += costOf(GUIDE.creation.communication, creation.communication);
    total += costOf(GUIDE.creation.linkedOrigin, creation.linkedOrigin);
    if (creation.linkedOrigin === 'linked') total += costOf(GUIDE.creation.origins, creation.origins);
    for (const ability of creation.abilities || []) {
      total += costOf(GUIDE.creation.capabilityTypes, ability.type);
      if (ability.potencyMode === 'own') total += costOf(DATA.core.potency, ability.potency);
      total += costOf(GUIDE.creation.abilityRange, ability.range);
      if (ability.targetMode === 'shared') total += costOf(DATA.core.sharedTargets, ability.targetCount);
      if (ability.targetMode === 'complete') total += costOf(DATA.core.completeTargets, ability.targetCount);
      if (ability.targetMode === 'area') total += costOf(DATA.core.area, ability.area === '0' ? '2' : ability.area);
      total += costOf(DATA.core.duration, ability.duration);
      total += Math.max(0, Number(ability.specificCost || 0));
    }
    return total;
  };

  const totalExtra = () => creationCost() + complexCost();

  const componentMarkup = (component, index) => `<article class="complex-component" data-component-id="${esc(component.id)}"><header><div><span>Componente ${index + 1}</span><h4>${esc(component.name || 'Componente sem nome')}</h4></div><button type="button" data-remove-component="${esc(component.id)}">Remover</button></header><div class="complex-grid complex-grid--three">
    ${input(`components.${index}.name`, 'Nome do componente', component.name, 'Ex.: Ordem de Proteção')}
    ${select(`components.${index}.relation`, 'Relação com o poder', relations, component.relation)}
    ${select(`components.${index}.functionType`, 'Função ou compra', componentFunctions, component.functionType)}
    ${select(`components.${index}.parameterMode`, 'Relação dos parâmetros', parameterModes, component.parameterMode)}
    ${select(`components.${index}.potencyMode`, 'Potência', potencyModes, component.potencyMode)}
    ${component.potencyMode === 'own' ? select(`components.${index}.potency`, 'Potência própria', DATA.core.potency.map((item) => ({ ...item, summary: GUIDE.optionGuides.potency[item.value]?.summary || '' })), component.potency) : ''}
    ${select(`components.${index}.rangeMode`, 'Alcance', rangeModes, component.rangeMode)}
    ${component.rangeMode === 'own' ? select(`components.${index}.range`, 'Alcance próprio', DATA.core.range.map((item) => ({ ...item, summary: GUIDE.optionGuides.range[item.value]?.summary || '' })), component.range) : ''}
    ${select(`components.${index}.targetMode`, 'Destinos', targetModes, component.targetMode)}
    ${component.targetMode === 'shared' || component.targetMode === 'complete' ? select(`components.${index}.targetCount`, 'Quantidade de destinos', targetOptionsFor(component), component.targetCount) : ''}
    ${component.targetMode === 'area' ? select(`components.${index}.area`, 'Área própria', DATA.core.area.filter((item) => item.value !== '0').map((item) => ({ ...item, summary: GUIDE.optionGuides.area[item.value]?.summary || '' })), component.area === '0' ? '2' : component.area) : ''}
    ${select(`components.${index}.durationMode`, 'Duração', durationModes, component.durationMode)}
    ${input(`components.${index}.specificCost`, 'Custo específico adicional', component.specificCost, '0', 'number')}
    ${input(`components.${index}.trigger`, 'Gatilho ou transição', component.trigger, 'Ex.: quando o alvo sofrer dano')}
    ${input(`components.${index}.uses`, 'Usos, Reserva ou consumo', component.uses, 'Ex.: consome 1 Uso')}
    ${textarea(`components.${index}.effect`, 'Efeito, oposição, sucesso e falha', component.effect, 'Descreva a resolução completa deste componente.', 4)}
  </div><footer><strong>Custo independente: ${componentCost(component)} pontos</strong><p>Parâmetros principais compartilhados não são cobrados novamente. Compras próprias são somadas automaticamente.</p></footer></article>`;

  const propagationMarkup = () => {
    const steps = state.propagation.model === 'complete' ? completeSteps : sharedSteps;
    return `<section class="complex-propagation"><header><div><span>Bloco especializado</span><h4>Propagação</h4><p>Use quando a manifestação alcança um novo alvo, unidade ou espaço depois da ativação inicial.</p></div><label><input type="checkbox" data-propagation-toggle ${state.propagation.enabled ? 'checked' : ''}><span>${state.propagation.enabled ? 'Ativa' : 'Desativada'}</span></label></header>${state.propagation.enabled ? `<div class="complex-grid complex-grid--three">
      ${select('propagation.form', 'Forma de Propagação', propagationForms, state.propagation.form)}
      ${select('propagation.model', 'Modelo dos Passos', propagationModels, state.propagation.model)}
      ${select('propagation.steps', 'Passos disponíveis', steps, state.propagation.steps)}
      ${select('propagation.range', 'Alcance entre Fonte e Destino', propagationRange, state.propagation.range)}
      ${select('propagation.acting', 'Como um Passo é utilizado', propagationActing, state.propagation.acting)}
      ${input('propagation.source', 'Fontes válidas', state.propagation.source, 'Ex.: hospedeiro infectado ou foco existente')}
      ${input('propagation.destination', 'Destinos válidos', state.propagation.destination, 'Ex.: criatura viva tocada pela Fonte')}
      ${input('propagation.path', 'Caminho necessário', state.propagation.path, 'Ex.: sangue, ar, raiz ou sombra contínua')}
      ${input('propagation.trigger', 'Gatilho ou comando', state.propagation.trigger, 'Ex.: contato físico durante uma Ação')}
      ${input('propagation.simultaneousTargets', 'Vários destinos na mesma oportunidade', state.propagation.simultaneousTargets, 'Ex.: usa Alvos Completos ou Área')}
      ${input('propagation.quantityLimit', 'Quantidade simultânea máxima', state.propagation.quantityLimit, 'Ex.: até 3 focos ativos')}
      ${textarea('propagation.resourceRule', 'Como valores e recursos são compartilhados', state.propagation.resourceRule, 'Potência, Resistência, Reserva, Usos e Duração.', 3)}
      ${textarea('propagation.endRule', 'Encerramento da rede', state.propagation.endRule, 'Quando as manifestações produzidas terminam?', 3)}
    </div><aside class="complex-rule"><strong>Sem cascata imediata</strong><p>Uma manifestação recém-propagada não pode tornar-se Fonte de outro Passo na mesma oportunidade. Cada elo precisa de um Passo e de uma oportunidade posterior.</p></aside><footer><strong>Custo da Propagação: ${propagationCost()} pontos</strong></footer>` : ''}</section>`;
  };

  const panelMarkup = () => `<section class="complex-builder" aria-labelledby="complex-builder-title"><header class="complex-builder__header"><div><span>Composição definitiva</span><h3 id="complex-builder-title">Arquitetura do Poder</h3><p>Use este bloco para modos alternativos, funções simultâneas, sequências, gatilhos, Propagação e componentes com parâmetros independentes.</p></div><strong>${complexCost()} pontos próprios</strong></header><div class="complex-builder__body"><div class="complex-grid complex-grid--three">
    ${select('architecture', 'Estrutura geral', architectures, state.architecture)}
    ${input('relationship', 'Relação entre os componentes', state.relationship, 'Ex.: escolha um modo ao ativar')}
    ${input('switchRule', 'Troca, sequência ou transição', state.switchRule, 'Ex.: para inverter, encerre e ative novamente')}
    ${textarea('sharedResources', 'Recursos compartilhados', state.sharedResources, 'O que é compartilhado entre modos e etapas?', 3)}
  </div>
  ${state.architecture !== 'simple' || state.components.length ? `<section class="complex-components"><header><div><span>Partes do Milagre</span><h4>Componentes</h4></div><button type="button" data-add-component>Adicionar componente</button></header><div>${state.components.map(componentMarkup).join('') || '<p class="complex-empty">Adicione o primeiro componente para registrar seus parâmetros e sua relação com o poder.</p>'}</div></section>` : '<aside class="complex-rule"><strong>Poder simples</strong><p>Nenhum componente adicional é necessário. Os módulos normais acima continuam sendo suficientes.</p></aside>'}
  ${propagationMarkup()}
  <section class="complex-manual-cost"><div class="complex-grid">${input('manualCostReason', 'Outra compra publicada', state.manualCostReason, 'Ex.: capacidade específica ainda não catalogada')}${input('manualCost', 'Custo dessa compra', state.manualCost, '0', 'number')}</div><p>Este campo existe apenas para uma compra com custo definido nas regras. Não deve ser usado para ajustar equilíbrio por impressão.</p></section>
  </div><footer class="complex-total"><div><span>Composição avançada</span><strong>${complexCost()} pts</strong></div><div><span>Projeto da Criação</span><strong>${creationCost()} pts</strong></div><div><span>Total incorporado como compras adicionais</span><strong>${totalExtra()} pts</strong></div></footer></section>`;

  const setPath = (object, path, value) => {
    const parts = path.split('.');
    let cursor = object;
    for (let index = 0; index < parts.length - 1; index += 1) cursor = cursor[/^\d+$/.test(parts[index]) ? Number(parts[index]) : parts[index]];
    const last = parts.at(-1);
    cursor[/^\d+$/.test(last) ? Number(last) : last] = value;
  };

  const save = () => writeJson(COMPLEX_KEY, state);

  const syncMain = () => {
    if (syncing || !host) return;
    syncing = true;
    const label = host.querySelector('[data-state="extraCostLabel"]');
    const cost = host.querySelector('[data-state="extraCost"]');
    if (label && label.value !== 'Estruturas, componentes e compras avançadas') {
      label.value = 'Estruturas, componentes e compras avançadas';
      label.dispatchEvent(new Event('input', { bubbles: true }));
    }
    const next = String(totalExtra());
    if (cost && cost.value !== next) {
      cost.value = next;
      cost.dispatchEvent(new Event('input', { bubbles: true }));
    }
    syncing = false;
  };

  const decorate = () => {
    scheduled = false;
    if (!host) return;
    const resolution = [...host.querySelectorAll('.studio-module')].find((item) => item.querySelector('h3')?.textContent.trim() === 'Resolução e limites');
    if (!resolution) {
      enrichExport();
      return;
    }
    if (!resolution.previousElementSibling?.classList.contains('complex-builder')) resolution.insertAdjacentHTML('beforebegin', panelMarkup());
    bindPanel();
    syncMain();
    enrichExport();
  };

  const rerenderPanel = (panel) => {
    panel.outerHTML = panelMarkup();
    bindPanel();
    syncMain();
  };

  const handleInput = (event) => {
    const control = event.target.closest('[data-complex-path]');
    if (!control) return;
    setPath(state, control.dataset.complexPath, control.value);
    save();
    syncMain();
    enrichExport();
  };

  const handleChange = (event) => {
    if (event.target.matches('[data-propagation-toggle]')) {
      state.propagation.enabled = event.target.checked;
      save();
      rerenderPanel(event.target.closest('.complex-builder'));
      return;
    }
    const control = event.target.closest('[data-complex-path]');
    if (!control) return;
    setPath(state, control.dataset.complexPath, control.value);
    if (control.dataset.complexPath === 'propagation.model') state.propagation.steps = '1';
    if (control.dataset.complexPath.endsWith('.targetMode')) {
      const index = Number(control.dataset.complexPath.split('.')[1]);
      state.components[index].targetCount = '1';
      state.components[index].area = control.value === 'area' ? '2' : '0';
    }
    save();
    rerenderPanel(control.closest('.complex-builder'));
  };

  const newComponent = () => ({
    id: `component-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    name: `Componente ${state.components.length + 1}`,
    relation: state.components.length ? 'simultaneous' : 'principal',
    functionType: 'none',
    parameterMode: 'shared',
    potencyMode: 'main',
    potency: '3',
    rangeMode: 'main',
    range: 'Pessoal ou Contato',
    targetMode: 'main',
    targetCount: '1',
    area: '0',
    durationMode: 'main',
    specificCost: '0',
    trigger: '',
    uses: '',
    effect: ''
  });

  const handleClick = (event) => {
    if (event.target.closest('[data-add-component]')) {
      state.components.push(newComponent());
      if (state.architecture === 'simple') state.architecture = 'simultaneous';
      save();
      rerenderPanel(event.target.closest('.complex-builder'));
      return;
    }
    const remove = event.target.closest('[data-remove-component]');
    if (remove) {
      state.components = state.components.filter((component) => component.id !== remove.dataset.removeComponent);
      save();
      rerenderPanel(remove.closest('.complex-builder'));
    }
  };

  const bindPanel = () => {
    const panel = host.querySelector('.complex-builder');
    if (!panel || panel.dataset.bound === 'true') return;
    panel.dataset.bound = 'true';
    panel.addEventListener('input', handleInput);
    panel.addEventListener('change', handleChange);
    panel.addEventListener('click', handleClick);
  };

  const propagationExport = () => {
    if (!state.propagation.enabled) return '';
    const steps = state.propagation.model === 'complete' ? completeSteps : sharedSteps;
    return `PROPAGAÇÃO\nForma: ${byValue(propagationForms, state.propagation.form)?.label}\nModelo: ${byValue(propagationModels, state.propagation.model)?.label}\nPassos: ${byValue(steps, state.propagation.steps)?.label}\nAlcance entre Fonte e Destino: ${byValue(propagationRange, state.propagation.range)?.label}\nAtuação: ${byValue(propagationActing, state.propagation.acting)?.label}\nFontes válidas: ${state.propagation.source || 'Não definidas'}\nDestinos válidos: ${state.propagation.destination || 'Não definidos'}\nCaminho: ${state.propagation.path || 'Não definido'}\nGatilho ou comando: ${state.propagation.trigger || 'Não definido'}\nVários destinos: ${state.propagation.simultaneousTargets || 'Não definidos'}\nQuantidade simultânea: ${state.propagation.quantityLimit || 'Não definida'}\nRecursos: ${state.propagation.resourceRule}\nEncerramento: ${state.propagation.endRule || 'Conforme a Duração e a rede'}\nSem cascata imediata: Sim\nCusto: ${propagationCost()} pontos`;
  };

  const compositionExport = () => {
    if (state.architecture === 'simple' && !state.components.length && !state.propagation.enabled && !Number(state.manualCost || 0)) return '';
    const components = state.components.map((component, index) => `${index + 1}. ${component.name}\nRelação: ${byValue(relations, component.relation)?.label}\nFunção: ${byValue(componentFunctions, component.functionType)?.label}\nParâmetros: ${byValue(parameterModes, component.parameterMode)?.label}\nPotência: ${component.potencyMode === 'own' ? byValue(DATA.core.potency, component.potency)?.label : byValue(potencyModes, component.potencyMode)?.label}\nAlcance: ${component.rangeMode === 'own' ? component.range : byValue(rangeModes, component.rangeMode)?.label}\nDestinos: ${byValue(targetModes, component.targetMode)?.label}\nDuração: ${component.durationMode === 'main' ? 'Duração principal' : component.durationMode}\nGatilho: ${component.trigger || 'Nenhum'}\nUsos ou consumo: ${component.uses || 'Compartilha os recursos principais'}\nEfeito: ${component.effect || 'Não descrito'}\nCusto independente: ${componentCost(component)} pontos`).join('\n\n');
    return `ARQUITETURA DO PODER\nEstrutura: ${byValue(architectures, state.architecture)?.label}\nRelação geral: ${state.relationship || 'Não definida'}\nTransição: ${state.switchRule || 'Não definida'}\nRecursos compartilhados: ${state.sharedResources}\n\nCOMPONENTES\n\n${components || 'Nenhum componente independente.'}${state.propagation.enabled ? `\n\n${propagationExport()}` : ''}${Number(state.manualCost || 0) ? `\n\nOutra compra: ${state.manualCostReason || 'Não identificada'} — ${state.manualCost} pontos` : ''}\n\nCUSTO DA COMPOSIÇÃO: ${complexCost()} PONTOS`;
  };

  const enrichExport = () => {
    const area = host?.querySelector('#studio-export-text');
    const section = compositionExport();
    if (!area || !section || area.value.includes('ARQUITETURA DO PODER')) return;
    const marker = '\nDESCRIÇÃO\n';
    const index = area.value.indexOf(marker);
    area.value = index >= 0 ? `${area.value.slice(0, index)}\n\n${section}\n${area.value.slice(index)}` : `${area.value}\n\n${section}`;
  };

  const schedule = () => {
    if (scheduled) return;
    scheduled = true;
    window.requestAnimationFrame(decorate);
  };

  const start = () => {
    ensureStylesheet();
    host = document.querySelector('.miracle-studio-host');
    if (!host) {
      window.setTimeout(start, 100);
      return;
    }
    new MutationObserver(schedule).observe(host, { childList: true, subtree: true });
    host.addEventListener('input', () => window.setTimeout(schedule, 0));
    host.addEventListener('change', () => window.setTimeout(schedule, 0));
    schedule();
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, { once: true });
  else start();
})();
