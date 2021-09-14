import produce from "immer";

import {
	SET_FAVORITES,
	ACCEPT_ADD_TO_FAVORITES,
	ACCEPT_REMOVE_FROM_FAVORITES,
} from "../types/favorites";

const initialState = {
	items: [],
};

const favorites = (state = initialState, action) => {
	const { type, payload } = action;
	return produce(state, (draft) => {
		switch (type) {
			case SET_FAVORITES:
				draft.items = payload;
				break;
			case ACCEPT_ADD_TO_FAVORITES:
				draft.items.push(payload);
				break;
			case ACCEPT_REMOVE_FROM_FAVORITES:
				draft.items = draft.items.filter(
					(item) => item._id !== payload
				);
				break;
			default:
				break;
		}
	});
};

export default favorites;
