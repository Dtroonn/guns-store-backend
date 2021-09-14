import { receiOptionsApi, payOptionsApi, ordersApi } from "../../api";

import {
	SET_OPTIONS,
	SET_ACTIVE_RECEI_OPTION,
	SET_ACTIVE_PAY_OPTION,
} from "../types/ordering";

import { clearCart, editItemsInCart } from "./cart";
import { setTextPopup, setIsActiveOrderSuccessPopup } from "./popups";

export const fetchOptions = () => async (dispatch) => {
	try {
		const [receiOptionsRes, payOptionsRes] = await Promise.all([
			receiOptionsApi.get(),
			payOptionsApi.get(),
		]);

		dispatch(
			setOptions(receiOptionsRes.data.items, payOptionsRes.data.items)
		);
	} catch (e) {
		console.log(e);
		dispatch(setTextPopup(true));
	}
};

const setOptions = (receiOptions, payOptions) => ({
	type: SET_OPTIONS,
	payload: {
		receiOptions,
		payOptions,
	},
});

export const setActiveReceiOption = (id) => ({
	type: SET_ACTIVE_RECEI_OPTION,
	payload: id,
});

export const setActivePayOption = (id) => ({
	type: SET_ACTIVE_PAY_OPTION,
	payload: id,
});

export const makeOrder = (data) => async (dispatch) => {
	try {
		await ordersApi.add(data);
		dispatch(setIsActiveOrderSuccessPopup(true));
		dispatch(clearCart());
	} catch (e) {
		console.log(e);
		const { status, data } = e.response;
		console.log(data);
		if (data.errorCode === 2) {
			dispatch(editItemsInCart(data.items));
			dispatch(
				setTextPopup(
					true,
					"Извиняемся за неудобства! Некоторые товары, которые вы хотели приобрести, отсутствуют на складе"
				)
			);
			return;
		}
		dispatch(setTextPopup(true));
	}
};
