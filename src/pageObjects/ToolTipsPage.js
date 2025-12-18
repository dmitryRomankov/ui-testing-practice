import { time } from 'console';
import { BasePage } from './index.js';

class ToolTipsPage extends BasePage {
  constructor(page) {
    super(page);
    this.page = page;

    this.hoverButton = page.locator('#toolTipButton');
    this.hoverTextField = page.locator('#toolTipTextField');
    this.contraryLink = page.locator('a:has-text("Contrary")');
    this.sectionLink = page.locator('a:has-text("1.10.32")');

    this.tooltip = page.locator('.tooltip-inner');
  }

  async hoverOverButton() {
    await this.hoverButton.scrollIntoViewIfNeeded();
    await this.hoverButton.waitFor({ state: 'visible' });
    await this.hoverButton.hover({ force: true });
  }

  async hoverOverTextField() {
    await this.hoverTextField.scrollIntoViewIfNeeded();
    await this.hoverTextField.waitFor({ state: 'visible', timeout: 5000 });
    await this.hoverTextField.hover({ force: true });
  }

  async hoverOverContraryLink() {
    await this.contraryLink.scrollIntoViewIfNeeded();
    await this.contraryLink.waitFor({ state: 'visible' });
    await this.contraryLink.hover({ force: true });
  }

  async hoverOverSectionLink() {
    await this.sectionLink.scrollIntoViewIfNeeded();
    await this.sectionLink.waitFor({ state: 'visible' });
    await this.sectionLink.hover({ force: true });
  }

  async getTooltipText() {
    await this.tooltip.waitFor({ state: 'visible', timeout: 10000 });
    return await this.tooltip.textContent();
  }

  async isTooltipVisible() {
    return await this.tooltip.isVisible();
  }
}

export default ToolTipsPage;
