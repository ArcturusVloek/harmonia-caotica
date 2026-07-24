# Changelog — Sistema 2.0

Todas as alterações relevantes da documentação canônica serão registradas neste arquivo.

## [Não lançado]

### Adicionado — 24/07/2026

- decisão DEC-010 sobre progressão em 100 Níveis e Apoteose;
- decisão DEC-011 sobre PM por Nível e Espaços de Poder;
- decisão DEC-012 sobre orçamento inicial e progressão regular de PM;
- decisão DEC-013 sobre Ranks e limites de construção;
- decisão DEC-014 sobre Custo de Ficha e Capacidade Operacional;
- decisão DEC-015 sobre documentação canônica e texto final para jogadores;
- decisão DEC-016 sobre Repertórios e Poderes Alternativos;
- decisão DEC-017 sobre Recipientes;
- decisão DEC-018 sobre Estruturas Variáveis;
- núcleo de progressão consolidado;
- Reserva Inicial de 12 PM na criação do personagem;
- onze Ranks entre Desperto e Apoteose;
- explicação obrigatória para jogadores da diferença entre valor pago e efeitos simultâneos;
- fluxo editorial separado entre aprovação mecânica e aprovação da redação pública;
- regras canônicas para Repertórios comuns e Dinâmicos;
- regras canônicas para Recipientes ativos e passivos;
- regras canônicas para Estruturas Variáveis, amplitudes e Matriz Variável;
- auditorias em rascunho das estruturas avançadas ainda pendentes;
- portal público `sistemas/index.html` para o Sistema 2.0;
- página de Primeiros Passos;
- página de Progressão e Ranks com calculadora por Nível;
- validador inicial de custo e Graduação na Construção Guiada;
- guia comparativo de Poder normal, Repertório, Recipiente, Variável e Invocar;
- Consulta Rápida das regras aprovadas;
- estilos e scripts próprios da primeira implementação pública;
- auditoria funcional automatizada das calculadoras, estados editoriais e tabelas navegáveis;
- execução da auditoria funcional do Sistema 2.0 no fluxo de integração contínua;
- registro técnico da primeira implementação em `auditorias/site-sistema-2.md`.

### Definido — 24/07/2026

#### Progressão e limites gerais

- 15 PM totais no Nível 1;
- 3 PM recebidos por Nível;
- fórmula de PM totais: `12 + (3 × Nível)`;
- um Espaço de Poder inicial;
- um novo Espaço de Poder em cada múltiplo de cinco;
- 21 Espaços de Poder e 312 PM totais no Nível 100;
- PM como medida de profundidade das construções;
- Espaços de Poder como medida de diversidade;
- liberação de Espaço sem concessão de PM adicionais;
- PM não gastos podem ser acumulados;
- avanço de Rank a cada dez Níveis;
- Graduação máxima de 5 no Rank Desperto até 25 em Apoteose;
- limite de PM por Espaço igual a quatro vezes a Graduação máxima;
- subir de Rank amplia limites, mas não concede PM nem melhorias automáticas;
- Custo de Ficha como quantidade de PM efetivamente paga;
- Capacidade Operacional como quantidade de PM ou reserva que pode funcionar simultaneamente;
- Custo de Ficha e Capacidade Operacional submetidos ao teto de PM por Espaço;
- pontos internos de estruturas não são pagos duas vezes;
- Falhas e descontos não ampliam a Capacidade Operacional permitida.

#### Documentação e publicação

- GitHub como registro contínuo e fonte de continuidade entre conversas;
- aprovação mecânica e aprovação editorial como etapas distintas;
- documentos técnicos canônicos como fonte precisa, mas não automaticamente como texto final para jogadores;
- páginas e ferramentas atuais da branch como protótipos ou implementações parciais;
- redação pública futura obrigada a preservar custos, limites, Graduações, permissões e exceções;
- páginas públicas distinguem regras aprovadas, conteúdo em teste e auditorias em rascunho.

#### Repertórios

- Repertório básico desde o Rank I;
- primeiro Poder Alternativo transformando o Espaço em Repertório;
- custo de 2 PM por Graduação estrutural e reserva de 2 PM por Graduação;
- custo de 1 PM por Poder Alternativo adicional;
- Graduação estrutural separada da Graduação efetiva dos Efeitos;
- Poderes Alternativos máximos iguais ao número ordinal do Rank;
- Dinâmico desde o Rank III;
- limite de duas a cinco configurações Dinâmicas conforme o Rank;
- reserva Dinâmica dividida, nunca multiplicada;
- fonte imediata, exclusividade justificável e vulnerabilidade compartilhada obrigatórias;
- uma troca de configuração por declaração principal até a aprovação do sistema temporal completo;
- alternativas improvisadas indisponíveis até a conversão de recursos equivalentes.

#### Recipientes

- Recipiente ativo desde o Rank I;
- Recipiente passivo desde o Rank II;
- custo e capacidade interna de 5 PM por Graduação estrutural;
- Graduação estrutural separada da Graduação efetiva dos Efeitos;
- Capacidade Operacional igual à capacidade interna máxima;
- componentes internos fixos, simultaneamente acessíveis e pertencentes à mesma meta-característica;
- ausência de limite numérico adicional para Efeitos internos;
- Falhas globais desde o Rank III;
- redução global máxima de −1 PM por Graduação nos Ranks III–V e −2 PM por Graduação nos Ranks VI–XI;
- piso estrutural de 4 PM por Graduação nos Ranks III–V e 3 PM por Graduação nos Ranks VI–XI;
- modificadores dependentes de rolagem indisponíveis até conversão;
- aninhamento envolvendo Recipientes mantido como questão separada.

