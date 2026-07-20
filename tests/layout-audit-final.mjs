import { chromium, webkit } from 'playwright';
import { promises as fs } from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const baseUrl = process.env.SITE_URL || 'http://127.0.0.1:4173';
const outputDir = path.join(root, 'artifacts', 'layout-audit');
await fs.mkdir(outputDir, { recursive: true });

const directories = ['', 'mundo', 'divindades', 'dominios', 'territorios', 'sistemas'];
const htmlPages = [];
for (const directory of directories) {
  let entries = [];
  try { entries = await fs.readdir(path.join(root, directory), { withFileTypes: true }); }
  catch { continue; }
  for (const entry of entries) {
    if (entry.isFile() && entry.name.endsWith('.html')) htmlPages.push(path.posix.join(directory, entry.name));
  }
}
htmlPages.sort();

const representative = [
  'index.html',
  'mundo/origem.html',
  'divindades/senhor-das-chagas.html',
  'dominios/doencas.html',
  'territorios/ruvia.html',
  'sistemas/index.html',
  'sistemas/construcao-guiada.html',
  'sistemas/fundamentos-dos-milagres.html'
].filter((page) => htmlPages.includes(page));

const profiles = [
  {
    name: 'desktop-chromium', engine: chromium, pages: htmlPages, expected: 'desktop',
    context: { viewport: { width: 1440, height: 900 }, screen: { width: 1440, height: 900 }, hasTouch: false, isMobile: false, userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/142 Safari/537.36' }
  },
  {
    name: 'laptop-chromium', engine: chromium, pages: representative, expected: 'desktop',
    context: { viewport: { width: 1024, height: 768 }, screen: { width: 1024, height: 768 }, hasTouch: false, isMobile: false, userAgent: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 Chrome/142 Safari/537.36' }
  },
  {
    name: 'android-chromium', engine: chromium, pages: htmlPages, expected: 'compact',
    context: { viewport: { width: 412, height: 915 }, screen: { width: 412, height: 915 }, deviceScaleFactor: 2.625, hasTouch: true, isMobile: true, userAgent: 'Mozilla/5.0 (Linux; Android 15; Pixel 9) AppleWebKit/537.36 Chrome/142 Mobile Safari/537.36' }
  },
  {
    name: 'ios-webkit', engine: webkit, pages: htmlPages, expected: 'compact',
    context: { viewport: { width: 390, height: 844 }, screen: { width: 390, height: 844 }, deviceScaleFactor: 3, hasTouch: true, isMobile: true, userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_5 like Mac OS X) AppleWebKit/605.1.15 Version/18.5 Mobile/15E148 Safari/604.1' }
  },
  {
    name: 'ipad-webkit', engine: webkit, pages: representative, expected: 'compact',
    context: { viewport: { width: 1024, height: 1366 }, screen: { width: 1024, height: 1366 }, deviceScaleFactor: 2, hasTouch: true, isMobile: true, userAgent: 'Mozilla/5.0 (iPad; CPU OS 18_5 like Mac OS X) AppleWebKit/605.1.15 Version/18.5 Mobile/15E148 Safari/604.1' }
  }
];

const failures = [];
const results = [];
const safe = (value) => value.replace(/[^a-z0-9]+/gi, '-').replace(/^-|-$/g, '').toLowerCase();

for (const profile of profiles) {
  const browser = await profile.engine.launch({ headless: true });
  const context = await browser.newContext(profile.context);

  for (const relativePath of profile.pages) {
    const page = await context.newPage();
    const errors = [];
    page.on('pageerror', (error) => errors.push(String(error)));

    try {
      const response = await page.goto(`${baseUrl}/${relativePath}`, { waitUntil: 'domcontentloaded', timeout: 30_000 });
      if (!response || response.status() >= 400) throw new Error(`HTTP ${response?.status() ?? 'sem resposta'}`);
      await page.waitForTimeout(500);

      const audit = await page.evaluate(({ expected }) => {
        const root = document.documentElement;
        const body = document.body;
        const viewportWidth = innerWidth;
        const mode = root.dataset.uiMode || (root.classList.contains('ui-desktop') ? 'desktop' : 'compact');
        const problems = [];
        const visible = (element) => {
          const style = getComputedStyle(element);
          const rect = element.getBoundingClientRect();
          return style.display !== 'none' && style.visibility !== 'hidden' && Number(style.opacity || 1) > .01 && rect.width > 0 && rect.height > 0;
        };

        if (mode !== expected) problems.push(`modo incorreto: esperado ${expected}, obtido ${mode}`);
        if (!body.classList.contains(mode === 'desktop' ? 'ui-desktop' : 'ui-compact')) problems.push('modo não sincronizado no body');

        const scrollWidth = Math.max(root.scrollWidth, body.scrollWidth);
        if (scrollWidth > viewportWidth + 2) problems.push(`overflow horizontal: ${scrollWidth - viewportWidth}px`);

        document.querySelectorAll('h1, h2, h3, h4').forEach((heading) => {
          if (!visible(heading)) return;
          const rect = heading.getBoundingClientRect();
          if (rect.left < -2 || rect.right > viewportWidth + 2) problems.push(`título fora da viewport: ${heading.textContent.trim().slice(0, 60)}`);
        });

        document.querySelectorAll('.table-wrap').forEach((wrapper) => {
          if (!visible(wrapper)) return;
          const rect = wrapper.getBoundingClientRect();
          if (rect.left < -2 || rect.right > viewportWidth + 2) problems.push('tabela fora da viewport');
          if (wrapper.scrollWidth > wrapper.clientWidth + 2 && !['auto', 'scroll'].includes(getComputedStyle(wrapper).overflowX)) problems.push('tabela larga sem rolagem');
        });

        const menuButton = document.querySelector('.atlas-menu-toggle');
        const navigation = document.querySelector('.atlas-global-nav, .site-header__nav');
        const indexButton = document.querySelector('.atlas-index-toggle');
        const index = document.querySelector('.content-index');
        const studioPage = body.classList.contains('miracle-studio-page');

        if (mode === 'desktop') {
          if (menuButton && visible(menuButton)) problems.push('botão Menu visível no desktop');
          if (navigation && !visible(navigation)) problems.push('navegação invisível no desktop');
          if (index && !studioPage && !visible(index)) problems.push('sumário invisível no desktop');
        } else {
          if (navigation && visible(navigation)) problems.push('navegação aberta antes do toque');
          if (menuButton && !visible(menuButton)) problems.push('botão Menu invisível');
          if (index && !studioPage && visible(index)) problems.push('sumário aberto antes do toque');
          if (index && indexButton && !studioPage && !visible(indexButton)) problems.push('botão Sumário invisível');
        }

        document.querySelectorAll('.atlas-menu-toggle, .atlas-index-toggle, .header-action, .button, .studio-term, .studio-mobile-summary-toggle').forEach((target) => {
          if (!visible(target)) return;
          const rect = target.getBoundingClientRect();
          if (rect.width < 44 || rect.height < 44) problems.push(`alvo de toque pequeno: ${target.className} (${Math.round(rect.width)}x${Math.round(rect.height)})`);
        });

        if (studioPage) {
          const hero = document.querySelector('.internal-hero');
          if (hero && visible(hero)) problems.push('cabeçalho editorial redundante no Estúdio');
          const studio = document.querySelector('.miracle-studio');
          if (mode === 'desktop' && studio?.dataset.desktopLayout !== 'true') problems.push('layout de três colunas não ativado');
          if (mode === 'compact') {
            const progress = document.querySelector('.studio-progress');
            if (progress && progress.scrollWidth > progress.clientWidth + 2) problems.push('etapas exigem rolagem horizontal');
          }
        }

        return { mode, viewportWidth, scrollWidth, title: document.title, problems };
      }, { expected: profile.expected });

      if (profile.expected === 'compact') {
        const menu = page.locator('.atlas-menu-toggle');
        if (await menu.count() && await menu.isVisible()) {
          await menu.click();
          if (!(await page.locator('body.menu-open').count())) audit.problems.push('Menu não abriu');
          await page.keyboard.press('Escape');
          if (await page.locator('body.menu-open').count()) audit.problems.push('Escape não fechou o Menu');
        }

        const indexButton = page.locator('.atlas-index-toggle');
        if (await indexButton.count() && await indexButton.isVisible()) {
          await indexButton.click();
          if (!(await page.locator('body.index-open').count())) audit.problems.push('Sumário não abriu');
          await page.keyboard.press('Escape');
        }
      }

      if (errors.length) audit.problems.push(...errors.map((error) => `erro JavaScript: ${error}`));
      const record = { profile: profile.name, page: relativePath, ...audit };
      results.push(record);

      if (audit.problems.length) {
        failures.push(record);
        await page.screenshot({
          path: path.join(outputDir, `${safe(profile.name)}--${safe(relativePath)}.png`),
          fullPage: false
        });
      }
    } catch (error) {
      const record = { profile: profile.name, page: relativePath, problems: [`falha ao auditar: ${error instanceof Error ? error.message : String(error)}`] };
      failures.push(record);
      results.push(record);
    } finally {
      await page.close();
    }
  }

  await context.close();
  await browser.close();
}

await fs.writeFile(path.join(outputDir, 'resultado-final.json'), JSON.stringify({ pages: htmlPages.length, profiles: profiles.map((profile) => profile.name), failures, results }, null, 2), 'utf8');
console.log(`Páginas: ${htmlPages.length} | verificações: ${results.length} | falhas: ${failures.length}`);

if (failures.length) {
  failures.slice(0, 40).forEach((failure) => {
    console.error(`\n[${failure.profile}] ${failure.page}`);
    failure.problems.forEach((problem) => console.error(`  - ${problem}`));
  });
  process.exitCode = 1;
}
