import asyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';

// Fetch all products
// GET /api/products
// Public
export const getProducts = asyncHandler(async (req, res, next) => {
	const products = await Product.find();

	res.json(products);
});

// Fetch single product
// GET /api/product/:id
// Public
export const getProduct = asyncHandler(async (req, res, next) => {
	const product = await Product.findById(req.params.id);
	if (product) {
		res.json(product);
	} else {
		res.status(404);
		throw new Error('Product not found');
	}
});
