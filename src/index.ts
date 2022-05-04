import express, { Application } from 'express';
import morgan from 'morgan';
import router from './routes';

const PORT = process.env.PORT || 3000;
// Instance of express App
const app: Application = express();
// Morgan Logger Middleware
app.use(morgan('short'));
// Routes
app.use('/', router);

// Start the Server
app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});

export default app;
