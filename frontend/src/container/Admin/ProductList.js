import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { Button, Table, Row, Col } from 'react-bootstrap';
import { listProducts } from '../../store/actions/productActions';
import Rating from '../../components/Rating';

const ProductList = ({ history, match }) => {
	const [deleted, setDeleted] = useState(false);
	const dispatch = useDispatch();

	const productList = useSelector((state) => state.productList);
	const { products, loading, error } = productList;

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	// const userDelete = useSelector((state) => state.userDelete);

	useEffect(() => {
		if (userInfo && userInfo.isAdmin) {
			dispatch(listProducts());
		} else {
			history.push('/');
		}
	}, [dispatch, history, userInfo]);

	const createProductHandler = () => {};

	const deleteProductHandler = (id) => {
		if (window.confirm('Are you sure you want to delete user?')) {
			// dispatch(deleteUser(id));
			// setDeleted(!deleted);
		}
		return;
	};

	return (
		<>
			<Row className='align-items-center'>
				<Col>
					<h1>All Products</h1>
				</Col>
				<Col className='text-right'>
					<Button className='my-3' onClick={createProductHandler}>
						<i className='fas fa-plus'></i> Create Product
					</Button>
				</Col>
			</Row>
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant='danger'>{error}</Message>
			) : (
				<Table striped hover responsive>
					<thead>
						<tr>
							<th>PRODUCT ID</th>
							<th>NAME</th>
							<th>PRICE (£)</th>
							<th>CATEGORY</th>
							<th>STOCK COUNT</th>
							<th>RATING</th>
							<th>REVIEW COUNT</th>
						</tr>
					</thead>
					<tbody>
						{products.map((product) => (
							<tr key={product._id}>
								<td>{product._id}</td>
								<td>
									<strong>{product.name}</strong>
								</td>
								<td>
									<strong>{product.price}</strong>
								</td>
								<td>{product.category}</td>
								<td>
									<strong>{product.countInStock}</strong>
								</td>
								<td>
									<Rating value={product.rating} color='#888' />
								</td>
								<td>{product.numReviews}</td>
								<td>
									<LinkContainer to={`/editproducts/${product._id}/`}>
										<Button variant='info' className='btn-sm'>
											<i
												className='fas fa-user-edit'
												style={{ color: 'white' }}
											></i>
										</Button>
									</LinkContainer>
								</td>
								<td>
									<Button
										variant='danger'
										className='btn-sm'
										onClick={() => deleteProductHandler(product._id)}
									>
										<i
											className='fas fa-trash-alt'
											style={{ color: 'white' }}
										></i>
									</Button>
								</td>
							</tr>
						))}
					</tbody>
				</Table>
			)}
		</>
	);
};

export default ProductList;
