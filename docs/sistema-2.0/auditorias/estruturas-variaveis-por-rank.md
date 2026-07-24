# Auditoria detalhada — Estruturas Variáveis por Rank

**Status:** rascunho  
**Data:** 24/07/2026  
**Escopo:** custo, reserva, amplitude, reconfiguração, validação e proibições das Estruturas Variáveis.

Esta auditoria detalha a proposta de Estruturas Variáveis e substitui, enquanto rascunho mais recente, a seção correspondente da auditoria geral de estruturas avançadas. Nenhum ponto deste arquivo é canônico antes de aprovação e registro em decisão própria.

## 1. Função da estrutura

Uma Estrutura Variável fornece uma reserva de PM que pode ser reconfigurada entre diferentes Efeitos e combinações permitidas por um escopo previamente definido.

Ela existe para representar capacidades cuja forma mecânica realmente muda conforme a situação, como adaptação, metamorfose funcional, manipulação ampla de uma Vertente ou manifestação conceitual de alta flexibilidade.

A Estrutura Variável não é:

- uma autorização para usar qualquer Efeito desejado;
- um substituto universal para Repertórios;
- uma forma de adquirir Domínios, Vertentes ou permissões que o personagem não possui;
- uma justificativa para descobrir automaticamente fraquezas, resistências ou informações ocultas;
- uma forma de criar estruturas recursivas ou agentes independentes.

## 2. Estrutura básica

Cada Graduação estrutural de Variável:

```text
concede 5 PM de reserva configurável
```

O custo por Graduação depende da amplitude adquirida:

```text
Custo de Ficha básico = Graduação estrutural × custo da amplitude
Reserva Variável = Graduação estrutural × 5
```

A Graduação da Estrutura Variável também limita a Graduação de cada Efeito configurado.

```text
Graduação de cada Efeito configurado <= Graduação da Variável
Graduação de cada Efeito configurado <= Graduação máxima do Rank
```

Portanto, a Graduação efetiva de um Efeito configurado nunca pode superar o menor desses dois limites.

A soma dos custos ajustados de uma configuração não pode ultrapassar a reserva da estrutura.

## 3. Custo de Ficha e Capacidade Operacional

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

A Capacidade Operacional usa a reserva total produzida, mesmo quando uma configuração específica não consegue gastar todos os pontos devido aos limites de Graduação, quantidade de Efeitos ou amplitude. Pontos que não possam ser legalmente alocados são desperdiçados naquela configuração.

Modificadores específicos de uma configuração alteram o custo de seus componentes dentro da reserva. Modificadores aplicados à estrutura inteira alteram o Custo de Ficha, mas não aumentam nem reduzem a Capacidade Operacional.

## 4. Amplitude liberada por Rank

A Estrutura Variável começa no **Rank V — Exarca**.

O Rank define a maior amplitude disponível. Um personagem pode comprar uma amplitude mais estreita já liberada, mas não recebe automaticamente uma amplitude maior ao subir de Rank.

| Ranks | Maior amplitude disponível | Custo por Graduação |
|---|---|---:|
| I–IV | indisponível | — |
| V | uma família mecânica específica, um Efeito por vez | 4 PM |
| VI | qualquer Efeito permitido por uma Vertente definida, um por vez | 5 PM |
| VII–VIII | vários Efeitos de uma função estreita dentro de uma Vertente | 6 PM |
| IX–X | vários Efeitos permitidos por uma Vertente inteira | 7 PM |
| XI | qualquer combinação permitida pelas permissões legítimas do personagem dentro de um único Domínio | 8 PM |

As amplitudes inferiores continuam disponíveis nos Ranks superiores.

### 4 PM por Graduação — Rank V

Permite configurar **um único Efeito mecânico específico por vez**, dentro de um descritor causal estreito.

A estrutura pode variar parâmetros, alvos, descritores secundários, Extras, Falhas e Feitos compatíveis, mas não pode trocar livremente para outro Efeito mecânico.

Exemplo: **Imunidade Adaptativa da Simbiose** pode configurar Imunidade contra um estímulo pertinente de cada vez. Ela não pode trocar Imunidade por Proteção, Regeneração ou Transformação.

### 5 PM por Graduação — Rank VI

Permite configurar **um Efeito por vez**, escolhido entre os Efeitos permitidos por uma Vertente previamente definida.

Exemplo: uma Estrutura Variável da Vertente Sombra pode assumir um Efeito coerente de ocultação, deslocamento ou manipulação sombria por vez, desde que cada opção esteja dentro das permissões estabelecidas.

### 6 PM por Graduação — Ranks VII–VIII

Permite configurar **vários Efeitos simultâneos**, desde que todos pertençam a uma função estreita e previamente definida dentro de uma Vertente.

Exemplo: uma configuração de **Caçada Onírica** pode combinar percepção, perseguição, deslocamento e imposição de medo, desde que todos os componentes sirvam diretamente à função de caçar dentro da Vertente Caçada.

### 7 PM por Graduação — Ranks IX–X

Permite configurar **vários Efeitos simultâneos** dentro de uma Vertente inteira previamente definida.

A estrutura ainda não concede acesso a outras Vertentes do mesmo Domínio.

### 8 PM por Graduação — Rank XI

Permite configurar qualquer combinação de Efeitos dentro de **um único Domínio**, limitada às permissões legítimas que o personagem já possui nesse Domínio.

Essa amplitude não concede novas Vertentes, autoridade divina automática, acesso a outros Domínios ou efeitos sem relação causal com o conceito.

## 5. Profundidade e amplitude

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

## 6. Matriz Variável obrigatória

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

A Matriz não pode possuir um escopo maior que a amplitude comprada nem maior que as permissões ontológicas reais do personagem.

