import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import { FavoritesIcon, CartIcon } from "../icons";
import { CountButton } from "../../components";
import { Button } from "../../components/forms";
import CatalogMenu from "./CatalogMenu.jsx";
import Search from "./Search.jsx";

import { useBreakpoint } from "../../hooks";

const HeaderBottom = ({
	favoritesItems,
	categories,
	activeSearch,
	totalCountInCart,
	dispatch,
}) => {
	const largeDevices = useBreakpoint("min-width", 991.98);
	return (
		<StyledHeaderBottom>
			{largeDevices && (
				<CatalogMenu items={categories} margin="0 24px 0 0" />
			)}
			<StyledBody>
				{largeDevices && (
					<Search flex="0 1 600px" activeSearch={activeSearch} />
				)}
				<StyledBodyRight>
					<StyledBodyRightColumn>
						<Link to="/favorites">
							<Button outline padding="0">
								<FavoritesIcon
									active={Boolean(favoritesItems.length)}
								/>
							</Button>
						</Link>
						<StyledItemTitle>Избранное</StyledItemTitle>
					</StyledBodyRightColumn>
					<StyledBodyRightColumn>
						<Link to="/cart">
							<CountButton count={totalCountInCart}>
								<CartIcon />
							</CountButton>
						</Link>
						<StyledItemTitle>Корзина</StyledItemTitle>
					</StyledBodyRightColumn>
				</StyledBodyRight>
			</StyledBody>
		</StyledHeaderBottom>
	);
};

const StyledHeaderBottom = styled.div`
	display: flex;
	@media ${({ theme }) => theme.media.mediumDevices} {
		flex: 1 1 auto;
	}
`;

const StyledBody = styled.div`
	display: flex;
	flex: 1 1 auto;
	justify-content: space-between;
	@media ${({ theme }) => theme.media.mediumDevices} {
		justify-content: flex-end;
	}
`;

const StyledBodyRight = styled.div`
	display: flex;
	position: relative;
	z-index: 50;
	margin: 0 0 0 35px;
	@media ${({ theme }) => theme.media.mediumDevices} {
		margin: 0 0 0 20px;
	}
`;

const StyledBodyRightColumn = styled.div`
	display: flex;
	align-items: center;
	&:first-child {
		margin: 0 26px 0 0;
		@media ${({ theme }) => theme.media.smallDevices} {
			margin: 0 12px 0 0;
		}
	}
`;

const StyledItemTitle = styled.div`
	font-weight: 500;
	font-size: 16px;
	margin: 0 0 0 12px;
	@media ${({ theme }) => theme.media.smallDevices} {
		display: none;
	}
`;

export default HeaderBottom;
