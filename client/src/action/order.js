import axios from 'axios';

import {
	ORDER_CREATE_FAIL,
	ORDER_CREATE_SUCCESS,
	ORDER_CREATE_REQUEST,
	ORDER_DETAILS_REQUEST,
	ORDER_DETAILS_SUCCESS,
	ORDER_DETAILS_FAIL,
	ORDER_PAY_FAIL,
	ORDER_PAY_SUCCESS,
	ORDER_PAY_REQUEST,
} from '../constants/order';

export const createOrder = (order) => async (dispatch, getState) => {
	try {
		dispatch({ type: ORDER_CREATE_REQUEST });

		const {
			userLogin: { userInfo },
		} = getState();

		const config = {
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${userInfo.token}`,
			},
		};

		const { data } = await axios.post(`/api/orders`, order, config);

		dispatch({
			type: ORDER_CREATE_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: ORDER_CREATE_FAIL,
			payload: error.response && error.response.data.message ? error.response.data.message : error.message,
		});
	}
};

<<<<<<< HEAD
export const getOrderDetails = (id, isSingle) => async (dispatch, getState) => {
=======
export const getOrderDetails = (id) => async (dispatch, getState) => {
>>>>>>> 29e69c7f2e582d0fa29a88c1d9928d53fdd21e29
	try {
		dispatch({ type: ORDER_DETAILS_REQUEST });

		const {
			userLogin: { userInfo },
		} = getState();

		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
		};

		if (isSingle && id) {
			const { data } = await axios.get(`/api/orders/${id}`, config);

			dispatch({
				type: ORDER_DETAILS_SUCCESS,
				payload: data,
			});
		}

		const { data } = await axios.get(`/api/orders/myorders`, config);

		dispatch({
			type: ORDER_DETAILS_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: ORDER_DETAILS_FAIL,
			payload: error.response && error.response.data.message ? error.response.data.message : error.message,
		});
	}
};

export const payOrder = (orderId, paymentResult) => async (dispatch, getState) => {
	try {
		dispatch({ type: ORDER_PAY_REQUEST });

		const {
			userLogin: { userInfo },
		} = getState();

		const config = {
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${userInfo.token}`,
			},
		};

		const { data } = await axios.put(`/api/orders/${orderId}/pay`, paymentResult, config);

		dispatch({
			type: ORDER_PAY_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: ORDER_PAY_FAIL,
			payload: error.response && error.response.data.message ? error.response.data.message : error.message,
		});
	}
};
