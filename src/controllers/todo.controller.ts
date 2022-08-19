import { Request, Response } from 'express';
import { MysqlError } from 'mysql';
import connectDB from '../database/connect/index';
import Todo from '../interfaces/todo.interface';

export default class TodoController {
  //GET /todo
  static getAll(req: Request, res: Response) {
    connectDB.query('SELECT * FROM todos', (err: MysqlError, rows: Todo[]) => {
      if (err) {
        res.status(500);
        res.json({ success: false, message: 'query error', error: err });
        throw err;
      }
      return res.status(200).json([...rows]);
    });
  }
  // POST /todo
}
