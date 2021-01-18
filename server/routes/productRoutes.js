import express from 'express';
import {
	getProducts,
	getProduct,
	createProductReview,
	getTopProducts,
	getProductsByCategory,
} from '../controllers/productController.js';
import { authMid } from '../middleware/authMiddleware.js';

const router = express.Router();

// GET /api/products/product
router.get('/', getProducts);

// GET /api/products/product/:id
router.get('/product/:id', getProduct);

// POST /api/products/product/:id/reviews - Create new product view
router.post('/product/:id/reviews', authMid, createProductReview);

// GET /api/products/top - Get top rated products
router.get('/top', getTopProducts);

// GET /api/products/category - Get products by category
router.get('/category', getProductsByCategory);

export default router;
