# Auditoria — Estruturas avançadas de Poder

**Status:** parcialmente resolvida; propostas restantes em rascunho  
**Data:** 24/07/2026  
**Escopo:** Repertórios, Recipientes, Estruturas Variáveis, Invocar e aninhamento.

Esta auditoria aplica a engenharia de *Mutantes & Malfeitores: Poder Supremo* à progressão aprovada de Harmonia Caótica.

As partes aprovadas foram transferidas para decisões canônicas. As demais continuam como propostas e não podem ser tratadas como regras oficiais. Em caso de divergência, a decisão canônica prevalece.

## 1. Estado das decisões

### Aprovado

- **Custo de Ficha e Capacidade Operacional:** DEC-014;
- **Repertórios e Poderes Alternativos:** DEC-016;
- **Recipientes:** DEC-017;
- **Estruturas Variáveis:** DEC-018.

### Ainda em rascunho

- Invocar;
- orçamento e quantidade de Invocados;
- Grupos de Comando;
- aninhamento entre estruturas.

## 2. Problema de projeto

As estruturas avançadas aumentam tipos diferentes de liberdade:

- Repertório amplia alternativas;
- Recipiente amplia simultaneidade e unidade de acesso;
- Variável amplia reconfiguração e improvisação controlada;
- Invocar amplia a quantidade de agentes presentes na cena.

Nenhuma estrutura pode ignorar:

1. Graduação máxima do Rank;
2. limite de PM por Espaço;
3. quantidade de Espaços de Poder;
4. economia de ações do formato assíncrono;
5. limites ontológicos de Domínio, Vertente e Manifestação.

## 3. Limites já aprovados

Todo Espaço obedece à DEC-014:

```text
Custo de Ficha <= PM disponíveis do personagem
Custo de Ficha <= PM máximos por Espaço
Capacidade Operacional <= PM máximos por Espaço
```

Pontos internos não são pagos duas vezes. Falhas e descontos podem reduzir o Custo de Ficha, mas não ampliam a Capacidade Operacional permitida.

Repertórios obedecem à DEC-016. Recipientes obedecem à DEC-017. Estruturas Variáveis obedecem à DEC-018. Esta auditoria não deve ser usada para reinterpretar custos, limites, condições ou exceções dessas decisões.

## 4. Resumo por Rank

Na tabela abaixo, Repertório, Recipiente e Variável são canônicos. Invocar permanece proposta.

| Rank | Repertório — canônico | Recipiente — canônico | Variável — canônico | Invocar — proposta |
|---:|---|---|---|---|
| I — Desperto | básico; 1 Alternativo | ativo | indisponível | indisponível |
| II — Adepto | 2 Alternativos | passivo | indisponível | um capanga fixo |
| III — Consagrado | 3 Alternativos; Dinâmico | Falha global até −1/Grad. | indisponível | Tipo geral; até 2 capangas |
| IV — Arauto | 4 Alternativos | igual | indisponível | Horda; até 5 capangas |
| V — Exarca | 5 Alternativos | igual; sem aninhamento | 4 PM/Grad. | Tipo amplo; até 10 capangas |
| VI — Numinoso | 6 Alternativos; até 3 Dinâmicos | Falha global até −2/Grad. | 5 PM/Grad. | Heroísmo para uma entidade; até 25 comuns |
| VII — Ascendente | 7 Alternativos | igual | 6 PM/Grad. | até 50 comuns |
| VIII — Semidivino | 8 Alternativos | igual | 6 PM/Grad. | até 100 comuns |
| IX — Soberano | 9 Alternativos; até 4 Dinâmicos | igual; sem aninhamento | 7 PM/Grad. | até 250 comuns ou 2 Heroicos |
| X — Pretendente | 10 Alternativos | igual | 7 PM/Grad. | até 500 comuns |
| XI — Apoteose | 11 Alternativos; até 5 Dinâmicos | igual | 8 PM/Grad. | até 1.000 comuns ou 2 Heroicos |

Os números de Invocados permanecem apenas como proposta. A quantidade de resoluções mecânicas dependerá da decisão sobre Grupos de Comando.

## 5. Repertórios — resolvido pela DEC-016

Ficaram aprovados:

- Repertório básico desde o Rank I;
- 2 PM de custo e reserva por Graduação estrutural;
- 1 PM por Poder Alternativo;
- Alternativos máximos iguais ao número do Rank;
- Dinâmico desde o Rank III;
- reserva dividida, nunca multiplicada;
- unidade causal, exclusividade e vulnerabilidade compartilhada.

## 6. Recipientes — resolvido pela DEC-017

Ficaram aprovados:

- Recipiente ativo desde o Rank I;
- Recipiente passivo desde o Rank II;
- 5 PM de custo e capacidade interna por Graduação estrutural;
- Capacidade Operacional igual à capacidade interna máxima;
- componentes fixos e pertencentes à mesma meta-característica;
- Falhas globais desde o Rank III;
- redução máxima de −1 PM por Graduação nos Ranks III–V e −2 PM por Graduação nos Ranks VI–XI;
- pisos de 4 e 3 PM por Graduação;
- aninhamento ainda proibido.

