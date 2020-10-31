import express from 'express';
import { authUser } from '../controllers/authController.js';

const router = express.Router();

// GET /api/products
router.post('/login', authUser);

export default router;
