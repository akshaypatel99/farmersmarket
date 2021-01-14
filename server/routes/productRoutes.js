import express from 'express';
import {
	getProducts,
	getProduct,
	createProductReview,
	getTopProducts,
} from '../controllers/productController.js';
import { authMid } from '../middleware/authMiddleware.js';

const router = express.Router();

// GET /api/products
router.get('/', getProducts);

// GET /api/products/product/:id
router.get('/product/:id', getProduct);

// GET /api/products/top
router.get('/top', getTopProducts);

// POST /api/products/product/:id/reviews - Create new product view
router.post('/product/:id/reviews', authMid, createProductReview);

export default router;
