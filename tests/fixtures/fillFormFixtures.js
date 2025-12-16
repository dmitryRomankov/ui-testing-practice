import { TextBoxPage } from '../../src/pageObjects/index.js';
import { AdBlock } from '../../src/utils/index.js';
import { test as base } from '@playwright/test';
import { DataStorage, UserCreator } from '../../src/helper/index.js';

export const test = base.extend({
  textBoxPage: async ({ page }, use) => {
    await AdBlock.blockAds(page);
    await page.goto('https://demoqa.com/text-box', { waitUntil: 'domcontentloaded' });
    const textBox = new TextBoxPage(page);

    await use(textBox);
  },

  storedUser: async ({}, use, testInfo) => {
    const namespace = `${testInfo.title}-${Date.now()}`;
    const userNumber = 1;
    const user = UserCreator.createUser();

    DataStorage.setNamespace(namespace, userNumber, user);

    await use({ namespace, userNumber, user });
  },
});
