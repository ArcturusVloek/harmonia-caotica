# Auditoria — Estruturas avançadas de Poder

**Status:** rascunho  
**Data:** 24/07/2026  
**Escopo:** Poderes Alternativos, Repertórios, Recipientes, Estruturas Variáveis e Invocar.

Esta auditoria aplica a engenharia de *Mutantes & Malfeitores: Poder Supremo* à progressão aprovada de Harmonia Caótica. Nenhuma proposta deste arquivo é canônica antes de aprovação e registro como decisão.

## 1. Problema de projeto

As estruturas avançadas aumentam tipos diferentes de liberdade:

- Repertório amplia alternativas;
- Recipiente amplia simultaneidade e unidade de ativação;
- Variável amplia improvisação;
- Invocar amplia a quantidade de agentes presentes na cena.

O acesso por Rank deve preservar essa liberdade sem permitir que uma estrutura ignore:

1. a Graduação máxima do Rank;
2. o limite de PM por Espaço;
3. a quantidade de Espaços de Poder;
4. a economia de ações do formato assíncrono;
5. os limites ontológicos de Domínio, Vertente e Manifestação.

## 2. Correção necessária: dois limites por Espaço

Estruturas como Recipiente e Variável possuem um custo pago e também concedem um conjunto interno de pontos. Esses valores não devem ser somados como se fossem duas compras, mas nenhum deles pode ultrapassar o teto do Rank.

Cada Espaço deverá obedecer simultaneamente a:

### Custo de Ficha

É a quantidade real de PM gasta na estrutura, incluindo:

- custo por Graduação;
- Extras e Falhas aplicados à estrutura;
- Feitos externos;
- Poderes Alternativos;
- Desvantagens.

`Custo de Ficha <= PM máximos por Espaço`

### Capacidade Operacional

É o maior valor nominal que pode estar ativo em uma configuração, conjunto interno ou entidade produzida.

`Capacidade Operacional <= PM máximos por Espaço`

Consequências:

- um Recipiente com Falha global pode custar menos que sua capacidade, mas sua capacidade interna não pode exceder o teto do Espaço;
- uma Estrutura Variável de 4 PM por Graduação pode conceder 5 PM por Graduação, mas a configuração ativa continua limitada pelo teto do Espaço;
- cada configuração de Repertório precisa respeitar o teto, além do custo total da estrutura;
- pontos internos não são pagos duas vezes.

## 3. Resultado resumido por Rank

| Rank | Repertório | Recipiente | Variável | Invocar |
|---:|---|---|---|---|
| I — Desperto | básico; 1 Alternativo | ativo | não | não |
| II — Adepto | 2 Alternativos | passivo | não | um capanga fixo |
| III — Consagrado | 3 Alternativos; Dinâmico | Falha global limitada | não | Tipo geral; até 2 capangas |
| IV — Arauto | 4 Alternativos | igual | não | Horda; até 5 capangas |
| V — Exarca | 5 Alternativos | pode conter um Repertório | Variável 4/Grad. | Tipo amplo; até 10 capangas |
| VI — Numinoso | 6 Alternativos; 3 Dinâmicos | desconto global ampliado | Variável 5/Grad. | Heroísmo para uma entidade; até 25 capangas comuns |
| VII — Ascendente | 7 Alternativos | igual | Variável 6/Grad. | até 50 capangas comuns |
| VIII — Semidivino | 8 Alternativos | igual | Variável 6/Grad. | até 100 capangas comuns |
| IX — Soberano | 9 Alternativos; 4 Dinâmicos | uma camada de aninhamento | Variável 7/Grad. | até 250 comuns ou 2 Heroicos |
| X — Pretendente | 10 Alternativos | igual | Variável 7/Grad. | até 500 capangas comuns |
| XI — Apoteose | 11 Alternativos; 5 Dinâmicos | igual | Variável 8/Grad. | até 1.000 comuns ou 2 Heroicos |

Os números de capangas representam corpos narrativos. A quantidade de resoluções mecânicas permanece limitada por Grupos de Comando.

## 4. Repertório e Poderes Alternativos

### Diagnóstico

Repertório é a estrutura avançada de menor risco. Ela oferece várias configurações por custo reduzido, mas normalmente somente uma configuração funciona de cada vez. Seu principal risco é permitir que um único Espaço substitua muitos Espaços independentes.

### Liberação

Repertório básico é permitido desde o Rank I.

O Poder padrão não conta como Alternativo. O limite de Poderes Alternativos é igual ao número ordinal do Rank:

`Alternativos máximos = Rank`

Assim:

- Rank I: 1 Alternativo, totalizando 2 configurações;
- Rank V: 5 Alternativos, totalizando 6 configurações;
- Apoteose: 11 Alternativos, totalizando 12 configurações.

Cada Alternativo mantém seu custo normal de Feito de Poder.

### Regras obrigatórias

