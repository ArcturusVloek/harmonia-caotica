import { chromium, webkit } from 'playwright';
import { promises as fs } from 'node:fs';
import path from 'node:path';

const baseUrl = process.env.SITE_URL || 'http://127.0.0.1:4173';
const outputDir = path.join(process.cwd(), 'artifacts', 'layout-audit');
await fs.mkdir(outputDir, { recursive: true });

const failures = [];
const assert = (condition, message) => { if (!condition) failures.push(message); };

async function buildUntilResolution(page) {
  await page.locator('[data-state="name"]').fill('Serpente da Corrente Rubra');
  await page.locator('[data-state="idea"]').fill('Cria uma serpente de sangue que protege aliados e reproduz um vínculo vital.');
  await page.locator('[data-next-step]').click();

  await page.locator('[data-state="deity"]').selectOption('Senhora da Aurora');
  await page.locator('[data-state="domain"]').selectOption('Vida');
  await page.locator('[data-state="branch"]').selectOption('Sangue');
  await page.waitForSelector('.def-heritage h3');
  await page.locator('[data-next-step]').click();

  const showAll = page.locator('[data-show-all-functions]');
  if (await showAll.count() && await showAll.isVisible()) await showAll.click();
  await page.locator('[data-function="creation"]').check({ force: true });
  await page.locator('[data-function="propagation"]').check({ force: true });
  await page.locator('[data-next-step]').click();

  await page.locator('[data-state="rank"]').selectOption('II');
  await page.locator('[data-state="potency"]').selectOption('3');
  await page.locator('[data-state="duration"]').selectOption('Combate');
  await page.locator('[data-state="cadence"]').selectOption('Recarga');
  await page.locator('[data-next-step]').click();
  await page.waitForSelector('[data-final-workshop]');
}

async function desktopTest() {
  const context = await chromium.launch({ headless: true }).then((browser) => ({ browser, context: browser.newContext({
    viewport: { width: 1440, height: 900 },
    screen: { width: 1440, height: 900 },
    hasTouch: false,
    isMobile: false,
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/142 Safari/537.36'
  }) }));
  const browserContext = await context.context;
  const page = await browserContext.newPage();
  const errors = [];
  page.on('pageerror', (error) => errors.push(String(error)));

  try {
    await page.goto(`${baseUrl}/sistemas/construcao-guiada.html`, { waitUntil: 'domcontentloaded' });
    await page.evaluate(() => localStorage.clear());
    await page.reload({ waitUntil: 'domcontentloaded' });
    await page.waitForSelector('.miracle-studio');
    await page.waitForTimeout(700);

    assert(await page.locator('body.ui-desktop').count() === 1, 'O modo desktop não foi sincronizado no body.');
    assert(!(await page.locator('.internal-hero').isVisible()), 'O cabeçalho editorial redundante permanece visível no Estúdio.');
    assert(await page.locator('.miracle-studio__layout > .studio-progress').count() === 1, 'As etapas não foram movidas para a coluna esquerda.');

    await buildUntilResolution(page);

    assert(await page.locator('[data-final-workshop]').count() === 1, 'A oficina automática não foi criada.');
    assert(await page.locator('[data-lean-writing]').count() === 0, 'O questionário antigo e repetitivo ainda aparece.');
    assert(await page.locator('[data-final-workshop] textarea').count() === 2, 'A oficina final deve possuir somente apresentação e exceção opcionais.');
    assert(await page.locator('.audit-guide-toggle').count() > 0, 'As explicações profundas não foram recolhidas sob demanda.');
    assert(await page.locator('.def-heritage__details').count() >= 1, 'A Herança não recebeu resumo recolhível.');

    const firstCreationDetails = page.locator('.def-creation-builder > details').first();
    assert(await firstCreationDetails.getAttribute('open') !== null, 'A primeira subetapa da Criação não começa aberta.');
    assert(await page.locator('.def-creation-builder > details[open]').count() === 1, 'O Projeto da Criação abre várias subetapas simultaneamente.');

    await page.locator('[data-propagation-toggle]').check();
    await page.locator('[data-complex-path="propagation.source"]').fill('Uma serpente ou vínculo já ativo.');
    await page.locator('[data-complex-path="propagation.destination"]').fill('Uma criatura viva tocada pela Fonte.');
    await page.locator('[data-final-refresh]').click();

    const preview = await page.locator('[data-final-preview]').textContent();
    assert(preview?.includes('Criação:'), 'A prévia não incorpora o Projeto da Criação.');
    assert(preview?.includes('Propagação:'), 'A prévia não incorpora a Propagação.');
    assert(!/como.*derrot|como.*resist|contrajogo|fraqueza/i.test(preview || ''), 'A prévia prescreve resposta do oponente.');

    await page.locator('[data-final-build]').click();
    const effect = await page.locator('[data-state="effect"]').inputValue();
    assert(effect.includes('Cadência Recarga'), 'O funcionamento não registra a Cadência escolhida.');
    assert(!effect.includes('Resistência:'), 'O funcionamento voltou a criar uma seção defensiva.');

    const budget = (await page.locator('.studio-budget strong').textContent()) || '';
    assert(budget.includes('/ 22'), `A Cadência Recarga não oferece 22 pontos no Rank II: ${budget}`);

    const dimensions = await page.evaluate(() => ({
      width: innerWidth,
      scrollWidth: Math.max(document.documentElement.scrollWidth, document.body.scrollWidth),
      columns: getComputedStyle(document.querySelector('.miracle-studio__layout')).gridTemplateColumns
    }));
    assert(dimensions.scrollWidth <= dimensions.width + 2, 'Existe overflow horizontal no desktop.');
    assert(dimensions.columns.split(' ').length >= 3, `O layout não possui três colunas: ${dimensions.columns}`);
    assert(errors.length === 0, `Erros JavaScript no desktop: ${errors.join(' | ')}`);

    await page.screenshot({ path: path.join(outputDir, 'estudio-final-desktop.png'), fullPage: false });
  } finally {
    await browserContext.close();
    await context.browser.close();
  }
}

