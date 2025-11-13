import { mockAuthRoutes, mockProfileRoutes } from '../__mocks__/routes';

jest.mock('../routes/authRoutes', () => mockAuthRoutes());
jest.mock('../routes/profileRoutes', () => mockProfileRoutes());

import request from 'supertest';
import app from '../app';

describe('Auth endpoints', () => {
    it('POST /api/auth/register should return 201 (mocked route)', async () => {
        const res = await request(app)
        .post('/api/auth/register')
        .send({ email: 'test@test.com', password: '123456' });

        expect(res.status).toBe(201);
        expect(res.body).toEqual({ message: 'User registered' });
    });

    it('POST /api/auth/login should return 200 with mock token', async () => {
        const res = await request(app)
        .post('/api/auth/login')
        .send({ email: 'test@test.com', password: '123456' });

        expect(res.status).toBe(200);
        expect(res.body).toEqual({ token: 'mock-token' });
    });
});
