import {
	SET_FAVORITES,
	ACCEPT_ADD_TO_FAVORITES,
	ACCEPT_REMOVE_FROM_FAVORITES,
} from "../types/favorites";

import { favoritesApi } from "../../api";

import { setTextPopup } from "./popups";

export const fetchFavorites = () => async (dispatch) => {
	try {
		const response = await favoritesApi.get();
		dispatch(setFavorites(response.data.items));
	} catch (e) {
		console.log(e);
		dispatch(setTextPopup(true));
	}
};

const setFavorites = (items) => ({
	type: SET_FAVORITES,
	payload: items,
});

export const addToFavorites = (id) => async (dispatch, getState) => {
	try {
		const items = getState().favorites.items;
		if (items.length === 10) {
			return dispatch(
				setTextPopup(
					true,
					"Вы не можете добавить в избранное более 10 товаров"
				)
			);
		}
		const response = await favoritesApi.add(id);
		dispatch(acceptToFavorites(response.data.data));
	} catch (e) {
		console.log(e);
		dispatch(setTextPopup(true));
	}
};

const acceptToFavorites = (item) => ({
	type: ACCEPT_ADD_TO_FAVORITES,
	payload: item,
});

export const removeFromFavorites = (id) => async (dispatch) => {
	try {
		await favoritesApi.remove(id);
		dispatch(acceptRemoveFromFavorites(id));
	} catch (e) {
		console.log(e);
		dispatch(setTextPopup(true));
	}
};

const acceptRemoveFromFavorites = (id) => ({
	type: ACCEPT_REMOVE_FROM_FAVORITES,
	payload: id,
});

export const clearFavorites = () => async (dispatch) => {
	try {
		await favoritesApi.clear();
		dispatch(setFavorites([]));
	} catch (e) {
		console.log(e);
		dispatch(setTextPopup(true));
	}
};
