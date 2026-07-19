(() => {
  'use strict';

  const option = (value, label, cost = 0, note = '') => ({ value, label, cost, note });

  window.HarmoniaMiracleStudioData = {
    version: '2026.07.20-a',

    ranks: [
      option('I', 'Rank I', 0, 'Orçamento de 12 pontos.'),
      option('II', 'Rank II', 0, 'Orçamento de 20 pontos.'),
      option('III', 'Rank III', 0, 'Orçamento de 30 pontos.')
    ],

    budgets: { I: 12, II: 20, III: 30 },

    deities: {
      'Senhor das Chagas': {
        domains: {
          Doenças: {
            summary: 'Doenças, epidemias, sintomas, deterioração e mutações patológicas.',
            branches: {
              Mácula: 'A contaminação que altera e profana um organismo.',
              Contágio: 'A transmissão de enfermidades entre hospedeiros e ambientes.',
              Aflição: 'Os sintomas, dores, febres e perturbações causados pela doença.',
              Consunção: 'O desgaste progressivo que consome funções e reservas.',
              Aberração: 'As deformações e adaptações produzidas pela enfermidade.'
            }
          },
          Parasitas: {
            summary: 'Infestação, dependência entre organismos, apropriação e linhagens parasitárias.',
            branches: {
              Infestação: 'A ocupação de corpos ou espaços por organismos parasitários.',
              Espoliação: 'A retirada de matéria, energia ou recursos do hospedeiro.',
              Simbiose: 'A relação de dependência e benefício compartilhado entre organismos.',
              Usurpação: 'A apropriação de funções, órgãos ou decisões por um parasita.',
              Linhagem: 'A reprodução, transmissão e continuidade de uma espécie parasitária.'
            }
          }
        }
      },
      'Senhor do Crepúsculo': {
        domains: {
          Morte: {
            summary: 'Encerramento da vida, cadáveres, espíritos, descanso e elaboração da perda.',
            branches: {
              Finitude: 'O encerramento inevitável e definitivo de uma existência.',
              'Restos Mortais': 'Cadáveres, ossos, cinzas e matéria deixada pelos mortos.',
              Espíritos: 'A presença e atuação das identidades que persistem após a morte.',
              Repouso: 'O silêncio, o descanso e a interrupção da atividade dos mortos.',
              Luto: 'O vínculo entre os vivos, a perda e a memória daqueles que partiram.'
            }
          },
          Trevas: {
            summary: 'Ausência de luz, sombras, ocultação, eclipses e profundezas escuras.',
            branches: {
              Breu: 'A escuridão absoluta que impede a luz e a percepção visual.',
              Sombra: 'A forma escura projetada ou vinculada a uma presença.',
              Eclipse: 'A interrupção ou cobertura de uma fonte luminosa.',
              Penumbra: 'A região intermediária entre a luz e o breu.',
              Abismo: 'A profundidade escura, distante e difícil de alcançar.'
            }
          }
        }
      },
      'Senhora da Aurora': {
        domains: {
          Vida: {
            summary: 'Organismos vivos, restauração, sangue, desenvolvimento, geração e persistência corporal.',
            branches: {
              Cura: 'A restauração de ferimentos, tecidos e funções comprometidas.',
              Sangue: 'A circulação, condução e partilha da corrente vital.',
              Crescimento: 'O desenvolvimento e a maturação de estruturas vivas.',
              Fecundidade: 'A germinação, o nascimento e a criação de novas vidas.',
              Vigor: 'A força que mantém um organismo ativo sob esforço e ferimentos.'
            }
          },
          Luz: {
            summary: 'Emissão luminosa, cores, refração, reflexos e revelação pela claridade.',
            branches: {
              Esplendor: 'A emissão e intensidade da luz.',
              Espectro: 'As cores e frequências que compõem a luz.',
              Refração: 'A mudança de direção da luz ao atravessar um meio.',
              Reflexo: 'O retorno e a duplicação de imagens luminosas.',
              Claridade: 'A revelação daquilo que a luz torna visível.'
            }
          }
        }
      },
      'Soberana do Céu': {
        domains: {
          Céu: {
            summary: 'Firmamento, nuvens, ventos, tempestades e condições atmosféricas.',
            branches: {
              Firmamento: 'A extensão celeste, a altitude e os caminhos do alto.',
              Nuvens: 'Vapor, condensação e massas suspensas no céu.',
              Vento: 'Correntes de ar e deslocamentos atmosféricos.',
              Tormenta: 'Tempestades, raios, trovões e violência climática.',
              Clima: 'A organização ampla e duradoura das condições atmosféricas.'
            }
          },
          Sol: {
            summary: 'Calor solar, coroa, centralidade, curso dos astros e eclipses solares.',
            branches: {
              Incandescência: 'O calor e a luminosidade produzidos pelo Sol.',
              Coroa: 'A expansão radiante e as emanações ao redor de um núcleo solar.',
              Trono: 'A centralidade que organiza atração, repulsão e órbita.',
              Curso: 'O movimento regular do Sol e dos corpos celestes.',
              Eclipse: 'A ocultação, o alinhamento e a interrupção da presença solar.'
            }
          }
        }
      },
      'Senhor dos Véus': {
        domains: {
          Sonhos: {
            summary: 'Sono, imaginação, memória onírica, desejos e presságios.',
            branches: {
              Sono: 'A entrada, manutenção e profundidade do estado adormecido.',
              Imaginação: 'A criação de imagens, cenários e possibilidades mentais.',
              Memória: 'Recordações acessadas ou reorganizadas pela experiência onírica.',
              Desejo: 'Anseios, impulsos e vontades manifestados pelo sonho.',
              Presságio: 'Sinais e possibilidades futuras percebidas durante o sonho.'
            }
          },
          Pesadelos: {
            summary: 'Medo, sofrimento onírico, isolamento, perseguição e repetição traumática.',
            branches: {
              Pavor: 'O medo intenso despertado por uma ameaça percebida.',
              Tormento: 'A dor e o sofrimento prolongados dentro do pesadelo.',
              Desamparo: 'A sensação de impotência, abandono e ausência de saída.',
              Caçada: 'A perseguição inevitável entre predador e vítima.',
              Ciclo: 'A repetição de uma experiência angustiante ou inevitável.'
            }
          }
        }
      }
    },

    functions: [
      {
        id: 'value',
        name: 'Afetar um valor',
        short: 'Causar dano, proteger, curar, enfraquecer ou alterar um valor.',
        question: 'O resultado principal aumenta, reduz ou restaura um valor?',
        page: 'dano-ferimentos-condicoes-e-derrota.html',
        anchor: 'visao-rapida',
        required: ['Qual valor é alterado?', 'Como o Valor da Potência é aplicado?', 'O efeito causa dano, Cura, proteção ou penalidade?']
      },
      {
        id: 'space',
        name: 'Mover ou ocupar espaço',
        short: 'Deslocar, acompanhar, empurrar, atrair, repelir ou preencher uma região.',
        question: 'Alguém muda de posição ou uma região passa a ser ocupada?',
        page: 'alcance-alvos-area-e-movimento.html',
        anchor: 'visao-rapida',
        required: ['Quem se move?', 'Qual é a distância?', 'O deslocamento exige caminho livre?', 'Existe Área?']
      },
      {
        id: 'creation',
        name: 'Criar ou invocar',
        short: 'Produzir criatura, objeto, barreira, estrutura ou fenômeno separável.',
        question: 'O Milagre produz algo que pode ocupar posição e ser afetado separadamente?',
        page: 'criacoes-invocacoes-e-manifestacoes-separadas.html',
        anchor: 'visao-rapida',
        required: ['O que é criado?', 'Qual Resistência possui?', 'Como atua?', 'Quantas manifestações podem existir?']
      },
      {
        id: 'propagation',
        name: 'Propagar ou reproduzir',
        short: 'Criar novos focos, hospedeiros, unidades ou etapas após a ativação.',
        question: 'O efeito continua produzindo novos destinos depois de ser ativado?',
        page: 'propagacao-reproducao-e-crescimento.html',
        anchor: 'visao-rapida',
        required: ['O que gera um novo Passo?', 'Quantos Passos existem?', 'Os recursos são compartilhados?', 'Como a propagação termina?']
      },
      {
        id: 'traversal',
        name: 'Atravessar ou teleportar',
        short: 'Ignorar caminho comum, atravessar matéria, abrir portal ou cruzar fronteira.',
        question: 'O destino é alcançado sem percorrer normalmente o espaço intermediário?',
        page: 'travessias-e-caminhos-sobrenaturais.html',
        anchor: 'visao-rapida',
        required: ['Qual tipo de Travessia é usado?', 'Qual distância é cruzada?', 'O caminho permanece aberto?', 'Quem pode atravessar?']
      },
      {
        id: 'transformation',
        name: 'Transformar',
        short: 'Alterar aparência, anatomia, composição, tamanho, natureza ou forma.',
        question: 'A estrutura do alvo continua sendo a mesma depois do efeito?',
        page: 'transformacoes-e-alteracoes.html',
        anchor: 'visao-rapida',
        required: ['Qual parte é alterada?', 'Qual é o Escopo?', 'A função original permanece?', 'Como a forma é restaurada?']
      },
      {
        id: 'control',
        name: 'Controlar',
        short: 'Impor emoção, escolha, oportunidade, movimento, função ou Posse.',
        question: 'O Milagre faz o alvo usar decisões ou capacidades que ele já possui?',
        page: 'controle-influencia-e-posse.html',
        anchor: 'autoridades',
        required: ['Qual é a Via?', 'Qual Autoridade é usada?', 'Qual ordem é imposta?', 'O que consome um Uso?']
      },
      {
        id: 'resources',
        name: 'Transferir ou compartilhar',
        short: 'Mover, absorver, armazenar, fundir ou compartilhar recursos.',
        question: 'Um recurso existente passa de uma existência para outra?',
        page: 'fusao-absorcao-e-transferencia-de-recursos.html',
        anchor: 'visao-rapida',
        required: ['Qual recurso é movido?', 'Qual é a origem?', 'Qual é o destino?', 'O que limita a quantidade?']
      },
      {
        id: 'information',
        name: 'Perceber, ocultar ou falsificar',
        short: 'Detectar, rastrear, observar, comunicar, esconder ou alterar leituras.',
        question: 'O resultado principal é obter, impedir ou modificar informação?',
        page: 'percepcao-ocultacao-e-informacao.html',
        anchor: 'visao-rapida',
        required: ['Qual informação é procurada?', 'Qual Profundidade é necessária?', 'Qual sentido ou Canal é usado?', 'O que pode bloquear a leitura?']
      },
      {
        id: 'protection',
        name: 'Proteger ou neutralizar',
        short: 'Reduzir, bloquear, suprimir, dissipar, redirecionar ou refletir efeitos.',
        question: 'O poder reage ou se opõe a outra função?',
        page: 'protecao-neutralizacao-e-interacao-entre-milagres.html',
        anchor: 'visao-rapida',
        required: ['O que é protegido?', 'Qual função é enfrentada?', 'O efeito reduz, neutraliza ou redireciona?', 'Como os Valores são comparados?']
      },
      {
        id: 'combat',
        name: 'Agir ou reagir',
        short: 'Definir Ação, Movimento, Reação, gatilho ou oportunidade posterior.',
        question: 'O poder precisa atuar fora da Ação normal de ativação?',
        page: 'acoes-reacoes-e-estrutura-do-combate.html',
        anchor: 'visao-rapida',
        required: ['Qual oportunidade é usada?', 'Existe gatilho?', 'O gatilho concede ou apenas utiliza uma oportunidade?', 'Quantas vezes pode ocorrer?']
      },
      {
        id: 'damage',
        name: 'Causar dano ou impor restrição',
        short: 'Reduzir Vida ou Resistência, gerar Ferimentos, Condições ou Derrota.',
        question: 'O resultado prejudica diretamente a integridade ou as oportunidades do alvo?',
        page: 'dano-ferimentos-condicoes-e-derrota.html',
        anchor: 'dano-direto',
        required: ['Qual tipo de dano ou restrição?', 'Qual é o Valor aplicado?', 'Pode gerar Ferimento?', 'O que acontece em 0?']
      },
      {
        id: 'healing',
        name: 'Curar, restaurar ou retornar',
        short: 'Restaurar Vida, tratar Ferimento, remover Condição, regenerar ou realizar Retorno.',
        question: 'O resultado recupera algo perdido ou devolve uma existência?',
        page: 'cura-regeneracao-morte-e-retorno.html',
        anchor: 'visao-rapida',
        required: ['O que é restaurado?', 'Existe Limite de Recuperação?', 'É Cura, Tratamento, Regeneração ou Retorno?', 'Qual identidade e receptáculo são necessários?']
      },
      {
        id: 'costs',
        name: 'Pagar, armazenar ou sacrificar',
        short: 'Definir combustível, Reserva, Recarga, Conversão, Recuperação ou Sacrifício.',
        question: 'O Milagre usa uma forma especial de pagamento ou recuperação?',
        page: 'custos-reservas-sacrificios-e-recuperacao.html',
        anchor: 'visao-rapida',
        required: ['Qual recurso paga o efeito?', 'Quando é consumido?', 'Como é recuperado?', 'Existe conversão ou sacrifício?']
      }
    ],

    core: {
      potency: [
        option('1', 'Grau 1 — Valor 4', 1),
        option('2', 'Grau 2 — Valor 8', 3),
        option('3', 'Grau 3 — Valor 12', 6),
        option('4', 'Grau 4 — Valor 16', 10),
        option('5', 'Grau 5 — Valor 20', 15),
        option('6', 'Grau 6 — Valor 24', 21),
        option('7', 'Grau 7 — Valor 28', 28)
      ],
      activation: [
        option('Ação', 'Ação', 0),
        option('Movimento', 'Movimento', 1),
        option('Reação', 'Reação', 3)
      ],
      range: [
        option('Pessoal ou Contato', 'Pessoal ou Contato', 0),
        option('5 metros', '5 metros', 1),
        option('15 metros', '15 metros', 2),
        option('30 metros', '30 metros', 3),
        option('100 metros', '100 metros', 5),
        option('500 metros', '500 metros', 7),
        option('5 quilômetros', '5 quilômetros', 10),
        option('50 quilômetros', '50 quilômetros', 14)
      ],
      targetMode: [
        option('one', 'Um alvo', 0),
        option('shared', 'Alvos Compartilhados', 0, 'Dividem Potência e recursos finitos.'),
        option('complete', 'Alvos Completos', 0, 'Recebem o perfil completo individualmente.'),
        option('area', 'Área', 0, 'Afeta indiscriminadamente a região definida.')
      ],
      sharedTargets: [
        option('1', '1 alvo', 0), option('2', 'Até 2', 1), option('3', 'Até 3', 2),
        option('5', 'Até 5', 3), option('10', 'Até 10', 5), option('20', 'Até 20', 7), option('50', 'Até 50', 10)
      ],
      completeTargets: [
        option('1', '1 alvo', 0), option('2', 'Até 2', 3), option('3', 'Até 3', 6),
        option('5', 'Até 5', 10), option('10', 'Até 10', 15), option('20', 'Até 20', 21), option('50', 'Até 50', 28)
      ],
      area: [
        option('0', 'Sem Área', 0), option('2', '2 metros', 3), option('4', '4 metros', 6),
        option('10', '10 metros', 10), option('20', '20 metros', 15), option('50', '50 metros', 21), option('100', '100 metros', 28)
      ],
      duration: [
        option('Instantânea', 'Instantânea', 0), option('Breve', 'Breve', 1),
        option('Estendida', 'Estendida', 2), option('Combate', 'Combate', 3),
        option('Prolongada', 'Prolongada', 5), option('Persistente', 'Persistente', 7)
      ]
    },

    modules: {
      control: {
        title: 'Controle',
        fields: [
          {
            id: 'controlAuthority', label: 'Autoridade', type: 'select', options: [
              option('', 'Selecione', 0), option('Influência', 'Influência', 1),
              option('Compulsão', 'Compulsão', 3), option('Dominação', 'Dominação', 7),
              option('Vínculo Possessivo', 'Vínculo Possessivo', 3)
            ]
          },
          {
            id: 'controlWay', label: 'Via', type: 'select', options: [
              option('', 'Selecione', 0), option('Emocional', 'Emocional', 0),
              option('Mental', 'Mental', 0), option('Motora', 'Motora', 0), option('Funcional', 'Funcional', 0)
            ]
          },
          {
            id: 'controlUses', label: 'Usos totais', type: 'select', options: [
              option('1', '1 Uso', 0), option('2', '2 Usos', 1), option('3', 'Até 3 Usos', 2),
              option('4', 'Até 4 Usos', 3), option('6', 'Até 6 Usos', 5), option('11', 'Até 11 Usos', 7),
              option('21', 'Até 21 Usos', 10), option('51', 'Até 51 Usos', 14)
            ]
          },
          { id: 'controlOrder', label: 'Ordem, emoção ou instrução', type: 'text', placeholder: 'Ex.: Proteja-me da melhor maneira que puder.' }
        ]
      },
      creation: {
        title: 'Criação ou Invocação',
        fields: [
          {
            id: 'creationResistance', label: 'Resistência', type: 'select', options: [
              option('Básica', 'Básica — máximo igual ao Valor', 0),
              option('Reforçada', 'Reforçada — máximo Valor × 2', 3),
              option('Superior', 'Superior — máximo Valor × 3', 6)
            ]
          },
          {
            id: 'creationAction', label: 'Atuação', type: 'select', options: [
              option('Contínua', 'Contínua', 0), option('Condicionada', 'Condicionada', 0),
              option('Comandada', 'Comandada', 0), option('Ação Própria', 'Ação Própria', 8)
            ]
          },
          { id: 'creationLimit', label: 'Limite de manifestações ativas', type: 'text', placeholder: 'Ex.: Uma manifestação ativa.' }
        ]
      },
      traversal: {
        title: 'Travessia',
        fields: [{
          id: 'traversalType', label: 'Capacidade', type: 'select', options: [
            option('', 'Selecione', 0), option('Condução sobrenatural', 'Condução sobrenatural', 1),
            option('Permeação', 'Permeação', 3), option('Descontinuidade', 'Descontinuidade', 5),
            option('Travessia Limiar', 'Travessia Limiar', 7), option('Continuidade Limiar', 'Continuidade Limiar', 3)
          ]
        }]
      },
      transformation: {
        title: 'Transformação',
        fields: [{
          id: 'transformationScope', label: 'Escopo', type: 'select', options: [
            option('Superficial', 'Superficial', 0), option('Local', 'Local', 1),
            option('Amplo', 'Amplo', 3), option('Integral', 'Integral', 5)
          ]
        }]
      },
      resources: {
        title: 'Recursos',
        fields: [{
          id: 'resourceFunction', label: 'Função', type: 'select', options: [
            option('', 'Selecione', 0), option('Transferência de Recurso', 'Transferência de Recurso', 1),
            option('Absorção', 'Absorção', 3), option('Fusão de Recursos', 'Fusão de Recursos', 5),
            option('Canal de Recurso', 'Canal de Recurso', 1)
          ]
        }]
      },
      information: {
        title: 'Informação',
        fields: [
          {
            id: 'informationFunction', label: 'Função', type: 'select', options: [
              option('', 'Selecione', 0), option('Percepção Sobrenatural', 'Percepção Sobrenatural', 1),
              option('Rastreamento', 'Rastreamento', 3), option('Percepção Penetrante', 'Percepção Penetrante', 3),
              option('Observação Remota', 'Observação Remota', 5), option('Compartilhamento de Percepção', 'Compartilhamento de Percepção', 3),
              option('Canal de Informação', 'Canal de Informação', 1), option('Ocultação', 'Ocultação', 1),
              option('Falsificação', 'Falsificação', 3), option('Leitura do Passado', 'Leitura do Passado', 5)
            ]
          },
          {
            id: 'informationDepth', label: 'Profundidade', type: 'select', options: [
              option('Presença', 'Presença', 0), option('Classificação', 'Classificação', 1),
              option('Identificação', 'Identificação', 3), option('Estado atual', 'Estado atual', 5),
              option('Informação profunda', 'Informação profunda', 7)
            ]
          }
        ]
      },
      protection: {
        title: 'Proteção e Neutralização',
        fields: [{
          id: 'protectionFunction', label: 'Função', type: 'select', options: [
            option('', 'Selecione', 0), option('Proteção Sobrenatural', 'Proteção Sobrenatural', 1),
            option('Redução', 'Redução', 1), option('Acumulação de duas proteções', 'Acumulação de duas proteções', 3),
            option('Neutralização', 'Neutralização', 3), option('Supressão adicional', 'Supressão adicional', 5),
            option('Dissipação adicional', 'Dissipação adicional', 7), option('Redirecionamento', 'Redirecionamento', 5),
            option('Reflexão adicional', 'Reflexão adicional', 7)
          ]
        }]
      },
      combat: {
        title: 'Atuação em Combate',
        fields: [{
          id: 'combatProfile', label: 'Perfil adicional', type: 'select', options: [
            option('Nenhum', 'Nenhum', 0), option('Movimento', 'Movimento', 1), option('Reação', 'Reação', 3),
            option('Gatilho adicional', 'Gatilho adicional', 1), option('Momento reativo adicional', 'Momento reativo adicional', 1),
            option('Ação Própria de Criações', 'Ação Própria de Criações', 8)
          ]
        }]
      },
      damage: {
        title: 'Dano, Ferimentos e Condições',
        fields: [{
          id: 'damageFunction', label: 'Função adicional', type: 'select', options: [
            option('Dano Direto', 'Dano Direto', 0), option('Mitigação', 'Mitigação', 1),
            option('Imposição de Condição', 'Imposição de Condição', 1), option('Restrição estreita', 'Restrição estreita', 1),
            option('Restrição ampla', 'Restrição ampla', 3), option('Restrição de oportunidade', 'Restrição de oportunidade', 3)
          ]
        }]
      },
      healing: {
        title: 'Cura, Regeneração e Retorno',
        fields: [{
          id: 'healingFunction', label: 'Função', type: 'select', options: [
            option('', 'Selecione', 0), option('Cura', 'Cura', 1), option('Reparo', 'Reparo', 1),
            option('Tratamento de Ferimento', 'Tratamento de Ferimento', 3), option('Restauração de Condição', 'Restauração de Condição', 3),
            option('Regeneração Estrutural', 'Regeneração Estrutural', 5), option('Preservação corporal', 'Preservação corporal', 1),
            option('Preservação de Identidade', 'Preservação de Identidade', 3), option('Imposição Sobrenatural de Morte', 'Imposição Sobrenatural de Morte', 7),
            option('Retorno', 'Retorno', 10), option('Incorporação em novo corpo', 'Incorporação em novo corpo', 5)
          ]
        }]
      },
      costs: {
        title: 'Custos, Reservas e Sacrifícios',
        fields: [{
          id: 'costFunction', label: 'Função especial', type: 'select', options: [
            option('Nenhuma', 'Nenhuma', 0), option('Pagamento dividido', 'Pagamento dividido', 1),
            option('Recurso alternativo', 'Recurso alternativo', 1), option('Pagamento Terminal', 'Pagamento Terminal', 5),
            option('Recarga de Reserva', 'Recarga de Reserva', 1), option('Recarga de capacidade discreta', 'Recarga de capacidade discreta', 5),
            option('Recarga Condicionada', 'Recarga Condicionada', 3), option('Conversão', 'Conversão', 3),
            option('Alimentação Sacrificial', 'Alimentação Sacrificial', 3), option('Autoridade sobre Sacrifício', 'Autoridade sobre Sacrifício', 7)
          ]
        }]
      }
    },

    glossary: {
      Rank: 'Define o orçamento máximo de pontos do Milagre.',
      Potência: 'Define o Valor usado na resolução. Não compra distância, quantidade, tempo ou oportunidades.',
      Domínio: 'Indica a parte da realidade governada pela Divindade.',
      Vertente: 'Indica o princípio sobrenatural específico que produz o efeito.',
      Função: 'Descreve a mudança mecânica causada pelo Milagre.',
      Alcance: 'Distância entre o usuário e o destino inicial da aplicação.',
      Área: 'Região afetada indiscriminadamente pelo Milagre.',
      Duração: 'Tempo durante o qual a função permanece. Não concede novas aplicações.',
      Uso: 'Unidade finita consumida quando uma aplicação ou decisão é imposta.',
      Cadência: 'Frequência com que o Milagre pode ser ativado novamente.',
      Compulsão: 'Impõe uma escolha, mas o alvo decide os detalhes não definidos.',
      Dominação: 'Controla integralmente uma oportunidade discreta do alvo.',
      Persistente: 'Mantém uma manifestação além da ativação e exige limite e forma de encerramento.'
    }
  };
})();