## 7. Estruturas Variáveis — resolvido pela DEC-018

A auditoria detalhada `auditorias/estruturas-variaveis-por-rank.md` foi incorporada pela DEC-018.

Ficaram aprovados:

- início no Rank V;
- 5 PM de reserva por Graduação estrutural;
- Graduação estrutural limitando a Graduação dos Efeitos configurados;
- Capacidade Operacional igual à reserva total;
- amplitudes de 4, 5, 6, 7 e 8 PM por Graduação nos Ranks V, VI, VII, IX e XI;
- amplitudes inferiores disponíveis em Ranks superiores;
- Matriz Variável obrigatória;
- configurações previamente aprovadas nos Ranks V–VIII;
- possibilidade de propor novas configurações em cena nos Ranks IX–XI, sem resultado antes de validação;
- reconfiguração consumindo a ação principal e limitada a uma vez por declaração;
- proibição de reconfiguração como reação para jogadores;
- proibição de aninhamento, estruturas internas e criação de Invocar;
- ausência de descoberta automática de fraquezas ou configuração ideal.

## 8. Invocar — proposta pendente

### Diagnóstico

Invocar é perigoso não apenas pelo orçamento da criatura, mas por conceder ações, posições, alvos e decisões adicionais. O formato assíncrono exige limitar a quantidade de agentes mecânicos, ainda que a narrativa comporte hordas.

A fórmula original de 15 pontos por Graduação não pode ser preservada diretamente sem auditoria, pois pressupõe personagens completos de M&M com atributos, perícias, feitos e defesas.

### Conversão proposta

```text
PM do Invocado = 3 × Graduação de Invocar
```

Invocados não receberiam a Reserva Inicial de 12 PM.

Limites adicionais propostos:

- Invocar comum até Graduação máxima do Rank − 2;
- Invocar Heroico até Graduação máxima do Rank − 4;
- nenhuma Graduação de Efeito do Invocado acima da Graduação de Invocar;
- Invocados sem Invocar ou Estrutura Variável;
- bloco da criatura fixo e aprovado antes do uso, salvo acesso a Tipo.

### Liberação proposta

- Rank II: um capanga fixo;
- Rank III: Tipo geral e uma aplicação de Progressão;
- Rank IV: Horda e duas aplicações de Progressão;
- Rank V: Tipo amplo e três aplicações de Progressão;
- Rank VI: Heroísmo para uma entidade e quatro aplicações de Progressão para comuns;
- cada Rank posterior aumenta em uma a Progressão máxima dos comuns;
- Rank IX: até duas entidades Heroicas;
- Apoteose: mantém o limite de duas entidades Heroicas.

```text
Aplicações máximas de Progressão = Rank − 2
```

| Rank | Aplicações | Corpos máximos propostos |
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

### Grupos de Comando propostos

Corpos iguais sob a mesma ordem formariam um Grupo de Comando e produziriam uma única resolução mecânica coletiva.

| Ranks | Grupos de Comando máximos propostos |
|---|---:|
| II–IV | 1 |
| V–VII | 2 |
| VIII–X | 3 |
| XI | 4 |

Uma entidade Heroica ocuparia um Grupo de Comando inteiro. Hordas Heroicas seriam proibidas para personagens jogadores.

O número de corpos aumentaria presença, cobertura, ocupação de posições e resistência narrativa. Não concederia automaticamente uma ação ou ataque separado para cada criatura.

Invocar só deve ser usado quando a entidade possui posição própria, pode ser atingida, possui bloco mecânico, executa tarefas e permanece como agente identificável. Uma entidade que apenas personifica outro Efeito continua sendo descritor desse Efeito.

### Elementos pendentes

- custo final do Efeito Invocar;
- conversão integral do orçamento de criaturas;
- ordens, autonomia e duração;
- relação com a economia de ações;
- substituição do Feito Sacrifício e de pontos heroicos;
- blocos de Invocados e resistências;
- validação dos limites de corpos e Grupos de Comando.

## 9. Aninhamento — proposta pendente

Até decisão específica, nenhuma estrutura pode existir dentro de outra.

A proposta histórica para futura análise é:

- Ranks I–IV: nenhuma estrutura dentro de outra;
- Ranks V–VIII: um Repertório poderia existir dentro de um Recipiente;
- Ranks IX–XI: uma camada entre Recipiente e Repertório;
- Variável nunca poderia ser aninhada;
- Invocar não criaria entidades com Variável ou Invocar;
- estruturas aninhadas continuariam no mesmo Espaço e sob os mesmos tetos.

Nada desta seção está aprovado.

## 10. Decisões restantes

1. conversão de Invocar;
2. orçamento de Invocados;
3. quantidade de corpos e Progressão;
4. Grupos de Comando;
5. autonomia, ordens e economia de ações;
6. limites de aninhamento entre estruturas.