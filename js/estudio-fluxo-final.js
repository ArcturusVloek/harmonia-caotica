(() => {
  'use strict';

  const DATA = window.HarmoniaMiracleStudioData;
  const page = window.location.pathname.split('/').filter(Boolean).pop();
  if (!DATA || page !== 'construcao-guiada.html') return;

  const MAIN_KEY = 'harmonia-caotica:estudio-milagres:v1';
  const DETAIL_KEY = 'harmonia-caotica:estudio-redacao-enxuta:v1';
  const CREATION_KEY = 'harmonia-caotica:estudio-criacao:v2';
  const COMPLEX_KEY = 'harmonia-caotica:estudio-composicao:v1';
  let host;
  let frame = 0;
  let replacing = false;

  const esc = (value = '') => String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');

  const readJson = (key, fallback = {}) => {
    try {
      const value = JSON.parse(localStorage.getItem(key) || 'null');
      return value && typeof value === 'object' ? value : fallback;
    } catch {
      return fallback;
    }
  };

  const writeJson = (key, value) => {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* opcional */ }
  };

  const state = () => readJson(MAIN_KEY, {});
  const detail = () => {
    const value = readJson(DETAIL_KEY, { answers: {}, whatsappMode: 'complete' });
    if (!value.answers || typeof value.answers !== 'object') value.answers = {};
    return value;
  };

  const find = (options = [], value) => options.find((item) => String(item.value) === String(value));
  const sentence = (value = '') => {
    const clean = String(value).trim();
    if (!clean) return '';
    return /[.!?…]$/.test(clean) ? clean : `${clean}.`;
  };

  const targetLabel = (current) => {
    if (current.targetMode === 'shared') {
      return `${find(DATA.core.sharedTargets, current.targetCount)?.label || current.targetCount} Alvos Compartilhados`;
    }
    if (current.targetMode === 'complete') {
      return `${find(DATA.core.completeTargets, current.targetCount)?.label || current.targetCount} Alvos Completos`;
    }
    if (current.targetMode === 'area') {
      return `uma Área de ${find(DATA.core.area, current.area)?.label || 'tamanho não definido'}`;
    }
    return 'um alvo';
  };

  const potencyLabel = (current) => find(DATA.core.potency, current.potency)?.label || 'Potência não definida';

  const selectedFunctionNames = (current) => (current.functions || [])
    .map((id) => DATA.functions.find((item) => item.id === id)?.name || id);

  const creationSummary = () => {
    const creation = readJson(CREATION_KEY, null);
    if (!creation) return '';
    const parts = [];
    const form = creation.form || 'A Criação';
    const body = creation.bodyModel === 'distributed'
      ? `ocupa uma Área corporal de ${creation.bodyArea || 'tamanho não definido'} metros`
      : `possui Escala ${creation.scale || 'Comum'}`;
    parts.push(`${form} ${body}`);
    if (creation.activeLimit) parts.push(`Limite ativo: ${creation.activeLimit}`);
    if (creation.mobility === 'own') parts.push(`Movimento próprio de ${creation.movement || 0} metros`);
    if (creation.mobility === 'follows' && creation.follows) parts.push(`acompanha ${creation.follows}`);
    const abilities = (creation.abilities || []).map((ability) => ability.name).filter(Boolean);
    if (abilities.length) parts.push(`capacidades: ${abilities.join(', ')}`);
    return sentence(parts.join('. '));
  };

  const propagationSummary = () => {
    const complex = readJson(COMPLEX_KEY, {});
    const propagation = complex.propagation;
    if (!propagation?.enabled) return '';
    const form = {
      transfer: 'Transferência',
      reproduction: 'Reprodução',
      growth: 'Crescimento'
    }[propagation.form] || propagation.form || 'Propagação';
    const model = propagation.model === 'complete' ? 'Passos Completos' : 'Passos Compartilhados';
    const source = propagation.source || 'uma Fonte válida';
    const destination = propagation.destination || 'um Destino válido';
    return sentence(`${form} utiliza ${propagation.steps || 1} ${model}, partindo de ${source} e alcançando ${destination}`);
  };

  const functionSentences = (current) => {
    const parts = [];
    const has = (id) => (current.functions || []).includes(id);

    if (has('control')) {
      const authority = current.controlAuthority || 'Autoridade não definida';
      const way = current.controlWay || 'Via não definida';
      const order = current.controlOrder ? ` A instrução registrada é “${current.controlOrder}”.` : '';
      const uses = current.controlUses ? ` Possui ${current.controlUses} Uso${String(current.controlUses) === '1' ? '' : 's'} para novas decisões controladas.` : '';
      parts.push(`Controle: atua por ${authority}, através da Via ${way}.${order}${uses}`);
    }

    if (has('damage')) parts.push(`Dano: ${current.damageFunction || 'Dano Direto'} utiliza ${potencyLabel(current)}.`);
    if (has('healing')) parts.push(`Restauração: ${current.healingFunction || 'Cura'} utiliza ${potencyLabel(current)}.`);
    if (has('protection')) parts.push(`Proteção: aplica ${current.protectionFunction || 'Proteção Sobrenatural'} com ${potencyLabel(current)}.`);
    if (has('information')) parts.push(`Informação: utiliza ${current.informationFunction || 'Percepção Sobrenatural'} com profundidade ${current.informationDepth || 'Presença'}.`);
    if (has('resources')) parts.push(`Recursos: utiliza ${current.resourceFunction || 'Transferência de Recurso'} com o Valor definido pela construção.`);
    if (has('traversal')) parts.push(`Travessia: utiliza ${current.traversalType || 'tipo ainda não definido'} entre a origem e o destino registrados.`);
    if (has('transformation')) parts.push(`Transformação: altera o alvo em extensão ${current.transformationScope || 'Superficial'}; capacidades novas dependem das funções compradas.`);
    if (has('space')) parts.push('Espaço: o Movimento ou Deslocamento utiliza somente as distâncias e oportunidades compradas.');
    if (has('combat') && current.combatProfile && current.combatProfile !== 'Nenhum') parts.push(`Combate: utiliza ${current.combatProfile}.`);
    if (has('costs') && current.costFunction && current.costFunction !== 'Nenhuma') parts.push(`Custo especial: utiliza ${current.costFunction}.`);
    if (has('creation')) {
      const summary = creationSummary();
      parts.push(summary ? `Criação: ${summary}` : 'Criação: corpo, quantidade, vínculos e capacidades são definidos no Projeto da Criação.');
    }
    if (has('propagation')) {
      const summary = propagationSummary();
      parts.push(summary ? `Propagação: ${summary}` : 'Propagação: Fonte, Destino, Passos e recursos são definidos no bloco de Propagação.');
    }

    return parts;
  };

  const generatedEffect = () => {
    const current = state();
    const savedDetail = detail();
    const paragraphs = [];
    const idea = sentence(current.idea);
    if (idea) paragraphs.push(idea);

    const activation = `O usuário ativa o Milagre como ${current.activation || 'Ação'}, alcançando ${current.range || 'Pessoal ou Contato'} e afetando ${targetLabel(current)}.`;
    paragraphs.push(activation);

    if (current.potency) paragraphs.push(`A intensidade numérica principal é ${potencyLabel(current)}.`);
    if (current.duration && current.duration !== 'Instantânea') {
      paragraphs.push(`A manifestação permanece por Duração ${current.duration}. Novas ativações seguem Cadência ${current.cadence || 'Comum'}.`);
    } else {
      paragraphs.push(`A resolução é Instantânea. Novas ativações seguem Cadência ${current.cadence || 'Comum'}.`);
    }

    functionSentences(current).forEach((text) => paragraphs.push(sentence(text)));

    const exception = sentence(savedDetail.answers?.exception);
    if (exception) paragraphs.push(`Detalhe excepcional: ${exception}`);

    return paragraphs.filter(Boolean).join('\n\n');
  };

  const structuredChecks = () => {
    const current = state();
    const creation = readJson(CREATION_KEY, null);
    const complex = readJson(COMPLEX_KEY, {});
    const checks = [
      { ok: Boolean(current.name?.trim()), label: 'Nome definido' },
      { ok: Boolean(current.idea?.trim()), label: 'Resultado central descrito na etapa Ideia' },
      { ok: Boolean(current.deity && current.domain && current.branch), label: 'Divindade, Domínio e Vertente definidos' },
      { ok: Boolean(current.functions?.length), label: 'Funções mecânicas selecionadas' },
      { ok: Boolean(current.potency), label: 'Potência definida' },
      { ok: current.targetMode !== 'area' || current.area !== '0', label: 'Destino ou Área definidos' }
    ];

    if (current.functions?.includes('control')) {
      checks.push({ ok: Boolean(current.controlAuthority && current.controlWay && current.controlOrder?.trim()), label: 'Controle possui Autoridade, Via e instrução' });
    }
    if (current.functions?.includes('creation')) {
      checks.push({ ok: Boolean(creation?.form && creation?.activeLimit && creation?.abilities?.length), label: 'Projeto da Criação possui forma, limite ativo e capacidade' });
    }
    if (current.functions?.includes('propagation')) {
      checks.push({ ok: Boolean(complex.propagation?.enabled && complex.propagation?.source && complex.propagation?.destination), label: 'Propagação possui Fonte, Destino e Passos' });
    }

    return checks;
  };

  const workshopMarkup = () => {
    const savedDetail = detail();
    const checks = structuredChecks();
    const missing = checks.filter((item) => !item.ok).length;
    return `<section class="writing-workshop writing-workshop--lean final-function-workshop" data-final-workshop aria-labelledby="final-function-title">
      <header class="final-function-workshop__header">
        <span>Funcionamento automático</span>
        <h3 id="final-function-title">O Estúdio monta o texto a partir das escolhas</h3>
        <p>Não repita Potência, Alcance, Duração, Controle, Criação ou Propagação em vários campos. Complete os módulos estruturados e use esta área apenas para apresentação e exceções reais.</p>
      </header>
      <div class="final-function-workshop__body">
        <div>
          <strong class="final-workshop-status">${missing ? `${missing} dado${missing === 1 ? '' : 's'} estruturado${missing === 1 ? '' : 's'} ainda falta${missing === 1 ? '' : 'm'}` : 'Dados estruturados completos'}</strong>
          <ul class="final-function-checklist">
            ${checks.map((item) => `<li class="${item.ok ? '' : 'is-missing'}">${esc(item.label)}</li>`).join('')}
          </ul>
        </div>
        <div class="final-function-workshop__fields">
          <label>
            <span>Manifestação na cena · opcional</span>
            <textarea rows="3" data-final-appearance placeholder="Ex.: Fios rubros se unem e formam uma serpente translúcida.">${esc(savedDetail.answers?.appearance || '')}</textarea>
          </label>
          <label>
            <span>Detalhe excepcional não representado pelas opções · opcional</span>
            <textarea rows="3" data-final-exception placeholder="Preencha somente quando uma regra específica não estiver coberta pelos parâmetros e módulos.">${esc(savedDetail.answers?.exception || '')}</textarea>
          </label>
        </div>
        <aside class="final-function-preview">
          <strong>Prévia do funcionamento</strong>
          <pre data-final-preview>${esc(generatedEffect())}</pre>
        </aside>
        <aside class="final-function-workshop__note">
          <strong>O texto não prescreve a resposta do oponente.</strong>
          <p>Estratégias, oposição e maneiras de lidar com o Milagre surgem durante a sessão. A ficha registra apenas o que foi comprado e o que a ativação produz.</p>
        </aside>
        <div class="final-function-workshop__actions">
          <button type="button" data-final-build>Aplicar funcionamento à ficha</button>
          <button type="button" data-final-refresh>Atualizar prévia</button>
        </div>
      </div>
    </section>`;
  };

  const setMainField = (id, value) => {
    const control = host?.querySelector(`[data-state="${CSS.escape(id)}"]`);
    if (!control || control.value === value) return;
    control.value = value;
    control.dispatchEvent(new Event('input', { bubbles: true }));
  };

  const saveDetailInput = (id, value) => {
    const current = detail();
    current.answers[id] = value;
    writeJson(DETAIL_KEY, current);
  };

  const applyEffect = () => {
    const text = generatedEffect();
    if (!text) return;
    setMainField('effect', text);

    // Campos antigos deixam de carregar redações genéricas. O único valor
    // interno mantido é o necessário para a regra Persistente já escolhida.
    setMainField('resistance', '');
    setMainField('success', '');
    setMainField('failure', '');
    setMainField('limits', '');
    setMainField('endCondition', state().duration === 'Persistente'
      ? 'Gerenciado pela Duração Persistente e pelo limite de manifestações.'
      : '');

    const button = host.querySelector('[data-final-build]');
    if (button) {
      const original = button.textContent;
      button.textContent = 'Funcionamento aplicado';
      window.setTimeout(() => { button.textContent = original; }, 1500);
    }
  };

  const refreshPreview = () => {
    const preview = host?.querySelector('[data-final-preview]');
    if (preview) preview.textContent = generatedEffect();
  };

  const replaceWorkshop = () => {
    if (replacing || !host) return;
    const workshop = host.querySelector('.writing-workshop--lean:not([data-final-workshop])');
    if (!workshop) return;
    replacing = true;
    workshop.outerHTML = workshopMarkup();
    replacing = false;
  };

  const removeRedundantValidation = () => {
    host?.querySelectorAll('.studio-validation li').forEach((item) => {
      if (/resistido|superado|sucesso e falha|limites explícitos|forma clara de encerramento/i.test(item.textContent)) item.remove();
    });
  };

  const apply = () => {
    frame = 0;
    replaceWorkshop();
    removeRedundantValidation();
    refreshPreview();
  };

  const schedule = () => {
    if (frame) return;
    frame = window.requestAnimationFrame(apply);
  };

  const start = () => {
    host = document.querySelector('.miracle-studio-host');
    if (!host) {
      window.setTimeout(start, 80);
      return;
    }

    host.addEventListener('input', (event) => {
      if (event.target.matches('[data-final-appearance]')) saveDetailInput('appearance', event.target.value);
      if (event.target.matches('[data-final-exception]')) saveDetailInput('exception', event.target.value);
      schedule();
    });

    host.addEventListener('click', (event) => {
      if (event.target.closest('[data-final-build]')) applyEffect();
      if (event.target.closest('[data-final-refresh]')) refreshPreview();
    });

    new MutationObserver(schedule).observe(host, { childList: true, subtree: true });
    window.addEventListener('storage', schedule);
    schedule();
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, { once: true });
  else start();
})();
