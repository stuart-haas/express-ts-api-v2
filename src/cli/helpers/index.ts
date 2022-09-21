import fs, { promises as fsPromises } from 'fs';
import * as path from 'path';

function formatDate(i: number) {
  return +i < 10 ? `0${i}` : i;
}

function getDate() {
  const date = new Date();
  return [date.getUTCFullYear(), formatDate(date.getUTCMonth() + 1), formatDate(date.getUTCDate()), formatDate(date.getUTCHours()), formatDate(date.getUTCMinutes()), formatDate(date.getUTCSeconds())].join('');
}

export async function writeFileFromTemplate(name: string, template: string, destination: string) {
  try {
    if (!fs.existsSync(destination)) {
      fs.mkdirSync(destination);
    }
    const date = getDate();
    const fileName = `${date}-${name}.ts`;
    const filePath = path.join(destination, fileName);
    await fsPromises.writeFile(filePath, template);
    return filePath;
  } catch (err) {
    throw new Error(err.message);
  }
}
