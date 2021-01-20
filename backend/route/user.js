import express from 'express';
const router = express.Router();

import { authUser, userProfile, registerUser } from '../controllers/user.js';
import { protect } from '../middleware/auth.js';

router.route('/').post(registerUser);
router.route('/login').post(authUser);
router.route('/profile').get(protect, userProfile);


export default router;