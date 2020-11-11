import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FormWrap from '../../components/Form';
import { savePaymentMethod } from '../../redux/actions/trolleyActions';
import CheckoutSteps from '../../components/CheckoutSteps';

import {
	Button,
	Col,
	Form,
	FormLabel,
	FormGroup,
	FormCheck,
} from 'react-bootstrap';

const Payment = ({ history }) => {
	const trolley = useSelector((state) => state.trolley);
	const { deliveryAddress } = trolley;

	if (!deliveryAddress) {
		history.push('/shipping');
	}

	const [paymentMethod, setPaymentMethod] = useState('PayPal');

	const dispatch = useDispatch();

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(savePaymentMethod(paymentMethod));
		history.push('/placeorder');
	};

	return (
		<FormWrap>
			<CheckoutSteps step1 step2 step3 />
			<h1>PAYMENT METHOD</h1>
			<Form onSubmit={submitHandler}>
				<FormGroup>
					<FormLabel as='legend'>Select payment method</FormLabel>

					<Col>
						<FormCheck
							name='paymentMethod'
							type='radio'
							label='PayPal or Credit Card'
							id='PayPal'
							value='PayPal'
							checked
							onChange={(e) => setPaymentMethod(e.target.value)}
						></FormCheck>
						<FormCheck
							name='paymentMethod'
							type='radio'
							label='Stripe'
							id='Stripe'
							value='Stripe'
							disabled
							onChange={(e) => setPaymentMethod(e.target.value)}
						></FormCheck>
					</Col>
				</FormGroup>
				<Button variant='primary' type='submit'>
					Continue to Place Order
				</Button>
			</Form>
		</FormWrap>
	);
};

export default Payment;
