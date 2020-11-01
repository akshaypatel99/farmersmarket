import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
	productProfileReducer,
	productListReducer,
} from './reducers/productReducer';
import { trolleyReducer } from './reducers/trolleyReducer';
import {
	loginReducer,
	registerReducer,
	profileReducer,
	updateProfileReducer,
} from './reducers/userReducer';

const reducer = combineReducers({
	productList: productListReducer,
	productProfile: productProfileReducer,
	trolley: trolleyReducer,
	userLogin: loginReducer,
	userRegister: registerReducer,
	userProfile: profileReducer,
	updatedUserProfile: updateProfileReducer,
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