async function mobileTest() {
  const browser = await webkit.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    screen: { width: 390, height: 844 },
    deviceScaleFactor: 3,
    hasTouch: true,
    isMobile: true,
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_5 like Mac OS X) AppleWebKit/605.1.15 Version/18.5 Mobile/15E148 Safari/604.1'
  });
  const page = await context.newPage();
  const errors = [];
  page.on('pageerror', (error) => errors.push(String(error)));

  try {
    await page.goto(`${baseUrl}/sistemas/construcao-guiada.html`, { waitUntil: 'domcontentloaded' });
    await page.waitForSelector('.miracle-studio');
    await page.waitForTimeout(700);

    assert(await page.locator('body.ui-compact').count() === 1, 'O modo compacto não foi sincronizado no body.');
    assert(!(await page.locator('.internal-hero').isVisible()), 'O cabeçalho redundante permanece visível no celular.');
    assert(await page.locator('.studio-mobile-summary-toggle').isVisible(), 'O resumo móvel não possui botão de abertura.');

    await page.locator('.studio-mobile-summary-toggle').click();
    assert(await page.locator('body.studio-summary-open').count() === 1, 'A gaveta de resumo não abriu.');
    assert(await page.locator('.studio-summary').isVisible(), 'O resumo não ficou visível na gaveta.');
    await page.locator('.studio-mobile-summary-close').click();

    const progress = await page.locator('.studio-progress').evaluate((element) => ({
      scrollWidth: element.scrollWidth,
      clientWidth: element.clientWidth,
      columns: getComputedStyle(element).gridTemplateColumns
    }));
    assert(progress.scrollWidth <= progress.clientWidth + 2, 'As etapas ainda exigem rolagem horizontal no celular.');
    assert(progress.columns.split(' ').length === 3, `As etapas não foram organizadas em três colunas: ${progress.columns}`);

    const touchTargets = await page.locator('.atlas-menu-toggle, .studio-mobile-summary-toggle').evaluateAll((elements) => elements.map((element) => {
      const rect = element.getBoundingClientRect();
      return { width: rect.width, height: rect.height };
    }));
    assert(touchTargets.every((target) => target.width >= 44 && target.height >= 44), 'Existem alvos principais menores que 44px no celular.');

    const dimensions = await page.evaluate(() => ({
      width: innerWidth,
      scrollWidth: Math.max(document.documentElement.scrollWidth, document.body.scrollWidth)
    }));
    assert(dimensions.scrollWidth <= dimensions.width + 2, 'Existe overflow horizontal no celular.');
    assert(errors.length === 0, `Erros JavaScript no celular: ${errors.join(' | ')}`);

    await page.screenshot({ path: path.join(outputDir, 'estudio-final-mobile.png'), fullPage: false });
  } finally {
    await context.close();
    await browser.close();
  }
}

try { await desktopTest(); }
catch (error) { failures.push(`Exceção no desktop: ${error?.stack || error}`); }
try { await mobileTest(); }
catch (error) { failures.push(`Exceção no celular: ${error?.stack || error}`); }

if (failures.length) {
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exitCode = 1;
} else {
  console.log('Fluxo final do Estúdio validado em desktop e iPhone.');
}
