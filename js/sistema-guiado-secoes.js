(() => {
  'use strict';
  const context = window.HarmoniaSystemGuideContext;
  if (!context || document.documentElement.dataset.sectionCompassLoaded === 'true') return;
  document.documentElement.dataset.sectionCompassLoaded = 'true';

  const { article, profile, clean, escapeHtml } = context;
  const shorten = (value, limit = 320) => {
    const text = clean(value);
    if (text.length <= limit) return text;
    const slice = text.slice(0, limit);
    const space = slice.lastIndexOf(' ');
    return `${slice.slice(0, Math.max(space, limit - 24))}…`;
  };

  const hint = (title, text) => {
    const source = `${title} ${text}`.toLowerCase();
    if (/custo|ponto|potência|valor|reserva|sacrif/.test(source)) return 'Anote valor, custo, consumo e recuperação. Nenhum desses campos substitui outro.';
    if (/alcance|alvo|área|espaço|movimento|escala/.test(source)) return 'Declare origem, destino, distância, quantidade, seleção, entrada e saída.';
    if (/duração|cadência|uso|sustenta|encerr/.test(source)) return 'Separe permanência, frequência, oportunidades, consumo e encerramento.';
    if (/controle|influência|compulsão|dominação|via|posse/.test(source)) return 'Identifique Autoridade, Via, oportunidade e o acontecimento que consome cada Uso.';
    if (/reação|ação|gatilho|turno|oportunidade/.test(source)) return 'Defina quem atua e se a resolução ocorre antes, durante ou depois do gatilho.';
    if (/resist|oposi|neutral|proteção|conflito/.test(source)) return 'Declare a oposição, os Valores comparados e aquilo que permanece depois.';
    if (/ferimento|condição|dano|derrota|cura|retorno/.test(source)) return 'Separe perda numérica, estado, consequência, tratamento e encerramento.';
    return 'Transforme os verbos em campos verificáveis: quem faz, o que muda, quando ocorre, quanto custa e como termina.';
  };

  const question = (heading) => {
    if (profile.sectionQuestions?.[heading.id]) return profile.sectionQuestions[heading.id];
    const title = clean(heading.textContent);
    const lower = title.toLowerCase();
    if (/limite|não pode|não pertence/.test(lower)) return `Qual aplicação esta seção impede em “${title}”?`;
    if (/exemplo/.test(lower)) return 'Qual parte do exemplo corresponde a cada compra declarada?';
    if (/registro|ficha|perfil/.test(lower)) return 'Quais campos precisam aparecer para avaliar esta função?';
    if (/resumo|fundamento|visão rápida/.test(lower)) return 'Quais princípios não podem ser perdidos na leitura completa?';
    return `O que precisa estar explícito para aplicar “${title}”?`;
  };

  const firstParagraph = (section, heading) => {
    let node = heading.nextElementSibling;
    while (node) {
      if (node.matches('p') && !node.classList.contains('section-kicker')) return clean(node.textContent);
      if (node.matches('h2')) break;
      node = node.nextElementSibling;
    }
    return clean(section.querySelector(':scope > p:not(.section-kicker), .domain-boundary p, .domain-guide p')?.textContent || '');
  };

  article.querySelectorAll('.domain-section').forEach((section) => {
    if (section.dataset.sectionCompass === 'true') return;
    const heading = section.querySelector(':scope > h2');
    if (!heading) return;
    const summary = firstParagraph(section, heading);
    if (!summary) return;
    const boundary = clean(section.querySelector('.domain-boundary strong, .lore-box strong, .domain-guide strong')?.textContent || '');
    const details = document.createElement('details');
    details.className = 'section-compass';
    details.innerHTML = `
      <summary><span>Entender esta seção</span><strong>${escapeHtml(question(heading))}</strong></summary>
      <div class="section-compass__body">
        <div><span>Em termos diretos</span><p>${escapeHtml(shorten(summary))}</p></div>
        ${boundary && !summary.includes(boundary) ? `<div><span>Limite destacado</span><p>${escapeHtml(shorten(boundary, 220))}</p></div>` : ''}
        <div><span>Para aplicar</span><p>${escapeHtml(hint(clean(heading.textContent), summary))}</p></div>
      </div>`;
    heading.insertAdjacentElement('afterend', details);
    section.dataset.sectionCompass = 'true';
  });
})();
