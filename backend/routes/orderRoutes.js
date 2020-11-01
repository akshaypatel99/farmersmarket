import express from 'express';
import { addOrder } from '../controllers/orderController.js';
import { authMid } from '../middleware/authMiddleware.js';

const router = express.Router();

// POST /api/orders - Register a new user
router.post('/', authMid, addOrder);

export default router;
