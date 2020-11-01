import * as actionTypes from '../actions/actionTypes';

export const orderCreateReducer = (state = {}, action) => {
	switch (action.type) {
		case actionTypes.ORDER_CREATE_REQUEST:
			return {
				loading: true,
			};
		case actionTypes.ORDER_CREATE_SUCCESS:
			return {
				loading: false,
				successful: true,
				order: action.payload,
			};
		case actionTypes.ORDER_CREATE_FAIL:
			return {
				loading: false,
				error: action.payload,
			};
		default:
			return state;
	}
};

export const orderDetailsReducer = (
	state = { loading: true, orderItems: [], shippingAddress: {} },
	action
) => {
	switch (action.type) {
		case actionTypes.ORDER_DETAILS_REQUEST:
			return {
				...state,
				loading: true,
			};
		case actionTypes.ORDER_DETAILS_SUCCESS:
			return {
				loading: false,
				order: action.payload,
			};
		case actionTypes.ORDER_DETAILS_FAIL:
			return {
				loading: false,
				error: action.payload,
			};
		default:
			return state;
	}
};
