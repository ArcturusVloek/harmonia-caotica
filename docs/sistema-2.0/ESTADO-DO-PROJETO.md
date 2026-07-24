# Estado do Projeto — Sistema 2.0

**Status:** documento operacional  
**Atualizado em:** 24/07/2026

Este arquivo deve ser lido no início de toda nova sessão de desenvolvimento e atualizado ao final dela.

## Visão consolidada

Harmonia Caótica será um RPG sem dados, desenvolvido para textos longos e assíncronos, especialmente no WhatsApp.

O cenário é Vaelora, uma ambientação de dark/high fantasy centrada em Divindades, Domínios, Vertentes, Bênçãos, Milagres, Guerra Divina, Vacância e Ascensão.

Harmonia Caótica utilizará diretamente a engenharia de poderes de *Mutantes & Malfeitores*, com foco em *Poder Supremo*. Efeitos, Graduações, custos, modificadores, estruturas, descritores e construção por pontos serão preservados sempre que não dependerem de dados, perícias ou atributos-base.

## Fundamentos mecânicos preservados de M&M

- Efeitos e Graduações;
- custos por Graduação;
- Extras, Falhas, Feitos de Poder e Desvantagens;
- descritores;
- Efeitos Ligados;
- Poderes Alternativos;
- Repertórios, Recipientes e Efeitos Variáveis;
- construção por Pontos de Poder.

## Elementos removidos

- dados;
- perícias;
- atributos-base;
- bônus derivados de atributos;
- procedimentos cuja única função seja modificar uma rolagem;
- Camada Didática do sistema descartado;
- Heranças antigas como regras automaticamente preservadas.

## Decisões aprovadas

1. GitHub é a fonte canônica.
2. O sistema não depende de dados.
3. O formato principal é textual e assíncrono.
4. M&M é a base mecânica direta da construção de poderes.
5. Não existem perícias nem atributos-base.
6. Vaelora estabelece descritores, permissões e limites ontológicos.
7. A equivalência usa concessão contra Resistência passiva e impasse entre vontades ativas.
8. Harmonia Caótica possui 100 Níveis.
9. O Nível 100 concede o Rank Apoteose, mas não divindade automática.
10. O personagem começa com um Espaço de Poder e libera outro em cada múltiplo de cinco.
11. O personagem terá 21 Espaços de Poder no Nível 100.
12. PM controlam profundidade; Espaços de Poder controlam diversidade.
13. O personagem recebe 3 PM por Nível.
14. O Nível 1 começa com 15 PM: 3 PM do Nível e 12 PM de Reserva Inicial.
15. Os PM totais recebidos no Nível `N` são `12 + (3 × N)`.
16. No Nível 100, o personagem terá recebido 312 PM.
17. O personagem sobe de Rank a cada dez Níveis.
18. Existem onze Ranks: Desperto, Adepto, Consagrado, Arauto, Exarca, Numinoso, Ascendente, Semidivino, Soberano, Pretendente e Apoteose.
19. A Graduação máxima cresce de 5 no Rank Desperto até 25 em Apoteose.
20. O limite de PM por Espaço equivale a quatro vezes a Graduação máxima do Rank.
21. Subir de Rank amplia limites, mas não concede PM adicionais nem melhora Poderes automaticamente.
22. Todo Espaço é verificado por Custo de Ficha e Capacidade Operacional.
23. Custo de Ficha é o valor realmente pago; Capacidade Operacional é o valor de efeitos que podem funcionar simultaneamente.
24. Os dois valores respeitam o teto de PM por Espaço, e o Custo de Ficha também respeita os PM disponíveis do personagem.
25. Pontos internos de estruturas não são pagos duas vezes.

## Progressão aprovada

| Nível | PM totais | Espaços de Poder |
|---:|---:|---:|
| 1 | 15 | 1 |
| 5 | 27 | 2 |
| 10 | 42 | 3 |
| 20 | 72 | 5 |
| 50 | 162 | 11 |
| 100 | 312 | 21 |

A cada bloco de cinco Níveis, o personagem recebe 15 PM pela progressão normal e libera um Espaço de Poder. Liberar o Espaço não cria automaticamente um Poder nem concede PM adicionais.

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

## Limites aprovados por Espaço

Todo Espaço deve respeitar simultaneamente:

```text
Custo de Ficha <= PM disponíveis do personagem
Custo de Ficha <= PM máximos por Espaço
Capacidade Operacional <= PM máximos por Espaço
```

**Custo de Ficha** é quanto o personagem realmente paga.  
**Capacidade Operacional** é quanto do Poder pode funcionar simultaneamente.

Falhas e descontos podem reduzir o Custo de Ficha, mas não permitem ultrapassar a Capacidade Operacional do Rank.

## Trabalho concluído

