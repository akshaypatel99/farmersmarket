import express from 'express';
import { getAllProfiles } from '../controllers/adminController.js';
import { authMid, adminMid } from '../middleware/authMiddleware.js';

const router = express.Router();

// GET /api/admin/users/ - Get all user profiles
router.get('/users', authMid, adminMid, getAllProfiles);

export default router;
