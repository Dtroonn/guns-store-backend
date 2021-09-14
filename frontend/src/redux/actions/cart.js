import { cartApi } from "../../api";

import {
	SET_CART,
	ACCEPT_ADD_TO_CART,
	ACCEPT_REMOVE_FROM_CART,
	EDIT_ITEM_IN_CART,
	CLEAR_CART,
	EDIT_ITEMS_IN_CART,
} from "../types/cart";

import { setTextPopup } from "./popups";

export const fetchCart = () => async (dispatch) => {
	try {
		const response = await cartApi.get();
		dispatch(setCart(response.data.data));
	} catch (e) {
		console.log(e);
		dispatch(setTextPopup(true));
	}
};

const setCart = (data) => ({
	type: SET_CART,
	payload: data,
});

export const addToCart = (id, count = 1, isFromCart) => async (dispatch) => {
	try {
		const response = await cartApi.add(id, count);
		dispatch(acceptAddToCart(response.data.data, count));
	} catch (e) {
		const { status, data } = e.response;
		console.log(data);
		if (data.errorCode === 2) {
			if (isFromCart) {
				dispatch(editItemInCart(data.data));
				throw e;
			}
			return dispatch(
				setTextPopup(
					true,
					"Извиняемся за неудобства! Похоже кто-то опередил вас и уже купил данный товар."
				)
			);
		}

		dispatch(setTextPopup(true, data.message));
	}
};

const acceptAddToCart = (item, count) => ({
	type: ACCEPT_ADD_TO_CART,
	payload: {
		item,
		count,
	},
});

export const editItemInCart = (item) => ({
	type: EDIT_ITEM_IN_CART,
	payload: item,
});

export const editItemsInCart = (items) => ({
	type: EDIT_ITEMS_IN_CART,
	payload: items,
});

export const removeFromCart = (id) => async (dispatch) => {
	try {
		const response = await cartApi.remove(id);
		dispatch(acceptRemoveFromCart(id));
	} catch (e) {
		console.log(e);
		dispatch(setTextPopup(true));
	}
};

const acceptRemoveFromCart = (id) => ({
	type: ACCEPT_REMOVE_FROM_CART,
	payload: id,
});

export const clearCart = () => ({
	type: CLEAR_CART,
});