- criada a branch `sistema-2.0`;
- criada a documentação canônica do novo sistema;
- removida a Camada Didática antiga das páginas de Domínios;
- definida a resolução determinística inicial;
- definido M&M como base mecânica direta;
- descartada a escala genérica de 0 a 6;
- definida a progressão em 100 Níveis;
- separadas as funções de PM e Espaços de Poder;
- definido o orçamento inicial de 15 PM;
- definida a progressão de 3 PM por Nível;
- consolidada a fórmula de PM totais e a progressão de Espaços;
- definidos os onze Ranks;
- definidas a Graduação máxima e o limite de PM por Espaço de cada Rank;
- aprovados Custo de Ficha e Capacidade Operacional como limites simultâneos;
- registrada uma explicação obrigatória para jogadores com linguagem simples, checklist e exemplos;
- concluída uma auditoria em rascunho das estruturas avançadas;
- criado o portal público inicial do Sistema 2.0;
- criadas páginas de Primeiros Passos, Progressão e Ranks, Estruturas de Poder e Consulta Rápida;
- criada calculadora de progressão por Nível;
- criado validador inicial de custo e Graduação para construções;
- corrigido o validador para também respeitar o total de PM recebido no Nível atual;
- estados editoriais públicos alinhados a regra aprovada, conteúdo em teste e auditoria em rascunho;
- tabelas largas tornadas regiões navegáveis por teclado;
- criada auditoria funcional automatizada para progressão, validação, acessibilidade e estados editoriais;
- integrada a auditoria funcional ao fluxo de CI multiplataforma;
- registrada a auditoria técnica da primeira implementação pública;
- restaurados destinos funcionais para os links de Sistemas da página inicial na branch.

## Implementação pública atual

A branch `sistema-2.0` possui uma primeira camada funcional do site:

- `sistemas/index.html`: portal do Sistema 2.0;
- `sistemas/primeiros-passos.html`: introdução para jogadores;
- `sistemas/progressao-e-ranks.html`: regras canônicas e calculadora;
- `sistemas/construcao-guiada.html`: validador parcial de orçamento total, PM por Espaço e Graduação;
- `sistemas/estruturas-de-poder.html`: explicação das arquiteturas de M&M, com limites por Rank identificados como não canônicos;
- `sistemas/consulta-rapida.html`: fórmulas e tabelas aprovadas;
- `css/sistema-2.css`: apresentação própria;
- `js/sistema-2.js`: dados de Rank, calculadora, validação e melhorias de acessibilidade;
- `tests/sistema-2.mjs`: auditoria funcional da implementação;
- `docs/sistema-2.0/auditorias/site-sistema-2.md`: registro técnico da auditoria;
- `.github/workflows/layout-audit-tests.yml`: execução automática das auditorias funcional e visual.

Essas páginas existem apenas na branch e no PR nº 4. Não estão publicadas na versão `main` enquanto o PR não for mesclado.

A DEC-014 ainda não foi aplicada ao site ou ao validador. A próxima alteração técnica deverá ocorrer somente após pedido explícito e depois da consolidação das estruturas avançadas.

## Trabalho atual

Definir a liberação e os limites dos Repertórios por Rank.

A auditoria de estruturas avançadas ainda precisa aprovar, rejeitar ou ajustar:

- acesso a Poderes Alternativos e Repertórios;
- acesso a Recipientes;
- acesso e amplitude de Efeitos Variáveis;
- conversão do orçamento e quantidade de Invocados;
- Grupos de Comando para hordas;
- limites de aninhamento entre estruturas;
- reconstrução e redistribuição de PM.

## Trabalho posterior

Depois das estruturas por Rank, deverá ser concluída a conversão determinística de:

1. testes de ataque;
2. testes opostos de poder;
3. jogadas de salvamento contra Efeitos;
4. limites de Nível de Poder de M&M;
5. ações e duração no formato assíncrono;
6. Efeitos ligados a atributos e perícias removidos.

Em paralelo, o site deverá receber, somente mediante solicitação explícita:

1. catálogo navegável dos Efeitos adaptados;
2. construtor completo de Poderes;
3. ficha de personagem com controle de PM gastos e disponíveis;
4. exportação para WhatsApp;
5. validação de Domínio, Vertente e descritores.

## Arquivos que devem ser lidos antes de continuar

1. `docs/sistema-2.0/PRINCIPIOS.md`;
2. `docs/sistema-2.0/DECISOES.md`;
3. `docs/sistema-2.0/decisoes/DEC-010-progressao-em-100-niveis.md`;
4. `docs/sistema-2.0/decisoes/DEC-011-pontos-de-poder-e-espacos-de-poder.md`;
5. `docs/sistema-2.0/decisoes/DEC-012-orcamento-inicial-e-pm-por-nivel.md`;
6. `docs/sistema-2.0/decisoes/DEC-013-ranks-e-limites-de-construcao.md`;
7. `docs/sistema-2.0/decisoes/DEC-014-custo-de-ficha-e-capacidade-operacional.md`;
8. `docs/sistema-2.0/auditorias/estruturas-avancadas.md`;
9. `docs/sistema-2.0/auditorias/site-sistema-2.md`;
10. `docs/sistema-2.0/nucleos/progressao.md`;
11. `docs/sistema-2.0/nucleos/resolucao.md`;
12. *Mutantes & Malfeitores: Poder Supremo*.

## Regra de encerramento de sessão

Antes de terminar uma sessão:

- registrar decisões aprovadas;
- marcar propostas não aprovadas como rascunho;
- atualizar este arquivo;
- atualizar o changelog;
- indicar a próxima decisão exata.
