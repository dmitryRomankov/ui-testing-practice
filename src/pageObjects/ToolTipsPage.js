import { BasePage } from './index.js';

export default class ToolTipsPage extends BasePage {
  constructor(page) {
    super(page);
    this.page = page;

    // Elements with tooltips
    this.hoverButton = page.locator('#toolTipButton');
    this.hoverTextField = page.locator('#toolTipTextField');
    this.contraryLink = page.locator('a:has-text("Contrary")');
    this.sectionLink = page.locator('a:has-text("1.10.32")');

    // Tooltip container
    this.tooltip = page.locator('.tooltip-inner');
  }

  async hoverOverButton() {
    await this.hoverButton.hover();
  }

  async hoverOverTextField() {
    await this.hoverTextField.hover();
  }

  async hoverOverContraryLink() {
    await this.contraryLink.hover();
  }

  async hoverOverSectionLink() {
    await this.sectionLink.hover();
  }

  async getTooltipText() {
    await this.tooltip.waitFor({ state: 'visible', timeout: 5000 });
    return await this.tooltip.textContent();
  }

  async isTooltipVisible() {
    return await this.tooltip.isVisible();
  }
}
