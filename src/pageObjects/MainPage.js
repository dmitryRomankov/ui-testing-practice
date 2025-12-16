import BasePage from './BasePage.js';

export default class MainPage extends BasePage {
  constructor(page) {
    super(page);
    this.headerLocator = page.locator('header');
    this.categoryCardLocator = cardName =>
      page.locator(`//div[contains(@class, "card")]//*[contains(text(), "${cardName}")]`);
    this.listElement = element => page.locator(`//span[contains(text(), "${element}")]`);
    this.expandedGroupLocator = group =>
      page.locator(`//div[contains(text(), "${group}")]/following::div[contains(@class, "element-list")][1]`);
    this.groupHeaderLocator = group =>
      page.locator(`//div[contains(@class, 'header-text') and contains(text(), "${group}")]`);
    this.groupElementLocator = group => page.locator(`//span[contains(text(), "${group}")]`);
    this.multiselectField = page.locator('#autoCompleteMultipleContainer input');
    this.optionInList = option =>
      page.locator(`//div[contains(text(), "${option}") and contains(@class, "auto-complete__option")]`);
    this.cardPngLocator = avatar =>
      page.locator(`//div[contains(@class, "card")]//*[contains(text(),
     "${avatar}")]/preceding::div[contains(@class, "avatar")][1]`);
  }

  async checkCategoryCard(cardName) {
    const card = this.categoryCardLocator(cardName);
    await this.waitForElementVisible(card);
    await this.isElementVisible(card);
  }

  async clickCategoryCard(category) {
    const card = this.categoryCardLocator(category);
    await card.waitFor({ state: 'visible' });
    await card.click();
  }

  async clickOnElementCardList(element) {
    const elementInList = this.listElement(element);
    await elementInList.waitFor({ state: 'visible' });
    await elementInList.click();
  }

  async clickGroupHeader(groupName) {
    const groupHeader = this.groupHeaderLocator(groupName);
    await groupHeader.waitFor({ state: 'visible' });
    await groupHeader.click();
  }

  async clickGroupElement(elementName) {
    const groupElementLocator = this.groupElementLocator(elementName);
    await groupElementLocator.waitFor({ state: 'visible' });
    await groupElementLocator.click();
  }

  async checkSectionIsExpanded(element) {
    await this.page.waitForTimeout(500);
    const classAttribute = await this.expandedGroupLocator(element).getAttribute('class');
    if (classAttribute.includes('collapse') && classAttribute.includes('show')) {
      console.log('Section is expanded');
      return true;
    } else {
      console.log('Section is not expanded');
      return false;
    }
  }

  async selectMultipleColor(options) {
    await this.multiselectField.click();
    await this.multiselectField.fill(options);
    await this.optionInList(options).waitFor({ state: 'visible' });
    await this.optionInList(options).click();
  }

  async checkMultipleColorValue(expectedValue) {
    return this.multiselectField.inputValue().then(value => value.includes(expectedValue));
  }
}
