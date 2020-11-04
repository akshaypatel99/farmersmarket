import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import Product from '../../components/Product';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import Paginate from '../../components/Paginate';
import { listProducts } from '../../store/actions/productActions';

const Home = ({ match }) => {
	const keyword = match.params.keyword;
	const pageNumber = match.params.pageNumber || 1;
	const dispatch = useDispatch();

	const productList = useSelector((state) => state.productList);
	const { loading, error, products, page, pages } = productList;

	useEffect(() => {
		dispatch(listProducts(keyword, pageNumber));
	}, [dispatch, keyword, pageNumber]);

	let home = <Loader />;

	if (!loading && error) {
		home = <Message variant='danger'>{error}</Message>;
	} else {
		home = (
			<>
				<Row>
					{products.map((product) => (
						<Col key={product._id} sm={12} md={6} lg={4} xl={3}>
							<Product product={product} />
						</Col>
					))}
				</Row>
				<Paginate pages={pages} page={page} keyword={keyword ? keyword : ''} />
			</>
		);
	}
	return (
		<>
			<h1>Farm Fresh Groceries</h1>

			{home}
		</>
	);
};

export default Home;
