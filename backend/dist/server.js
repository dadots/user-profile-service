import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/authRoutes.js';
import profileRoutes from './routes/profileRoutes.js';
const app = express();
app.use(cors({
    origin: 'http://localhost:5174',
    methods: ['POST', 'GET', 'PUT'],
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.listen(8081, () => console.log('Server running on port 8081'));
