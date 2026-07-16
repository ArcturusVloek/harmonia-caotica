# Padrão Editorial do Arquivo de Vaelora

Este documento define a estrutura visual e semântica usada no site oficial de **Harmonia Caótica — Um RPG ambientado no mundo de Vaelora**.

## Princípios

1. Textos narrativos longos são justificados, com largura de leitura controlada, hifenização e espaçamento constante.
2. Resumos, cartões, citações, botões e textos curtos permanecem alinhados à esquerda.
3. Títulos seguem três níveis claros: título da página, título de seção e subtítulo interno.
4. Toda página interna pertence ao **Arquivo de Vaelora** e apresenta identificação editorial, natureza do registro e tempo estimado de leitura.
5. Páginas extensas possuem índice fixo e atalhos de retorno ao índice.
6. Imagens de abertura recebem prioridade de carregamento. Imagens secundárias usam carregamento tardio e decodificação assíncrona.

## Ordem canônica dos territórios

As páginas territoriais devem seguir esta ordem:

1. Visão geral
2. Geografia e regiões
3. Cultura e vida cotidiana
4. Religião
5. Capital
6. Assentamentos
7. Natureza, fauna e flora
8. Ameaças
9. Economia
10. Relações com o mundo

A economia deve abordar produção, recursos naturais, comércio, rotas, profissões, tributos, desigualdades, dependências externas e os efeitos da religião e do bioma sobre a vida econômica.

## Ordem canônica das Divindades

1. Apresentação geral
2. Primeiro Domínio
3. Segundo Domínio
4. Encontro entre os Domínios
5. Fé e interpretações mortais
6. Bênção e milagres
7. Conceitos Sagrados
8. Criaturas Sagradas
9. Território dos fiéis

## Arquivos compartilhados

- `css/mobile-base.css`: estrutura visual original do site.
- `css/editorial.css`: padrão editorial global, índices e componentes compartilhados.
- `css/mobile.css`: ponto único de importação dos estilos globais.
- `js/editorial.js`: índice automático, tempo de leitura, identificação editorial, navegação e tratamento de imagens.
- `templates/territorio.html`: modelo para novos territórios.
- `templates/divindade.html`: modelo para novas Divindades.
- `scripts/apply-editorial-upgrade.py`: aplica o padrão a páginas existentes e futuras.

## Classes compartilhadas dos territórios

Cada território pode conservar classes próprias para cores e identidade visual, mas também deve utilizar:

- `territory-hero`
- `territory-hero__layout`
- `territory-hero__content`
- `territory-hero__title`
- `territory-hero__summary`
- `territory-facts`
- `territory-fact`
- `territory-index`
- `territory-index__list`
- `territory-content`
- `territory-opening`
- `territory-opening__copy`
- `territory-opening__lead`
- `territory-section`
- `territory-section__heading`
- `territory-section__number`
- `territory-section__kicker`
- `territory-section__summary`
- `territory-card`
- `territory-grid`

Classes próprias como `ruvia-section` ou `alba-section` continuam permitidas para cores, imagens e detalhes exclusivos.

## Inclusão do sistema editorial

Todas as páginas devem carregar:

```html
<link rel="stylesheet" href="../css/mobile.css">
<script src="../js/editorial.js" defer></script>
```

A página inicial usa caminhos sem `../`.

## Regra de preservação

O sistema editorial não deve reescrever o conteúdo canônico. Ajustes automáticos ficam restritos à estrutura, às classes, à navegação, aos atributos de carregamento e à separação entre HTML, CSS e JavaScript.
