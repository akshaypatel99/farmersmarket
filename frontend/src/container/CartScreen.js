import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Message from '../components/Message';
import {
	Button,
	Card,
	Col,
	Form,
	Image,
	ListGroup,
	Row,
} from 'react-bootstrap';
import { addToCart } from '../actions/cartActions';

const CartScreen = ({ hisotry, location, match }) => {
	const prodId = match.params.id;

	const qty = location.search ? Number(location.search.split('=')[1]) : 1;

	const dispatch = useDispatch();

	useEffect(() => {
		if (prodId) {
			dispatch(addToCart(prodId, qty));
		}
	}, [dispatch, prodId, qty]);

	return <div>Cart</div>;
};

export default CartScreen;
