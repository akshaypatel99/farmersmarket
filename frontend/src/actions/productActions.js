import * as actionTypes from './actionTypes';
import axios from 'axios';

export const listProducts = () => async (dispatch) => {
	try {
		dispatch({ type: actionTypes.PRODUCT_LIST_REQUEST });

		const { data } = await axios.get('/api/products');

		dispatch({
			type: actionTypes.PRODUCT_LIST_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: actionTypes.PRODUCT_LIST_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const listProductDetail = (id) => async (dispatch) => {
	try {
		dispatch({ type: actionTypes.PRODUCT_DETAIL_REQUEST });

		const { data } = await axios.get(`/api/products/${id}`);

		dispatch({
			type: actionTypes.PRODUCT_DETAIL_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: actionTypes.PRODUCT_DETAIL_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};
