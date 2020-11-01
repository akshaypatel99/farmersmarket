import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
	productDetailReducer,
	productListReducer,
} from './reducers/productReducer';
import { trolleyReducer } from './reducers/trolleyReducer';
import { loginReducer, registerReducer } from './reducers/userReducer';

const reducer = combineReducers({
	productList: productListReducer,
	productDetail: productDetailReducer,
	trolley: trolleyReducer,
	userLogin: loginReducer,
	userRegister: registerReducer,
});

const trolleyItemsLS = localStorage.getItem('trolleyItems')
	? JSON.parse(localStorage.getItem('trolleyItems'))
	: [];

const userInfoLS = localStorage.getItem('userInfo')
	? JSON.parse(localStorage.getItem('userInfo'))
	: null;

const initialState = {
	trolley: { trolleyItems: trolleyItemsLS },
	userLogin: { userInfo: userInfoLS },
};

const store = createStore(
	reducer,
	initialState,
	composeWithDevTools(applyMiddleware(thunk))
);

export default store;
