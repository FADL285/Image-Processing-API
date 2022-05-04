import { Router, Request, Response } from 'express';
import { listImages } from '../../utilities/fsOperations';
import * as routeViews from '../../views/images';

const router = Router();

router.get('/images', async (req: Request, res: Response) => {
  if (!req.query.filename) {
    const images = await listImages();
    return res.send(routeViews.noFilenameParam(images));
  }
  res.send('ok');
});

export default router;
