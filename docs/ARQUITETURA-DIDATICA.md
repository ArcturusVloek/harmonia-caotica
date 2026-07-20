# Arquitetura Didática de Harmonia Caótica

## Objetivo

Transformar o site de um arquivo de textos em uma ferramenta capaz de ensinar, aplicar e avaliar as regras sem separar o usuário da página que está consultando.

A camada didática não substitui o conteúdo canônico. Ela reorganiza as informações já publicadas e apresenta respostas diferentes conforme a tarefa atual.

## Princípios

1. **Uma regra, várias formas de consulta.** A mesma fonte deve alimentar explicação simples, aplicação prática e avaliação administrativa.
2. **Narrativa e mecânica permanecem ligadas, mas não misturadas.** A ambientação explica como o poder aparece; a regra explica o que ele faz.
3. **A aparência não define a classificação.** Domínio e Vertente são determinados pelo princípio sobrenatural responsável pelo efeito.
4. **Toda regra precisa ser resolvível.** O texto deve informar aplicação, resistência, sucesso, falha, consumo e encerramento quando esses elementos forem necessários.
5. **A ajuda deve existir no ponto da dúvida.** O leitor não deve abandonar a página para descobrir o significado de um termo ou o critério usado por um administrador.
6. **Criar um Milagre não pode exigir navegação entre capítulos.** A Construção Guiada precisa reunir escolhas, explicações, custos, validação e ficha final em um único espaço.
7. **O manual completo é referência, não fluxo obrigatório.** Jogadores começam por perguntas simples e só abrem o texto canônico quando surge uma dúvida específica.
8. **Toda opção visível precisa explicar a si mesma.** O Estúdio apresenta significado, uso adequado, limites e comparação com alternativas no próprio campo.
9. **Heranças pertencem à Vertente.** Elas são propriedades passivas dos Milagres compatíveis, não capacidades ativadas ou compras opcionais.
10. **O jogador responde fatos; a interface organiza a redação.** O Estúdio não deve depender da habilidade literária do usuário para produzir uma regra clara.

## Primeira implementação — Domínios e Vertentes

A camada inicial é aplicada às páginas de Domínios e Vertentes por meio dos arquivos:

- `js/regra-guiada.js`
- `css/regra-guiada.css`
- `js/dominios.js`

A camada utiliza a estrutura já existente das páginas. Ela extrai resumo, capacidades, limite conceitual, Vertentes, possibilidades, restrições e exemplos de Milagres.

A interface cria os modos Entender, Aplicar e Avaliar.

## Segunda implementação — Capítulos de Sistemas

Os capítulos mecânicos recebem uma camada contextual comum por meio dos arquivos:

- `js/base-regras-sistemas.js`
- `js/sistema-guiado-core.js`
- `js/sistema-guiado-secoes.js`
- `css/sistema-guiado.css`

A interface apresenta os modos Entender, Aplicar, Avaliar e Termos. Cada seção também recebe finalidade, perguntas de compreensão, erro provável e conceitos relevantes.

## Terceira implementação — Estúdio de Milagres

A página `sistemas/construcao-guiada.html` recebe uma área integrada de construção.

Arquivos centrais:

- `js/estudio-milagres-data.js`
- `js/estudio-milagres.js`
- `js/estudio-milagres-recomendador.js`
- `js/estudio-definitivo-data.js`
- `js/estudio-definitivo-ui.js`
- `js/estudio-definitivo-ajustes.js`
- `js/estudio-complexidade.js`
- `js/estudio-redacao-whatsapp.js`
- `js/estudio-coexistencia.js`
- `js/estudio-desktop-layout.js`
- `css/estudio-milagres.css`
- `css/estudio-definitivo.css`
- `css/estudio-opcoes.css`
- `css/estudio-complexidade.css`
- `css/estudio-redacao-whatsapp.css`
- `css/estudio-desktop.css`

### Fluxo único

O Estúdio organiza a criação em seis etapas:

1. Ideia;
2. Origem divina;
3. Funções;
4. Escala;
5. Resolução;
6. Revisão.

### Origem divina integrada

Divindade, Domínio e Vertente são escolhidos em sequência. A página canônica do Domínio é consultada internamente para localizar a Herança escolhida.

A Herança é mostrada durante a construção, no resumo e na revisão. A ficha exportada registra nome, resumo, gatilho, efeito, limites e exemplo quando publicados.

### Opções autodescritivas

Cada campo apresenta significado, uso adequado, capacidades não concedidas, custo e catálogo comparativo.

### Projeto da Criação

Criações, Invocações e manifestações separadas possuem um bloco próprio. Ele registra forma, natureza, posição, Resistência ou Âncora, Sustentação, encerramento, quantidade, Escala ou Área, Movimento, transporte, comunicação, Origem Vinculada e capacidades internas.

