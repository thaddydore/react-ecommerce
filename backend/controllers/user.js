import asyncHandler from 'express-async-handler';

import User from '../model/user.js';
import generateToken from '../util/generateToken.js';

/**
 * @description authenticate the user and get a token
 * @route POST /api/users/login
 * @access public
 */

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

/**
 * @description register a user
 * @route POST /api/users
 * @access public
 */

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('User already exist');
  }

  const user = await User.create({ name, email, password });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    })
  } else {
    res.status(400);
    throw new Error('invalid user data');
  }
});


/**
 * @description get user's profile
 * @route GET /api/users/profile
 * @access private
 */

const userProfile = asyncHandler(async (req, res) => {

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
    throw new Error('User not Found');
  }
});



/**
 * @description update user's profile
 * @route PUT  /api/users/profile
 * @access private
 */

const updateUserProfile = asyncHandler(async (req, res) => {

  const user = await User.findById(req.user._id);
  user.name = req.body.name || user.name;
  user.email = req.body.email || user.email;

  if (req.body.password) {
    user.password = req.body.password;
  }

  const updatedUser = await user.save();

  if (user) {
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error('User not Found');
  }
});


export { authUser, userProfile, registerUser, updateUserProfile };
