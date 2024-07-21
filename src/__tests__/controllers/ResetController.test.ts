import request from 'supertest';
import app from '../app';

describe('ResetController', () => {
    beforeEach(async () => {
        await request(app).post('/reset');
    });

    it('should reset the state', async () => {
        await request(app)
            .post('/event')
            .send({ type: 'deposit', destination: '123', amount: 10 });

        await request(app)
            .post('/reset')
            .expect(200);

        await request(app)
            .get('/balance?account_id=123')
            .expect(404, '0');
    });
});