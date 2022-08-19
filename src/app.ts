import express from 'express';
import cors from 'cors';
import path from 'path';
import helloWould from './controllers/helloWould';
import TodoController from './controllers/todo.controller';

const app = express();
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);
app.use(express.json());
app.use(express.static(path.join(__dirname + '/publics')));
app.get('/todos', TodoController.getTodos);
app.get('/', helloWould);

export default app;
