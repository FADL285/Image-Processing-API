import path from 'path';
import express, { Application } from 'express';
import morgan from 'morgan';
import router from './routes';

const PORT = process.env.PORT || 3000;
// Instance of express App
const app: Application = express();
// Set Views template engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// Morgan Logger Middleware
app.use(morgan('short'));
// Routes
app.use('/', router);

// Start the Server
app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});

export default app;
