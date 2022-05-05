import { Router, Request, Response } from 'express';
import { listImages, getImagePath } from '../../utilities/fsOperations';
import * as routeViews from '../../views/images';

const router = Router();

interface QueryObj {
  filename?: string;
  width?: number;
  height?: number;
}

router.get('/images', async (req: Request, res: Response) => {
  const images = await listImages();
  const { filename } = req.query;
  let { width, height }: QueryObj = req.query;

  // IF image not found
  if (filename && !images.includes((filename + '.jpg') as string)) {
    return res.send(routeViews.fileNotFound());
  }

  // IF image found & width or height are provided
  if (images.includes((filename + '.jpg') as string) && (width || height)) {
    width = width ? +width : NaN;
    height = height ? +height : NaN;
    console.log(height, typeof height);
    return res.send('Image Found');
  }

  // IF Image found & width and height are not provided.
  if (images.includes((filename + '.jpg') as string)) {
    return res.sendFile(getImagePath(filename as string));
  }

  // File Name not provided -> Display available images
  res.send(routeViews.noFilenameParam(images));
});

export default router;
