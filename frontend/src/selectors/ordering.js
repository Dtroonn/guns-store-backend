import { createSelector } from "reselect";

import { selectTotalPriceCart } from "./cart";

export const selectReceiOptions = (state) => state.ordering.receiOptions;

export const selectPayOptions = (state) => state.ordering.payOptions;

export const selectActiveReceiOption = (state) =>
	state.ordering.activeReceiOption;

export const selectActivePayOption = (state) => state.ordering.activePayOption;

export const selectTotalOrderPrice = createSelector(
	[selectTotalPriceCart, selectActiveReceiOption],
	(totalPriceCart, receiOption) => totalPriceCart + receiOption.price
);
