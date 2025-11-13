import express, { Request, Response } from 'express';

export const mockAuthRoutes = () => {
    const router = express.Router();

    router.post('/register', (req: Request, res: Response) => {
        res.status(201).json({ message: 'User registered' });
    });

    router.post('/login', (req: Request, res: Response) => {
        res.status(200).json({ token: 'mock-token' });
    });

    return router;
};

export const mockProfileRoutes = () => {
    const router = express.Router();

    router.get('/', (req: Request, res: Response) => {
        res.status(200).json({ name: 'Mock User', email: 'mock@test.com' });
    });

    router.put('/', (req: Request, res: Response) => {
        res.status(200).json({ message: 'Profile updated' });
    });

    return router;
};