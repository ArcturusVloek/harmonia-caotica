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
    await page.waitForTimeout(500);
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
    await page.locator('[data-next-step]').click();
    await page.locator('[data-state="potency"]').selectOption('3');
    await page.locator('[data-state="duration"]').selectOption('Combate');
    await page.locator('[data-next-step]').click();

    await page.waitForSelector('.def-creation-builder');
    await page.waitForSelector('.complex-builder');
    await page.waitForSelector('.writing-workshop');
    mark('Construtores avançados e Oficina de Redação carregados.');

    await page.locator('[data-add-ability]').click();
    assert(await page.locator('.def-ability').count() === 2, 'A Criação não aceita várias capacidades.');

    await page.locator('[data-propagation-toggle]').check();
    await page.locator('[data-complex-path="propagation.form"]').selectOption('reproduction');
    await page.locator('[data-complex-path="propagation.steps"]').selectOption('2');
    await page.locator('[data-complex-path="propagation.source"]').fill('Uma serpente já existente.');
    await page.locator('[data-complex-path="propagation.destination"]').fill('Uma criatura viva tocada.');
    mark('Criação com duas capacidades e Propagação configuradas.');

    const writingAnswers = {
      appearance: 'Fios rubros formam uma serpente translúcida ao redor do aliado escolhido.',
      activationProcedure: 'O usuário aponta para um ponto livre e oferece uma gota do próprio sangue.',
      initialApplication: 'A serpente surge em um ponto livre a até 15 metros e permanece nessa posição.',
      opposition: 'A Criação não exige oposição para surgir e pode ser destruída por dano contra sua Resistência.',
      successResult: 'No sucesso, a serpente surge com Resistência igual à Potência principal e suas capacidades ficam disponíveis.',
      failureResult: 'Na falha, a manifestação não surge, mas a ativação e a Cadência são consumidas.',
      counterplay: 'Inimigos podem atacar a Criação, romper sua Âncora ou dissipar a manifestação.',
      endRule: 'Termina ao final do Combate, quando sua Resistência chega a 0 ou quando o usuário a encerra.',
      exclusions: 'Não recebe ações adicionais, capacidades não compradas ou conhecimento automático do usuário.',
      'creation.creationArrival': 'Surge ocupando o ponto escolhido, mas não usa ataque nem Movimento no instante da manifestação.',
      'creation.creationCapability': 'Possui apenas o Movimento, a comunicação e as duas capacidades registradas no Projeto da Criação.',
      'creation.creationDestruction': 'É desfeita quando sua Resistência chega a 0; atingir uma parte do corpo não remove funções automaticamente.'
    };

    for (const [answerPath, value] of Object.entries(writingAnswers)) {
      await page.locator(`[data-writing-path="${answerPath}"]`).fill(value);
    }
    await page.waitForTimeout(300);
    mark('Perguntas obrigatórias da Oficina preenchidas.');

    await page.locator('[data-writing-build="all"]').click();
    assert((await page.locator('[data-state="effect"]').inputValue()).includes('gota do próprio sangue'), 'A oficina não gerou o Efeito mecânico.');
    assert((await page.locator('[data-state="limits"]').inputValue()).includes('ações adicionais'), 'A oficina não gerou os Limites.');
    const qualityText = (await page.locator('.writing-quality strong').first().textContent()) || '';
    assert(qualityText.includes('100'), `A qualidade do detalhamento não alcançou 100%. Valor encontrado: ${qualityText}`);
    mark('Redação técnica gerada e validada.');

    assert(Number(await page.locator('[data-state="extraCost"]').inputValue()) > 0, 'Custos avançados não foram incorporados.');
    await page.locator('[data-next-step]').click();

    await page.waitForSelector('#studio-export-text');
    await page.waitForSelector('.whatsapp-export');
    await page.waitForTimeout(700);
    const exported = await page.locator('#studio-export-text').inputValue();
    for (const section of ['HERANÇA DA VERTENTE', 'PROJETO DA CRIAÇÃO', 'ARQUITETURA DO PODER', 'PROPAGAÇÃO', 'APRESENTAÇÃO']) {
      assert(exported.includes(section), `A ficha final não contém ${section}.`);
    }

    const whatsappFull = await page.locator('[data-whatsapp-text]').inputValue();
    assert(whatsappFull.includes('*SERPENTE DA CORRENTE RUBRA*'), 'A versão completa do WhatsApp não estiliza o título.');
    assert(whatsappFull.includes('✦ *EFEITO*'), 'A versão completa do WhatsApp não estiliza as seções.');

    await page.locator('[data-whatsapp-mode="combat"]').click();
    const whatsappCombat = await page.locator('[data-whatsapp-text]').inputValue();
    assert(whatsappCombat.includes('> *Rank:*'), 'O cartão de combate não possui cabeçalho formatado.');
    assert(whatsappCombat.length < whatsappFull.length, 'O cartão de combate não ficou mais compacto que a ficha completa.');
    mark('Exportação completa e cartão de combate do WhatsApp validados.');

    const layout = await page.evaluate(() => ({
      width: innerWidth,
      scrollWidth: Math.max(document.documentElement.scrollWidth, document.body.scrollWidth),
      desktop: document.querySelector('.miracle-studio')?.dataset.desktopLayout
    }));
    assert(layout.scrollWidth <= layout.width + 2, 'Existe rolagem horizontal no desktop.');
    assert(layout.desktop === 'true', 'O layout dedicado ao desktop não foi ativado.');
    assert(errors.length === 0, `Erros JavaScript no desktop: ${errors.join(' | ')}`);
    await page.screenshot({ path: path.join(outputDir, 'estudio-redacao-whatsapp-desktop.png'), fullPage: true });
  } finally {
    await context.close();
  }
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

try {
  await desktopTest();
} catch (error) {
  failures.push(`Exceção no teste de desktop: ${error?.stack || error}`);
}

try {
  await mobileTest();
} catch (error) {
  failures.push(`Exceção no teste de celular: ${error?.stack || error}`);
}

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
  console.log('Estúdio definitivo, redação guiada e WhatsApp validados em desktop e celular.');
}
