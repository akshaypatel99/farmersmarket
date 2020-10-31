import express from 'express';
import { getProducts, getProduct } from '../controllers/productController.js';

const router = express.Router();

// GET /api/products
router.get('/', getProducts);

// GET /api/product/:id
router.get('/:id', getProduct);

export default router;
