import {
  Router,
  Request,
  Response,
  ErrorRequestHandler,
  NextFunction
} from 'express';
import imagesRouter from './api/images';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  res.render('index');
});
// Images Router
router.use('/api', imagesRouter);
//404 Page not found
router.use((req: Request, res: Response) => res.status(404).render('404'));
// 500 Server Errors Handlers
router.use(
  (
    error: ErrorRequestHandler,
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    console.log(error);
    res.status(500).render('500');
  }
);

export default router;
