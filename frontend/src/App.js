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
import Delivery from './container/Purchasing/Delivery';
import Payment from './container/Purchasing/Payment';
import PlaceOrder from './container/Purchasing/PlaceOrder';
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
					<Route path='/delivery' component={Delivery} />
					<Route path='/payment' component={Payment} />
					<Route path='/placeorder' component={PlaceOrder} />
					<Route path='/order/:id' component={Order} />
					<Route path='/users' component={UserList} />
					<Route path='/editusers/:id/' component={EditUser} />
					<Route path='/products' component={ProductList} />
					<Route path='/editproducts/:id/' component={EditProduct} />
					<Route path='/orders' component={OrderList} />
					<Route path='/' component={Home} exact />
				</Container>
			</main>
			<Footer />
		</BrowserRouter>
	);
};

export default App;
