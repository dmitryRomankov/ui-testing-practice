import { FormPage } from '../../src/pageObjects/index.js';
import { AdBlock } from '../../src/utils/index.js';
import { test as base } from '@playwright/test';
import { UserCreator } from '../../src/helper/index.js';

export const test = base.extend({
  formPage: async ({ page }, use) => {
    await AdBlock.blockAds(page);
    await page.goto('https://demoqa.com/automation-practice-form', { waitUntil: 'domcontentloaded' });
    const formPage = new FormPage(page);

    // Close any existing modal before starting test
    const modal = page.locator('.modal.show');
    const modalVisible = await modal.isVisible().catch(() => false);
    if (modalVisible) {
      await page
        .locator('#closeLargeModal')
        .click()
        .catch(() => {});
      await page.waitForTimeout(500);
    }

    await use(formPage);

    // Clean up any modal after test
    const modalAfter = await modal.isVisible().catch(() => false);
    if (modalAfter) {
      await page
        .locator('#closeLargeModal')
        .click()
        .catch(() => {});
    }
  },

  formData: async ({}, use) => {
    const formData = UserCreator.createFormData();
    await use(formData);
  },
});
