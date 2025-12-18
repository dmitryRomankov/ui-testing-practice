import { AlertsPage, MainPage } from '../../src/pageObjects/index.js';
import { AdBlock } from '../../src/utils/index.js';
import { test as base } from '@playwright/test';

export const test = base.extend({
  alertsPage: async ({ page }, use) => {
    await AdBlock.blockAds(page);
    await page.goto('https://demoqa.com', { waitUntil: 'domcontentloaded' });
    const mainPage = new MainPage(page);
    const alertsPage = new AlertsPage(page);

    // Navigate to alerts page
    await mainPage.clickCategoryCard('Alerts, Frame & Windows');
    await mainPage.clickOnElementCardList('Alerts');

    await use(alertsPage);
  },
});
