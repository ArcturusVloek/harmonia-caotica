# Estado do Projeto — Sistema 2.0

**Status:** documento operacional  
**Atualizado em:** 23/07/2026

Este arquivo deve ser lido no início de toda nova sessão de desenvolvimento e atualizado ao final dela.

## Visão consolidada

Harmonia Caótica será um RPG sem dados, desenvolvido para textos longos e assíncronos, especialmente no WhatsApp.

O cenário é Vaelora, uma ambientação de dark/high fantasy centrada em Divindades, Domínios, Vertentes, Bênçãos, Milagres, Guerra Divina, Vacância e Ascensão.

A construção de poderes utilizará como referência a modularidade de *Mutantes & Malfeitores: Poder Supremo*, mas sua resolução, terminologia e estrutura serão reconstruídas para Vaelora.

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

## Conteúdo considerado obsoleto

A Camada Didática aplicada às páginas de Domínios pertencia ao sistema anterior e foi removida do site na branch `sistema-2.0`.

Não são canônicos para o Sistema 2.0:

- modos antigos de Entender, Aplicar e Avaliar;
- cálculos antigos de Milagres;
- fluxo antigo de construção guiada;
- Ranks, custos, combate e critérios derivados do sistema descartado;
- Heranças antigas como regras automaticamente preservadas.

Foram removidos o carregamento automático, o script, os estilos e a documentação específica dessa camada. As páginas de Domínios permanecem com seu conteúdo editorial próprio enquanto aguardam os novos sistemas.

## Decisões aprovadas

1. GitHub será a fonte canônica.
2. O sistema não dependerá de dados.
3. O formato principal será textual e assíncrono.
4. Milagres serão construídos modularmente.
5. Vaelora será o fundamento mecânico, não apenas uma camada estética.
6. A aparência não define o Domínio; o princípio sobrenatural define.
7. Religiões interpretam os poderes, mas não estabelecem seus limites universais.
8. A Camada Didática antiga é não canônica e não deve ser carregada nas páginas.
9. Documentos utilizarão estados editoriais explícitos.
10. A equivalência utilizará resolução híbrida: concessão contra Resistência passiva e impasse entre vontades ativas.
11. Impasses serão rompidos apenas por mudança verificável da situação ou Escalada com custo, risco ou vulnerabilidade.

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
- incorporado o conceito inicial de Escalada ao núcleo de resolução.

## Trabalho atual

Desenvolver o núcleo de resolução determinística.

A base aprovada compara:

- Intenção;
- Capacidade;
- Resistência;
- Consequência.

### Resultados aprovados

**Capacidade superior:** a Intenção se realiza dentro dos limites declarados.

**Capacidade inferior:** a Intenção não consegue impor o resultado pretendido.

**Equivalência contra Resistência passiva:** a Intenção se realiza mediante consequência, redução ou concessão.

**Equivalência entre vontades ativas:** ocorre impasse até que uma parte altere a situação.

### Escalada

Preparação, concessão, recurso, vínculo, auxílio e sacrifício são formas preliminares de Escalada. Sua magnitude ainda depende da definição da escala universal.

## Próxima decisão necessária

Definir a escala universal de Capacidade e Resistência.

A decisão deverá estabelecer:

1. quantidade de níveis;
2. significado de cada nível;
3. diferença entre mortal, sobrenatural, divino e transcendente;
4. modo de registrar especialização sem inflar números;
5. efeito mecânico de uma diferença de um ou mais níveis;
6. limite de Escalada temporária.

Depois disso, deverão ser definidos:

1. vantagens e desvantagens circunstanciais;
2. recursos e custos para ampliar uma ação;
3. estrutura temporal de conflitos assíncronos;
4. auxílio coletivo;
5. encerramento de conflitos.

## Arquivos que devem ser lidos antes de continuar

1. `docs/sistema-2.0/README.md`;
2. `docs/sistema-2.0/PRINCIPIOS.md`;
3. `docs/sistema-2.0/DECISOES.md`;
4. `docs/sistema-2.0/GLOSSARIO.md`;
5. `docs/sistema-2.0/nucleos/resolucao.md`;
6. `mundo/origem.html`;
7. páginas dos Domínios relevantes para o módulo em desenvolvimento.

## Regra de encerramento de sessão

Antes de terminar uma sessão:

- registrar decisões aprovadas;
- marcar propostas não aprovadas como rascunho;
- atualizar este arquivo;
- atualizar o changelog;
- indicar a próxima decisão exata.