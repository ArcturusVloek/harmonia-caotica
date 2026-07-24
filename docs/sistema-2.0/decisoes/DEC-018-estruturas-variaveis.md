# DEC-018 — Estruturas Variáveis

**Status:** aprovada  
**Data:** 24/07/2026

## Decisão

Harmonia Caótica preserva a Estrutura Variável de *Mutantes & Malfeitores: Poder Supremo*, adaptada aos limites de Rank, Espaços de Poder, Custo de Ficha, Capacidade Operacional e permissões ontológicas de Vaelora.

Uma Estrutura Variável fornece uma reserva de PM que pode ser reconfigurada entre Efeitos e combinações permitidos por um escopo previamente definido. Ela representa capacidades cuja forma mecânica realmente muda conforme a situação, como adaptação, metamorfose funcional, manipulação ampla de uma Vertente ou manifestação conceitual de alta flexibilidade.

A Estrutura Variável não concede acesso irrestrito a Efeitos, Domínios ou Vertentes; não revela automaticamente fraquezas ou informações ocultas; não substitui Repertórios ou Recipientes; e não permite criar estruturas recursivas ou agentes independentes.

## Estrutura básica

Cada Graduação estrutural de Variável concede:

```text
5 PM de reserva configurável
```

O custo depende da amplitude comprada:

```text
Custo de Ficha básico = Graduação estrutural × custo da amplitude
Reserva Variável = Graduação estrutural × 5
```

A Graduação estrutural limita a Graduação de cada Efeito configurado:

```text
Graduação do Efeito configurado <= Graduação da Variável
Graduação do Efeito configurado <= Graduação máxima do Rank
```

A Graduação efetiva do Efeito nunca pode superar o menor desses dois limites. A soma dos custos ajustados de uma configuração não pode ultrapassar a reserva.

## Custo de Ficha e Capacidade Operacional

Toda Estrutura Variável obedece à DEC-014:

```text
Custo de Ficha <= PM disponíveis do personagem
Custo de Ficha <= PM máximos por Espaço
Capacidade Operacional <= PM máximos por Espaço
```

Para uma Estrutura Variável:

```text
Capacidade Operacional = Graduação estrutural × 5
```

A verificação usa a reserva total produzida. Mesmo quando uma configuração específica não consegue gastar todos os pontos por causa da amplitude, da quantidade de Efeitos ou dos limites de Graduação, a Capacidade Operacional continua sendo a reserva total.

Pontos que não possam ser legalmente alocados são desperdiçados naquela configuração. Eles não podem ser usados fora da Matriz Variável.

Modificadores de uma configuração alteram o custo de seus componentes dentro da reserva. Modificadores aplicados à estrutura inteira alteram o Custo de Ficha, mas não aumentam nem reduzem a Capacidade Operacional.

## Liberação e amplitude por Rank

Estruturas Variáveis começam no **Rank V — Exarca**.

O Rank estabelece a maior amplitude disponível. Amplitudes mais estreitas já liberadas continuam disponíveis nos Ranks superiores. Subir de Rank não amplia automaticamente uma Estrutura Variável existente; qualquer alteração depende das futuras regras de reconstrução.

| Ranks | Maior amplitude disponível | Custo por Graduação |
|---|---|---:|
| I–IV | indisponível | — |
| V | um Efeito mecânico específico por vez | 4 PM |
| VI | qualquer Efeito permitido por uma Vertente definida, um por vez | 5 PM |
| VII–VIII | vários Efeitos de uma função estreita dentro de uma Vertente | 6 PM |
| IX–X | vários Efeitos permitidos por uma Vertente inteira | 7 PM |
| XI | qualquer combinação permitida pelas permissões legítimas do personagem dentro de um único Domínio | 8 PM |

### Amplitude de 4 PM por Graduação — Rank V

Permite configurar **um único Efeito mecânico específico por vez**, dentro de um descritor causal estreito.

A estrutura pode variar parâmetros, alvos, descritores secundários, Extras, Falhas e Feitos compatíveis, mas não pode trocar livremente para outro Efeito mecânico.

Exemplo: uma Imunidade Adaptativa pode alterar o estímulo pertinente contra o qual protege, mas não pode trocar Imunidade por Proteção, Regeneração ou Transformação.

### Amplitude de 5 PM por Graduação — Rank VI

Permite configurar **um Efeito por vez**, escolhido entre os Efeitos permitidos por uma Vertente previamente definida.

### Amplitude de 6 PM por Graduação — Ranks VII–VIII

Permite configurar **vários Efeitos simultâneos**, desde que todos pertençam a uma função estreita e previamente definida dentro de uma Vertente.

