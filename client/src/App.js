import { BrowserRouter, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './container/Shop/Home';
import Product from './container/Shop/Product';
import Trolley from './container/Purchasing/Trolley';
import Login from './container/Auth/Login';
import Register from './container/Auth/Register';
import Profile from './container/User/Profile';
import DeliveryAddress from './container/Purchasing/DeliveryAddress';
import DeliveryDate from './container/Purchasing/DeliveryDate';
import PaymentMethod from './container/Purchasing/PaymentMethod';
import ReviewOrder from './container/Purchasing/ReviewOrder';
import Order from './container/Purchasing/Order';
import UserList from './container/Admin/UserList';
import EditUser from './container/Admin/EditUser';
import ProductList from './container/Admin/ProductList';
import EditProduct from './container/Admin/EditProduct';
import OrderList from './container/Admin/OrderList';

const App = () => {
	return (
		<BrowserRouter>
			<Header />
			<main className='py-3'>
				<Container>
					<Route path='/login' component={Login} />
					<Route path='/register' component={Register} />
					<Route path='/profile' component={Profile} />
					<Route path='/product/:id' component={Product} />
					<Route path='/trolley/:id?' component={Trolley} />
					<Route path='/delivery-address' component={DeliveryAddress} />
					<Route path='/delivery-date' component={DeliveryDate} />
					<Route path='/payment-method' component={PaymentMethod} />
					<Route path='/review-order' component={ReviewOrder} />
					<Route path='/order/:id' component={Order} />
					<Route path='/users' component={UserList} />
					<Route path='/editusers/:id/' component={EditUser} />
					<Route path='/products' component={ProductList} exact />
					<Route path='/products/:pageNumber' component={ProductList} exact />
					<Route path='/editproducts/:id/' component={EditProduct} />
					<Route path='/orders' component={OrderList} />
					<Route path='/search/:keyword' component={Home} exact />
					<Route path='/page/:pageNumber' component={Home} exact />
					<Route
						path='/search/:keyword/page/:pageNumber'
						component={Home}
						exact
					/>
					<Route path='/' component={Home} exact />
				</Container>
			</main>
			<Footer />
		</BrowserRouter>
	);
};

export default App;
