import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import genToken from '../util/gT.js';

// POST /api/users/login - Authenticate user and get token
export const authUser = asyncHandler(async (req, res, next) => {
	const { email, password } = req.body;

	const user = await User.findOne({ email: email });

	if (user && (await user.passwordMatch(password))) {
		res.json({
			_id: user._id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
			token: genToken(user._id),
		});
	} else {
		res.status(401);
		throw new Error('Invalid email or password');
	}
});

// GET /api/users/profile - Get user's profile
export const getProfile = asyncHandler(async (req, res, next) => {
	const user = await User.findById(req.user._id);

	if (user) {
		res.json({
			_id: user._id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
		});
	} else {
		res.status(404);
		throw new Error('User not found');
	}
});
