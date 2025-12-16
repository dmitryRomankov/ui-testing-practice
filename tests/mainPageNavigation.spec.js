import { expect, test } from '@playwright/test';
import { AdBlock, Randomizer } from '../src/utils/index.js';
import { MainPage } from '../src/pageObjects/index.js';
import data from '../config/Constants.js';

test.beforeEach(async ({ page }) => {
  await AdBlock.blockAds(page);
  await page.goto('https://demoqa.com', { waitUntil: 'domcontentloaded' });
});

test('Check navigation @entity_18', async ({ page }) => {
  const mainPage = await new MainPage(page);
  const randomColor = Randomizer.randomValueFromArray(data.colors);
  await test.step('Click on "Elements" card', async () => {
    await mainPage.clickCategoryCard('Elements');
  });

  await test.step('Check "Elements" section is expanded', async () => {
    const isExpanded = await mainPage.checkSectionIsExpanded('Elements');
    expect(isExpanded).toBeTruthy();
  });

  await test.step('Close "Elements" Section', async () => {
    await mainPage.clickGroupHeader('Elements');
  });

  await test.step('Check "Elements" section is collapsed', async () => {
    const isExpanded = await mainPage.checkSectionIsExpanded('Elements');
    expect(isExpanded).toBeFalsy();
    const isWidgetsExpanded = await mainPage.checkSectionIsExpanded('Widgets');
    expect(isWidgetsExpanded).toBeFalsy();
  });

  await test.step('Close "Widgets" Section', async () => {
    await mainPage.clickGroupHeader('Widgets');
  });

  await test.step('Check "Widgets" section is expanded', async () => {
    const isExpanded = await mainPage.checkSectionIsExpanded('Widgets');
    expect(isExpanded).toBeTruthy();
  });

  await test.step('Open "Auto Complete" Section', async () => {
    await mainPage.clickGroupElement('Auto Complete');
  });

  await test.step('Fill Multiple colors', async () => {
    await mainPage.selectMultipleColor(randomColor);
  });

  await test.step('Check selected value', async () => {
    await mainPage.checkMultipleColorValue(randomColor);
    console.log(randomColor);
  });
});
