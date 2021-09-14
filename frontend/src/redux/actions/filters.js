import { categoriesApi, filtersApi } from "../../api";

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

import { setTextPopup } from "./popups";

export const fetchCategories = () => async (dispatch) => {
	try {
		const response = await categoriesApi.get();
		dispatch(setCategories(response.data.items));
	} catch (e) {
		console.log(e);
		dispatch(setTextPopup(true));
	}
};

export const fetchFilterbarFilters = (category, search) => async (dispatch) => {
	try {
		dispatch(setIsLoadingFilterbarFilters(true));
		const response = await filtersApi.get(category, search);
		dispatch(setFilterbarFilters(response.data.filters));
	} catch (e) {
		console.log(e);
		dispatch(setTextPopup(true));
	}
};

const setCategories = (items) => ({
	type: SET_CATEGORIES,
	payload: items,
});

export const setActiveCategory = (category, history) => (
	dispatch,
	getState
) => {
	const { categories } = getState().filters;
	const candidate = categories.find((item) => item.slug === category);
	if (!candidate) {
		return history.push("/404");
	}
	dispatch(acceptActiveCategory(candidate));
};

const acceptActiveCategory = (category) => ({
	type: ACCEPT_ACTIVE_CATEGORY,
	payload: category,
});

const setFilterbarFilters = (filters) => ({
	type: SET_FILTERBAR_FILTERS,
	payload: filters,
});

const setIsLoadingFilterbarFilters = (value) => ({
	type: SET_IS_LOADING_FILTERBAR_FILTERS,
	payload: value,
});

export const setSortBy = (value) => ({
	type: SET_SORT_BY,
	payload: value,
});

export const setActiveFilterbarFilters = (filters) => ({
	type: SET_ACTIVE_FILTERBAR_FILTERS,
	payload: filters,
});

export const setActiveSearch = (value) => ({
	type: SET_ACTIVE_SEARCH,
	payload: value,
});

export const resetActiveFilters = () => ({
	type: RESET_ACTIVE_FILTERS,
});
