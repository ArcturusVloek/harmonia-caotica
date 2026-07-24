# DEC-014 — Custo de Ficha e Capacidade Operacional

**Status:** aprovada  
**Data:** 24/07/2026

## Decisão

Todo Espaço de Poder será verificado por dois valores diferentes:

1. **Custo de Ficha:** quantos PM o personagem realmente paga pela construção;
2. **Capacidade Operacional:** quantos PM de efeitos podem estar disponíveis ou funcionando ao mesmo tempo.

Os dois valores devem respeitar o limite de PM por Espaço do Rank.

Além disso, o Custo de Ficha não pode ultrapassar os PM que o personagem possui disponíveis para gastar.

## Regra formal

Para toda construção:

```text
Custo de Ficha <= PM disponíveis do personagem
Custo de Ficha <= PM máximos por Espaço
Capacidade Operacional <= PM máximos por Espaço
```

Falhas, descontos e estruturas podem fazer o Custo de Ficha ser menor que a Capacidade Operacional, mas nunca autorizam a Capacidade Operacional a ultrapassar o teto do Espaço.

Pontos internos concedidos por uma estrutura não são pagos novamente. Eles apenas são medidos pela Capacidade Operacional.

## Definições

### Custo de Ficha

É a quantidade de PM efetivamente descontada do personagem.

Inclui, conforme a construção:

- Efeito principal;
- Graduações;
- Extras;
- Falhas;
- Feitos de Poder;
- Efeitos Ligados;
- Poderes Alternativos;
- custo da estrutura;
- demais componentes comprados no mesmo Espaço.

### Capacidade Operacional

É o maior valor total de efeitos que pode estar disponível ou funcionando simultaneamente em uma configuração.

Ela não representa um segundo pagamento. É uma medida de limite estrutural.

## Explicação obrigatória para jogadores

A apresentação pública desta regra deverá começar pela seguinte distinção:

> **Custo de Ficha é quanto você paga. Capacidade Operacional é quanto do Poder pode funcionar ao mesmo tempo.**

O jogador não precisa dominar a contabilidade interna de M&M para usar a regra. A verificação deve seguir três perguntas, nesta ordem:

1. **Tenho PM suficientes para pagar este Poder?**
2. **O valor pago cabe no limite do meu Espaço?**
3. **Tudo que pode funcionar junto também cabe no limite do meu Espaço?**

Se qualquer resposta for “não”, a construção precisa ser reduzida ou alterada.

## Exemplos para jogadores

### Poder normal

```text
Dano: 10 PM
Proteção Ligada: 6 PM
Extra: 4 PM

Custo de Ficha: 20 PM
Capacidade Operacional: 20 PM
```

Todos os componentes podem funcionar como uma única construção. Portanto, os dois valores são iguais.

### Repertório

```text
Configuração principal: 18 PM
Poder Alternativo: até 18 PM
Custo do Poder Alternativo: 1 PM

Custo de Ficha: 19 PM
Capacidade Operacional: 18 PM
```

O personagem possui duas opções, mas normalmente usa apenas uma por vez. As opções não são somadas como se 36 PM funcionassem simultaneamente.

### Recipiente com Falha global

```text
Efeitos internos simultâneos: 20 PM
Custo reduzido pela Falha global: 16 PM

Custo de Ficha: 16 PM
Capacidade Operacional: 20 PM
```

O personagem paga menos porque a forma possui uma limitação real. Mesmo assim, a forma continua entregando 20 PM de efeitos quando está disponível.

### Estrutura Variável

```text
Custo pago pela estrutura: 40 PM
Reserva interna configurável: 50 PM

Custo de Ficha: 40 PM
Capacidade Operacional: 50 PM
```

A construção só é permitida quando o Rank comporta 50 PM por Espaço, ainda que o personagem pague apenas 40 PM.

## Exemplo de invalidação

No Rank Desperto, o limite é 20 PM por Espaço.

```text
Custo de Ficha: 16 PM
Capacidade Operacional: 24 PM
```

A construção é inválida. O desconto permite pagar 16 PM, mas não permite colocar 24 PM de efeitos simultâneos em um Espaço limitado a 20 PM.

## Aplicação por estrutura

### Poder normal

A Capacidade Operacional é a soma dos componentes que podem funcionar juntos.

### Repertório

A Capacidade Operacional é o valor da configuração utilizável naquele momento.

Em um Repertório Dinâmico, é a soma dos pontos distribuídos simultaneamente entre as configurações Dinâmicas.

### Recipiente

A Capacidade Operacional é a soma dos efeitos internos disponíveis simultaneamente.

Falhas aplicadas à estrutura podem reduzir o Custo de Ficha, mas não reduzem automaticamente a Capacidade Operacional.

### Estrutura Variável

O Custo de Ficha é o preço pago pela estrutura. A Capacidade Operacional é a quantidade de PM que ela fornece para montar a configuração ativa.

### Invocar

Invocar será tratado por uma regra própria. O orçamento de uma criatura não será automaticamente considerado Capacidade Operacional comum do Espaço, pois a entidade possui bloco mecânico e economia de ações próprios.

## Motivo

Estruturas avançadas podem separar o custo pago do volume de efeitos disponíveis. Controlar apenas o custo permitiria que Falhas globais, reservas internas ou descontos estruturais ultrapassassem o limite de potência definido pelo Rank.

A distinção preserva a engenharia de M&M sem cobrar duas vezes pelos mesmos pontos e sem permitir que descontos ignorem o teto de construção.

## Consequências

- todo Espaço passa a possuir um limite econômico e um limite operacional;
- descontos continuam válidos, mas não ampliam o teto estrutural;
- pontos internos de Repertórios, Recipientes e Variáveis não são pagos duas vezes;
- o construtor futuro deverá mostrar os dois valores separadamente;
- toda explicação pública deverá apresentar primeiro a linguagem simples e somente depois os detalhes técnicos;
- Invocar permanece pendente de conversão específica;
- a próxima decisão é a liberação e os limites dos Repertórios por Rank.