Cada capacidade registra função, Potência principal ou própria, atuação, Alcance, destinos, Área, Duração, Usos, resolução e custo.

### Arquitetura do Poder

Poderes complexos podem utilizar funções simultâneas, modos alternativos, etapas sequenciais, estruturas condicionadas, combinações híbridas e componentes com parâmetros compartilhados ou próprios.

### Propagação integrada

O Estúdio representa Transferência, Reprodução e Crescimento. O bloco registra Passos, Alcance entre Fonte e Destino, atuação, Fontes, Destinos, caminho, quantidade simultânea, recursos, encerramento e proibição de cascata imediata.

### Oficina de Redação Mecânica

A Etapa de Resolução possui uma oficina que transforma respostas factuais em texto técnico uniforme.

O bloco fundamental pergunta:

- como o Milagre se manifesta;
- o que o usuário faz ao ativar;
- onde começa e quem recebe a aplicação;
- qual oposição é realizada;
- resultado do sucesso;
- consequência da falha;
- recorrência durante a Duração;
- contrajogo posterior;
- manutenção;
- encerramento;
- exclusões necessárias.

Cada função selecionada acrescenta perguntas próprias. Controle pergunta ordem exata, limites de decisão, consumo de Usos e quebra. Movimento pergunta existência deslocada, distância e caminho. Criação pergunta atuação ao surgir, capacidades compradas e destruição. Cura, Dano, Informação, Proteção, Transformação, Travessia, Recursos, Custos e Propagação recebem critérios equivalentes.

Cada pergunta contém:

- aquilo que precisa ser respondido;
- campo factual curto;
- exemplo completo;
- exemplo de redação vaga que deve ser evitada.

O indicador de qualidade identifica respostas ausentes, curtas ou imprecisas. Expressões como “o mestre decide”, “da melhor maneira”, “quando necessário”, “meios adequados” e “funciona normalmente” são marcadas para revisão.

Os comandos **Preencher apenas lacunas** e **Reescrever texto técnico** produzem automaticamente Efeito, Resistência, Sucesso, Falha, Limites e Encerramento. O resultado permanece editável.

### Exportação para WhatsApp

A Revisão possui uma prévia inspirada na interface do WhatsApp e três formatos copiáveis:

- Ficha completa;
- Cartão de combate;
- Somente custos.

O texto utiliza os recursos nativos de formatação do aplicativo: `*negrito*`, `_itálico_`, citações, listas e divisores. A versão completa conserva todas as seções; o cartão de combate concentra parâmetros e resolução; a versão de custos apresenta somente a composição financeira do Milagre.

### Custos visíveis

Rank, Potência, Ativação, Alcance, Alvos, Área, Duração, funções, capacidades de Criações, componentes e Propagação atualizam o custo em tempo real.

### Persistência e exportação

O rascunho principal, o Projeto da Criação, a Arquitetura do Poder e as respostas da Oficina são salvos no navegador.

A ficha final pode conter identidade, parâmetros, Herança, Projeto da Criação, Arquitetura, Propagação, apresentação visual, resolução completa e custos.

## Validação

O teste funcional automatizado:

1. cria uma Criação com duas capacidades;
2. escolhe Vida e Sangue;
3. carrega a Herança Corrente Partilhada;
4. configura Reprodução por Propagação;
5. responde todas as perguntas obrigatórias;
6. gera a redação técnica;
7. alcança 100% de detalhamento;
8. verifica a ficha completa e o cartão de combate do WhatsApp;
9. confirma ausência de overflow no Estúdio em computador e celular.

A auditoria global do site continua separada. Problemas históricos de navegação, altura de capturas e páginas extensas não invalidam o teste funcional específico do Estúdio.

## Critério de conclusão de uma regra

Uma regra só está pronta quando responde, conforme sua natureza:

1. O que faz?
2. Quando se aplica?
3. Quem ou o que pode receber o efeito?
4. Como é resolvida?
5. O que pode resistir?
6. O que ocorre no sucesso?
7. O que ocorre na falha?
8. Qual recurso é consumido?
9. Quando termina?
10. O que não permite?
11. Com quais regras interage?

A ausência de uma resposta necessária deve gerar revisão editorial ou aviso contextual na interface.

## Próximas etapas

1. Conferir cada custo contra os capítulos canônicos durante a revisão administrativa.
2. Representar integralmente Reservas, Recargas, Sacrifícios e pagamentos compostos.
3. Ampliar testes para combinações extremas de Controle, Travessia, Transformação e Retorno.
4. Unificar a base estruturada do Estúdio com todas as páginas canônicas.