- somente uma configuração não Dinâmica pode estar ativa;
- todas as configurações devem compartilhar uma fonte e relação causal verificáveis;
- cada configuração respeita a Graduação máxima;
- o Custo de Ficha e a Capacidade Operacional respeitam o teto do Espaço;
- a configuração pode mudar no máximo uma vez por declaração de ação;
- desabilitar a estrutura torna todas as configurações indisponíveis;
- um Repertório não pode servir como lista irrestrita de todos os efeitos de um Domínio.

### Dinâmico

Poderes Alternativos Dinâmicos são liberados no Rank III.

| Ranks | Configurações Dinâmicas simultâneas |
|---|---:|
| III–V | 2 |
| VI–VIII | 3 |
| IX–X | 4 |
| XI | 5 |

Os pontos podem ser divididos apenas entre configurações marcadas como Dinâmicas. A soma dos pontos ativos não pode exceder o conjunto do Repertório.

## 5. Recipiente

### Diagnóstico

Recipiente não concede desconto básico. Seu custo normal equivale à capacidade interna que fornece. Sua vantagem é reunir vários Efeitos em uma mesma forma, estado, corpo, artefato ou manifestação e permitir que condições de ativação e manutenção afetem o conjunto.

O risco surge quando uma Falha aplicada à estrutura reduz simultaneamente o custo de muitos Efeitos que continuam disponíveis juntos.

### Liberação

- Rank I: Recipiente ativo;
- Rank II: Recipiente passivo;
- Rank III: Falhas aplicadas à estrutura inteira;
- Rank V: um Repertório pode existir dentro de um Recipiente;
- Rank IX: uma camada de aninhamento entre Recipiente e Repertório.

### Regras obrigatórias

- todos os Efeitos internos devem pertencer à mesma meta-característica;
- ativar o Recipiente não reduz a ação própria de seus Efeitos;
- os Efeitos podem funcionar simultaneamente, desde que suas ações e condições sejam cumpridas;
- desativar um Recipiente ativo remove conjuntamente o acesso aos Efeitos internos;
- modificadores aplicados à estrutura precisam afetar ativação, acesso ou manutenção do conjunto;
- modificadores que afetam somente um Efeito devem ser comprados nesse Efeito;
- o conjunto interno não é somado novamente ao custo pago, mas respeita a Capacidade Operacional do Espaço.

### Limite de redução global

| Ranks | Redução máxima aplicada à estrutura |
|---|---:|
| I–II | nenhuma |
| III–V | -1 PM por Graduação |
| VI–XI | -2 PM por Graduação |

O custo final de um Recipiente nunca pode ser inferior a 3 PM por Graduação. A Falha deve representar uma limitação real de ativação ou manutenção e não apenas uma limitação estética.

## 6. Estrutura Variável

### Diagnóstico

Variável é a estrutura de maior flexibilidade e maior risco de abuso. Ela pode otimizar o personagem para cada situação, reduzir a necessidade de cooperação e tornar desafios difíceis de preparar. Não deve representar “qualquer efeito desejado”.

Toda Estrutura Variável exige:

- um descritor causal preciso;
- um conjunto explícito de permissões;
- uma lista explícita de proibições;
- validação antes de produzir resultado;
- uma única reconfiguração por declaração de ação;
- respeito à Graduação da estrutura e ao Rank;
- respeito ao teto de Capacidade Operacional.

### Liberação por amplitude

#### Rank V — 4 PM por Graduação

Uma característica ou Efeito de um tipo e descritor específicos, um de cada vez.

Exemplo: uma adaptação defensiva biológica da Vertente Simbiose.

#### Rank VI — 5 PM por Graduação

Um Efeito de qualquer tipo permitido por uma Vertente, um de cada vez.

#### Rank VII — 6 PM por Graduação

Vários Efeitos simultâneos pertencentes a uma função estreita e explicitamente definida dentro de uma Vertente.

#### Rank IX — 7 PM por Graduação

Vários Efeitos simultâneos permitidos por uma Vertente inteira.

#### Rank XI — 8 PM por Graduação

Qualquer combinação de Efeitos permitida por um único Domínio ao qual o personagem possua acesso legítimo.

Mesmo em Apoteose, Variável não concede acesso a outros Domínios, não ignora limites ontológicos e não permite efeitos sem relação causal com o descritor.

### Configurações

- Ranks V–VIII: somente configurações previamente aprovadas;
- Ranks IX–X: novas configurações podem ser propostas durante uma cena, mas não funcionam antes da validação;
- Apoteose: configuração em cena permanece permitida apenas com declaração mecânica completa e validação.

A reconfiguração consome a ação principal do uso até que o sistema temporal seja convertido. Reconfiguração como reação fica proibida para personagens jogadores.

### Proibições

- Variável dentro de Variável;
- Variável dentro de Repertório;
- Repertório criado por Variável;
- Invocar criado por Variável;
- descritores vagos como “magia”, “energia”, “poder divino” ou “qualquer Milagre” sem parâmetros adicionais;
- utilização para reproduzir atributos ou perícias enquanto esses elementos não tiverem conversão aprovada.

## 7. Invocar

### Diagnóstico

