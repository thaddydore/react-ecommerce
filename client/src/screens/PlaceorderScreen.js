import React, { useEffect } from 'react';
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CurrencyFormat from 'react-currency-format';
import Message from '../component/Message';
import CheckoutSteps from '../component/CheckoutSteps';
import { createOrder } from '../action/order';

const PlaceorderScreen = ({ history }) => {
	const dispatch = useDispatch();

	const cart = useSelector((state) => state.cart);

	const addDecimal = (num) => (Math.round(num * 100) / 100).toFixed(2);

	//calculate item prices
	cart.itemsPrice = addDecimal(cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0));
	cart.shippingPrice = addDecimal(cart.itemsPrice > 100 ? 0 : 100);
	cart.taxPrice = addDecimal(Number((0.15 * cart.itemsPrice).toFixed(2)));
	cart.totalPrice = (Number(cart.itemsPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice)).toFixed(2);

	const orderCreate = useSelector((state) => state.orderCreate);
	const { success, order, error } = orderCreate;

	useEffect(() => {
		if (success) {
			history.push(`/order/${order._id}`);
		}
		// eslint-disable-next-line
	}, [success, history]);

	const placeOrder = () => {
		dispatch(
			createOrder({
				orderItems: cart.cartItems,
				shippingAddress: cart.shippingAddress,
				paymentMethod: cart.paymentMethod,
				itemsPrice: cart.itemsPrice,
				shippingPrice: cart.shippingPrice,
				taxPrice: cart.taxPrice,
				totalPrice: cart.totalPrice,
			})
		);
	};
	return (
		<>
			<CheckoutSteps step1 step2 step3 step4 />
			<Row>
				<Col md={8}>
					<ListGroup variant='flush'>
						<ListGroup.Item>
							<h2>Shipping</h2>
							<p>
								<strong>Address: </strong>
								{cart.shippingAddress.address}, {cart.shippingAddress.city}, ' '{cart.shippingAddress.postalCode} ' '{' '}
								{cart.shippingAddress.country}.
							</p>
						</ListGroup.Item>

						<ListGroup.Item>
							<h2>Payment Method</h2>
							<p>
								<strong>Payment Method: </strong>
								{cart.paymentMethod}
							</p>
						</ListGroup.Item>

						<ListGroup.Item>
							<h2>Order Items</h2>
							{cart.cartItems.length === 0 ? (
								<Message>Your cart is empty</Message>
							) : (
								<ListGroup variant='flush'>
									{cart.cartItems.map((item, index) => (
										<ListGroup.Item key={index}>
											<Row>
												<Col md={1}>
													<Image src={item.image} alt={item.name} fluid rounded />
												</Col>

												<Col>
													<Link to={`/product/${item.product}`}>{item.name}</Link>
												</Col>

												<Col md={4}>
													{item.qty} x
													<CurrencyFormat value={item.price} displayType={'text'} thousandSeparator={true} prefix={'#'} /> =
													<CurrencyFormat
														value={item.qty * item.price}
														displayType={'text'}
														thousandSeparator={true}
														prefix={'#'}
													/>
												</Col>
											</Row>
										</ListGroup.Item>
									))}
								</ListGroup>
							)}
						</ListGroup.Item>
					</ListGroup>
				</Col>

				<Col md={4}>
					<Card>
						<ListGroup variant='flush'>
							<ListGroup.Item>
								<h2>Order Summary</h2>
							</ListGroup.Item>

							<ListGroup.Item>
								<Row>
									<Col>Items</Col>
									<Col>
										<CurrencyFormat value={cart.itemsPrice} displayType={'text'} thousandSeparator={true} prefix={'#'} />
									</Col>
								</Row>
							</ListGroup.Item>

							<ListGroup.Item>
								<Row>
									<Col>Shipping</Col>
									<Col>
										<CurrencyFormat value={cart.shippingPrice} displayType={'text'} thousandSeparator={true} prefix={'#'} />
									</Col>
								</Row>
							</ListGroup.Item>

							<ListGroup.Item>
								<Row>
									<Col>Tax</Col>
									<Col>
										<CurrencyFormat value={cart.taxPrice} displayType={'text'} thousandSeparator={true} prefix={'#'} />
									</Col>
								</Row>
							</ListGroup.Item>

							<ListGroup.Item>
								<Row>
									<Col>Total</Col>
									<Col>
										<CurrencyFormat value={cart.totalPrice} displayType={'text'} thousandSeparator={true} prefix={'#'} />
									</Col>
								</Row>
							</ListGroup.Item>

							<ListGroup.Item>{error && <Message variant='danger'>{error}</Message>}</ListGroup.Item>

							<ListGroup.Item>
								<Button type='button' className='btn-block' disabled={cart.cartItems.length === 0} onClick={placeOrder}>
									Place Order
								</Button>
							</ListGroup.Item>
						</ListGroup>
					</Card>
				</Col>
			</Row>
		</>
	);
};

export default PlaceorderScreen;
