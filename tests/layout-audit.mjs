import { chromium, webkit } from 'playwright';
import { promises as fs } from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const baseUrl = process.env.SITE_URL || 'http://127.0.0.1:4173';
const outputDir = path.join(root, 'artifacts', 'layout-audit');
await fs.mkdir(outputDir, { recursive: true });

const pageRoots = ['', 'mundo', 'divindades', 'dominios', 'territorios', 'sistemas'];
const htmlPages = [];
for (const directory of pageRoots) {
  const target = path.join(root, directory);
  let entries = [];
  try {
    entries = await fs.readdir(target, { withFileTypes: true });
  } catch {
    continue;
  }
  for (const entry of entries) {
    if (!entry.isFile() || !entry.name.endsWith('.html')) continue;
    htmlPages.push(path.posix.join(directory, entry.name));
  }
}
htmlPages.sort();

const representativePages = [
  'index.html',
  'mundo/origem.html',
  'divindades/senhor-das-chagas.html',
  'dominios/doencas.html',
  'territorios/ruvia.html',
  'territorios/alba.html',
  'sistemas/index.html',
  'sistemas/progressao-e-ranks.html',
  'sistemas/construcao-guiada.html',
  'sistemas/fundamentos-dos-milagres.html',
  'sistemas/criacoes-invocacoes-e-manifestacoes-separadas.html'
].filter((page) => htmlPages.includes(page));

const profiles = [
  {
    name: 'desktop-chromium',
    engine: chromium,
    pages: htmlPages,
    context: {
      viewport: { width: 1440, height: 900 },
      screen: { width: 1440, height: 900 },
      hasTouch: false,
      isMobile: false,
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/142 Safari/537.36'
    },
    expectedMode: 'desktop'
  },
  {
    name: 'laptop-chromium',
    engine: chromium,
    pages: representativePages,
    context: {
      viewport: { width: 1024, height: 768 },
      screen: { width: 1024, height: 768 },
      hasTouch: false,
      isMobile: false,
      userAgent: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 Chrome/142 Safari/537.36'
    },
    expectedMode: 'desktop'
  },
  {
    name: 'android-chromium',
    engine: chromium,
    pages: htmlPages,
    context: {
      viewport: { width: 412, height: 915 },
      screen: { width: 412, height: 915 },
      deviceScaleFactor: 2.625,
      hasTouch: true,
      isMobile: true,
      userAgent: 'Mozilla/5.0 (Linux; Android 15; Pixel 9) AppleWebKit/537.36 Chrome/142 Mobile Safari/537.36'
    },
    expectedMode: 'compact'
  },
  {
    name: 'ios-webkit',
    engine: webkit,
    pages: htmlPages,
    context: {
      viewport: { width: 390, height: 844 },
      screen: { width: 390, height: 844 },
      deviceScaleFactor: 3,
      hasTouch: true,
      isMobile: true,
      userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_5 like Mac OS X) AppleWebKit/605.1.15 Version/18.5 Mobile/15E148 Safari/604.1'
    },
    expectedMode: 'compact'
  },
  {
    name: 'ipad-webkit',
    engine: webkit,
    pages: representativePages,
    context: {
      viewport: { width: 1024, height: 1366 },
      screen: { width: 1024, height: 1366 },
      deviceScaleFactor: 2,
      hasTouch: true,
      isMobile: true,
      userAgent: 'Mozilla/5.0 (iPad; CPU OS 18_5 like Mac OS X) AppleWebKit/605.1.15 Version/18.5 Mobile/15E148 Safari/604.1'
    },
    expectedMode: 'compact'
  }
];

const failures = [];
const results = [];

function safeName(value) {
  return value.replace(/[^a-z0-9]+/gi, '-').replace(/^-|-$/g, '').toLowerCase();
}

