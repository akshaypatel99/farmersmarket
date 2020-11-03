import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import FormWrap from '../../components/Form';
import { login } from '../../store/actions/userActions';
import {
	Button,
	Col,
	Form,
	FormControl,
	FormGroup,
	FormLabel,
	FormText,
	Row,
} from 'react-bootstrap';

const Login = ({ history, location }) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const dispatch = useDispatch();

	const userLogin = useSelector((state) => state.userLogin);
	const { loading, error, userInfo } = userLogin;

	const redirect = location.search ? location.search.split('=')[1] : '/';

	useEffect(() => {
		if (userInfo) {
			history.push(redirect);
		}
	}, [history, redirect, userInfo]);

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(login(email, password));
	};

	return (
		<FormWrap>
			<h1>Log In</h1>
			{error && <Message variant='danger'>{error}</Message>}
			{loading && <Loader />}
			<Form onSubmit={submitHandler}>
				<FormGroup controlId='formBasicEmail'>
					<FormLabel>Email address:</FormLabel>
					<FormControl
						type='email'
						placeholder='e.g. farmer@market.com'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
					<FormText className='text-muted'>
						We'll never share your email with anyone else.
					</FormText>
				</FormGroup>

				<FormGroup controlId='formBasicPassword'>
					<FormLabel>Password:</FormLabel>
					<FormControl
						type='password'
						placeholder='******'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</FormGroup>

				<Button variant='primary' type='submit'>
					Login
				</Button>
			</Form>

			<Row className='py-3'>
				<Col>
					<Link className='ml-1' to={'/register'}>
						Don't have an account? <strong>Register here</strong>
					</Link>
				</Col>
			</Row>
		</FormWrap>
	);
};

export default Login;
