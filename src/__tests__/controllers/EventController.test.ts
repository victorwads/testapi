import request from 'supertest';
import app from '../app';

describe('EventController', () => {
    beforeEach(async () => {
        await request(app).post('/reset');
    });

    it('should create account with initial balance', async () => {
        const response = await request(app)
            .post('/event')
            .send({ type: 'deposit', destination: '100', amount: 10 })
            .expect(201);

        expect(response.body).toEqual({
            destination: {
                id: '100',
                balance: 10
            }
        });
    });

    it('should deposit into existing account', async () => {
        await request(app)
            .post('/event')
            .send({ type: 'deposit', destination: '100', amount: 10 });

        const response = await request(app)
            .post('/event')
            .send({ type: 'deposit', destination: '100', amount: 10 })
            .expect(201);

        expect(response.body).toEqual({
            destination: {
                id: '100',
                balance: 20
            }
        });
    });

    it('should withdraw from non-existing account', async () => {
        await request(app)
            .post('/event')
            .send({ type: 'withdraw', origin: '200', amount: 10 })
            .expect(404, '0');
    });

    it('should withdraw from existing account', async () => {
        await request(app)
            .post('/event')
            .send({ type: 'deposit', destination: '100', amount: 10 });

        const response = await request(app)
            .post('/event')
            .send({ type: 'withdraw', origin: '100', amount: 5 })
            .expect(201);

        expect(response.body).toEqual({
            origin: {
                id: '100',
                balance: 5
            }
        });
    });

    it('should transfer from existing account', async () => {
        await request(app)
            .post('/event')
            .send({ type: 'deposit', destination: '100', amount: 15 });

        const response = await request(app)
            .post('/event')
            .send({ type: 'transfer', origin: '100', amount: 15, destination: '300' })
            .expect(201);

        expect(response.body).toEqual({
            origin: {
                id: '100',
                balance: 0
            },
            destination: {
                id: '300',
                balance: 15
            }
        });
    });

    it('should transfer from non-existing account', async () => {
        await request(app)
            .post('/event')
            .send({ type: 'transfer', origin: '200', amount: 15, destination: '300' })
            .expect(404, '0');
    });
});