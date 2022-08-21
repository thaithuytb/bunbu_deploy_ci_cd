import { Request, Response } from 'express';
import { MysqlError, Pool } from 'mysql';
import Todo from '../interfaces/todo.interface';
import todoService from '../services/todo.repository';

const todoController = (db: Pool) => ({
  //GET - todo
  getAllTodo: async (req: Request, res: Response) => {
    try {
      await todoService(db, (err: MysqlError, data: Todo[]) => {
        if (!err) {
          return res.status(200).json({
            success: true,
            data,
          });
        }
        return res.status(500).json({
          success: false,
          message: 'Query error',
          error: err,
        });
      }).getAll();
    } catch (error) {}
  },
  // POST - todo
  // postTodo: async (req: Request, res: Response) => {},
  // putTodo: async (req: Request, res: Response) => {},
  // deleteTodo: async (req: Request, res: Response) => {},
  getOneTodo: async (req: Request, res: Response) => {
    try {
      await todoService(db, (err: MysqlError, data: Todo) => {
        if (!err) {
          if (!data) {
            return res.status(404).json({
              success: false,
              message: 'Not found',
            });
          }
          return res.status(200).json({
            success: true,
            data: data,
          });
        }
        return res.status(500).json({
          success: false,
          message: 'Query error',
          err,
        });
      }).getOne(req.params.id);
    } catch (error) {}
  },
});

export default todoController;
