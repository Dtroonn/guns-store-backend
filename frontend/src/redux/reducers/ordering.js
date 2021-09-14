import produce from "immer";

import {
	SET_OPTIONS,
	SET_ACTIVE_PAY_OPTION,
	SET_ACTIVE_RECEI_OPTION,
} from "../types/ordering";

const initialState = {
	receiOptions: [],
	payOptions: [],
	activeReceiOption: {},
	activePayOption: {},
};

const ordering = (state = initialState, action) => {
	const { type, payload } = action;
	return produce(state, (draft) => {
		switch (type) {
			case SET_OPTIONS:
				draft.receiOptions = payload.receiOptions;
				draft.payOptions = payload.payOptions;
				draft.activeReceiOption = payload.receiOptions[0];
				draft.activePayOption = payload.payOptions[0];
				break;
			case SET_ACTIVE_RECEI_OPTION:
				const receiOption = draft.receiOptions.find(
					(option) => option._id === payload
				);
				draft.activeReceiOption = receiOption;
				break;
			case SET_ACTIVE_PAY_OPTION:
				const payOption = draft.payOptions.find(
					(option) => option._id === payload
				);
				draft.activePayOption = payOption;
				break;
			default:
				break;
		}
	});
};

export default ordering;
