# Estado do Projeto — Sistema 2.0

**Status:** documento operacional  
**Atualizado em:** 24/07/2026

Este arquivo deve ser lido no início de toda nova sessão de desenvolvimento e atualizado ao final dela.

## Visão consolidada

Harmonia Caótica será um RPG sem dados, desenvolvido para textos longos e assíncronos, especialmente no WhatsApp.

O cenário é Vaelora, uma ambientação de dark/high fantasy centrada em Divindades, Domínios, Vertentes, Bênçãos, Milagres, Guerra Divina, Vacância e Ascensão.

Harmonia Caótica utiliza diretamente a engenharia de poderes de *Mutantes & Malfeitores*, com foco em *Poder Supremo*. Efeitos, Graduações, custos, modificadores, estruturas, descritores e construção por pontos são preservados sempre que não dependem de dados, perícias ou atributos-base.

## Fundamentos mecânicos preservados

- Efeitos e Graduações;
- custos por Graduação;
- Extras, Falhas, Feitos de Poder e Desvantagens;
- descritores;
- Efeitos Ligados;
- Poderes Alternativos;
- Repertórios;
- Recipientes;
- Estruturas Variáveis;
- construção por Pontos de Poder.

## Elementos removidos

- dados;
- perícias;
- atributos-base;
- bônus derivados de atributos;
- procedimentos cuja única função seja modificar uma rolagem;
- Camada Didática do sistema descartado;
- Heranças antigas como regras automaticamente preservadas.

## Progressão aprovada

```text
PM totais no Nível N = 12 + (3 × N)
Espaços de Poder = 1 + piso(Nível ÷ 5)
```

| Nível | PM totais | Espaços de Poder |
|---:|---:|---:|
| 1 | 15 | 1 |
| 5 | 27 | 2 |
| 10 | 42 | 3 |
| 20 | 72 | 5 |
| 50 | 162 | 11 |
| 100 | 312 | 21 |

PM controlam profundidade. Espaços de Poder controlam diversidade. Liberar um Espaço não cria automaticamente um Poder nem concede PM adicionais.

## Ranks aprovados

| Rank | Níveis | Nome | Graduação máxima | PM máximos por Espaço |
|---:|---:|---|---:|---:|
| I | 1–9 | Desperto | 5 | 20 |
| II | 10–19 | Adepto | 7 | 28 |
| III | 20–29 | Consagrado | 9 | 36 |
| IV | 30–39 | Arauto | 11 | 44 |
| V | 40–49 | Exarca | 13 | 52 |
| VI | 50–59 | Numinoso | 15 | 60 |
| VII | 60–69 | Ascendente | 17 | 68 |
| VIII | 70–79 | Semidivino | 19 | 76 |
| IX | 80–89 | Soberano | 21 | 84 |
| X | 90–99 | Pretendente | 23 | 92 |
| XI | 100 | Apoteose | 25 | 100 |

Subir de Rank amplia limites, mas não concede PM adicionais nem melhora Poderes automaticamente.

## Limites aprovados por Espaço

Todo Espaço respeita simultaneamente:

```text
Custo de Ficha <= PM disponíveis do personagem
Custo de Ficha <= PM máximos por Espaço
Capacidade Operacional <= PM máximos por Espaço
```

Custo de Ficha é quanto o personagem paga. Capacidade Operacional é quanto da construção pode funcionar simultaneamente ou quanto de reserva operacional a estrutura produz. Pontos internos não são pagos duas vezes. Falhas e descontos não ampliam a Capacidade Operacional permitida.

## Repertórios aprovados — DEC-016

```text
Repertório: 2 PM por Graduação estrutural
Reserva: 2 PM por Graduação estrutural
Poder Alternativo adicional: 1 PM
Poderes Alternativos máximos: número do Rank
```

