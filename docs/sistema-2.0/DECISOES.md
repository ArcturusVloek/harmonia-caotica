# Registro de Decisões

**Status:** canônico  
**Última revisão:** 24/07/2026

Este documento registra decisões estruturais do Sistema 2.0. Uma decisão permanece válida até ser explicitamente substituída por outra entrada. Os documentos detalhados em `decisoes/` prevalecem sobre resumos deste índice.

---

## DEC-001 — GitHub como fonte canônica

**Status:** aprovada  
**Data:** 23/07/2026

O diretório `docs/sistema-2.0/` é a fonte canônica do desenvolvimento. Conversas, páginas antigas e implementações técnicas não substituem a documentação registrada. Toda sessão deve atualizar o estado do projeto e os documentos afetados.

## DEC-002 — Sistema sem dados

**Status:** aprovada  
**Data:** 23/07/2026

Harmonia Caótica não utiliza dados como mecanismo necessário de resolução. Ataques, resistências, disputas, exploração e Milagres serão resolvidos por capacidades, condições, recursos, custos e consequências verificáveis.

## DEC-003 — Construção modular de Milagres

**Status:** aprovada; ampliada pela DEC-009  
**Data:** 23/07/2026

Poderes são construídos pela combinação de componentes mecânicos. A engenharia de *Mutantes & Malfeitores: Poder Supremo* fornece Efeitos, Graduações, custos, modificadores, limitações, descritores e estruturas. Não são adotados automaticamente d20, testes aleatórios, salvamentos aleatórios, temática de super-heróis, dependência de mapas ou terminologia incompatível com Vaelora.

## DEC-004 — Vaelora como dark/high fantasy divina

**Status:** aprovada  
**Data:** 23/07/2026

O sistema é desenvolvido para fantasia elevada e sombria centrada em Divindades, Domínios, Vertentes, Bênçãos, Milagres, Guerra Divina, Vacância e Ascensão. As regras devem comportar alterações corporais e espirituais, manifestações ambientais, conflitos conceituais e influência sobre culturas e instituições.

## DEC-005 — Camada Didática antiga não canônica

**Status:** aprovada  
**Data:** 23/07/2026

A Camada Didática do sistema anterior não é fonte mecânica para o Sistema 2.0. Seus fluxos, cálculos e critérios foram descartados. O carregamento automático, o script, os estilos e a documentação específica foram removidos na branch `sistema-2.0`.

## DEC-006 — Separação entre conceito, religião e ética

**Status:** aprovada  
**Data:** 23/07/2026

Divindades e Domínios definem possibilidades ontológicas. Religiões e culturas interpretam essas possibilidades, mas não estabelecem seus limites universais. Aprovação ou condenação religiosa produz consequências sociais e narrativas, não impossibilidade mecânica automática.

## DEC-007 — Estrutura editorial por estados

**Status:** aprovada  
**Data:** 23/07/2026

Documentos e regras são identificados como `rascunho`, `em teste`, `canônico` ou `descartado`. Nenhuma proposta de conversa é oficial sem registro documental e indicação de estado.

## DEC-008 — Equivalência híbrida entre Capacidade e Resistência

**Status:** aprovada  
**Data:** 23/07/2026

A resolução compara Capacidade e Resistência:

- Capacidade superior realiza a intenção dentro dos limites declarados;
- Capacidade inferior não impõe o resultado;
- equivalência contra Resistência passiva gera consequência, redução ou concessão;
- equivalência entre vontades ativas incompatíveis gera impasse.

Escalada exige mudança verificável e custo, risco ou vulnerabilidade. Preparação, fraqueza explorada, vínculo, auxílio, recurso limitado, consequência aceita ou sacrifício podem romper um impasse quando possuírem efeito mecânico definido.

## DEC-009 — M&M como base mecânica direta

**Status:** aprovada  
**Data:** 23/07/2026

Harmonia Caótica é uma adaptação direta do sistema de poderes de *Mutantes & Malfeitores*, com foco em *Poder Supremo*. São preservados, sempre que possível:

- Efeitos e Graduações;
- custos por Graduação;
- Extras, Falhas, Feitos e Desvantagens;
- descritores;
- Efeitos Ligados;
- Poderes Alternativos;
- Repertórios, Recipientes e Estruturas Variáveis;
- construção por pontos.

São removidos dados, perícias, atributos-base, bônus derivados de atributos e procedimentos cuja única função seja modificar uma rolagem. Dependências removidas serão convertidas deterministicamente sem alterar desnecessariamente identidade ou custo dos Efeitos. Domínio, Vertente e Manifestação funcionam como descritores e permissões ontológicas, não como substitutos dos Efeitos comprados.

