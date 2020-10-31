import express from 'express';
import { authUser, getProfile } from '../controllers/authController.js';
import { authMid } from '../middleware/authMiddleware.js';

const router = express.Router();

// POST /api/users/login - Authenticate user and get token
router.post('/login', authUser);

// GET /api/users/profile - Get user's profile
router.get('/profile', authMid, getProfile);

export default router;
