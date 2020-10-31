import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';

// Authenticate user all products
// POST /api/products
// Public
export const authUser = asyncHandler(async (req, res, next) => {
	const { email, password } = req.body;

	const user = await User.findOne({ email: email });

	if (user && (await user.passwordMatch(password))) {
		res.json({
			_id: user._id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
			token: null,
		});
	} else {
		res.status(401);
		throw new Error('Invalid email or password');
	}
});