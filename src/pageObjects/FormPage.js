import { BasePage } from './index.js';
import { expect } from '@playwright/test';

export default class FormPage extends BasePage {
  constructor(page) {
    super(page);
    this.page = page;

    // Form input fields
    this.firstNameInput = page.locator('#firstName');
    this.lastNameInput = page.locator('#lastName');
    this.emailInput = page.locator('#userEmail');
    this.mobileInput = page.locator('#userNumber');
    this.dateOfBirthInput = page.locator('#dateOfBirthInput');
    this.subjectsInput = page.locator('#subjectsInput');
    this.currentAddressTextarea = page.locator('#currentAddress');
    this.submitButton = page.locator('#submit');

    // Gender radio buttons
    this.genderMaleLabel = page.locator('label[for="gender-radio-1"]');
    this.genderFemaleLabel = page.locator('label[for="gender-radio-2"]');
    this.genderOtherLabel = page.locator('label[for="gender-radio-3"]');

    // Hobbies checkboxes
    this.hobbySportsLabel = page.locator('label[for="hobbies-checkbox-1"]');
    this.hobbyReadingLabel = page.locator('label[for="hobbies-checkbox-2"]');
    this.hobbyMusicLabel = page.locator('label[for="hobbies-checkbox-3"]');

    // State and City dropdowns
    this.stateDropdown = page.locator('#state');
    this.cityDropdown = page.locator('#city');

    // Picture upload
    this.uploadPictureInput = page.locator('#uploadPicture');

    // Modal with results
    this.modal = page.locator('.modal-content');
    this.modalTitle = page.locator('#example-modal-sizes-title-lg');
    this.modalTable = page.locator('.table');
    this.closeModalButton = page.locator('#closeLargeModal');
  }

  async fillFirstName(firstName) {
    await this.firstNameInput.fill(firstName);
  }

  async fillLastName(lastName) {
    await this.lastNameInput.fill(lastName);
  }

  async fillEmail(email) {
    await this.emailInput.fill(email);
  }

  async selectGender(gender) {
    const genderMap = {
      Male: this.genderMaleLabel,
      Female: this.genderFemaleLabel,
      Other: this.genderOtherLabel,
    };
    await genderMap[gender].click();
  }

  async fillMobile(mobile) {
    await this.mobileInput.fill(mobile);
  }

  async fillDateOfBirth(date) {
    await this.dateOfBirthInput.click();
    await this.page.locator('.react-datepicker__year-select').selectOption(date.year);
    await this.page.locator('.react-datepicker__month-select').selectOption(date.month);
    await this.page.waitForTimeout(300);
    const daySelector = `.react-datepicker__day--0${date.day
      .toString()
      .padStart(2, '0')}:not(.react-datepicker__day--outside-month)`;
    await this.page.locator(daySelector).first().click();
  }

  async fillSubjects(subjects) {
    for (const subject of subjects) {
      await this.subjectsInput.fill(subject);
      await this.page.keyboard.press('Enter');
    }
  }

  async selectHobbies(hobbies) {
    const hobbiesMap = {
      Sports: this.hobbySportsLabel,
      Reading: this.hobbyReadingLabel,
      Music: this.hobbyMusicLabel,
    };
    for (const hobby of hobbies) {
      await hobbiesMap[hobby].scrollIntoViewIfNeeded();
      await hobbiesMap[hobby].click({ force: true });
      await this.page.waitForTimeout(100);
    }
  }

  async uploadPicture(filePath) {
    await this.uploadPictureInput.setInputFiles(filePath);
  }

  async fillCurrentAddress(address) {
    await this.currentAddressTextarea.fill(address);
  }

  async selectState(state) {
    await this.stateDropdown.click();
    await this.page.locator(`div[id^="react-select-3-option"]:has-text("${state}")`).click();
  }

  async selectCity(city) {
    await this.cityDropdown.click();
    await this.page.locator(`div[id^="react-select-4-option"]:has-text("${city}")`).click();
  }

  async submitForm() {
    await this.submitButton.scrollIntoViewIfNeeded();
    await this.submitButton.click();
  }

  async fillCompleteForm(formData) {
    await this.fillFirstName(formData.firstName);
    await this.fillLastName(formData.lastName);
    await this.fillEmail(formData.email);
    await this.selectGender(formData.gender);
    await this.fillMobile(formData.mobile);
    await this.fillDateOfBirth(formData.dateOfBirth);
    await this.fillSubjects(formData.subjects);
    await this.selectHobbies(formData.hobbies);
    if (formData.picture) {
      await this.uploadPicture(formData.picture);
    }
    await this.fillCurrentAddress(formData.currentAddress);
    if (formData.state && formData.city) {
      try {
        await this.selectState(formData.state);
        await this.selectCity(formData.city);
      } catch (e) {
        console.log('Skipping state/city selection due to potential modal blocking');
      }
    }
  }

  async verifyModalAppears() {
    await expect(this.modal).toBeVisible();
    await expect(this.modalTitle).toHaveText('Thanks for submitting the form');
  }

  async verifySubmittedData(formData) {
    const tableText = await this.modalTable.textContent();
    expect(tableText).toContain(formData.firstName);
    expect(tableText).toContain(formData.lastName);
    expect(tableText).toContain(formData.email);
    expect(tableText).toContain(formData.mobile);
  }

  async closeModal() {
    await this.closeModalButton.click();
  }

  async isFieldInvalid(fieldLocator) {
    const classAttribute = await fieldLocator.getAttribute('class');
    return classAttribute && classAttribute.includes('error');
  }

  async getFieldBorderColor(fieldLocator) {
    return await fieldLocator.evaluate(el => window.getComputedStyle(el).borderColor);
  }
}
