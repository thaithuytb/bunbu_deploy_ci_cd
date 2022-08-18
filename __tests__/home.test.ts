import app from '../src/app';
import request from 'supertest';

let server: any = null;
describe('First test', () => {
    beforeEach(async () => {
        server = app.listen();
    });
    test('GET / -> code 200 and a String', async () => {
        const res = await request(server).get('/');

        expect(res.status).toEqual(200);
        expect(res.body).toEqual('Hello would !!!');
    });

    afterEach(() => {
        server.close();
    });
});
