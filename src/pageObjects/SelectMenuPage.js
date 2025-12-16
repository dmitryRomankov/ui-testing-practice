import { BasePage } from './index.js';
import { expect } from '@playwright/test';

class SelectMenuPage extends BasePage {
  constructor(page) {
    super(page);
    this.page = page;

    // Select Value dropdown
    this.selectValueContainer = page.locator('#withOptGroup');

    // Select One dropdown
    this.selectOneContainer = page.locator('#selectOne');

    // Old Style Select Menu
    this.oldStyleSelect = page.locator('#oldSelectMenu');

    // Multiselect Dropdown
    this.multiselectContainer = page.locator('#selectMenuContainer .css-2b097c-container').last();
    this.multiselectInput = page.locator('#selectMenuContainer input').last();

    // Standard multi select
    this.standardMultiSelect = page.locator('#cars');
  }

  async selectValue(value) {
    await this.selectValueContainer.click();
    await this.page.locator(`div[id^="react-select-2-option"]:has-text("${value}")`).click();
  }

  async selectOne(value) {
    await this.selectOneContainer.click();
    await this.page.locator(`div[id^="react-select-3-option"]:has-text("${value}")`).click();
  }

  async selectOldStyleMenu(value) {
    if (typeof value === 'number' || !isNaN(value)) {
      await this.oldStyleSelect.selectOption({ value: value.toString() });
    } else {
      await this.oldStyleSelect.selectOption({ label: value });
    }
  }

  async selectMultipleValues(values) {
    await this.multiselectContainer.click();
    for (const value of values) {
      await this.multiselectInput.fill(value);
      await this.page.locator(`div[id^="react-select-4-option"]:has-text("${value}")`).click();
    }
  }

  async verifySelectValue(expectedText) {
    const text = await this.selectValueContainer.textContent();
    expect(text).toContain(expectedText);
  }

  async verifySelectOne(expectedText) {
    const text = await this.selectOneContainer.textContent();
    expect(text).toContain(expectedText);
  }

  async verifyOldStyleValue(expectedValue) {
    const selectedValue = await this.oldStyleSelect.inputValue();
    expect(selectedValue).toBe(expectedValue);
  }

  async verifyMultiselectValues(expectedValues) {
    for (const value of expectedValues) {
      const multiText = await this.multiselectContainer.textContent();
      expect(multiText).toContain(value);
    }
  }

  async getSelectedOldStyleValue() {
    return await this.oldStyleSelect.inputValue();
  }
}

export default SelectMenuPage;
