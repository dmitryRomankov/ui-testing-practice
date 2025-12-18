import { test } from './fixtures/selectMenuFixtures.js';
import { expect } from '@playwright/test';

test.describe('Select Menu Page Tests @selectMenu', () => {
  test('Select all dropdown values as per requirements @positive', async ({ selectMenuPage }) => {
    await test.step('Select Value - Group 2, option 1', async () => {
      await selectMenuPage.selectValue('Group 2, option 1');
      await selectMenuPage.verifySelectValue('Group 2, option 1');
    });

    await test.step('Select One - Other', async () => {
      await selectMenuPage.selectOne('Other');
      await selectMenuPage.verifySelectOne('Other');
    });

    await test.step('Old Style Select Menu - Green', async () => {
      await selectMenuPage.selectOldStyleMenu('Green');

      const selectedValue = await selectMenuPage.getSelectedOldStyleValue();
      expect(selectedValue).toBeTruthy();
    });

    await test.step('Multiselect drop down - Black, Blue', async () => {
      await selectMenuPage.selectMultipleValues(['Black', 'Blue']);
      await selectMenuPage.verifyMultiselectValues(['Black', 'Blue']);
    });
  });

  test('Test Select Value dropdown with different options @parameterized', async ({ selectMenuPage }) => {
    await test.step('Select Group 1, option 1', async () => {
      await selectMenuPage.selectValue('Group 1, option 1');
      await selectMenuPage.verifySelectValue('Group 1, option 1');
    });
  });

  test('Test Select One dropdown with different options @parameterized', async ({ selectMenuPage }) => {
    await test.step('Select Dr.', async () => {
      await selectMenuPage.selectOne('Dr.');
      await selectMenuPage.verifySelectOne('Dr.');
    });
  });

  test('Test Old Style Select with all colors @parameterized', async ({ selectMenuPage }) => {
    const colors = ['Red', 'Blue', 'Green', 'Yellow'];

    for (const color of colors) {
      await test.step(`Select ${color}`, async () => {
        await selectMenuPage.selectOldStyleMenu(color);

        const selectedValue = await selectMenuPage.getSelectedOldStyleValue();
        expect(selectedValue).toBeTruthy();
      });
    }
  });

  test('Test multiselect with various combinations @parameterized', async ({ selectMenuPage }) => {
    await test.step('Select Green, Red, Blue', async () => {
      await selectMenuPage.selectMultipleValues(['Green', 'Red', 'Blue']);
      await selectMenuPage.verifyMultiselectValues(['Green', 'Red', 'Blue']);
    });
  });

  test('Negative: Verify dropdown requires selection @negative', async ({ selectMenuPage }) => {
    await test.step('Check default state of Select Value', async () => {
      const text = await selectMenuPage.selectValueContainer.textContent();
      expect(text).toContain('Select');
    });
  });

  test('Negative: Verify old style select default value @negative', async ({ selectMenuPage }) => {
    await test.step('Check default value', async () => {
      const defaultValue = await selectMenuPage.getSelectedOldStyleValue();
      expect(defaultValue).toBeTruthy();
    });
  });
});
