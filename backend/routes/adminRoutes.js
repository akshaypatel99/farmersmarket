import express from 'express';
import {
	deleteUser,
	getUserById,
	updateUser,
	getAllProfiles,
} from '../controllers/adminController.js';
import { authMid, adminMid } from '../middleware/authMiddleware.js';

const router = express.Router();

// GET /api/admin/users/ - Get all user profiles
router.get('/users', authMid, adminMid, getAllProfiles);

// GET /api/admin/users/:id - Get user by id
router.get('/users/:id', authMid, adminMid, getUserById);

// PUT /api/admin/users/:id - Update user's profile
router.put('/users/:id', authMid, adminMid, updateUser);

// DELETE /api/admin/users/:id - Delete user profile
router.delete('/users/:id', authMid, adminMid, deleteUser);

export default router;