---

## Decisões de progressão, construção e documentação

### DEC-010 — Progressão em 100 Níveis e Apoteose

Harmonia Caótica possui 100 Níveis. O Nível 100 concede o Rank Apoteose, condição necessária para disputar uma posição divina, mas não divindade automática.

Documento: `decisoes/DEC-010-progressao-em-100-niveis.md`.

### DEC-011 — Pontos de Poder e Espaços de Poder

PM controlam profundidade. Espaços de Poder controlam quantas construções independentes podem existir. O personagem começa com um Espaço e libera outro em cada múltiplo de cinco.

Documento: `decisoes/DEC-011-pontos-de-poder-e-espacos-de-poder.md`.

### DEC-012 — Orçamento inicial e PM por Nível

O Nível 1 começa com 15 PM: 3 PM do Nível e 12 PM de Reserva Inicial. Cada Nível concede 3 PM. O total recebido no Nível `N` é `12 + (3 × N)`.

Documento: `decisoes/DEC-012-orcamento-inicial-e-pm-por-nivel.md`.

### DEC-013 — Ranks e limites de construção

Existem onze Ranks, de Desperto a Apoteose. A Graduação máxima cresce de 5 a 25. O limite de PM por Espaço equivale a quatro vezes a Graduação máxima. Subir de Rank amplia limites, mas não concede PM nem melhorias automáticas.

Documento: `decisoes/DEC-013-ranks-e-limites-de-construcao.md`.

### DEC-014 — Custo de Ficha e Capacidade Operacional

Todo Espaço é verificado por Custo de Ficha, que representa os PM pagos, e Capacidade Operacional, que representa o valor máximo de Efeitos que podem funcionar simultaneamente. Ambos respeitam o teto do Espaço; o Custo de Ficha também respeita os PM disponíveis.

Documento: `decisoes/DEC-014-custo-de-ficha-e-capacidade-operacional.md`.

### DEC-015 — Documentação canônica e texto final para jogadores

O GitHub registra continuamente o desenvolvimento. Aprovação mecânica e aprovação editorial são etapas separadas. Documentos técnicos, páginas e ferramentas atuais não são automaticamente a redação final destinada aos jogadores.

Documento: `decisoes/DEC-015-documentacao-canonica-e-texto-para-jogadores.md`.

### DEC-016 — Repertórios e Poderes Alternativos

Repertórios básicos são permitidos desde o Rank I. Cada Graduação estrutural custa 2 PM e fornece reserva de 2 PM. Cada Poder Alternativo custa 1 PM. Alternativos máximos equivalem ao número do Rank. Dinâmico começa no Rank III. Configurações compartilham fonte, exclusividade e vulnerabilidade verificáveis.

Documento: `decisoes/DEC-016-repertorios-e-poderes-alternativos.md`.

### DEC-017 — Recipientes

Recipiente ativo é permitido desde o Rank I e passivo desde o Rank II. Cada Graduação estrutural custa 5 PM e fornece 5 PM internos. A Capacidade Operacional equivale à capacidade interna máxima. Falhas globais começam no Rank III, com redução máxima de −1 PM por Graduação nos Ranks III–V e −2 PM por Graduação nos Ranks VI–XI, respeitando pisos de 4 e 3 PM por Graduação.

Documento: `decisoes/DEC-017-recipientes.md`.

### DEC-018 — Estruturas Variáveis

Estruturas Variáveis começam no Rank V. Cada Graduação fornece 5 PM de reserva configurável e limita a Graduação dos Efeitos configurados. A Capacidade Operacional equivale à reserva total. As amplitudes custam 4, 5, 6, 7 ou 8 PM por Graduação e são liberadas progressivamente nos Ranks V, VI, VII, IX e XI. Toda estrutura exige Matriz Variável formal, declaração completa e validação. Variável não pode ser aninhada, conter outras estruturas nem criar Invocar.

Documento: `decisoes/DEC-018-estruturas-variaveis.md`.

---

## Questões ainda não decididas

1. conversão de Invocar, orçamento de criaturas e Grupos de Comando;
2. limites de aninhamento entre estruturas;
3. reconstrução e redistribuição de PM;
4. conversão determinística de testes de ataque, testes de poder e jogadas de salvamento;
5. tratamento de Efeitos que aumentam, drenam ou imitam atributos e perícias removidos;
6. estrutura temporal de conflitos assíncronos;
7. função mecânica definitiva das Vertentes e Heranças;
8. processo completo de Vacância, Ascensão e conquista de uma posição divina;
9. redação final e aprovação editorial do material destinado aos jogadores.