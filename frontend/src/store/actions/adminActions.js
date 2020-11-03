import * as actionTypes from '../actions/actionTypes';
import axios from 'axios';

export const listAllUsers = () => async (dispatch, getState) => {
	try {
		dispatch({
			type: actionTypes.ADMIN_USER_LIST_REQUEST,
		});

		const {
			userLogin: { userInfo },
		} = getState();

		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
		};

		const { data } = await axios.get(`api/admin/users/`, config);

		dispatch({
			type: actionTypes.ADMIN_USER_LIST_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: actionTypes.ADMIN_USER_LIST_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const deleteUser = (id) => async (dispatch, getState) => {
	try {
		dispatch({
			type: actionTypes.ADMIN_USER_DELETE_REQUEST,
		});

		const {
			userLogin: { userInfo },
		} = getState();

		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
		};

		await axios.delete(`api/admin/users/${id}`, config);

		dispatch({
			type: actionTypes.ADMIN_USER_DELETE_SUCCESS,
		});
	} catch (error) {
		dispatch({
			type: actionTypes.ADMIN_USER_DELETE_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};
