import React from "react";
import styled, { css } from "styled-components";
import { Link } from "react-router-dom";

import { Title } from "../../components";
import { FavoritesIcon, CartIcon } from "../../components/icons";
import { Button } from "../../components/forms";

const Product = ({
	name,
	category,
	price,
	count,
	isFavorite,
	isInCart,
	imgUrl,
	_id,
	onFavoritesButtonClick,
	onCartButtonClick,
}) => {
	const cleanupFunctionRef = React.useRef(false);

	const [
		isDisabledFavoritesButton,
		setIsDisabledFavoritesButton,
	] = React.useState(false);

	const [showCartButtonLoader, setShowCartButtonLoader] = React.useState(
		false
	);

	const handleFavoritesButtonClick = async () => {
		if (onFavoritesButtonClick) {
			setIsDisabledFavoritesButton(true);
			await onFavoritesButtonClick(_id, isFavorite);
			if (!cleanupFunctionRef.current) {
				setIsDisabledFavoritesButton(false);
			}
		}
	};

	const handleCartButtonClick = async () => {
		if (onCartButtonClick) {
			setShowCartButtonLoader(true);
			await onCartButtonClick(_id);
			if (!cleanupFunctionRef.current) {
				setShowCartButtonLoader(false);
			}
		}
	};

	React.useEffect(() => {
		return () => (cleanupFunctionRef.current = true);
	}, []);

	return (
		<StyledProduct>
			<StyledBody>
				<StyledTop>
					<StyledImageWrapper>
						<StyledImage src={imgUrl} alt={name} />
					</StyledImageWrapper>
					<StyledTags>
						{price.old && <StyledTag>скидка</StyledTag>}
						{count === 1 && <StyledTag red>Последний</StyledTag>}
						{count > 1 && count <= 10 && (
							<StyledTag yellow>заканчивается</StyledTag>
						)}
						{count === 0 && <StyledTag red>закончился</StyledTag>}
					</StyledTags>
					<StyledFavoritesButton
						disable={isDisabledFavoritesButton}
						onClick={handleFavoritesButtonClick}
					>
						<FavoritesIcon active={isFavorite} hv />
					</StyledFavoritesButton>
				</StyledTop>
				<StyledText>
					<Title margin="0 0 7px 0" to="/" small="true">
						{name}
					</Title>
					<StyledCategory to={`/products/${category.slug}`}>
						{category.name}
					</StyledCategory>
				</StyledText>
				<StyledBottom>
					<StyledPrice>
						{price.old && (
							<StyledOldPrice>{price.old}</StyledOldPrice>
						)}
						<StyledCurrentPrice sale={price.old}>
							{price.current} руб.
						</StyledCurrentPrice>
					</StyledPrice>
					{isInCart ? (
						<Link to="/cart">
							<Button green>
								<CartIcon white />
							</Button>
						</Link>
					) : (
						<Button
							onClick={handleCartButtonClick}
							showLoader={showCartButtonLoader}
							disable={!Boolean(count)}
						>
							<CartIcon white />
						</Button>
					)}
				</StyledBottom>
			</StyledBody>
		</StyledProduct>
	);
};

const StyledProduct = styled.div`
	border-radius: 6px;
	border: 1px solid #e9e9e9;
	padding: 20px;
	height: 100%;
`;

const StyledBody = styled.div`
	display: flex;
	height: 100%;
	flex-direction: column;
`;

const StyledTop = styled.div`
	position: relative;
	padding: 35px 0 0 0;
`;

const StyledTags = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	display: flex;
	flex-direction: column;
`;

const StyledTag = styled.div`
	padding: 4px 6px;
	letter-spacing: 0.02em;
	text-transform: uppercase;
	color: #fff;
	background: #999999;
	border-radius: 4px;
	font-size: 14px;
	line-height: 16px;
	font-weight: 700;
	margin: 0 0 7px 0;
	text-align: center;
	${({ red }) =>
		red &&
		css`
			background: #f00;
		`}
	${({ yellow }) =>
		yellow &&
		css`
			background: #f5cb42;
		`}
	&:last-child {
		margin: 0;
	}
`;

const StyledFavoritesButton = styled.div`
	position: absolute;
	right: 10px;
	top: 0;
	height: 24px;
	cursor: pointer;
	z-index: 5;
	${({ disable }) =>
		disable &&
		css`
			pointer-events: none;
		`}
`;

const StyledText = styled.div`
	flex: 1 1 auto;
`;

const StyledBottom = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: flex-end;
	margin: 35px 0 0 0;
`;

const StyledCategory = styled(Link)`
	font-size: 14px;
	color: rgba(0, 0, 0, 0.4);
	line-height: 17px;
`;

const StyledPrice = styled.div`
	margin: 0 20px 0 0;
`;

const StyledCurrentPrice = styled.div`
	font-size: 18px;
	font-weight: 700;
	${({ sale }) =>
		sale &&
		css`
			color: #f00;
		`}
`;

const StyledOldPrice = styled.div`
	font-size: 14px;
	text-decoration-line: line-through;
	color: #999999;
	font-weight: 700;
	margin: 0 0 8px 0;
`;

const StyledImageWrapper = styled.div`
	max-width: 100%;
	margin: 0 0 20px 0;
`;

const StyledImage = styled.img`
	width: 100%;
`;

export default Product;
