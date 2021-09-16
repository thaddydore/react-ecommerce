import React, { useEffect, useState } from 'react';
import { Form, Button, Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../component/FormContainer';
import CheckoutSteps from '../component/CheckoutSteps';
import { savePaymentMethod } from '../action/cart';
import { usePaystackPayment } from 'react-paystack';
import Message from '../component/Message';
import { payOrder } from '../action/order';
import { useParams } from 'react-router-dom';
const PaymentScreen = ({ history }) => {
	const { id } = useParams();
	const dispatch = useDispatch();
	const cart = useSelector((state) => state.cart);
	const { shippingAddress } = cart;
	const [isPaystackselect, setPayment] = useState(false);
	const [message, setMessage] = useState([]);
	const [isError, setError] = useState(false);
	const [InvalidEmail, setInvalidEmail] = useState(false);
	const [isAmount, setisAmount] = useState(true);
	const [userEmail, setEmail] = useState([]);
	const [userFullName, setFullName] = useState([]);
	const [paymentAmount, setAmount] = useState([]);

	if (!shippingAddress) {
		history.push('/shipping');
	}

	const initializePayment = usePaystackPayment({
		currency: 'NGN',
		channels: ['card', 'bank', 'ussd', 'qr', 'mobile_money', 'bank_transfer'],
		email: userEmail,
		amount: paymentAmount,
		publicKey: process.env.REACT_APP_PAYSTACK_KEY,
	});

	const handleChangeEmail = (e) => {
		setEmail(e.target.value);
	};

	const handleChangeAmount = (e) => {
		setAmount(e.target.value);
	};
	const handleChangeFullName = (e) => {
		setFullName(e.target.value);
	};
	const emailValidation = (value) => {
		const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
		return regex.test(value);
	};
	const handlePay = () => {
		const isValidEmail = emailValidation(userEmail);
		if (userEmail.length > 0 && !isValidEmail) {
			document.querySelector('#valid').className = 'isinvalid';
			setInvalidEmail(true);
			return;
		} else {
			document.querySelector('#valid').className = 'isvalid';
			setInvalidEmail(false);
			if (!document.querySelector('#amount').value) {
				setisAmount(false);
				document.querySelector('#isvalidAmount').className = 'isinvalid';
				return;
			} else {
				setisAmount(true);
				document.querySelector('#isvalidAmount').className = 'isvalid';
			}
		}
		const onSuccess = (reference) => {
			dispatch(
				payOrder(id, {
					reference: reference,
				})
			);
		};

		const onClose = () => {
			setPayment(false);
			setError(true);
			setMessage('Unsucessful Transaction');
		};

		initializePayment(onSuccess, onClose);
	};

	const [paymentMethod, setPaymentMethod] = useState('Paypal');

	const submit = (e) => {
		e.preventDefault();

		dispatch(savePaymentMethod(paymentMethod));
		history.push('/placeorder');
	};

	return (
		<FormContainer>
			<CheckoutSteps step1 step2 step3 />

			<h1>Payment Method</h1>
			<Form onSubmit={(e) => submit(e)}>
				<Form.Group controlId='address'>
					<Form.Label as='legend'>Select Method</Form.Label>

					<Col>
						<Form.Check
							type='radio'
							label='Paypal or Credit card'
							id='Paypal'
							name='paymentMethod'
							value='Paypal'
							checked
							onClick={(e) => {
								setError(false);
								setPayment(false);
								setPaymentMethod(e.target.value);
							}}></Form.Check>
					</Col>
					<Col>
						<Form.Check
							type='radio'
							label='Paystack'
							id='Paystack'
							name='paymentMethod'
							value='Paystack'
							onClick={(e) => {
								setError(false);
								setPayment(true);
								setPaymentMethod(e.target.value);
							}}></Form.Check>
					</Col>
				</Form.Group>
				{isPaystackselect ? (
					<Row>
						<Col>
							<Form>
								<Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
									<Form.Label>Full name</Form.Label>
									<Form.Control type='text' placeholder='austine...' onChange={handleChangeFullName} />
								</Form.Group>
								<Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
									<Form.Label>Email address</Form.Label>
									<Form.Control type='email' placeholder='name@example.com' onChange={handleChangeEmail} />
								</Form.Group>

								<p id='valid'>{InvalidEmail ? 'Invalid Email' : undefined}</p>

								<Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
									<Form.Label>Amount</Form.Label>
									<Form.Control type='text' placeholder='NGN..' onChange={handleChangeAmount} id='amount' />
								</Form.Group>
								<p id='isvalidAmount'>{isAmount ? undefined : 'Enter Amount'}</p>
								<img className='payment-btn' src={'/images/payment-method/paystack.png'} onClick={handlePay} />
							</Form>
						</Col>
					</Row>
				) : undefined}
				{isError ? (
					<Message>
						<h4>{message}</h4>
					</Message>
				) : undefined}

				<Button type='submit' variant='primary'>
					Continue
				</Button>
			</Form>
		</FormContainer>
	);
};

export default PaymentScreen;
