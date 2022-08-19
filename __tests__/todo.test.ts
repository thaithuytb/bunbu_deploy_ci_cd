import app from '../src/app';
import request from 'supertest';
// import connectDB from '../src/database/connect/index';
// import { query } from 'express';

// import Todo from '../src/interfaces/todo.interface';
// import TodoController from '../src/controllers/todo.controller';

describe('test get todo route', () => {
  afterAll(() => {
    jest.resetAllMocks();
  });

  test('GET /todo -> code 200 and a list todo', async () => {
    const res = await request(app).get('/todo');
    expect(res.status).toEqual(200);
  });

  test('GET /todo -> code 500 and error', async () => {
    const mockError = () => {
      return jest.fn(() => ({
        success: false,
        message: expect.stringContaining('error'),
        error: expect.any,
      }));
    };
    const res = await await request(app).get('/todo');

    expect(res.error).toMatchObject(mockError);
  });
});
