import { Request, Response } from 'express';
interface Todo {
    id: number;
    name: string;
    complete: boolean;
}
export default class TodoController {
  static getTodos(req: Request, res: Response) {
    const todos: Todo[] = [
      {
        id: 1,
        name: 'run',
        complete: false,
      },
      {
        id: 2,
        name: 'eat',
        complete: false,
      },
      {
        id: 2,
        name: 'fly',
        complete: false,
      },
    ];
    return res.status(200).json(todos);
  }
}
