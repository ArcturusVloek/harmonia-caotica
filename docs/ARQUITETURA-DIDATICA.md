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

Arquivos principais:

- `js/estudio-milagres-data.js`
- `js/estudio-milagres.js`
- `css/estudio-milagres.css`

### Fluxo único

O Estúdio organiza a criação em seis etapas dentro da mesma página:

1. Ideia;
2. Origem divina;
3. Funções;
4. Escala;
5. Resolução;
6. Revisão.

### Origem divina integrada

Divindade, Domínio e Vertente são escolhidos em sequência. A explicação curta da Vertente aparece imediatamente, sem abrir outra página.

### Funções condicionais

O jogador marca aquilo que o poder realmente faz. Somente os módulos relacionados às funções selecionadas aparecem depois.

Exemplos:

- Controle abre Autoridade, Via, Usos e ordem;
- Criações abrem Resistência, atuação e limite de manifestações;
- Informação abre função e Profundidade;
- Cura abre Cura, Tratamento, Regeneração, Preservação ou Retorno.

### Custos visíveis

Rank, Potência, Ativação, Alcance, Alvos, Área, Duração e compras específicas atualizam o custo em tempo real. O resumo compara o total com o orçamento do Rank.

### Consulta sem sair da ficha

As regras completas continuam canônicas, mas são carregadas dentro de um painel lateral no computador e de uma gaveta em tela cheia no celular.

Links existentes dentro do manual também são interceptados e abertos nesse painel, evitando que o usuário perca o rascunho ou a etapa atual.

### Validação

O Estúdio detecta informações ausentes ou incompatíveis, como:

- Área sem tamanho;
- Duração Persistente sem limite ou encerramento;
- Controle sem Autoridade, Via, ordem ou Usos;
- Criação sem limite de manifestações;
- custo acima do Rank;
- ausência de resistência, sucesso, falha ou limites.

### Persistência e exportação

O rascunho é salvo automaticamente no navegador. A etapa final produz uma ficha copiável com identidade, parâmetros, regras específicas, descrição, efeito, resistência, sucesso, falha, limites, encerramento e custos.

### Manual canônico

O roteiro textual anterior permanece disponível em um bloco recolhível. Ele não é removido, mas deixa de ser o caminho obrigatório para construir um Milagre.

## Base estruturada

A camada de Domínios ainda extrai informações do HTML existente. O Estúdio utiliza uma base própria para opções, custos e relações. A evolução seguinte deve unificar essas fontes para que:

- páginas;
- busca;
- Estúdio;
- consulta em combate;
- avaliação administrativa

consultem os mesmos registros estruturados.

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

1. Revisar visualmente o Estúdio em celulares e computadores.
2. Conferir cada custo da base integrada contra os capítulos canônicos.
3. Adicionar módulos ainda não representados integralmente, como Propagação avançada e modelos completos de Reservas.
4. Criar sugestões automáticas de Vertente e função a partir da frase inicial.
5. Criar uma ficha de combate reduzida derivada do mesmo rascunho.
6. Unificar a base estruturada do Estúdio com as páginas canônicas.
