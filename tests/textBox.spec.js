import { test } from './fixtures/fillFormFixtures.js';
import { expect } from '@playwright/test';

test('Fill text Box scenario', async ({ textBoxPage, storedUser }) => {
  const { user } = storedUser;
  await test.step('Fill text box', async () => {
    await textBoxPage.fillTextBoxFields(user);
  });

  await test.step('submit form', async () => {
    await textBoxPage.clickSubmitButton();
  });

  await test.step('expected values', async () => {
    await textBoxPage.expectedOutputFieldsValues(user);
  });
});

test('Negative: Invalid email format', async ({ textBoxPage, storedUser }) => {
  const { user } = storedUser;
  user.email = 'invalid-email';
  await test.step('Fill text box with invalid data', async () => {
    await textBoxPage.fillTextBoxFields(user);
  });

  await test.step('submit form', async () => {
    await textBoxPage.clickSubmitButton();
  });

  await test.step('Check email field validation', async () => {
    await textBoxPage.isFieldInvalid(textBoxPage.emailInput);
    await expect(textBoxPage.outputContainer).not.toBeVisible();
  });
});

test('Negative: Empty required fields  @entity_18', async ({ textBoxPage }) => {
  await test.step('submit empty form', async () => {
    await textBoxPage.clickSubmitButton();
  });

  await test.step('Check that output section is not visible', async () => {
    await expect(textBoxPage.outputContainer).not.toBeVisible();
  });
});
