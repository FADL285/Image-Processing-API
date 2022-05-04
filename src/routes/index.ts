import { Router, Request, Response } from 'express';
import imagesRouter from './api/images';
import path from 'path';

const router = Router();
const viewsPath = path.join(__dirname, '..', 'views');

router.get('/', (req: Request, res: Response) => {
  const homeView = path.join(viewsPath, 'index.html');
  res.sendFile(homeView);
});

// Images Router
router.use('/api', imagesRouter);

export default router;
