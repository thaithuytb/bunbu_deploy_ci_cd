import { Request, Response } from 'express';
import { FieldInfo, MysqlError } from 'mysql';
import connectDB from '../database/connect/index';
interface Todo {
  id: number;
  name: string;
  complete: boolean;
}

export default class TodoController {
  static getTodos(req: Request, res: Response) {
    connectDB.query('SELECT * FROM todos', (err: MysqlError, rows: any) => {
      if (err) throw err;
      return res.status(200).json([...rows]);
    });
  }
}
