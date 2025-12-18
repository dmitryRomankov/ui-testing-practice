import { test } from './fixtures/toolTipsFixtures.js';
import { expect } from '@playwright/test';

test.describe('Tool Tips Page Tests @toolTips', () => {
  test('Check tooltip on hover button @positive', async ({ toolTipsPage, page }, testInfo) => {
    // Skip in Firefox due to tooltip rendering differences
    if (testInfo.project.name === 'firefox') {
      test.skip();
    }
    await test.step('Hover over button', async () => {
      await toolTipsPage.hoverOverButton();
      await page.waitForTimeout(500);
    });

    await test.step('Verify tooltip text', async () => {
      const tooltipText = await toolTipsPage.getTooltipText();
      expect(tooltipText).toBe('You hovered over the Button');
    });
  });

  test('Check tooltip on hover text field @positive', async ({ toolTipsPage, page }, testInfo) => {
    if (testInfo.project.name === 'firefox') {
      test.skip();
    }
    await test.step('Hover over text field', async () => {
      await toolTipsPage.hoverOverTextField();
      await page.waitForTimeout(500);
    });

    await test.step('Verify tooltip text', async () => {
      const tooltipText = await toolTipsPage.getTooltipText();
      expect(tooltipText).toBe('You hovered over the text field');
    });
  });

  test('Check tooltip on Contrary link @positive', async ({ toolTipsPage, page }, testInfo) => {
    if (testInfo.project.name === 'firefox') {
      test.skip();
    }

    await test.step('Hover over Contrary link', async () => {
      await toolTipsPage.hoverOverContraryLink();
      await page.waitForTimeout(500);
    });

    await test.step('Verify tooltip text', async () => {
      const tooltipText = await toolTipsPage.getTooltipText();
      expect(tooltipText).toBe('You hovered over the Contrary');
    });
  });

  test('Check tooltip on 1.10.32 section link @positive', async ({ toolTipsPage, page }, testInfo) => {
    if (testInfo.project.name === 'firefox') {
      test.skip();
    }

    await test.step('Hover over section link', async () => {
      await toolTipsPage.hoverOverSectionLink();
      await page.waitForTimeout(500);
    });

    await test.step('Verify tooltip text', async () => {
      const tooltipText = await toolTipsPage.getTooltipText();
      expect(tooltipText).toBe('You hovered over the 1.10.32');
    });
  });

  test('Check all tooltips sequentially @positive', async ({ toolTipsPage, page }, testInfo) => {
    if (testInfo.project.name === 'firefox') {
      test.skip();
    }
    const tooltipElements = [
      { action: () => toolTipsPage.hoverOverButton(), expectedText: 'You hovered over the Button' },
      { action: () => toolTipsPage.hoverOverTextField(), expectedText: 'You hovered over the text field' },
      { action: () => toolTipsPage.hoverOverContraryLink(), expectedText: 'You hovered over the Contrary' },
      { action: () => toolTipsPage.hoverOverSectionLink(), expectedText: 'You hovered over the 1.10.32' },
    ];

    for (const element of tooltipElements) {
      await test.step(`Check tooltip: ${element.expectedText}`, async () => {
        // Move mouse away first to ensure tooltip is hidden
        await page.mouse.move(0, 0);
        await page.waitForTimeout(800);
        // Now perform the hover action
        await element.action();
        await page.waitForTimeout(400);
        const tooltipText = await toolTipsPage.getTooltipText();
        expect(tooltipText).toBe(element.expectedText);
      });
    }
  });

  test('Negative: Verify tooltip disappears when not hovering @negative', async ({ toolTipsPage, page }, testInfo) => {
    if (testInfo.project.name === 'firefox') {
      test.skip();
    }

    await test.step('Hover over button to show tooltip', async () => {
      await toolTipsPage.hoverOverButton();
      await expect(toolTipsPage.tooltip).toBeVisible();
    });

    await test.step('Move mouse away', async () => {
      await page.mouse.move(0, 0);
      await page.waitForTimeout(1000);
    });

    await test.step('Verify tooltip is no longer visible', async () => {
      await expect(toolTipsPage.tooltip).not.toBeVisible();
    });
  });
});
