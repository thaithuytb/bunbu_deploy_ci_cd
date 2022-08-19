import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import path from 'path';

import helloWould from './controllers/helloWould';
import TodoController from './controllers/todo.controller';
import connectDB from './database/connect/index';

dotenv.config();
const app = express();

connectDB.connect((err) => {
  if (err) throw err;
  console.log('Database is connected !!!');
});
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
