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
		throw new Error('No order items.');
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

// GET /api/orders/:id
export const getOrderById = asyncHandler(async (req, res) => {
	const order = await Order.findById(req.params.id).populate(
		'user',
		'name email'
	);

	if (order) {
		res.json(order);
	} else {
		res.status(404);
		throw new Error('Order not found.');
	}
});
