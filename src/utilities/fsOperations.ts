import { readdir } from 'fs/promises';
import path from 'path';

export const listImages = async () => {
  const imagesPath = path.join(__dirname, '..', 'images');
  try {
    const files = await readdir(imagesPath, { withFileTypes: true });
    const images = files.filter((file) => !file.isDirectory());
    const imagesName = [];
    for (const image of images) {
      imagesName.push(image.name);
    }
    return imagesName;
  } catch (error) {
    console.error(error);
  }
};
