import React from "react";
import styled, { css } from "styled-components";
import { useSelector, useDispatch, shallowEqual } from "react-redux";

import {
	Container,
	Title,
	CartProduct,
	OrderingForm,
	EmptyCartBlock,
} from "../components";
import { Button } from "../components/forms";

import { removeFromCart, addToCart } from "../redux/actions/cart";

import {
	selectCartItems,
	selectInitialPriceCart,
	selectTotalPriceCart,
	selectTotalCartDiscount,
	selectTotalCountCartItems,
} from "../selectors/cart";

import {
	selectReceiOptions,
	selectPayOptions,
	selectActiveReceiOption,
	selectActivePayOption,
	selectTotalOrderPrice,
} from "../selectors/ordering";

const Cart = () => {
	const dispatch = useDispatch();
	const {
		items,
		totalCountCartItems,
		totalPriceCart,
		initialPriceCart,
		totalCartDiscount,
		receiOptions,
		payOptions,
		activeReceiOption,
		activePayOption,
		totalOrderPrice,
	} = useSelector(
		(state) => ({
			items: selectCartItems(state),
			totalCountCartItems: selectTotalCountCartItems(state),
			totalPriceCart: selectTotalPriceCart(state),
			initialPriceCart: selectInitialPriceCart(state),
			totalCartDiscount: selectTotalCartDiscount(state),
			receiOptions: selectReceiOptions(state),
			payOptions: selectPayOptions(state),
			activeReceiOption: selectActiveReceiOption(state),
			activePayOption: selectActivePayOption(state),
			totalOrderPrice: selectTotalOrderPrice(state),
		}),
		shallowEqual
	);

	const onDeleteItemFromCartClick = (id) => {
		return dispatch(removeFromCart(id));
	};

	const onAddItemToCartClick = (id, count) => {
		return dispatch(addToCart(id, count, true));
	};

	if (totalCountCartItems === 0) {
		return <EmptyCartBlock />;
	}

	return (
		<StyledCart>
			<Container>
				<Title>оформление заказа</Title>
				<StyledProducts>
					<Title medium>
						Моя корзина <span>{totalCountCartItems}</span>
					</Title>
					<StyledProductsBody>
						{items.length > 0 &&
							items.map((item) => (
								<CartProduct
									key={item.product._id}
									{...item.product}
									totalCountInCart={item.count}
									onDeleteButtonClick={
										onDeleteItemFromCartClick
									}
									onAddButtonClick={onAddItemToCartClick}
								/>
							))}
					</StyledProductsBody>
					<StyledTotalProductsCost>
						<Title extraSmall>Товаров на сумму:</Title>
						<StyledTotalProductsCostPrice>
							{totalPriceCart} руб.
						</StyledTotalProductsCostPrice>
					</StyledTotalProductsCost>
				</StyledProducts>
				<StyledFormAndTotal>
					<StyledFormAndTotalColumn>
						<OrderingForm
							receiOptions={receiOptions}
							payOptions={payOptions}
							activeReceiOption={activeReceiOption}
							activePayOption={activePayOption}
							dispatch={dispatch}
						/>
					</StyledFormAndTotalColumn>
					<StyledFormAndTotalColumn>
						<StyledTotalBlock>
							<StyledTotalBlockBody>
								<StyledTotalItem>
									<StyledTotalItemLabel>
										Товары ({totalCountCartItems})
									</StyledTotalItemLabel>
									<StyledTotalItemLine></StyledTotalItemLine>
									<StyledTotalItemPrice>
										{initialPriceCart} руб.
									</StyledTotalItemPrice>
								</StyledTotalItem>
								<StyledTotalItem>
									<StyledTotalItemLabel>
										Скидка на товары
									</StyledTotalItemLabel>
									<StyledTotalItemLine></StyledTotalItemLine>
									<StyledTotalItemPrice red>
										- {totalCartDiscount} руб.
									</StyledTotalItemPrice>
								</StyledTotalItem>
								<StyledTotalItem>
									<StyledTotalItemLabel>
										{activeReceiOption.title}
									</StyledTotalItemLabel>
									<StyledTotalItemLine></StyledTotalItemLine>
									<StyledTotalItemPrice>
										{activeReceiOption.price} руб.
									</StyledTotalItemPrice>
								</StyledTotalItem>
								<StyledTotalItem>
									<StyledTotalItemLabel>
										Оплата
									</StyledTotalItemLabel>
									<StyledTotalItemLine></StyledTotalItemLine>
									<StyledTotalItemRightText>
										{activePayOption.title}
									</StyledTotalItemRightText>
								</StyledTotalItem>
							</StyledTotalBlockBody>
							<StyledTotal>
								<StyledTotalText>итого:</StyledTotalText>
								<StyledTotalPrice>
									{totalOrderPrice} руб.
								</StyledTotalPrice>
							</StyledTotal>
						</StyledTotalBlock>
					</StyledFormAndTotalColumn>
				</StyledFormAndTotal>
			</Container>
		</StyledCart>
	);
};

