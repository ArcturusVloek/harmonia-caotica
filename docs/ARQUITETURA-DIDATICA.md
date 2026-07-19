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

## Primeira implementação

A versão inicial é aplicada às páginas de Domínios e Vertentes por meio dos arquivos:

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

## Leitura rápida das Vertentes

Cada Vertente recebe um quadro gerado a partir do próprio conteúdo publicado:

- O princípio;
- Pode produzir;
- Limite decisivo;
- Acesso ao modo de avaliação.

Essa leitura não cria uma regra nova. Ela resume os trechos canônicos que continuam disponíveis logo abaixo.

## Dicionário contextual

A primeira versão inclui definições breves para:

- Domínio;
- Vertente;
- Herança;
- Potência;
- Alcance;
- Área;
- Duração;
- Persistente;
- Uso;
- Cadência.

O dicionário será ampliado conforme a camada alcançar os capítulos mecânicos.

## Próximas etapas

### Etapa 2 — Páginas do sistema

Aplicar a mesma arquitetura aos capítulos mecânicos, substituindo a extração genérica por blocos específicos de procedimento:

- Quando a regra é usada;
- O que precisa ser definido;
- Ordem de resolução;
- Sucesso e falha;
- Interações;
- Erros comuns.

### Etapa 3 — Base estruturada de regras

Mover definições, dependências, perguntas e critérios para uma fonte de dados comum. A página, a busca, o construtor e a avaliação administrativa deverão consultar a mesma informação.

### Etapa 4 — Construção guiada interativa

Transformar o roteiro atual em uma ferramenta que mostre apenas as perguntas necessárias à ideia apresentada, calcule custos e detecte campos ausentes.

### Etapa 5 — Consulta de combate

Gerar versões curtas das regras e dos Milagres com ordem de resolução, resistência e limites relevantes para a rodada atual.

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
