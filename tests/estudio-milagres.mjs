import { chromium } from 'playwright';

const baseUrl = process.env.SITE_URL || 'http://127.0.0.1:4173';
const browser = await chromium.launch({ headless: true });
const failures = [];
const assert = (condition, message) => { if (!condition) failures.push(message); };

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

  await page.goto(`${baseUrl}/sistemas/construcao-guiada.html`, { waitUntil: 'domcontentloaded' });
  await page.evaluate(() => localStorage.clear());
  await page.reload({ waitUntil: 'domcontentloaded' });
  await page.waitForSelector('.miracle-studio');
  await page.waitForTimeout(500);

  assert(await page.locator('.def-option-guide').count() >= 2, 'As opções iniciais não possuem explicações.');
  await page.locator('[data-state="name"]').fill('Serpente da Corrente Rubra');
  await page.locator('[data-state="idea"]').fill('Cria uma serpente de sangue capaz de proteger aliados e propagar um vínculo vital.');
  await page.locator('[data-next-step]').click();

  await page.locator('[data-state="deity"]').selectOption('Senhora da Aurora');
  await page.locator('[data-state="domain"]').selectOption('Vida');
  await page.locator('[data-state="branch"]').selectOption('Sangue');
  await page.waitForSelector('.def-heritage h3');
  assert(await page.locator('.def-option-catalog').count() >= 3, 'Não há comparação das opções de origem.');

  await page.locator('[data-next-step]').click();
  await page.locator('[data-function="creation"]').check({ force: true });
  await page.locator('[data-next-step]').click();
  await page.locator('[data-state="potency"]').selectOption('3');
  await page.locator('[data-state="duration"]').selectOption('Combate');
  await page.locator('[data-next-step]').click();

  await page.waitForSelector('.def-creation-builder');
  await page.waitForSelector('.complex-builder');
  await page.locator('[data-add-ability]').click();
  assert(await page.locator('.def-ability').count() === 2, 'A Criação não aceita várias capacidades.');

  await page.locator('[data-propagation-toggle]').check();
  await page.locator('[data-complex-path="propagation.form"]').selectOption('reproduction');
  await page.locator('[data-complex-path="propagation.steps"]').selectOption('2');
  await page.locator('[data-complex-path="propagation.source"]').fill('Uma serpente já existente.');
  await page.locator('[data-complex-path="propagation.destination"]').fill('Uma criatura viva tocada.');

  assert(Number(await page.locator('[data-state="extraCost"]').inputValue()) > 0, 'Custos avançados não foram incorporados.');
  await page.locator('[data-state="effect"]').fill('A serpente surge e utiliza as capacidades registradas em seu Projeto.');
  await page.locator('[data-state="resistance"]').fill('É destruída quando sua Resistência chega a 0.');
  await page.locator('[data-state="success"]').fill('A Criação surge no ponto escolhido.');
  await page.locator('[data-state="failure"]').fill('A manifestação não se estabelece.');
  await page.locator('[data-state="limits"]').fill('Apenas uma manifestação permanece ativa.');
  await page.locator('[data-state="endCondition"]').fill('Termina ao fim do Combate ou quando é destruída.');
  await page.locator('[data-next-step]').click();

  await page.waitForSelector('#studio-export-text');
  await page.waitForTimeout(700);
  const exported = await page.locator('#studio-export-text').inputValue();
  for (const section of ['HERANÇA DA VERTENTE', 'PROJETO DA CRIAÇÃO', 'ARQUITETURA DO PODER', 'PROPAGAÇÃO']) {
    assert(exported.includes(section), `A ficha final não contém ${section}.`);
  }

  const layout = await page.evaluate(() => ({
    width: innerWidth,
    scrollWidth: Math.max(document.documentElement.scrollWidth, document.body.scrollWidth),
    desktop: document.querySelector('.miracle-studio')?.dataset.desktopLayout
  }));
  assert(layout.scrollWidth <= layout.width + 2, 'Existe rolagem horizontal no desktop.');
  assert(layout.desktop === 'true', 'O layout dedicado ao desktop não foi ativado.');
  assert(errors.length === 0, `Erros JavaScript no desktop: ${errors.join(' | ')}`);
  await context.close();
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
  await context.close();
}

await desktopTest();
await mobileTest();
await browser.close();

if (failures.length) {
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exitCode = 1;
} else {
  console.log('Estúdio definitivo validado em desktop e celular.');
}
