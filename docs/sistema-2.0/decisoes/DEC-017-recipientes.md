# DEC-017 — Recipientes

**Status:** aprovada  
**Data:** 24/07/2026

## Decisão

Harmonia Caótica preserva a estrutura de Recipientes de *Mutantes & Malfeitores: Poder Supremo*, adaptada aos limites de Rank, Espaços de Poder, Custo de Ficha e Capacidade Operacional.

Um Recipiente reúne vários Efeitos fixos que pertencem a uma mesma meta-característica, como uma forma sobrenatural, um corpo transformado, uma armadura, um artefato, um manto, um estado ou outra manifestação única.

Os Efeitos internos podem permanecer disponíveis ou funcionar simultaneamente. Cada um conserva sua própria ação, alcance, duração, Graduação, modificadores e condições.

## Estrutura básica

Cada Graduação estrutural de Recipiente:

```text
custa 5 PM
concede 5 PM de capacidade interna
```

Portanto:

```text
Capacidade interna = Graduação estrutural × 5
Custo estrutural básico = Graduação estrutural × 5
```

Os PM internos são usados para comprar Efeitos, Graduações, Extras, Falhas, Feitos e demais componentes internos fixos. Eles não são pagos novamente pelo personagem.

A soma dos custos internos ajustados não pode ultrapassar a capacidade interna. Pontos internos não utilizados permanecem sem alocação: não se tornam PM livres e não podem ser redistribuídos durante uma cena.

A Graduação do Recipiente é estrutural e mede o tamanho do conjunto interno. Ela não é uma Graduação efetiva de Efeito. Cada Efeito interno continua limitado pela Graduação máxima do Rank.

## Custo de Ficha e Capacidade Operacional

Todo Recipiente obedece à DEC-014:

```text
Custo de Ficha <= PM disponíveis do personagem
Custo de Ficha <= PM máximos por Espaço
Capacidade Operacional <= PM máximos por Espaço
```

Para um Recipiente:

```text
Capacidade Operacional = capacidade interna máxima do Recipiente
```

A verificação usa a capacidade máxima da construção, e não apenas os Efeitos utilizados em determinado momento.

O Custo de Ficha corresponde ao preço real da estrutura depois dos modificadores globais, somado a Feitos, Desvantagens e componentes externos pagos no mesmo Espaço.

Falhas aplicadas individualmente a um Efeito reduzem o custo desse Efeito dentro da capacidade interna. Falhas aplicadas ao Recipiente inteiro podem reduzir o Custo de Ficha, mas não reduzem a Capacidade Operacional.

## Unidade obrigatória

Todos os componentes internos precisam satisfazer simultaneamente:

1. **Meta-característica comum:** são partes de uma mesma forma, corpo, artefato, estado, manto, órgão, vínculo ou manifestação.
2. **Acesso compartilhado:** obter ou perder acesso ao Recipiente afeta o conjunto inteiro.
3. **Composição fixa:** os componentes são definidos na construção e não podem ser trocados ou redistribuídos durante a cena.
4. **Coerência simultânea:** os componentes podem coexistir sem representar Poderes independentes sem relação estrutural.

Compartilhar somente um Domínio, uma Vertente, um descritor amplo ou uma aparência não é suficiente.

Não existe limite numérico próprio para a quantidade de Efeitos internos. O limite decorre da capacidade interna, da Graduação máxima e da unidade obrigatória.

## Recipiente ativo

O Recipiente ativo é permitido desde o **Rank I — Desperto**.

Ele representa uma forma, estado ou manifestação que precisa ser ativada e mantida. Enquanto estiver ativo, seus Efeitos internos ficam acessíveis.

Até a aprovação da estrutura temporal completa:

- a ativação pode ser declarada junto de uma ação principal, salvo modificador que a torne mais lenta;
- ativar o Recipiente não ativa gratuitamente Efeitos internos que exigem sua própria ação;
- Efeitos automáticos ou sem ação podem passar a funcionar quando o Recipiente se torna ativo;
- a manutenção exige que o personagem permaneça capaz de sustentar o estado;
- se a manutenção for interrompida, todo o acesso ao conjunto termina.

Desativar o Recipiente ativo:

- encerra o acesso aos Efeitos internos;
- encerra Efeitos que dependam de manutenção;
- não desfaz resultados instantâneos já produzidos;
- faz Efeitos permanentes internos deixarem de funcionar;
- não permite desligar seletivamente um Efeito permanente interno sem desligar o Recipiente inteiro.

## Recipiente passivo

O Recipiente passivo é permitido desde o **Rank II — Adepto**.

Ele não exige ativação estrutural. Seus Efeitos internos permanecem disponíveis enquanto a fonte do Recipiente existir e estiver acessível, embora cada Efeito ainda possa exigir sua própria ação para funcionar.

A liberação do modo passivo não transforma automaticamente um Recipiente ativo já existente. Alterar o modo estrutural depende das futuras regras de reconstrução.

## Modificadores internos e globais

### Modificadores internos

