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
6. **A leitura deve acompanhar uma tarefa.** Entender, aplicar e avaliar exigem recortes diferentes da mesma regra.
7. **Uma marcação só representa informação explícita.** Listas de verificação não validam intenções que ainda não foram registradas no texto da criação.

## Etapa 1 — Domínios e Vertentes

A primeira implementação foi aplicada às páginas de Domínios e Vertentes por meio dos arquivos:

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

### Leitura rápida das Vertentes

Cada Vertente recebe um quadro gerado a partir do próprio conteúdo publicado:

- princípio;
- possibilidades;
- limite decisivo;
- acesso ao modo de avaliação.

Essa leitura não cria uma regra nova. Ela resume os trechos canônicos que continuam disponíveis logo abaixo.

## Etapa 2 — Capítulos dos Sistemas

A segunda implementação leva a arquitetura contextual para as páginas mecânicas por meio dos arquivos:

- `js/base-regras-sistemas.js`
- `js/sistema-guiado-core.js`
- `js/sistema-guiado-secoes.js`
- `css/sistema-guiado.css`
- `js/device-mode.js`

Todas as páginas com a classe `systems-page` recebem a camada automaticamente. Não é necessário inserir manualmente o componente em cada capítulo.

### Base estruturada inicial

`base-regras-sistemas.js` reúne definições curtas, orientações de aplicação, perguntas, procedimentos, campos obrigatórios, erros comuns e critérios de avaliação.

Os capítulos centrais possuem perfis específicos:

- Fundamentos dos Milagres;
- Alcance, Alvos, Área e Movimento;
- Controle, Influência e Posse;
- Ações, Reações e Estrutura do Combate;
- Custos, Reservas, Sacrifícios e Recuperação.

Os demais capítulos recebem uma leitura contextual extraída de seus resumos, capacidades, termos e navegação, até que ganhem perfis editoriais próprios.

### Quatro modos de consulta

#### Entender

Apresenta a definição curta, a pergunta central, o princípio decisivo, as decisões que organizam a regra e os campos que precisam ser declarados.

#### Aplicar

Transforma o capítulo em uma sequência verificável. As marcações ficam registradas no navegador para permitir que o usuário retome a análise.

#### Avaliar

Fornece critérios administrativos e destaca erros que a página precisa impedir.

#### Termos

Explica conceitos técnicos sem retirar o leitor da página. Cada entrada apresenta uma definição simples e sua consequência na aplicação.

### Explicação por seção

Cada seção do capítulo recebe um quadro recolhível chamado **Entender esta seção**. Ele apresenta:

- a pergunta que aquela parte responde;
- a explicação direta do primeiro princípio;
- o limite destacado, quando houver;
- uma orientação prática de aplicação.

A finalidade é impedir que o usuário precise concluir sozinho qual parte de um parágrafo produz uma regra concreta.

### Persistência e acessibilidade

- a aba atual é mantida durante a sessão;
- listas de aplicação e avaliação são armazenadas localmente no navegador;
- todas as marcações podem ser apagadas;
- a interface possui foco visível e controles próprios para telas compactas;
- movimentos visuais respeitam a preferência de redução de animações.

## Dicionário contextual

A base atual inclui conceitos de classificação, construção, espaço, tempo, combate, Controle, Criações, recursos, dano, Cura e Retorno.

Entre os termos registrados estão:

- Domínio e Vertente;
- Rank, Pontos, Potência e Valor;
- Alcance, Alvo, Área, Escala e Movimento;
- Duração, Cadência, Uso, Reserva e Sustentação;
- Ação, Reação, Atuação e Gatilho;
- Via, Autoridade, Influência, Compulsão e Dominação;
- Criação, Propagação, Travessia e Transformação;
- Neutralização, Ferimento, Condição, Derrota, Cura e Retorno.

O dicionário deverá continuar crescendo a partir das dúvidas reais encontradas durante a criação e a avaliação de Milagres.

## Próximas etapas

### Etapa 3 — Ampliação da base estruturada

Criar perfis específicos para todos os capítulos mecânicos e retirar gradualmente a dependência de extrações genéricas. A página, a busca, o construtor e a avaliação administrativa deverão consultar a mesma informação.

### Etapa 4 — Construção guiada interativa

Transformar o roteiro atual em uma ferramenta que mostre apenas as perguntas necessárias à ideia apresentada, calcule custos e detecte campos ausentes.

### Etapa 5 — Consulta de combate

Gerar versões curtas das regras e dos Milagres com ordem de resolução, resistência e limites relevantes para a rodada atual.

### Etapa 6 — Auditoria editorial contínua

Registrar dúvidas recorrentes, páginas mais consultadas, campos frequentemente omitidos e conflitos encontrados pelos administradores. Esses dados devem orientar a reescrita das regras, não apenas novos componentes visuais.

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
