import asyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';

// POST /api/orders
export const addOrder = asyncHandler(async (req, res, next) => {
	const {
		orderItems,
		deliveryAddress,
		paymentMethod,
		trolleyTotal,
		deliveryPrice,
		totalPrice,
	} = req.body;

	if (orderItems && orderItems.length === 0) {
		res.status(400);
		throw new Error('No order items');
		return;
	} else {
		const order = new Order({
			orderItems,
			user: req.user._id,
			deliveryAddress,
			paymentMethod,
			trolleyTotal,
			deliveryPrice,
			totalPrice,
		});

		const createdOrder = await order.save();

		res.status(201).json(createdOrder);
	}
});
