import { SelectMenuPage } from '../../src/pageObjects/index.js';
import { AdBlock } from '../../src/utils/index.js';
import { test as base } from '@playwright/test';

export const test = base.extend({
  selectMenuPage: async ({ page }, use) => {
    await AdBlock.blockAds(page);
    await page.goto('https://demoqa.com/select-menu', { waitUntil: 'domcontentloaded' });
    const selectMenuPage = new SelectMenuPage(page);
    await use(selectMenuPage);
  },
});
