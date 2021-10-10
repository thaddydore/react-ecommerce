import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import 'antd/dist/antd.css';
import axios from 'axios';
import store from './store.js';
import './bootstrap.min.css';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Set up axios request interceptors
axios.interceptors.request.use(
	function (config) {

		config.baseURL = process.env.REACT_APP_BASE_URL;

		return config
	},
	function (error) {

		alert('An error occured!')
		return Promise.reject(error)
	}
)

// Axios Response Interceptor
axios.interceptors.response.use(null, function (error) {

	if (updateOnlineStatus() === 'offline') {
		error = { message: 'You are currently offline. Kindly turn on your network or try again' }
		return Promise.reject(error)
	}

	return Promise.reject(error)
})

function updateOnlineStatus() {
	let onLineStatus;
	return onLineStatus = navigator.onLine ? 'online' : 'offline';
};

window.addEventListener('offline', updateOnlineStatus);
window.addEventListener('online', updateOnlineStatus);


ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