const StyledCart = styled.div`
	position: relative;
`;

const StyledProducts = styled.div`
	margin: 60px 0 100px 0;
	@media ${({ theme }) => theme.media.mediumDevices} {
		margin: 40px 0 80px 0;
	}
	@media ${({ theme }) => theme.media.smallDevices} {
		margin: 30px 0 60px 0;
	}
	@media ${({ theme }) => theme.media.extraSmallDevices} {
		margin: 30px 0 40px 0;
	}
`;

const StyledProductsBody = styled.div`
	margin: 40px 0 30px 0;
	@media ${({ theme }) => theme.media.mediumDevices} {
		margin: 30px 0;
	}
	@media ${({ theme }) => theme.media.smallDevices} {
		margin: 20px 0 20px 0;
	}
`;

const StyledTotalProductsCost = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-end;
	@media ${({ theme }) => theme.media.extraSmallDevices} {
		display: block;
	}
`;

const StyledTotalProductsCostPrice = styled.div`
	font-size: 24px;
	margin: 0 0 0 50px;
	letter-spacing: 0.02em;
	font-weight: 700;
	@media ${({ theme }) => theme.media.extraSmallDevices} {
		margin: 12px 0 0 0;
	}
`;

const StyledFormAndTotal = styled.div`
	display: flex;
	@media ${({ theme }) => theme.media.mediumDevices} {
		display: block;
	}
`;

const StyledFormAndTotalColumn = styled.div`
	position: relative;
	&:first-child {
		flex: 1 1 auto;
		@media ${({ theme }) => theme.media.mediumDevices} {
			padding: 0 0 425px 0;
		}
		@media ${({ theme }) => theme.media.extraSmallDevices} {
			padding: 0 0 355px 0;
		}
	}
	&:last-child {
		margin: 0 0 0 24px;
		@media ${({ theme }) => theme.media.mediumDevices} {
			margin: 0;
			position: absolute;
			bottom: 135px;
			width: 100%;
		}
		@media ${({ theme }) => theme.media.smallDevices} {
			padding: 0 10px;
			left: 0;
		}
		@media ${({ theme }) => theme.media.extraSmallDevices} {
			bottom: 140px;
		}
	}
`;

const StyledTotalBlock = styled.div`
	min-width: 392px;
	border-radius: 6px;
	border: 1px solid #e9e9e9;
	max-height: 270px;
	overflow: hidden;
	@media ${({ theme }) => theme.media.mediumDevices} {
		min-width: 300px;
		max-width: 392px;
	}
	@media ${({ theme }) => theme.media.extraSmallDevices} {
		border: 0;
	}
`;

const StyledTotalBlockBody = styled.div`
	padding: 24px 20px;
	border-bottom: 1px solid #e9e9e9;
	@media ${({ theme }) => theme.media.extraSmallDevices} {
		border: 0;
		padding: 0;
	}
`;

const StyledTotalItem = styled.div`
	display: flex;
	align-items: flex-end;
	margin: 0 0 24px 0;
	@media ${({ theme }) => theme.media.extraSmallDevices} {
		margin: 0 0 20px 0;
	}
	&:last-child {
		margin: 0;
	}
`;

const StyledTotalItemLabel = styled.div`
	font-size: 16px;
	color: rgba(0, 0, 0, 0.6);
`;

const StyledTotalItemLine = styled.span`
	height: 1px;
	background: #e9e9e9;
	margin: 0 4px;
	flex: 1 1 auto;
	min-width: 25px;
`;

const StyledTotalItemPrice = styled.div`
	font-weight: 700;
	font-size: 16px;
	${({ red }) =>
		red &&
		css`
			color: #f00;
		`}
`;

const StyledTotalItemRightText = styled(StyledTotalItemPrice)`
	text-transform: lowercase;
`;

const StyledTotal = styled.div`
	display: flex;
	font-weight: 700;
	font-size: 24px;
	letter-spacing: 0.02em;
	text-transform: uppercase;
	padding: 24px 20px;
	justify-content: space-between;
	@media ${({ theme }) => theme.media.extraSmallDevices} {
		margin: 30px 0 0 0;
		font-size: 22px;
		padding: 0;
	}
`;

const StyledTotalText = styled.div`
	margin: 0 20px 0 0;
`;

const StyledTotalPrice = styled.div``;

export default Cart;
