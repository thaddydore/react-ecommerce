import express from 'express';
const router = express.Router();

import { protect } from '../middleware/auth.js';
import { addOrderItems, getOrderById } from '../controllers/order.js';

router.route('/').post(protect, addOrderItems);
router.route('/:id').get(protect, getOrderById);

export default router;