import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { Button, Table } from 'react-bootstrap';
import { listAllOrders } from '../../store/actions/adminActions';

const OrderList = ({ history }) => {
	const dispatch = useDispatch();

	const orderList = useSelector((state) => state.orderList);
	const { orders, loading, error } = orderList;

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	useEffect(() => {
		if (userInfo && userInfo.isAdmin) {
			dispatch(listAllOrders());
		} else {
			history.push('/');
		}
	}, [dispatch, history, userInfo]);

	return (
		<>
			<h1>All Orders</h1>
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant='danger'>{error}</Message>
			) : (
				<Table striped hover responsive>
					<thead>
						<tr>
							<th>ORDER ID</th>
							<th>USER</th>
							<th>DATE</th>
							<th>TOTAL (£)</th>
							<th>PAID</th>
							<th>DELIVERED</th>
						</tr>
					</thead>
					<tbody>
						{orders.map((order) => (
							<tr key={order._id}>
								<td>{order._id}</td>
								<td>
									<strong>{order.user && order.user.name}</strong>
								</td>
								<td>{order.createdAt.substring(0, 10)}</td>
								<td>{order.totalPrice.toFixed(2)}</td>
								<td>
									{order.isPaid ? (
										order.paidAt.substring(0, 10)
									) : (
										<i
											className='far fa-times-circle'
											style={{ color: '#ff7851' }}
										></i>
									)}
								</td>
								<td>
									{order.isDelivered ? (
										order.deliveredAt.substring(0, 10)
									) : (
										<i
											className='far fa-times-circle'
											style={{ color: '#ff7851' }}
										></i>
									)}
								</td>
								<td>
									<LinkContainer to={`/order/${order._id}/`}>
										<Button variant='info' className='btn-sm'>
											Details
										</Button>
									</LinkContainer>
								</td>
							</tr>
						))}
					</tbody>
				</Table>
			)}
		</>
	);
};

export default OrderList;
