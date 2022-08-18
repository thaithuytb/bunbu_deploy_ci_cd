import express from 'express';
import path from 'path';
import helloWould from './controllers/helloWould';
import TodoController from './controllers/todo.controller';

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname + '/publics')));
app.get('/todos', TodoController.getTodos);
app.get('/', helloWould);

export default app;
