import express from 'express';
import path from 'path';
import helloWould from './controllers/helloWould';
import TodoController from './controllers/todo.controller';
// import swaggerUi from "swagger-ui-express";
// import swaggerDocument from "./swagger.json";

const app = express();
// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(express.json());
app.use(express.static(path.join(__dirname + '/publics')));
app.get('/todos', TodoController.getTodos);
app.get('/', helloWould);

export default app;
