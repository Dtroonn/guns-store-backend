import { createSelector } from "reselect";

export const selectFilterbarFilters = (state) => state.filters.filterbarFilters;

export const selectActiveFilterbarFilters = (state) =>
	state.filters.activeFilterbarFilters;

export const selectCountActiveFilterbarFilters = createSelector(
	[selectFilterbarFilters, selectActiveFilterbarFilters],
	(filterbarFilters, activeFilterbarFilters) => {
		const initialPrice = filterbarFilters.price;
		const { types, kinds, isSale, price } = activeFilterbarFilters;
		let totalCount = 0;

		totalCount += types.length + kinds.length;

		if (isSale) {
			totalCount++;
		}

		if (Object.keys(price).length) {
			console.log(price.min, initialPrice.min);
			console.log(price.max, initialPrice.max);
			if (
				price.min !== initialPrice.min ||
				price.max !== initialPrice.max
			) {
				totalCount++;
			}
		}

		return totalCount;
	}
);
