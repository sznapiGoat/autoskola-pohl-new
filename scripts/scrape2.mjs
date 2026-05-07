// Detailed Playwright scraper for autoskola-pohl.cz pricing
import { chromium } from 'playwright';
import { writeFileSync } from 'fs';
import { mkdirSync } from 'fs';

mkdirSync('scripts/screenshots', { recursive: true });

async function scrape() {
  const browser = await chromium.launch({ headless: false, slowMo: 300 });
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    viewport: { width: 1280, height: 900 }
  });
  const page = await context.newPage();

  // ─── DUMP HTML STRUCTURE ────────────────────────────────────────────────────
  console.log('\n=== Loading pricing page ===');
  await page.goto('https://www.autoskola-pohl.cz/cenik.html', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);

  await page.screenshot({ path: 'scripts/screenshots/01-pricing-load.png', fullPage: true });

  // Dump the full HTML to understand structure
  const html = await page.content();
  writeFileSync('scripts/raw-pricing.html', html, 'utf-8');
  console.log('Saved raw HTML to scripts/raw-pricing.html');

  // Find all interactive elements
  console.log('\n=== Finding interactive elements ===');
  const allInteractive = await page.evaluate(() => {
    const results = [];
    // Look for everything that might be clickable and contains text
    const sel = 'button, [onclick], [data-toggle], details, summary, .toggle, .expand, .accordion, [aria-expanded], [role="button"]';
    document.querySelectorAll(sel).forEach(el => {
      results.push({
        tag: el.tagName,
        text: el.textContent.trim().substring(0, 100),
        class: el.className.substring(0, 80),
        id: el.id,
        onclick: el.getAttribute('onclick') || '',
        dataToggle: el.getAttribute('data-toggle') || '',
        ariaExpanded: el.getAttribute('aria-expanded') || '',
      });
    });
    return results;
  });
  console.log('Interactive elements found:', JSON.stringify(allInteractive, null, 2));

  // Find elements with "zobrazit" text
  const zobrazit = await page.$$('text=zobrazit více');
  console.log(`\nFound ${zobrazit.length} "zobrazit více" elements`);

  // Get all group headers
  const skupinaElements = await page.$$('text=SKUPINA');
  console.log(`Found ${skupinaElements.length} SKUPINA elements`);

  // Click all "zobrazit více" / "show more" buttons
  let allPricingData = {};

  // First, click on group name headers
  const groupNames = ['SKUPINA A', 'SKUPINA B', 'SKUPINA C', 'SKUPINA CE', 'SKUPINA D1', 'SKUPINA D', 'SKUPINA T'];

  for (const groupName of groupNames) {
    console.log(`\nTrying to click: ${groupName}`);
    try {
      // Find elements containing this text
      const els = await page.$$(`text="${groupName}"`);
      console.log(`  Found ${els.length} exact matches`);

      if (els.length === 0) {
        // Try partial match
        const partials = await page.$$(`text=${groupName}`);
        console.log(`  Found ${partials.length} partial matches`);
        for (const el of partials) {
          const text = await el.textContent();
          console.log(`    - "${text.trim().substring(0, 60)}"`);
        }
      }

      for (const el of els) {
        const isVisible = await el.isVisible();
        if (isVisible) {
          await el.click();
          await page.waitForTimeout(1500);
          console.log(`  Clicked!`);
        }
      }
    } catch(e) {
      console.log(`  Error: ${e.message}`);
    }
  }

  await page.screenshot({ path: 'scripts/screenshots/02-after-group-clicks.png', fullPage: true });

  // Now click all "zobrazit více" buttons
  const zobrazitBtns = await page.$$('text=zobrazit více');
  console.log(`\nClicking ${zobrazitBtns.length} "zobrazit více" buttons...`);
  for (let i = 0; i < zobrazitBtns.length; i++) {
    try {
      const isVisible = await zobrazitBtns[i].isVisible();
      if (isVisible) {
        await zobrazitBtns[i].click();
        await page.waitForTimeout(1000);
        console.log(`  Clicked button ${i+1}`);
      }
    } catch(e) {
      console.log(`  Button ${i+1} error: ${e.message}`);
    }
  }

  await page.screenshot({ path: 'scripts/screenshots/03-after-all-clicks.png', fullPage: true });

  // Get all text after all clicks
  const finalText = await page.evaluate(() => document.body.innerText);
  console.log('\n=== Final page text ===');
  console.log(finalText);

  // Also check for iframes
  const frames = page.frames();
  console.log(`\nNumber of frames: ${frames.length}`);
  for (const frame of frames) {
    if (frame !== page.mainFrame()) {
      console.log(`Frame URL: ${frame.url()}`);
      const frameText = await frame.evaluate(() => document.body.innerText).catch(() => '');
      if (frameText.trim()) console.log('Frame content:', frameText.substring(0, 500));
    }
  }

  // Look for all price-related patterns
  const pricePattern = await page.$$eval('*', els => {
    return els
      .map(el => ({ text: el.textContent.trim(), tag: el.tagName, class: el.className }))
      .filter(el => el.text.match(/\d+\s*(Kč|kč)/i) || el.text.match(/cen[aí]/i))
      .filter(el => el.text.length < 300)
      .slice(0, 50);
  });
  console.log('\n=== Price-related elements ===');
  pricePattern.forEach(p => console.log(`[${p.tag}] ${p.text.substring(0, 100)}`));

  await browser.close();
}

scrape().catch(err => {
  console.error('Scraping failed:', err);
  process.exit(1);
});
