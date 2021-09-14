import { createSelector } from "reselect";

export const selectCartItems = (state) => state.cart.items;

export const selectTotalPriceCart = (state) => state.cart.totalPrice;

export const selectTotalCountCartItems = (state) => state.cart.totalCount;

export const selectCartItemsIds = createSelector(selectCartItems, (items) =>
	items.map((item) => item.product._id)
);

export const selectInitialPriceCart = createSelector(selectCartItems, (items) =>
	items.reduce(
		(price, item) =>
			price +
			(item.product.price.old
				? item.product.price.old * item.count
				: item.product.price.current * item.count),
		0
	)
);

export const selectTotalCartDiscount = createSelector(
	[selectTotalPriceCart, selectInitialPriceCart],
	(totalPrice, initialPrice) => initialPrice - totalPrice
);
