import { chromium } from 'playwright';
import { mkdirSync } from 'fs';

mkdirSync('scripts/screenshots', { recursive: true });

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
await page.screenshot({ path: 'scripts/screenshots/homepage-hero.png', fullPage: false });

// Scroll to pricing and screenshot
await page.evaluate(() => document.querySelector('#cenik')?.scrollIntoView());
await page.waitForTimeout(400);
await page.screenshot({ path: 'scripts/screenshots/homepage-pricing.png', fullPage: false });

// Click a pricing tab
await page.click('button[role="tab"]:nth-child(1)');
await page.waitForTimeout(300);
await page.screenshot({ path: 'scripts/screenshots/homepage-pricing-A.png', fullPage: false });

// Full page
await page.setViewportSize({ width: 1440, height: 900 });
await page.screenshot({ path: 'scripts/screenshots/homepage-full.png', fullPage: true });

await browser.close();
console.log('Screenshots saved to scripts/screenshots/');