Afetam somente um Efeito e alteram seu custo dentro da capacidade interna. São permitidos conforme a disponibilidade individual do modificador e não contam para o limite de redução global.

### Modificadores globais

Afetam a capacidade de ativar, acessar ou manter o Recipiente inteiro.

Um modificador global precisa satisfazer todos os critérios seguintes:

1. afeta todos os Efeitos internos;
2. não pode ser evitado escolhendo outro componente do Recipiente;
3. altera de forma real a ativação, o acesso ou a manutenção do conjunto.

Modificadores meramente estéticos ou pertinentes a apenas um Efeito não podem ser aplicados à estrutura inteira.

Somente modificadores já preservados ou convertidos para Harmonia Caótica podem ser usados. Modificadores dependentes de rolagens permanecem indisponíveis até sua conversão determinística.

## Redução global por Rank

Falhas globais que reduzem o Custo de Ficha seguem os limites abaixo:

| Ranks | Redução global máxima | Custo estrutural mínimo |
|---|---:|---:|
| I–II | nenhuma | 5 PM por Graduação |
| III–V | −1 PM por Graduação | 4 PM por Graduação |
| VI–XI | −2 PM por Graduação | 3 PM por Graduação |

Depois de todas as reduções globais, inclusive reduções fixas, a parte estrutural do Recipiente não pode custar menos que o piso correspondente ao Rank.

Extras globais podem aumentar o custo normalmente, desde que o modificador esteja convertido e que o Custo de Ficha continue dentro do teto do Espaço.

## Exemplo de limite duplo

No Rank III, com teto de 36 PM por Espaço:

```text
Recipiente 7
Capacidade interna: 35 PM
Falha global: −1 PM por Graduação

Custo de Ficha: 28 PM
Capacidade Operacional: 35 PM
```

A construção é válida quando a Falha realmente limita a ativação, o acesso ou a manutenção do conjunto inteiro.

O exemplo seguinte é inválido:

```text
Recipiente 8
Capacidade interna: 40 PM
Falha global: −1 PM por Graduação

Custo de Ficha: 32 PM
Capacidade Operacional: 40 PM
Teto do Espaço: 36 PM
```

O custo cabe no Espaço, mas a Capacidade Operacional ultrapassa o teto.

## Diagnóstico estrutural

Utiliza-se:

- **Efeitos Ligados** quando vários Efeitos sempre ocorrem juntos em uma única utilização;
- **Repertório** quando configurações se substituem e dividem uma reserva;
- **Recipiente** quando vários Efeitos fixos são partes independentes e simultaneamente acessíveis de uma mesma meta-característica;
- **Variável** quando a configuração é criada ou redistribuída durante o jogo;
- **Invocar** quando existe um agente independente com posição, ações e bloco próprios.

## Aninhamento

Esta decisão não aprova estruturas dentro de Recipientes.

Até a decisão específica sobre aninhamento:

- um Recipiente não pode conter Repertório, outro Recipiente ou Variável;
- nenhuma outra estrutura pode conter um Recipiente;
- todos os componentes internos devem ser Efeitos e modificadores construídos diretamente.

A proposta anterior de liberar um Repertório dentro de Recipiente no Rank V permanece suspensa para análise na decisão específica de aninhamento.

## Explicação futura para jogadores

A redação final deverá começar pela seguinte ideia:

> **Um Recipiente reúne vários Efeitos fixos dentro da mesma forma, corpo, artefato ou estado. Eles podem ficar disponíveis juntos, mas todos compartilham o mesmo acesso estrutural.**

A versão pública deverá explicar separadamente:

1. a diferença entre Recipiente, Repertório e Efeitos Ligados;
2. a capacidade interna de 5 PM por Graduação;
3. por que os PM internos não são pagos duas vezes;
4. a diferença entre Recipiente ativo e passivo;
5. a diferença entre modificador interno e global;
6. por que descontos globais não reduzem a Capacidade Operacional;
7. por que pertencer ao mesmo Domínio não basta.

A aprovação desta decisão é mecânica. Esta redação ainda não constitui o texto final destinado aos jogadores.

## Consequências

- Recipiente ativo está liberado desde o Rank I;
- Recipiente passivo está liberado desde o Rank II;
- cada Graduação estrutural custa 5 PM e concede 5 PM internos;
- a Graduação estrutural não é Graduação efetiva de Efeito;
- a Capacidade Operacional equivale à capacidade interna máxima;
- não existe limite numérico adicional de Efeitos internos;
- Falhas globais começam no Rank III;
- a redução global máxima é de −1 PM por Graduação nos Ranks III–V e −2 PM por Graduação nos Ranks VI–XI;
- o piso estrutural é de 4 PM por Graduação nos Ranks III–V e 3 PM por Graduação nos Ranks VI–XI;
- modificadores dependentes de rolagem permanecem indisponíveis;
- aninhamento continua pendente de decisão específica;
- a próxima decisão mecânica é a liberação e a amplitude das Estruturas Variáveis.