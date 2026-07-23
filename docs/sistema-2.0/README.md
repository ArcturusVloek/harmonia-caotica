# Harmonia Caótica — Sistema 2.0

**Status:** em desenvolvimento  
**Fonte canônica:** este diretório no GitHub  
**Ambientação:** Vaelora  
**Formato principal de jogo:** interpretação assíncrona por textos longos, especialmente no WhatsApp

## Propósito

Este diretório reúne a documentação canônica de desenvolvimento do novo sistema de Harmonia Caótica.

O sistema será desenvolvido para uma ambientação de dark/high fantasy centrada em Divindades, Domínios, Vertentes, Bênçãos, Milagres, Guerra Divina, Vacância e Ascensão.

A construção de poderes utilizará como referência de engenharia a modularidade de *Mutantes & Malfeitores: Poder Supremo*, sem transportar sua resolução por dados, sua estrutura de super-heróis ou suas regras específicas de d20.

## Regra de autoridade

Quando uma conversa, página antiga do site, rascunho ou implementação técnica entrar em conflito com a documentação deste diretório, prevalece o documento com maior estado editorial:

1. canônico;
2. em teste;
3. rascunho;
4. descartado.

Uma ideia discutida em conversa não se torna automaticamente uma regra oficial. Ela precisa ser registrada e receber estado editorial.

## Documentos principais

- [`PRINCIPIOS.md`](PRINCIPIOS.md): fundamentos que orientam todo o sistema.
- [`DECISOES.md`](DECISOES.md): registro das decisões aprovadas e substituídas.
- [`GLOSSARIO.md`](GLOSSARIO.md): significado controlado dos termos do projeto.
- [`ESTADO-DO-PROJETO.md`](ESTADO-DO-PROJETO.md): situação atual e ponto exato de continuidade.
- [`ROADMAP.md`](ROADMAP.md): ordem de desenvolvimento.
- [`CHANGELOG.md`](CHANGELOG.md): histórico das alterações deste diretório.
- [`nucleos/resolucao.md`](nucleos/resolucao.md): proposta em desenvolvimento para a resolução sem dados.

## Separação editorial

O projeto distingue três camadas:

### Documentação de desenvolvimento

Registra motivos, alternativas, riscos, dependências e decisões de projeto.

### Regra canônica

Define aquilo que jogadores, narradores e administradores devem aplicar.

### Apresentação do site

Ensina e consulta a regra canônica. A interface não deve inventar regras próprias nem ser a única fonte de uma regra.

## Sistema anterior

A atual Camada Didática presente nas páginas de Domínios pertence a um sistema descartado. Seus modos de aplicação, avaliação, cálculo e construção não são canônicos para o Sistema 2.0.

Os arquivos antigos deverão ser desativados e arquivados de forma controlada depois que suas dependências técnicas forem identificadas. Eles não devem ser removidos sem revisão.

## Procedimento de trabalho

Cada etapa deve seguir esta ordem:

1. identificar a questão mecânica;
2. comparar a proposta com a cosmologia e os limites conceituais de Vaelora;
3. produzir um rascunho;
4. testar contradições e casos extremos;
5. registrar a decisão;
6. atualizar a regra correspondente;
7. atualizar `ESTADO-DO-PROJETO.md`;
8. integrar a mudança ao site apenas quando o conteúdo estiver estável.
