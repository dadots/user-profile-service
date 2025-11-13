import { mockAuthRoutes, mockProfileRoutes } from '../__mocks__/routes';

jest.mock('../routes/authRoutes', () => mockAuthRoutes());
jest.mock('../routes/profileRoutes', () => mockProfileRoutes());

import request from 'supertest';
import app from '../app';

describe('Profile endpoints', () => {
    it('GET /api/profile should return user data (mocked)', async () => {
        const res = await request(app).get('/api/profile');

        expect(res.status).toBe(200);
        expect(res.body).toEqual({ name: 'Mock User', email: 'mock@test.com' });
    });

    it('PUT /api/profile should update user profile (mocked)', async () => {
        const res = await request(app)
        .put('/api/profile')
        .send({ name: 'Updated User' });

        expect(res.status).toBe(200);
        expect(res.body).toEqual({ message: 'Profile updated' });
    });
});
