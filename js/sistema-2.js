(() => {
  'use strict';

  const RANKS = [
    { ordinal: 1, roman: 'I', name: 'Desperto', min: 1, max: 9, graduation: 5 },
    { ordinal: 2, roman: 'II', name: 'Adepto', min: 10, max: 19, graduation: 7 },
    { ordinal: 3, roman: 'III', name: 'Consagrado', min: 20, max: 29, graduation: 9 },
    { ordinal: 4, roman: 'IV', name: 'Arauto', min: 30, max: 39, graduation: 11 },
    { ordinal: 5, roman: 'V', name: 'Exarca', min: 40, max: 49, graduation: 13 },
    { ordinal: 6, roman: 'VI', name: 'Numinoso', min: 50, max: 59, graduation: 15 },
    { ordinal: 7, roman: 'VII', name: 'Ascendente', min: 60, max: 69, graduation: 17 },
    { ordinal: 8, roman: 'VIII', name: 'Semidivino', min: 70, max: 79, graduation: 19 },
    { ordinal: 9, roman: 'IX', name: 'Soberano', min: 80, max: 89, graduation: 21 },
    { ordinal: 10, roman: 'X', name: 'Pretendente', min: 90, max: 99, graduation: 23 },
    { ordinal: 11, roman: 'XI', name: 'Apoteose', min: 100, max: 100, graduation: 25 }
  ];

  const clampInteger = (value, min, max, fallback = min) => {
    const parsed = Number.parseInt(value, 10);
    if (!Number.isFinite(parsed)) return fallback;
    return Math.min(max, Math.max(min, parsed));
  };

  const clampLevel = (value) => clampInteger(value, 1, 100, 1);

  const rankForLevel = (level) => RANKS.find((rank) => level >= rank.min && level <= rank.max) || RANKS[0];

  const progressionForLevel = (levelValue) => {
    const level = clampLevel(levelValue);
    const rank = rankForLevel(level);

    return {
      level,
      totalPm: 12 + (3 * level),
      spaces: 1 + Math.floor(level / 5),
      rank,
      maxGraduation: rank.graduation,
      maxPmPerSpace: rank.graduation * 4,
      nextSpace: level >= 100 ? null : Math.ceil((level + 1) / 5) * 5,
      nextRank: level >= 100 ? null : RANKS.find((candidate) => candidate.min > level) || null
    };
  };

  const setText = (root, selector, value) => {
    const node = root.querySelector(selector);
    if (node) node.textContent = value;
  };

  const normalizeNumberField = (field, min, max, fallback) => {
    if (!field) return;
    field.value = String(clampInteger(field.value, min, max, fallback));
  };

  const applyEditorialStatus = () => {
    const target = document.querySelector('.archive-record__meta span:first-child');
    if (!target) return;

    if (document.querySelector('.system2-status--draft')) {
      target.textContent = 'Auditoria em rascunho';
    } else if (document.querySelector('.system2-status--testing')) {
      target.textContent = 'Conteúdo parcial em teste';
    } else if (document.querySelector('.system2-status--approved')) {
      target.textContent = 'Regra aprovada';
    } else {
      target.textContent = 'Versão canônica';
    }
  };

  const initProgressionCalculator = (root) => {
    const input = root.querySelector('[data-level-input]');
    if (!input) return;

    const render = () => {
      const data = progressionForLevel(input.value);

      setText(root, '[data-total-pm]', String(data.totalPm));
      setText(root, '[data-spaces]', String(data.spaces));
      setText(root, '[data-rank]', `Rank ${data.rank.roman} — ${data.rank.name}`);
      setText(root, '[data-max-graduation]', String(data.maxGraduation));
      setText(root, '[data-max-space-pm]', String(data.maxPmPerSpace));
      setText(root, '[data-next-space]', data.nextSpace ? `Nível ${data.nextSpace}` : 'Todos liberados');
      setText(root, '[data-next-rank]', data.nextRank ? `Nível ${data.nextRank.min}: ${data.nextRank.name}` : 'Apoteose alcançada');
    };

    input.addEventListener('input', render);
    input.addEventListener('change', () => {
      normalizeNumberField(input, 1, 100, 1);
      render();
    });
    render();
  };

  const initBuildValidator = (root) => {
    const levelInput = root.querySelector('[data-build-level]');
    const costInput = root.querySelector('[data-build-cost]');
    const graduationInput = root.querySelector('[data-build-graduation]');
    const structureInput = root.querySelector('[data-build-structure]');
    const output = root.querySelector('[data-build-validation]');

    if (!levelInput || !costInput || !graduationInput || !output) return;

    const render = () => {
      const data = progressionForLevel(levelInput.value);
      const cost = Math.max(0, Number.parseInt(costInput.value, 10) || 0);
      const graduation = Math.max(0, Number.parseInt(graduationInput.value, 10) || 0);
      const structure = structureInput ? structureInput.value : 'normal';
      const problems = [];

      const exceedsCharacterBudget = cost > data.totalPm;
      const exceedsSpaceLimit = cost > data.maxPmPerSpace;
      const exceedsGraduation = graduation > data.maxGraduation;

      if (exceedsCharacterBudget) {
        problems.push(`o custo de ${cost} PM ultrapassa os ${data.totalPm} PM totais recebidos no Nível ${data.level}, antes de outros gastos`);
      }

      if (exceedsSpaceLimit) {
        problems.push(`o custo de ${cost} PM ultrapassa o teto de ${data.maxPmPerSpace} PM por Espaço`);
      }

      if (exceedsGraduation) {
        problems.push(`a Graduação ${graduation} ultrapassa o máximo ${data.maxGraduation}`);
      }

      if (['repertorio', 'recipiente', 'variavel', 'invocar'].includes(structure)) {
        problems.push('a liberação por Rank desta estrutura ainda está em auditoria e exige aprovação administrativa');
      }

      costInput.setAttribute('aria-invalid', String(exceedsCharacterBudget || exceedsSpaceLimit));
      graduationInput.setAttribute('aria-invalid', String(exceedsGraduation));
      setText(root, '[data-build-rank]', `${data.rank.name} — ${data.totalPm} PM totais, Graduação ${data.maxGraduation}, ${data.maxPmPerSpace} PM por Espaço`);

      if (problems.length === 0) {
        output.dataset.state = 'valid';
        output.textContent = 'A construção respeita os limites canônicos de orçamento total, Graduação e PM por Espaço deste Rank.';
      } else {
        const onlyAuditWarning = problems.length === 1 && problems[0].includes('auditoria');
        output.dataset.state = onlyAuditWarning ? 'neutral' : 'invalid';
        output.textContent = `${onlyAuditWarning ? 'Atenção' : 'Construção inválida'}: ${problems.join('; ')}.`;
      }
    };

    [levelInput, costInput, graduationInput, structureInput].filter(Boolean).forEach((field) => {
      field.addEventListener('input', render);
      field.addEventListener('change', () => {
        if (field === levelInput) normalizeNumberField(levelInput, 1, 100, 1);
        if (field === costInput) normalizeNumberField(costInput, 0, Number.MAX_SAFE_INTEGER, 0);
        if (field === graduationInput) normalizeNumberField(graduationInput, 0, Number.MAX_SAFE_INTEGER, 0);
        render();
      });
    });

    render();
  };

  const enhanceScrollableTables = () => {
    document.querySelectorAll('.system2-table-wrap').forEach((wrapper, index) => {
      const heading = wrapper.closest('section')?.querySelector('h2');
      wrapper.tabIndex = 0;
      wrapper.setAttribute('role', 'region');
      wrapper.setAttribute('aria-label', heading?.textContent?.trim() || `Tabela de regras ${index + 1}`);
    });
  };

  const start = () => {
    applyEditorialStatus();
    document.querySelectorAll('[data-progression-calculator]').forEach(initProgressionCalculator);
    document.querySelectorAll('[data-build-validator]').forEach(initBuildValidator);
    enhanceScrollableTables();
  };

  window.HarmoniaSistema2 = Object.freeze({
    ranks: RANKS.map((rank) => Object.freeze({ ...rank })),
    progressionForLevel
  });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start, { once: true });
  } else {
    start();
  }
})();