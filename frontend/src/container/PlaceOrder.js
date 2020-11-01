import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
	Button,
	Row,
	Col,
	ListGroup,
	Image,
	Card,
	ListGroupItem,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import CheckoutSteps from '../components/CheckoutSteps';
// import { createOrder } from '../actions/orderActions';
// import { ORDER_CREATE_RESET } from '../constants/orderConstants';

const PlaceOrder = () => {
	// const dispatch = useDispatch();
	const addDecimals = (num) => {
		return (Math.round(num * 100) / 100).toFixed(2);
	};

	const trolley = useSelector((state) => state.trolley);

	trolley.trolleyTotal = addDecimals(
		trolley.trolleyItems.reduce((acc, item) => acc + item.price * item.qty, 0)
	);

	trolley.deliveryPrice = addDecimals(trolley.trolleyTotal > 40 ? 0 : 6.25);

	trolley.totalPrice = (
		Number(trolley.trolleyTotal) + Number(trolley.deliveryPrice)
	).toFixed(2);

	const placeOrderHandler = () => {};

	let error;

	return (
		<>
			<CheckoutSteps step1 step2 step3 step4 />
			<h1>PLACE ORDER</h1>
			<Row>
				<Col md={8}>
					<ListGroup variant='flush'>
						<ListGroupItem>
							<h2>Delivery</h2>
							<p>
								<strong>Address: </strong> {trolley.deliveryAddress.address},{' '}
								{trolley.deliveryAddress.city},{' '}
								{trolley.deliveryAddress.postcode}
							</p>
						</ListGroupItem>

						<ListGroupItem>
							<h2>Payment Method</h2>
							<strong>Method: </strong>
							{trolley.paymentMethod}
						</ListGroupItem>

						<ListGroupItem>
							<h2>Trolley Summary</h2>
							{trolley.trolleyItems.length === 0 ? (
								<Message>Your trolley is empty</Message>
							) : (
								<ListGroup variant='flush'>
									{trolley.trolleyItems.map((item, index) => (
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
									<Col>Trolley Total</Col>
									<Col>£{trolley.trolleyTotal}</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>Delivery</Col>
									<Col>£{trolley.deliveryPrice}</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>Total</Col>
									<Col>£{trolley.totalPrice}</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								{error && <Message variant='danger'>{error}</Message>}
							</ListGroup.Item>
							<ListGroup.Item>
								<Button
									type='button'
									className='btn-block'
									disabled={trolley.trolleyItems === 0}
									onClick={placeOrderHandler}
								>
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

export default PlaceOrder;
