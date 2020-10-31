import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
	productDetailReducer,
	productListReducer,
} from './reducers/productReducer';
import { trolleyReducer } from './reducers/trolleyReducer';

const reducer = combineReducers({
	productList: productListReducer,
	productDetail: productDetailReducer,
	trolley: trolleyReducer,
});

const trolleyItemsLS = localStorage.getItem('trolleyItems')
	? JSON.parse(localStorage.getItem('trolleyItems'))
	: [];

const initialState = {
	trolley: { trolleyItems: trolleyItemsLS },
};

const store = createStore(
	reducer,
	initialState,
	composeWithDevTools(applyMiddleware(thunk))
);

export default store;
