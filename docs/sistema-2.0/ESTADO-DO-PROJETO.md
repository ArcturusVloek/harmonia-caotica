# Estado do Projeto — Sistema 2.0

**Status:** documento operacional  
**Atualizado em:** 23/07/2026

Este arquivo deve ser lido no início de toda nova sessão de desenvolvimento e atualizado ao final dela.

## Visão consolidada

Harmonia Caótica será um RPG sem dados, desenvolvido para textos longos e assíncronos, especialmente no WhatsApp.

O cenário é Vaelora, uma ambientação de dark/high fantasy centrada em Divindades, Domínios, Vertentes, Bênçãos, Milagres, Guerra Divina, Vacância e Ascensão.

Harmonia Caótica utilizará diretamente a engenharia de poderes de *Mutantes & Malfeitores*, com foco em *Poder Supremo*. Não será apenas um sistema inspirado por M&M. Efeitos, graduações, custos, modificadores, estruturas, descritores e construção por pontos serão preservados sempre que não dependerem de dados, perícias ou atributos-base.

## Conteúdo considerado válido

Permanecem como fundamentos do cenário:

- cosmologia e origem dos conceitos;
- Harmonia Caótica e Guerra Divina;
- cinco Divindades regentes e dez Domínios;
- Bênçãos como acesso ao poder;
- distinção entre conceito divino e interpretação religiosa;
- culturas e territórios publicados;
- Vacância e Ascensão;
- limites conceituais já estabelecidos entre Domínios, sujeitos a refinamento editorial.

Permanecem como fundamentos mecânicos de M&M:

- efeitos e graduações;
- custos por graduação;
- extras, falhas, feitos de poder e desvantagens;
- descritores;
- estruturas normais, repertórios, recipientes e variáveis;
- poderes alternativos;
- construção por pontos.

## Conteúdo considerado obsoleto ou removido

A Camada Didática aplicada às páginas de Domínios pertencia ao sistema anterior e foi removida do site na branch `sistema-2.0`.

Não são canônicos para o Sistema 2.0:

- modos antigos de Entender, Aplicar e Avaliar;
- cálculos antigos de Milagres da Camada Didática;
- fluxo antigo de construção guiada;
- dados;
- perícias;
- atributos-base;
- bônus derivados de atributos;
- procedimentos que existam apenas para modificar uma rolagem;
- Heranças antigas como regras automaticamente preservadas.

Foram removidos o carregamento automático, o script, os estilos e a documentação específica da Camada Didática. As páginas de Domínios permanecem com seu conteúdo editorial próprio enquanto aguardam os novos sistemas.

## Decisões aprovadas

1. GitHub será a fonte canônica.
2. O sistema não dependerá de dados.
3. O formato principal será textual e assíncrono.
4. M&M será a base mecânica direta da construção de poderes.
5. Milagres serão construídos com efeitos, graduações, modificadores, estruturas, descritores e pontos.
6. Não existirão perícias nem atributos-base.
7. Vaelora será o fundamento conceitual e ontológico dos poderes.
8. A aparência não define o Domínio; o princípio sobrenatural define.
9. Religiões interpretam os poderes, mas não estabelecem seus limites universais.
10. A Camada Didática antiga é não canônica e não deve ser carregada nas páginas.
11. Documentos utilizarão estados editoriais explícitos.
12. A equivalência utilizará resolução híbrida: concessão contra Resistência passiva e impasse entre vontades ativas.
13. Impasses serão rompidos apenas por mudança verificável da situação ou Escalada com custo, risco ou vulnerabilidade.

## Trabalho concluído nesta etapa

- criada a branch `sistema-2.0`;
- criado o diretório `docs/sistema-2.0/`;
- registrados princípios canônicos;
- criado o registro inicial de decisões;
- criado o glossário de termos;
- estabelecida a separação entre documentação, regra canônica e apresentação do site;
- removido de `js/dominios.js` o carregamento da Camada Didática;
- removidos `js/regra-guiada.js` e `css/regra-guiada.css`;
- removido `docs/ARQUITETURA-DIDATICA.md`;
- aprovada a comparação entre Capacidade e Resistência;
- aprovada a regra híbrida de equivalência;
- incorporado o conceito inicial de Escalada ao núcleo de resolução;
- definido M&M como base mecânica direta;
- descartada a proposta de escala genérica de 0 a 6 separada das graduações de M&M.

## Trabalho atual

Realizar uma auditoria de conversão de *Poder Supremo*.

Cada componente deverá ser classificado como:

- **preservado:** funciona sem alteração relevante;
- **convertido:** mantém sua função, mas troca rolagens por comparação determinística;
- **substituído:** sua função é necessária, mas precisa de uma regra nova;
- **removido:** depende de perícia, atributo-base ou rolagem sem função útil restante.

A prioridade é preservar a liberdade de criação de M&M, alterando apenas as partes necessárias para o formato sem dados.

## Próxima decisão necessária

Definir a conversão determinística dos três procedimentos centrais de M&M:

1. testes de ataque;
2. testes opostos de poder;
3. jogadas de salvamento contra efeitos.

Antes de criar novas escalas ou efeitos, será necessário verificar como as graduações existentes resolvem essas três funções sem dados.

Depois disso, deverão ser definidos:

1. limites de nível de poder;
2. defesas e resistências explícitas;
3. ações e duração no formato assíncrono;
4. esforço extra e recursos equivalentes;
5. tratamento de efeitos que aumentam, drenam ou imitam atributos e perícias removidos;
6. integração de Domínio e Vertente como descritores e permissões.

## Arquivos que devem ser lidos antes de continuar

1. `docs/sistema-2.0/README.md`;
2. `docs/sistema-2.0/PRINCIPIOS.md`;
3. `docs/sistema-2.0/DECISOES.md`;
4. `docs/sistema-2.0/GLOSSARIO.md`;
5. `docs/sistema-2.0/nucleos/resolucao.md`;
6. *Mutantes & Malfeitores: Poder Supremo*;
7. `mundo/origem.html`;
8. páginas dos Domínios relevantes para o módulo em desenvolvimento.

## Regra de encerramento de sessão

Antes de terminar uma sessão:

- registrar decisões aprovadas;
- marcar propostas não aprovadas como rascunho;
- atualizar este arquivo;
- atualizar o changelog;
- indicar a próxima decisão exata.