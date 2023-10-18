import express, { Request, Response } from 'express';
import shoppingListRoutes from './routes/item.route';
import errorHandler from './middleware/errorHandler';

const app = express();
app.use(express.json());

app.use('/api/list', shoppingListRoutes);
app.all('*', (req: Request, res: Response) => {
  res.status(404).send('Page Not Found');
});
app.use(errorHandler);
export default app;
