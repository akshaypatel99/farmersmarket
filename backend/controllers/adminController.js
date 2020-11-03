import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import Product from '../models/productModel.js';

// GET /api/admin/users/ - Get all user profiles
export const getAllProfiles = asyncHandler(async (req, res, next) => {
	const users = await User.find();

	res.json(users);
});

// GET /api/admin/users/:id - Get user by id
export const getUserById = asyncHandler(async (req, res, next) => {
	const user = await User.findById(req.params.id).select('-password');

	if (user) {
		res.json(user);
	} else {
		res.status(404);
		throw new Error('User not found.');
	}
});

// PUT /api/admin/users/:id - Update user's profile
export const updateUser = asyncHandler(async (req, res, next) => {
	const user = await User.findById(req.params.id).select('-password');
	console.log(user);
	if (user) {
		user.name = req.body.name || user.name;
		user.email = req.body.email || user.email;
		user.isAdmin = req.body.isAdmin || user.isAdmin;

		const updatedUser = await user.save();

		res.json({
			_id: updatedUser._id,
			name: updatedUser.name,
			email: updatedUser.email,
			isAdmin: updatedUser.isAdmin,
		});
	} else {
		res.status(404);
		throw new Error('User not found');
	}
});

// DELETE /api/admin/users/:id - Delete user profile
export const deleteUser = asyncHandler(async (req, res, next) => {
	const user = await User.findById(req.params.id);

	if (user) {
		await user.remove();
		res.json({ message: 'User deleted.' });
	} else {
		res.status(404);
		throw new Error('User not found.');
	}
});

// DELETE /api/admin/product/:id - Delete product
export const deleteProduct = asyncHandler(async (req, res, next) => {
	const product = await Product.findById(req.params.id);
	if (product) {
		await product.remove();
		res.json({ message: 'Product deleted.' });
	} else {
		res.status(404);
		throw new Error('Product not found');
	}
});

// POST /api/admin/product/create - Create product
export const createProduct = asyncHandler(async (req, res, next) => {
	const product = new Product({
		name: 'Sample name',
		price: 0,
		user: req.user._id,
		image: '/images.sample.jpg',
		category: 'Sample category',
		description: 'Sample description',
		countInStock: 0,
		rating: 0,
		numReviews: 0,
	});

	const createdProduct = await product.save();
	res.status(201).json(createdProduct);
});

// PUT /api/admin/product/:id - Update product
export const updateProduct = asyncHandler(async (req, res, next) => {
	const product = await Product.findById(req.params.id);

	if (product) {
		product.name = req.body.name;
		product.price = req.body.price;
		product.user = req.body.user;
		product.image = req.body.image;
		product.category = req.body.category;
		product.description = req.body.description;
		product.countInStock = req.body.countInStock;
		product.rating = req.body.rating;
		product.numReviews = req.body.numReviews;

		const updatedProduct = await product.save();
		res.json(updatedProduct);
	} else {
		res.status(404);
		throw new Error('Product not found');
	}
});
