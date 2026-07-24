# DEC-015 — Documentação canônica e texto final para jogadores

**Status:** aprovada  
**Data:** 24/07/2026

## Decisão

O desenvolvimento do Sistema 2.0 continuará sendo registrado no GitHub durante todo o processo. O diretório `docs/sistema-2.0/` permanece como fonte canônica para decisões, fórmulas, limites, exceções, estados editoriais e continuidade entre conversas.

A aprovação de uma regra torna seu conteúdo mecânico canônico, mas não torna automaticamente sua redação adequada ou definitiva para jogadores.

Até a conclusão de uma etapa editorial específica, os documentos técnicos, auditorias, páginas experimentais e ferramentas da branch `sistema-2.0` não constituem a versão final que será apresentada ao público.

## Duas camadas obrigatórias

### 1. Camada canônica de desenvolvimento

Registra com precisão:

- a regra formal;
- as fórmulas;
- os limites;
- as exceções;
- os motivos de projeto;
- as interações com outras regras;
- os pontos ainda pendentes;
- o histórico das decisões.

Esta camada deve priorizar integridade, rastreabilidade e ausência de ambiguidades, mesmo quando o texto for mais técnico.

### 2. Camada final para jogadores

Será escrita depois que os blocos mecânicos relacionados estiverem consolidados. Deve preservar exatamente a regra canônica, mas apresentá-la de forma progressiva e compreensível.

Cada regra destinada aos jogadores deverá utilizar, quando aplicável:

1. uma definição curta em linguagem comum;
2. a finalidade da regra;
3. um procedimento passo a passo;
4. exemplos válidos;
5. exemplos inválidos;
6. casos especiais e exceções;
7. uma referência rápida;
8. notas administrativas separadas do texto principal.

## Regra de fidelidade

A redação para jogadores pode resumir, reorganizar, ilustrar e simplificar a linguagem, mas não pode:

- alterar custos;
- alterar Graduações;
- remover limites;
- criar permissões novas;
- transformar proposta em regra aprovada;
- contradizer uma decisão canônica;
- esconder uma restrição necessária para utilizar a regra corretamente.

Quando uma simplificação não conseguir preservar a precisão, a explicação deverá ser ampliada em vez de omitir a informação.

## Estado das páginas e ferramentas atuais

As páginas e ferramentas já existentes na branch `sistema-2.0` são protótipos, provas de conceito ou implementações parciais. Elas podem apresentar regras aprovadas, mas não são consideradas a redação final do livro, manual, site ou material de consulta dos jogadores.

Nenhum conteúdo será tratado como publicação final apenas por estar implementado no site ou marcado como canônico na documentação técnica.

A versão final para jogadores exigirá uma aprovação editorial explícita distinta da aprovação mecânica.

## Fluxo de trabalho

Durante o desenvolvimento:

1. discutir e auditar a regra;
2. aprovar, rejeitar ou ajustar a proposta;
3. registrar imediatamente a decisão e seus efeitos no GitHub;
4. atualizar o estado do projeto, o registro de decisões e o changelog;
5. manter propostas não aprovadas claramente identificadas;
6. somente após a consolidação do bloco mecânico, produzir a redação final para jogadores;
7. revisar a redação final contra a fonte canônica antes da publicação.

## Continuidade entre conversas

Ao iniciar uma nova conversa de desenvolvimento, o estado atual deverá ser reconstruído pelos documentos do GitHub, especialmente:

- `PRINCIPIOS.md`;
- `DECISOES.md`;
- `ESTADO-DO-PROJETO.md`;
- decisões detalhadas em `decisoes/`;
- núcleos mecânicos;
- auditorias ainda abertas;
- `CHANGELOG.md`.

Conversas anteriores podem fornecer contexto, mas não substituem esses documentos.

## Consequências

- o GitHub continuará sendo atualizado durante o desenvolvimento do núcleo mecânico;
- nenhuma decisão aprovada dependerá exclusivamente da memória de uma conversa;
- textos técnicos aprovados não serão confundidos com material didático definitivo;
- o site atual permanece não final para jogadores;
- a redação pública será uma etapa própria de desenvolvimento;
- aprovação mecânica e aprovação editorial passam a ser marcos diferentes;
- o próximo trabalho mecânico continua sendo a liberação e os limites dos Repertórios por Rank.
