# Auditoria — Estruturas avançadas de Poder

**Status:** parcialmente resolvida; propostas restantes em rascunho  
**Data:** 24/07/2026  
**Escopo:** Repertórios, Recipientes, Estruturas Variáveis, Invocar e aninhamento.

Esta auditoria aplica a engenharia de *Mutantes & Malfeitores: Poder Supremo* à progressão aprovada de Harmonia Caótica.

As partes já aprovadas foram transferidas para decisões canônicas. As demais continuam como propostas e não podem ser tratadas como regras oficiais.

## 1. Estado das decisões

### Aprovado

- **Custo de Ficha e Capacidade Operacional:** DEC-014;
- **Repertórios e Poderes Alternativos:** DEC-016.

### Ainda em rascunho

- Recipientes;
- Estruturas Variáveis;
- Invocar;
- orçamento e quantidade de Invocados;
- Grupos de Comando;
- aninhamento entre estruturas.

Em caso de divergência entre esta auditoria e uma decisão aprovada, a decisão canônica prevalece.

## 2. Problema de projeto

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

## 3. Limites já aprovados

Todo Espaço obedece à DEC-014:

```text
Custo de Ficha <= PM disponíveis do personagem
Custo de Ficha <= PM máximos por Espaço
Capacidade Operacional <= PM máximos por Espaço
```

Pontos internos de estruturas não são pagos duas vezes. Falhas e descontos podem reduzir o Custo de Ficha, mas não permitem ultrapassar a Capacidade Operacional do Espaço.

Repertórios obedecem integralmente à DEC-016. Esta auditoria não deve ser usada para reinterpretar seus custos, limites, troca de configuração, Dinâmico, unidade causal ou desabilitação compartilhada.

## 4. Resultado resumido por Rank

Na tabela abaixo, Repertório é canônico. As demais colunas permanecem propostas.

| Rank | Repertório — canônico | Recipiente — proposta | Variável — proposta | Invocar — proposta |
|---:|---|---|---|---|
| I — Desperto | básico; 1 Alternativo | ativo | não | não |
| II — Adepto | 2 Alternativos | passivo | não | um capanga fixo |
| III — Consagrado | 3 Alternativos; Dinâmico | Falha global limitada | não | Tipo geral; até 2 capangas |
| IV — Arauto | 4 Alternativos | igual | não | Horda; até 5 capangas |
| V — Exarca | 5 Alternativos | pode conter um Repertório | Variável 4/Grad. | Tipo amplo; até 10 capangas |
| VI — Numinoso | 6 Alternativos; até 3 Dinâmicos | desconto global ampliado | Variável 5/Grad. | Heroísmo para uma entidade; até 25 comuns |
| VII — Ascendente | 7 Alternativos | igual | Variável 6/Grad. | até 50 comuns |
| VIII — Semidivino | 8 Alternativos | igual | Variável 6/Grad. | até 100 comuns |
| IX — Soberano | 9 Alternativos; até 4 Dinâmicos | uma camada de aninhamento | Variável 7/Grad. | até 250 comuns ou 2 Heroicos |
| X — Pretendente | 10 Alternativos | igual | Variável 7/Grad. | até 500 comuns |
| XI — Apoteose | 11 Alternativos; até 5 Dinâmicos | igual | Variável 8/Grad. | até 1.000 comuns ou 2 Heroicos |

Os números de capangas representam corpos narrativos. A quantidade de resoluções mecânicas permanece limitada pela proposta de Grupos de Comando.

## 5. Recipientes — proposta pendente

### Diagnóstico

Recipiente não concede desconto básico. Seu custo normal equivale à capacidade interna que fornece. Sua vantagem é reunir vários Efeitos em uma mesma forma, estado, corpo, artefato ou manifestação e permitir que condições de ativação e manutenção afetem o conjunto.

O risco surge quando uma Falha aplicada à estrutura reduz simultaneamente o custo de muitos Efeitos que continuam disponíveis juntos.

### Liberação proposta

- Rank I: Recipiente ativo;
- Rank II: Recipiente passivo;
- Rank III: Falhas aplicadas à estrutura inteira;
- Rank V: um Repertório pode existir dentro de um Recipiente;
- Rank IX: uma camada de aninhamento entre Recipiente e Repertório.

### Regras propostas

- todos os Efeitos internos pertencem à mesma meta-característica;
- ativar o Recipiente não reduz a ação própria de seus Efeitos;
- os Efeitos podem funcionar simultaneamente quando suas ações e condições forem cumpridas;
- desativar um Recipiente ativo remove conjuntamente o acesso aos Efeitos internos;
- modificadores aplicados à estrutura afetam ativação, acesso ou manutenção do conjunto;
- modificadores que afetam somente um Efeito são comprados nesse Efeito;
- o conjunto interno não é pago novamente, mas respeita a Capacidade Operacional do Espaço.

