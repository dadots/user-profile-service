import express from 'express';
import { getProfile, updateProfile } from '../controllers/profileController';
import { verifyToken } from '../middleware/auth';
const router = express.Router();
router.get('/', verifyToken, getProfile);
router.put('/', verifyToken, updateProfile);
export default router;
