import React from "react";
import styled, { css } from "styled-components";
import { useDispatch, useSelector, shallowEqual } from "react-redux";

import { Container, Attention, Title, Product } from "../components";
import { CrossIcon } from "../components/icons";

import {
	clearFavorites,
	removeFromFavorites,
} from "../redux/actions/favorites";

import { addToCart } from "../redux/actions/cart";

import { selectFavoritesItems } from "../selectors/favorites";
import { selectCartItemsIds } from "../selectors/cart";

const Favorites = () => {
	const dispatch = useDispatch();
	const { items, cartItemsIds } = useSelector(
		(state) => ({
			items: selectFavoritesItems(state),
			cartItemsIds: selectCartItemsIds(state),
		}),
		shallowEqual
	);

	const handleCleansingBtnClick = (e) => {
		const isConfirm = window.confirm(
			"Вы действительно хотите удалить все товары?"
		);
		if (isConfirm) {
			dispatch(clearFavorites());
		}
	};

	const onRemoveItemFromFavoritesClick = (id) => {
		return dispatch(removeFromFavorites(id));
	};

	const onAddItemToCartClick = async (id) => {
		return dispatch(addToCart(id));
	};

	return (
		<React.Fragment>
			<StyledFavorites>
				<Container>
					{items.length > 0 && (
						<StyledHeader>
							<Title>
								избранное
								<span>{items.length}</span>
							</Title>
							<StyledCleansingBtn
								onClick={handleCleansingBtnClick}
							>
								<span>Очистить избранное полностью</span>
								<CrossIcon darkGray />
							</StyledCleansingBtn>
						</StyledHeader>
					)}
					<StyledRow>
						{items.length > 0 &&
							items.map((item) => (
								<StyledColumn key={item._id}>
									<Product
										onFavoritesButtonClick={
											onRemoveItemFromFavoritesClick
										}
										onCartButtonClick={onAddItemToCartClick}
										isFavorite={true}
										isInCart={cartItemsIds.includes(
											item._id
										)}
										{...item}
									/>
								</StyledColumn>
							))}
					</StyledRow>
					{!items.length && (
						<StyledTextForEmptyFavorites>
							У вас пока нет избранных товаров. Начните собирать
							свою коллекцию желаний нажатием кнопки в карточке
							продукта.
						</StyledTextForEmptyFavorites>
					)}
				</Container>
			</StyledFavorites>
			<Attention />
		</React.Fragment>
	);
};

const StyledFavorites = styled.div`
	margin: 0 0 86px 0;
	@media ${({ theme }) => theme.media.largeDevices} {
		margin: 0 0 66px 0;
	}
	@media ${({ theme }) => theme.media.mediumDevices} {
		margin: 0 0 50px 0;
	}
	@media ${({ theme }) => theme.media.smallDevices} {
		margin: 0 0 40px 0;
	}
	@media ${({ theme }) => theme.media.extraSmallDevices} {
		margin: 0 0 30px 0;
	}
`;

const StyledHeader = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin: 0 0 40px 0;
	@media ${({ theme }) => theme.media.mediumDevices} {
		margin: 0 0 30px 0;
	}
	@media ${({ theme }) => theme.media.smallDevices} {
		display: block;
	}
`;

const StyledCleansingBtn = styled.div`
	cursor: pointer;
	display: flex;
	align-items: center;
	span {
		font-weight: 500;
		font-size: 16px;
		color: rgba(0, 0, 0, 0.6);
		margin: 0 10px 0 0;
		transition: all 0.4s ease 0s;
	}
	@media ${({ theme }) => theme.mediaFM.largeDevices} {
		&:hover {
			span {
				color: #ffa621;
			}
			svg {
				path {
					fill: #ffa621;
				}
			}
		}
	}
	@media ${({ theme }) => theme.media.smallDevices} {
		margin: 20px 0 0 0;
	}
`;

const StyledRow = styled.div`
	display: flex;
	flex-wrap: wrap;
	margin: 0 -12px;
	@media ${({ theme }) => theme.media.mediumDevices} {
		margin: 0 -8px;
	}
`;

const StyledColumn = styled.div`
	flex: 0 0 25%;
	padding: 0 12px;
	margin: 0 0 24px 0;
	@media ${({ theme }) => theme.media.largeDevices} {
		flex: 0 0 33.333%;
	}
	@media ${({ theme }) => theme.media.mediumDevices} {
		flex: 0 0 50%;
		padding: 0 8px;
	}
	@media ${({ theme }) => theme.media.extraSmallDevices} {
		flex: 0 0 100%;
	}
`;

const StyledTextForEmptyFavorites = styled.div`
	font-weight: 500;
	font-size: 18px;
	line-height: 22px;
`;

export default Favorites;
