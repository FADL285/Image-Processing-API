import { Router, Request, Response } from 'express';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  const responseBody = `
  <h1>Welcome to Image Processing API</h1>
  <p>Get Images on <a href='api/images'>Images endpoint</a></p>
  <p>Hint: the endpoint require 'filename' query parameter (required), width & height</p>
  `;
  res.send(responseBody);
});

export default router;
