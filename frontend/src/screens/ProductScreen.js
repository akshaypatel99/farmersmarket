import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
	Row,
	Col,
	Image,
	ListGroup,
	Card,
	Button,
	ListGroupItem,
} from 'react-bootstrap';
import Rating from '../components/Rating';
import axios from 'axios';

const ProductScreen = ({ match }) => {
	const [product, setProduct] = useState({});

	useEffect(() => {
		const fetchProduct = async () => {
			//Destructure data variable from the axios.get response
			const { data } = await axios.get(`/api/products/${match.params.id}`);
			setProduct(data);
		};

		fetchProduct();
	}, [match.params.id]);

	return (
		<>
			<Link className='btn btn-light my-3' to='/'>
				Return to Home
			</Link>

			<Row>
				<Col md={6}>
					<Image src={product.image} alt={product.name} fluid />
				</Col>

				<Col md={3}>
					<ListGroup variant='flush'>
						<ListGroupItem>
							<h3>{product.name}</h3>
						</ListGroupItem>
						<ListGroupItem>
							<Rating
								value={product.rating}
								text={`${product.numReviews} reviews`}
								color='#F1C40F'
							/>
						</ListGroupItem>
						<ListGroupItem>
							<strong>£ {product.price}</strong>
						</ListGroupItem>
						<ListGroupItem>
							<strong>Description: {product.description}</strong>
						</ListGroupItem>
					</ListGroup>
				</Col>

				<Col md={3}>
					<Card>
						<ListGroup variant='flush'>
							<ListGroupItem>
								<Row>
									<Col>Price:</Col>
									<Col>
										<strong>£{product.price}</strong>
									</Col>
								</Row>
							</ListGroupItem>
							<ListGroupItem>
								<Row>
									<Col>Status:</Col>
									<Col>
										<strong>
											{product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
										</strong>
									</Col>
								</Row>
							</ListGroupItem>
							<ListGroupItem>
								<Button
									className='btn-block'
									type='button'
									disabled={product.countInStock === 0}
								>
									ADD TO CART
								</Button>
							</ListGroupItem>
						</ListGroup>
					</Card>
				</Col>
			</Row>
		</>
	);
};

export default ProductScreen;
