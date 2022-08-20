import { Request, Response } from 'express';
import { MysqlError, Pool } from 'mysql';
import Todo from '../interfaces/todo.interface';
import todoService from '../services/todo.repository';

const todoController = (db: Pool) => ({
  //GET - todo
  getAllTodo: async (req: Request, res: Response) => {
    await todoService(db, (err: MysqlError, data: Todo[]) => {
      if (err) {
        res.status(500).json({
          success: false,
          message: 'error',
          err,
        });
      } else {
        res.status(200);
        res.json({
          success: true,
          data,
        });
      }
    }).getAll();
  },
  // POST - todo
  // postTodo: async (req: Request, res: Response) => {},
  // putTodo: async (req: Request, res: Response) => {},
  // deleteTodo: async (req: Request, res: Response) => {},
  getOneTodo: async (req: Request, res: Response) => {
    await todoService(db, (err: MysqlError, data: Todo) => {
      if (err) {
        res.status(500).json({
          success: false,
          message: 'error',
          err,
        });
      } else {
        res.status(200);
        res.json({
          success: true,
          data,
        });
      }
    }).getOne(req.params.id);
  },
});

export default todoController;
