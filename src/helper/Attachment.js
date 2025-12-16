import fs from 'fs';
import path from 'path';
import Fakerator from 'fakerator';

const fakerator = Fakerator();

class Attachment {
  generateRandomText(length) {
    return fakerator.random.string(length);
  }

  async generateRandomFile(dirPath = './temp', extension = 'txt') {
    const randomText = this.generateRandomText(20);
    const randomFileName = `file_${Date.now()}.${extension}`;
    const filePath = path.join(dirPath, randomFileName);

    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }

    fs.writeFileSync(filePath, randomText);
    return filePath;
  }
}

export default Attachment;