### Amplitude de 7 PM por Graduação — Ranks IX–X

Permite configurar **vários Efeitos simultâneos** dentro de uma Vertente inteira previamente definida. A estrutura não concede acesso às outras Vertentes do mesmo Domínio.

### Amplitude de 8 PM por Graduação — Rank XI

Permite configurar qualquer combinação de Efeitos dentro de **um único Domínio**, limitada às permissões legítimas que o personagem já possui nesse Domínio.

Essa amplitude não concede novas Vertentes, autoridade divina automática, acesso a outros Domínios ou Efeitos sem relação causal com o conceito.

## Profundidade e amplitude

Quanto maior a amplitude, maior o custo por Graduação e menor tende a ser a Graduação estrutural que cabe no mesmo Espaço.

Exemplo em Apoteose, com teto de 100 PM por Espaço:

```text
Variável estreita 20, a 4 PM por Graduação
Custo de Ficha: 80 PM
Reserva: 100 PM
Graduação máxima interna pela estrutura: 20
```

```text
Variável de Domínio 12, a 8 PM por Graduação
Custo de Ficha: 96 PM
Reserva: 60 PM
Graduação máxima interna pela estrutura: 12
```

A primeira é mais profunda e restrita. A segunda é mais ampla e menos intensa. A flexibilidade não multiplica a reserva.

## Matriz Variável obrigatória

Toda Estrutura Variável precisa possuir uma **Matriz Variável** aprovada na construção. Ela registra:

1. fonte imediata e descritor causal;
2. amplitude comprada;
3. Domínio e Vertente pertinentes;
4. permissões mecânicas explícitas;
5. proibições explícitas;
6. condições de acesso e manutenção;
7. forma de reconfiguração;
8. configurações conhecidas e validadas;
9. critérios usados para aceitar novas configurações.

Descritores vagos como “magia”, “energia”, “poder divino”, “adaptação total” ou “qualquer Milagre” não são suficientes sem parâmetros adicionais.

A Matriz não pode possuir escopo maior que a amplitude comprada nem maior que as permissões ontológicas reais do personagem.

## Declaração de configuração

Antes de produzir resultado, uma configuração precisa declarar:

- Efeitos utilizados;
- Graduações;
- Extras, Falhas e Feitos;
- custo de cada componente;
- custo total da configuração;
- ação, alcance e duração pertinentes;
- descritores e relação causal;
- alvos e intenção imediata.

A configuração é inválida quando:

- ultrapassa a reserva;
- ultrapassa a Graduação da Variável;
- ultrapassa a Graduação máxima do Rank;
- viola a Matriz Variável;
- exige uma permissão ontológica inexistente;
- depende de componente ainda não convertido para Harmonia Caótica.

A Estrutura Variável não revela automaticamente qual configuração é ideal. O personagem precisa possuir base ficcional para reconhecer um problema, estímulo, fraqueza ou necessidade antes de se adaptar a ele.

## Configurações e validação por Rank

### Ranks V–VIII

Somente configurações previamente registradas e aprovadas antes da cena podem produzir resultados.

Não existe custo adicional por configuração aprovada, mas cada uma precisa obedecer integralmente à Matriz e à reserva.

### Ranks IX–X

Novas configurações podem ser propostas durante a cena. Elas não produzem resultado antes de declaração mecânica completa e validação.

Uma configuração aprovada pode ser incorporada à biblioteca da estrutura para usos futuros.

### Rank XI

Novas configurações podem ser formuladas durante a cena dentro do escopo de Domínio comprado, mas continuam exigindo declaração mecânica completa e validação antes do resultado.

Apoteose amplia a amplitude; não elimina a necessidade de demonstrar custo, causalidade e legalidade.

## Reconfiguração e manutenção

Até a aprovação da estrutura temporal completa:

- reconfigurar consome a ação principal da declaração;
- a estrutura pode ser reconfigurada no máximo uma vez por declaração principal;
- reconfiguração como reação é proibida para personagens jogadores;
- modificadores que acelerem ou retardem a reconfiguração permanecem indisponíveis até conversão específica;
- a alocação é mantida enquanto o personagem sustenta a Estrutura Variável;
- quando a manutenção termina, a reserva retorna ao estado nulo e os Efeitos configurados deixam de estar adquiridos;
- resultados instantâneos já produzidos permanecem;
- Efeitos que dependam de manutenção terminam quando os pontos são removidos;
- demais resultados seguem sua própria Duração quando a regra do Efeito permitir persistência.

Reconfigurar não ativa gratuitamente os Efeitos adquiridos. Cada Efeito conserva sua própria ação e demais requisitos.

## Modificadores

Modificadores de uma configuração são pagos com a reserva da Estrutura Variável.

