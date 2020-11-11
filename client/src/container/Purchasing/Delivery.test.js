import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../../redux/store';

import Delivery from './Delivery';

describe('Delivery', () => {
	it('renders Delivery form component', () => {
		render(
			<Provider store={store}>
				<BrowserRouter>
					<Delivery />
				</BrowserRouter>
			</Provider>
		);

		expect(screen.getByLabelText('Address:')).toBeInTheDocument();
		expect(screen.getByLabelText('City:')).toBeInTheDocument();
		expect(screen.getByLabelText('Postcode:')).toBeInTheDocument();
	});
});
