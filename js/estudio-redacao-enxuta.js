(() => {
  'use strict';

  const DATA = window.HarmoniaMiracleStudioData;
  const page = window.location.pathname.split('/').filter(Boolean).pop();
  if (!DATA || page !== 'construcao-guiada.html') return;

  const MAIN_KEY = 'harmonia-caotica:estudio-milagres:v1';
  const DETAIL_KEY = 'harmonia-caotica:estudio-redacao-enxuta:v1';
  const currentScript = document.currentScript;
  const scriptBase = currentScript?.src ? new URL('.', currentScript.src) : new URL('../js/', document.baseURI);
  let host;
  let scheduled = false;
  let decorating = false;

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

  const mainState = () => readJson(MAIN_KEY, {});
  const detail = { answers: {}, whatsappMode: 'complete', ...readJson(DETAIL_KEY, {}) };
  if (!detail.answers || typeof detail.answers !== 'object') detail.answers = {};

  const save = () => writeJson(DETAIL_KEY, detail);

  const ensureStylesheet = () => {
    if (document.getElementById('lean-writing-style')) return;
    const link = document.createElement('link');
    link.id = 'lean-writing-style';
    link.rel = 'stylesheet';
    link.href = new URL('../css/estudio-redacao-enxuta.css?v=20260720j', scriptBase).href;
    document.head.appendChild(link);
  };

  const question = (id, label, ask, example, required = true, group = 'base') => ({ id, label, ask, example, required, group });

  const baseQuestions = (state) => {
    const questions = [
      question(
        'appearance',
        'Como o Milagre aparece na cena?',
        'Descreva apenas a manifestação visível, sonora ou sensorial. Este campo melhora a apresentação, mas não cria funções mecânicas.',
        'Fios rubros se unem e formam uma serpente translúcida ao redor do alvo.',
        false
      ),
      question(
        'application',
        'Onde o Milagre começa e o que ele escolhe?',
        'Diga qual alvo, ponto ou Área recebe a ativação inicial. Alcance e quantidade já foram comprados; aqui basta tornar a aplicação inequívoca.',
        'O usuário escolhe uma criatura visível a até 15 metros, e a manifestação surge no espaço livre mais próximo dela.'
      ),
      question(
        'result',
        'O que muda quando o Milagre é ativado?',
        'Declare o resultado mecânico principal com o Valor utilizado. Não descreva como adversários deveriam reagir.',
        'A criatura escolhida recupera Vida igual à Potência 12 e fica ligada ao usuário pela Duração.'
      )
    ];

    if (state.duration && state.duration !== 'Instantânea') {
      questions.push(question(
        'continuity',
        'O que permanece disponível durante a Duração?',
        'Explique somente o que continua funcionando ou pode ser usado novamente. A Duração já determina quando a manifestação deixa de permanecer ativa.',
        'A ligação continua visível e permite transferir Vida novamente quando uma capacidade registrada for utilizada.',
        true
      ));
    }

    return questions;
  };

  const functionQuestions = {
    value: [
      question('valueRule', 'Qual Valor é alterado e como a Potência é aplicada?', 'Nomeie Vida, Resistência, Reserva ou outro Valor e diga se ele aumenta, diminui, restaura, divide ou se torna uma Reserva.', 'Restaura a Vida atual do alvo em quantidade igual à Potência 12.', true, 'value')
    ],
    space: [
      question('movementRule', 'Quem se move, quanto se move e a partir de onde?', 'Diferencie Movimento próprio, Deslocamento de outro alvo e transporte. Informe a distância por oportunidade.', 'A Criação move a si mesma até 15 metros a partir da posição atual quando usa seu Movimento.', true, 'space')
    ],
    creation: [
      question('creationProfile', 'Qual é o perfil mecânico da Criação?', 'Registre forma, ocupação, Resistência e quantidade ativa. Não invente fraquezas ou maneiras obrigatórias de derrotá-la.', 'Uma serpente de sangue ocupa um espaço comum, possui Resistência 12 e apenas uma manifestação pode permanecer ativa.', true, 'creation'),
      question('creationCapabilities', 'Quais capacidades a Criação realmente possui?', 'Liste somente Movimento, sentidos, comunicação, ataques e funções compradas no Projeto da Criação.', 'Possui Movimento de 15 metros, comunicação recebida e as capacidades Mordida Rubra e Guarda Vital.', true, 'creation')
    ],
    propagation: [
      question('propagationPath', 'De onde parte cada novo Passo e o que pode recebê-lo?', 'Defina Fonte, Destino, caminho e ocorrência que consome um Passo.', 'Cada Passo parte de uma criatura já vinculada e alcança outra criatura viva tocada por ela.', true, 'propagation'),
      question('propagationResources', 'O que as manifestações propagadas compartilham?', 'Registre Potência, Reserva, Duração e quantidade máxima apenas quando forem compartilhadas.', 'Todos os vínculos dividem a mesma Reserva e conservam a Duração restante da ativação original.', true, 'propagation')
    ],
    traversal: [
      question('traversalRoute', 'Quais origem e destino podem ser usados?', 'Defina os pontos ou vínculos exigidos pela Travessia, sem listar estratégias para bloqueá-la.', 'A origem e o destino precisam ser sombras que o usuário consiga perceber.', true, 'traversal'),
      question('traversalPassengers', 'Quem atravessa e o que acompanha?', 'Declare usuário, alvos, equipamentos e Criações transportados pela mesma aplicação.', 'O usuário e até dois Alvos Completos atravessam com seus equipamentos carregados.', true, 'traversal')
    ],
    transformation: [
      question('changedStructure', 'O que é transformado e qual função nova surge?', 'Nomeie partes, matéria, Escala e capacidades alteradas.', 'Os braços tornam-se asas funcionais e concedem Movimento de voo comprado.', true, 'transformation'),
      question('preservedStructure', 'O que permanece inalterado?', 'Registre somente elementos cuja preservação possa gerar dúvida real.', 'A identidade, a Vida atual e os demais órgãos permanecem inalterados.', false, 'transformation')
    ],
    control: [
      question('exactOrder', 'Qual ordem, emoção ou instrução é imposta?', 'Escreva o conteúdo exato que será apresentado durante o jogo.', 'Proteja-me da melhor maneira que puder.', true, 'control'),
      question('decisionBoundary', 'Que decisões continuam pertencendo ao alvo?', 'Diferencie aquilo que o usuário determina daquilo que o alvo ainda escolhe.', 'O alvo escolhe posição, arma e método; o usuário determina apenas que deve protegê-lo.', true, 'control'),
      question('controlConsumption', 'O que consome cada Uso?', 'Defina nova ordem, mudança de decisão ou oportunidade que reduz os Usos internos.', 'Cada nova ordem diferente consome 1 Uso; manter a mesma ordem não consome outro.', true, 'control')
    ],
    resources: [
      question('resourcePath', 'Qual recurso passa de onde para onde?', 'Nomeie recurso, origem, destino e quantidade máxima por aplicação.', 'Transfere até 12 pontos de Vida atual do usuário para uma criatura sanguineamente vinculada.', true, 'resources'),
      question('resourceConservation', 'Como o total é conservado?', 'Explique limites objetivos, como máximo do destino ou quantidade disponível na origem.', 'O usuário não transfere mais Vida do que possui, e o destino não ultrapassa sua Vida máxima.', true, 'resources')
    ],
    information: [
      question('informationQuestion', 'Qual pergunta a percepção responde?', 'Escolha uma informação precisa: presença, classificação, identidade, estado ou conteúdo profundo.', 'Revela se existe uma criatura viva marcada dentro do Alcance.', true, 'information'),
      question('informationChannel', 'Como a informação chega ao usuário?', 'Declare visão, som, sonho, vínculo, Marca, Criação ou outro Canal comprado.', 'A posição aparece como um pulso luminoso visível apenas através da Marca.', true, 'information')
    ],
    protection: [
      question('protectedThreat', 'O que é protegido e contra qual função?', 'Nomeie o alvo protegido e a ameaça compatível.', 'Protege uma criatura contra Dano Direto causado por projéteis físicos.', true, 'protection'),
      question('protectionResolution', 'Como a proteção utiliza seu Valor?', 'Explique redução, Reserva, barreira, redirecionamento ou reflexão.', 'Reduz o dano pelo Valor 12; qualquer excesso continua até o alvo.', true, 'protection')
    ],
    combat: [
      question('combatTrigger', 'Qual acontecimento permite a atuação?', 'Descreva um gatilho observável apenas quando o Milagre usa Reação ou atuação Condicionada.', 'Quando uma criatura visível declara um ataque contra o alvo protegido.', true, 'combat'),
      question('combatOpportunity', 'Qual oportunidade é utilizada?', 'Diga Ação, Movimento, Reação, Ação Própria ou aplicação Condicionada e quantas vezes pode ocorrer.', 'O usuário gasta sua Reação e só pode responder uma vez entre seus Turnos.', true, 'combat')
    ],
    damage: [
      question('damageResolution', 'Que integridade recebe o dano e qual Valor é aplicado?', 'Diferencie Vida, Resistência, Reserva, Ferimento ou Condição.', 'Reduz a Vida atual do alvo em 12 pontos.', true, 'damage'),
      question('damageExtra', 'Existe alguma consequência comprada além do dano?', 'Preencha somente quando houver Ferimento, Condição, colisão ou restrição adicional.', 'Além do dano, impõe Sangramento pela capacidade registrada.', false, 'damage')
    ],
    healing: [
      question('healingResolution', 'O que é restaurado e em qual quantidade?', 'Diferencie Vida, Resistência, estrutura, Ferimento, Condição, corpo ou identidade.', 'Restaura 12 pontos da Vida atual de uma criatura viva.', true, 'healing'),
      question('healingSpecial', 'Existe restauração além de Vida comum?', 'Preencha apenas quando Tratamento, Regeneração, Preservação ou Retorno tiver sido comprado.', 'Reconstrói o membro perdido por Regeneração Estrutural.', false, 'healing')
    ],
    costs: [
      question('costPayment', 'Qual recurso é consumido e quando?', 'Nomeie a fonte, a quantidade e o momento do pagamento.', 'Consome 3 unidades da Reserva de Sangue no momento da ativação.', true, 'costs'),
      question('costRecovery', 'Como esse recurso específico retorna?', 'Preencha somente quando a recuperação não estiver definida por uma regra geral.', 'A Reserva recupera 1 unidade após um descanso completo.', false, 'costs')
    ]
  };

  const selectedQuestions = () => {
    const state = mainState();
    const groups = (state.functions || []).flatMap((id) => functionQuestions[id] || []);
    return [...baseQuestions(state), ...groups];
  };

  const answer = (id) => String(detail.answers[id] || '');
  const setAnswer = (id, value) => { detail.answers[id] = value; };

  const vaguePatterns = [
    /\betc\.?\b/i,
    /da melhor (forma|maneira)/i,
    /conforme (a|o) situa[cç][aã]o/i,
    /quando necess[aá]rio/i,
    /o mestre decide/i,
    /meios adequados/i,
    /funciona normalmente/i,
    /pode fazer qualquer/i,
    /e outros/i,
    /se for preciso/i,
    /de alguma forma/i
  ];

  const isVague = (value) => vaguePatterns.some((pattern) => pattern.test(value)) || (value.trim().length > 0 && value.trim().length < 14);

  const quality = () => {
    const questions = selectedQuestions();
    const required = questions.filter((item) => item.required);
    const missing = required.filter((item) => !answer(item.id).trim());
    const vague = questions.filter((item) => answer(item.id).trim() && isVague(answer(item.id)));
    return { total: required.length, complete: required.length - missing.length, missing, vague };
  };

  const questionMarkup = (item) => {
    const value = answer(item.id);
    return `<article class="writing-question lean-writing-question ${value.trim() ? 'is-answered' : ''} ${value.trim() && isVague(value) ? 'is-vague' : ''}">
      <header><div><span>${item.group === 'base' ? 'Funcionamento' : 'Detalhe da função'}</span><h4>${esc(item.label)}</h4></div><strong>${item.required ? 'Necessário' : 'Opcional'}</strong></header>
      <p>${esc(item.ask)}</p>
      <label><span>Resposta objetiva</span><textarea rows="3" data-lean-writing="${esc(item.id)}" placeholder="${esc(item.example)}">${esc(value)}</textarea></label>
      <details><summary>Ver exemplo</summary><p>${esc(item.example)}</p></details>
    </article>`;
  };

  const qualityMarkup = () => {
    const result = quality();
    const ready = !result.missing.length && !result.vague.length;
    return `<aside class="writing-quality lean-quality" data-status="${ready ? 'ready' : result.complete ? 'partial' : 'weak'}">
      <header><div><span>Detalhes necessários</span><strong>${result.complete} de ${result.total}</strong></div><div class="writing-quality__track"><span style="width:${result.total ? Math.round((result.complete / result.total) * 100) : 100}%"></span></div></header>
      <p>${ready ? 'O funcionamento pode ser montado sem preencher contrajogo ou fraquezas.' : `${result.missing.length} detalhe${result.missing.length === 1 ? '' : 's'} necessário${result.missing.length === 1 ? '' : 's'} ainda falta${result.missing.length === 1 ? '' : 'm'}.`}</p>
      ${result.missing.length ? `<details><summary>Ver o que falta</summary><ul>${result.missing.map((item) => `<li>${esc(item.label)}</li>`).join('')}</ul></details>` : ''}
      ${result.vague.length ? `<details><summary>${result.vague.length} resposta${result.vague.length === 1 ? '' : 's'} ainda vaga${result.vague.length === 1 ? '' : 's'}</summary><ul>${result.vague.map((item) => `<li>${esc(item.label)}</li>`).join('')}</ul></details>` : ''}
    </aside>`;
  };

  const workshopMarkup = () => {
    const state = mainState();
    const all = selectedQuestions();
    const base = all.filter((item) => item.group === 'base');
    const groups = (state.functions || []).map((id) => {
      const fn = DATA.functions.find((item) => item.id === id);
      const questions = all.filter((item) => item.group === id);
      if (!questions.length) return '';
      return `<section class="writing-function-group"><header><div><span>Função selecionada</span><h4>${esc(fn?.name || id)}</h4></div><p>${esc(fn?.short || '')}</p></header><div class="writing-question-grid">${questions.map(questionMarkup).join('')}</div></section>`;
    }).join('');

    return `<section class="writing-workshop writing-workshop--lean" aria-labelledby="lean-workshop-title">
      <header class="writing-workshop__header"><div><span>Oficina de funcionamento</span><h3 id="lean-workshop-title">Defina somente o que o poder faz</h3><p>O jogador descreve aplicação, resultado e capacidades compradas. Resistência, encerramento, fraquezas e estratégias adversárias pertencem às regras gerais e às decisões tomadas durante o jogo.</p></div>${qualityMarkup()}</header>
      <details open><summary><span>1</span><div><strong>Aplicação principal</strong><small>Manifestação, destino e resultado concreto.</small></div></summary><div class="writing-details-body"><div class="writing-question-grid">${base.map(questionMarkup).join('')}</div></div></details>
      ${groups ? `<details open><summary><span>2</span><div><strong>Detalhes das funções</strong><small>Apenas informações que alteram o funcionamento da habilidade.</small></div></summary><div class="writing-details-body">${groups}</div></details>` : ''}
      <footer class="writing-actions"><div><strong>O texto técnico será curto.</strong><p>O Estúdio reúne as respostas sem acrescentar fraquezas, contrajogo obrigatório ou condições redundantes.</p></div><div><button type="button" data-lean-build>Montar funcionamento</button></div></footer>
    </section>`;
  };

  const sentence = (value) => {
    const clean = String(value || '').trim();
    if (!clean) return '';
    return /[.!?…]$/.test(clean) ? clean : `${clean}.`;
  };

  const generatedEffect = () => {
    const state = mainState();
    const paragraphs = [];
    const application = sentence(answer('application'));
    const result = sentence(answer('result'));
    const continuity = sentence(answer('continuity'));
    if (application) paragraphs.push(application);
    if (result) paragraphs.push(result);
    if (continuity) paragraphs.push(continuity);

    (state.functions || []).forEach((id) => {
      const fn = DATA.functions.find((item) => item.id === id);
      const values = (functionQuestions[id] || []).map((item) => sentence(answer(item.id))).filter(Boolean);
      if (values.length) paragraphs.push(`${fn?.name || id}: ${values.join(' ')}`);
    });

    return paragraphs.join('\n\n');
  };

  const setMainField = (id, value, overwrite = true) => {
    const control = host?.querySelector(`[data-state="${CSS.escape(id)}"]`);
    if (!control) return;
    if (!overwrite && control.value.trim()) return;
    if (control.value === value) return;
    control.value = value;
    control.dispatchEvent(new Event('input', { bubbles: true }));
  };

  const applySystemDefaults = () => {
    const state = mainState();
    if (state.duration === 'Persistente') {
      setMainField('manifestationLimit', 'Uma manifestação ativa por Milagre.', false);
      setMainField('endCondition', 'Conforme a regra geral da Duração Persistente.', false);
    } else {
      setMainField('endCondition', 'Conforme a Duração.', false);
    }
    setMainField('resistance', 'Interações e oposição seguem as regras gerais do sistema.', false);
    setMainField('success', 'O resultado descrito em Efeito é aplicado.', false);
    setMainField('failure', 'Nenhum resultado adicional é produzido quando os requisitos da ativação não são cumpridos.', false);
    setMainField('limits', 'O Milagre realiza somente as funções e os parâmetros comprados.', false);
  };

  const buildEffect = () => {
    const text = generatedEffect();
    if (!text) return;
    setMainField('effect', text, true);
    applySystemDefaults();
    const button = host.querySelector('[data-lean-build]');
    if (button) {
      const original = button.textContent;
      button.textContent = 'Funcionamento aplicado';
      window.setTimeout(() => { button.textContent = original; }, 1500);
    }
  };

  const hiddenFieldIds = ['resistance', 'success', 'failure', 'limits', 'endCondition'];

  const hideRedundantFields = () => {
    const resolution = host?.querySelector('.studio-module--resolution');
    if (!resolution) return;
    hiddenFieldIds.forEach((id) => resolution.querySelector(`[data-state="${id}"]`)?.closest('.studio-field')?.classList.add('lean-system-field'));
    const persistent = host.querySelector('[data-state="manifestationLimit"]')?.closest('.studio-conditional');
    if (persistent) persistent.classList.add('lean-system-field');

    const effectField = resolution.querySelector('[data-state="effect"]')?.closest('.studio-field');
    if (effectField && !effectField.querySelector('.lean-effect-note')) {
      const label = effectField.querySelector(':scope > span');
      if (label) label.textContent = 'Funcionamento final do Milagre';
      effectField.insertAdjacentHTML('beforeend', '<aside class="lean-effect-note"><strong>Não inclua uma solução para o adversário.</strong><p>Este texto registra somente aquilo que a ativação produz. Interações, oposição e estratégias são resolvidas pelas regras gerais durante o jogo.</p></aside>');
    }
  };

  const filterValidation = () => {
    const validation = host?.querySelector('.studio-validation');
    if (!validation) return;
    const redundant = /resistido|superado|sucesso e falha|limites explícitos|forma clara de encerramento/i;
    validation.querySelectorAll('li').forEach((item) => {
      if (redundant.test(item.textContent)) item.remove();
    });
    validation.querySelectorAll('details').forEach((details) => {
      const count = details.querySelectorAll('li').length;
      if (!count) details.remove();
      else {
        const summary = details.querySelector('summary');
        if (summary) summary.textContent = `${count} ponto${count === 1 ? '' : 's'} de atenção`;
      }
    });
  };

  const stripSection = (text, heading) => {
    const escapedHeading = heading.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const expression = new RegExp(`\\n${escapedHeading}\\n\\n[\\s\\S]*?(?=\\n[A-ZÁÀÂÃÉÊÍÓÔÕÚÜÇ][A-ZÁÀÂÃÉÊÍÓÔÕÚÜÇ0-9 —–-]{2,}\\n|$)`, 'g');
    return text.replace(expression, '');
  };

  const cleanPlain = (plain) => {
    let text = String(plain || '');
    ['RESISTÊNCIA', 'SUCESSO', 'FALHA', 'LIMITES', 'ENCERRAMENTO'].forEach((heading) => { text = stripSection(text, heading); });

    const appearance = sentence(answer('appearance'));
    if (appearance && !text.includes('\nAPRESENTAÇÃO\n')) {
      const marker = '\nDESCRIÇÃO\n';
      const index = text.indexOf(marker);
      text = index >= 0
        ? `${text.slice(0, index)}\n\nAPRESENTAÇÃO\n\n${appearance}\n${text.slice(index)}`
        : `${text}\n\nAPRESENTAÇÃO\n\n${appearance}`;
    }

    const cadence = window.HarmoniaCadence?.current;
    if (cadence) {
      text = text.replace(/^Cadência:.*$/m, `Cadência: ${cadence.label}${cadence.bonus ? ` — +${cadence.bonus} pontos de orçamento` : ''}`);
      if (cadence.value === 'Ritual') text = text.replace(/^Ativação:.*$/m, 'Ativação: Ritual — pelo menos 10 minutos');
    }

    return text.replace(/\n{3,}/g, '\n\n').trim();
  };

  const cleanPlainExport = () => {
    const area = host?.querySelector('#studio-export-text');
    if (!area?.value) return '';
    const next = cleanPlain(area.value);
    if (next !== area.value) area.value = next;
    return area.value;
  };

  const isHeading = (line) => /^[A-ZÁÀÂÃÉÊÍÓÔÕÚÜÇ0-9][A-ZÁÀÂÃÉÊÍÓÔÕÚÜÇ0-9 —–-]{2,}$/.test(line) && !line.includes(':');

  const whatsappFull = (plain) => {
    const output = [];
    let first = true;
    let section = '';
    for (const raw of cleanPlain(plain).split('\n')) {
      const trimmed = raw.trim();
      if (!trimmed) {
        if (output.at(-1) !== '') output.push('');
        continue;
      }
      if (first) {
        output.push('╭━━━━━━━━━━━━━━━━━━╮');
        output.push(`✦ *${trimmed.replace(/^✦\s*/, '')}*`);
        output.push('╰━━━━━━━━━━━━━━━━━━╯');
        first = false;
        continue;
      }
      if (isHeading(trimmed)) {
        section = trimmed;
        output.push('', '━━━━━━━━━━━━━━━━━━', `✦ *${trimmed}*`, '━━━━━━━━━━━━━━━━━━');
        continue;
      }
      const label = trimmed.match(/^([^:]{2,45}):\s*(.+)$/);
      if (label) {
        output.push(`${section === 'CUSTOS' ? '•' : '>'} *${label[1]}:* ${label[2]}`);
        continue;
      }
      if (/^\d+\.\s/.test(trimmed) || /^[-•]\s/.test(trimmed)) {
        output.push(`• ${trimmed.replace(/^[-•]\s*/, '')}`);
        continue;
      }
      output.push(trimmed);
    }
    return output.join('\n').replace(/\n{3,}/g, '\n\n').trim();
  };

  const findOption = (options, value) => options?.find((item) => String(item.value) === String(value));

  const targetLabel = (state) => {
    if (state.targetMode === 'one') return 'Um alvo';
    if (state.targetMode === 'shared') return `Compartilhados — ${findOption(DATA.core.sharedTargets, state.targetCount)?.label || state.targetCount}`;
    if (state.targetMode === 'complete') return `Completos — ${findOption(DATA.core.completeTargets, state.targetCount)?.label || state.targetCount}`;
    return `Área — ${findOption(DATA.core.area, state.area)?.label || 'indefinida'}`;
  };

  const extractHeritageTitle = (plain) => {
    const block = plain.match(/HERANÇA DA VERTENTE\s+([\s\S]*?)(?=\n[A-ZÁÀÂÃÉÊÍÓÔÕÚÜÇ][A-ZÁÀÂÃÉÊÍÓÔÕÚÜÇ —–-]{3,}\n|$)/);
    if (!block) return '';
    return block[1].split('\n').map((line) => line.trim()).find(Boolean) || '';
  };

  const whatsappCombat = (plain) => {
    const state = mainState();
    const heritage = extractHeritageTitle(plain);
    const functions = (state.functions || []).map((id) => DATA.functions.find((item) => item.id === id)?.name).filter(Boolean).join(' / ');
    const cadence = window.HarmoniaCadence?.current || { label: state.cadence || 'Comum', bonus: 0, value: state.cadence || 'Comum' };
    const activation = cadence.value === 'Ritual' ? 'Ritual — pelo menos 10 minutos' : state.activation || '—';
    const effect = state.effect?.trim() || generatedEffect() || 'Não definido.';

    return `╭━━━━━━━━━━━━━━━━━━╮\n✦ *${String(state.name || 'MILAGRE SEM NOME').toUpperCase()}*\n╰━━━━━━━━━━━━━━━━━━╯\n_${state.deity || 'Divindade'} • ${state.domain || 'Domínio'} — ${state.branch || 'Vertente'}_\n\n> *Rank:* ${state.rank || '—'}\n> *Potência:* ${findOption(DATA.core.potency, state.potency)?.label || 'Não definida'}\n> *Ativação:* ${activation}\n> *Alcance:* ${state.range || '—'}\n> *Destino:* ${targetLabel(state)}\n> *Duração:* ${state.duration || '—'}\n> *Cadência:* ${cadence.label}${cadence.bonus ? ` (+${cadence.bonus} pts)` : ''}\n> *Função:* ${functions || 'Não definida'}${heritage ? `\n> *Herança:* ${heritage}` : ''}\n\n━━━━━━━━━━━━━━━━━━\n✦ *FUNCIONAMENTO*\n━━━━━━━━━━━━━━━━━━\n${effect}`;
  };

  const whatsappCosts = (plain) => {
    const state = mainState();
    const match = cleanPlain(plain).match(/\nCUSTOS\n\n([\s\S]*?)\n\nTOTAL:\s*([^\n]+)/);
    const costs = match?.[1]?.split('\n').filter(Boolean) || [];
    const total = match?.[2] || 'Não calculado';
    const cadence = window.HarmoniaCadence?.current;
    return `✦ *CUSTOS — ${String(state.name || 'MILAGRE').toUpperCase()}*\n\n${costs.map((line) => {
      const parts = line.match(/^(.+):\s*(.+)$/);
      return parts ? `• *${parts[1]}:* ${parts[2]}` : `• ${line}`;
    }).join('\n')}${cadence?.bonus ? `\n\n• *Bônus de Cadência:* +${cadence.bonus} pontos de orçamento` : ''}\n\n━━━━━━━━━━━━━━━━━━\n*TOTAL:* ${total}`;
  };

  const whatsappText = (plain) => {
    if (detail.whatsappMode === 'combat') return whatsappCombat(plain);
    if (detail.whatsappMode === 'costs') return whatsappCosts(plain);
    return whatsappFull(plain);
  };

  const previewHtml = (text) => esc(text)
    .replace(/\*([^*\n]+)\*/g, '<strong>$1</strong>')
    .replace(/_([^_\n]+)_/g, '<em>$1</em>')
    .replace(/^&gt;\s?/gm, '<span class="wa-quote">')
    .replace(/(<span class="wa-quote">[^\n]*)(?=\n|$)/g, '$1</span>')
    .replace(/\n/g, '<br>');

  const whatsappMarkup = (plain) => {
    const value = whatsappText(plain);
    const modes = [['complete', 'Ficha completa'], ['combat', 'Cartão de combate'], ['costs', 'Somente custos']];
    return `<section class="whatsapp-export whatsapp-export--lean" aria-labelledby="lean-whatsapp-title" data-lean-signature="${esc(String(value.length))}">
      <header><div><span>Exportação social</span><h3 id="lean-whatsapp-title">Versão para WhatsApp</h3><p>A mensagem apresenta somente o funcionamento do Milagre. Não inclui respostas obrigatórias para o adversário.</p></div><div class="whatsapp-mode">${modes.map(([id, label]) => `<button type="button" data-lean-whatsapp-mode="${id}" aria-pressed="${detail.whatsappMode === id}">${label}</button>`).join('')}</div></header>
      <div class="whatsapp-layout"><div class="whatsapp-phone"><div class="whatsapp-phone__bar"><span>Harmonia Caótica</span><small>prévia da mensagem</small></div><div class="whatsapp-wall"><article class="whatsapp-bubble">${previewHtml(value)}<time>22:17 ✓✓</time></article></div></div><label class="whatsapp-raw"><span>Texto com formatação do WhatsApp</span><textarea readonly rows="22" data-lean-whatsapp-text>${esc(value)}</textarea></label></div>
      <footer><button type="button" data-copy-lean-whatsapp>Copiar versão para WhatsApp</button><p>O cartão de combate foi reduzido para consulta rápida durante a sessão.</p></footer>
    </section>`;
  };

  const replaceWorkshop = () => {
    const resolution = host?.querySelector('.studio-module--resolution');
    if (!resolution) return;
    const existing = resolution.previousElementSibling;
    if (existing?.classList.contains('writing-workshop--lean')) return;
    if (existing?.classList.contains('writing-workshop')) existing.outerHTML = workshopMarkup();
    else resolution.insertAdjacentHTML('beforebegin', workshopMarkup());
  };

  const replaceWhatsapp = () => {
    const exportField = host?.querySelector('.studio-export');
    if (!exportField) return;
    const plain = cleanPlainExport();
    let panel = exportField.nextElementSibling;
    const markup = whatsappMarkup(plain);
    if (panel?.classList.contains('whatsapp-export--lean')) {
      const nextText = whatsappText(plain);
      const area = panel.querySelector('[data-lean-whatsapp-text]');
      if (area?.value !== nextText) panel.outerHTML = markup;
      return;
    }
    if (panel?.classList.contains('whatsapp-export')) panel.outerHTML = markup;
    else exportField.insertAdjacentHTML('afterend', markup);
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

  const handleInput = (event) => {
    const control = event.target.closest('[data-lean-writing]');
    if (!control) return;
    setAnswer(control.dataset.leanWriting, control.value);
    save();
    window.clearTimeout(handleInput.timer);
    handleInput.timer = window.setTimeout(() => {
      const qualityNode = host.querySelector('.lean-quality');
      if (qualityNode) qualityNode.outerHTML = qualityMarkup();
      const card = control.closest('.lean-writing-question');
      if (card) {
        card.classList.toggle('is-answered', Boolean(control.value.trim()));
        card.classList.toggle('is-vague', Boolean(control.value.trim()) && isVague(control.value));
      }
    }, 100);
  };

  const handleClick = async (event) => {
    if (event.target.closest('[data-lean-build]')) {
      event.preventDefault();
      event.stopImmediatePropagation();
      buildEffect();
      return;
    }

    const mode = event.target.closest('[data-lean-whatsapp-mode]');
    if (mode) {
      detail.whatsappMode = mode.dataset.leanWhatsappMode;
      save();
      const panel = mode.closest('.whatsapp-export--lean');
      if (panel) panel.outerHTML = whatsappMarkup(cleanPlainExport());
      return;
    }

    const copy = event.target.closest('[data-copy-lean-whatsapp]');
    if (copy) {
      await copyText(host.querySelector('[data-lean-whatsapp-text]')?.value || '');
      const original = copy.textContent;
      copy.textContent = 'Mensagem copiada';
      window.setTimeout(() => { copy.textContent = original; }, 1500);
    }
  };

  const decorate = () => {
    scheduled = false;
    if (!host || decorating) return;
    decorating = true;
    try {
      applySystemDefaults();
      replaceWorkshop();
      hideRedundantFields();
      filterValidation();
      cleanPlainExport();
      replaceWhatsapp();
    } finally {
      decorating = false;
    }
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
      window.setTimeout(start, 80);
      return;
    }
    new MutationObserver(schedule).observe(host, { childList: true, subtree: true });
    host.addEventListener('input', handleInput);
    host.addEventListener('click', handleClick, true);
    host.addEventListener('change', schedule);
    schedule();
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, { once: true });
  else start();
})();