Um modificador pode ser aplicado à estrutura inteira somente quando:

1. afeta todas as configurações;
2. não pode ser evitado escolhendo outra configuração;
3. altera realmente o acesso, a manutenção ou a reconfiguração do conjunto.

Somente modificadores já preservados ou convertidos podem ser usados. Modificadores dependentes de rolagens, pontos heroicos, esforço extra ou economia temporal ainda não aprovada permanecem indisponíveis.

A Estrutura Variável já é dinâmica por natureza. Ela não compra Dinâmico nem Poder Alternativo para representar configurações.

## Proibições

Uma Estrutura Variável não pode:

- existir dentro de outra Estrutura Variável;
- conter outra Estrutura Variável;
- existir dentro de Repertório ou Recipiente;
- conter Repertório ou Recipiente;
- criar Repertório, Recipiente ou outra Estrutura Variável;
- criar o Efeito Invocar;
- conceder Invocar a uma configuração;
- adquirir Poder Alternativo para criar uma reserva paralela;
- reproduzir atributos-base ou perícias removidos antes de conversão específica;
- usar descritores vagos sem Matriz verificável;
- adquirir Efeitos ainda não convertidos ou proibidos;
- alterar retroativamente uma configuração depois que seu resultado foi contestado ou resolvido.

Essas proibições valem em todos os Ranks, incluindo Apoteose.

## Exemplos de limite duplo

### Rank V

Teto do Espaço: 52 PM.

```text
Variável 10
Custo: 4 PM por Graduação
Custo de Ficha: 40 PM
Reserva: 50 PM
Capacidade Operacional: 50 PM
```

A construção é válida. Cada Efeito configurado fica limitado a Graduação 10, embora a Graduação máxima geral do Rank seja 13.

```text
Variável 11
Custo: 4 PM por Graduação
Custo de Ficha: 44 PM
Reserva: 55 PM
Capacidade Operacional: 55 PM
Teto do Espaço: 52 PM
```

A segunda construção é inválida. O custo pago cabe no Espaço, mas a reserva produzida ultrapassa a Capacidade Operacional permitida.

## Diagnóstico estrutural

Utiliza-se:

- **Repertório** quando existe uma lista fixa de configurações que dividem uma reserva e normalmente se substituem;
- **Recipiente** quando vários Efeitos fixos coexistem dentro da mesma meta-característica;
- **Variável** quando a alocação realmente pode ser recriada dentro de uma Matriz aprovada;
- **Invocar** quando existe um agente independente com posição, ações e bloco próprios.

Uma lista pequena e estável de opções deve ser construída como Repertório, não como Variável. Uma forma fixa com vários componentes deve ser Recipiente.

## Explicação futura para jogadores

A redação final deverá começar pela seguinte ideia:

> **Uma Estrutura Variável é uma reserva que pode ser reorganizada dentro de limites definidos antes do jogo. Ela não concede qualquer Poder: cada configuração precisa caber na Matriz, na reserva e nas permissões do personagem.**

A versão pública deverá explicar separadamente:

1. reserva e custo por amplitude;
2. diferença entre Graduação estrutural e Graduação de Efeito;
3. Matriz Variável;
4. declaração completa de configuração;
5. validação antes do resultado;
6. diferenças entre os Ranks V–VIII, IX–X e XI;
7. reconfiguração e manutenção;
8. proibições de aninhamento e Invocar;
9. diferença entre Variável, Repertório e Recipiente.

A aprovação desta decisão é mecânica. Esta redação ainda não constitui o texto final destinado aos jogadores.

## Consequências

- Estruturas Variáveis começam no Rank V;
- cada Graduação fornece 5 PM de reserva configurável;
- a Graduação estrutural limita a Graduação dos Efeitos configurados;
- a Capacidade Operacional equivale à reserva total;
- amplitudes de 4, 5, 6, 7 e 8 PM por Graduação são liberadas nos Ranks V, VI, VII, IX e XI;
- amplitudes inferiores continuam disponíveis nos Ranks superiores;
- toda estrutura exige Matriz Variável formal;
- Ranks V–VIII usam apenas configurações previamente aprovadas;
- Ranks IX–XI podem propor configurações em cena, mas somente produzem resultado após declaração completa e validação;
- reconfiguração consome a ação principal, ocorre no máximo uma vez por declaração e não pode ser reação para personagens jogadores;
- Variável não pode ser aninhada, conter outras estruturas nem criar Invocar;
- a estrutura não revela automaticamente informações, fraquezas ou a configuração ideal;
- a próxima decisão mecânica é a conversão de Invocar, orçamento de criaturas e Grupos de Comando.