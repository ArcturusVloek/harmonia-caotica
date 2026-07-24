# Registro de Decisões

**Status:** canônico  
**Última revisão:** 24/07/2026

Este documento registra decisões estruturais do Sistema 2.0. Uma decisão permanece válida até ser explicitamente substituída por outra entrada.

---

## DEC-001 — GitHub como fonte canônica

**Status:** aprovada  
**Data:** 23/07/2026

### Decisão

O diretório `docs/sistema-2.0/` será a fonte canônica do desenvolvimento do novo sistema.

Conversas, mensagens, páginas antigas e implementações técnicas não substituem a documentação registrada.

### Motivo

O projeto será desenvolvido durante múltiplas conversas e precisa preservar continuidade, decisões e estados editoriais sem depender do tamanho do histórico de uma sessão.

### Consequências

Toda sessão de desenvolvimento deve terminar com a atualização de `ESTADO-DO-PROJETO.md` e dos documentos afetados.

---

## DEC-002 — Sistema sem dados

**Status:** aprovada  
**Data:** 23/07/2026

### Decisão

Harmonia Caótica não utilizará dados como mecanismo necessário de resolução.

### Motivo

O formato principal será assíncrono e baseado em textos longos no WhatsApp. A resolução precisa permanecer legível, verificável e funcional sem ferramentas externas.

### Consequências

Ataques, resistências, disputas, exploração e uso de Milagres deverão ser resolvidos por comparação de capacidades, condições, recursos, custos e consequências.

---

## DEC-003 — Construção modular de Milagres

**Status:** aprovada; ampliada pela DEC-009  
**Data:** 23/07/2026

### Decisão

Os poderes serão construídos pela combinação de componentes mecânicos, em vez de depender exclusivamente de listas fechadas.

### Referência

A modularidade de *Mutantes & Malfeitores: Poder Supremo* fornece a engenharia de efeitos, modificadores, limitações, descritores e estruturas. A DEC-009 esclarece que M&M é a base mecânica do sistema, não apenas uma inspiração.

### Limites

Não serão adotados automaticamente:

- d20;
- testes de ataque aleatórios;
- salvamentos aleatórios;
- estrutura temática de super-heróis;
- dependência de mapas táticos;
- terminologia incompatível com Vaelora.

### Consequências

Os componentes de M&M serão preservados sempre que não dependerem de dados, perícias ou atributos-base. As dependências removidas serão substituídas por procedimentos determinísticos compatíveis com o formato textual e com Vaelora.

---

## DEC-004 — Vaelora como dark/high fantasy divina

**Status:** aprovada  
**Data:** 23/07/2026

### Decisão

O sistema será desenvolvido especificamente para uma fantasia elevada e sombria centrada em interações divinas.

### Consequências

As regras devem comportar:

- alterações corporais e espirituais;
- manifestações ambientais;
- conflitos entre conceitos;
- influência sobre culturas e instituições;
- Vacância Divina;
- Ascensão;
- consequências da proximidade com os Domínios.

---

## DEC-005 — Camada Didática antiga não canônica

**Status:** aprovada  
**Data:** 23/07/2026

### Decisão

A Camada Didática aplicada às páginas de Domínios pertencia ao sistema anterior e não deve ser utilizada como fonte mecânica para o Sistema 2.0.

Isso inclui seus fluxos de Entender, Aplicar e Avaliar, seus critérios de construção, cálculos e qualquer regra derivada do sistema descartado.

### Consequências

O carregamento automático, o script, os estilos e a documentação específica da Camada Didática foram removidos na branch `sistema-2.0`. As páginas dos Domínios permanecem com seu conteúdo editorial enquanto aguardam a implantação dos novos sistemas.

---

## DEC-006 — Separação entre conceito, religião e ética

**Status:** aprovada  
**Data:** 23/07/2026

### Decisão

Divindades e Domínios definem possibilidades ontológicas. Religiões e culturas interpretam essas possibilidades, mas não estabelecem seus limites universais.

### Consequências

A aprovação ou condenação religiosa produzirá consequências sociais e narrativas. Ela não tornará mecanicamente impossível um Milagre coerente com o Domínio.

---

## DEC-007 — Estrutura editorial por estados

**Status:** aprovada  
**Data:** 23/07/2026