Invocar é perigoso não apenas pelo orçamento da criatura, mas por conceder ações, posições, alvos e decisões adicionais. O formato assíncrono exige limitar a quantidade de agentes mecânicos, ainda que a narrativa comporte hordas.

A fórmula original de 15 pontos por Graduação não pode ser preservada diretamente. Ela pressupõe personagens completos de M&M, com atributos, perícias, feitos e defesas. Harmonia Caótica remove esses elementos e concede 3 PM por Nível.

### Conversão proposta

`PM do Invocado = 3 × Graduação de Invocar`

Invocados não recebem a Reserva Inicial de 12 PM, pois não são protagonistas.

Limites adicionais:

- Graduação de Invocar comum <= Graduação máxima do Rank - 2;
- Graduação de Invocar Heroico <= Graduação máxima do Rank - 4;
- nenhuma Graduação de Efeito do Invocado pode superar a Graduação de Invocar;
- Invocados não podem possuir Invocar nem Estrutura Variável;
- o bloco da criatura é fixo e aprovado antes do uso, salvo acesso a Tipo.

### Liberação de recursos

- Rank II: um capanga fixo;
- Rank III: modificador Tipo geral e uma aplicação de Progressão;
- Rank IV: Horda e duas aplicações de Progressão;
- Rank V: Tipo amplo e três aplicações de Progressão;
- Rank VI: Heroísmo para uma entidade; quatro aplicações de Progressão para capangas comuns;
- cada Rank posterior aumenta em uma a Progressão máxima dos capangas comuns;
- Rank IX: até duas entidades Heroicas;
- Apoteose: mantém o limite de duas entidades Heroicas.

A fórmula para capangas comuns é:

`Aplicações máximas de Progressão = Rank - 2`

| Rank | Aplicações | Corpos máximos pela progressão de M&M |
|---:|---:|---:|
| II | 0 | 1 |
| III | 1 | 2 |
| IV | 2 | 5 |
| V | 3 | 10 |
| VI | 4 | 25 |
| VII | 5 | 50 |
| VIII | 6 | 100 |
| IX | 7 | 250 |
| X | 8 | 500 |
| XI | 9 | 1.000 |

### Grupos de Comando

Corpos iguais que recebem a mesma ordem formam um Grupo de Comando e produzem uma única resolução mecânica coletiva.

| Ranks | Grupos de Comando máximos |
|---|---:|
| II–IV | 1 |
| V–VII | 2 |
| VIII–X | 3 |
| XI | 4 |

Uma entidade Heroica ocupa um Grupo de Comando inteiro e funciona como agente independente. Hordas Heroicas são proibidas para personagens jogadores.

O número de corpos aumenta presença, cobertura, capacidade de ocupar posições e resistência narrativa do grupo. Ele não concede automaticamente um ataque separado para cada criatura.

### Descritor ou criatura real

Invocar só deve ser usado quando a entidade:

- possui posição própria;
- pode ser atingida;
- possui bloco mecânico;
- pode executar tarefas diferentes;
- permanece como agente identificável na cena.

Uma entidade que apenas personifica Dano, Sufocar, Armadilha ou outro Efeito continua sendo um descritor desse Efeito.

### Elementos pendentes

- o Feito Sacrifício depende da futura substituição de pontos heroicos;
- ordens, autonomia e duração precisam ser ajustadas ao sistema temporal assíncrono;
- a construção completa dos blocos de Invocados precisa ser testada com a conversão de resistências.

## 8. Aninhamento de estruturas

Para evitar multiplicação recursiva de flexibilidade:

- Ranks I–IV: nenhuma estrutura dentro de outra estrutura;
- Ranks V–VIII: um Repertório pode existir dentro de um Recipiente;
- Ranks IX–XI: uma única camada de aninhamento entre Recipiente e Repertório;
- Variável não pode ser aninhada;
- Invocar não pode ser usado para criar entidades que possuam Variável ou Invocar;
- uma estrutura aninhada continua usando o mesmo Espaço e os mesmos dois tetos.

## 9. Resultado da auditoria

A ordem de risco mecânico é:

1. Repertório — flexibilidade com exclusividade;
2. Recipiente — simultaneidade paga integralmente;
3. Invocar — multiplicação de agentes e ações;
4. Variável — improvisação e otimização durante o jogo.

A progressão proposta libera cedo as arquiteturas essenciais para criatividade, mas reserva improvisação ampla, entidades Heroicas e exércitos para Ranks compatíveis com sua complexidade e impacto.

## 10. Decisões que exigem aprovação

1. adoção do limite duplo de Custo de Ficha e Capacidade Operacional;
2. Repertório básico no Rank I e Dinâmico no Rank III;
3. Recipiente ativo no Rank I e passivo no Rank II;
4. Estrutura Variável iniciando no Rank V e ampliada até Apoteose;
5. Invocar iniciando no Rank II;
6. conversão do orçamento de Invocados para `3 × Graduação`;
7. Grupos de Comando como limite de ações de hordas;
8. limites de aninhamento entre estruturas.