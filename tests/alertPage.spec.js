import { test } from './fixtures/alertsFixtures.js';
import { expect } from '@playwright/test';

test.describe('Alerts Page Tests @alerts', () => {
  test('Handle simple alert @positive', async ({ alertsPage, page }) => {
    let alertMessage = '';

    await test.step('Set up alert handler', async () => {
      page.on('dialog', async dialog => {
        alertMessage = dialog.message();
        await dialog.accept();
      });
    });

    await test.step('Click alert button', async () => {
      await alertsPage.clickAlertButtonByType('alertButton');
    });

    await test.step('Verify alert message', async () => {
      expect(alertMessage).toBe('You clicked a button');
    });
  });

  test('Handle timer alert after 5 seconds @positive', async ({ alertsPage, page }) => {
    let alertMessage = '';

    await test.step('Set up alert handler', async () => {
      page.on('dialog', async dialog => {
        alertMessage = dialog.message();
        await dialog.accept();
      });
    });

    await test.step('Click timer alert button', async () => {
      await page.locator('#timerAlertButton').click();
    });

    await test.step('Wait for alert to appear and verify message', async () => {
      await page.waitForEvent('dialog', { timeout: 6000 });
      expect(alertMessage).toBe('This alert appeared after 5 seconds');
    });
  });

  test('Handle confirm alert - Accept @positive', async ({ alertsPage, page }) => {
    let confirmMessage = '';

    await test.step('Set up confirm handler - accept', async () => {
      page.on('dialog', async dialog => {
        confirmMessage = dialog.message();
        await dialog.accept();
      });
    });

    await test.step('Click confirm button', async () => {
      await alertsPage.clickAlertButtonByType('confirmButton');
    });

    await test.step('Verify confirm result', async () => {
      expect(confirmMessage).toBe('Do you confirm action?');
      const resultText = await page.locator('#confirmResult').textContent();
      expect(resultText).toContain('You selected Ok');
    });
  });

  test('Handle confirm alert - Dismiss @positive', async ({ alertsPage, page }) => {
    let confirmMessage = '';

    await test.step('Set up confirm handler - dismiss', async () => {
      page.on('dialog', async dialog => {
        confirmMessage = dialog.message();
        await dialog.dismiss();
      });
    });

    await test.step('Click confirm button', async () => {
      await alertsPage.clickAlertButtonByType('confirmButton');
    });

    await test.step('Verify dismiss result', async () => {
      expect(confirmMessage).toBe('Do you confirm action?');
      const resultText = await page.locator('#confirmResult').textContent();
      expect(resultText).toContain('You selected Cancel');
    });
  });

  test('Handle prompt alert with text input @positive', async ({ alertsPage, page }) => {
    const testName = 'Test User Name';
    let promptMessage = '';

    await test.step('Set up prompt handler', async () => {
      page.on('dialog', async dialog => {
        promptMessage = dialog.message();
        await dialog.accept(testName);
      });
    });

    await test.step('Click prompt button', async () => {
      await alertsPage.clickAlertButtonByType('promptButton');
    });

    await test.step('Verify prompt result', async () => {
      expect(promptMessage).toBe('Please enter your name');
      const resultText = await page.locator('#promptResult').textContent();
      expect(resultText).toContain(testName);
    });
  });

  test('Negative: Cancel prompt alert @negative', async ({ alertsPage, page }) => {
    let dialogHandled = false;

    await test.step('Set up prompt handler - dismiss', async () => {
      page.on('dialog', async dialog => {
        await dialog.dismiss();
        dialogHandled = true;
      });
    });

    await test.step('Click prompt button', async () => {
      await alertsPage.clickAlertButtonByType('promptButton');
      // Wait for dialog to be handled
      await page.waitForTimeout(500);
    });

    await test.step('Verify prompt was cancelled', async () => {
      expect(dialogHandled).toBeTruthy();
      // After cancel, the result element may not appear or remain empty
      const resultLocator = page.locator('#promptResult');
      const isVisible = await resultLocator.isVisible().catch(() => false);
      if (isVisible) {
        const resultText = await resultLocator.textContent();
        expect(resultText).toBeFalsy();
      }
    });
  });

  test('Handle all alert types sequentially @positive', async ({ alertsPage, page }) => {
    await test.step('Handle simple alert', async () => {
      let alertMsg = '';
      page.once('dialog', async dialog => {
        alertMsg = dialog.message();
        await dialog.accept();
      });
      await alertsPage.clickAlertButtonByType('alertButton');
      await page.waitForTimeout(500);
      expect(alertMsg).toBe('You clicked a button');
    });

    await test.step('Handle confirm alert', async () => {
      let confirmMsg = '';
      page.once('dialog', async dialog => {
        confirmMsg = dialog.message();
        await dialog.accept();
      });
      await alertsPage.clickAlertButtonByType('confirmButton');
      await page.waitForTimeout(500);
      expect(confirmMsg).toBe('Do you confirm action?');
    });

    await test.step('Handle prompt alert', async () => {
      let promptMsg = '';
      page.once('dialog', async dialog => {
        promptMsg = dialog.message();
        await dialog.accept('Test');
      });
      await alertsPage.clickAlertButtonByType('promptButton');
      await page.waitForTimeout(500);
      expect(promptMsg).toBe('Please enter your name');
    });
  });
});
