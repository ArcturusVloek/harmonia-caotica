# Auditoria detalhada — Recipientes por Rank

**Status:** canônico — incorporado pela DEC-017  
**Data:** 24/07/2026  
**Escopo:** custo, capacidade interna, modos ativo e passivo, modificadores globais e unidade mecânica dos Recipientes.

Esta auditoria foi aprovada e incorporada pela `DEC-017-recipientes.md`. Em caso de divergência, a decisão canônica prevalece.

## Resultado aprovado

1. Recipiente ativo desde o Rank I.
2. Recipiente passivo desde o Rank II.
3. Custo e capacidade interna de 5 PM por Graduação estrutural.
4. Graduação estrutural separada da Graduação efetiva dos Efeitos.
5. Capacidade Operacional igual à capacidade interna máxima.
6. Componentes fixos, simultaneamente acessíveis e pertencentes a uma meta-característica comum.
7. Nenhum limite numérico adicional de Efeitos internos.
8. Modificadores internos tratados separadamente dos globais.
9. Falhas globais somente desde o Rank III.
10. Redução máxima de −1 PM por Graduação nos Ranks III–V e −2 PM por Graduação nos Ranks VI–XI.
11. Piso estrutural de 4 PM por Graduação nos Ranks III–V e 3 PM por Graduação nos Ranks VI–XI.
12. Modificadores dependentes de rolagem indisponíveis até conversão.
13. Aninhamento separado e ainda não aprovado.

## Função da estrutura

Um Recipiente reúne vários Efeitos fixos que pertencem a uma mesma meta-característica, como uma forma sobrenatural, um corpo transformado, uma armadura, um artefato, um manto, um estado ou outra manifestação única.

Os Efeitos internos podem permanecer disponíveis ou funcionar simultaneamente. Cada um conserva sua própria ação, alcance, duração, Graduação, modificadores e condições.

O Recipiente não é:

- um Repertório, porque seus componentes não precisam se substituir;
- um conjunto de Efeitos Ligados, porque seus componentes não precisam ocorrer juntos em uma única utilização;
- uma Estrutura Variável, porque sua composição não é redistribuída durante a cena;
- uma licença para reunir todos os efeitos de um Domínio ou Vertente.

## Custo e capacidade interna

Cada Graduação estrutural de Recipiente:

```text
custa 5 PM
concede 5 PM de capacidade interna
```

```text
Capacidade interna = Graduação estrutural × 5
Custo estrutural básico = Graduação estrutural × 5
```

Os PM internos são usados para comprar componentes internos fixos e não são pagos novamente. Pontos internos não utilizados não se transformam em PM livres e não podem ser redistribuídos durante uma cena.

A Graduação do Recipiente é estrutural. Cada Efeito interno continua limitado pela Graduação máxima do Rank.

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

Falhas aplicadas individualmente a um Efeito reduzem o custo desse Efeito dentro da reserva interna. Falhas aplicadas ao Recipiente inteiro podem reduzir o Custo de Ficha, mas não reduzem a Capacidade Operacional.

## Unidade obrigatória

Todos os componentes internos precisam satisfazer simultaneamente:

1. meta-característica comum;
2. acesso compartilhado;
3. composição fixa;
4. coerência simultânea.

Compartilhar somente um Domínio, uma Vertente, um descritor amplo ou uma aparência não é suficiente.

## Liberação por Rank

| Rank | Regra aprovada |
|---|---|
| I — Desperto | Recipiente ativo |
| II — Adepto | Recipiente passivo |
| III–V | Falhas globais até −1 PM por Graduação; piso de 4 PM por Graduação |
| VI–XI | Falhas globais até −2 PM por Graduação; piso de 3 PM por Graduação |

Ativar um Recipiente não ativa gratuitamente Efeitos internos que exigem ação própria. Desativar o conjunto encerra o acesso aos componentes, mas não desfaz resultados instantâneos já produzidos.

## Modificadores internos e globais

Modificadores internos afetam somente um Efeito.

Um modificador global precisa:

1. afetar todos os Efeitos internos;
2. não poder ser evitado escolhendo outro componente;
3. alterar de forma real a ativação, o acesso ou a manutenção do conjunto.

Modificadores meramente estéticos ou pertinentes a apenas um Efeito não podem ser aplicados ao Recipiente inteiro.

## Exemplo de limite duplo

No Rank III, com teto de 36 PM por Espaço:

```text
Recipiente 7
Capacidade interna: 35 PM
Falha global: −1 PM por Graduação
Custo de Ficha: 28 PM
Capacidade Operacional: 35 PM
```

A construção é válida.

```text
Recipiente 8
Capacidade interna: 40 PM
Falha global: −1 PM por Graduação
Custo de Ficha: 32 PM
Capacidade Operacional: 40 PM
Teto do Espaço: 36 PM
```

A construção é inválida porque a Capacidade Operacional ultrapassa o teto.

## Aninhamento

A DEC-017 não aprova estruturas dentro de Recipientes. Até decisão específica:

- um Recipiente não pode conter Repertório, outro Recipiente ou Variável;
- nenhuma outra estrutura pode conter um Recipiente;
- todos os componentes internos devem ser Efeitos e modificadores construídos diretamente.

A proposta anterior de liberar um Repertório dentro de Recipiente no Rank V permanece suspensa.

## Próxima decisão

A próxima decisão mecânica é a liberação e a amplitude das Estruturas Variáveis.