## 7. Declaração de configuração

Antes de produzir qualquer resultado, uma configuração precisa declarar:

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

## 8. Configurações e validação por Rank

### Ranks V–VIII

Somente configurações previamente registradas e aprovadas antes da cena podem produzir resultados.

Não existe custo adicional por configuração aprovada, mas cada uma precisa obedecer integralmente à Matriz e à reserva.

### Ranks IX–X

Novas configurações podem ser propostas durante a cena. Elas não produzem resultado antes de declaração mecânica completa e validação.

Uma configuração aprovada pode ser incorporada à biblioteca da estrutura para usos futuros.

### Rank XI

Novas configurações podem ser formuladas durante a cena dentro do escopo de Domínio comprado, mas continuam exigindo declaração mecânica completa e validação antes do resultado.

Apoteose amplia a amplitude; não elimina a necessidade de demonstrar custo, causalidade e legalidade.

## 9. Reconfiguração e manutenção

Até a aprovação da estrutura temporal completa:

- reconfigurar consome a ação principal da declaração;
- a estrutura pode ser reconfigurada no máximo uma vez por declaração principal;
- reconfiguração como reação fica proibida para personagens jogadores;
- modificadores que acelerem ou retardem a reconfiguração permanecem indisponíveis até conversão específica;
- a alocação é mantida enquanto o personagem sustenta a Estrutura Variável;
- quando a manutenção termina, a reserva retorna ao estado nulo e os Efeitos configurados deixam de estar adquiridos;
- resultados instantâneos já produzidos permanecem;
- Efeitos que dependam de manutenção terminam quando os pontos são removidos;
- demais resultados seguem sua própria Duração quando a regra do Efeito permitir persistência.

Reconfigurar não ativa gratuitamente os Efeitos adquiridos. Cada Efeito conserva sua própria ação e demais requisitos.

## 10. Modificadores

Modificadores de uma configuração são pagos com a reserva da Estrutura Variável.

Um modificador pode ser aplicado à estrutura inteira somente quando:

1. afeta todas as configurações;
2. não pode ser evitado escolhendo outra configuração;
3. altera realmente o acesso, a manutenção ou a reconfiguração do conjunto.

Somente modificadores já preservados ou convertidos podem ser usados. Modificadores dependentes de rolagens, pontos heroicos, esforço extra ou uma economia temporal ainda não aprovada permanecem indisponíveis.

A Estrutura Variável já é dinâmica por natureza e não compra Dinâmico. Ela também não compra Poder Alternativo para representar configurações.

## 11. Proibições

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

## 12. Exemplos de limite duplo

### Rank V — amplitude de 4 PM

Teto do Espaço: 52 PM.

```text
Variável 10
Custo: 4 PM por Graduação
Custo de Ficha: 40 PM
Reserva: 50 PM
Capacidade Operacional: 50 PM
```

A construção é válida. Cada Efeito configurado fica limitado a Graduação 10, embora a Graduação máxima geral do Rank seja 13.

### Rank VI — amplitude de 5 PM

Teto do Espaço: 60 PM.

```text
Variável 12
Custo: 5 PM por Graduação
Custo de Ficha: 60 PM
Reserva: 60 PM
Capacidade Operacional: 60 PM
```

A construção é válida. Ela pode escolher um Efeito por vez dentro da Vertente definida.

### Construção inválida por Capacidade Operacional

No Rank V:

```text
Variável 11
Custo: 4 PM por Graduação
Custo de Ficha: 44 PM
Reserva: 55 PM
Teto do Espaço: 52 PM
```

A construção é inválida. O custo pago cabe no Espaço, mas a reserva produzida ultrapassa a Capacidade Operacional permitida.

## 13. Distinção das outras estruturas

Utiliza-se:

- **Repertório** quando existe uma lista fixa de configurações que dividem uma reserva e normalmente se substituem;
- **Recipiente** quando vários Efeitos fixos coexistem dentro da mesma meta-característica;
- **Variável** quando a alocação realmente pode ser recriada dentro de uma Matriz aprovada;
- **Invocar** quando existe um agente independente com posição, ações e bloco próprios.

Uma lista pequena e estável de opções deve ser construída como Repertório, não como Variável. Uma forma fixa com vários componentes deve ser Recipiente.

## 14. Pacote submetido à aprovação

1. Estruturas Variáveis começam no Rank V.
2. Cada Graduação fornece 5 PM de reserva configurável.
3. A Graduação estrutural limita a Graduação de cada Efeito configurado.
4. A Capacidade Operacional equivale à reserva total.
5. Amplitudes de 4, 5, 6, 7 e 8 PM por Graduação são liberadas progressivamente nos Ranks V, VI, VII, IX e XI.
6. Amplitudes inferiores continuam disponíveis nos Ranks superiores.
7. A amplitude de 8 PM nunca ultrapassa um Domínio e não concede permissões novas.
8. Toda estrutura exige Matriz Variável formal.
9. Ranks V–VIII usam apenas configurações previamente aprovadas.
10. Ranks IX–XI podem propor configurações em cena, mas somente produzem resultado depois de declaração completa e validação.
11. Reconfiguração consome a ação principal, ocorre no máximo uma vez por declaração e não pode ser reação para personagens jogadores.
12. Modificadores estruturais só se aplicam quando afetarem todas as configurações e já estiverem convertidos.
13. Variável não pode ser aninhada, conter outras estruturas ou criar Invocar.
14. A estrutura não revela automaticamente informações, fraquezas ou a configuração ideal.
15. A redação final para jogadores será produzida somente depois da consolidação mecânica.

A próxima decisão após este bloco será a conversão de Invocar, salvo revisão desta proposta.