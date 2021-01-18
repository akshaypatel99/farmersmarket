import asyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';
import User from '../models/userModel.js';

// GET /api/products/product - Get all products and by keyword/search word
export const getProducts = asyncHandler(async (req, res, next) => {
	const pageSize = 8;
	const page = Number(req.query.pageNumber) || 1;
	const keyword = req.query.keyword
		? {
				name: {
					$regex: req.query.keyword,
					$options: 'i',
				},
		  }
		: {};
	const count = await Product.countDocuments({ ...keyword });
	const products = await Product.find({ ...keyword })
		.limit(pageSize)
		.skip(pageSize * (page - 1));

	res.json({ products, page, pages: Math.ceil(count / pageSize) });
});

// GET /api/products/product/:id
export const getProduct = asyncHandler(async (req, res, next) => {
	const product = await Product.findById(req.params.id);
	if (product) {
		res.json(product);
	} else {
		res.status(404);
		throw new Error('Product not found');
	}
});

// POST /api/products/product/:id/reviews - Create new product view
export const createProductReview = asyncHandler(async (req, res, next) => {
	const product = await Product.findById(req.params.id);

	if (product) {
		const previouslyReviewed = product.reviews.find(
			(rvw) => rvw.user.toString() === req.user._id.toString()
		);

		if (previouslyReviewed) {
			res.status(400);
			throw new Error('Product already reviewed.');
		}

		const createdReview = {
			name: req.user.name,
			rating: Number(req.body.rating),
			comment: req.body.comment,
			user: req.user._id,
		};

		product.reviews.push(createdReview);

		product.numReviews = product.reviews.length;

		product.rating =
			product.reviews.reduce((acc, item) => item.rating + acc, 0) /
			product.reviews.length;

		await product.save();
		res.status(201).json({ message: 'Product review added.' });
	} else {
		res.status(404);
		throw new Error('Product not found');
	}
});

// GET /api/products/top - Get top rated products
export const getTopProducts = asyncHandler(async (req, res, next) => {
	const products = await Product.find({}).sort({ rating: -1 }).limit(5);

	res.json(products);
});

// GET /api/products/category - Get products by category
export const getProductsByCategory = asyncHandler(async (req, res, next) => {
	const keyword = req.query.keyword
		? {
				category: {
					$regex: req.query.keyword,
					$options: 'i',
				},
		  }
		: {};
	const products = await Product.find({ ...keyword });

	res.json({ products });
});
