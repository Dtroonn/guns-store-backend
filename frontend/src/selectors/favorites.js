import { createSelector } from "reselect";

export const selectFavoritesItems = (state) => state.favorites.items;

export const selectFavoritesItemsIds = createSelector(
	selectFavoritesItems,
	(items) => items.map((item) => item._id)
);
