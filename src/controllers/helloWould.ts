import { Request, Response } from 'express';

const helloWould = (req: Request, res: Response) => {
  res.status(200);
  res.json('Hello would !!!');
};

export default helloWould;
