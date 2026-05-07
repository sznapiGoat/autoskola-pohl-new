// Playwright scraper for autoskola-pohl.cz
import { chromium } from 'playwright';
import { writeFileSync } from 'fs';
import { mkdirSync } from 'fs';

async function scrape() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
  });
  const page = await context.newPage();

  let inventory = [];

  // ─── HOMEPAGE ───────────────────────────────────────────────────────────────
  console.log('Scraping homepage...');
  await page.goto('https://www.autoskola-pohl.cz/', { waitUntil: 'networkidle' });
  const homeTitle = await page.title();
  const homeH1 = await page.$eval('h1', el => el.textContent.trim()).catch(() => '');
  const homeMeta = await page.$eval('meta[name="description"]', el => el.content).catch(() => '');
  const homeNav = await page.$$eval('nav a, #menu a, .menu a, header a', links =>
    links.map(l => ({ text: l.textContent.trim(), href: l.href })).filter(l => l.text)
  ).catch(() => []);

  inventory.push(`# Homepage\n\n**Title:** ${homeTitle}\n**H1:** ${homeH1}\n**Meta description:** ${homeMeta}\n\n**Navigation links:**\n${homeNav.map(l => `- [${l.text}](${l.href})`).join('\n')}`);

  // Also grab all visible text sections from homepage
  const homeSections = await page.$$eval('section, .section, article, .block, .content', els =>
    els.map(el => el.innerText.trim()).filter(t => t.length > 20).slice(0, 15)
  ).catch(() => []);
  if (homeSections.length) {
    inventory.push(`\n## Homepage Sections\n\n${homeSections.map((s, i) => `### Section ${i+1}\n${s}`).join('\n\n')}`);
  }

  // ─── PRICING PAGE ───────────────────────────────────────────────────────────
  console.log('Scraping pricing page...');
  await page.goto('https://www.autoskola-pohl.cz/cenik.html', { waitUntil: 'networkidle' });
  const pricingTitle = await page.title();

  // Take a screenshot to see what we're working with
  mkdirSync('scripts/screenshots', { recursive: true });
  await page.screenshot({ path: 'scripts/screenshots/pricing-initial.png', fullPage: true });

  // Get all visible text before clicking
  const initialContent = await page.evaluate(() => document.body.innerText);

  // Find interactive elements - headers, accordion triggers, tabs, etc.
  const clickableHeaders = await page.$$eval(
    'h2, h3, h4, dt, .accordion-header, .tab, [role="tab"], [data-toggle], summary, .collapsible, .group-header, .category, .license-group',
    els => els.map(el => ({
      tag: el.tagName,
      text: el.textContent.trim(),
      classes: el.className,
      id: el.id
    })).filter(el => el.text.length > 0)
  ).catch(() => []);

  console.log('Found clickable headers:', clickableHeaders.map(h => h.text));

  // Specifically look for license group headers (A, B, C, CE, D, etc.)
  const licenseGroups = ['A', 'A1', 'A2', 'AM', 'B', 'B+E', 'BE', 'C', 'C+E', 'CE', 'D', 'D+E', 'DE', 'T'];

  inventory.push(`\n# Pricing Page\n\n**Title:** ${pricingTitle}\n`);

  // Strategy 1: Click on any expandable/accordion elements
  const expandableSelectors = [
    'summary',
    '[data-toggle="collapse"]',
    '.accordion-header',
    '.accordion-button',
    '.collapsible-header',
    'dt',
    '.panel-heading',
    '.card-header',
    'h3 a',
    'h4 a',
  ];

  let clickedSomething = false;
  for (const sel of expandableSelectors) {
    const elements = await page.$$(sel);
    if (elements.length > 0) {
      console.log(`Found ${elements.length} elements matching: ${sel}`);
      for (const el of elements) {
        try {
          const isVisible = await el.isVisible();
          if (isVisible) {
            await el.click({ timeout: 3000 });
            await page.waitForTimeout(500);
            clickedSomething = true;
          }
        } catch (e) {
          // ignore click failures
        }
      }
    }
  }

  // Strategy 2: Look for any element with text matching license group names and click it
  for (const group of licenseGroups) {
    const selectors = [
      `text="${group}"`,
      `*:has-text("Skupina ${group}")`,
      `*:has-text("skupina ${group}")`,
      `*:has-text("Řidičský průkaz ${group}")`,
      `*:has-text("sk. ${group}")`,
    ];
    for (const sel of selectors) {
      try {
        const el = await page.$(sel);
        if (el) {
          const tag = await el.evaluate(e => e.tagName);
          const isVisible = await el.isVisible();
          if (isVisible && ['H2','H3','H4','DT','BUTTON','A','DIV','SUMMARY'].includes(tag)) {
            console.log(`Clicking license group ${group}: ${sel}`);
            await el.click({ timeout: 3000 });
            await page.waitForTimeout(800);
            clickedSomething = true;
          }
        }
      } catch(e) { /* ignore */ }
    }
  }

  if (clickedSomething) {
    await page.screenshot({ path: 'scripts/screenshots/pricing-after-clicks.png', fullPage: true });
  }

  // Now get all text content
  const fullContent = await page.evaluate(() => document.body.innerText);

  // Try to get structured table data
  const tables = await page.$$eval('table', tables =>
    tables.map(table => {
      const rows = Array.from(table.querySelectorAll('tr'));
      return rows.map(row => {
        const cells = Array.from(row.querySelectorAll('td, th'));
        return cells.map(cell => cell.textContent.trim()).filter(t => t);
      }).filter(row => row.length > 0);
    })
  ).catch(() => []);

  if (tables.length > 0) {
    inventory.push(`\n## Pricing Tables (raw)\n\n`);
    tables.forEach((table, i) => {
      inventory.push(`### Table ${i+1}\n`);
      table.forEach(row => {
        inventory.push(`| ${row.join(' | ')} |`);
      });
      inventory.push('');
    });
  }

  // Get definition lists (often used for pricing)
  const dlContent = await page.$$eval('dl', dls =>
    dls.map(dl => {
      const items = [];
      let currentDt = '';
      dl.querySelectorAll('dt, dd').forEach(el => {
        if (el.tagName === 'DT') currentDt = el.textContent.trim();
        else items.push(`${currentDt}: ${el.textContent.trim()}`);
      });
      return items.join('\n');
    })
  ).catch(() => []);

  if (dlContent.length > 0) {
    inventory.push(`\n## Definition Lists\n\n${dlContent.join('\n\n')}`);
  }

  // Get all list items that look like prices
  const listItems = await page.$$eval('li, p', els =>
    els.map(el => el.textContent.trim())
      .filter(t => t.match(/\d+\s*(Kč|kč|,-|CZK)/i) || t.match(/cen[aí]/i) || t.length < 200)
      .filter(t => t.length > 5)
  ).catch(() => []);

  inventory.push(`\n## Raw Page Content\n\n${fullContent}`);

  // ─── OTHER PAGES ─────────────────────────────────────────────────────────────
  const otherPages = [
    { url: 'https://www.autoskola-pohl.cz/o-nas.html', name: 'About Us' },
    { url: 'https://www.autoskola-pohl.cz/kontakt.html', name: 'Contact' },
    { url: 'https://www.autoskola-pohl.cz/kurzy.html', name: 'Courses' },
    { url: 'https://www.autoskola-pohl.cz/novinky.html', name: 'News' },
  ];

  for (const pg of otherPages) {
    try {
      console.log(`Scraping ${pg.name}...`);
      await page.goto(pg.url, { waitUntil: 'networkidle', timeout: 15000 });
      const content = await page.evaluate(() => document.body.innerText).catch(() => '');
      if (content) {
        inventory.push(`\n# ${pg.name}\n\n${content}`);
      }
    } catch(e) {
      console.log(`Failed to scrape ${pg.name}: ${e.message}`);
    }
  }

  await browser.close();

  const output = inventory.join('\n');
  writeFileSync('old-site-inventory.md', output, 'utf-8');
  console.log('\n✓ Saved to old-site-inventory.md');
  console.log(`Total content: ${output.length} characters`);
}

scrape().catch(err => {
  console.error('Scraping failed:', err);
  process.exit(1);
});
