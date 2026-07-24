# DEC-016 — Repertórios e Poderes Alternativos

**Status:** aprovada  
**Data:** 24/07/2026

## Decisão

Harmonia Caótica preserva a estrutura de Repertórios e Poderes Alternativos de *Mutantes & Malfeitores: Poder Supremo*, adaptada aos limites de Rank, Espaços de Poder, Custo de Ficha e Capacidade Operacional.

Repertórios básicos são permitidos desde o **Rank I — Desperto**. Comprar o primeiro Poder Alternativo transforma mecanicamente o Espaço em um Repertório. A configuração padrão, os Poderes Alternativos, as configurações Dinâmicas, os modificadores globais e os demais componentes da estrutura permanecem dentro do mesmo Espaço de Poder.

## Estrutura básica

Cada Graduação estrutural de Repertório:

```text
custa 2 PM
produz uma reserva de 2 PM
```

A configuração padrão está incluída nesse custo.

Cada Poder Alternativo adicional custa **1 PM**, preservando o custo normal do Feito de Poder correspondente.

```text
Custo de Ficha =
custo do Repertório
+ Poderes Alternativos
+ configurações Dinâmicas
+ modificadores globais
+ demais componentes externos
```

A reserva é compartilhada. Ela não é multiplicada pelo número de configurações.

## Graduação estrutural e Graduação de Efeito

A Graduação do Repertório mede o tamanho de sua reserva compartilhada. Ela é uma **Graduação estrutural**, não a intensidade direta de um Efeito.

Por isso, a Graduação estrutural do Repertório não está submetida à Graduação máxima de Efeitos do Rank. Entretanto:

- o Custo de Ficha do Repertório respeita os PM disponíveis e o teto de PM por Espaço;
- a Capacidade Operacional respeita o teto de PM por Espaço;
- cada Efeito interno respeita a Graduação máxima do Rank;
- nenhuma configuração pode utilizar mais PM do que a reserva do Repertório.

Exemplo no Rank I:

```text
Graduação máxima dos Efeitos: 5
Repertório 9: reserva de 18 PM
```

O Repertório pode possuir Graduação estrutural 9, mas nenhum Efeito interno pode ultrapassar Graduação 5.

## Limite de Poderes Alternativos por Rank

O número máximo de Poderes Alternativos é igual ao número ordinal do Rank.

```text
Poderes Alternativos máximos = número do Rank
```

A configuração padrão não conta nesse limite.

| Rank | Alternativos máximos | Configurações totais |
|---:|---:|---:|
| I — Desperto | 1 | 2 |
| II — Adepto | 2 | 3 |
| III — Consagrado | 3 | 4 |
| IV — Arauto | 4 | 5 |
| V — Exarca | 5 | 6 |
| VI — Numinoso | 6 | 7 |
| VII — Ascendente | 7 | 8 |
| VIII — Semidivino | 8 | 9 |
| IX — Soberano | 9 | 10 |
| X — Pretendente | 10 | 11 |
| XI — Apoteose | 11 | 12 |

O limite representa o máximo permitido, não uma concessão automática. Cada alternativa precisa ser comprada e registrada.

## Custo de Ficha e Capacidade Operacional

Todo Repertório obedece à DEC-014:

```text
Custo de Ficha <= PM disponíveis do personagem
Custo de Ficha <= PM máximos por Espaço
Capacidade Operacional <= PM máximos por Espaço
```

Em um Repertório comum:

```text
Capacidade Operacional =
PM usados pela configuração atualmente selecionada
```

As configurações não são somadas porque apenas uma configuração comum utiliza a reserva por vez.

Exemplo no Rank I:

```text
Repertório 9: 18 PM
1 Poder Alternativo: 1 PM

Custo de Ficha: 19 PM
Capacidade Operacional: até 18 PM
```

O personagem possui duas configurações de até 18 PM, mas apenas uma delas recebe a reserva por vez.

## Funcionamento e troca de configuração

Somente uma configuração não Dinâmica pode utilizar a reserva por vez.

Ao trocar de configuração:

- a nova configuração recebe acesso à reserva;
- a configuração anterior deixa de receber a reserva;
- os Efeitos da nova configuração continuam exigindo suas ações normais;
- a troca não ativa gratuitamente os Efeitos da nova configuração;
- resultados instantâneos já produzidos permanecem;
- Efeitos que exigem manutenção deixam de ser mantidos;
- Efeitos capazes de persistir sem manutenção continuam conforme sua própria Duração.

Até que a estrutura temporal completa seja aprovada, a configuração pode ser alterada **uma vez por declaração principal de ação**.

Não é permitido iniciar uma declaração com uma configuração, produzir parte do resultado, trocar de configuração durante a mesma resolução e combinar as duas como se estivessem disponíveis simultaneamente.

## Configurações com vários Efeitos

