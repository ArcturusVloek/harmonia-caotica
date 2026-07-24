import assert from 'node:assert/strict';
import { chromium } from 'playwright';

const baseUrl = process.env.SITE_URL || 'http://127.0.0.1:4173';
const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({ viewport: { width: 1280, height: 800 } });
const page = await context.newPage();
const pageErrors = [];

page.on('pageerror', (error) => pageErrors.push(String(error)));

async function open(relativePath) {
  const response = await page.goto(`${baseUrl}/${relativePath}`, {
    waitUntil: 'domcontentloaded',
    timeout: 30_000
  });
  assert.ok(response, `Sem resposta ao abrir ${relativePath}`);
  assert.ok(response.status() < 400, `${relativePath} respondeu HTTP ${response.status()}`);
  await page.waitForFunction(() => Boolean(window.HarmoniaSistema2));
}

async function text(selector) {
  return (await page.locator(selector).textContent())?.replace(/\s+/g, ' ').trim() || '';
}

try {
  await open('sistemas/progressao-e-ranks.html');

  const progressionCases = [
    { level: 1, pm: '15', spaces: '1', rank: 'Rank I — Desperto', graduation: '5', spacePm: '20' },
    { level: 5, pm: '27', spaces: '2', rank: 'Rank I — Desperto', graduation: '5', spacePm: '20' },
    { level: 10, pm: '42', spaces: '3', rank: 'Rank II — Adepto', graduation: '7', spacePm: '28' },
    { level: 50, pm: '162', spaces: '11', rank: 'Rank VI — Numinoso', graduation: '15', spacePm: '60' },
    { level: 100, pm: '312', spaces: '21', rank: 'Rank XI — Apoteose', graduation: '25', spacePm: '100' }
  ];

  for (const expected of progressionCases) {
    await page.locator('[data-level-input]').fill(String(expected.level));
    assert.equal(await text('[data-total-pm]'), expected.pm, `PM incorretos no Nível ${expected.level}`);
    assert.equal(await text('[data-spaces]'), expected.spaces, `Espaços incorretos no Nível ${expected.level}`);
    assert.equal(await text('[data-rank]'), expected.rank, `Rank incorreto no Nível ${expected.level}`);
    assert.equal(await text('[data-max-graduation]'), expected.graduation, `Graduação incorreta no Nível ${expected.level}`);
    assert.equal(await text('[data-max-space-pm]'), expected.spacePm, `Teto por Espaço incorreto no Nível ${expected.level}`);
  }

  assert.equal(await text('.archive-record__meta span:first-child'), 'Regra aprovada');

  const tableRegions = page.locator('.system2-table-wrap');
  assert.ok(await tableRegions.count() > 0, 'A página de progressão deveria possuir tabela navegável');
  for (let index = 0; index < await tableRegions.count(); index += 1) {
    const region = tableRegions.nth(index);
    assert.equal(await region.getAttribute('role'), 'region');
    assert.equal(await region.getAttribute('tabindex'), '0');
    assert.ok(await region.getAttribute('aria-label'));
  }

  await open('sistemas/construcao-guiada.html');

  const level = page.locator('[data-build-level]');
  const cost = page.locator('[data-build-cost]');
  const graduation = page.locator('[data-build-graduation]');
  const structure = page.locator('[data-build-structure]');
  const validation = page.locator('[data-build-validation]');

  await level.fill('1');
  await cost.fill('20');
  await graduation.fill('5');
  await structure.selectOption('normal');
  assert.equal(await validation.getAttribute('data-state'), 'invalid');
  assert.match(await text('[data-build-validation]'), /15 PM totais/);

  await cost.fill('15');
  assert.equal(await validation.getAttribute('data-state'), 'valid');

  await structure.selectOption('repertorio');
  assert.equal(await validation.getAttribute('data-state'), 'neutral');
  assert.match(await text('[data-build-validation]'), /auditoria/);

  await structure.selectOption('normal');
  await level.fill('18');
  await cost.fill('26');
  await graduation.fill('7');
  assert.equal(await validation.getAttribute('data-state'), 'valid');

  await cost.fill('24');
  await graduation.fill('8');
  assert.equal(await validation.getAttribute('data-state'), 'invalid');
  assert.match(await text('[data-build-validation]'), /Graduação 8 ultrapassa o máximo 7/);
  assert.equal(await graduation.getAttribute('aria-invalid'), 'true');

  assert.equal(await text('.archive-record__meta span:first-child'), 'Conteúdo parcial em teste');

  await open('sistemas/estruturas-de-poder.html');
  assert.equal(await text('.archive-record__meta span:first-child'), 'Auditoria em rascunho');

  await open('sistemas/primeiros-passos.html');
  assert.equal(await text('.archive-record__meta span:first-child'), 'Conteúdo parcial em teste');

  assert.deepEqual(pageErrors, [], `Erros JavaScript encontrados: ${pageErrors.join(' | ')}`);
  console.log('Auditoria funcional do Sistema 2.0 concluída sem falhas.');
} finally {
  await context.close();
  await browser.close();
}