for (const profile of profiles) {
  const browser = await profile.engine.launch({ headless: true });
  const context = await browser.newContext(profile.context);

  for (const relativePath of profile.pages) {
    const page = await context.newPage();
    const pageErrors = [];
    page.on('pageerror', (error) => pageErrors.push(String(error)));

    const url = `${baseUrl}/${relativePath}`;
    try {
      const response = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30_000 });
      if (!response || response.status() >= 400) {
        throw new Error(`HTTP ${response?.status() ?? 'sem resposta'}`);
      }

      await page.waitForTimeout(250);
      await page.evaluate(async () => {
        if (!document.fonts?.ready) return;
        await Promise.race([
          document.fonts.ready,
          new Promise((resolve) => setTimeout(resolve, 1500))
        ]);
      });
      await page.waitForTimeout(100);

      const audit = await page.evaluate(({ expectedMode }) => {
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        const root = document.documentElement;
        const body = document.body;
        const mode = root.dataset.uiMode || (root.classList.contains('ui-desktop') ? 'desktop' : 'compact');
        const problems = [];

        const visible = (element) => {
          const style = getComputedStyle(element);
          const rect = element.getBoundingClientRect();
          const intersectsViewport = rect.right > 0
            && rect.left < viewportWidth
            && rect.bottom > 0
            && rect.top < viewportHeight;
          return style.display !== 'none'
            && style.visibility !== 'hidden'
            && Number(style.opacity || 1) > 0.01
            && rect.width > 0
            && rect.height > 0
            && intersectsViewport;
        };

        const rootOverflow = Math.max(root.scrollWidth, body.scrollWidth) - viewportWidth;
        if (rootOverflow > 2) {
          const suspects = [...document.querySelectorAll('body *')]
            .map((element) => ({ element, rect: element.getBoundingClientRect(), style: getComputedStyle(element) }))
            .filter(({ rect, style }) => style.display !== 'none'
              && style.visibility !== 'hidden'
              && rect.width > 0
              && (rect.right > viewportWidth + 2 || rect.left < -2))
            .sort((a, b) => Math.max(b.rect.right - viewportWidth, -b.rect.left) - Math.max(a.rect.right - viewportWidth, -a.rect.left))
            .slice(0, 5)
            .map(({ element, rect }) => {
              const identity = element.id ? `#${element.id}` : [...element.classList].slice(0, 2).map((name) => `.${name}`).join('');
              return `${element.tagName.toLowerCase()}${identity} [${Math.round(rect.left)}, ${Math.round(rect.right)}]`;
            });
          problems.push(`overflow horizontal da página: ${rootOverflow}px${suspects.length ? `; suspeitos: ${suspects.join(', ')}` : ''}`);
        }

        document.querySelectorAll('h1, h2, h3').forEach((heading) => {
          if (!visible(heading)) return;
          const rect = heading.getBoundingClientRect();
          if (rect.right > viewportWidth + 2 || rect.left < -2) {
            problems.push(`título fora da viewport: “${heading.textContent.trim().slice(0, 70)}” [${Math.round(rect.left)}, ${Math.round(rect.right)}]`);
          }
        });

        document.querySelectorAll('.realm-entry').forEach((card) => {
          if (!visible(card)) return;
          const rect = card.getBoundingClientRect();
          const maxHeight = mode === 'desktop' ? 565 : 505;
          if (rect.height > maxHeight + 2) {
            problems.push(`cartão territorial alto demais: ${Math.round(rect.height)}px`);
          }
          if (rect.width > viewportWidth + 2 || rect.left < -2 || rect.right > viewportWidth + 2) {
            problems.push(`cartão territorial fora da viewport: ${Math.round(rect.width)}px`);
          }
        });

        document.querySelectorAll('.deity-entry').forEach((card) => {
          if (!visible(card)) return;
          const rect = card.getBoundingClientRect();
          const maxHeight = mode === 'desktop' ? 625 : 605;
          if (rect.height > maxHeight + 2) {
            problems.push(`cartão de Divindade alto demais: ${Math.round(rect.height)}px`);
          }
        });

        document.querySelectorAll('.table-wrap, .system2-table-wrap').forEach((wrapper) => {
          if (!visible(wrapper)) return;
          const rect = wrapper.getBoundingClientRect();
          if (rect.left < -2 || rect.right > viewportWidth + 2) {
            problems.push(`tabela escapando da viewport: [${Math.round(rect.left)}, ${Math.round(rect.right)}]`);
          }
          const overflowX = getComputedStyle(wrapper).overflowX;
          if (wrapper.scrollWidth > wrapper.clientWidth + 2 && !['auto', 'scroll'].includes(overflowX)) {
            problems.push('tabela larga sem rolagem horizontal');
          }
        });

        const menuButton = document.querySelector('.atlas-menu-toggle');
        const navigation = document.querySelector('.atlas-global-nav, .site-header__nav');
        const indexButton = document.querySelector('.atlas-index-toggle');
        const index = document.querySelector('.content-index');

        if (mode !== expectedMode) {
          problems.push(`modo incorreto: esperado ${expectedMode}, obtido ${mode}`);
        }

        if (mode === 'desktop') {
          if (menuButton && visible(menuButton)) problems.push('botão Menu visível no desktop');
          if (navigation && !visible(navigation)) problems.push('navegação principal invisível no desktop');
          if (index && !visible(index)) problems.push('sumário invisível no desktop');
        } else {
          if (navigation && visible(navigation)) problems.push('navegação aberta antes do toque no modo compacto');
          if (menuButton && !visible(menuButton)) problems.push('botão Menu invisível no modo compacto');
          if (index && visible(index)) problems.push('sumário aberto antes do toque no modo compacto');
          if (index && indexButton && !visible(indexButton)) problems.push('botão Sumário invisível no modo compacto');
        }

        document.querySelectorAll('.atlas-menu-toggle, .atlas-index-toggle, .header-action, .button').forEach((target) => {
          if (!visible(target)) return;
          const rect = target.getBoundingClientRect();
          if (rect.width < 38 || rect.height < 38) {
            problems.push(`alvo de toque pequeno: ${target.className} (${Math.round(rect.width)}x${Math.round(rect.height)})`);
          }
        });

        return {
          mode,
          viewportWidth,
          viewportHeight,
          scrollWidth: Math.max(root.scrollWidth, body.scrollWidth),
          title: document.title,
          problems
        };
      }, { expectedMode: profile.expectedMode });

      if (profile.expectedMode === 'compact') {
        const menuButton = page.locator('.atlas-menu-toggle');
        if (await menuButton.count() && await menuButton.isVisible()) {
          await menuButton.click();
          const opened = await page.evaluate(() => document.body.classList.contains('menu-open'));
          if (!opened) audit.problems.push('o botão Menu não abriu a navegação');
          await page.keyboard.press('Escape');
          const closed = await page.evaluate(() => !document.body.classList.contains('menu-open'));
          if (!closed) audit.problems.push('Escape não fechou a navegação');
        }

        const indexButton = page.locator('.atlas-index-toggle');
        if (await indexButton.count() && await indexButton.isVisible()) {
          await indexButton.click();
          const opened = await page.evaluate(() => document.body.classList.contains('index-open'));
          if (!opened) audit.problems.push('o botão Sumário não abriu o painel');
          await page.keyboard.press('Escape');
        }
      }

      if (pageErrors.length) {
        audit.problems.push(...pageErrors.map((error) => `erro JavaScript: ${error}`));
      }

      const record = { profile: profile.name, page: relativePath, ...audit };
      results.push(record);

      if (audit.problems.length) {
        failures.push(record);
        try {
          const documentHeight = await page.evaluate(() => document.documentElement.scrollHeight);
          await page.screenshot({
            path: path.join(outputDir, `${safeName(profile.name)}--${safeName(relativePath)}.png`),
            fullPage: documentHeight <= 32_000
          });
        } catch (screenshotError) {
          console.warn(`Não foi possível capturar ${profile.name} / ${relativePath}: ${screenshotError instanceof Error ? screenshotError.message : String(screenshotError)}`);
        }
      }
    } catch (error) {
      const record = {
        profile: profile.name,
        page: relativePath,
        problems: [`falha ao carregar ou auditar: ${error instanceof Error ? error.message : String(error)}`]
      };
      failures.push(record);
      results.push(record);
    } finally {
      await page.close();
    }
  }

  await context.close();
  await browser.close();
}

await fs.writeFile(
  path.join(outputDir, 'resultado.json'),
  JSON.stringify({ pages: htmlPages.length, profiles: profiles.map((profile) => profile.name), failures, results }, null, 2),
  'utf8'
);

console.log(`Páginas encontradas: ${htmlPages.length}`);
console.log(`Verificações executadas: ${results.length}`);
console.log(`Falhas: ${failures.length}`);

if (failures.length) {
  for (const failure of failures.slice(0, 30)) {
    console.error(`\n[${failure.profile}] ${failure.page}`);
    for (const problem of failure.problems) console.error(`  - ${problem}`);
  }
  if (failures.length > 30) console.error(`\n... e mais ${failures.length - 30} falhas.`);
  process.exitCode = 1;
}