import express from 'express';
import { addOrder, getOrderById } from '../controllers/orderController.js';
import { authMid } from '../middleware/authMiddleware.js';

const router = express.Router();

// POST /api/orders - Register a new user
router.post('/', authMid, addOrder);

// GET /api/orders/:id
router.get('/:id', authMid, getOrderById);

export default router;
