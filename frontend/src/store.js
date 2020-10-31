import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
	productDetailReducer,
	productListReducer,
} from './reducers/productReducer';
import { cartReducer } from './reducers/cartReducer';

const reducer = combineReducers({
	productList: productListReducer,
	productDetail: productDetailReducer,
	cart: cartReducer,
});

const cartItemsLS = localStorage.getItem('cartItems')
	? JSON.parse(localStorage.getItem('cartItems'))
	: [];

const initialState = {
	cart: { cartItems: cartItemsLS },
};

const store = createStore(
	reducer,
	initialState,
	composeWithDevTools(applyMiddleware(thunk))
);

export default store;
