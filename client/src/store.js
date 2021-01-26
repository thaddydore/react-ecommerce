import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import { productList, productDetails } from './reducers/product.js';
import { cart } from './reducers/cart.js';
import { userLogin, userRegister, userDetails, userUpdateProfile } from './reducers/user'

const reducer = combineReducers({
  productList,
  productDetails,
  cart,
  userLogin,
  userRegister,
  userDetails,
  userUpdateProfile,
});

const cartItemsFromStorage = localStorage.getItem('cartItems') ?
  JSON.parse(localStorage.getItem('cartItems')) : [];

const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;

const shippingAddressFromStorage = localStorage.getItem('shippingAddress') ? JSON.parse(localStorage.getItem('shippingAddress')) : {};

const initialState = {
  cart: { cartItems: cartItemsFromStorage, shippingAddress: shippingAddressFromStorage },
  userLogin: { userInfo: userInfoFromStorage }
};

const middleware = [thunk];

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;
