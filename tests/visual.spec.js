import { test, expect } from '@playwright/test';
import fs from 'fs';
import { PNG } from 'pngjs';
import pixelmatch from 'pixelmatch';
import { MainPage } from '../src/pageObjects/index.js';
import { AdBlock } from '../src/utils/index.js';

test.beforeEach(async ({ page }) => {
  await AdBlock.blockAds(page);
  await page.goto('https://demoqa.com', { waitUntil: 'domcontentloaded' });
});
test.describe('Visual testing', () => {
  test('Take a screenshots', async ({ page }) => {
    const mainPage = new MainPage(page);

    await test.step('Visual regression test for Element card', async () => {
      const elementCard = mainPage.cardPngLocator('Elements');
      const screenshot = await elementCard.screenshot();

      const baselineImage = PNG.sync.read(fs.readFileSync('visual/screenshots/baseline/elements-card.png'));
      const currentImage = PNG.sync.read(screenshot);
      const { width, height } = baselineImage;
      console.log('width, height' + width, height);

      const differ = new PNG({ width, height });
      const mismatchedPixels = pixelmatch(baselineImage.data, currentImage.data, differ.data, width, height, {
        threshold: 0.1,
      });

      expect(mismatchedPixels).toBe(0);
      console.log(`Mismatched pixels: ${mismatchedPixels}`);
    });
  });
});
