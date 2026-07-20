(() => {
  'use strict';

  const entry = (summary, useWhen, excludes = '', example = '') => ({ summary, useWhen, excludes, example });
  const option = (value, label, cost, summary, excludes = '') => ({ value, label, cost, summary, excludes });

  const numeric = {
    potency: {
      '1': entry('Produz Valor 4. É a menor intensidade numérica do sistema.', 'Efeitos leves, auxiliares ou que dependem mais de posição e conceito do que de força.', 'Não compra Alcance, duração, quantidade, Área ou oportunidades.'),
      '2': entry('Produz Valor 8.', 'Efeitos modestos que precisam enfrentar resistências comuns.', 'Não concede duas aplicações do Valor.'),
      '3': entry('Produz Valor 12.', 'Efeitos consistentes de combate e Criações de resistência básica 12.', 'Não transforma uma função em várias funções.'),
      '4': entry('Produz Valor 16.', 'Efeitos fortes, disputas de Potência e Criações robustas.', 'Não garante sucesso contra toda oposição.'),
      '5': entry('Produz Valor 20.', 'Milagres de grande intensidade dentro do Rank permitido.', 'Não amplia automaticamente o espaço afetado.'),
      '6': entry('Produz Valor 24.', 'Escalas muito elevadas e disputas sobrenaturais severas.', 'Não ignora limites conceituais da Vertente.'),
      '7': entry('Produz Valor 28.', 'Maior Valor catalogado nesta construção.', 'Não concede autoridade irrestrita sobre o Domínio.')
    },
    range: {},
    sharedTargets: {},
    completeTargets: {},
    area: {},
    controlUses: {}
  };

  ['Pessoal ou Contato', '5 metros', '15 metros', '30 metros', '100 metros', '500 metros', '5 quilômetros', '50 quilômetros'].forEach((value) => {
    numeric.range[value] = entry(
      value === 'Pessoal ou Contato' ? 'O Milagre começa no usuário ou em algo que ele toca.' : `O destino inicial pode estar a até ${value} do usuário.`,
      'Escolha pela distância entre o usuário e o primeiro alvo, ponto ou Criação no momento da ativação.',
      'Alcance não é Movimento, tamanho de Área, comunicação remota ou distância de uma função usada depois por uma Criação.'
    );
  });

  ['1', '2', '3', '5', '10', '20', '50'].forEach((value) => {
    numeric.sharedTargets[value] = entry(
      value === '1' ? 'Afeta um único alvo.' : `Permite dividir Potência, Reservas e outras quantidades finitas entre até ${value} alvos.`,
      'Escolha quando vários destinos repartem o mesmo total mecânico.',
      'Não entrega o Valor completo a cada alvo.'
    );
    numeric.completeTargets[value] = entry(
      value === '1' ? 'Afeta um único alvo com o perfil completo.' : `Até ${value} alvos recebem individualmente o perfil completo comprado.`,
      'Escolha quando cada alvo precisa receber a mesma Potência, função ou capacidade integral.',
      'Não concede ações adicionais nem permite concentrar aplicações idênticas no mesmo alvo.'
    );
  });

  ['0', '2', '4', '10', '20', '50', '100'].forEach((value) => {
    numeric.area[value] = entry(
      value === '0' ? 'O Milagre não utiliza uma região indiscriminada.' : `Afeta uma região cuja maior dimensão é de ${value} metros.`,
      value === '0' ? 'Use com Alvos escolhidos ou efeito pessoal.' : 'Escolha quando tudo que estiver validamente dentro da região deve ser alcançado.',
      value === '0' ? 'Não cria espaço afetado.' : 'Área não distingue aliados, inimigos ou objetos sem outra regra de seleção.'
    );
  });

  ['1', '2', '3', '4', '6', '11', '21', '51'].forEach((value) => {
    numeric.controlUses[value] = entry(
      `${value} decisão${value === '1' ? '' : 'ões'} ou aplicação${value === '1' ? '' : 'ões'} de Controle podem ser consumidas durante a manifestação.`,
      'Escolha pela quantidade máxima de ordens, mudanças de decisão ou oportunidades controladas.',
      'Usos não são ativações, Turnos ou alvos. Uma ordem ampla pode consumir novos Usos quando exigir novas decisões.'
    );
  });

  window.HarmoniaDefinitiveStudioData = {
    version: '2026.07.20-d',

    fieldGuides: {
      name: entry('Nome usado na ficha e na consulta de combate.', 'Escolha um nome que identifique o Milagre sem tentar explicar todas as regras.'),
      idea: entry('Uma frase sobre o resultado concreto do poder.', 'Descreva o que muda quando ele funciona, antes da aparência ou da história.', 'Evite usar apenas “manipula”, “controla” ou “invoca” sem dizer o resultado.'),
      deity: entry('A Divindade à qual o personagem dirige sua fé.', 'A escolha limita os Domínios disponíveis.'),
      domain: entry('A parte fundamental da realidade governada pela Divindade.', 'Escolha pelo princípio real do efeito, não pela estética.'),
      branch: entry('A expressão específica do Domínio que produz o Milagre.', 'A Vertente determina a Herança automática recebida pelo poder.', 'A Vertente não é apenas um tema visual.'),
      rank: entry('Define o orçamento máximo de construção.', 'Escolha o Rank permitido ao personagem.', 'Rank não aumenta sozinho Potência, Alcance ou quantidade.'),
      potency: entry('Compra o Valor usado por dano, Cura, força, resistência e disputas.', 'Escolha pela intensidade numérica necessária.', 'Potência não compra espaço, tempo ou oportunidades.'),
      activation: entry('Oportunidade gasta para manifestar o Milagre.', 'Escolha quando o usuário paga o momento inicial do poder.'),
      range: entry('Distância entre o usuário e o destino inicial.', 'Escolha onde o poder começa.', 'Não é a distância que uma Criação anda ou enxerga.'),
      targetMode: entry('Define se o Milagre escolhe destinos ou ocupa uma região.', 'Use Alvos para precisão e Área para alcance indiscriminado.'),
      targetCount: entry('Quantidade máxima de destinos escolhidos.', 'Decida se eles dividem ou recebem integralmente os recursos.'),
      area: entry('Maior dimensão da região afetada.', 'Use para campos, nuvens, explosões, muralhas extensas ou efeitos locais.'),
      duration: entry('Tempo em que a função ou manifestação permanece válida.', 'Escolha quanto tempo o efeito continua existindo.', 'Duração não repete aplicações nem recupera recursos.'),
      cadence: entry('Frequência em que o Milagre pode ser ativado novamente.', 'Registre a Cadência definida para a capacidade.'),
      controlAuthority: entry('Nível de interferência sobre as escolhas ou oportunidades do alvo.', 'Escolha o menor nível capaz de produzir o resultado.'),
      controlWay: entry('Parte do alvo pela qual o Controle atua.', 'A Via define o que é afetado e qual oposição é coerente.'),
      controlUses: entry('Quantidade finita de decisões ou aplicações de Controle.', 'Conte cada nova decisão que a ordem exige.'),
      controlOrder: entry('Conteúdo exato imposto ao alvo.', 'Escreva a emoção, instrução, proibição ou ação controlada.'),
      creationResistance: entry('Quantidade de dano que uma Criação destrutível suporta.', 'A Resistência básica usa a Potência principal da Criação.'),
      creationAction: entry('Forma como a função da Criação utiliza oportunidades.', 'Funções diferentes podem ter atuações diferentes no Projeto da Criação.'),
      creationLimit: entry('Quantidade de manifestações que podem permanecer ativas.', 'Declare o limite mesmo quando ele for apenas uma.'),
      traversalType: entry('Tipo de caminho impossível utilizado pelo Milagre.', 'Escolha como a distância intermediária é ignorada ou atravessada.'),
      transformationScope: entry('Extensão estrutural da transformação.', 'Escolha quanto do alvo realmente muda.'),
      resourceFunction: entry('Relação criada entre origem, destino e recurso.', 'Escolha se o recurso é movido, tomado, combinado ou conduzido.'),
      informationFunction: entry('Operação realizada sobre informação ou percepção.', 'Escolha o resultado principal da leitura, ocultação ou comunicação.'),
      informationDepth: entry('Quantidade e detalhe da informação obtida.', 'Escolha apenas a profundidade necessária para a pergunta do Milagre.'),
      protectionFunction: entry('Forma de oposição a dano, função ou Milagre.', 'Escolha se o efeito reduz, neutraliza, suprime, redireciona ou reflete.'),
      combatProfile: entry('Oportunidade ou estrutura adicional usada em combate.', 'Escolha somente quando o efeito realmente atua fora do momento normal.'),
      damageFunction: entry('Resultado prejudicial produzido sobre Vida, Resistência ou oportunidades.', 'Escolha dano, condição ou restrição conforme o efeito real.'),
      healingFunction: entry('Tipo de restauração ou retorno produzido.', 'Escolha a operação mais específica que descreve o resultado.'),
      costFunction: entry('Forma especial de pagamento ou recuperação.', 'Escolha quando o Milagre não utiliza apenas o custo normal de ativação.'),
      effect: entry('Procedimento mecânico completo.', 'Escreva em ordem: aplicação, comparação, resultado e consumo.'),
      resistance: entry('Forma pela qual o alvo ou outro efeito se opõe.', 'Declare qual Valor é comparado e quando a oposição ocorre.'),
      success: entry('Resultado quando a aplicação funciona.', 'Seja concreto sobre dano, posição, condição, duração ou decisão.'),
      failure: entry('Resultado quando a oposição vence ou a aplicação não se completa.', 'Declare se nada acontece, se há efeito parcial ou se algum recurso é consumido.'),
      limits: entry('Exceções e contrajogo que não estão evidentes nos parâmetros.', 'Registre apenas limites necessários para impedir interpretações indevidas.'),
      endCondition: entry('Condição que encerra a manifestação.', 'É obrigatória para efeitos Persistentes e Criações dependentes.'),
      extraCostLabel: entry('Compra excepcional ainda não representada pelo catálogo.', 'Use apenas quando uma regra publicada atribui um custo que o Estúdio ainda não possui.'),
      extraCost: entry('Valor da compra excepcional.', 'Não use para “equilibrar por sensação”; o número precisa vir de uma regra.'),
      creationBlueprint: entry('Registro completo da existência separada.', 'Use para criaturas, objetos, barreiras, enxames, estruturas, campos e invocações.')
    },

    optionGuides: {
      rank: {
        I: entry('Orçamento máximo de 12 pontos.', 'Milagres iniciais e funções concentradas.'),
        II: entry('Orçamento máximo de 20 pontos.', 'Milagres intermediários, combinações e maior escala.'),
        III: entry('Orçamento máximo de 30 pontos.', 'Milagres avançados e estruturas complexas.')
      },
      potency: numeric.potency,
      activation: {
        Ação: entry('A ativação consome a Ação do usuário.', 'É o padrão para manifestações deliberadas.', 'Não concede Movimento ou Reação.'),
        Movimento: entry('A ativação ocupa a oportunidade de Movimento do usuário.', 'Use quando o poder substitui a movimentação comum.', 'Não significa que o efeito se move depois.'),
        Reação: entry('A ativação ocorre em resposta a um gatilho válido e consome a Reação.', 'Use para defesas, respostas e interrupções.', 'Ainda precisa declarar o gatilho; Reação não é ação livre.')
      },
      range: numeric.range,
      targetMode: {
        one: entry('Um destino escolhido recebe o efeito.', 'Use para poderes precisos sobre uma criatura, objeto ou ponto.'),
        shared: entry('Vários destinos dividem o mesmo total de Potência, Reserva ou recurso.', 'Use quando a força é repartida.', 'Não entrega o perfil completo a cada destino.'),
        complete: entry('Cada destino recebe o perfil completo comprado.', 'Use quando cada alvo precisa da mesma função integral.', 'Não multiplica oportunidades ou permite várias aplicações no mesmo alvo.'),
        area: entry('Tudo que estiver validamente dentro da região é alcançado.', 'Use para campos, explosões, neblinas, zonas e manifestações extensas.', 'Não seleciona aliados e inimigos gratuitamente.')
      },
      sharedTargets: numeric.sharedTargets,
      completeTargets: numeric.completeTargets,
      area: numeric.area,
      duration: {
        Instantânea: entry('A função é resolvida e termina no mesmo momento.', 'Use para dano, Cura, deslocamento ou outra consequência imediata.', 'Consequências reais já produzidas podem permanecer.'),
        Breve: entry('Permanece até um intervalo curto definido pela regra de Duração.', 'Use para manifestações que precisam existir pouco além da ativação.', 'Não garante uma oportunidade posterior para uma Criação agir.'),
        Estendida: entry('Permanece por uma janela maior que Breve.', 'Use quando o efeito precisa atravessar várias oportunidades próximas.', 'Não repete automaticamente seu Valor.'),
        Combate: entry('Permanece durante o Combate atual.', 'Use para estados e manifestações ligados ao confronto.', 'Termina quando o Combate acaba, salvo consequência já produzida.'),
        Prolongada: entry('Permanece além de um Combate, pelo intervalo catalogado.', 'Use para explorações, preparações e vínculos duradouros.'),
        Persistente: entry('Continua existindo até uma condição objetiva de encerramento.', 'Use para Marcas, Criações e alterações que não dependem de um tempo curto.', 'Não significa permanente, indestrutível ou ilimitado; exige limite ativo e encerramento.')
      },
      controlAuthority: {
        '': entry('Nenhuma Autoridade escolhida.', 'Selecione antes de finalizar o Controle.'),
        Influência: entry('Inclina emoção, preferência ou decisão sem obrigar uma ação específica.', 'Use quando o alvo ainda pode recusar ou escolher outro caminho.', 'Não impõe obediência inevitável.'),
        Compulsão: entry('Impõe uma ordem ou decisão, mas o alvo escolhe os detalhes não definidos.', 'Use para “proteja-me”, “fuja” ou “não atravesse”.', 'Não permite determinar cada passo, arma ou oportunidade sem Dominação.'),
        Dominação: entry('Controla integralmente uma oportunidade discreta do alvo.', 'Use quando o usuário decide exatamente o que o alvo faz naquele momento.', 'Não entrega controle permanente nem todas as oportunidades futuras.'),
        'Vínculo Possessivo': entry('Permite atuar através de uma relação de Posse ou ocupação previamente estabelecida.', 'Use quando o controlador está vinculado ao corpo, objeto ou hospedeiro.', 'O vínculo não concede sozinho Dominação, percepção ou ações adicionais.')
      },
      controlWay: {
        '': entry('Nenhuma Via escolhida.', 'Selecione qual parte do alvo recebe a interferência.'),
        Emocional: entry('Altera emoções, impulsos e estados afetivos.', 'Use para medo, devoção, serenidade, desejo ou repulsa.', 'Não reescreve memórias nem move diretamente o corpo.'),
        Mental: entry('Altera pensamento, decisão consciente, interpretação ou intenção.', 'Use para ordens compreendidas, crenças momentâneas ou escolhas.', 'Não move um corpo inconsciente sem Via Motora.'),
        Motora: entry('Interfere nos movimentos físicos e na execução corporal.', 'Use para paralisar, obrigar gestos ou conduzir movimentos.', 'Não muda o que o alvo pensa ou sente.'),
        Funcional: entry('Controla uma função já existente de corpo, objeto, Criação ou sistema sobrenatural.', 'Use para interromper respiração, abrir uma estrutura ou acionar uma capacidade.', 'Não cria uma função que o alvo não possua.')
      },
      controlUses: numeric.controlUses,
      creationResistance: {
        Básica: entry('Resistência igual ao Valor da Potência principal.', 'Use para a durabilidade padrão da Criação.', 'Resistência não reduz dano e não conta como proteção adicional.'),
        Reforçada: entry('Resistência igual ao Valor da Potência principal × 2.', 'Use para Criações mais difíceis de destruir.', 'Não aumenta ataque, força, Área ou funções.'),
        Superior: entry('Resistência igual ao Valor da Potência principal × 3.', 'Use para manifestações excepcionalmente resistentes.', 'Não concede imunidade ou recuperação automática.')
      },
      creationAction: {
        Contínua: entry('A função permanece operando sem gastar novas oportunidades.', 'Use para luz, aura, campo, barreira ou Intensidade contínua.', 'Não reaplica automaticamente o Valor completo.'),
        Condicionada: entry('Guarda uma aplicação para um gatilho objetivo e a consome quando ele ocorre.', 'Use para armadilhas e respostas preparadas.', 'Não reconhece intenção, culpa ou inimigos sem percepção apropriada.'),
        Comandada: entry('A função usa uma Ação ou Reação do usuário.', 'Use quando o criador dirige cada atuação.', 'Comandar não é nova ativação do Milagre.'),
        'Ação Própria': entry('Uma das Criações do personagem utiliza uma oportunidade sem consumir a Ação do usuário.', 'Use para autonomia mecânica.', 'Entre dois Turnos do usuário, somente uma de todas as suas Criações usa Ação Própria; uma oportunidade faz uma função ou Movimento, não ambos.')
      },
      traversalType: {
        '': entry('Nenhuma Travessia escolhida.', 'Selecione o caminho extraordinário.'),
        'Condução sobrenatural': entry('Percorre um caminho sobrenatural contínuo ainda reconhecível.', 'Use para correr sobre luz, caminhar pelo céu ou seguir um vínculo.', 'Não ignora automaticamente obstáculos incompatíveis.'),
        Permeação: entry('Atravessa matéria ou barreiras compatíveis sem abrir um portal.', 'Use para cruzar paredes, sombras ou substâncias definidas.', 'Não permite permanecer dentro de matéria sem regra própria.'),
        Descontinuidade: entry('Desaparece de uma origem e reaparece em um destino sem percorrer o intervalo.', 'Use para teleporte direto.', 'Não cria passagem para outras criaturas.'),
        'Travessia Limiar': entry('Abre uma passagem entre dois limites compatíveis.', 'Use para portais, espelhos, sonhos, sombras ou fronteiras.', 'A abertura, duração e usuários permitidos ainda precisam ser definidos.'),
        'Continuidade Limiar': entry('Mantém uma passagem limiar já criada disponível por mais tempo.', 'Use quando o portal precisa continuar aberto.', 'Não aumenta a distância nem cria novos destinos.')
      },
      transformationScope: {
        Superficial: entry('Altera aparência, cor, textura ou detalhes externos.', 'Use quando estrutura e função permanecem iguais.', 'Não concede anatomia funcional nova.'),
        Local: entry('Altera uma parte específica do alvo.', 'Use para olhos, mãos, pele, órgão ou membro definido.', 'Não transforma o corpo inteiro.'),
        Amplo: entry('Altera várias partes ou um sistema corporal relevante.', 'Use para metamorfoses extensas ainda parciais.', 'Não substitui integralmente a natureza do alvo.'),
        Integral: entry('Transforma a estrutura geral do alvo.', 'Use para uma forma completa e coerente.', 'Funções, Potência e capacidades novas ainda precisam ser compradas.')
      },
      resourceFunction: {
        '': entry('Nenhuma função de recurso escolhida.', 'Selecione quando houver origem, destino e recurso.'),
        'Transferência de Recurso': entry('Move uma quantidade de recurso de uma origem para um destino.', 'Use para Vida, Reserva, energia ou matéria quantificada.', 'Não cria recurso novo.'),
        Absorção: entry('Retira recurso de outra existência e o incorpora ao destino.', 'Use quando há apropriação e oposição.', 'Não ignora limites de armazenamento.'),
        'Fusão de Recursos': entry('Combina reservas ou quantidades em uma relação comum.', 'Use para compartilhar um total entre existências.', 'Não multiplica o valor combinado.'),
        'Canal de Recurso': entry('Mantém um caminho pelo qual recursos podem ser transferidos depois.', 'Use para vínculos contínuos.', 'O canal não fornece recurso nem aplicações gratuitas.')
      },
      informationFunction: {
        '': entry('Nenhuma função de informação escolhida.', 'Selecione o tipo de leitura ou interferência.'),
        'Percepção Sobrenatural': entry('Detecta algo que sentidos comuns não perceberiam.', 'Use para presenças, energia, vida, espíritos ou sinais definidos.', 'Não concede automaticamente identificação completa.'),
        Rastreamento: entry('Segue vestígios de um alvo ao longo do espaço ou do tempo recente.', 'Use quando a posição precisa ser atualizada.', 'Exige um vínculo, rastro ou critério rastreável.'),
        'Percepção Penetrante': entry('Percebe através de um obstáculo ou camada definida.', 'Use para paredes, corpos, ocultações ou disfarces compatíveis.', 'Não atravessa qualquer proteção sem disputa.'),
        'Observação Remota': entry('Estabelece um ponto de percepção distante do usuário.', 'Use para vigiar outro local.', 'Não transporta o usuário nem permite agir dali sem Origem Vinculada.'),
        'Compartilhamento de Percepção': entry('Permite usar diretamente um sentido de outra existência vinculada.', 'Use com Criações, Parasitas ou aliados conectados.', 'Não concede atenção perfeita a vários pontos.'),
        'Canal de Informação': entry('Cria um caminho contínuo para transmitir informação.', 'Use para comunicação sobrenatural.', 'Não concede Controle, percepção ou ação.'),
        Ocultação: entry('Dificulta ou impede que uma informação seja percebida.', 'Use para esconder presença, identidade, estado ou rastro definido.', 'Não torna o alvo fisicamente inexistente.'),
        Falsificação: entry('Faz uma leitura apresentar informação incorreta.', 'Use para máscaras, sinais falsos e identidades simuladas.', 'Não altera a realidade por trás da leitura.'),
        'Leitura do Passado': entry('Obtém vestígios de acontecimentos anteriores ligados a alvo ou local.', 'Use para reconstruir eventos.', 'Não garante verdade absoluta nem acesso ilimitado a toda história.')
      },
      informationDepth: {
        Presença: entry('Responde apenas se algo está ou não presente.', 'Use para detecção binária.'),
        Classificação: entry('Informa a categoria geral do que foi percebido.', 'Use para distinguir vivo, morto, espírito, doença ou outra classe.'),
        Identificação: entry('Reconhece qual indivíduo, objeto ou assinatura está presente.', 'Use quando nome ou identidade específica importam.'),
        'Estado atual': entry('Revela condições e situação presente do alvo.', 'Use para ferimentos, atividade, localização ou condição definida.'),
        'Informação profunda': entry('Acessa detalhes internos, vínculos, memórias ou estrutura complexa permitida.', 'Use apenas quando a Vertente e a função justificam profundidade elevada.', 'Não concede onisciência.')
      },
      protectionFunction: {
        '': entry('Nenhuma função protetora escolhida.', 'Selecione a forma de oposição.'),
        'Proteção Sobrenatural': entry('Cria um Valor defensivo contra uma função ou ameaça definida.', 'Use para escudos, resistência sobrenatural e barreiras aplicadas.', 'Não é Resistência de Criação.'),
        Redução: entry('Diminui o Valor ou a consequência de um efeito sem anulá-lo.', 'Use para mitigação parcial.', 'Não impede automaticamente condições anexas.'),
        'Acumulação de duas proteções': entry('Permite que duas proteções normalmente incompatíveis contribuam juntas.', 'Use somente quando duas fontes defensivas precisam coexistir.', 'Não cria uma terceira proteção.'),
        Neutralização: entry('Impede uma aplicação ao vencer a oposição apropriada.', 'Use para cancelar o efeito no momento em que atua.', 'Não encerra automaticamente manifestações já existentes.'),
        'Supressão adicional': entry('Interrompe temporariamente uma função ou manifestação já ativa.', 'Use para manter um efeito inoperante.', 'Não destrói nem dissipa a origem.'),
        'Dissipação adicional': entry('Encerra uma manifestação ou efeito sobrenatural válido.', 'Use para remover aquilo que já está ativo.', 'Não desfaz consequências comuns já produzidas.'),
        Redirecionamento: entry('Muda o destino ou a trajetória de uma aplicação.', 'Use para enviar o efeito a outro alvo ou ponto válido.', 'Não copia o efeito.'),
        'Reflexão adicional': entry('Devolve uma aplicação ao emissor ou origem válida.', 'Use quando o efeito retorna em vez de apenas ser bloqueado.', 'A reflexão ainda enfrenta limites de alvo, Alcance e compatibilidade.')
      },
      combatProfile: {
        Nenhum: entry('Nenhuma oportunidade adicional é comprada.', 'Use quando a ativação e as regras já escolhidas bastam.'),
        Movimento: entry('A capacidade utiliza uma oportunidade de Movimento.', 'Use para funções associadas à locomoção ou substituição do Movimento.'),
        Reação: entry('A capacidade utiliza uma Reação diante de gatilho.', 'Use para respostas durante o Turno de outra criatura.'),
        'Gatilho adicional': entry('Registra uma condição objetiva capaz de disparar uma aplicação preparada.', 'Use com funções Condicionadas.', 'Gatilho não concede nova oportunidade sozinho.'),
        'Momento reativo adicional': entry('Cria um momento específico em que uma Reação válida pode ser usada.', 'Use quando o gatilho comum não cobre a situação.', 'Ainda consome a Reação correspondente.'),
        'Ação Própria de Criações': entry('Permite uma oportunidade compartilhada entre todas as Criações do personagem.', 'Use para autonomia mecânica de invocações.', 'Não concede uma ação para cada unidade.')
      },
      damageFunction: {
        'Dano Direto': entry('Reduz Vida ou Resistência pelo Valor aplicado.', 'Use para ataques e efeitos destrutivos diretos.', 'Não impõe automaticamente Condição ou Ferimento específico.'),
        Mitigação: entry('Reduz dano recebido.', 'Use para proteção numérica contra perda de Vida ou Resistência.'),
        'Imposição de Condição': entry('Aplica um estado definido ao alvo.', 'Use quando o resultado principal é uma Condição.', 'A condição precisa declarar efeito e encerramento.'),
        'Restrição estreita': entry('Impede uma ação ou possibilidade bem específica.', 'Use para proibir um gesto, direção ou função limitada.', 'Não bloqueia uma categoria ampla de ações.'),
        'Restrição ampla': entry('Impede uma categoria relevante de ações ou capacidades.', 'Use para limitações abrangentes.', 'Ainda precisa definir contrajogo e oposição.'),
        'Restrição de oportunidade': entry('Remove, ocupa ou impede uma oportunidade de Ação, Movimento ou Reação.', 'Use quando o alvo perde acesso a um momento do Turno.', 'Não equivale automaticamente a paralisia total.')
      },
      healingFunction: {
        '': entry('Nenhuma função restauradora escolhida.', 'Selecione a operação de recuperação.'),
        Cura: entry('Restaura Vida de organismo vivo.', 'Use para recuperação numérica comum.', 'Não remove automaticamente Ferimentos, Doenças ou Condições.'),
        Reparo: entry('Restaura Resistência ou integridade de objeto e Criação.', 'Use para estruturas, equipamentos e manifestações.', 'Não cura organismos vivos sem compatibilidade.'),
        'Tratamento de Ferimento': entry('Remove ou melhora um Ferimento específico.', 'Use quando a consequência supera simples perda de Vida.', 'Pode exigir tempo, estrutura ou limite de recuperação.'),
        'Restauração de Condição': entry('Remove ou reverte uma Condição válida.', 'Use para estados que não são apenas dano.', 'Não remove toda origem que poderia reaplicar a Condição.'),
        'Regeneração Estrutural': entry('Reconstrói parte perdida ou estrutura destruída.', 'Use para membros, órgãos, tecidos ou componentes.', 'Exige matéria, identidade e compatibilidade definidas.'),
        'Preservação corporal': entry('Impede deterioração ou destruição do corpo por um período.', 'Use para conservar cadáver, organismo ou receptáculo.', 'Não restaura Vida nem devolve a identidade.'),
        'Preservação de Identidade': entry('Mantém a identidade disponível apesar da separação do corpo.', 'Use como requisito de Retorno ou incorporação.', 'Não cria corpo nem realiza Retorno sozinha.'),
        'Imposição Sobrenatural de Morte': entry('Encerra diretamente uma existência por autoridade apropriada.', 'Use apenas quando Domínio e Vertente permitem Finitude.', 'Não é dano comum e exige todos os limites da Morte.'),
        Retorno: entry('Devolve uma identidade encerrada a um receptáculo válido.', 'Use para ressurreição ou retorno equivalente previsto pela regra.', 'Não cria automaticamente identidade, corpo compatível ou consentimento.'),
        'Incorporação em novo corpo': entry('Vincula uma identidade preservada a outro receptáculo.', 'Use quando o retorno ocorre em corpo diferente.', 'Não concede as capacidades completas do corpo anterior.')
      },
      costFunction: {
        Nenhuma: entry('O Milagre não usa uma função especial de custo.', 'Use o pagamento normal previsto pela ficha.'),
        'Pagamento dividido': entry('Mais de uma fonte divide o custo da ativação.', 'Use quando participantes ou Reservas colaboram.', 'Não reduz o custo total.'),
        'Recurso alternativo': entry('Permite pagar com outro recurso definido.', 'Use quando a ficção e a regra estabelecem combustível substituto.', 'Não torna o Milagre gratuito.'),
        'Pagamento Terminal': entry('O pagamento produz perda extrema ou irreversível definida.', 'Use para custos que encerram, destroem ou sacrificam algo essencial.', 'Não é apenas uma penalidade temporária.'),
        'Recarga de Reserva': entry('Recupera unidades de uma Reserva finita.', 'Use quando a Reserva pode ser alimentada depois.', 'Não supera o limite máximo.'),
        'Recarga de capacidade discreta': entry('Restaura um Uso ou oportunidade específica já consumida.', 'Use para capacidades de poucas aplicações.', 'Não reinicia o Milagre inteiro.'),
        'Recarga Condicionada': entry('A recuperação só ocorre após uma condição objetiva.', 'Use para ciclos, alimentação ou rituais.', 'A condição precisa ser verificável.'),
        Conversão: entry('Transforma um recurso em outro segundo proporção definida.', 'Use para trocar Vida, Reserva, matéria ou energia.', 'Não cria valor adicional.'),
        'Alimentação Sacrificial': entry('Um sacrifício fornece recurso ou recarga.', 'Use quando a destruição de algo alimenta o Milagre.', 'O sacrifício precisa possuir valor e vínculo reais.'),
        'Autoridade sobre Sacrifício': entry('Permite governar ou redirecionar relações sacrificiais.', 'Use quando o próprio ato de sacrificar é manipulado.', 'Não concede domínio sobre qualquer morte ou perda.')
      }
    },

    functionGuides: {
      value: entry('Modifica diretamente um número do jogo.', 'Dano, Cura, bônus, penalidade, proteção ou perda de recurso.', 'Não define sozinho o que o número representa.'),
      space: entry('Muda posição, trajetória ou ocupação de uma região.', 'Movimento, Deslocamento, Acompanha, transporte ou Área móvel.', 'Não concede força, ação ou teleporte automaticamente.'),
      creation: entry('Produz algo que existe separadamente e pode ser afetado.', 'Criaturas, objetos, barreiras, estruturas, enxames, campos e invocações.', 'A aparência não concede capacidades; use o Projeto da Criação.'),
      propagation: entry('Cria novos focos ou destinos depois da aplicação inicial.', 'Contágios, reprodução, crescimento por etapas e efeitos que se espalham.', 'Movimento não é Propagação.'),
      traversal: entry('Alcança um destino por caminho impossível.', 'Teleporte, portais, permeação, espelhos, sombras e Sonhos.', 'Não substitui Alcance ou Movimento.'),
      transformation: entry('Muda estrutura, forma, anatomia ou composição.', 'Metamorfoses, alterações corporais e mudança de matéria.', 'A aparência nova não concede funções não compradas.'),
      control: entry('Interfere em emoções, escolhas, movimentos ou funções existentes.', 'Influência, Compulsão, Dominação e vínculos possessivos.', 'Não cria capacidades que o alvo não possui.'),
      resources: entry('Move ou combina algo que já existe e pode ser quantificado.', 'Vida, Reserva, matéria, energia e recursos internos.', 'Não produz recurso infinito.'),
      information: entry('Obtém, transmite, oculta ou falsifica informação.', 'Sentidos, rastreamento, comunicação e observação remota.', 'Perceber não é controlar nem agir à distância.'),
      protection: entry('Opoõe-se a dano, função ou manifestação.', 'Redução, neutralização, supressão, dissipação, redirecionamento e reflexão.', 'Precisa declarar o que enfrenta.'),
      combat: entry('Define quando uma capacidade atua e qual oportunidade utiliza.', 'Ações, Movimentos, Reações, gatilhos e autonomia de Criações.', 'Gatilho não cria ação sozinho.'),
      damage: entry('Prejudica integridade, estado ou oportunidades.', 'Dano, Ferimentos, Condições e restrições.', 'Consequências diferentes precisam ser registradas.'),
      healing: entry('Restaura, repara, preserva ou devolve uma existência.', 'Cura, Regeneração, Tratamento, preservação e Retorno.', 'Cada operação possui requisitos próprios.'),
      costs: entry('Altera pagamento, armazenamento ou recuperação do poder.', 'Reservas, Recargas, Conversões e Sacrifícios.', 'Não substitui a função principal do Milagre.')
    },

    creation: {
      natures: [
        option('creature', 'Criatura ou espírito', 0, 'Possui corpo ou presença capaz de agir, perceber e ocupar uma posição.', 'Não recebe inteligência, ataque ou autonomia sem registro.'),
        option('object', 'Objeto ou foco', 0, 'É uma coisa separada que pode ser carregada, destruída ou usada como Âncora.', 'Não utiliza funções ativas sem atuação válida.'),
        option('barrier', 'Barreira ou estrutura', 0, 'Ocupa espaço e normalmente protege pela própria Resistência e posição.', 'Resistência não pode ser cobrada novamente como Proteção.'),
        option('field', 'Campo, nuvem ou fenômeno', 0, 'É uma manifestação distribuída que normalmente usa Área.', 'Não possui corpo compacto nem escolhe alvos dentro da Área.'),
        option('collective', 'Enxame, horda ou coletivo', 0, 'Muitos corpos narrativos funcionam como uma unidade mecânica.', 'A quantidade visual não multiplica ações ou valores.'),
        option('vehicle', 'Montaria, veículo ou plataforma', 0, 'Possui espaço físico e pode transportar quando compra Deslocamento e capacidade compatível.', 'Tamanho não concede transporte sozinho.'),
        option('custom', 'Outra manifestação separada', 0, 'Use para uma forma que não se encaixa nas categorias anteriores.', 'Ainda precisa registrar posição, função, resistência ou dependência.')
      ],
      existence: [
        option('resistance', 'Destrutível por Resistência', 0, 'A Criação termina quando sua Resistência chega a 0.'),
        option('dependency', 'Dependente de Âncora ou condição', 0, 'Não possui Resistência própria e termina quando a dependência é rompida.', 'Não pode funcionar como barreira material indestrutível.'),
        option('both', 'Resistência e dependência', 0, 'Pode ser destruída ou encerrada ao perder a Âncora; o que ocorrer primeiro termina a Criação.')
      ],
      multiplicity: [
        option('single', 'Uma Criação', 0, 'Produz uma unidade com o perfil registrado.'),
        option('collective', 'Criação Coletiva', 0, 'Muitos corpos narrativos formam uma única unidade, Resistência e oportunidade.'),
        option('fragmented', 'Criação Fragmentada', 0, 'Várias unidades dividem Potência, Resistência, Reservas e quantidades finitas.'),
        option('complete', 'Criações Completas', 0, 'Cada unidade recebe integralmente o perfil comprado; oportunidades continuam compartilhadas.')
      ],
      fragments: [
        option('1', '1 unidade', 0, 'Não há multiplicidade adicional.'),
        option('2', 'Até 2', 1, 'Divide o total entre até duas unidades.'),
        option('3', 'Até 3', 2, 'Divide o total entre até três unidades.'),
        option('5', 'Até 5', 3, 'Divide o total entre até cinco unidades.'),
        option('10', 'Até 10', 5, 'Divide o total entre até dez unidades.'),
        option('20', 'Até 20', 7, 'Divide o total entre até vinte unidades.'),
        option('50', 'Até 50', 10, 'Divide o total entre até cinquenta unidades.')
      ],
      complete: [
        option('1', '1 unidade', 0, 'Não há multiplicidade adicional.'),
        option('2', 'Até 2', 3, 'Duas unidades recebem o perfil completo.'),
        option('3', 'Até 3', 6, 'Três unidades recebem o perfil completo.'),
        option('5', 'Até 5', 10, 'Cinco unidades recebem o perfil completo.'),
        option('10', 'Até 10', 15, 'Dez unidades recebem o perfil completo.'),
        option('20', 'Até 20', 21, 'Vinte unidades recebem o perfil completo.'),
        option('50', 'Até 50', 28, 'Cinquenta unidades recebem o perfil completo.')
      ],
      bodyModel: [
        option('compact', 'Corpo compacto — usa Escala', 0, 'Criaturas, árvores, estátuas, veículos e objetos usam Escala.'),
        option('distributed', 'Manifestação distribuída — usa Área', 0, 'Nuvens, redes, campos, muralhas extensas e tempestades usam Área.')
      ],
      scale: [
        option('Comum', 'Comum — até 2 m', 0, 'Tamanho padrão de um corpo individual.'),
        option('Grande', 'Grande — até 4 m', 1, 'Corpo grande; tamanho não aumenta força ou Resistência.'),
        option('Enorme', 'Enorme — até 10 m', 3, 'Corpo muito grande que pode ocupar passagens e oferecer cobertura posicional.'),
        option('Colossal', 'Colossal — até 20 m', 6, 'Estrutura colossal; ainda é um único alvo.'),
        option('Monumental', 'Monumental — até 50 m', 10, 'Estrutura monumental; funções e alcance continuam separados.'),
        option('Titânica', 'Titânica — até 100 m', 15, 'Maior Escala catalogada para corpo compacto.')
      ],
      bodyArea: [
        option('2', '2 metros', 3, 'Manifestação distribuída em região pequena.'),
        option('4', '4 metros', 6, 'Manifestação distribuída em região moderada.'),
        option('10', '10 metros', 10, 'Manifestação distribuída ampla.'),
        option('20', '20 metros', 15, 'Manifestação distribuída muito ampla.'),
        option('50', '50 metros', 21, 'Manifestação distribuída de grande escala.'),
        option('100', '100 metros', 28, 'Maior Área catalogada.')
      ],
      mobility: [
        option('stationary', 'Permanece parada', 0, 'A Criação não muda a própria posição.'),
        option('follows', 'Acompanha um alvo', 1, 'Permanece vinculada à posição de uma criatura ou objeto.', 'Não escolhe caminho nem troca de vínculo gratuitamente.'),
        option('own', 'Possui Movimento próprio', 0, 'Muda a própria posição quando utiliza uma oportunidade válida.', 'Movimento não concede ação, ataque ou transporte.')
      ],
      movement: [
        option('0', 'Sem Movimento', 0, 'Permanece parada.'),
        option('5', '5 metros', 1, 'Percorre até 5 metros por oportunidade válida.'),
        option('15', '15 metros', 2, 'Percorre até 15 metros por oportunidade válida.'),
        option('30', '30 metros', 3, 'Percorre até 30 metros por oportunidade válida.'),
        option('100', '100 metros', 5, 'Percorre até 100 metros por oportunidade válida.'),
        option('500', '500 metros', 7, 'Percorre até 500 metros por oportunidade válida.')
      ],
      transport: [
        option('0', 'Não transporta outras existências', 0, 'Movimento próprio muda apenas a posição da Criação.'),
        option('2', 'Deslocamento de 2 m', 1, 'Pode tentar transportar ou mover outro alvo por até 2 metros.'),
        option('5', 'Deslocamento de 5 m', 2, 'Pode tentar transportar ou mover outro alvo por até 5 metros.'),
        option('10', 'Deslocamento de 10 m', 3, 'Pode tentar transportar ou mover outro alvo por até 10 metros.'),
        option('20', 'Deslocamento de 20 m', 5, 'Pode tentar transportar ou mover outro alvo por até 20 metros.'),
        option('50', 'Deslocamento de 50 m', 7, 'Pode tentar transportar ou mover outro alvo por até 50 metros.'),
        option('100', 'Deslocamento de 100 m', 10, 'Pode tentar transportar ou mover outro alvo por até 100 metros.')
      ],
      communication: [
        option('none', 'Somente meios comuns', 0, 'Pode falar, gesticular ou sinalizar apenas quando sua forma e distância permitirem.'),
        option('toCreation', 'Usuário transmite para a Criação', 1, 'Ordens e informação alcançam a Criação pelo Vínculo.'),
        option('fromCreation', 'Criação transmite para o usuário', 1, 'A Criação envia informação ao usuário pelo Vínculo.'),
        option('bilateral', 'Comunicação bilateral', 2, 'Usuário e Criação transmitem informação nos dois sentidos.'),
        option('sharedPerception', 'Bilateral + percepção compartilhada', 5, 'Inclui comunicação nos dois sentidos e permite usar um sentido real da Criação.', 'Abrir ou trocar a percepção usa uma Ação; uma unidade por vez.')
      ],
      linkedOrigin: [
        option('none', 'Não serve como origem de outros Milagres', 0, 'Outros Milagres continuam começando no usuário.'),
        option('linked', 'Origem Vinculada', 3, 'Outro Milagre comprado para isso pode começar a partir da Criação.', 'A origem muda; o usuário, custos e oportunidades não mudam.')
      ],
      origins: [
        option('1', '1 origem', 0, 'Uma ativação utiliza uma origem vinculada.'),
        option('2', 'Até 2 origens', 3, 'A aplicação pode começar simultaneamente de duas origens.'),
        option('3', 'Até 3 origens', 6, 'A aplicação pode começar simultaneamente de três origens.'),
        option('5', 'Até 5 origens', 10, 'A aplicação pode começar simultaneamente de cinco origens.'),
        option('10', 'Até 10 origens', 15, 'A aplicação pode começar simultaneamente de dez origens.'),
        option('20', 'Até 20 origens', 21, 'A aplicação pode começar simultaneamente de vinte origens.'),
        option('50', 'Até 50 origens', 28, 'A aplicação pode começar simultaneamente de cinquenta origens.')
      ],
      capabilityTypes: [
        option('damage', 'Dano Direto', 0, 'Reduz Vida ou Resistência pelo Valor da função.'),
        option('healing', 'Cura', 1, 'Restaura Vida pelo Valor da função.'),
        option('repair', 'Reparo', 1, 'Restaura Resistência ou integridade de objeto e Criação.'),
        option('protection', 'Proteção Sobrenatural', 1, 'Cria oposição numérica contra ameaça definida.'),
        option('influence', 'Controle — Influência', 1, 'Inclina emoção ou decisão sem obrigar ação.'),
        option('compulsion', 'Controle — Compulsão', 3, 'Impõe ordem; o alvo escolhe detalhes não definidos.'),
        option('domination', 'Controle — Dominação', 7, 'Controla integralmente uma oportunidade discreta.'),
        option('perception', 'Percepção Sobrenatural', 1, 'Detecta algo além dos sentidos comuns.'),
        option('tracking', 'Rastreamento', 3, 'Segue vestígio ou assinatura definida.'),
        option('condition', 'Imposição de Condição', 1, 'Aplica um estado com efeito e encerramento próprios.'),
        option('restrictionNarrow', 'Restrição estreita', 1, 'Impede possibilidade específica.'),
        option('restrictionBroad', 'Restrição ampla', 3, 'Impede categoria relevante de ações ou funções.'),
        option('transfer', 'Transferência de Recurso', 1, 'Move recurso existente entre origem e destino.'),
        option('traversal', 'Travessia ou capacidade especial', 0, 'Use o campo de custo específico para registrar a capacidade catalogada.'),
        option('custom', 'Outra função catalogada', 0, 'Descreva a regra e informe apenas o custo publicado correspondente.')
      ],
      abilityActing: [
        option('continuous', 'Contínua', 0, 'Permanece funcionando; não repete automaticamente o Valor.'),
        option('conditioned', 'Condicionada', 0, 'Guarda uma aplicação para gatilho objetivo.'),
        option('commandedAction', 'Comandada pela Ação do usuário', 0, 'Usa a Ação do usuário para atuar.'),
        option('commandedReaction', 'Comandada pela Reação do usuário', 0, 'Usa a Reação do usuário diante de gatilho.'),
        option('own', 'Ação Própria', 8, 'Usa a oportunidade compartilhada entre todas as Criações do personagem.')
      ],
      abilityRange: [
        option('Pessoal ou Contato', 'Pessoal ou Contato', 0, 'A função atua na própria Criação ou por contato.'),
        option('5 metros', '5 metros', 1, 'A função alcança até 5 metros a partir da Criação.'),
        option('15 metros', '15 metros', 2, 'A função alcança até 15 metros a partir da Criação.'),
        option('30 metros', '30 metros', 3, 'A função alcança até 30 metros a partir da Criação.'),
        option('100 metros', '100 metros', 5, 'A função alcança até 100 metros a partir da Criação.'),
        option('500 metros', '500 metros', 7, 'A função alcança até 500 metros a partir da Criação.')
      ]
    }
  };
})();
