import { test } from './fixtures/formFixtures.js';
import { expect } from '@playwright/test';
import { UserCreator } from '../src/helper/index.js';

test.describe('Form Page Tests @formPage', () => {
  test('Fill automation practice form with valid data @positive', async ({ formPage, formData, page }) => {
    await test.step('Fill required form fields', async () => {
      await formPage.fillFirstName(formData.firstName);
      await formPage.fillLastName(formData.lastName);
      await formPage.fillEmail(formData.email);
      await formPage.selectGender(formData.gender);
      await formPage.fillMobile(formData.mobile);
    });

    await test.step('Submit form', async () => {
      await formPage.submitForm();
      await page.waitForTimeout(1000);
    });

    await test.step('Verify modal appears with success message', async () => {
      await expect(formPage.modal).toBeVisible();
      await expect(formPage.modalTitle).toHaveText('Thanks for submitting the form');
    });

    await test.step('Verify submitted data contains entered values', async () => {
      const tableText = await formPage.modalTable.textContent();
      expect(tableText).toContain(formData.firstName);
      expect(tableText).toContain(formData.lastName);
    });

    await test.step('Close modal', async () => {
      await formPage.closeModal();
    });
  });

  test('Negative: Submit form with invalid email @negative', async ({ formPage, formData }) => {
    formData.email = UserCreator.generateInvalidEmail();

    await test.step('Fill form with invalid email', async () => {
      await formPage.fillFirstName(formData.firstName);
      await formPage.fillLastName(formData.lastName);
      await formPage.fillEmail(formData.email);
      await formPage.selectGender(formData.gender);
      await formPage.fillMobile(formData.mobile);
    });

    await test.step('Submit form', async () => {
      await formPage.submitForm();
      await formPage.page.waitForTimeout(1000);
    });

    await test.step('Verify modal does not appear (form validation failed)', async () => {
      await expect(formPage.modal).not.toBeVisible({ timeout: 3000 });
    });
  });

  test('Negative: Submit form with invalid mobile number @negative', async ({ formPage, formData }) => {
    formData.mobile = UserCreator.generateInvalidMobile();

    await test.step('Fill form with invalid mobile', async () => {
      await formPage.fillFirstName(formData.firstName);
      await formPage.fillLastName(formData.lastName);
      await formPage.fillEmail(formData.email);
      await formPage.selectGender(formData.gender);
      await formPage.fillMobile(formData.mobile);
    });

    await test.step('Submit form', async () => {
      await formPage.submitForm();
      await formPage.page.waitForTimeout(1000);
    });

    await test.step('Verify modal does not appear (form validation failed)', async () => {
      await expect(formPage.modal).not.toBeVisible({ timeout: 3000 });
    });
  });

  test('Negative: Submit form with empty required fields @negative', async ({ formPage }) => {
    await test.step('Try to submit empty form', async () => {
      await formPage.submitForm();
      await formPage.page.waitForTimeout(1000);
    });

    await test.step('Verify modal does not appear (required fields empty)', async () => {
      await expect(formPage.modal).not.toBeVisible({ timeout: 3000 });
    });
  });

  test('Fill form with multiple data sets - Dataset 1 @parameterized', async ({ formPage, page }) => {
    const formData = UserCreator.createFormData();

    await formPage.fillFirstName(formData.firstName);
    await formPage.fillLastName(formData.lastName);
    await formPage.fillEmail(formData.email);
    await formPage.selectGender(formData.gender);
    await formPage.fillMobile(formData.mobile);
    await formPage.submitForm();
    await page.waitForTimeout(1000);

    const modalVisible = await formPage.modal.isVisible().catch(() => false);
    expect(modalVisible).toBeTruthy();
  });

  test('Fill form with multiple data sets - Dataset 2 @parameterized', async ({ formPage, page }) => {
    const formData = UserCreator.createFormData();

    await formPage.fillFirstName(formData.firstName);
    await formPage.fillLastName(formData.lastName);
    await formPage.fillEmail(formData.email);
    await formPage.selectGender(formData.gender);
    await formPage.fillMobile(formData.mobile);
    await formPage.submitForm();
    await page.waitForTimeout(1000);

    const modalVisible = await formPage.modal.isVisible().catch(() => false);
    expect(modalVisible).toBeTruthy();
  });
});