#### Estruturas Variáveis

- Estruturas Variáveis disponíveis desde o Rank V;
- 5 PM de reserva configurável por Graduação estrutural;
- Graduação estrutural limitando a Graduação de cada Efeito configurado;
- Capacidade Operacional igual à reserva total;
- amplitude de 4 PM por Graduação no Rank V para um Efeito mecânico específico;
- amplitude de 5 PM por Graduação no Rank VI para um Efeito por vez dentro de uma Vertente;
- amplitude de 6 PM por Graduação nos Ranks VII–VIII para vários Efeitos de uma função estreita;
- amplitude de 7 PM por Graduação nos Ranks IX–X para vários Efeitos de uma Vertente inteira;
- amplitude de 8 PM por Graduação no Rank XI para combinações permitidas dentro de um único Domínio;
- amplitudes inferiores permanecendo disponíveis nos Ranks superiores;
- Matriz Variável formal obrigatória;
- declaração completa e validação antes de qualquer resultado;
- Ranks V–VIII limitados a configurações previamente aprovadas;
- Ranks IX–XI autorizados a propor configurações em cena, sem resultado antes da validação;
- reconfiguração consumindo a ação principal e limitada a uma vez por declaração;
- reconfiguração como reação proibida para personagens jogadores;
- Variável sem compra de Dinâmico ou Poder Alternativo para representar configurações;
- proibição de aninhamento, estruturas internas e criação de Invocar;
- ausência de descoberta automática de fraquezas, informações ou configuração ideal.

### Corrigido — 24/07/2026

- a progressão deixou de conceder automaticamente um Poder a cada cinco Níveis e passou a liberar um Espaço de Poder;
- substituída a variável `X` da DEC-011 pelo valor aprovado de 3 PM;
- substituída a reserva inicial indefinida pelo valor aprovado de 12 PM;
- links da página inicial para Sistemas, Primeiros Passos, Construção Guiada e Consulta Rápida passaram a possuir destinos na branch `sistema-2.0`;
- o validador passou a impedir que um Espaço custe mais PM do que o personagem recebeu no Nível atual;
- Ranks calculados passaram a usar numeração romana;
- campos numéricos podem ser editados sem imposição prematura do valor mínimo;
- estados editoriais passaram a distinguir regra aprovada, conteúdo em teste e auditoria em rascunho;
- tabelas largas receberam navegação por teclado e rótulos acessíveis;
- o estado do projeto passou a informar expressamente que nenhuma página atual é a versão final para jogadores.

### Adicionado — 23/07/2026

- branch `sistema-2.0`;
- diretório canônico `docs/sistema-2.0/`;
- documento de princípios;
- registro de decisões;
- glossário inicial;
- arquivo de estado do projeto;
- roadmap de desenvolvimento;
- núcleo de resolução sem dados em versão de teste;
- conceito inicial de Escalada;
- classificação futura de componentes de M&M como preservados, convertidos, substituídos ou removidos.

### Definido — 23/07/2026

- GitHub como fonte canônica;
- resolução sem dependência de dados;
- formato textual e assíncrono;
- *Mutantes & Malfeitores: Poder Supremo* como base mecânica direta;
- preservação de Efeitos, Graduações, custos, modificadores, estruturas, descritores, Poderes Alternativos e construção por pontos;
- remoção de perícias e atributos-base;
- construção modular de Milagres;
- Vaelora como fundamento mecânico e ontológico;
- separação entre conceito divino, interpretação religiosa e julgamento ético;
- Camada Didática antiga como conteúdo não canônico;
- estados editoriais obrigatórios;
- comparação entre Capacidade e Resistência;
- equivalência híbrida: concessão contra Resistência passiva e impasse entre vontades ativas;
- Escalada como mudança verificável que exige custo, risco ou vulnerabilidade.

### Corrigido — 23/07/2026

- M&M deixou de ser tratado como simples inspiração e passou a ser definido como base mecânica direta;
- descartada a escala genérica de 0 a 6 separada das Graduações de M&M;
- conversão de ataques, testes opostos e salvamentos passou a ser prioridade do núcleo.

### Removido — 23/07/2026

- carregamento automático da Camada Didática nas páginas de Domínios;
- `js/regra-guiada.js`;
- `css/regra-guiada.css`;
- `docs/ARQUITETURA-DIDATICA.md`.

### Pendente

- conversão de Invocar, orçamento de criaturas e Grupos de Comando;
- limites de aninhamento entre estruturas;
- reconstrução e redistribuição de PM;
- conversão determinística de testes de ataque;
- conversão de testes opostos de poder;
- conversão de jogadas de salvamento;
- estrutura temporal completa de conflitos;
- catálogo público dos Efeitos adaptados;
- tratamento de Efeitos ligados a atributos e perícias removidos;
- reconstrução das Vertentes e Heranças;
- redação final e aprovação editorial do material para jogadores;
- expansão do site com ficha completa e construtor integral de Poderes.