### Redução global proposta

| Ranks | Redução máxima aplicada à estrutura |
|---|---:|
| I–II | nenhuma |
| III–V | −1 PM por Graduação |
| VI–XI | −2 PM por Graduação |

O custo final proposto nunca pode ser inferior a 3 PM por Graduação. A Falha deve representar uma limitação real de ativação ou manutenção, não uma limitação estética.

## 6. Estrutura Variável — proposta pendente

### Diagnóstico

Variável é a estrutura de maior flexibilidade e maior risco de abuso. Ela pode otimizar o personagem para cada situação, reduzir a necessidade de cooperação e tornar desafios difíceis de preparar. Não deve representar “qualquer efeito desejado”.

Toda Estrutura Variável exigiria:

- descritor causal preciso;
- conjunto explícito de permissões;
- lista explícita de proibições;
- validação antes de produzir resultado;
- uma única reconfiguração por declaração de ação;
- respeito à Graduação da estrutura e ao Rank;
- respeito à Capacidade Operacional.

### Liberação proposta por amplitude

#### Rank V — 4 PM por Graduação

Uma característica ou Efeito de tipo e descritor específicos, um de cada vez.

#### Rank VI — 5 PM por Graduação

Um Efeito de qualquer tipo permitido por uma Vertente, um de cada vez.

#### Rank VII — 6 PM por Graduação

Vários Efeitos simultâneos pertencentes a uma função estreita e explicitamente definida dentro de uma Vertente.

#### Rank IX — 7 PM por Graduação

Vários Efeitos simultâneos permitidos por uma Vertente inteira.

#### Rank XI — 8 PM por Graduação

Qualquer combinação de Efeitos permitida por um único Domínio ao qual o personagem possua acesso legítimo.

Mesmo em Apoteose, Variável não concederia acesso a outros Domínios nem permitiria Efeitos sem relação causal com o descritor.

### Configurações propostas

- Ranks V–VIII: somente configurações previamente aprovadas;
- Ranks IX–X: novas configurações podem ser propostas durante a cena, mas não funcionam antes da validação;
- Apoteose: configuração em cena exige declaração mecânica completa e validação.

A reconfiguração consumiria a ação principal até a conversão do sistema temporal. Reconfiguração como reação ficaria proibida para personagens jogadores.

### Proibições propostas

- Variável dentro de Variável;
- Variável dentro de Repertório;
- Repertório criado por Variável;
- Invocar criado por Variável;
- descritores vagos como “magia”, “energia”, “poder divino” ou “qualquer Milagre” sem parâmetros adicionais;
- reprodução de atributos ou perícias antes da conversão desses elementos.

## 7. Invocar — proposta pendente

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

O número de corpos aumentaria presença, cobertura, ocupação de posições e resistência narrativa. Não concederia automaticamente um ataque separado para cada criatura.

### Descritor ou criatura real

Invocar só deve ser usado quando a entidade:

- possui posição própria;
- pode ser atingida;
- possui bloco mecânico;
- pode executar tarefas diferentes;
- permanece como agente identificável na cena.

Uma entidade que apenas personifica Dano, Sufocar, Armadilha ou outro Efeito continua sendo descritor desse Efeito.

### Elementos ainda pendentes

- Sacrifício depende da futura substituição de pontos heroicos;
- ordens, autonomia e duração dependem do sistema temporal assíncrono;
- blocos de Invocados dependem da conversão de resistências.

## 8. Aninhamento — proposta pendente

Para evitar multiplicação recursiva de flexibilidade, propõe-se:

- Ranks I–IV: nenhuma estrutura dentro de outra;
- Ranks V–VIII: um Repertório pode existir dentro de um Recipiente;
- Ranks IX–XI: uma única camada entre Recipiente e Repertório;
- Variável não pode ser aninhada;
- Invocar não cria entidades com Variável ou Invocar;
- uma estrutura aninhada continua usando o mesmo Espaço e os mesmos dois tetos.

## 9. Ordem de risco

1. Repertório — flexibilidade com exclusividade; **resolvido pela DEC-016**.
2. Recipiente — simultaneidade paga integralmente; **próxima decisão**.
3. Invocar — multiplicação de agentes e ações; pendente.
4. Variável — improvisação e otimização durante o jogo; pendente.

## 10. Decisões restantes

1. Recipiente ativo no Rank I e passivo no Rank II;
2. Falhas globais e custo mínimo de Recipientes;
3. Estrutura Variável iniciando no Rank V e ampliada até Apoteose;
4. Invocar iniciando no Rank II;
5. conversão do orçamento de Invocados para `3 × Graduação`;
6. Grupos de Comando como limite de ações de hordas;
7. limites de aninhamento entre estruturas.
