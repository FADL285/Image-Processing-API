import { readdir, mkdir, unlink } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';

const imagesPath = path.join(__dirname, '..', 'images');
const thumbnailPath = path.join(__dirname, '..', 'images', 'thumbnails');

export const listImages = async (): Promise<string[]> => {
  const imagesPath = path.join(__dirname, '..', 'images');
  try {
    const files = await readdir(imagesPath, { withFileTypes: true });
    const images = files.filter((file) => !file.isDirectory());
    const imagesName: string[] = [];
    for (const image of images) {
      imagesName.push(image.name);
    }
    return imagesName;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getImagePath = (
  imageName: string,
  extension = 'jpg',
  thumbnail = false
): string => {
  const imgPath = thumbnail ? thumbnailPath : imagesPath;
  return path.join(imgPath, `${imageName}.${extension}`);
};

export const thumbnailExists = (
  imageName: string,
  extension = 'jpg'
): boolean => {
  const filePath = path.join(thumbnailPath, `${imageName}.${extension}`);
  return existsSync(filePath);
};

export const makeDirIfNotExists = async (path: string): Promise<void> => {
  try {
    if (!existsSync(path)) await mkdir(path);
  } catch (error) {
    console.log(error);
  }
};

export const deleteFile = async (path: string): Promise<boolean> => {
  try {
    await unlink(path);
  } catch (error) {
    return false;
  }
  return true;
};
