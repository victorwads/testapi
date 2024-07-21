import request from 'supertest';
import app from '../app';

describe('BalanceController', () => {
    beforeEach(async () => {
        await request(app).post('/reset');
    });

    it('should get balance for non-existing account', async () => {
        await request(app)
            .get('/balance?account_id=1234')
            .expect(404, '0');
    });

    it('should get balance for existing account', async () => {
        await request(app)
            .post('/event')
            .send({ type: 'deposit', destination: '100', amount: 10 });

        const response = await request(app)
            .get('/balance?account_id=100')
            .expect(200);

        expect(response.text).toBe('10');
    });
});