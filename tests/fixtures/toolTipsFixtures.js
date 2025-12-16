import { ToolTipsPage } from '../../src/pageObjects/index.js';
import { AdBlock } from '../../src/utils/index.js';
import { test as base } from '@playwright/test';

export const test = base.extend({
  toolTipsPage: async ({ page }, use) => {
    await AdBlock.blockAds(page);
    await page.goto('https://demoqa.com/tool-tips', { waitUntil: 'domcontentloaded' });
    const toolTipsPage = new ToolTipsPage(page);
    await use(toolTipsPage);
  },
});
