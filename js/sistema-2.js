(() => {
  'use strict';

  const RANKS = [
    { ordinal: 1, name: 'Desperto', min: 1, max: 9, graduation: 5 },
    { ordinal: 2, name: 'Adepto', min: 10, max: 19, graduation: 7 },
    { ordinal: 3, name: 'Consagrado', min: 20, max: 29, graduation: 9 },
    { ordinal: 4, name: 'Arauto', min: 30, max: 39, graduation: 11 },
    { ordinal: 5, name: 'Exarca', min: 40, max: 49, graduation: 13 },
    { ordinal: 6, name: 'Numinoso', min: 50, max: 59, graduation: 15 },
    { ordinal: 7, name: 'Ascendente', min: 60, max: 69, graduation: 17 },
    { ordinal: 8, name: 'Semidivino', min: 70, max: 79, graduation: 19 },
    { ordinal: 9, name: 'Soberano', min: 80, max: 89, graduation: 21 },
    { ordinal: 10, name: 'Pretendente', min: 90, max: 99, graduation: 23 },
    { ordinal: 11, name: 'Apoteose', min: 100, max: 100, graduation: 25 }
  ];

  const clampLevel = (value) => {
    const parsed = Number.parseInt(value, 10);
    if (!Number.isFinite(parsed)) return 1;
    return Math.min(100, Math.max(1, parsed));
  };

  const rankForLevel = (level) => RANKS.find((rank) => level >= rank.min && level <= rank.max) || RANKS[0];

  const progressionForLevel = (level) => {
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

  const applyEditorialStatus = () => {
    const file = window.location.pathname.split('/').filter(Boolean).pop() || 'index.html';
    const statusByFile = {
      'index.html': 'Implementação em teste',
      'primeiros-passos.html': 'Regra canônica',
      'progressao-e-ranks.html': 'Regra canônica',
      'consulta-rapida.html': 'Regra canônica',
      'construcao-guiada.html': 'Ferramenta em teste',
      'estruturas-de-poder.html': 'Auditoria em rascunho'
    };
    const status = statusByFile[file];
    const target = document.querySelector('.archive-record__meta span:first-child');
    if (status && target) target.textContent = status;
  };

  const initProgressionCalculator = (root) => {
    const input = root.querySelector('[data-level-input]');
    if (!input) return;

    const render = () => {
      const level = clampLevel(input.value);
      if (String(level) !== input.value) input.value = String(level);
      const data = progressionForLevel(level);

      setText(root, '[data-total-pm]', String(data.totalPm));
      setText(root, '[data-spaces]', String(data.spaces));
      setText(root, '[data-rank]', `Rank ${data.rank.ordinal} — ${data.rank.name}`);
      setText(root, '[data-max-graduation]', String(data.maxGraduation));
      setText(root, '[data-max-space-pm]', String(data.maxPmPerSpace));
      setText(root, '[data-next-space]', data.nextSpace ? `Nível ${data.nextSpace}` : 'Todos liberados');
      setText(root, '[data-next-rank]', data.nextRank ? `Nível ${data.nextRank.min}: ${data.nextRank.name}` : 'Apoteose alcançada');
    };

    input.addEventListener('input', render);
    input.addEventListener('change', render);
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
      const level = clampLevel(levelInput.value);
      const cost = Math.max(0, Number.parseInt(costInput.value, 10) || 0);
      const graduation = Math.max(0, Number.parseInt(graduationInput.value, 10) || 0);
      const data = progressionForLevel(level);
      const structure = structureInput ? structureInput.value : 'normal';
      const problems = [];

      if (cost > data.maxPmPerSpace) {
        problems.push(`o custo de ${cost} PM ultrapassa o teto de ${data.maxPmPerSpace} PM por Espaço`);
      }

      if (graduation > data.maxGraduation) {
        problems.push(`a Graduação ${graduation} ultrapassa o máximo ${data.maxGraduation}`);
      }

      if (['repertorio', 'recipiente', 'variavel', 'invocar'].includes(structure)) {
        problems.push('a liberação por Rank desta estrutura ainda está em auditoria e exige aprovação administrativa');
      }

      setText(root, '[data-build-rank]', `${data.rank.name} — Graduação ${data.maxGraduation}, ${data.maxPmPerSpace} PM por Espaço`);

      if (problems.length === 0) {
        output.dataset.state = 'valid';
        output.textContent = 'A construção respeita os limites canônicos de Graduação e PM por Espaço deste Rank.';
      } else {
        const onlyAuditWarning = problems.length === 1 && problems[0].includes('auditoria');
        output.dataset.state = onlyAuditWarning ? 'neutral' : 'invalid';
        output.textContent = `${onlyAuditWarning ? 'Atenção' : 'Construção inválida'}: ${problems.join('; ')}.`;
      }
    };

    [levelInput, costInput, graduationInput, structureInput].filter(Boolean).forEach((field) => {
      field.addEventListener('input', render);
      field.addEventListener('change', render);
    });

    render();
  };

  const start = () => {
    applyEditorialStatus();
    document.querySelectorAll('[data-progression-calculator]').forEach(initProgressionCalculator);
    document.querySelectorAll('[data-build-validator]').forEach(initBuildValidator);
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start, { once: true });
  } else {
    start();
  }
})();
