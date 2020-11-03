import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';

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

// DELETE /api/users/:id - Delete user profile
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
