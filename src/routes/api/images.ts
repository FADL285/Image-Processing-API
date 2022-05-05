import { Router, Request, Response } from 'express';
import {
  listImages,
  getImagePath,
  thumbnailExists
} from '../../utilities/fsOperations';
import { resizeImage } from '../../utilities/sharp';
import { generateFileName, trimExtension } from '../../utilities/helpers';

const router = Router();

interface QueryObj {
  filename?: string;
  width?: number;
  height?: number;
}

router.get('/images', async (req: Request, res: Response) => {
  const images = await listImages();
  const { filename = '' }: QueryObj = req.query;
  const { width = NaN, height = NaN }: QueryObj = req.query;

  // IF image not found
  if (filename && !images.includes(filename + '.jpg')) {
    return res.status(404).render('img-404');
  }

  // IF image found & width or height are provided
  if (images.includes(filename + '.jpg') && (width || height)) {
    if ((width && !(+width > 0)) || (height && !(+height > 0)))
      return res
        .status(422)
        .send(
          '<strong style="font-family: sans-serif; text-align: center">Invalid Params, width & height must be positive number</strong>'
        );

    const thumbnailName = generateFileName(filename, width, height);
    if (!thumbnailExists(thumbnailName)) {
      await resizeImage(filename, thumbnailName, width, height);
      return res.status(201).sendFile(getImagePath(thumbnailName, 'jpg', true));
    }
    return res.sendFile(getImagePath(thumbnailName, 'jpg', true));
  }

  // IF Image found & width and height are not provided.
  if (images.includes(filename + '.jpg')) {
    return res.sendFile(getImagePath(filename));
  }

  // File Name not provided -> Display available images
  res.render('images', { images, trimExtension, url: req.originalUrl });
});

export default router;
