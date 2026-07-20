(() => {
  'use strict';

  const DATA = window.HarmoniaMiracleStudioData;
  if (!DATA || window.location.pathname.split('/').pop() !== 'construcao-guiada.html') return;

  const MAIN_KEY = 'harmonia-caotica:estudio-milagres:v1';
  const DETAIL_KEY = 'harmonia-caotica:estudio-redacao:v1';
  const currentScript = document.currentScript;
  const scriptBase = currentScript?.src ? new URL('.', currentScript.src) : new URL('../js/', document.baseURI);
  let host;
  let scheduled = false;
  let building = false;

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
    } catch {
      return fallback;
    }
  };

  const writeJson = (key, value) => {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* armazenamento opcional */ }
  };

  const mainState = () => readJson(MAIN_KEY, {});

  const defaults = () => ({
    appearance: '',
    activationProcedure: '',
    initialApplication: '',
    opposition: '',
    successResult: '',
    failureResult: '',
    recurrence: '',
    counterplay: '',
    maintenance: '',
    endRule: '',
    exclusions: '',
    answers: {},
    whatsappMode: 'complete'
  });

  let detail = { ...defaults(), ...readJson(DETAIL_KEY, {}) };
  if (!detail.answers || typeof detail.answers !== 'object') detail.answers = {};

  const save = () => writeJson(DETAIL_KEY, detail);

  const ensureStylesheet = () => {
    if (document.getElementById('miracle-studio-writing-style')) return;
    const link = document.createElement('link');
    link.id = 'miracle-studio-writing-style';
    link.rel = 'stylesheet';
    link.href = new URL('../css/estudio-redacao-whatsapp.css?v=20260720g', scriptBase).href;
    document.head.appendChild(link);
  };

  const globalQuestions = [
    {
      id: 'appearance',
      label: 'Como o Milagre se manifesta?',
      ask: 'Descreva apenas aquilo que os personagens percebem quando o poder surge.',
      example: 'Fios rubros escapam das palmas do usuário e formam uma serpente translúcida ao redor do aliado.',
      avoid: '“Uma energia aparece” ou apenas o nome do poder.',
      required: true,
      destination: 'appearance'
    },
    {
      id: 'activationProcedure',
      label: 'O que o usuário faz ao ativar?',
      ask: 'Informe gesto, palavra, toque, escolha e qualquer requisito que precise existir naquele momento.',
      example: 'O usuário aponta para uma criatura visível e pronuncia seu nome, escolhendo-a como alvo do vínculo.',
      avoid: '“Ele usa o poder” ou requisitos que só aparecem depois.',
      required: true,
      destination: 'effect'
    },
    {
      id: 'initialApplication',
      label: 'Onde o efeito começa e quem recebe a primeira aplicação?',
      ask: 'Identifique origem, alvo, ponto ou Área e diga se o efeito acompanha alguém ou permanece no lugar.',
      example: 'A manifestação surge em um ponto livre a até 15 metros e permanece vinculada ao alvo escolhido.',
      avoid: '“Afeta os inimigos próximos” sem distância, seleção ou Área.',
      required: true,
      destination: 'effect'
    },
    {
      id: 'opposition',
      label: 'Qual oposição é realizada?',
      ask: 'Diga qual Valor enfrenta a Potência, quando a comparação ocorre e se ela pode voltar a acontecer.',
      example: 'Na aplicação, o alvo compara sua Resistência Mental com a Potência 12. A comparação se repete no início de cada Turno em que uma nova ordem for imposta.',
      avoid: '“O alvo pode resistir” sem informar como.',
      required: true,
      destination: 'resistance'
    },
    {
      id: 'successResult',
      label: 'Qual é o resultado exato do sucesso?',
      ask: 'Escreva a mudança concreta, o Valor aplicado e aquilo que passa a ser permitido ou impedido.',
      example: 'No sucesso, o alvo precisa cumprir a ordem durante a oportunidade controlada e 1 Uso é consumido.',
      avoid: '“O poder funciona normalmente”.',
      required: true,
      destination: 'success'
    },
    {
      id: 'failureResult',
      label: 'O que acontece quando a aplicação falha?',
      ask: 'Declare se o efeito não se estabelece, se há resultado parcial e quais recursos ainda são consumidos.',
      example: 'Na falha, nenhuma ordem é imposta, mas a ativação e a Cadência são consumidas; os Usos internos não são gastos.',
      avoid: 'Deixar a falha para decisão posterior do narrador.',
      required: true,
      destination: 'failure'
    },
    {
      id: 'recurrence',
      label: 'O que pode voltar a acontecer durante a Duração?',
      ask: 'Explique aplicações recorrentes, frequência, oportunidade usada e consumo de Reserva ou Usos.',
      example: 'Uma nova ordem pode ser emitida com uma Ação do usuário. Cada decisão diferente consome 1 Uso.',
      avoid: 'Tratar Duração como repetição automática do Valor.',
      required: false,
      destination: 'effect'
    },
    {
      id: 'counterplay',
      label: 'Como outra criatura pode enfrentar o poder depois da ativação?',
      ask: 'Registre fuga, destruição de Âncora, nova oposição, interrupção, quebra de vínculo ou outra resposta válida.',
      example: 'O vínculo termina se o alvo sair do Alcance de manutenção, se a Marca for removida ou se vencer uma nova oposição no início do Turno.',
      avoid: '“Pode ser quebrado por meios adequados”.',
      required: true,
      destination: 'resistance'
    },
    {
      id: 'maintenance',
      label: 'O usuário precisa sustentar alguma coisa?',
      ask: 'Diga se exige concentração, Ação, Reação, canto, contato, Reserva ou nenhuma manutenção.',
      example: 'Não exige concentração. O usuário precisa permanecer consciente apenas para emitir novas ordens.',
      avoid: 'Omitir uma manutenção que será cobrada durante o jogo.',
      required: false,
      destination: 'end'
    },
    {
      id: 'endRule',
      label: 'Quando o Milagre termina?',
      ask: 'Liste todos os encerramentos objetivos: Duração, destruição, perda de vínculo, condição, escolha do usuário ou dissipação.',
      example: 'Termina ao final do Combate, quando a Criação chega a 0 de Resistência ou quando o usuário a encerra durante seu Turno.',
      avoid: '“Quando não for mais necessário”.',
      required: true,
      destination: 'end'
    },
    {
      id: 'exclusions',
      label: 'O que o Milagre explicitamente não faz?',
      ask: 'Registre apenas interpretações perigosas que não estejam resolvidas por Potência, Alcance, Alvos, Área ou Duração.',
      example: 'Não controla memórias, não concede ações adicionais e não atravessa paredes ou Travessias.',
      avoid: 'Listas enormes de obviedades ou “não pode ser abusado”.',
      required: true,
      destination: 'limits'
    }
  ];

  const functionQuestions = {
    value: [
      ['affectedValue', 'Qual valor é alterado?', 'Nomeie Vida, Resistência, Reserva, Potência ou outro valor publicado.', 'Vida atual do alvo.', '“A energia dele”.', 'effect'],
      ['valueOperation', 'Como o Valor da Potência é aplicado?', 'Diga se soma, reduz, restaura, divide, limita ou funciona como oposição.', 'Restaura Vida em quantidade igual à Potência 12.', '“Cura bastante”.', 'effect'],
      ['valueTiming', 'Quantas vezes o Valor é aplicado?', 'Separe aplicação inicial, recorrência, Reserva e limite por alvo.', 'Aplica 12 uma vez na ativação; não se repete durante a Duração.', '“Continua causando 12”.', 'limits']
    ],
    space: [
      ['movedExistence', 'Quem muda de posição?', 'Diferencie Movimento próprio, Deslocamento de outro alvo, transporte e Área móvel.', 'A Criação move a si mesma; passageiros são transportados por Deslocamento.', '“Tudo é levado”.', 'effect'],
      ['movementDistance', 'Qual distância pode ser percorrida?', 'Informe o máximo por oportunidade e a origem da medição.', 'Move até 15 metros a partir da posição atual em sua oportunidade.', '“Move para perto”.', 'effect'],
      ['movementPath', 'Que caminho e obstáculos importam?', 'Declare direção, caminho livre, colisões, quedas e travessias impossíveis.', 'Precisa de caminho livre e para diante de uma parede que não consiga romper.', '“Ignora obstáculos”.', 'limits']
    ],
    creation: [
      ['creationArrival', 'O que a Criação pode fazer no instante em que surge?', 'Separe ocupação, função Contínua, Gatilho preparado e função ativa posterior.', 'Surge ocupando o ponto e inicia sua aura, mas não usa ataque nem Movimento naquele instante.', '“Surge e já realiza todas as ações”.', 'effect'],
      ['creationCapability', 'Quais capacidades realmente foram compradas?', 'Liste apenas sentidos, ataques, proteção, Movimento, comunicação e funções registradas no Projeto.', 'Possui Movimento 15 m, mordida de Potência 12 e comunicação recebida do usuário.', '“Pode agir como uma criatura normal”.', 'limits'],
      ['creationDestruction', 'Como ela é destruída ou perde função?', 'Explique Resistência, Âncora, partes corporais e consequência de chegar a 0.', 'É desfeita quando sua Resistência chega a 0; ferir uma asa não remove o voo sem efeito específico.', '“Pode ser derrotada”.', 'resistance']
    ],
    propagation: [
      ['propagationSource', 'Quais são a Fonte e o novo Destino?', 'Nomeie de onde cada Passo parte e o que pode receber a manifestação.', 'A Fonte é um hospedeiro infectado; o Destino é uma criatura viva tocada por ele.', '“Espalha para outros”.', 'effect'],
      ['propagationStep', 'O que consome um Passo?', 'Declare a ocorrência, a oportunidade e se vários destinos exigem Alvos ou Área.', 'Cada novo hospedeiro consome 1 Passo e uma Ação comandada do usuário.', '“Propaga sempre que puder”.', 'effect'],
      ['propagationResources', 'O que é compartilhado entre as manifestações?', 'Registre Potência, Resistência, Reserva, Duração e quantidade máxima.', 'Todos os focos dividem a mesma Reserva e conservam a Duração restante da ativação original.', '“Cada cópia é igual”.', 'limits']
    ],
    traversal: [
      ['traversalEnds', 'Quais são a origem e o destino válidos?', 'Defina pontos, superfícies, vínculos ou limites necessários.', 'A origem e o destino precisam ser sombras contínuas que o usuário consiga perceber.', '“Teleporta para qualquer lugar”.', 'effect'],
      ['traversalPassengers', 'Quem atravessa e o que acompanha?', 'Separe usuário, alvos, equipamentos, Criações e Área da passagem.', 'O usuário e até dois Alvos Completos atravessam; outras Criações não acompanham.', '“Leva todos consigo”.', 'limits'],
      ['traversalFailure', 'O que impede ou interrompe a Travessia?', 'Declare destino inválido, bloqueio, perda de vínculo e fechamento da passagem.', 'Falha se o destino deixar de existir antes da resolução; ninguém é deslocado.', '“O narrador decide se funciona”.', 'failure']
    ],
    transformation: [
      ['changedStructure', 'O que muda fisicamente ou sobrenaturalmente?', 'Nomeie partes, sistemas, composição, aparência, Escala e funções alteradas.', 'Os braços tornam-se asas funcionais, substituindo temporariamente as mãos.', '“Vira uma criatura”.', 'effect'],
      ['preservedStructure', 'O que permanece igual?', 'Registre identidade, Vida, Resistência, equipamentos, funções e capacidades não alteradas.', 'A identidade, a Vida atual e os demais órgãos permanecem inalterados.', '“Mantém o resto”.', 'limits'],
      ['restorationRule', 'Como a forma original retorna?', 'Diga quando, em que estado e o que acontece com dano ou partes perdidas.', 'Ao terminar, as asas retornam a braços com a mesma proporção de dano sofrido.', '“Volta ao normal”.', 'end']
    ],
    control: [
      ['exactOrder', 'Qual é a ordem, emoção ou instrução exata?', 'Escreva o conteúdo que será apresentado ao alvo durante o jogo.', '“Proteja-me da melhor maneira que puder.”', '“Obedeça tudo”.', 'effect'],
      ['decisionBoundary', 'Quais detalhes o alvo ainda escolhe?', 'Diferencie Influência, Compulsão, Dominação e Via utilizada.', 'Na Compulsão, o alvo escolhe posição, arma e método; o usuário define apenas que deve protegê-lo.', '“O alvo faz o que eu quiser”.', 'limits'],
      ['controlConsumption', 'O que consome cada Uso?', 'Identifique nova ordem, decisão, oportunidade ou alteração da instrução.', 'Cada nova decisão de proteção consome 1 Uso; repetir a decisão atual não consome outro.', '“Gasta quando usar”.', 'effect'],
      ['controlBreak', 'Quando a ordem deixa de valer?', 'Registre oposição recorrente, impossibilidade, conflito, alcance ou fim dos Usos.', 'A ordem termina quando os Usos acabam, a Duração encerra ou o alvo vence a oposição recorrente.', '“Até ele escapar”.', 'end']
    ],
    resources: [
      ['resourceIdentity', 'Qual recurso existente é movido?', 'Nomeie o recurso e sua unidade ou limite.', 'Vida atual, limitada ao Valor 12 por aplicação.', '“Energia vital”.', 'effect'],
      ['resourcePath', 'Quem fornece e quem recebe?', 'Defina origem, destino, vínculo e consentimento quando necessário.', 'O usuário retira Vida de si e transfere ao aliado sanguineamente vinculado.', '“Passa entre aliados”.', 'effect'],
      ['resourceLimit', 'O que impede criação infinita?', 'Registre mínimo da origem, máximo do destino, Reserva e perdas.', 'A origem não pode fornecer mais Vida do que possui, e o destino não supera sua Vida máxima.', '“Não pode abusar”.', 'limits']
    ],
    information: [
      ['informationQuestion', 'Qual pergunta a percepção responde?', 'Especifique presença, classificação, identificação, estado ou informação profunda.', 'Indica se existe uma criatura viva marcada dentro do Alcance.', '“Revela tudo”.', 'effect'],
      ['informationChannel', 'Por qual sentido ou Canal a informação chega?', 'Declare visão, som, sonho, vínculo, Marca, Criação ou ponto remoto.', 'A localização surge como um pulso visível apenas ao usuário através da Marca.', '“O usuário sabe”.', 'effect'],
      ['informationBlock', 'O que pode ocultar, falsificar ou bloquear a leitura?', 'Registre obstáculos, Potência oposta e resultado de uma leitura vencida.', 'Ocultações com Potência superior impedem a identificação, mas ainda revelam que existe interferência.', '“Pode ser escondido”.', 'resistance']
    ],
    protection: [
      ['protectedThreat', 'O que exatamente é protegido?', 'Nomeie alvo, função enfrentada e ameaça compatível.', 'Protege uma criatura contra Dano Direto de projéteis físicos.', '“Protege de ataques”.', 'effect'],
      ['protectionComparison', 'Como os Valores são comparados?', 'Explique redução, neutralização, supressão, dissipação, redirecionamento ou reflexão.', 'Reduz o dano pelo Valor 12; qualquer excesso ainda alcança o alvo.', '“Bloqueia com Potência”.', 'resistance'],
      ['protectionAftermath', 'O que acontece depois da defesa?', 'Declare consumo, permanência, projétil, efeito residual e novas ameaças.', 'A barreira perde Resistência igual ao dano bloqueado e permanece se ainda possuir Resistência.', '“O ataque é anulado”.', 'effect']
    ],
    combat: [
      ['combatTrigger', 'Qual é o gatilho observável?', 'Descreva um acontecimento objetivo e o momento exato da resposta.', 'Quando uma criatura visível declarar um ataque contra o alvo protegido.', '“Quando houver perigo”.', 'effect'],
      ['combatOpportunity', 'Qual oportunidade é gasta?', 'Diga Ação, Movimento, Reação, Ação Própria ou aplicação Condicionada.', 'O usuário gasta sua Reação antes da rolagem de oposição.', '“Ativa automaticamente”.', 'effect'],
      ['combatFrequency', 'Quantas vezes pode responder?', 'Registre limite entre Turnos, Usos, Reserva e repetição do gatilho.', 'Pode responder uma vez entre o início de um Turno do usuário e o início do próximo.', '“Sempre que acontecer”.', 'limits']
    ],
    damage: [
      ['damagePool', 'Qual integridade é reduzida?', 'Diferencie Vida, Resistência, Reserva, Ferimento e Condição.', 'Reduz a Vida atual do alvo pelo Valor 12.', '“Fere o alvo”.', 'effect'],
      ['damageExtra', 'Existe consequência além do dano?', 'Declare Ferimento, Condição, colisão ou restrição e sua compra própria.', 'Se também impuser Sangramento, a Condição possui oposição e Duração separadas.', '“O dano também paralisa”.', 'limits'],
      ['damageZero', 'O que acontece quando o valor chega a 0?', 'Registre Derrota, destruição de Criação, execução ou outra regra publicada.', 'Ao chegar a 0 de Vida, a criatura fica Derrotada; o Milagre não executa por si só.', '“O alvo morre”.', 'limits']
    ],
    healing: [
      ['healingObject', 'O que é restaurado?', 'Diferencie Vida, Resistência, Ferimento, Condição, estrutura, corpo e identidade.', 'Restaura 12 pontos de Vida de uma criatura viva.', '“Cura o alvo”.', 'effect'],
      ['healingLimit', 'Qual limite de recuperação se aplica?', 'Registre Vida máxima, matéria, estrutura, dano recente e recuperação anterior.', 'Não supera a Vida máxima e não reconstrói membros perdidos.', '“Cura completamente”.', 'limits'],
      ['healingImpossible', 'O que exige outra função?', 'Separe Doença, Parasita, maldição, morte, identidade e receptáculo.', 'Não remove Doenças nem realiza Retorno; essas operações exigem funções próprias.', '“Remove todos os males”.', 'limits']
    ],
    costs: [
      ['costResource', 'Qual recurso paga o Milagre?', 'Nomeie a fonte, quantidade e limite máximo.', 'Consome 3 unidades da Reserva de Sangue do usuário.', '“Gasta energia”.', 'effect'],
      ['costTiming', 'Quando o pagamento é consumido?', 'Diferencie ativação, sucesso, nova aplicação, manutenção e encerramento.', 'A ativação é paga antes da oposição; os Usos internos são gastos apenas no sucesso.', '“Gasta ao usar”.', 'effect'],
      ['costRecovery', 'Como o recurso retorna?', 'Declare Recarga, condição, descanso, sacrifício ou ausência de recuperação.', 'A Reserva recupera 1 unidade ao final de cada descanso completo e não pode superar 6.', '“Recupera depois”.', 'limits']
    ]
  };

  const questionObject = (raw) => ({
    id: raw[0],
    label: raw[1],
    ask: raw[2],
    example: raw[3],
    avoid: raw[4],
    destination: raw[5],
    required: true
  });

  const selectedFunctionQuestions = () => {
    const state = mainState();
    return (state.functions || []).flatMap((functionId) =>
      (functionQuestions[functionId] || []).map((raw) => ({ ...questionObject(raw), functionId }))
    );
  };

  const answerValue = (question) => {
    if (question.functionId) return detail.answers?.[question.functionId]?.[question.id] || '';
    return detail[question.id] || '';
  };

  const setAnswer = (question, value) => {
    if (question.functionId) {
      if (!detail.answers[question.functionId]) detail.answers[question.functionId] = {};
      detail.answers[question.functionId][question.id] = value;
    } else {
      detail[question.id] = value;
    }
  };

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

  const isVague = (value) => vaguePatterns.some((pattern) => pattern.test(value));
  const isWeak = (value) => value.trim().length > 0 && value.trim().length < 18;

  const allQuestions = () => [...globalQuestions, ...selectedFunctionQuestions()];

  const quality = () => {
    const questions = allQuestions();
    const required = questions.filter((question) => question.required);
    const missing = required.filter((question) => !answerValue(question).trim());
    const vague = questions.filter((question) => {
      const value = answerValue(question);
      return value.trim() && (isVague(value) || isWeak(value));
    });
    const answered = required.length - missing.length;
    const base = required.length ? Math.round((answered / required.length) * 100) : 100;
    const score = Math.max(0, base - vague.length * 4);
    return { score, missing, vague, total: required.length, answered };
  };

  const questionMarkup = (question) => {
    const value = answerValue(question);
    const path = question.functionId ? `${question.functionId}.${question.id}` : question.id;
    return `<article class="writing-question ${value.trim() ? 'is-answered' : ''} ${value.trim() && (isVague(value) || isWeak(value)) ? 'is-vague' : ''}">
      <header><div><span>${question.functionId ? 'Detalhe da função' : 'Detalhe fundamental'}</span><h4>${esc(question.label)}</h4></div>${question.required ? '<strong>Obrigatório</strong>' : '<strong>Quando aplicável</strong>'}</header>
      <p>${esc(question.ask)}</p>
      <label><span>Sua resposta factual</span><textarea rows="3" data-writing-path="${esc(path)}" placeholder="Responda como regra, não como narrativa.">${esc(value)}</textarea></label>
      <details><summary>Ver exemplo e erro comum</summary><div><p><b>Exemplo completo:</b> ${esc(question.example)}</p><p><b>Evite:</b> ${esc(question.avoid)}</p></div></details>
    </article>`;
  };

  const functionGroupMarkup = (functionId) => {
    const fn = DATA.functions.find((item) => item.id === functionId);
    const questions = (functionQuestions[functionId] || []).map((raw) => ({ ...questionObject(raw), functionId }));
    if (!questions.length) return '';
    return `<section class="writing-function-group"><header><div><span>Função selecionada</span><h4>${esc(fn?.name || functionId)}</h4></div><p>${esc(fn?.short || '')}</p></header><div class="writing-question-grid">${questions.map(questionMarkup).join('')}</div></section>`;
  };

  const qualityMarkup = () => {
    const result = quality();
    const status = result.score >= 90 && !result.missing.length ? 'ready' : result.score >= 60 ? 'partial' : 'weak';
    return `<aside class="writing-quality" data-status="${status}">
      <header><div><span>Qualidade do detalhamento</span><strong>${result.score}%</strong></div><div class="writing-quality__track"><span style="width:${result.score}%"></span></div></header>
      <p>${result.missing.length ? `${result.missing.length} resposta${result.missing.length === 1 ? '' : 's'} obrigatória${result.missing.length === 1 ? '' : 's'} ainda falta${result.missing.length === 1 ? '' : 'm'}.` : 'Todas as respostas obrigatórias foram preenchidas.'}</p>
      ${result.vague.length ? `<details><summary>${result.vague.length} resposta${result.vague.length === 1 ? '' : 's'} ainda vaga${result.vague.length === 1 ? '' : 's'}</summary><ul>${result.vague.map((item) => `<li>${esc(item.label)}</li>`).join('')}</ul></details>` : ''}
      ${result.missing.length ? `<details><summary>Ver detalhes ausentes</summary><ul>${result.missing.map((item) => `<li>${esc(item.label)}</li>`).join('')}</ul></details>` : ''}
    </aside>`;
  };

  const writingPanelMarkup = () => {
    const state = mainState();
    const selected = state.functions || [];
    return `<section class="writing-workshop" aria-labelledby="writing-workshop-title">
      <header class="writing-workshop__header"><div><span>Oficina de redação mecânica</span><h3 id="writing-workshop-title">Detalhamento sem lacunas</h3><p>Responda fatos curtos. O Estúdio transforma essas respostas em Efeito, Resistência, Sucesso, Falha, Limites e Encerramento com redação uniforme.</p></div>${qualityMarkup()}</header>
      <details open><summary><span>1</span><div><strong>Funcionamento fundamental</strong><small>Aplicação, oposição, recorrência, contrajogo e encerramento.</small></div></summary><div class="writing-details-body"><div class="writing-question-grid">${globalQuestions.map(questionMarkup).join('')}</div></div></details>
      ${selected.length ? `<details open><summary><span>2</span><div><strong>Perguntas específicas das funções</strong><small>Somente aquilo que as funções escolhidas precisam responder.</small></div></summary><div class="writing-details-body">${selected.map(functionGroupMarkup).join('') || '<p class="writing-empty">As funções escolhidas não possuem perguntas adicionais.</p>'}</div></details>` : ''}
      <footer class="writing-actions"><div><strong>O texto gerado continua editável.</strong><p>“Preencher lacunas” preserva o que já foi escrito. “Reescrever” substitui os campos técnicos pelas respostas desta oficina.</p></div><div><button type="button" data-writing-build="empty">Preencher apenas lacunas</button><button type="button" data-writing-build="all">Reescrever texto técnico</button></div></footer>
    </section>`;
  };

  const sentence = (value) => {
    const clean = String(value || '').trim();
    if (!clean) return '';
    return /[.!?…]$/.test(clean) ? clean : `${clean}.`;
  };

  const answersByDestination = (destination) => allQuestions()
    .filter((question) => question.destination === destination)
    .map((question) => sentence(answerValue(question)))
    .filter(Boolean);

  const generatedTexts = () => {
    const effect = answersByDestination('effect');
    const resistance = answersByDestination('resistance');
    const success = answersByDestination('success');
    const failure = answersByDestination('failure');
    const limits = answersByDestination('limits');
    const end = answersByDestination('end');

    return {
      appearance: sentence(detail.appearance),
      effect: effect.join('\n\n'),
      resistance: resistance.join('\n\n'),
      success: success.join('\n\n'),
      failure: failure.join('\n\n'),
      limits: limits.join('\n\n'),
      endCondition: end.join('\n\n')
    };
  };

  const setMainField = (id, value, overwrite) => {
    const control = host.querySelector(`[data-state="${CSS.escape(id)}"]`);
    if (!control || !value) return;
    if (!overwrite && control.value.trim()) return;
    control.value = value;
    control.dispatchEvent(new Event('input', { bubbles: true }));
  };

  const buildTechnicalText = (overwrite) => {
    const generated = generatedTexts();
    ['effect', 'resistance', 'success', 'failure', 'limits', 'endCondition'].forEach((id) => setMainField(id, generated[id], overwrite));
    const button = host.querySelector(`[data-writing-build="${overwrite ? 'all' : 'empty'}"]`);
    if (button) {
      const original = button.textContent;
      button.textContent = 'Texto aplicado';
      window.setTimeout(() => { button.textContent = original; }, 1600);
    }
  };

  const insertAppearanceInPlainExport = (text) => {
    const appearance = generatedTexts().appearance;
    if (!appearance || text.includes('\nAPRESENTAÇÃO\n')) return text;
    const marker = '\nDESCRIÇÃO\n';
    const index = text.indexOf(marker);
    if (index < 0) return `${text}\n\nAPRESENTAÇÃO\n\n${appearance}`;
    return `${text.slice(0, index)}\n\nAPRESENTAÇÃO\n\n${appearance}\n${text.slice(index)}`;
  };

  const isHeading = (line) => /^[A-ZÁÀÂÃÉÊÍÓÔÕÚÜÇ0-9][A-ZÁÀÂÃÉÊÍÓÔÕÚÜÇ0-9 —–-]{2,}$/.test(line) && !line.includes(':');

  const whatsappFull = (plain) => {
    const source = insertAppearanceInPlainExport(plain).split('\n');
    const output = [];
    let first = true;
    let section = '';

    for (const raw of source) {
      const line = raw.trimEnd();
      const trimmed = line.trim();
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
        output.push('');
        output.push('━━━━━━━━━━━━━━━━━━');
        output.push(`✦ *${trimmed}*`);
        output.push('━━━━━━━━━━━━━━━━━━');
        continue;
      }

      const labelMatch = trimmed.match(/^([^:]{2,45}):\s*(.+)$/);
      if (labelMatch) {
        const prefix = section === 'CUSTOS' ? '•' : '>';
        output.push(`${prefix} *${labelMatch[1]}:* ${labelMatch[2]}`);
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
    const generated = generatedTexts();
    const heritage = extractHeritageTitle(plain);
    const effect = state.effect?.trim() || generated.effect || 'Não definido.';
    const resistance = state.resistance?.trim() || generated.resistance || 'Sem oposição registrada.';
    const success = state.success?.trim() || generated.success || 'Não definido.';
    const failure = state.failure?.trim() || generated.failure || 'Não definida.';
    const limits = state.limits?.trim() || generated.limits || 'Nenhum limite adicional.';
    const end = state.endCondition?.trim() || generated.endCondition || 'Conforme a Duração.';
    const functions = (state.functions || []).map((id) => DATA.functions.find((item) => item.id === id)?.name).filter(Boolean).join(' / ');

    return `╭━━━━━━━━━━━━━━━━━━╮\n✦ *${String(state.name || 'MILAGRE SEM NOME').toUpperCase()}*\n╰━━━━━━━━━━━━━━━━━━╯\n_${state.deity || 'Divindade'} • ${state.domain || 'Domínio'} — ${state.branch || 'Vertente'}_\n\n> *Rank:* ${state.rank || '—'}\n> *Potência:* ${findOption(DATA.core.potency, state.potency)?.label || 'Não definida'}\n> *Ativação:* ${state.activation || '—'}\n> *Alcance:* ${state.range || '—'}\n> *Destino:* ${targetLabel(state)}\n> *Duração:* ${state.duration || '—'}\n> *Cadência:* ${state.cadence || '—'}\n> *Função:* ${functions || 'Não definida'}${heritage ? `\n> *Herança:* ${heritage}` : ''}\n\n━━━━━━━━━━━━━━━━━━\n✦ *EFEITO*\n━━━━━━━━━━━━━━━━━━\n${effect}\n\n*Resistência:* ${resistance}\n\n*Sucesso:* ${success}\n\n*Falha:* ${failure}\n\n*Limites:* ${limits}\n\n*Encerramento:* ${end}`;
  };

  const whatsappCosts = (plain) => {
    const state = mainState();
    const match = plain.match(/\nCUSTOS\n\n([\s\S]*?)\n\nTOTAL:\s*([^\n]+)/);
    const costs = match?.[1]?.split('\n').filter(Boolean) || [];
    const total = match?.[2] || 'Não calculado';
    return `✦ *CUSTOS — ${String(state.name || 'MILAGRE').toUpperCase()}*\n\n${costs.map((line) => {
      const parts = line.match(/^(.+):\s*(.+)$/);
      return parts ? `• *${parts[1]}:* ${parts[2]}` : `• ${line}`;
    }).join('\n')}\n\n━━━━━━━━━━━━━━━━━━\n*TOTAL:* ${total}`;
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

  const whatsappPanelMarkup = (plain) => {
    const value = whatsappText(plain);
    const modes = [
      ['complete', 'Ficha completa'],
      ['combat', 'Cartão de combate'],
      ['costs', 'Somente custos']
    ];
    return `<section class="whatsapp-export" aria-labelledby="whatsapp-export-title">
      <header><div><span>Exportação social</span><h3 id="whatsapp-export-title">Versão para WhatsApp</h3><p>Usa negrito, itálico, citações e divisores que permanecem organizados depois de colar na conversa.</p></div><div class="whatsapp-mode">${modes.map(([id, label]) => `<button type="button" data-whatsapp-mode="${id}" ${detail.whatsappMode === id ? 'aria-pressed="true"' : 'aria-pressed="false"'}>${label}</button>`).join('')}</div></header>
      <div class="whatsapp-layout"><div class="whatsapp-phone"><div class="whatsapp-phone__bar"><span>Harmonia Caótica</span><small>prévia da mensagem</small></div><div class="whatsapp-wall"><article class="whatsapp-bubble">${previewHtml(value)}<time>22:17 ✓✓</time></article></div></div><label class="whatsapp-raw"><span>Texto com formatação do WhatsApp</span><textarea readonly rows="22" data-whatsapp-text>${esc(value)}</textarea></label></div>
      <footer><button type="button" data-copy-whatsapp>Copiar versão para WhatsApp</button><p>A prévia simula a leitura. O campo ao lado mostra os símbolos que serão copiados.</p></footer>
    </section>`;
  };

  const enrichPlainExport = () => {
    const area = host?.querySelector('#studio-export-text');
    if (!area) return '';
    const next = insertAppearanceInPlainExport(area.value);
    if (next !== area.value) area.value = next;
    return area.value;
  };

  const renderWorkshop = () => {
    const resolution = host.querySelector('.studio-module--resolution');
    if (!resolution) return;
    const existing = resolution.previousElementSibling;
    if (existing?.classList.contains('writing-workshop')) return;
    resolution.insertAdjacentHTML('beforebegin', writingPanelMarkup());
  };

  const renderWhatsapp = () => {
    const exportField = host.querySelector('.studio-export');
    if (!exportField) return;
    const plain = enrichPlainExport();
    let panel = exportField.nextElementSibling;
    if (panel?.classList.contains('whatsapp-export')) return;
    exportField.insertAdjacentHTML('afterend', whatsappPanelMarkup(plain));
  };

  const rerenderWorkshop = () => {
    const panel = host.querySelector('.writing-workshop');
    if (panel) panel.outerHTML = writingPanelMarkup();
  };

  const rerenderWhatsapp = () => {
    const panel = host.querySelector('.whatsapp-export');
    const plain = enrichPlainExport();
    if (panel) panel.outerHTML = whatsappPanelMarkup(plain);
  };

  const setWritingPath = (path, value) => {
    const parts = path.split('.');
    if (parts.length === 1) {
      detail[path] = value;
      return;
    }
    const [functionId, questionId] = parts;
    if (!detail.answers[functionId]) detail.answers[functionId] = {};
    detail.answers[functionId][questionId] = value;
  };

  const copyText = async (value) => {
    try {
      await navigator.clipboard.writeText(value);
    } catch {
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
    const control = event.target.closest('[data-writing-path]');
    if (!control) return;
    setWritingPath(control.dataset.writingPath, control.value);
    save();
    window.clearTimeout(handleInput.timer);
    handleInput.timer = window.setTimeout(() => {
      const qualityNode = host.querySelector('.writing-quality');
      if (qualityNode) qualityNode.outerHTML = qualityMarkup();
      const card = control.closest('.writing-question');
      if (card) {
        card.classList.toggle('is-answered', Boolean(control.value.trim()));
        card.classList.toggle('is-vague', Boolean(control.value.trim()) && (isVague(control.value) || isWeak(control.value)));
      }
    }, 120);
  };

  const handleClick = async (event) => {
    const buildButton = event.target.closest('[data-writing-build]');
    if (buildButton) {
      buildTechnicalText(buildButton.dataset.writingBuild === 'all');
      return;
    }

    const modeButton = event.target.closest('[data-whatsapp-mode]');
    if (modeButton) {
      detail.whatsappMode = modeButton.dataset.whatsappMode;
      save();
      rerenderWhatsapp();
      return;
    }

    const copyButton = event.target.closest('[data-copy-whatsapp]');
    if (copyButton) {
      const value = host.querySelector('[data-whatsapp-text]')?.value || '';
      await copyText(value);
      const original = copyButton.textContent;
      copyButton.textContent = 'Mensagem copiada';
      window.setTimeout(() => { copyButton.textContent = original; }, 1600);
    }
  };

  const decorate = () => {
    scheduled = false;
    if (!host || building) return;
    building = true;
    try {
      renderWorkshop();
      renderWhatsapp();
      enrichPlainExport();
    } finally {
      building = false;
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
      window.setTimeout(start, 100);
      return;
    }
    new MutationObserver(schedule).observe(host, { childList: true, subtree: true });
    host.addEventListener('input', handleInput);
    host.addEventListener('click', handleClick);
    host.addEventListener('change', schedule);
    schedule();
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, { once: true });
  else start();
})();