### Decisão

Documentos e regras serão identificados como `rascunho`, `em teste`, `canônico` ou `descartado`.

### Consequências

Nenhuma proposta apresentada durante uma conversa será considerada oficial sem registro documental e indicação de estado.

---

## DEC-008 — Equivalência híbrida entre Capacidade e Resistência

**Status:** aprovada  
**Data:** 23/07/2026

### Decisão

A resolução compara uma **Capacidade** aplicada com uma **Resistência** pertinente.

- Quando a Capacidade é superior, a intenção se realiza dentro dos limites declarados.
- Quando a Capacidade é inferior, a intenção não consegue impor o resultado pretendido.
- Quando existe equivalência contra uma resistência passiva, a intenção se realiza mediante consequência, redução ou concessão.
- Quando existe equivalência entre vontades ativas que pretendem impor resultados incompatíveis, ocorre um impasse.

### Resistência passiva

É uma dificuldade sem intenção própria de vencer a disputa naquele momento, como ambiente, distância, ferimento, estrutura, barreira ou fenômeno não dirigido.

A equivalência não paralisa a narrativa. O resultado pode ocorrer mediante redução de efeito, desgaste, perda de posição, exposição, consumo de recurso ou outra consequência proporcional.

### Oposição ativa

Existe quando criaturas conscientes, entidades dotadas de vontade ou forças dirigidas tentam impor resultados incompatíveis.

Na equivalência, nenhuma das vontades obtém controle decisivo. O impasse permanece até que uma parte altere a situação.

### Escalada

Um impasse pode ser rompido por uma mudança verificável, como:

- alterar a intenção;
- obter preparação;
- explorar uma condição ou fraqueza;
- utilizar um vínculo pertinente;
- receber auxílio;
- consumir um recurso limitado;
- aceitar uma consequência;
- realizar um sacrifício proporcional.

Escalada não é um bônus gratuito. Toda ampliação precisa existir na ficção, possuir efeito mecânico definido e produzir custo, risco ou vulnerabilidade verificável.

### Motivo

O modelo híbrido mantém fluidez diante de obstáculos e fenômenos, mas preserva a agência de participantes em conflitos diretos. Ele também evita que equivalências sejam decididas por rolagem ou escolha arbitrária do narrador.

### Consequências

As regras futuras de graduação, vantagem, recursos, auxílio, sacrifício e conflito deverão indicar de forma objetiva como alteram Capacidade ou Resistência.

---

## DEC-009 — M&M como base mecânica, não apenas inspiração

**Status:** aprovada  
**Data:** 23/07/2026

### Decisão

Harmonia Caótica será uma adaptação direta do sistema de poderes de *Mutantes & Malfeitores*, com foco nas ferramentas de *Poder Supremo*.

O objetivo não é criar um sistema narrativo novo apenas inspirado por M&M. A base será preservada sempre que possível:

- efeitos;
- graduações;
- custos por graduação;
- modificadores;
- extras e falhas;
- feitos de poder;
- desvantagens;
- descritores;
- estruturas normais, repertórios, recipientes e variáveis;
- poderes alternativos;
- construção por pontos.

### Elementos removidos

Harmonia Caótica não utilizará:

- dados;
- perícias;
- atributos-base;
- bônus derivados de atributos;
- procedimentos que existam apenas para modificar uma rolagem.

### Adaptação necessária

Quando uma regra de poder depender de ataque, teste de poder, perícia, habilidade ou jogada de salvamento, sua função será convertida para resolução determinística sem alterar desnecessariamente a identidade ou o custo do efeito.

Domínio, Vertente e Manifestação funcionarão como descritores e permissões ontológicas de Vaelora. Eles não substituirão o efeito mecânico comprado.

### Consequências

- não será criada uma escala genérica de 0 a 6 separada das graduações de M&M;
- as graduações de efeito continuarão sendo a medida central de potência;
- o catálogo de efeitos de M&M será auditado antes da criação de novos efeitos;
- cada dependência de dados, perícias ou atributos será marcada como `preservada`, `convertida`, `substituída` ou `removida`;
- a criatividade decorrerá da combinação livre de efeitos, modificadores, estruturas e descritores, limitada pelo orçamento de pontos e pela coerência com Vaelora.

---

