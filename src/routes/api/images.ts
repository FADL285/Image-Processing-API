import { Router, Request, Response } from 'express';
import {
  listImages,
  getImagePath,
  thumbnailExists
} from '../../utilities/fsOperations';
import { resizeImage } from '../../utilities/sharp';
import * as routeViews from '../../views/images';
import { generateFileName } from '../../utilities/helpers';

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
    return res.send(routeViews.fileNotFound());
  }

  // IF image found & width or height are provided
  if (images.includes(filename + '.jpg') && (width || height)) {
    if (!(width && +width > 0) || !(height && +height > 0))
      return res.send('Invalid Params, width & height must be positive number');

    const thumbnailName = generateFileName(filename, width, height);
    if (!thumbnailExists(thumbnailName)) {
      await resizeImage(filename, thumbnailName, width, height);
      return res.sendFile(getImagePath(thumbnailName, 'jpg', true));
    }
    return res.sendFile(getImagePath(thumbnailName, 'jpg', true));
  }

  // IF Image found & width and height are not provided.
  if (images.includes(filename + '.jpg')) {
    return res.sendFile(getImagePath(filename));
  }

  // File Name not provided -> Display available images
  res.send(routeViews.noFilenameParam(images));
});

export default router;
