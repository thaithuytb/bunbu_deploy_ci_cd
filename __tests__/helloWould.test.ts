import makeApp from '../src/app';
import { expect, jest, test } from '@jest/globals';
import request from 'supertest';

const mockQuery = jest.fn(function (sql, callback) {
  callback({});
});
const app = makeApp({
  query: mockQuery,
});
describe('Test route root', () => {
  afterAll(() => {
    jest.clearAllMocks();
  });
  test('GET /', async () => {
    const res = await request(app).get('/');

    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual('Hello would !!!');
  });
});
