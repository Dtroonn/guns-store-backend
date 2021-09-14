import produce from "immer";

import {
	SET_CATEGORIES,
	ACCEPT_ACTIVE_CATEGORY,
	SET_SORT_BY,
	SET_FILTERBAR_FILTERS,
	SET_IS_LOADING_FILTERBAR_FILTERS,
	SET_ACTIVE_FILTERBAR_FILTERS,
	SET_ACTIVE_SEARCH,
	RESET_ACTIVE_FILTERS,
} from "../types/filters";

const initialState = {
	categories: [],
	activeCategory: {},
	activeSearch: null,
	sortBy: "rating_-1",
	filterbarFilters: {
		sale: {
			productsCount: 0,
		},
		types: [],
		kinds: [],
		price: {
			min: 0,
			max: 100,
		},
	},
	isLoadingFilterbarFilters: true,
	activeFilterbarFilters: {
		types: [],
		kinds: [],
		isSale: false,
		price: {},
	},
};

const filters = (state = initialState, action) => {
	const { type, payload } = action;
	return produce(state, (draft) => {
		switch (type) {
			case SET_CATEGORIES:
				draft.categories = payload;
				break;
			case ACCEPT_ACTIVE_CATEGORY:
				draft.activeCategory = payload;
				break;
			case SET_FILTERBAR_FILTERS:
				Object.assign(draft.filterbarFilters, payload);
				draft.isLoadingFilterbarFilters = false;
				break;
			case SET_IS_LOADING_FILTERBAR_FILTERS:
				draft.isLoadingFilterbarFilters = payload;
				break;
			case SET_SORT_BY:
				draft.sortBy = payload;
				break;
			case SET_ACTIVE_FILTERBAR_FILTERS:
				Object.assign(draft.activeFilterbarFilters, payload);
				break;
			case SET_ACTIVE_SEARCH:
				draft.activeSearch = payload;
				break;
			case RESET_ACTIVE_FILTERS:
				draft.activeCategory = {};
				draft.activeSearch = null;
				draft.sortBy = "rating_-1";
				draft.activeFilterbarFilters =
					initialState.activeFilterbarFilters;

				break;
			default:
				break;
		}
	});
};

export default filters;
