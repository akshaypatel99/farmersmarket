import * as actionTypes from '../actions/actionTypes';

export const listAllUsersReducer = (state = { users: [] }, action) => {
	switch (action.type) {
		case actionTypes.ADMIN_USER_LIST_REQUEST:
			return {
				loading: true,
			};
		case actionTypes.ADMIN_USER_LIST_SUCCESS:
			return {
				loading: false,
				users: action.payload,
			};
		case actionTypes.ADMIN_USER_LIST_FAIL:
			return {
				loading: false,
				error: action.payload,
			};
		default:
			return state;
	}
};
