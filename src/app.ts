import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import path from 'path';
import { Pool } from 'mysql';

import helloWould from './controllers/helloWould';
import todoController from './controllers/todo.controller';

dotenv.config();

export default function (database: Pool) {
  const app = express();

  app.use(
    cors({
      origin: 'http://localhost:3000',
      credentials: true,
    })
  );

  app.use(express.json());
  app.use(express.static(path.join(__dirname + '/publics')));
  //todo
  app.get('/todo', todoController(database).getAllTodo);
  // app.post('/todo', todoController(database).postTodo);
  // app.put('/todo/:id', todoController(database).putTodo);
  // app.delete('/todo/:id', todoController(database).deleteTodo);
  app.get('/todo/:id', todoController(database).getOneTodo);
  app.get('/', helloWould);
  return app;
}
