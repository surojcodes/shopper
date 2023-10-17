import express, { Request, Response } from 'express'
import todoRoutes from './routes/todo.route'

const app = express();
app.use(express.json());

app.use('/api/todos',todoRoutes)

export default app;