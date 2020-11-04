import express from 'express';
import {
	getProducts,
	getProduct,
	createProductReview,
} from '../controllers/productController.js';
import { authMid } from '../middleware/authMiddleware.js';

const router = express.Router();

// GET /api/products
router.get('/', getProducts);

// GET /api/products/:id
router.get('/:id', getProduct);

// POST /api//products/:id/reviews - Create new product view
router.post('/:id/reviews', authMid, createProductReview);
export default router;
