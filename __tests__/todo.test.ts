import makeApp from '../src/app';
import request from 'supertest';
import { jest } from '@jest/globals';
import { application } from 'express';

describe('test todo route', () => {
  /**
   * Note when mock query function
   * if u want to return function not found => return callback (null, [])
   */
  //---------------Mock data------------------------//
  const mockListTodo = [
    {
      id: 1,
      name: 'eat',
      complete: false,
    },
    {
      id: 2,
      name: 'run',
      complete: false,
    },
  ];
  //---------------Mock error from server----------//
  const mockError = jest.fn().mockImplementation(() => {
    throw new Error();
  });
  const mockQueryErr = jest.fn(function (sql, callback) {
    callback(mockError, null);
  });
  //--------------Mock error not found-------------//
  const mockNotFoundErr = jest.fn(function (sql, callback) {
    callback(null, []);
  });
  //----------------GET ALL TODO-------------------//

  describe('GET /todo --- get all todo', () => {
    test('Return 200 status code and a list todo', async () => {
      const mockQuery = jest.fn(function (sql, callback) {
        callback(null, mockListTodo);
      });
      const res = await request(
        makeApp({
          query: mockQuery,
        })
      ).get('/todo');

      expect(mockQuery).toBeCalledTimes(1);
      expect(res.statusCode).toEqual(200);
      expect(res.type).toEqual('application/json');
      expect(res.body).toEqual(
        expect.objectContaining({
          success: true,
          data: expect.arrayContaining([
            expect.objectContaining({
              id: expect.any(Number),
              name: expect.any(String),
              complete: expect.any(Boolean),
            }),
          ]),
        })
      );
    });

    test('Return 500 status code and err', async () => {
      const res = await request(
        makeApp({
          query: mockQueryErr,
        })
      ).get('/todo');
      expect(res.statusCode).toEqual(500);
    });
  });
  //----------------GET ONE TODO-------------------//
  describe('GET /todo/:id --- get one todo', () => {
    const mockQueryOneData = jest.fn(function (sql, callback) {
      callback(null, [mockListTodo.find((todo) => todo.id === 1)]);
    });
    test('Return status code 200 and a todo', async () => {
      const res = await request(
        makeApp({
          query: mockQueryOneData,
        })
      ).get('/todo/1');

      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual(
        expect.objectContaining({
          success: true,
          data: expect.objectContaining({
            id: expect.any(Number),
            name: expect.any(String),
            complete: expect.any(Boolean),
          }),
        })
      );
    });

    test('Return status code 404 and message not found', async () => {
      const res = await request(
        makeApp({
          query: mockNotFoundErr,
        })
      ).get('/todo/999');

      expect(res.statusCode).toEqual(404);
      expect(res.body).toEqual(
        expect.objectContaining({
          message: 'Not found',
        })
      );
    });

    test('Return 500 status code and err', async () => {
      const res = await request(
        makeApp({
          query: mockQueryErr,
        })
      ).get('/todo/2');
      expect(res.statusCode).toEqual(500);
    });
  });

  afterAll(() => {
    jest.clearAllMocks();
  });
});
