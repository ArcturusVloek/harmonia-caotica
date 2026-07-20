import { chromium } from 'playwright';
import { promises as fs } from 'node:fs';
import path from 'node:path';

const baseUrl = process.env.SITE_URL || 'http://127.0.0.1:4173';
const outputDir = path.join(process.cwd(), 'artifacts', 'layout-audit');
await fs.mkdir(outputDir, { recursive: true });

const browser = await chromium.launch({ headless: true });
const failures = [];
const checkpoints = [];
const assert = (condition, message) => { if (!condition) failures.push(message); };
const mark = (message) => checkpoints.push(`${new Date().toISOString()} — ${message}`);

async function desktopTest() {
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    hasTouch: false,
    isMobile: false,
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/142 Safari/537.36'
  });
  const page = await context.newPage();
  const errors = [];
  page.on('pageerror', (error) => errors.push(String(error)));

  try {
    await page.goto(`${baseUrl}/sistemas/construcao-guiada.html`, { waitUntil: 'domcontentloaded' });
    await page.evaluate(() => localStorage.clear());
    await page.reload({ waitUntil: 'domcontentloaded' });
    await page.waitForSelector('.miracle-studio');
    await page.waitForTimeout(600);
    mark('Estúdio carregado no desktop.');

    assert(await page.locator('.def-option-guide').count() >= 2, 'As opções iniciais não possuem explicações.');
    await page.locator('[data-state="name"]').fill('Serpente da Corrente Rubra');
    await page.locator('[data-state="idea"]').fill('Cria uma serpente de sangue capaz de proteger aliados e propagar um vínculo vital.');
    await page.locator('[data-next-step]').click();

    await page.locator('[data-state="deity"]').selectOption('Senhora da Aurora');
    await page.locator('[data-state="domain"]').selectOption('Vida');
    await page.locator('[data-state="branch"]').selectOption('Sangue');
    await page.waitForSelector('.def-heritage h3');
    assert(await page.locator('.def-option-catalog').count() >= 3, 'Não há comparação das opções de origem.');
    mark('Origem divina e Herança selecionadas.');

    await page.locator('[data-next-step]').click();
    await page.locator('[data-function="creation"]').check({ force: true });
    await page.locator('[data-function="propagation"]').check({ force: true });
    await page.locator('[data-next-step]').click();

    await page.locator('[data-state="rank"]').selectOption('II');
    await page.locator('[data-state="potency"]').selectOption('3');
    await page.locator('[data-state="duration"]').selectOption('Combate');
    await page.waitForSelector('select[data-state="cadence"]');
    await page.locator('select[data-state="cadence"]').selectOption('Recarga');
    await page.waitForTimeout(300);

    const budgetText = (await page.locator('.studio-budget strong').textContent()) || '';
    assert(budgetText.includes('/ 22'), `A Cadência Recarga não ampliou o orçamento do Rank II para 22. Encontrado: ${budgetText}`);
    assert(await page.locator('.cadence-choice-guide').count() === 1, 'A explicação da compensação de Cadência não apareceu.');
    mark('Cadência Recarga concedeu compensação real de orçamento.');

    await page.locator('[data-next-step]').click();
    await page.waitForSelector('.def-creation-builder');
    await page.waitForSelector('.complex-builder');
    await page.waitForSelector('.writing-workshop--lean');
    mark('Construtores avançados e Oficina enxuta carregados.');

    assert(await page.locator('[data-writing-path="opposition"]').count() === 0, 'A pergunta global de oposição ainda aparece.');
    assert(await page.locator('[data-writing-path="counterplay"]').count() === 0, 'A pergunta global de contrajogo ainda aparece.');
    assert(await page.locator('[data-writing-path="endRule"]').count() === 0, 'A pergunta redundante de encerramento ainda aparece.');
    assert(await page.locator('[data-state="resistance"]:visible').count() === 0, 'O campo de resistência ainda é exigido do jogador.');

    await page.locator('[data-add-ability]').click();
    assert(await page.locator('.def-ability').count() === 2, 'A Criação não aceita várias capacidades.');

    await page.locator('[data-propagation-toggle]').check();
    await page.locator('[data-complex-path="propagation.form"]').selectOption('reproduction');
    await page.locator('[data-complex-path="propagation.steps"]').selectOption('2');
    await page.locator('[data-complex-path="propagation.source"]').fill('Uma serpente já existente.');
    await page.locator('[data-complex-path="propagation.destination"]').fill('Uma criatura viva tocada.');
    mark('Criação com duas capacidades e Propagação configuradas.');

    const answers = {
      appearance: 'Fios rubros formam uma serpente translúcida ao redor do aliado escolhido.',
      application: 'O usuário escolhe um ponto livre a até 15 metros, onde a serpente se manifesta.',
      result: 'A serpente surge com Resistência igual à Potência 12 e pode utilizar as capacidades registradas.',
      continuity: 'Durante o Combate, a serpente permanece ativa e utiliza suas capacidades nas oportunidades compradas.',
      creationProfile: 'Uma serpente de sangue ocupa um espaço comum, possui Resistência 12 e apenas uma manifestação permanece ativa.',
      creationCapabilities: 'Possui Movimento, comunicação recebida e as duas capacidades registradas no Projeto da Criação.',
      propagationPath: 'Cada Passo parte da serpente ou de uma criatura já vinculada e alcança outra criatura viva tocada.',
      propagationResources: 'Todos os vínculos compartilham a mesma Duração e os Passos disponíveis.'
    };

    for (const [id, value] of Object.entries(answers)) {
      await page.locator(`[data-lean-writing="${id}"]`).fill(value);
    }
    mark('Perguntas essenciais da Oficina preenchidas.');

    await page.locator('[data-lean-build]').click();
    const effect = await page.locator('[data-state="effect"]').inputValue();
    assert(effect.includes('ponto livre a até 15 metros'), 'A oficina não montou a aplicação principal.');
    assert(effect.includes('Propagar ou reproduzir'), 'A oficina não incorporou os detalhes da Propagação.');
    const qualityText = (await page.locator('.lean-quality strong').first().textContent()) || '';
    assert(/\d+ de \d+/.test(qualityText), `O indicador enxuto não mostrou detalhes concluídos. Encontrado: ${qualityText}`);
    mark('Funcionamento técnico gerado sem campos defensivos.');

    assert(Number(await page.locator('[data-state="extraCost"]').inputValue()) > 0, 'Custos avançados não foram incorporados.');
    await page.locator('[data-next-step]').click();

    await page.waitForSelector('#studio-export-text');
    await page.waitForSelector('.whatsapp-export--lean');
    await page.waitForTimeout(700);
    const exported = await page.locator('#studio-export-text').inputValue();
    for (const section of ['HERANÇA DA VERTENTE', 'PROJETO DA CRIAÇÃO', 'ARQUITETURA DO PODER', 'PROPAGAÇÃO', 'APRESENTAÇÃO']) {
      assert(exported.includes(section), `A ficha final não contém ${section}.`);
    }
    for (const removed of ['\nRESISTÊNCIA\n', '\nSUCESSO\n', '\nFALHA\n', '\nLIMITES\n', '\nENCERRAMENTO\n']) {
      assert(!exported.includes(removed), `A ficha ainda exporta a seção redundante ${removed.trim()}.`);
    }
    assert(exported.includes('Cadência: Recarga — +2 pontos de orçamento'), 'A ficha não registrou a compensação da Cadência.');

    const whatsappFull = await page.locator('[data-lean-whatsapp-text]').inputValue();
    assert(whatsappFull.includes('*SERPENTE DA CORRENTE RUBRA*'), 'A versão completa do WhatsApp não estiliza o título.');
    assert(!whatsappFull.includes('✦ *RESISTÊNCIA*'), 'A versão para WhatsApp ainda cria seção obrigatória de resistência.');

    await page.locator('[data-lean-whatsapp-mode="combat"]').click();
    const whatsappCombat = await page.locator('[data-lean-whatsapp-text]').inputValue();
    assert(whatsappCombat.includes('✦ *FUNCIONAMENTO*'), 'O cartão de combate não apresenta o funcionamento.');
    assert(!whatsappCombat.includes('*Resistência:*'), 'O cartão de combate ainda prescreve a resistência do oponente.');
    assert(whatsappCombat.length < whatsappFull.length, 'O cartão de combate não ficou mais compacto que a ficha completa.');
    mark('Exportação para WhatsApp validada sem contrajogo predeterminado.');

    const layout = await page.evaluate(() => ({
      width: innerWidth,
      scrollWidth: Math.max(document.documentElement.scrollWidth, document.body.scrollWidth),
      desktop: document.querySelector('.miracle-studio')?.dataset.desktopLayout
    }));
    assert(layout.scrollWidth <= layout.width + 2, 'Existe rolagem horizontal no desktop.');
    assert(layout.desktop === 'true', 'O layout dedicado ao desktop não foi ativado.');
    assert(errors.length === 0, `Erros JavaScript no desktop: ${errors.join(' | ')}`);
    await page.screenshot({ path: path.join(outputDir, 'estudio-cadencia-redacao-enxuta.png'), fullPage: true });
  } finally {
    await context.close();
  }
}

