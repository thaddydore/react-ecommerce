import express from 'express';
const router = express.Router();

import { authUser, userProfile, registerUser, updateUserProfile } from '../controllers/user.js';
import { protect } from '../middleware/auth.js';

router.route('/').post(registerUser);
router.route('/login').post(authUser);
router.route('/profile').get(protect, userProfile).put(protect, updateUserProfile);


export default router;

