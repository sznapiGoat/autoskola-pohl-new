// Full scraper for autoskola-pohl.cz
import { chromium } from 'playwright';
import { writeFileSync } from 'fs';
import { mkdirSync } from 'fs';

mkdirSync('scripts/screenshots', { recursive: true });

const BASE = 'https://www.autoskola-pohl.cz';

async function getPageContent(page, url, label) {
  console.log(`\n[${label}] Loading: ${url}`);
  try {
    await page.goto(url, { waitUntil: 'networkidle', timeout: 20000 });
    await page.waitForTimeout(1500);

    const html = await page.content();
    const text = await page.evaluate(() => document.body.innerText);
    const title = await page.title();

    // Extract tables
    const tables = await page.$$eval('table', tables =>
      tables.map(table => {
        const rows = Array.from(table.querySelectorAll('tr'));
        return rows.map(row => {
          const cells = Array.from(row.querySelectorAll('td, th'));
          return cells.map(cell => cell.innerText.trim()).filter(t => t);
        }).filter(row => row.length > 0);
      })
    ).catch(() => []);

    // Extract all price-containing text
    const priceEls = await page.$$eval('*', els => {
      const results = [];
      for (const el of els) {
        if (el.children.length > 0) continue; // leaf nodes only
        const txt = el.textContent.trim();
        if (txt.match(/\d+\s*(Kč|kč|,-)/i) || txt.match(/\d+\s*hod/i)) {
          results.push({
            tag: el.tagName,
            class: el.parentElement?.className || '',
            text: txt.substring(0, 200)
          });
        }
      }
      return results;
    }).catch(() => []);

    return { url, label, title, text, tables, priceEls, html };
  } catch(e) {
    console.log(`  Error: ${e.message}`);
    return { url, label, title: '', text: `Error: ${e.message}`, tables: [], priceEls: [] };
  }
}

async function scrape() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
  });
  const page = await context.newPage();

  const pages = [
    { url: `${BASE}/`, label: 'Homepage' },
    { url: `${BASE}/vycvik-zaku`, label: 'Driver License Training' },
    { url: `${BASE}/cenik`, label: 'Pricing Main' },
    { url: `${BASE}/cenik-1`, label: 'Pricing Alt' },
    { url: `${BASE}/cenik#A`, label: 'Pricing Group A' },
    { url: `${BASE}/cenik#B`, label: 'Pricing Group B' },
    { url: `${BASE}/cenik#C`, label: 'Pricing Group C' },
    { url: `${BASE}/cenik#CE`, label: 'Pricing Group CE' },
    { url: `${BASE}/cenik#D1`, label: 'Pricing Group D1' },
    { url: `${BASE}/cenik#D`, label: 'Pricing Group D' },
    { url: `${BASE}/cenik#T`, label: 'Pricing Group T' },
    { url: `${BASE}/vraceni-ridicskeho-prukazu`, label: 'License Return' },
    { url: `${BASE}/kondicni-jizdy`, label: 'Conditioning Rides' },
    { url: `${BASE}/skoleni-ridicu`, label: 'Driver Training' },
    { url: `${BASE}/profesni-skoleni`, label: 'Professional Training' },
    { url: `${BASE}/referentske-skoleni`, label: 'Referee Training' },
    { url: `${BASE}/kontakt`, label: 'Contact' },
    { url: `${BASE}/o-nas`, label: 'About Us' },
  ];

  const results = [];
  const rawHtmls = {};

  for (const pg of pages) {
    const result = await getPageContent(page, pg.url, pg.label);
    results.push(result);
    if (result.html) rawHtmls[pg.label] = result.html;
    // Small screenshot for pricing pages
    if (pg.label.includes('Pricing') || pg.label.includes('Training') || pg.label.includes('License')) {
      await page.screenshot({ path: `scripts/screenshots/${pg.label.replace(/\s+/g, '-')}.png`, fullPage: true });
    }
  }

  // Save all raw HTMLs for debugging
  for (const [label, html] of Object.entries(rawHtmls)) {
    writeFileSync(`scripts/raw-${label.replace(/\s+/g, '-')}.html`, html, 'utf-8');
  }

  // Build the inventory markdown
  let md = `# Autoškola POHL — Site Inventory\n\nScraped: ${new Date().toISOString()}\n\n`;
  md += `---\n\n`;

  for (const r of results) {
    if (!r.text || r.text.startsWith('Error:')) continue;
    md += `## ${r.label}\n\n`;
    md += `**URL:** ${r.url}\n`;
    md += `**Title:** ${r.title}\n\n`;

    // Full text
    md += `### Raw Text\n\n\`\`\`\n${r.text.trim()}\n\`\`\`\n\n`;

    // Tables
    if (r.tables && r.tables.length > 0) {
      md += `### Tables\n\n`;
      r.tables.forEach((table, i) => {
        md += `#### Table ${i+1}\n\n`;
        if (table.length > 0) {
          const header = table[0];
          md += `| ${header.join(' | ')} |\n`;
          md += `| ${header.map(() => '---').join(' | ')} |\n`;
          table.slice(1).forEach(row => {
            md += `| ${row.join(' | ')} |\n`;
          });
        }
        md += '\n';
      });
    }

    // Price elements
    if (r.priceEls && r.priceEls.length > 0) {
      md += `### Price Elements Found\n\n`;
      r.priceEls.forEach(el => {
        md += `- [${el.tag}] \`${el.text}\`\n`;
      });
      md += '\n';
    }

    md += `---\n\n`;
  }

  writeFileSync('old-site-inventory.md', md, 'utf-8');
  console.log(`\n✓ Saved old-site-inventory.md (${md.length} chars)`);

  await browser.close();
}

scrape().catch(err => {
  console.error('Failed:', err);
  process.exit(1);
});
