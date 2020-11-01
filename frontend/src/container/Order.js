import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
	Row,
	Col,
	ListGroup,
	ListGroupItem,
	Image,
	Card,
	Button,
} from 'react-bootstrap';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { getOrderDetails, payOrder } from '../store/actions/orderActions';
import axios from 'axios';
import { PayPalButton } from 'react-paypal-button-v2';
import { ORDER_PAY_RESET } from '../store/actions/actionTypes';

const Order = ({ history, match }) => {
	const [scriptLoaded, setScriptLoaded] = useState(false);

	const orderId = match.params.id;

	const orderDetails = useSelector((state) => state.orderDetails);
	const { order, loading, error } = orderDetails;

	const orderPay = useSelector((state) => state.orderPay);
	// prettier-ignore
	const { loading:loadingPay, successful:successfulPay } = orderPay;

	const dispatch = useDispatch();

	if (!loading) {
		const addDecimals = (num) => {
			return (Math.round(num * 100) / 100).toFixed(2);
		};

		order.trolleyTotal = addDecimals(
			order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
		);
	}

	useEffect(() => {
		const paypalScript = async () => {
			const { data: clientId } = await axios.get('/api/config/paypal');
			const script = document.createElement('script');
			script.type = 'text/javascript';
			script.async = true;
			script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
			script.onLoad = () => {
				setScriptLoaded(true);
			};
			document.body.appendChild(script);
		};

		if (!order || successfulPay) {
			dispatch({ type: ORDER_PAY_RESET });
			dispatch(getOrderDetails(orderId));
		} else if (!order.isPaid) {
			if (!window.paypal) {
				paypalScript();
			} else {
				setScriptLoaded(true);
			}
		}
	}, [dispatch, order, orderId, successfulPay]);

	const successfulPaymentHandler = (paymentResult) => {
		dispatch(payOrder(orderId, paymentResult));
	};

	return loading ? (
		<Loader />
	) : error ? (
		<Message variant='danger'>{error}</Message>
	) : (
		<>
			<h1>ORDER #: {order._id}</h1>
			<Row>
				<Col md={8}>
					<ListGroup variant='flush'>
						<ListGroupItem>
							<h2>Delivery</h2>
							<p>
								<strong>Name: </strong> {order.user.name}
							</p>
							<p>
								<strong>Email: </strong> {order.user.email}
							</p>
							<p>
								<strong>Address: </strong> {order.deliveryAddress.address},{' '}
								{order.deliveryAddress.city}, {order.deliveryAddress.postcode}
							</p>
							{order.isDelivered ? (
								<Message variant='success'>
									Delivered on {order.deliveredAt}
								</Message>
							) : (
								<Message variant='danger'>Not Delivered</Message>
							)}
						</ListGroupItem>

						<ListGroupItem>
							<h2>Payment Method</h2>
							<p>
								<strong>Method: </strong>
								{order.paymentMethod}
							</p>
							{order.isPaid ? (
								<Message variant='success'>Paid on {order.paidAt}</Message>
							) : (
								<Message variant='danger'>Not Paid</Message>
							)}
						</ListGroupItem>

						<ListGroupItem>
							<h2>Order Summary</h2>
							{order.orderItems.length === 0 ? (
								<Message>Your order is empty</Message>
							) : (
								<ListGroup variant='flush'>
									{order.orderItems.map((item, index) => (
										<ListGroupItem key={index}>
											<Row>
												<Col md={1}>
													<Image
														src={item.image}
														alt={item.name}
														fluid
														rounded
													/>
												</Col>
												<Col>
													<Link to={`/product/${item.product}`}>
														{item.name}
													</Link>
												</Col>
												<Col md={4}>
													{item.qty} x £{item.price} = £{item.qty * item.price}
												</Col>
											</Row>
										</ListGroupItem>
									))}
								</ListGroup>
							)}
						</ListGroupItem>
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
									<Col>Order Total</Col>
									<Col>£{order.trolleyTotal}</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>Delivery</Col>
									<Col>£{order.deliveryPrice}</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>Total</Col>
									<Col>£{order.totalPrice}</Col>
								</Row>
							</ListGroup.Item>
							{!order.isPaid && (
								<ListGroupItem>
									{loadingPay && <Loader />}
									{!scriptLoaded ? (
										<Loader />
									) : (
										<PayPalButton
											amount={order.totalPrice}
											onSuccess={successfulPaymentHandler}
										/>
									)}
								</ListGroupItem>
							)}
						</ListGroup>
					</Card>
				</Col>
			</Row>
		</>
	);
};

export default Order;