## Decisões de progressão, construção e documentação

### DEC-010 — Progressão em 100 Níveis e Apoteose

Harmonia Caótica possui 100 Níveis. O Nível 100 concede o Rank Apoteose, condição necessária para disputar uma posição divina, mas não divindade automática.

Documento detalhado: `decisoes/DEC-010-progressao-em-100-niveis.md`.

### DEC-011 — Pontos de Poder por Nível e Espaços de Poder

PM controlam a profundidade das construções. Espaços de Poder controlam quantas construções independentes podem existir. O personagem começa com um Espaço e libera outro em cada múltiplo de cinco.

Documento detalhado: `decisoes/DEC-011-pontos-de-poder-e-espacos-de-poder.md`.

### DEC-012 — Orçamento inicial e PM por Nível

O personagem começa no Nível 1 com 15 PM, formados por 3 PM do Nível e 12 PM de Reserva Inicial. Cada Nível concede 3 PM. O total recebido no Nível `N` é `12 + (3 × N)`.

Documento detalhado: `decisoes/DEC-012-orcamento-inicial-e-pm-por-nivel.md`.

### DEC-013 — Ranks e limites de construção

O personagem sobe de Rank a cada dez Níveis. Existem onze Ranks, de Desperto a Apoteose. A Graduação máxima cresce de 5 a 25, e o limite de PM por Espaço equivale a quatro vezes a Graduação máxima.

Documento detalhado: `decisoes/DEC-013-ranks-e-limites-de-construcao.md`.

### DEC-014 — Custo de Ficha e Capacidade Operacional

Todo Espaço é verificado por dois valores: Custo de Ficha, que representa os PM realmente pagos, e Capacidade Operacional, que representa os PM de efeitos que podem funcionar simultaneamente. Ambos respeitam o teto de PM por Espaço, e o Custo de Ficha também respeita os PM disponíveis do personagem.

Documento detalhado: `decisoes/DEC-014-custo-de-ficha-e-capacidade-operacional.md`.

### DEC-015 — Documentação canônica e texto final para jogadores

O GitHub continuará registrando com precisão todo o desenvolvimento. A aprovação mecânica torna a regra canônica, mas não aprova automaticamente sua redação pública. Páginas, ferramentas e documentos técnicos da branch permanecem não finais para jogadores até uma aprovação editorial explícita.

Documento detalhado: `decisoes/DEC-015-documentacao-canonica-e-texto-para-jogadores.md`.

### DEC-016 — Repertórios e Poderes Alternativos

Repertórios básicos são permitidos desde o Rank I. Cada Graduação estrutural custa 2 PM e fornece uma reserva de 2 PM; cada Poder Alternativo custa 1 PM. O número máximo de Alternativos é igual ao número do Rank. Dinâmico começa no Rank III, e todas as configurações precisam compartilhar fonte, exclusividade e vulnerabilidade verificáveis.

Documento detalhado: `decisoes/DEC-016-repertorios-e-poderes-alternativos.md`.

### DEC-017 — Recipientes

Recipiente ativo é permitido desde o Rank I e Recipiente passivo desde o Rank II. Cada Graduação estrutural custa 5 PM e fornece 5 PM internos. A Capacidade Operacional equivale à capacidade interna máxima. Falhas globais começam no Rank III, com redução máxima de −1 PM por Graduação nos Ranks III–V e −2 PM por Graduação nos Ranks VI–XI, respeitando pisos estruturais de 4 e 3 PM por Graduação.

Documento detalhado: `decisoes/DEC-017-recipientes.md`.

---

## Questões ainda não decididas

As seguintes questões permanecem abertas:

1. acesso e amplitude de Efeitos Variáveis;
2. conversão de Invocar, orçamento de criaturas e Grupos de Comando;
3. limites de aninhamento entre estruturas;
4. reconstrução e redistribuição de PM;
5. conversão determinística de testes de ataque, testes de poder e jogadas de salvamento;
6. tratamento de Efeitos que aumentam, drenam ou imitam atributos e perícias removidos;
7. estrutura temporal de conflitos assíncronos;
8. função mecânica definitiva das Vertentes e Heranças;
9. processo completo de Vacância, Ascensão e conquista de uma posição divina;
10. redação final e aprovação editorial do material destinado aos jogadores.