import produce from "immer";

import { SET_PRODUCTS, SET_IS_LOADING, SET_PAGE } from "../types/products";

const initialState = {
	items: [],
	page: 1,
	count: 12,
	totalCount: null,
	isLoading: true,
};

const products = (state = initialState, action) => {
	const { type, payload } = action;
	return produce(state, (draft) => {
		switch (type) {
			case SET_PRODUCTS:
				draft.items = payload.items;
				draft.totalCount = payload.totalCount;
				draft.isLoading = false;
				break;
			case SET_IS_LOADING:
				draft.isLoading = payload;
				break;
			case SET_PAGE:
				draft.page = payload;
				break;
			default:
				break;
		}
	});
};

export default products;
