import { BrowserRouter, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './container/HomeScreen';
import ProductScreen from './container/ProductScreen';
import CartScreen from './container/CartScreen';

const App = () => {
	return (
		<BrowserRouter>
			<Header />
			<main className='py-3'>
				<Container>
					<Route path='/' component={HomeScreen} exact />
					<Route path='/product/:id' component={ProductScreen} />
					<Route path='/cart/:id?' component={CartScreen} />
				</Container>
			</main>
			<Footer />
		</BrowserRouter>
	);
};

export default App;
