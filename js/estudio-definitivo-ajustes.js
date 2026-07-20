(() => {
  'use strict';

  const DATA = window.HarmoniaMiracleStudioData;
  const GUIDE = window.HarmoniaDefinitiveStudioData;
  if (!DATA || !GUIDE || window.location.pathname.split('/').pop() !== 'construcao-guiada.html') return;

  const MAIN_KEY = 'harmonia-caotica:estudio-milagres:v1';
  let host;
  let scheduled = false;

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

  const optionByValue = (options = [], value) => options.find((item) => String(item.value) === String(value));

  const selectedDomain = (state) => DATA.deities[state.deity]?.domains?.[state.domain] || null;

  const standardGuide = (key, value) => {
    const state = readState();

    if (key === 'deity' && value) {
      const domains = Object.keys(DATA.deities[value]?.domains || {});
      return {
        summary: `${value} concede acesso aos Domínios ${domains.join(' e ')}.`,
        useWhen: 'Escolha a Divindade seguida pelo personagem. A fé define quais Domínios e Vertentes estarão disponíveis.',
        excludes: 'A escolha da Divindade não decide sozinha a função mecânica do Milagre.'
      };
    }

    if (key === 'domain' && value) {
      const domain = DATA.deities[state.deity]?.domains?.[value];
      return {
        summary: domain?.summary || GUIDE.fieldGuides.domain.summary,
        useWhen: 'Escolha o Domínio que realmente produz o efeito sobrenatural.',
        excludes: 'O símbolo, a cor ou o nome do poder não substituem essa relação conceitual.'
      };
    }

    if (key === 'branch' && value) {
      const text = selectedDomain(state)?.branches?.[value];
      return {
        summary: text || GUIDE.fieldGuides.branch.summary,
        useWhen: 'Escolha a Vertente cujo princípio permanece verdadeiro mesmo quando toda a estética do poder é removida.',
        excludes: 'A Vertente não é apenas uma aparência. Ela também concede automaticamente sua Herança aos Milagres compatíveis.'
      };
    }

    if (key === 'targetCount') {
      const catalog = state.targetMode === 'shared' ? GUIDE.optionGuides.sharedTargets : GUIDE.optionGuides.completeTargets;
      return catalog?.[value] || GUIDE.fieldGuides.targetCount;
    }

    return GUIDE.optionGuides[key]?.[value] || GUIDE.fieldGuides[key] || null;
  };

  const standardCatalogOptions = (key, select) => {
    const state = readState();
    if (key === 'targetCount') {
      return state.targetMode === 'shared' ? DATA.core.sharedTargets : DATA.core.completeTargets;
    }
    if (key === 'deity') return [...select.options].map((item) => ({ value: item.value, label: item.textContent.trim(), cost: 0 }));
    if (key === 'domain') return [...select.options].map((item) => ({ value: item.value, label: item.textContent.trim(), cost: 0 }));
    if (key === 'branch') return [...select.options].map((item) => ({ value: item.value, label: item.textContent.trim(), cost: 0 }));

    const fields = [
      { id: 'rank', options: DATA.ranks },
      { id: 'potency', options: DATA.core.potency },
      { id: 'activation', options: DATA.core.activation },
      { id: 'range', options: DATA.core.range },
      { id: 'targetMode', options: DATA.core.targetMode },
      { id: 'area', options: DATA.core.area },
      { id: 'duration', options: DATA.core.duration },
      ...Object.values(DATA.modules || {}).flatMap((module) => module.fields || [])
    ];
    return fields.find((field) => field.id === key)?.options || [...select.options].map((item) => ({ value: item.value, label: item.textContent.trim(), cost: 0 }));
  };

  const advancedOptions = (path, select) => {
    const parts = path.split('.');
    const root = parts[0];
    if (root !== 'abilities') return GUIDE.creation[root] || [];

    const field = parts[2];
    const map = {
      type: GUIDE.creation.capabilityTypes,
      acting: GUIDE.creation.abilityActing,
      range: GUIDE.creation.abilityRange,
      potency: DATA.core.potency,
      duration: DATA.core.duration,
      targetMode: [...select.options].map((item) => ({ value: item.value, label: item.textContent.trim(), cost: 0 })),
      targetCount: [...select.options].map((item) => ({ value: item.value, label: item.textContent.trim(), cost: Number((item.textContent.match(/·\s*(\d+)/) || [])[1] || 0) })),
      area: DATA.core.area,
      potencyMode: [...select.options].map((item) => ({ value: item.value, label: item.textContent.trim(), cost: 0 }))
    };
    return map[field] || [...select.options].map((item) => ({ value: item.value, label: item.textContent.trim(), cost: 0 }));
  };

  const advancedGuide = (path, value, options) => {
    const item = optionByValue(options, value);
    if (item?.summary || item?.note) return { summary: item.summary || item.note, excludes: item.excludes || '' };

    const field = path.split('.').at(-1);
    if (field === 'potency') return GUIDE.optionGuides.potency[value];
    if (field === 'duration') return GUIDE.optionGuides.duration[value];
    if (field === 'targetCount') {
      const abilityIndex = Number(path.split('.')[1]);
      const creation = (() => {
        try { return JSON.parse(localStorage.getItem('harmonia-caotica:estudio-criacao:v2') || '{}'); }
        catch { return {}; }
      })();
      const mode = creation.abilities?.[abilityIndex]?.targetMode;
      return (mode === 'shared' ? GUIDE.optionGuides.sharedTargets : GUIDE.optionGuides.completeTargets)?.[value];
    }
    if (field === 'area') return GUIDE.optionGuides.area[value];
    return { summary: item?.label || 'Opção de construção.', useWhen: 'Escolha quando esta opção descreve exatamente o funcionamento desejado.' };
  };

  const guideBody = (guide) => `<strong>O que esta opção significa</strong><p>${esc(guide?.summary || 'Selecione uma opção para ver sua explicação.')}</p>${guide?.useWhen ? `<div><span>Escolha quando</span><p>${esc(guide.useWhen)}</p></div>` : ''}${guide?.excludes ? `<div><span>Não concede</span><p>${esc(guide.excludes)}</p></div>` : ''}`;

  const catalogMarkup = (entries) => `<details class="def-option-catalog"><summary>Comparar todas as opções</summary><div>${entries.map(({ item, guide }) => `<article><header><strong>${esc(item.label || item.value)}</strong>${Number(item.cost || 0) ? `<span>${item.cost} pt${Number(item.cost) === 1 ? '' : 's'}</span>` : '<span>0 pts</span>'}</header><p>${esc(guide?.summary || item.note || 'Descrição ainda não registrada.')}</p>${guide?.excludes ? `<small><b>Não concede:</b> ${esc(guide.excludes)}</small>` : ''}</article>`).join('')}</div></details>`;

  const decorateStandard = () => {
    host.querySelectorAll('.studio-field select[data-state]').forEach((select) => {
      const field = select.closest('.studio-field');
      const key = select.dataset.state;
      const selected = standardGuide(key, select.value);
      const guide = field.querySelector(':scope > .def-option-guide');
      if (guide) {
        guide.innerHTML = guideBody(selected);
        guide.dataset.definitiveValue = select.value;
      }

      let catalog = field.querySelector(':scope > .def-option-catalog');
      const options = standardCatalogOptions(key, select).filter((item) => String(item.value) !== '');
      if (options.length < 2) return;
      const entries = options.map((item) => ({ item, guide: standardGuide(key, item.value) }));
      const signature = `${key}:${options.map((item) => item.value).join('|')}`;
      if (!catalog) {
        field.insertAdjacentHTML('beforeend', catalogMarkup(entries));
        catalog = field.querySelector(':scope > .def-option-catalog');
      }
      if (catalog && catalog.dataset.signature !== signature) {
        const open = catalog.open;
        catalog.outerHTML = catalogMarkup(entries);
        catalog = field.querySelector(':scope > .def-option-catalog');
        if (catalog) catalog.open = open;
      }
      if (catalog) catalog.dataset.signature = signature;
    });
  };

  const decorateAdvanced = () => {
    host.querySelectorAll('.def-field select[data-def-path]').forEach((select) => {
      const field = select.closest('.def-field');
      const path = select.dataset.defPath;
      const options = advancedOptions(path, select).filter((item) => String(item.value) !== '');
      const selected = advancedGuide(path, select.value, options);
      const guide = field.querySelector(':scope > .def-option-guide');
      if (guide) guide.innerHTML = guideBody(selected);

      if (options.length < 2 || field.querySelector(':scope > .def-option-catalog')) return;
      const entries = options.map((item) => ({ item, guide: advancedGuide(path, item.value, options) }));
      field.insertAdjacentHTML('beforeend', catalogMarkup(entries));
    });
  };

  const decorateCreationFunctionNotice = () => {
    const card = host.querySelector('.studio-function [data-function="creation"]')?.closest('.studio-function');
    if (!card || card.querySelector('.def-creation-function-notice')) return;
    const notice = document.createElement('aside');
    notice.className = 'def-creation-function-notice';
    notice.innerHTML = '<strong>As capacidades internas são construídas depois.</strong><p>Marque “Criar ou invocar” para abrir o Projeto da Criação. Ataques, Cura, Controle, Movimento e outras funções da própria Criação serão adicionados dentro desse projeto e não precisam ser repetidos como funções externas da ativação.</p>';
    card.appendChild(notice);
  };

  const decorate = () => {
    scheduled = false;
    if (!host) return;
    decorateStandard();
    decorateAdvanced();
    decorateCreationFunctionNotice();
  };

  const schedule = () => {
    if (scheduled) return;
    scheduled = true;
    window.requestAnimationFrame(decorate);
  };

  const start = () => {
    host = document.querySelector('.miracle-studio-host');
    if (!host) {
      window.setTimeout(start, 100);
      return;
    }
    new MutationObserver(schedule).observe(host, { childList: true, subtree: true });
    host.addEventListener('change', schedule);
    schedule();
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, { once: true });
  else start();
})();
