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

1. GitHub é a fonte canônica do desenvolvimento.
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
18. Existem onze Ranks, de Desperto a Apoteose.
19. A Graduação máxima cresce de 5 a 25.
20. O limite de PM por Espaço equivale a quatro vezes a Graduação máxima.
21. Subir de Rank amplia limites, mas não concede PM adicionais nem melhora Poderes automaticamente.
22. Todo Espaço é verificado por Custo de Ficha e Capacidade Operacional.
23. Custo de Ficha é o valor realmente pago; Capacidade Operacional é o valor de efeitos que podem funcionar simultaneamente.
24. Os dois valores respeitam o teto de PM por Espaço; o Custo de Ficha também respeita os PM disponíveis.
25. Pontos internos de estruturas não são pagos duas vezes.
26. Aprovação mecânica e aprovação editorial são marcos diferentes.
27. Documentos técnicos canônicos não são automaticamente textos finais para jogadores.
28. Páginas e ferramentas atuais permanecem protótipos ou implementações parciais até aprovação editorial explícita.
29. Repertórios básicos são permitidos desde o Rank I.
30. O primeiro Poder Alternativo transforma mecanicamente o Espaço em um Repertório.
31. Cada Graduação estrutural de Repertório custa 2 PM e fornece uma reserva de 2 PM.
32. Cada Poder Alternativo adicional custa 1 PM.
33. A Graduação estrutural do Repertório não é Graduação efetiva de Efeito.
34. O número máximo de Poderes Alternativos é igual ao número ordinal do Rank.
35. Dinâmico é liberado no Rank III.
36. Repertórios exigem fonte imediata, exclusividade justificável e vulnerabilidade compartilhada.
37. Alternativas improvisadas permanecem indisponíveis até a conversão de recursos equivalentes a esforço extra e pontos heroicos.

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

Falhas e descontos podem reduzir o Custo de Ficha, mas não permitem ultrapassar a Capacidade Operacional do Rank.

## Repertórios aprovados

### Estrutura básica

```text
Repertório: 2 PM por Graduação estrutural
Reserva: 2 PM por Graduação estrutural
Poder Alternativo adicional: 1 PM
```

Todo o Repertório ocupa um único Espaço de Poder.

A configuração padrão está incluída no custo da estrutura. A reserva é compartilhada e não se multiplica pelo número de alternativas.

### Alternativos por Rank

```text
Poderes Alternativos máximos = número do Rank
```

A configuração padrão não conta nesse limite. Portanto, o total de configurações cresce de 2 no Rank I para 12 em Apoteose.

### Funcionamento

- somente uma configuração comum utiliza a reserva por vez;
- a configuração pode mudar uma vez por declaração principal de ação até a aprovação do sistema temporal completo;
- a troca não ativa gratuitamente os Efeitos da nova configuração;
- Efeitos que exigem manutenção deixam de ser mantidos quando perdem a reserva;
- uma configuração pode reunir vários Efeitos, desde que sua soma caiba na reserva;
- cada Efeito interno respeita a Graduação máxima do Rank;
- todas as configurações compartilham fonte, exclusividade e vulnerabilidade verificáveis;
- pertencer ao mesmo Domínio não basta para justificar um Repertório;
- desabilitar a estrutura torna todas as configurações indisponíveis.

### Dinâmico

| Ranks | Configurações Dinâmicas máximas |
|---|---:|
| I–II | nenhuma |
| III–V | 2 |
| VI–VIII | 3 |
| IX–X | 4 |
| XI | 5 |

Cada configuração Dinâmica custa 1 PM adicional. Os PM são divididos entre as configurações Dinâmicas e nunca multiplicados.

## Política de preservação e publicação

O GitHub registra continuamente decisões, propostas em auditoria, fórmulas, limites, exceções, dependências e questões abertas.

A documentação canônica prioriza precisão e continuidade. Ela não é, por si só, o texto final mostrado aos jogadores.

A versão final será escrita depois da consolidação dos blocos mecânicos, com definições simples, procedimentos passo a passo, exemplos válidos e inválidos, casos especiais e consulta rápida. Essa reescrita não poderá alterar a mecânica aprovada.

## Trabalho concluído

- criada a branch `sistema-2.0`;
- criada a documentação canônica do novo sistema;
- removida a Camada Didática antiga;
- definida a resolução determinística inicial;
- definido M&M como base mecânica direta;
- definida a progressão em 100 Níveis;
- separados PM e Espaços de Poder;
- definido o orçamento inicial e a progressão regular de PM;
- definidos os onze Ranks e seus limites;
- aprovados Custo de Ficha e Capacidade Operacional;
- separadas aprovação mecânica e aprovação editorial;
- aprovados Repertórios e Poderes Alternativos por Rank;
- criado o portal técnico inicial do Sistema 2.0;
- criadas calculadoras e validadores parciais;
- criada auditoria funcional e visual automatizada.

## Implementação técnica atual

A branch `sistema-2.0` possui páginas e ferramentas experimentais, incluindo portal, Primeiros Passos, Progressão e Ranks, Construção Guiada, Estruturas de Poder e Consulta Rápida.

Essas páginas existem apenas na branch e no PR nº 4. Não estão publicadas na `main`.

Nenhuma delas constitui texto final para jogadores. A DEC-014 e a DEC-016 ainda não foram integralmente aplicadas ao site ou ao validador.

## Trabalho atual

Definir a liberação e os limites dos **Recipientes por Rank**.

A auditoria de estruturas avançadas ainda precisa aprovar, rejeitar ou ajustar:

- Recipiente ativo e passivo;
- Falhas aplicadas ao Recipiente inteiro;
- acesso e amplitude de Efeitos Variáveis;
- conversão do orçamento e quantidade de Invocados;
- Grupos de Comando para hordas;
- limites de aninhamento entre estruturas;
- reconstrução e redistribuição de PM.

## Trabalho posterior

Depois das estruturas avançadas, concluir a conversão determinística de:

1. testes de ataque;
2. testes opostos de poder;
3. jogadas de salvamento contra Efeitos;
4. limites de Nível de Poder de M&M;
5. ações e duração no formato assíncrono;
6. Efeitos ligados a atributos e perícias removidos.

Somente depois da consolidação mecânica será iniciada a redação final para jogadores, seguida pela revisão editorial e pela implementação pública definitiva.

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
10. `docs/sistema-2.0/auditorias/estruturas-avancadas.md`;
11. `docs/sistema-2.0/auditorias/site-sistema-2.md`;
12. `docs/sistema-2.0/nucleos/progressao.md`;
13. `docs/sistema-2.0/nucleos/resolucao.md`;
14. *Mutantes & Malfeitores: Poder Supremo*.

## Regra de encerramento de sessão

Antes de terminar uma sessão:

- registrar decisões aprovadas;
- marcar propostas não aprovadas como rascunho;
- atualizar este arquivo;
- atualizar o changelog;
- indicar a próxima decisão exata;
- confirmar que nenhuma redação técnica foi apresentada como texto final para jogadores sem aprovação editorial.
