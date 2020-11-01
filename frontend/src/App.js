import { BrowserRouter, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './container/Home';
import Product from './container/Product';
import Trolley from './container/Trolley';
import Login from './container/Login';
import Register from './container/Register';
import Profile from './container/Profile';

const App = () => {
	return (
		<BrowserRouter>
			<Header />
			<main className='py-3'>
				<Container>
					<Route path='/register' component={Register} />
					<Route path='/login' component={Login} />
					<Route path='/profile' component={Profile} />
					<Route path='/product/:id' component={Product} />
					<Route path='/trolley/:id?' component={Trolley} />
					<Route path='/' component={Home} exact />
				</Container>
			</main>
			<Footer />
		</BrowserRouter>
	);
};

export default App;
