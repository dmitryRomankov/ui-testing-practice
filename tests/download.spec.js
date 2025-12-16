import { expect, test } from '@playwright/test';
import { AdBlock } from '../src/utils/index.js';
import { Attachment } from '../src/helper/index.js';
import { UploadAndDownloadPage } from '../src/pageObjects/index.js';

test.beforeEach(async ({ page }) => {
  await AdBlock.blockAds(page);
  await page.goto('https://demoqa.com/upload-download', { waitUntil: 'domcontentloaded' });
});
test.describe('Upload file scenarios', () => {
  test('Upload file', async ({ page }) => {
    const attachment = new Attachment();
    const uploadDownloadPage = new UploadAndDownloadPage(page);

    const uploadedFilePath = await attachment.generateRandomFile('./temp', 'exe');

    const fileName = uploadedFilePath.split(/[/\\]/).pop();

    const [fileChooser] = await Promise.all([page.waitForEvent('filechooser'), uploadDownloadPage.clickOnChooseFile()]);

    await fileChooser.setFiles([uploadedFilePath]);
    console.log('file uploaded');

    const uploadedFileName = await uploadDownloadPage.getElementText(uploadDownloadPage.uploadedFileLocatorpath);
    console.log('uploaded File Name' + uploadedFileName);

    const uploadedFileNameOnly = uploadedFileName.split('\\').pop();
    console.log('uploaded File Name only' + uploadedFileNameOnly);

    await expect(uploadedFileNameOnly).toBe(fileName);
  });
});
