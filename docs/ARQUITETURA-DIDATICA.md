# Arquitetura Didática de Harmonia Caótica

## Objetivo

Transformar o site de um arquivo de textos em uma ferramenta capaz de ensinar, aplicar e avaliar as regras sem separar o usuário da página que está consultando.

A camada didática não substitui o conteúdo canônico. Ela reorganiza as informações já publicadas e apresenta respostas diferentes conforme a tarefa atual.

## Princípios

1. **Uma regra, várias formas de consulta.** A mesma fonte deve alimentar explicação simples, aplicação prática e avaliação administrativa.
2. **Narrativa e mecânica permanecem ligadas, mas não misturadas.** A ambientação explica como o poder aparece; a regra explica o que ele faz.
3. **A aparência não define a classificação.** Domínio e Vertente são determinados pelo princípio sobrenatural responsável pelo efeito.
4. **Toda regra precisa ser resolvível.** O texto deve informar aplicação, resistência, sucesso, falha, consumo e encerramento quando esses elementos forem necessários.
5. **A ajuda deve existir no ponto da dúvida.** O leitor não deve abandonar a página para descobrir o significado de um termo ou o critério usado por um administrador.
6. **Criar um Milagre não pode exigir navegação entre capítulos.** A Construção Guiada precisa reunir escolhas, explicações, custos, validação e ficha final em um único espaço.
7. **O manual completo é referência, não fluxo obrigatório.** Jogadores começam por perguntas simples e só abrem o texto canônico quando surge uma dúvida específica.
8. **Toda opção visível precisa explicar a si mesma.** O Estúdio apresenta significado, uso adequado, limites e comparação com alternativas no próprio campo.
9. **Heranças pertencem à Vertente.** Elas são propriedades passivas dos Milagres compatíveis, não capacidades ativadas ou compras opcionais.

## Primeira implementação — Domínios e Vertentes

A camada inicial é aplicada às páginas de Domínios e Vertentes por meio dos arquivos:

- `js/regra-guiada.js`
- `css/regra-guiada.css`
- `js/dominios.js`

A camada utiliza a estrutura já existente das páginas. Ela extrai:

- resumo do Domínio;
- capacidades apresentadas;
- limite conceitual;
- nomes e descrições das Vertentes;
- definição, possibilidades e limites de cada Vertente;
- exemplos de Milagres já publicados.

Com essas informações, a interface cria três modos.

### Entender

Apresenta a definição curta, as principais capacidades, o limite decisivo e acesso direto às Vertentes.

### Aplicar

Conduz o leitor por uma sequência de decisões: resultado, princípio, destino, resolução e compras mecânicas.

### Avaliar

Apresenta uma lista comum de verificação para administradores, evitando que cada avaliação dependa apenas da memória ou interpretação individual.

## Segunda implementação — Capítulos de Sistemas

Os capítulos mecânicos recebem uma camada contextual comum por meio dos arquivos:

- `js/base-regras-sistemas.js`
- `js/sistema-guiado-core.js`
- `js/sistema-guiado-secoes.js`
- `css/sistema-guiado.css`

A interface apresenta quatro modos:

### Entender

Explica a pergunta central do capítulo, o princípio decisivo e as decisões que precisam ser tomadas.

### Aplicar

Transforma o conteúdo em uma sequência marcável. O progresso é salvo no navegador.

### Avaliar

Apresenta critérios administrativos e campos obrigatórios relacionados ao capítulo atual.

### Termos

Reúne definições curtas dos conceitos utilizados naquela página.

Cada seção também recebe um quadro recolhível com:

- finalidade do trecho;
- perguntas que o leitor deve conseguir responder;
- erro de interpretação mais provável;
- termos relevantes.

## Terceira implementação — Estúdio de Milagres

A página `sistemas/construcao-guiada.html` deixa de funcionar como uma lista de capítulos que o usuário precisa visitar e passa a receber uma área integrada de construção.

Arquivos centrais:

- `js/estudio-milagres-data.js`
- `js/estudio-milagres.js`
- `js/estudio-milagres-recomendador.js`
- `js/estudio-definitivo-data.js`
- `js/estudio-definitivo-ui.js`
- `js/estudio-definitivo-ajustes.js`
- `js/estudio-complexidade.js`
- `js/estudio-desktop-layout.js`
- `css/estudio-milagres.css`
- `css/estudio-definitivo.css`
- `css/estudio-opcoes.css`
- `css/estudio-complexidade.css`
- `css/estudio-desktop.css`

### Fluxo único

O Estúdio organiza a criação em seis etapas dentro da mesma página:

1. Ideia;
2. Origem divina;
3. Funções;
4. Escala;
5. Resolução;
6. Revisão.

### Origem divina integrada

Divindade, Domínio e Vertente são escolhidos em sequência. A explicação da escolha aparece imediatamente. A página canônica do Domínio é consultada internamente para localizar a Herança da Vertente escolhida.

A Herança é mostrada durante a construção, no resumo e na revisão. A ficha exportada registra nome, resumo, gatilho, efeito, limites e exemplo quando essas informações estiverem publicadas na página canônica.

### Opções autodescritivas

Cada campo apresenta:

- significado da opção selecionada;
- situação em que deve ser usada;
- capacidades que não são concedidas;
- custo, quando aplicável;
- catálogo recolhível para comparar todas as alternativas.

