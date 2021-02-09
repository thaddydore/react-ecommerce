import express from 'express';
const router = express.Router();

import { protect } from '../middleware/auth.js';
import { addOrderItems, getOrderById, updateOrderToPaid } from '../controllers/order.js';

router.route('/').post(protect, addOrderItems);
router.route('/:id').get(protect, getOrderById);
router.route('/:id/pay').put(protect, updateOrderToPaid);

export default router;