import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
	productProfileReducer,
	productListReducer,
} from './reducers/productReducer';
import { trolleyReducer } from './reducers/trolleyReducer';
import {
	orderCreateReducer,
	orderDetailsReducer,
	orderPayReducer,
	orderUserListReducer,
} from './reducers/orderReducer';
import {
	loginReducer,
	registerReducer,
	profileReducer,
	updateProfileReducer,
} from './reducers/userReducer';
import {
	listAllUsersReducer,
	deleteUserReducer,
} from './reducers/adminReducer';

const reducer = combineReducers({
	productList: productListReducer,
	productProfile: productProfileReducer,
	trolley: trolleyReducer,
	userLogin: loginReducer,
	userRegister: registerReducer,
	userProfile: profileReducer,
	updatedUserProfile: updateProfileReducer,
	userList: listAllUsersReducer,
	userDelete: deleteUserReducer,
	orderCreate: orderCreateReducer,
	orderDetails: orderDetailsReducer,
	orderPay: orderPayReducer,
	orderUserList: orderUserListReducer,
});

const trolleyItemsLS = localStorage.getItem('trolleyItems')
	? JSON.parse(localStorage.getItem('trolleyItems'))
	: [];

const userInfoLS = localStorage.getItem('userInfo')
	? JSON.parse(localStorage.getItem('userInfo'))
	: null;

const deliverAddressLS = localStorage.getItem('deliveryAddress')
	? JSON.parse(localStorage.getItem('deliveryAddress'))
	: null;

const initialState = {
	trolley: { trolleyItems: trolleyItemsLS, deliveryAddress: deliverAddressLS },
	userLogin: { userInfo: userInfoLS },
};

const store = createStore(
	reducer,
	initialState,
	composeWithDevTools(applyMiddleware(thunk))
);

export default store;