async function cadenceReferenceTest() {
  const context = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const page = await context.newPage();
  await page.goto(`${baseUrl}/sistemas/fundamentos-dos-milagres.html`, { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('.cadence-rule-grid');
  assert(await page.locator('.cadence-rule-grid article').count() === 4, 'A página canônica não apresenta as quatro Cadências reformuladas.');
  const text = await page.locator('#cadencia').locator('..').textContent();
  assert(text?.includes('+6 pontos'), 'A referência canônica não explica a compensação do Ritual.');
  await context.close();
  mark('Página canônica da Cadência reformulada validada.');
}

async function mobileTest() {
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    hasTouch: true,
    isMobile: true,
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_5 like Mac OS X) AppleWebKit/605.1.15 Mobile/15E148 Safari/604.1'
  });
  const page = await context.newPage();
  const errors = [];
  page.on('pageerror', (error) => errors.push(String(error)));

  try {
    await page.goto(`${baseUrl}/sistemas/construcao-guiada.html`, { waitUntil: 'domcontentloaded' });
    await page.waitForSelector('.miracle-studio');
    await page.waitForTimeout(500);
    const layout = await page.evaluate(() => ({
      width: innerWidth,
      scrollWidth: Math.max(document.documentElement.scrollWidth, document.body.scrollWidth),
      mode: document.documentElement.dataset.uiMode,
      desktop: document.querySelector('.miracle-studio')?.dataset.desktopLayout
    }));
    assert(layout.scrollWidth <= layout.width + 2, 'Existe rolagem horizontal no celular.');
    assert(layout.mode === 'compact' && layout.desktop !== 'true', 'O celular recebeu o layout de computador.');
    assert(await page.locator('.def-option-guide').count() >= 2, 'As explicações não aparecem no celular.');
    assert(errors.length === 0, `Erros JavaScript no celular: ${errors.join(' | ')}`);
    mark('Layout compacto validado no celular.');
  } finally {
    await context.close();
  }
}

try { await desktopTest(); }
catch (error) { failures.push(`Exceção no teste de desktop: ${error?.stack || error}`); }

try { await cadenceReferenceTest(); }
catch (error) { failures.push(`Exceção na referência de Cadência: ${error?.stack || error}`); }

try { await mobileTest(); }
catch (error) { failures.push(`Exceção no teste de celular: ${error?.stack || error}`); }

await browser.close();

const report = [
  '# Diagnóstico do Estúdio',
  '',
  '## Checkpoints',
  ...(checkpoints.length ? checkpoints.map((item) => `- ${item}`) : ['- Nenhum checkpoint alcançado.']),
  '',
  '## Falhas',
  ...(failures.length ? failures.map((item) => `- ${item}`) : ['- Nenhuma falha.'])
].join('\n');
await fs.writeFile(path.join(outputDir, 'estudio-diagnostico.md'), report, 'utf8');

if (failures.length) {
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exitCode = 1;
} else {
  console.log('Cadência reformulada, Oficina enxuta e WhatsApp validados em desktop e celular.');
}
