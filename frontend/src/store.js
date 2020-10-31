import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
	productDetailReducer,
	productListReducer,
} from './reducers/productReducer';

const reducer = combineReducers({
	productList: productListReducer,
	productDetail: productDetailReducer,
});

const initialState = {};

const store = createStore(
	reducer,
	initialState,
	composeWithDevTools(applyMiddleware(thunk))
);

export default store;
