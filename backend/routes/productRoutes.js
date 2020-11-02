import express from 'express';
import { getProducts, getProduct } from '../controllers/productController.js';

const router = express.Router();

// GET /api/products
router.get('/', getProducts);

// GET /api/products/:id
router.get('/:id', getProduct);

export default router;
