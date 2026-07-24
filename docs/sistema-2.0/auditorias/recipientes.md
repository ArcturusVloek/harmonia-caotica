# Auditoria detalhada — Recipientes por Rank

**Status:** rascunho  
**Data:** 24/07/2026  
**Escopo:** custo, capacidade interna, modos ativo e passivo, modificadores globais e unidade mecânica dos Recipientes.

Esta auditoria detalha a proposta de Recipientes e substitui, enquanto rascunho mais recente, a seção correspondente da auditoria geral de estruturas avançadas. Nenhum ponto deste arquivo é canônico antes de aprovação e registro em decisão própria.

## 1. Função da estrutura

Um Recipiente reúne vários Efeitos fixos que pertencem a uma mesma meta-característica, como uma forma sobrenatural, um corpo transformado, uma armadura, um artefato, um manto, um estado ou outra manifestação única.

Os Efeitos internos podem permanecer disponíveis ou funcionar simultaneamente. Cada um conserva sua própria ação, alcance, duração, Graduação, modificadores e condições.

O Recipiente não é:

- um Repertório, porque seus componentes não precisam se substituir;
- um conjunto de Efeitos Ligados, porque seus componentes não precisam ocorrer juntos em uma única utilização;
- uma Estrutura Variável, porque sua composição não é redistribuída durante a cena;
- uma licença para reunir todos os efeitos de um Domínio ou Vertente.

## 2. Custo e capacidade interna

Cada Graduação estrutural de Recipiente:

```text
custa 5 PM
concede 5 PM de capacidade interna
```

Assim:

```text
Capacidade interna = Graduação estrutural × 5
Custo estrutural básico = Graduação estrutural × 5
```

Os PM internos são usados para comprar Efeitos, Graduações, Extras, Falhas, Feitos e outros componentes internos fixos. Eles não são pagos novamente pelo personagem.

A soma dos custos internos ajustados não pode ultrapassar a capacidade interna. Pontos internos não utilizados permanecem sem alocação; não se transformam em PM livres e não podem ser redistribuídos durante uma cena.

A Graduação do Recipiente é estrutural e mede o tamanho do conjunto interno. Ela não é uma Graduação efetiva de Efeito. Cada Efeito interno continua limitado pela Graduação máxima do Rank.

## 3. Custo de Ficha e Capacidade Operacional

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

A verificação usa a capacidade máxima da construção, e não apenas os Efeitos atualmente ativados.

O Custo de Ficha corresponde ao preço real da estrutura depois dos modificadores globais, somado a Feitos, Desvantagens e componentes externos pagos no mesmo Espaço.

Falhas aplicadas individualmente a um Efeito reduzem o custo desse Efeito dentro da reserva interna. Falhas aplicadas à estrutura inteira podem reduzir o Custo de Ficha, mas não reduzem a Capacidade Operacional.

## 4. Unidade obrigatória

Todos os componentes internos precisam satisfazer simultaneamente:

1. **Meta-característica comum:** são partes de uma mesma forma, corpo, artefato, estado, manto, órgão, vínculo ou manifestação.
2. **Acesso compartilhado:** obter ou perder acesso ao Recipiente afeta o conjunto inteiro.
3. **Composição fixa:** os componentes são definidos na construção e não podem ser trocados ou redistribuídos durante a cena.
4. **Coerência simultânea:** os componentes podem coexistir sem representar poderes independentes sem relação estrutural.

Compartilhar somente um Domínio, uma Vertente, um descritor amplo ou uma aparência não é suficiente.

Não existe limite numérico próprio para a quantidade de Efeitos internos. O limite decorre da capacidade interna, da Graduação máxima e da unidade obrigatória.

## 5. Recipiente ativo

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

## 6. Recipiente passivo

O Recipiente passivo é permitido desde o **Rank II — Adepto**.

Ele não exige ativação estrutural. Seus Efeitos internos permanecem disponíveis enquanto a fonte do Recipiente existir e estiver acessível, embora cada Efeito ainda possa exigir sua própria ação para funcionar.

Exemplos possíveis incluem uma armadura, um artefato mantido pelo personagem, uma anatomia permanente ou outra fonte estável que contenha vários Efeitos.

A liberação do modo passivo não transforma automaticamente um Recipiente ativo já existente. Alterar o modo estrutural depende das futuras regras de reconstrução.

## 7. Modificadores internos e globais

### Modificadores internos

Afetam somente um Efeito e alteram seu custo dentro da capacidade interna. São permitidos conforme a disponibilidade individual do modificador e não contam para o limite de redução global.

### Modificadores globais

Afetam a capacidade de ativar, acessar ou manter o Recipiente inteiro. Um modificador global precisa passar por três testes:

1. afeta todos os Efeitos internos;
2. não pode ser evitado escolhendo outro componente do Recipiente;
3. altera de forma real o acesso, a ativação ou a manutenção do conjunto.

Modificadores meramente estéticos ou pertinentes a apenas um Efeito não podem ser aplicados à estrutura inteira.

Somente modificadores já preservados ou convertidos para Harmonia Caótica podem ser usados. Modificadores dependentes de rolagens permanecem indisponíveis até sua conversão determinística.

## 8. Redução global por Rank

Falhas globais que reduzem o Custo de Ficha seguem:

| Ranks | Redução global máxima | Custo estrutural mínimo |
|---|---:|---:|
| I–II | nenhuma | 5 PM por Graduação |
| III–V | −1 PM por Graduação | 4 PM por Graduação |
| VI–XI | −2 PM por Graduação | 3 PM por Graduação |

Depois de todas as reduções globais, inclusive reduções fixas, a parte estrutural do Recipiente não pode custar menos que o piso correspondente ao Rank.

Extras globais podem aumentar o custo normalmente, desde que o modificador esteja convertido e que o Custo de Ficha continue dentro do teto do Espaço.

## 9. Exemplos

### Rank I — Recipiente ativo básico

```text
Recipiente 4
Custo de Ficha: 20 PM
Capacidade interna: 20 PM
Capacidade Operacional: 20 PM
```

O conjunto pode conter vários Efeitos de uma mesma forma sobrenatural. Nenhum Efeito interno pode ultrapassar Graduação 5.

### Rank II — Recipiente passivo

```text
Recipiente 5
Custo de Ficha: 25 PM
Capacidade interna: 25 PM
Capacidade Operacional: 25 PM
Teto do Espaço: 28 PM
```

A construção é válida. Os Efeitos ficam disponíveis enquanto a fonte passiva estiver acessível.

### Rank III — Falha global válida

```text
Recipiente 7
Capacidade interna: 35 PM
Falha global: −1 PM por Graduação
Custo de Ficha: 28 PM
Capacidade Operacional: 35 PM
Teto do Espaço: 36 PM
```

A construção é válida quando a Falha realmente limita o acesso, a ativação ou a manutenção do conjunto inteiro.

### Desconto que não supera o teto operacional

```text
Recipiente 8
Capacidade interna: 40 PM
Falha global: −1 PM por Graduação
Custo de Ficha: 32 PM
Teto do Espaço: 36 PM
```

A construção é inválida. O custo cabe no Espaço, mas a Capacidade Operacional de 40 PM ultrapassa o teto.

### Falha individual

Um Efeito interno de Dano limitado a espíritos reduz somente seu próprio custo dentro da reserva. Ele não reduz o custo estrutural do Recipiente, pois a limitação não afeta os outros componentes.

## 10. Diagnóstico estrutural

Use:

- **Efeitos Ligados** quando vários Efeitos sempre ocorrerem juntos em uma única utilização;
- **Repertório** quando configurações se substituírem e dividirem uma reserva;
- **Recipiente** quando vários Efeitos fixos forem partes independentes e simultaneamente acessíveis de uma mesma meta-característica;
- **Variável** quando a configuração for criada ou redistribuída durante o jogo;
- **Invocar** quando existir um agente independente com posição, ações e bloco próprios.

## 11. Aninhamento

Esta decisão não aprova estruturas dentro de Recipientes.

Até a decisão específica sobre aninhamento:

- um Recipiente não pode conter Repertório, outro Recipiente ou Variável;
- nenhuma outra estrutura pode conter um Recipiente;
- todos os componentes internos devem ser Efeitos e modificadores construídos diretamente.

A proposta anterior de liberar um Repertório dentro de Recipiente no Rank V permanece suspensa para análise na decisão específica de aninhamento.

## 12. Pacote submetido à aprovação

1. Recipiente ativo desde o Rank I.
2. Recipiente passivo desde o Rank II.
3. Custo e capacidade interna de 5 PM por Graduação estrutural.
4. Graduação estrutural separada da Graduação efetiva dos Efeitos.
5. Capacidade Operacional igual à capacidade interna máxima.
6. Componentes fixos, simultaneamente acessíveis e pertencentes a uma meta-característica comum.
7. Nenhum limite numérico adicional de Efeitos internos.
8. Modificadores internos tratados separadamente dos globais.
9. Falhas globais somente desde o Rank III.
10. Redução máxima de −1 por Graduação nos Ranks III–V e −2 nos Ranks VI–XI.
11. Piso estrutural de 4 PM por Graduação nos Ranks III–V e 3 PM por Graduação nos Ranks VI–XI.
12. Modificadores dependentes de rolagem indisponíveis até conversão.
13. Aninhamento separado e ainda não aprovado.

A próxima decisão após este bloco será a amplitude e a liberação das Estruturas Variáveis, salvo revisão desta proposta.