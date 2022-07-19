import supertest from 'supertest';
import app from '../index';
import {
  listImages,
  thumbnailExists,
  getImagePath,
  deleteFile
} from '../utilities/fsOperations';

const request = supertest(app);

describe('Image Processing Functionalities Test', () => {
  it('If Thumbnail Exists will delete it and create the thumbnail -> will return true', async () => {
    const IMAGE_NAME = 'encenadaport_w800_h600';
    if (thumbnailExists(IMAGE_NAME))
      await deleteFile(getImagePath(IMAGE_NAME, 'jpg', true));

    await request.get('/api/images?filename=encenadaport&width=800&height=600');
    expect(thumbnailExists(IMAGE_NAME)).toBeTruthy();
  });
});

describe('File System Functionalities Test', () => {
  it('should read all images in images folder and return array of images names and has fjord img', async () => {
    const imagesArr = await listImages();
    expect(imagesArr).toContain('fjord.jpg');
  });

  it('should check if fadl.jpg in thumbnail folder and return false', () => {
    const isExist = thumbnailExists('fadl');
    expect(isExist).toBeFalsy();
  });
});
