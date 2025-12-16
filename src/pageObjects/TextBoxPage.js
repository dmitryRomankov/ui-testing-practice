import { BasePage } from './index.js';
import { expect } from '@playwright/test';

export default class TextBoxPage extends BasePage {
  constructor(page) {
    super(page);
    this.fullNameInput = page.locator('#userName');
    this.emailInput = page.locator('#userEmail');
    this.currentAddressTextarea = page.locator('#currentAddress');
    this.permanentAddressTextarea = page.locator('#permanentAddress');
    this.submitButton = page.locator('//button[@id="submit"]');

    this.outputContainer = page.locator('#output');
    this.outputName = page.locator('#output #name');
    this.outputEmail = page.locator('#output #email');
    this.outputCurrentAddress = page.locator('#output #currentAddress');
    this.outputPermanentAddress = page.locator('#output #permanentAddress');
  }

  async fillTextBoxFields(user) {
    await this.fullNameInput.fill(user.fullName);
    await this.emailInput.fill(user.email);
    await this.currentAddressTextarea.fill(user.address);
    await this.permanentAddressTextarea.fill(user.addressAnother);
  }

  async clickSubmitButton() {
    const button = this.submitButton;
    await button.waitFor({ state: 'visible' });
    await button.click();
  }

  async expectedOutputFieldsValues(user) {
    await expect(this.outputContainer).toBeVisible();
    await expect(this.outputName).toContainText(user.fullName);
    await expect(this.outputEmail).toContainText(user.email);
    await expect(this.outputCurrentAddress).toContainText(user.address);
    await expect(this.outputPermanentAddress).toContainText(user.addressAnother);
  }

  async isFieldInvalid(fieldLocator) {
    return await fieldLocator.getAttribute('class').then(classes => classes.includes('field-error'));
  }
}
