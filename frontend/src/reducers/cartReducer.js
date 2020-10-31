import * as actionTypes from '../actions/actionTypes';

export const cartReducer = (state = { cartItems: [] }, action) => {
	switch (action.type) {
		case actionTypes.CART_ADD_ITEM:
			const item = action.payload;

			const existingItem = state.cartItems.find(
				(cp) => cp.product === item.product
			);
			if (existingItem) {
				return {
					...state,
					cartItems: state.cartItems.map((cp) =>
						cp.product === existingItem.product ? item : cp
					),
				};
			} else {
				return {
					...state,
					cartItems: [...state.cartItems, item],
				};
			}

		// case actionTypes.CART_REMOVE_ITEM:
		// 	return {
		// 		products: action.payload,
		// 	};
		default:
			return state;
	}
};
