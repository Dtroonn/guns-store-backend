import {
	SET_IS_ACTIVE_CALLBACK_POPUP,
	SET_TEXT_POPUP,
	SET_IS_ACTIVE_ORDER_SUCCESS_POPUP,
} from "../types/popups";

export const setIsActiveCallbackPopup = (value) => ({
	type: SET_IS_ACTIVE_CALLBACK_POPUP,
	payload: value,
});

export const setTextPopup = (value, text) => ({
	type: SET_TEXT_POPUP,
	payload: {
		isActive: value,
		text,
	},
});

export const setIsActiveOrderSuccessPopup = (value) => ({
	type: SET_IS_ACTIVE_ORDER_SUCCESS_POPUP,
	payload: value,
});
