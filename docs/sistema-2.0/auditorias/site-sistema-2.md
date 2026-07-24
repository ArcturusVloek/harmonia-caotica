# Auditoria técnica — Primeira implementação do Sistema 2.0

**Status:** concluída  
**Data:** 24/07/2026  
**Escopo:** páginas públicas, calculadora de progressão, validador inicial, estados editoriais, tabelas e integração contínua.

## Resultado

A primeira implementação passou pela auditoria funcional do Sistema 2.0 e pela auditoria visual multiplataforma em desktop, laptop, Android, iPhone e iPad.

O fluxo validado corresponde ao commit `df8b37335d0cb5e1359131899118f67370d39997` da branch `sistema-2.0`.

## Verificações realizadas

### Calculadora de progressão

Casos cobertos automaticamente:

| Nível | PM totais | Espaços | Rank | Graduação máxima | PM por Espaço |
|---:|---:|---:|---|---:|---:|
| 1 | 15 | 1 | I — Desperto | 5 | 20 |
| 5 | 27 | 2 | I — Desperto | 5 | 20 |
| 10 | 42 | 3 | II — Adepto | 7 | 28 |
| 50 | 162 | 11 | VI — Numinoso | 15 | 60 |
| 100 | 312 | 21 | XI — Apoteose | 25 | 100 |

A numeração pública dos Ranks utiliza algarismos romanos, em conformidade com a documentação canônica.

### Validador de construção

O validador verifica três limites aprovados:

1. o custo do Espaço não pode ultrapassar os PM totais recebidos no Nível atual;
2. o custo do Espaço não pode ultrapassar o teto de PM por Espaço do Rank;
3. a maior Graduação efetiva não pode ultrapassar a Graduação máxima do Rank.

O total recebido é calculado antes de outros gastos. A ferramenta não conhece ainda os PM já investidos em outros Espaços; essa verificação dependerá da futura ficha completa.

Estruturas avançadas continuam produzindo aviso neutro, e não aprovação, enquanto a auditoria de liberação por Rank permanecer em rascunho.

### Estados editoriais

O Arquivo de Vaelora distingue:

- **Regra aprovada:** página composta por decisões canônicas;
- **Conteúdo parcial em teste:** página que contém ferramenta ou procedimento incompleto;
- **Auditoria em rascunho:** página que explica matéria ainda não aprovada;
- **Versão canônica:** conteúdo aprovado sem aviso editorial adicional.

### Acessibilidade das tabelas

Contêineres de tabelas largas recebem:

- `tabindex="0"`;
- `role="region"`;
- rótulo acessível derivado do título da seção.

Isso permite alcançar e rolar tabelas horizontais por teclado em telas estreitas.

### Auditoria visual

A auditoria percorre todas as páginas em desktop, Android e iPhone, além de páginas representativas em laptop e iPad. Ela verifica:

- modo de interface correto;
- títulos e cartões dentro da largura disponível;
- tabelas com rolagem horizontal quando necessário;
- funcionamento dos menus e sumários compactos;
- dimensões mínimas dos controles principais;
- ausência de rolagem horizontal efetiva;
- ausência de erros JavaScript.

## Automação

O arquivo `tests/sistema-2.mjs` executa a auditoria funcional em Chromium. O arquivo `tests/layout-audit-v2.mjs` executa a auditoria visual em Chromium e WebKit.

O fluxo `.github/workflows/layout-audit-tests.yml` executa:

1. validação sintática dos scripts;
2. normalização das páginas;
3. inicialização do site local;
4. auditoria funcional do Sistema 2.0;
5. auditoria visual em desktop, laptop, Android, iPhone e iPad;
6. publicação de relatório e capturas quando houver falhas.

## Limites desta auditoria

Esta auditoria não valida ainda:

- custos individuais do catálogo de Efeitos;
- construção integral de Poderes;
- PM gastos e restantes em uma ficha completa;
- ataques, resistências e salvamentos convertidos;
- limites canônicos das estruturas avançadas;
- coerência específica com cada Domínio e Vertente.

Esses itens dependem das próximas decisões mecânicas e de novas ferramentas públicas.