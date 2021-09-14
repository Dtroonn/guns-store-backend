import produce from "immer";

import {
	SET_IS_ACTIVE_CALLBACK_POPUP,
	SET_TEXT_POPUP,
	SET_IS_ACTIVE_ORDER_SUCCESS_POPUP,
} from "../types/popups";

const initialState = {
	isActiveCallbackPopup: false,
	isActiveOrderSuccessPopup: false,
	textPopup: {
		isActive: false,
		text: "",
	},
};

const popups = (state = initialState, action) => {
	const { type, payload } = action;
	return produce(state, (draft) => {
		switch (type) {
			case SET_IS_ACTIVE_CALLBACK_POPUP:
				draft.isActiveCallbackPopup = payload;
				break;
			case SET_TEXT_POPUP:
				Object.assign(draft.textPopup, payload);
				break;
			case SET_IS_ACTIVE_ORDER_SUCCESS_POPUP:
				draft.isActiveOrderSuccessPopup = payload;
				break;
			default:
				break;
		}
	});
};

export default popups;