As funções também explicam a mudança mecânica que representam e aquilo que precisa ser comprado separadamente.

### Sugestões pela ideia

A frase inicial pode indicar possíveis funções, Domínios e Vertentes. As sugestões são pontos de partida e nunca substituem a verificação conceitual.

### Funções condicionais

O jogador marca aquilo que o poder realmente faz. Somente os módulos relacionados às funções selecionadas aparecem depois.

Exemplos:

- Controle abre Autoridade, Via, Usos e ordem;
- Informação abre função e Profundidade;
- Cura abre Cura, Tratamento, Regeneração, Preservação ou Retorno;
- Criação abre um construtor próprio para a existência separada.

### Projeto da Criação

Criações, Invocações e manifestações separadas possuem um bloco próprio. Ele registra:

- forma, natureza e posição;
- Resistência ou dependência de uma Âncora;
- Sustentação e encerramento;
- limite de manifestações ativas;
- Criação única, Coletiva, Fragmentada ou Completa;
- Escala ou Área corporal;
- Movimento próprio, Acompanha e transporte;
- comunicação, percepção compartilhada e Origem Vinculada;
- quantidade ilimitada de capacidades internas.

Cada capacidade da Criação registra função, Potência principal ou própria, forma de atuação, Alcance, destinos, Área, Duração, Usos, resolução e custo. Isso permite construir criaturas, objetos, barreiras, campos, nuvens, enxames, plataformas e outras manifestações sem reduzir todas elas ao mesmo modelo.

### Arquitetura do Poder

Poderes complexos podem utilizar:

- funções simultâneas;
- modos alternativos;
- etapas sequenciais;
- estruturas condicionadas;
- combinações híbridas;
- componentes com parâmetros compartilhados ou próprios.

Cada componente declara sua relação com o poder, função, Potência, Alcance, destinos, Duração, gatilho, consumo, resolução e custo independente.

### Propagação integrada

O Estúdio representa Transferência, Reprodução e Crescimento. O bloco registra Passos Compartilhados ou Completos, Alcance entre Fonte e Destino, atuação, Fontes, Destinos, caminho, quantidade simultânea, recursos compartilhados, encerramento e proibição de cascata imediata.

### Custos visíveis

Rank, Potência, Ativação, Alcance, Alvos, Área, Duração, funções, capacidades de Criações, componentes e Propagação atualizam o custo em tempo real. O resumo compara o total com o orçamento do Rank.

Compras avançadas são reunidas no campo adicional apenas para integração com o cálculo anterior. O detalhamento permanece registrado na ficha final.

### Consulta sem sair da ficha

As regras completas continuam canônicas, mas são carregadas dentro de um painel lateral no computador e de uma gaveta em tela cheia no celular.

O usuário não precisa abrir essas páginas para compreender opções comuns. O painel existe para exceções, exemplos extensos e auditoria do texto canônico.

### Validação

O Estúdio detecta informações ausentes ou incompatíveis, como:

- Área sem tamanho;
- Duração Persistente sem limite ou encerramento;
- Controle sem Autoridade, Via, ordem ou Usos;
- Criação sem limite de manifestações;
- custo acima do Rank;
- ausência de resistência, sucesso, falha ou limites.

Um teste funcional automatizado constrói uma Criação com duas capacidades, Propagação e Herança, verifica os custos e confirma a presença dessas seções na ficha exportada em computador e celular.

### Persistência e exportação

O rascunho principal, o Projeto da Criação e a Arquitetura do Poder são salvos no navegador. A etapa final produz uma ficha copiável com:

- identidade e parâmetros;
- Herança da Vertente;
- Projeto da Criação;
- Arquitetura do Poder;
- Propagação;
- regras específicas;
- efeito, resistência, sucesso, falha, limites e encerramento;
- composição completa dos custos.

### Manual canônico

O roteiro textual anterior permanece disponível em um bloco recolhível. Ele não é removido, mas deixa de ser o caminho obrigatório para construir um Milagre.

## Base estruturada

A camada de Domínios ainda extrai informações do HTML existente. O Estúdio utiliza bases estruturadas para opções, custos, relações e projetos complexos. A evolução seguinte deve unificar essas fontes para que páginas, busca, Estúdio, consulta em combate e avaliação administrativa consultem os mesmos registros.

A extração direta das Heranças já segue esse princípio: a página canônica permanece como fonte, e o Estúdio apenas reorganiza seu conteúdo.

## Critério de conclusão de uma regra

Uma regra só está pronta quando responde, conforme sua natureza:

1. O que faz?
2. Quando se aplica?
3. Quem ou o que pode receber o efeito?
4. Como é resolvida?
5. O que pode resistir?
6. O que ocorre no sucesso?
7. O que ocorre na falha?
8. Qual recurso é consumido?
9. Quando termina?
10. O que não permite?
11. Com quais regras interage?

A ausência de uma resposta necessária deve gerar revisão editorial ou aviso contextual na interface.

## Próximas etapas

1. Conferir cada custo da base integrada contra os capítulos canônicos durante a revisão administrativa.
2. Representar integralmente Reservas, Recargas, Sacrifícios e relações de pagamento compostas.
3. Produzir uma ficha de combate reduzida derivada do mesmo rascunho.
4. Ampliar os testes para combinações extremas de Controle, Travessia, Transformação e Retorno.
5. Unificar a base estruturada do Estúdio com todas as páginas canônicas.
