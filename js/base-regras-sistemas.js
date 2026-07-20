(() => {
  'use strict';
  if (window.HARMONIA_SYSTEM_RULES) return;

  const glossary = {
    Rank: ['A faixa de complexidade e escala permitida para uma criação.', 'Orienta o limite da construção, mas não substitui as compras mecânicas.'],
    Pontos: ['O orçamento usado para comprar capacidades.', 'Toda função relevante precisa aparecer no custo.'],
    Potência: ['A intensidade mecânica de uma função.', 'Fornece Valor para aplicação ou oposição; não compra espaço, tempo ou oportunidades.'],
    Valor: ['O número produzido pela Potência.', 'A regra precisa declarar onde ele entra na resolução.'],
    Alcance: ['A distância entre a origem e o destino inicial.', 'Não determina o tamanho da Área nem o deslocamento produzido.'],
    Alvo: ['Uma existência escolhida diretamente.', 'Quantidade, compartilhamento e seleção precisam ser declarados.'],
    Área: ['Uma região ocupada, examinada ou afetada.', 'Declare forma, tamanho, origem, seleção, entrada e saída.'],
    Escala: ['O maior corpo, objeto ou região compatível.', 'Não aumenta automaticamente dano, quantidade, Alcance ou Área.'],
    Duração: ['O período durante o qual uma aplicação permanece.', 'Mantém o que foi comprado; não cria reaplicações, ações ou decisões.'],
    Cadência: ['A frequência permitida para novas ativações.', 'Não se confunde com Duração, Usos ou atuação.'],
    Uso: ['Uma unidade finita de aplicação ou decisão.', 'Declare o acontecimento que consome cada Uso e o que ocorre quando terminam.'],
    Reserva: ['Um recurso finito armazenado pela função.', 'Declare capacidade, consumo, excesso e recuperação.'],
    Atuação: ['A oportunidade exigida para executar uma operação.', 'Ação, Movimento, Reação e gatilhos são oportunidades diferentes.'],
    Ação: ['A principal oportunidade ativa de um Turno.', 'Uma função ativada por Ação não recebe outra Ação gratuita para continuar operando.'],
    Movimento: ['A oportunidade usada para mudar posição.', 'Mover, transportar e conceder Movimento são funções diferentes.'],
    Reação: ['Uma oportunidade aberta por um gatilho válido.', 'Declare gatilho, janela e se ocorre antes ou depois do evento.'],
    Gatilho: ['Uma condição objetiva que abre uma resolução programada.', 'Não concede percepção, conhecimento ou oportunidade ausente.'],
    Sustentação: ['A dependência que mantém uma aplicação ativa.', 'Declare o que sustenta, o que rompe e qual parte termina.'],
    Resistência: ['A regra ou função capaz de se opor ao efeito.', 'Não presuma resistência universal; declare a oposição compatível.'],
    Via: ['O aspecto do alvo atingido por Controle.', 'Mental, Motora, Emocional e Funcional possuem acessos diferentes.'],
    Autoridade: ['O grau de decisão permitido por Controle.', 'Influência impõe emoção, Compulsão impõe escolha e Dominação define uma oportunidade.'],
    Influência: ['Uma emoção imposta sem retirar a decisão.', 'A emoção é sobrenatural; a ação continua pertencendo ao alvo.'],
    Compulsão: ['Uma escolha imposta dentro de uma oportunidade.', 'O alvo define detalhes não declarados e cada nova decisão consome um Uso.'],
    Dominação: ['O controle integral de uma oportunidade discreta.', 'Não cria ações, recursos, conhecimento ou capacidades para o alvo.'],
    Criação: ['Uma existência sobrenatural separável.', 'Declare corpo, posição, Resistência, autonomia, oportunidades e encerramento.'],
    Propagação: ['A produção de novos focos ou destinos após a ativação.', 'Declare origem, destino, frequência, limite e custo.'],
    Travessia: ['Um caminho sobrenatural que substitui deslocamento comum.', 'Declare entrada, saída, passageiros, fronteiras e falha.'],
    Transformação: ['Uma alteração de estrutura, composição ou natureza.', 'Cada capacidade adquirida precisa de compra própria.'],
    Neutralização: ['Uma função que reduz, impede, dissipa ou redireciona outra.', 'Declare qual função é afetada e o que permanece depois da interação.'],
    Ferimento: ['Uma consequência corporal específica além da perda de Vida.', 'Precisa de causa, efeito, tratamento e encerramento.'],
    Condição: ['Um estado mecânico que altera ações ou consequências.', 'Declare aplicação, efeito, acumulação, Duração e encerramento.'],
    Derrota: ['O estado que retira uma existência da participação normal.', 'Não significa automaticamente morte, destruição ou inconsciência.'],
    Cura: ['A restauração de Vida, tecidos ou funções compatíveis.', 'Recuperar Vida não remove automaticamente toda consequência.'],
    Retorno: ['A reversão de Derrota, morte ou encerramento.', 'Declare janela, condições, custo e consequências.']
  };

  Object.keys(glossary).forEach((term) => {
    const [simple, apply] = glossary[term];
    glossary[term] = Object.freeze({ simple, apply });
  });

  const commonChecklist = [
    'A função principal está escrita como resultado mecânico?',
    'Todos os parâmetros necessários aparecem na ficha e nos custos?',
    'A resolução declara oposição, sucesso, falha e consumo?',
    'A Duração está separada de novas aplicações e oportunidades?',
    'Os limites impedem capacidades pertencentes a outras funções?'
  ];

  const pages = {
    'fundamentos-dos-milagres.html': {
      short: 'Define a linguagem básica usada por todas as construções: Rank, Pontos, Potência, Valor, Cadência e Duração.',
      centralQuestion: 'Quais partes do efeito precisam ser compradas e registradas para funcionar sem interpretação improvisada?',
      principle: 'Toda capacidade relevante precisa aparecer como compra, parâmetro ou regra específica.',
      decisions: [
        ['Escala', 'Escolha Rank e orçamento antes de acumular funções.'],
        ['Intensidade', 'Defina onde a Potência e seu Valor entram na resolução.'],
        ['Tempo', 'Separe ativação, Cadência, Duração, Usos e encerramento.']
      ],
      procedure: [
        'Escreva o resultado mecânico principal em uma frase.',
        'Separe cada função adicional escondida na descrição.',
        'Escolha Rank, Potência e uso do Valor.',
        'Registre espaço, tempo, oportunidades e recursos.',
        'Some os custos e declare sucesso, falha e encerramento.'
      ],
      mustDeclare: ['Rank', 'custo total', 'Potência', 'Cadência', 'Duração', 'ativação e encerramento'],
      mistakes: ['Usar Potência como Alcance ou Área.', 'Confundir Persistência com aplicações ilimitadas.', 'Contabilizar apenas a função mais evidente.'],
      terms: ['Rank', 'Pontos', 'Potência', 'Valor', 'Duração', 'Cadência', 'Uso', 'Atuação']
    },

    'alcance-alvos-area-e-movimento.html': {
      short: 'Define quem é afetado, a distância da aplicação, o espaço ocupado e as formas de mudança de posição.',
      centralQuestion: 'O efeito escolhe destinos, ocupa uma região ou altera posição — e qual compra representa cada parte?',
      principle: 'Alcance, Alvos, Área, Movimento e Escala são parâmetros diferentes.',
      decisions: [
        ['Destino', 'Escolha Alvo direto, vários Alvos ou Área.'],
        ['Origem', 'Declare de onde distância e região são medidas.'],
        ['Posição', 'Separe deslocar, acompanhar, transportar e conceder Movimento.']
      ],
      procedure: [
        'Identifique a origem da aplicação.',
        'Defina destino e Alcance.',
        'Escolha quantidade ou forma e tamanho da Área.',
        'Declare seleção, entrada, saída e permanência.',
        'Compre Movimento, Travessia e Escala quando necessários.'
      ],
      mustDeclare: ['origem', 'Alcance', 'quantidade ou Área', 'seleção', 'movimento', 'Escala'],
      mistakes: ['Tratar Alcance como Área.', 'Afetar quem entra depois sem reaplicação.', 'Mover várias existências sem contabilizar quantidade.'],
      terms: ['Alcance', 'Alvo', 'Área', 'Movimento', 'Escala', 'Travessia']
    },

    'controle-influencia-e-posse.html': {
      short: 'Define como emoções, escolhas, movimentos, funções e hospedeiros podem ser dirigidos sem substituir o alvo.',
      centralQuestion: 'A função impõe emoção, escolha ou todos os detalhes de uma oportunidade — e por qual Via?',
      principle: 'Autoridade define o que pode ser imposto; Via define onde interfere; Usos limitam decisões.',
      decisions: [
        ['Autoridade', 'Escolha Influência, Compulsão ou Dominação.'],
        ['Via', 'Defina interferência Emocional, Mental, Motora ou Funcional.'],
        ['Execução', 'Registre ordem, Usos, oportunidade, Canal e encerramento.']
      ],
      procedure: [
        'Declare o alvo e a capacidade que ele possui.',
        'Escolha Autoridade e Via.',
        'Escreva emoção, ordem, proibição ou oportunidade controlada.',
        'Defina Potência e oposição quando involuntário.',
        'Determine o que consome cada Uso.',
        'Registre Duração, Canal, condições e Posse quando existirem.'
      ],
      mustDeclare: ['alvo', 'Via', 'Autoridade', 'ordem inicial', 'Usos', 'oportunidade', 'Canal ou Posse'],
      mistakes: ['Tratar Influência como obediência.', 'Usar Compulsão como Dominação.', 'Confundir Duração com decisões ilimitadas.'],
      checklist: commonChecklist.concat(['A Autoridade corresponde ao grau de decisão?', 'Cada nova decisão possui Uso?', 'O alvo continua limitado às próprias capacidades?']),
      terms: ['Autoridade', 'Via', 'Influência', 'Compulsão', 'Dominação', 'Uso', 'Duração', 'Gatilho', 'Resistência'],
      sectionQuestions: {
        influencia: 'O poder apenas impõe uma emoção ou também exige uma ação?',
        compulsao: 'Qual escolha é imposta e quais detalhes pertencem ao alvo?',
        dominacao: 'Qual oportunidade discreta é controlada?',
        'usos-de-controle': 'Qual acontecimento consome um Uso?',
        'duracao-e-execucao': 'O que a Duração mantém e quem executa a ordem?',
        registro: 'Todos os campos necessários foram declarados?'
      }
    },

    'acoes-reacoes-e-estrutura-do-combate.html': {
      short: 'Organiza Turnos, Ações, Movimentos, Reações, gatilhos e a ordem de resolução.',
      centralQuestion: 'Quem usa qual oportunidade, em que momento e antes ou depois de qual evento?',
      principle: 'Duração, autonomia e gatilhos não criam oportunidades por si mesmos.',
      decisions: [
        ['Oportunidade', 'Defina Ação, Movimento, Reação ou operação própria.'],
        ['Janela', 'Declare o momento exato da resolução.'],
        ['Operador', 'Identifique usuário, alvo, Criação ou função programada.']
      ],
      procedure: [
        'Identifique o evento inicial.',
        'Declare quem possui a oportunidade.',
        'Verifique custos, Cadência, Usos e condições.',
        'Resolva oposição e alvos.',
        'Aplique o resultado e atualize recursos e Durações.'
      ],
      mustDeclare: ['operador', 'oportunidade', 'gatilho', 'janela', 'ordem de resolução', 'consumo'],
      mistakes: ['Conceder Ação porque algo permanece ativo.', 'Programar Reação sem gatilho.', 'Reagir retroativamente.'],
      terms: ['Atuação', 'Ação', 'Movimento', 'Reação', 'Gatilho', 'Cadência', 'Uso', 'Duração']
    },

    'custos-reservas-sacrificios-e-recuperacao.html': {
      short: 'Define preços de ativação, Reservas, manutenção, Sacrifícios, Recarga e Recuperação.',
      centralQuestion: 'Qual recurso é pago, quando é consumido e por qual processo pode retornar?',
      principle: 'Custo limita uma função, mas não compra capacidade adicional.',
      decisions: [
        ['Recurso', 'Defina o que é gasto, armazenado ou sacrificado.'],
        ['Momento', 'Declare qual acontecimento consome o recurso.'],
        ['Recuperação', 'Registre frequência, condição e limite.']
      ],
      procedure: [
        'Identifique recurso e capacidade máxima.',
        'Declare custos iniciais e posteriores.',
        'Determine o momento exato do consumo.',
        'Registre insuficiência e excesso.',
        'Defina Recarga, Recuperação e perdas permanentes.'
      ],
      mustDeclare: ['recurso', 'capacidade', 'consumo', 'insuficiência', 'recuperação', 'perda permanente'],
      mistakes: ['Usar custo narrativo sem consequência.', 'Recuperar recursos apenas pela Duração.', 'Usar Sacrifício como função gratuita.'],
      terms: ['Pontos', 'Reserva', 'Uso', 'Cadência', 'Duração', 'Gatilho', 'Sustentação']
    }
  };

  window.HARMONIA_SYSTEM_RULES = Object.freeze({
    version: '2026.07.20',
    glossary: Object.freeze(glossary),
    commonChecklist: Object.freeze(commonChecklist),
    pages: Object.freeze(pages)
  });
})();