- Repertório básico desde o Rank I;
- todo o Repertório ocupa um único Espaço;
- a reserva é compartilhada e não se multiplica;
- somente uma configuração comum usa a reserva por vez;
- uma configuração pode reunir vários Efeitos, desde que caibam na reserva;
- cada Efeito interno respeita a Graduação máxima do Rank;
- a troca ocorre no máximo uma vez por declaração principal até o sistema temporal completo;
- Dinâmico começa no Rank III e divide a reserva entre duas a cinco configurações conforme o Rank;
- pertencer ao mesmo Domínio não basta: fonte imediata, exclusividade justificável e vulnerabilidade compartilhada são obrigatórias;
- alternativas improvisadas continuam indisponíveis até a conversão dos recursos correspondentes.

## Recipientes aprovados — DEC-017

```text
Recipiente: 5 PM por Graduação estrutural
Capacidade interna: 5 PM por Graduação estrutural
Capacidade Operacional: capacidade interna máxima
```

- Recipiente ativo desde o Rank I;
- Recipiente passivo desde o Rank II;
- componentes internos fixos, simultaneamente acessíveis e pertencentes à mesma meta-característica;
- nenhum limite numérico adicional de Efeitos internos;
- modificadores internos afetam apenas o Efeito correspondente;
- modificadores globais precisam afetar ativação, acesso ou manutenção do conjunto inteiro;
- nenhuma redução global nos Ranks I–II;
- redução máxima de −1 PM por Graduação nos Ranks III–V, com piso de 4 PM por Graduação;
- redução máxima de −2 PM por Graduação nos Ranks VI–XI, com piso de 3 PM por Graduação;
- aninhamento continua proibido até decisão específica.

## Estruturas Variáveis aprovadas — DEC-018

```text
Reserva Variável = Graduação estrutural × 5
Capacidade Operacional = Reserva Variável
```

A Graduação estrutural limita a Graduação de cada Efeito configurado. Cada Efeito também respeita a Graduação máxima do Rank.

| Ranks | Maior amplitude disponível | Custo por Graduação |
|---|---|---:|
| I–IV | indisponível | — |
| V | um Efeito mecânico específico por vez | 4 PM |
| VI | qualquer Efeito de uma Vertente definida, um por vez | 5 PM |
| VII–VIII | vários Efeitos de uma função estreita dentro de uma Vertente | 6 PM |
| IX–X | vários Efeitos de uma Vertente inteira | 7 PM |
| XI | combinações permitidas dentro de um único Domínio | 8 PM |

- amplitudes inferiores continuam disponíveis em Ranks superiores;
- subir de Rank não amplia automaticamente uma Estrutura Variável existente;
- toda estrutura exige Matriz Variável formal;
- a Matriz registra fonte, amplitude, Domínio, Vertente, permissões, proibições, acesso, manutenção, reconfiguração e critérios de validação;
- descritores vagos não são suficientes;
- Ranks V–VIII usam somente configurações previamente aprovadas;
- Ranks IX–XI podem propor configurações em cena, mas elas só produzem resultado após declaração completa e validação;
- reconfigurar consome a ação principal e ocorre no máximo uma vez por declaração;
- reconfiguração como reação é proibida para personagens jogadores;
- reconfigurar não ativa gratuitamente os Efeitos adquiridos;
- Variável não compra Dinâmico nem Poder Alternativo para representar configurações;
- Variável não pode ser aninhada, conter outras estruturas ou criar Invocar;
- a estrutura não revela automaticamente informações, fraquezas ou a configuração ideal.

## Política documental e editorial

O GitHub é a fonte canônica e deve registrar continuamente:

- decisões aprovadas;
- propostas em auditoria;
- fórmulas e limites;
- exceções e dependências;
- questões abertas;
- próxima decisão exata.

Aprovação mecânica e aprovação editorial são marcos diferentes. A documentação canônica prioriza precisão e continuidade. Ela não é, por si só, o texto final mostrado aos jogadores.

A versão final para jogadores será escrita depois da consolidação mecânica, com definições simples, procedimentos passo a passo, exemplos válidos e inválidos, casos especiais e consulta rápida. Essa reescrita não poderá alterar custos, Graduações, limites, permissões ou exceções aprovadas.

## Trabalho concluído

