(() => {
  'use strict';

  const DATA = window.HarmoniaMiracleStudioData;
  if (!DATA || window.location.pathname.split('/').pop() !== 'construcao-guiada.html') return;

  const STORAGE_KEY = 'harmonia-caotica:estudio-milagres:v1';
  const currentScript = document.currentScript;
  const scriptBase = currentScript?.src ? new URL('.', currentScript.src) : new URL('../js/', document.baseURI);

  const ensureStylesheet = () => {
    if (document.getElementById('miracle-studio-recommendations-style')) return;
    const link = document.createElement('link');
    link.id = 'miracle-studio-recommendations-style';
    link.rel = 'stylesheet';
    link.href = new URL('../css/estudio-recomendacoes.css?v=20260720a', scriptBase).href;
    document.head.appendChild(link);
  };

  const normalize = (value = '') => value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLocaleLowerCase('pt-BR')
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  const readState = () => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    } catch {
      return {};
    }
  };

  const FUNCTION_RULES = [
    { id: 'damage', terms: ['dano', 'ferir', 'ferimento', 'golpear', 'atacar', 'queimar', 'cortar', 'destruir', 'matar'], reason: 'A frase descreve prejuízo direto à integridade do alvo.' },
    { id: 'healing', terms: ['curar', 'cura', 'restaurar', 'regenerar', 'cicatrizar', 'tratar', 'reviver', 'retornar'], reason: 'A frase descreve recuperação ou devolução de algo perdido.' },
    { id: 'protection', terms: ['proteger', 'defender', 'bloquear', 'barreira', 'escudo', 'reduzir dano', 'neutralizar', 'refletir', 'desviar'], reason: 'A frase descreve oposição ou resposta a outro efeito.' },
    { id: 'control', terms: ['controlar', 'obrigar', 'ordenar', 'comandar', 'compelir', 'dominar', 'seduzir', 'obedecer', 'proibir'], reason: 'A frase interfere nas escolhas, emoções ou oportunidades de outra existência.' },
    { id: 'space', terms: ['mover', 'empurrar', 'puxar', 'atrair', 'repelir', 'arremessar', 'aproximar', 'afastar', 'orbitar', 'posição'], reason: 'A frase altera posição, trajetória ou ocupação do espaço.' },
    { id: 'traversal', terms: ['teleportar', 'portal', 'atravessar', 'permeação', 'sumir', 'reaparecer', 'distância instantânea'], reason: 'A frase alcança um destino sem percorrer o caminho comum.' },
    { id: 'creation', terms: ['criar', 'invocar', 'manifestar', 'conjurar', 'criatura', 'objeto', 'arma', 'serpente', 'muralha', 'estrutura'], reason: 'A frase produz algo separável do alvo original.' },
    { id: 'propagation', terms: ['propagar', 'espalhar', 'contagiar', 'infectar', 'multiplicar', 'reproduzir', 'novo hospedeiro', 'novos focos'], reason: 'A frase produz novos destinos ou unidades depois da ativação.' },
    { id: 'transformation', terms: ['transformar', 'alterar corpo', 'mudar forma', 'metamorfose', 'aumentar tamanho', 'reduzir tamanho', 'deformar'], reason: 'A frase modifica a estrutura ou a forma de uma existência.' },
    { id: 'information', terms: ['perceber', 'detectar', 'enxergar', 'rastrear', 'observar', 'revelar', 'ocultar', 'esconder', 'falsificar', 'comunicar'], reason: 'A frase obtém, impede ou modifica informação.' },
    { id: 'resources', terms: ['transferir', 'absorver', 'compartilhar', 'fundir', 'roubar energia', 'vitalidade', 'reserva'], reason: 'A frase movimenta ou combina um recurso existente.' },
    { id: 'combat', terms: ['reagir', 'reação', 'gatilho', 'quando for atacado', 'automaticamente', 'oportunidade'], reason: 'A frase exige um momento de atuação ou gatilho específico.' },
    { id: 'costs', terms: ['sacrificar', 'pagar', 'recarga', 'recarregar', 'converter', 'combustível', 'alimentar'], reason: 'A frase utiliza pagamento, recuperação ou combustível especial.' },
    { id: 'value', terms: ['aumentar', 'reduzir', 'fortalecer', 'enfraquecer', 'restaurar vida', 'resistência'], reason: 'A frase altera diretamente um valor do jogo.' }
  ];

  const BRANCH_RULES = {
    Mácula: ['contaminar', 'macular', 'corromper corpo', 'profanação'],
    Contágio: ['contagiar', 'transmitir doença', 'epidemia', 'infectar'],
    Aflição: ['febre', 'dor', 'delírio', 'sintoma', 'compulsão por doença'],
    Consunção: ['consumir', 'definhar', 'deteriorar', 'desgastar'],
    Aberração: ['mutar', 'deformar', 'aberração', 'adaptação patológica'],
    Infestação: ['infestar', 'colônia', 'parasitas', 'ocupar corpo'],
    Espoliação: ['drenar', 'roubar recurso', 'extrair do hospedeiro'],
    Simbiose: ['simbiose', 'benefício mútuo', 'compartilhar organismo'],
    Usurpação: ['usurpar', 'controlar hospedeiro', 'tomar função', 'apropriar órgão'],
    Linhagem: ['reproduzir parasita', 'transmitir descendência', 'ovos', 'larvas'],
    Finitude: ['matar', 'encerrar vida', 'fim definitivo'],
    'Restos Mortais': ['cadáver', 'ossos', 'cinzas', 'corpo morto'],
    Espíritos: ['espírito', 'alma', 'fantasma', 'possessão funerária'],
    Repouso: ['repouso', 'silenciar morto', 'descanso', 'adormecer espírito'],
    Luto: ['luto', 'memória dos mortos', 'perda', 'saudade'],
    Breu: ['escuridão absoluta', 'apagar luz', 'cegueira por trevas'],
    Sombra: ['sombra', 'marionete de sombra', 'viajar pela sombra'],
    Eclipse: ['eclipse', 'ocultar fonte', 'interromper luz'],
    Penumbra: ['penumbra', 'meia luz', 'ocultação parcial'],
    Abismo: ['abismo', 'profundidade escura', 'vazio negro'],
    Cura: ['curar', 'cicatrizar', 'restaurar tecido', 'reparar organismo'],
    Sangue: ['sangue', 'corrente vital', 'circulação', 'vínculo vital'],
    Crescimento: ['crescer', 'amadurecer', 'planta', 'desenvolver organismo'],
    Fecundidade: ['fertilidade', 'germinar', 'nascer', 'criar vida'],
    Vigor: ['vigor', 'exaustão', 'manter ativo', 'resistir ferimento'],
    Esplendor: ['emitir luz', 'clarão', 'brilho', 'luminosidade intensa'],
    Espectro: ['cores', 'cor', 'frequência luminosa', 'arco íris'],
    Refração: ['refratar', 'curvar luz', 'desviar raio'],
    Reflexo: ['refletir luz', 'espelho', 'duplicar imagem'],
    Claridade: ['revelar', 'iluminar', 'tornar visível', 'dissipar ocultação'],
    Firmamento: ['firmamento', 'altitude', 'caminho celeste', 'suspender no céu'],
    Nuvens: ['nuvem', 'névoa celeste', 'vapor', 'condensar'],
    Vento: ['vento', 'corrente de ar', 'rajada', 'voar pelo ar'],
    Tormenta: ['tempestade', 'raio', 'trovão', 'tormenta'],
    Clima: ['clima', 'chuva ampla', 'estação', 'condição atmosférica'],
    Incandescência: ['calor solar', 'incandescer', 'queimar com sol'],
    Coroa: ['coroa solar', 'aura solar', 'emanação radiante'],
    Trono: ['atrair', 'repelir', 'orbitar', 'centro solar', 'gravidade solar'],
    Curso: ['curso do sol', 'trajetória celeste', 'movimento astral'],
    Sono: ['dormir', 'sono', 'adormecer', 'despertar'],
    Imaginação: ['imaginar', 'cenário onírico', 'imagem mental', 'criar sonho'],
    Memória: ['memória', 'recordação', 'lembrança em sonho'],
    Desejo: ['desejo', 'anseio', 'sedução onírica', 'vontade em sonho'],
    Presságio: ['presságio', 'futuro', 'premonição', 'sinal onírico'],
    Pavor: ['pavor', 'medo', 'terror'],
    Tormento: ['tormento', 'sofrimento onírico', 'dor no pesadelo'],
    Desamparo: ['desamparo', 'impotência', 'abandono', 'sem saída'],
    Caçada: ['caçar', 'perseguir', 'predador', 'fugir no pesadelo'],
    Ciclo: ['repetir', 'ciclo', 'reviver pesadelo', 'loop']
  };

  const scoreTerms = (text, terms) => terms.reduce((score, term) => score + (text.includes(normalize(term)) ? Math.max(1, normalize(term).split(' ').length) : 0), 0);

  const functionSuggestions = (idea) => FUNCTION_RULES
    .map((rule) => ({ ...rule, score: scoreTerms(idea, rule.terms) }))
    .filter((rule) => rule.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);

  const branchSuggestions = (idea, deity) => {
    const domains = DATA.deities[deity]?.domains || {};
    const candidates = [];

    Object.entries(domains).forEach(([domain, data]) => {
      Object.keys(data.branches).forEach((branch) => {
        const score = scoreTerms(idea, BRANCH_RULES[branch] || []);
        if (score > 0) candidates.push({ domain, branch, score, description: data.branches[branch] });
      });
    });

    return candidates.sort((a, b) => b.score - a.score).slice(0, 3);
  };

  const decorateFunctions = (step, saved) => {
    if (step.dataset.recommendationsReady === 'true') return;
    const idea = normalize(saved.idea || '');
    const suggestions = functionSuggestions(idea);
    if (!suggestions.length) return;

    step.dataset.recommendationsReady = 'true';
    const lead = step.querySelector('.studio-step__lead');
    const block = document.createElement('aside');
    block.className = 'studio-recommendations';
    block.innerHTML = `
      <div><span>Sugestões pela sua frase</span><strong>Comece por estas funções</strong><p>As demais continuam disponíveis em “Mostrar todas”.</p></div>
      <button type="button" data-show-all-functions aria-expanded="false">Mostrar todas</button>`;
    lead?.insertAdjacentElement('afterend', block);

    const suggestedIds = new Set(suggestions.map((item) => item.id));
    step.querySelectorAll('.studio-function').forEach((card) => {
      const id = card.querySelector('[data-function]')?.dataset.function;
      const selected = card.querySelector('[data-function]')?.checked;
      if (suggestedIds.has(id)) {
        card.classList.add('is-suggested');
        const suggestion = suggestions.find((item) => item.id === id);
        const reason = document.createElement('div');
        reason.className = 'studio-suggestion-reason';
        reason.textContent = suggestion.reason;
        card.appendChild(reason);
      } else if (!selected) {
        card.classList.add('is-secondary-suggestion');
      }
    });

    block.querySelector('[data-show-all-functions]')?.addEventListener('click', (event) => {
      const expanded = event.currentTarget.getAttribute('aria-expanded') === 'true';
      event.currentTarget.setAttribute('aria-expanded', String(!expanded));
      event.currentTarget.textContent = expanded ? 'Mostrar todas' : 'Mostrar apenas sugestões';
      step.classList.toggle('show-all-functions', !expanded);
    });
  };

  const selectSuggestedBranch = (domain, branch) => {
    const domainSelect = document.querySelector('[data-state="domain"]');
    if (!domainSelect) return;
    domainSelect.value = domain;
    domainSelect.dispatchEvent(new Event('change', { bubbles: true }));

    window.setTimeout(() => {
      const branchSelect = document.querySelector('[data-state="branch"]');
      if (!branchSelect) return;
      branchSelect.value = branch;
      branchSelect.dispatchEvent(new Event('change', { bubbles: true }));
    }, 90);
  };

  const decorateOrigin = (step, saved) => {
    if (step.dataset.originRecommendationsReady === 'true') return;
    const idea = normalize(saved.idea || '');
    const deity = saved.deity || document.querySelector('[data-state="deity"]')?.value || '';
    if (!idea || !deity) return;

    const suggestions = branchSuggestions(idea, deity);
    if (!suggestions.length) return;

    step.dataset.originRecommendationsReady = 'true';
    const lead = step.querySelector('.studio-step__lead');
    const block = document.createElement('aside');
    block.className = 'studio-origin-suggestions';
    block.innerHTML = `
      <span>Possíveis origens para a ideia descrita</span>
      <div>${suggestions.map((item) => `<button type="button" data-suggest-domain="${item.domain}" data-suggest-branch="${item.branch}"><strong>${item.domain} — ${item.branch}</strong><small>${item.description}</small></button>`).join('')}</div>
      <p>São pontos de partida, não uma aprovação automática. A origem precisa explicar o princípio sobrenatural do efeito.</p>`;
    lead?.insertAdjacentElement('afterend', block);

    block.addEventListener('click', (event) => {
      const button = event.target.closest('[data-suggest-domain]');
      if (!button) return;
      selectSuggestedBranch(button.dataset.suggestDomain, button.dataset.suggestBranch);
    });
  };

  const decorate = () => {
    const step = document.querySelector('.miracle-studio .studio-step');
    if (!step) return;
    const saved = readState();

    if (step.querySelector('#studio-step-title-2')) decorateOrigin(step, saved);
    if (step.querySelector('#studio-step-title-3')) decorateFunctions(step, saved);
  };

  const start = () => {
    ensureStylesheet();
    const observer = new MutationObserver(() => window.requestAnimationFrame(decorate));
    const host = document.querySelector('.miracle-studio-host');
    if (!host) {
      window.setTimeout(start, 100);
      return;
    }
    observer.observe(host, { childList: true, subtree: true });
    decorate();
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, { once: true });
  else start();
})();
