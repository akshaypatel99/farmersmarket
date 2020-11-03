import express from 'express';
import {
	deleteUser,
	getUserById,
	updateUser,
	getAllProfiles,
	deleteProduct,
	updateProduct,
	createProduct,
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

// POST /api/admin/product - Create product
router.post('/product/create', authMid, adminMid, createProduct);

// PUT /api/admin/product/:id - Update product
router.put('/product/:id', authMid, adminMid, updateProduct);

// DELETE /api/admin/product/:id - Delete product
router.delete('/product/:id', authMid, adminMid, deleteProduct);

export default router;