- criada a branch `sistema-2.0` e a documentação canônica;
- removida a Camada Didática antiga;
- definido M&M como base mecânica direta;
- definida a resolução determinística inicial;
- aprovada a progressão em 100 Níveis;
- separados PM e Espaços de Poder;
- definidos orçamento inicial, PM por Nível, Ranks e limites;
- aprovados Custo de Ficha e Capacidade Operacional;
- separadas aprovação mecânica e aprovação editorial;
- aprovados Repertórios e Poderes Alternativos;
- aprovados Recipientes ativos, passivos e seus limites;
- aprovadas Estruturas Variáveis, amplitudes, Matriz e validação;
- criado o portal técnico inicial do Sistema 2.0;
- criadas calculadoras e validadores parciais;
- criada auditoria funcional e visual automatizada.

## Implementação técnica atual

A branch `sistema-2.0` possui páginas e ferramentas experimentais, incluindo portal, Primeiros Passos, Progressão e Ranks, Construção Guiada, Estruturas de Poder e Consulta Rápida.

Essas páginas existem apenas na branch e no PR nº 4. Não estão publicadas na `main`.

Nenhuma delas constitui texto final para jogadores. As DEC-014, DEC-016, DEC-017 e DEC-018 ainda não foram integralmente aplicadas ao site ou ao validador.

## Trabalho atual

Definir a conversão de **Invocar**, incluindo:

- custo do Efeito;
- orçamento de cada criatura;
- Graduação máxima de Invocados comuns e Heroicos;
- quantidade de corpos;
- Tipo, Horda, Heroísmo e Progressão;
- Grupos de Comando;
- autonomia, ordens e economia de ações;
- distinção entre criatura verdadeira e mero descritor de outro Efeito.

## Trabalho posterior

1. limites de aninhamento entre estruturas;
2. reconstrução e redistribuição de PM;
3. conversão determinística de testes de ataque, testes opostos de poder e jogadas de salvamento;
4. limites de Nível de Poder de M&M;
5. estrutura temporal completa de conflitos assíncronos;
6. Efeitos ligados a atributos e perícias removidos;
7. função definitiva das Vertentes e Heranças;
8. Vacância, Ascensão e conquista de posição divina;
9. redação final e aprovação editorial do material para jogadores.

## Arquivos que devem ser lidos antes de continuar

1. `docs/sistema-2.0/PRINCIPIOS.md`;
2. `docs/sistema-2.0/DECISOES.md`;
3. `docs/sistema-2.0/decisoes/DEC-010-progressao-em-100-niveis.md`;
4. `docs/sistema-2.0/decisoes/DEC-011-pontos-de-poder-e-espacos-de-poder.md`;
5. `docs/sistema-2.0/decisoes/DEC-012-orcamento-inicial-e-pm-por-nivel.md`;
6. `docs/sistema-2.0/decisoes/DEC-013-ranks-e-limites-de-construcao.md`;
7. `docs/sistema-2.0/decisoes/DEC-014-custo-de-ficha-e-capacidade-operacional.md`;
8. `docs/sistema-2.0/decisoes/DEC-015-documentacao-canonica-e-texto-para-jogadores.md`;
9. `docs/sistema-2.0/decisoes/DEC-016-repertorios-e-poderes-alternativos.md`;
10. `docs/sistema-2.0/decisoes/DEC-017-recipientes.md`;
11. `docs/sistema-2.0/decisoes/DEC-018-estruturas-variaveis.md`;
12. `docs/sistema-2.0/auditorias/estruturas-avancadas.md`;
13. `docs/sistema-2.0/auditorias/site-sistema-2.md`;
14. `docs/sistema-2.0/nucleos/progressao.md`;
15. `docs/sistema-2.0/nucleos/resolucao.md`;
16. *Mutantes & Malfeitores: Poder Supremo*.

## Regra de encerramento de sessão

Antes de terminar uma sessão:

- registrar decisões aprovadas;
- marcar propostas não aprovadas como rascunho;
- atualizar este arquivo;
- atualizar o changelog;
- indicar a próxima decisão exata;
- confirmar que nenhuma redação técnica foi apresentada como texto final para jogadores sem aprovação editorial.