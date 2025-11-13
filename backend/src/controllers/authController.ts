import type { Request, Response } from 'express';
import { db } from '../config/db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { logAudit } from '../utils/audit.js';

export const register = async (req: Request, res: Response) => {
    const { email, name, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const query = 'INSERT INTO users (email, name, password) VALUES (?, ?, ?)';
        db.query(query, [email, name, hashedPassword], (err) => {
            if (err) return res.status(500).json({ message: 'Registration failed' });
            res.status(201).json({ message: 'User registered successfully' });
        });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

export const login = (req: Request, res: Response) => {
    const { email, password } = req.body;
    const query = 'SELECT * FROM users WHERE email = ?';
    db.query(query, [email], async (err, results: any[]) => {
        if (err) return res.status(500).json({ message: 'Login failed' });
        if (results.length === 0) return res.status(401).json({ message: 'Invalid credentials' });

        const user = results[0];
        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(401).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ id: user.id, name: user.name, email: user.email }, "secretkey", { expiresIn: '1d' });

        logAudit(user.id, "LOGIN_SUCCESS");
        res.json({ token });
    });
};