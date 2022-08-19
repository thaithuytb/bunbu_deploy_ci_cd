import app from '../src/app';
import request from 'supertest';

describe('First test', () => {
  test('GET / -> code 200 and a String', async () => {
    const res = await request(app).get('/');

    expect(res.status).toEqual(200);
    expect(res.body).toEqual('Hello would !!!');
  });
});
