import produce from "immer";

import { SET_IS_LOADED } from "../types/initialize";

const initialState = {
	isLoaded: false,
};

const initialize = (state = initialState, action) => {
	const { type, payload } = action;
	return produce(state, (draft) => {
		switch (type) {
			case SET_IS_LOADED:
				draft.isLoaded = payload;
				break;
			default:
				break;
		}
	});
};

export default initialize;
