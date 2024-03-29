import asyncHandler from 'express-async-handler';

import Order from '../model/order.js';

/**
 * @description create new order
 * @route POST /api/orderss
 * @access private
 */
const addOrderItems = asyncHandler(async (req, res) => {
	const { orderItems, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice } = req.body;

	if (orderItems && orderItems.length === 0) {
		res.status(400);
		throw new Error('No order items');
	} else {
		const order = new Order({
			orderItems,
			shippingAddress,
			paymentMethod,
			itemsPrice,
			taxPrice,
			shippingPrice,
			totalPrice,
			user: req.user._id,
		});

		const createdOrder = await order.save();

		res.status(201).json(createdOrder);
	}
});

/**
 * @description Get order by ID
 * @route POST /api/orderss/:id
 * @access private
 */
const getOrderById = asyncHandler(async (req, res) => {
	const order = await Order.findById(req.params.id).populate('user', 'name email');

	if (order) {
		res.json(order);
	} else {
		throw new Error('Order not found');
	}
});

/**
 * @description Update Order to Paid
 * @route POST /api/orderss/:id/pay
 * @access private
 */
const updateOrderToPaid = asyncHandler(async (req, res) => {
	const order = await Order.findById(req.params.id);

	if (order) {
		order.isPaid = true;
		order.paidAt = Date.now();
		order.paymentResult = {
			id: req.body.id,
			status: req.body.status,
			update_time: req.body.update_time,
			email_address: req.body.payer.email_address,
		};

		const updatedOrder = await order.save();

		res.json(updatedOrder);
	} else {
		throw new Error('Order not found');
	}
});

/**
 * @description Get logged in users orders
 * @route POST /api/orders/myorders
 * @access private
 */
const getMyOrders = asyncHandler(async (req, res) => {
	const orders = await Order.find({ user: req.user._id });

	res.json(orders);
});

export { addOrderItems, getOrderById, updateOrderToPaid, getMyOrders };
