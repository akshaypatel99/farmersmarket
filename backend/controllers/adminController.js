import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';

// GET /api/users/ - Get all user profiles
export const getAllProfiles = asyncHandler(async (req, res, next) => {
	const users = await User.find();

	res.json(users);
});
