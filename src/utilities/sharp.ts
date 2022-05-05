import { readFile } from 'fs/promises';
import sharp from 'sharp';
import { getImagePath, makeDirIfNotExists } from './fsOperations';
import path from 'path';

interface ImageDimensions {
  width?: number;
  height?: number;
}

const thumbnailFolderPath = path.join(__dirname, '..', 'images', 'thumbnails');

export const resizeImage = async (
  originalImageName: string,
  thumbnailImageName: string,
  width: number,
  height: number,
  extension = 'jpg'
): Promise<boolean> => {
  const imagePath = getImagePath(originalImageName);
  const dimensions: ImageDimensions = {};
  if (width) dimensions.width = +width;
  if (height) dimensions.height = +height;

  const thumbnailPath = path.join(
    thumbnailFolderPath,
    `${thumbnailImageName}.${extension}`
  );

  try {
    await makeDirIfNotExists(thumbnailFolderPath);
    const originalImg = await readFile(imagePath);
    await sharp(originalImg).resize(dimensions).toFile(thumbnailPath);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
