import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import path from 'path';
import { Pool } from 'mysql';

import helloWould from './controllers/helloWould';
import todoController from './controllers/todo.controller';
import {
  oAuth2FacebookController,
  oAuth2GoogleController,
} from './controllers/oAuth2.controller';

dotenv.config();

export default function (database: Pool | any) {
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
  app.get('/todo/:id', todoController(database).getOneTodo);
  //login google-facebook
  app.get('/api/v1/auth/oauth2', oAuth2GoogleController(database));
  // app.post('/api/v1/auth/oauth2/facebook', oAuth2FacebookController(database));
  app.get('/api/v1/auth/oauth2/facebook', oAuth2FacebookController(database));
  app.get('/', helloWould);
  return app;
}
