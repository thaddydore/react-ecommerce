import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
<<<<<<< HEAD
import 'antd/dist/antd.css';
=======
// import logo from './logo.svg';
// import './App.css';
>>>>>>> 29e69c7f2e582d0fa29a88c1d9928d53fdd21e29
import store from './store.js';
import './bootstrap.min.css';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

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
