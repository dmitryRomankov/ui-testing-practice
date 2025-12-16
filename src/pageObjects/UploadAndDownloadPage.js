import BasePage from './BasePage.js';

export default class UploadAndDownloadPage extends BasePage {
  constructor(page) {
    super(page);
    this.uploadFileLocator = page.locator('//input[@id="uploadFile"]');
    this.uploadedFileLocatorpath = page.locator('#uploadedFilePath');
  }

  async clickOnChooseFile() {
    await this.uploadFileLocator.click();
  }

  async getElementText(locator) {
    return await locator.textContent();
  }
}
