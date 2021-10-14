import React, { useEffect } from 'react';
import { Row, Col, ListGroup, Image, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CurrencyFormat from 'react-currency-format';
import Message from '../component/Message';
import Loader from '../component/Loader';
import { getOrderDetails } from '../action/order';

const OrderScreen = ({ match }) => {
	const orderId = match.params.id;

	const dispatch = useDispatch();

	const orderDetails = useSelector((state) => state.orderDetails);
	const { order, error, loading } = orderDetails;

	if (!loading) {
		const addDecimal = (num) => (Math.round(num * 100) / 100).toFixed(2);

		//calculate item prices
		order.itemsPrice = addDecimal(order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0));
	}

	useEffect(() => {
		dispatch(getOrderDetails(orderId));
	}, [dispatch, orderId]);

	return loading ? (
		<Loader />
	) : error ? (
		<Message variant='danger'>{error}</Message>
	) : (
		<>
			<h1>Order {order._id}</h1>

			<Row>
				<Col md={8}>
					<ListGroup variant='flush'>
						<ListGroup.Item>
							<h2>Shipping</h2>

							<p>
								<strong>Name: </strong> {order.user.name}
							</p>
							<p>
								<strong>Name: </strong> <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
							</p>
							<p>
								<strong>Address: </strong>
								{order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.postalCode}{' '}
								{order.shippingAddress.country}.
							</p>

							{order.isDelivered ? (
								<Message variant='success'>Delivered on {order.deliveredAt}</Message>
							) : (
								<Message variant='danger'>Not Delivered</Message>
							)}
						</ListGroup.Item>

						<ListGroup.Item>
							<h2>Payment Method</h2>
							<p>
								<strong>Payment Method: </strong>
								{order.paymentMethod}
							</p>

							{order.isPaid ? (
								<Message variant='success'>Paid on {order.paidAt}</Message>
							) : (
								<Message variant='danger'>Not Paid</Message>
							)}
						</ListGroup.Item>

						<ListGroup.Item>
							<h2>Order Items</h2>

							{order.orderItems.length === 0 ? (
								<Message>Order cart is empty</Message>
							) : (
								<ListGroup variant='flush'>
									{order.orderItems.map((item, index) => (
										<ListGroup.Item key={index}>
											<Row>
												<Col md={1}>
													<Image src={item.image} alt={item.name} fluid rounded />
												</Col>

												<Col>
													<Link to={`/product/${item.product}`}>{item.name}</Link>
												</Col>

												<Col md={4}>
													{item.qty} x{' '}
													<CurrencyFormat value={item.price} displayType={'text'} thousandSeparator={true} prefix={'#'} /> ={' '}
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
										<CurrencyFormat value={order.itemsPrice} displayType={'text'} thousandSeparator={true} prefix={'#'} />
									</Col>
								</Row>
							</ListGroup.Item>

							<ListGroup.Item>
								<Row>
									<Col>Shipping</Col>
									<Col>
										<CurrencyFormat value={order.shippingPrice} displayType={'text'} thousandSeparator={true} prefix={'#'} />
									</Col>
								</Row>
							</ListGroup.Item>

							<ListGroup.Item>
								<Row>
									<Col>Tax</Col>
									<Col>
										<CurrencyFormat value={order.taxPrice} displayType={'text'} thousandSeparator={true} prefix={'#'} />
									</Col>
								</Row>
							</ListGroup.Item>

							<ListGroup.Item>
								<Row>
									<Col>Total</Col>
									<Col>
										<CurrencyFormat value={order.totalPrice} displayType={'text'} thousandSeparator={true} prefix={'#'} />
									</Col>
								</Row>
							</ListGroup.Item>
						</ListGroup>
					</Card>
				</Col>
			</Row>
		</>
	);
};

export default OrderScreen;
