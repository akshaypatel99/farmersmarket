import { BrowserRouter, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './container/Home';
import ProductPage from './container/Product';
import TrolleyPage from './container/Trolley';

const App = () => {
	return (
		<BrowserRouter>
			<Header />
			<main className='py-3'>
				<Container>
					<Route path='/' component={HomePage} exact />
					<Route path='/product/:id' component={ProductPage} />
					<Route path='/trolley/:id?' component={TrolleyPage} />
				</Container>
			</main>
			<Footer />
		</BrowserRouter>
	);
};

export default App;