Uma configuração pode conter vários Efeitos. A soma de seus componentes não pode ultrapassar a reserva do Repertório.

Exemplo:

```text
Configuração: Forma Alada

Voo: 10 PM
Proteção: 6 PM
Supersentidos: 2 PM

Total: 18 PM
```

Os Efeitos da configuração podem estar disponíveis juntos, mas cada um conserva sua própria ação, alcance, duração, condições e demais regras.

## Unidade causal obrigatória

Compartilhar o mesmo Domínio, Vertente ou tema visual não basta para reunir Poderes em um Repertório.

Todas as configurações precisam satisfazer três critérios:

1. **Mesma fonte imediata:** utilizam o mesmo órgão, artefato, forma, vínculo, reserva, ritual ou canal sobrenatural.
2. **Exclusividade justificável:** existe uma razão ficcional verificável para o recurso ser direcionado a uma configuração de cada vez.
3. **Vulnerabilidade compartilhada:** uma mesma interrupção pertinente pode desabilitar toda a estrutura.

Um Domínio concede permissão ontológica. Ele não concede automaticamente o desconto e a flexibilidade estrutural de um Repertório.

## Repertórios Dinâmicos

O modificador **Dinâmico** é liberado no **Rank III — Consagrado**.

Cada configuração marcada como Dinâmica custa **1 PM adicional**. A configuração padrão também paga esse custo caso seja Dinâmica.

Pelo menos duas configurações precisam ser Dinâmicas para compartilhar a reserva simultaneamente.

| Ranks | Configurações Dinâmicas máximas |
|---|---:|
| I–II | nenhuma |
| III–V | 2 |
| VI–VIII | 3 |
| IX–X | 4 |
| XI | 5 |

O limite conta todas as configurações Dinâmicas, incluindo a configuração padrão.

Os PM são divididos, não multiplicados:

```text
Reserva do Repertório: 30 PM

Configuração Dinâmica A: 18 PM
Configuração Dinâmica B: 12 PM

Total ativo: 30 PM
```

A Capacidade Operacional de um Repertório Dinâmico é a soma dos PM distribuídos simultaneamente entre suas configurações Dinâmicas. Essa soma nunca pode ultrapassar a reserva nem o teto do Espaço.

## Modificadores globais

Um modificador pode ser aplicado ao Repertório inteiro somente quando afetar todas as configurações da mesma maneira.

Uma condição que afeta apenas uma configuração deve ser comprada e registrada nessa configuração.

Falhas e descontos globais podem reduzir o Custo de Ficha, mas não ampliam a reserva nem a Capacidade Operacional permitida.

## Desabilitação compartilhada

Quando o Repertório é desabilitado, nulificado ou perde sua fonte comum, todas as configurações ficam indisponíveis.

Uma configuração isolada somente poderá ser atingida separadamente quando o Efeito hostil ou a condição tiver sido construído especificamente para afetar aquele componente interno.

A vulnerabilidade compartilhada é parte essencial da economia do Repertório.

## Alternativas improvisadas

A criação temporária de um novo Poder Alternativo durante uma cena permanece indisponível.

Essa possibilidade depende da futura conversão de esforço extra, pontos heroicos ou recursos equivalentes. Até essa conversão ser aprovada, somente configurações previamente compradas, registradas e validadas podem ser usadas.

## Explicação futura para jogadores

A redação final deverá começar pela seguinte ideia:

> **Um Repertório reúne diferentes versões do mesmo Poder. Você escolhe qual versão recebe a reserva; normalmente, apenas uma funciona por vez.**

A versão pública deverá explicar separadamente:

1. a reserva compartilhada;
2. a diferença entre configuração padrão e Alternativos;
3. o custo de 1 PM por Alternativo;
4. por que as configurações não são somadas;
5. quando uma troca encerra manutenção;
6. como configurações Dinâmicas dividem a reserva;
7. por que pertencer ao mesmo Domínio não basta.

A aprovação desta decisão é mecânica. A redação acima ainda não constitui o texto final destinado aos jogadores.

## Consequências

- Repertórios básicos estão liberados desde o Rank I;
- Poderes Alternativos e Repertórios passam a ser uma única arquitetura mecânica;
- o custo de 2 PM por Graduação estrutural e 1 PM por Alternativo é preservado;
- a Graduação estrutural do Repertório não é tratada como Graduação efetiva de Efeito;
- o número de Alternativos cresce de 1 a 11 conforme o Rank;
- Dinâmico começa no Rank III e permite de duas a cinco configurações Dinâmicas, conforme o Rank;
- todo Repertório ocupa um único Espaço de Poder;
- a unidade causal e a vulnerabilidade compartilhada são obrigatórias;
- alternativas improvisadas permanecem pendentes;
- a próxima decisão mecânica é a liberação e os limites dos Recipientes por Rank.
