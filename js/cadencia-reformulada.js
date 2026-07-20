(() => {
  'use strict';

  const page = window.location.pathname.split('/').filter(Boolean).pop() || '';
  const DATA = window.HarmoniaMiracleStudioData;
  const MAIN_KEY = 'harmonia-caotica:estudio-milagres:v1';
  const currentScript = document.currentScript;
  const scriptBase = currentScript?.src ? new URL('.', currentScript.src) : new URL('../js/', document.baseURI);

  const CADENCES = [
    {
      value: 'Comum',
      label: 'Comum',
      bonus: 0,
      summary: 'Pode ser ativado uma vez entre o início de um Turno do usuário e o início do Turno seguinte.',
      tradeoff: 'Não amplia o orçamento do Milagre.'
    },
    {
      value: 'Recarga',
      label: 'Recarga',
      bonus: 2,
      summary: 'Depois de ser ativado, fica indisponível durante o Turno seguinte do usuário e retorna no posterior.',
      tradeoff: 'Concede 2 pontos adicionais ao orçamento deste Milagre.'
    },
    {
      value: 'Limitada',
      label: 'Limitada',
      bonus: 4,
      summary: 'Pode ser ativado apenas uma vez por Combate.',
      tradeoff: 'Concede 4 pontos adicionais ao orçamento deste Milagre.'
    },
    {
      value: 'Ritual',
      label: 'Ritual',
      bonus: 6,
      summary: 'Exige pelo menos dez minutos de preparação e não pode ser iniciado durante um confronto.',
      tradeoff: 'Concede 6 pontos adicionais ao orçamento deste Milagre e substitui sua Ativação comum.'
    }
  ];

  const BASE_BUDGETS = { I: 12, II: 20, III: 30 };
  let host;
  let scheduled = false;
  let applying = false;

  const esc = (value = '') => String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');

  const readState = () => {
    try { return JSON.parse(localStorage.getItem(MAIN_KEY) || '{}'); }
    catch { return {}; }
  };

  const cadence = (value) => CADENCES.find((item) => item.value === value) || CADENCES[0];

  const ensureStylesheet = () => {
    if (document.getElementById('cadence-rework-style')) return;
    const link = document.createElement('link');
    link.id = 'cadence-rework-style';
    link.rel = 'stylesheet';
    link.href = new URL('../css/cadencia-reformulada.css?v=20260720j', scriptBase).href;
    document.head.appendChild(link);
  };

  const applyBudgets = (value) => {
    if (!DATA?.budgets) return;
    const bonus = cadence(value).bonus;
    Object.entries(BASE_BUDGETS).forEach(([rank, base]) => {
      DATA.budgets[rank] = base + bonus;
    });
    window.HarmoniaCadence = {
      options: CADENCES.map((item) => ({ ...item })),
      current: cadence(value),
      baseBudgets: { ...BASE_BUDGETS },
      budgetFor: (rank, cadenceValue = value) => (BASE_BUDGETS[rank] || 0) + cadence(cadenceValue).bonus
    };
  };

  const cadenceGuideMarkup = (selected) => `<aside class="cadence-choice-guide">
    <strong>${esc(selected.summary)}</strong>
    <p>${esc(selected.tradeoff)}</p>
    <small>A Cadência altera a frequência de ativação, não a Duração de uma manifestação já ativa.</small>
  </aside>`;

  const replaceCadenceField = () => {
    if (!host) return;
    const control = host.querySelector('[data-state="cadence"]');
    if (!control) return;

    const state = readState();
    const value = CADENCES.some((item) => item.value === state.cadence) ? state.cadence : 'Comum';
    applyBudgets(value);

    if (control.tagName === 'SELECT' && control.dataset.cadenceReworked === 'true') {
      const guide = control.closest('.studio-field')?.querySelector('.cadence-choice-guide');
      if (guide?.dataset.value !== value) {
        guide.outerHTML = cadenceGuideMarkup(cadence(value));
        const nextGuide = control.closest('.studio-field')?.querySelector('.cadence-choice-guide');
        if (nextGuide) nextGuide.dataset.value = value;
      }
      return;
    }

    const field = control.closest('.studio-field');
    if (!field) return;
    field.classList.add('cadence-choice-field');
    field.innerHTML = `<span>Cadência</span>
      <select id="studio-cadence" data-state="cadence" data-cadence-reworked="true">
        ${CADENCES.map((item) => `<option value="${item.value}" ${item.value === value ? 'selected' : ''}>${item.label}${item.bonus ? ` · +${item.bonus} pontos` : ' · orçamento normal'}</option>`).join('')}
      </select>
      ${cadenceGuideMarkup(cadence(value))}`;
    const guide = field.querySelector('.cadence-choice-guide');
    if (guide) guide.dataset.value = value;
  };

  const adjustRankNotes = () => {
    if (!host) return;
    const state = readState();
    const selected = cadence(state.cadence);
    host.querySelectorAll('[data-state="rank"] option').forEach((option) => {
      const rank = option.value;
      if (!BASE_BUDGETS[rank]) return;
      option.textContent = `Rank ${rank} · ${BASE_BUDGETS[rank] + selected.bonus} pontos${selected.bonus ? ` (${BASE_BUDGETS[rank]} + ${selected.bonus})` : ''}`;
    });
  };

  const adjustBudgetPresentation = () => {
    if (!host) return;
    const state = readState();
    const selected = cadence(state.cadence);
    const budget = (BASE_BUDGETS[state.rank] || 0) + selected.bonus;

    const review = host.querySelector('.studio-cost-review');
    if (review) {
      let note = review.querySelector('.cadence-budget-note');
      if (!note) {
        review.querySelector('dl')?.insertAdjacentHTML('afterend', '<p class="cadence-budget-note"></p>');
        note = review.querySelector('.cadence-budget-note');
      }
      if (note) note.innerHTML = selected.bonus
        ? `<strong>Cadência ${esc(selected.label)}:</strong> +${selected.bonus} pontos de orçamento. O limite deste Rank passa a ${budget}.`
        : `<strong>Cadência Comum:</strong> orçamento normal de ${budget} pontos.`;
    }

    const exportArea = host.querySelector('#studio-export-text');
    if (exportArea?.value) {
      let text = exportArea.value;
      text = text.replace(/^Cadência:.*$/m, `Cadência: ${selected.label}${selected.bonus ? ` — +${selected.bonus} pontos de orçamento` : ''}`);
      if (selected.value === 'Ritual') text = text.replace(/^Ativação:.*$/m, 'Ativação: Ritual — pelo menos 10 minutos');
      exportArea.value = text;
    }
  };

  const rewriteFundamentals = () => {
    if (page !== 'fundamentos-dos-milagres.html') return;
    const section = document.getElementById('cadencia')?.closest('.domain-section');
    if (!section || section.dataset.cadenceReworked === 'true') return;
    section.dataset.cadenceReworked = 'true';
    section.innerHTML = `
      <p class="section-kicker">Frequência e concentração</p>
      <h2 id="cadencia">Cadência</h2>
      <p>A Cadência define quando um Milagre pode ser ativado novamente. Ela deixou de ser uma limitação gratuita: quanto mais rara for a ativação, maior será o orçamento disponível para concentrar força, alcance ou complexidade naquele Milagre.</p>
      <p>A Cadência padrão continua sendo <strong>Comum</strong>. O jogador só escolhe uma Cadência mais lenta quando deseja trocar frequência por pontos adicionais.</p>
      <div class="cadence-rule-grid">
        ${CADENCES.map((item) => `<article><header><strong>${item.label}</strong><span>${item.bonus ? `+${item.bonus} pts` : '0 pts'}</span></header><p>${item.summary}</p><small>${item.tradeoff}</small></article>`).join('')}
      </div>
      <div class="domain-guide">
        <p><strong>Os pontos adicionais pertencem somente ao Milagre que aceitou a Cadência.</strong> Eles não aumentam o Rank do personagem e não podem ser transferidos para outros poderes.</p>
        <p><strong>Ritual substitui a Ativação comum.</strong> Um Ritual exige ao menos dez minutos e não pode ser iniciado no meio de um confronto.</p>
        <p><strong>Cadência não multiplica Potência.</strong> Ela apenas aumenta o orçamento usado para comprar funções e parâmetros normalmente.</p>
      </div>
      <h3>Cadência e Reações</h3>
      <p>Uma Reação continua sendo uma forma de ativação. Usar um Milagre como Reação consome sua disponibilidade e respeita a Cadência escolhida.</p>
      <h3>Manifestações que permanecem ativas</h3>
      <p>Uma manifestação não precisa ser reativada para continuar existindo. A Cadência controla novas ativações, não a permanência concedida pela Duração.</p>
      <p>Por padrão, somente uma manifestação de cada Milagre permanece ativa. Uma nova ativação substitui a anterior, salvo quando outra capacidade tiver sido comprada.</p>`;
  };

  const onCadenceChangeCapture = (event) => {
    const control = event.target.closest('[data-state="cadence"]');
    if (!control) return;
    applyBudgets(control.value);
  };

  const decorate = () => {
    scheduled = false;
    rewriteFundamentals();
    if (!host || applying) return;
    applying = true;
    try {
      replaceCadenceField();
      adjustRankNotes();
      adjustBudgetPresentation();
    } finally {
      applying = false;
    }
  };

  const schedule = () => {
    if (scheduled) return;
    scheduled = true;
    window.requestAnimationFrame(decorate);
  };

  const start = () => {
    ensureStylesheet();
    rewriteFundamentals();
    if (page !== 'construcao-guiada.html') return;

    const initial = readState();
    applyBudgets(initial.cadence || 'Comum');
    host = document.querySelector('.miracle-studio-host');
    if (!host) {
      window.setTimeout(start, 80);
      return;
    }

    document.addEventListener('change', onCadenceChangeCapture, true);
    new MutationObserver(schedule).observe(host, { childList: true, subtree: true });
    host.addEventListener('input', schedule);
    host.addEventListener('change', schedule);
    schedule();
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, { once: true });
  else start();
})();
