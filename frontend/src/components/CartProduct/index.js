import React from "react";
import styled, { css } from "styled-components";
import { Link } from "react-router-dom";

import { CrossIcon } from "../../components/icons";
import Counter from "./Counter";

const CartProduct = ({
	_id,
	name,
	imgUrl,
	category,
	count,
	price,
	totalCountInCart,
	onDeleteButtonClick,
	onAddButtonClick,
}) => {
	const cleanupFunctionRef = React.useRef(false);
	const [isDisabledDeleteButton, setIsDisabledDeleteButton] = React.useState(
		false
	);

	React.useEffect(() => {
		return () => (cleanupFunctionRef.current = true);
	}, []);

	const handleDeleteButtonClick = async () => {
		if (onDeleteButtonClick) {
			setIsDisabledDeleteButton(true);
			await onDeleteButtonClick(_id);
			if (!cleanupFunctionRef.current) {
				setIsDisabledDeleteButton(false);
			}
		}
	};
	return (
		<StyledCartProduct>
			<StyledLeft>
				<StyledImageWrapper>
					<StyledImage src={imgUrl} alt="name" />
				</StyledImageWrapper>
				<StyledInfo>
					<StyledName>{name}</StyledName>
					<StyledCategory to={`/products/${category.slug}`}>
						{category.name}
					</StyledCategory>
					<StyledRemainingCount
						red={count === 0 || count === 1}
						yellow={count > 1 && count <= 10}
					>
						{count === 1 ? "Осталась" : "Осталось"} {count} шт.
					</StyledRemainingCount>
				</StyledInfo>
			</StyledLeft>
			<StyledRight>
				<Counter
					countInCart={totalCountInCart}
					maxCount={count}
					itemId={_id}
					onSubmit={onAddButtonClick}
				/>
				<StyledPrice>
					<StyledCurrentPrice>
						{price.current * totalCountInCart} руб.{" "}
					</StyledCurrentPrice>
					{price.old && (
						<StyledOldPrice>
							{price.old * totalCountInCart} руб.
						</StyledOldPrice>
					)}
				</StyledPrice>
				<StyledCross
					disabled={isDisabledDeleteButton}
					onClick={handleDeleteButtonClick}
				>
					<CrossIcon />
				</StyledCross>
			</StyledRight>
		</StyledCartProduct>
	);
};

const StyledCartProduct = styled.div`
	display: flex;
	padding: 0 0 30px 0;
	border-bottom: 1px solid #e9e9e9;
	justify-content: space-between;
	font-size: 0;
	margin: 0 0 30px 0;
	@media ${({ theme }) => theme.media.mediumDevices} {
		flex-direction: column;
	}
	@media ${({ theme }) => theme.media.smallDevices} {
		padding: 0 0 20px 0;
		margin: 0 0 20px 0;
	}
	&:last-child {
		margin: 0;
	}
`;

const StyledLeft = styled.div`
	display: flex;
	flex: 0 1 490px;
	margin: 0 100px 0 0;
	@media ${({ theme }) => theme.media.mediumDevices} {
		margin: 0 0 10px 0;
		flex: 0 1 auto;
	}
	@media ${({ theme }) => theme.media.smallDevices} {
		margin: 0 0 20px 0;
	}
	@media ${({ theme }) => theme.media.extraSmallDevices} {
		justify-content: space-between;
	}
`;

const StyledRight = styled.div`
	display: flex;
	align-self: flex-start;
	flex: 0 1 510px;
	padding: 20px 10px 0 0;
	@media ${({ theme }) => theme.media.mediumDevices} {
		padding: 0 10px 0 0;
		flex: 0 1 auto;
		align-self: flex-end;
		max-width: 420px;
		flex-wrap: wrap;
	}
	@media ${({ theme }) => theme.media.extraSmallDevices} {
		max-width: none;
		width: 100%;
	}
`;
const StyledPrice = styled.div`
	margin: 0 25px 0 0;
	letter-spacing: 0.02em;
	font-weight: 700;
	@media ${({ theme }) => theme.media.extraSmallDevices} {
		order: 1;
		flex: 0 0 100%;
		display: flex;
		align-items: center;
		margin: 0 0 20px 0;
	}
`;

const StyledCurrentPrice = styled.div`
	font-size: 18px;
`;

const StyledOldPrice = styled.div`
	text-decoration-line: line-through;
	font-size: 14px;
	color: #999999;
	margin: 8px 0 0 0;
	@media ${({ theme }) => theme.media.extraSmallDevices} {
		margin: 0 0 0 24px;
	}
`;

const StyledCross = styled.div`
	margin: 0 0 0 auto;
	${({ disabled }) =>
		disabled &&
		css`
			pointer-events: none;
		`}
	@media ${({ theme }) => theme.media.extraSmallDevices} {
		order: 3;
	}
`;

const StyledImageWrapper = styled.div`
	flex: 0 0 184px;
	margin: 0 24px 0 0;
	@media ${({ theme }) => theme.media.extraSmallDevices} {
		flex: 0 0 144px;
		order: 2;
		margin: 0 0 0 24px;
	}
`;

const StyledImage = styled.img`
	max-width: 100%;
	border-radius: 6px;
	border: 1px solid #e9e9e9;
`;

const StyledInfo = styled.div`
	padding: 20px 0 0 0;
	@media ${({ theme }) => theme.media.mediumDevices} {
		padding: 0;
	}
	@media ${({ theme }) => theme.media.extraSmallDevices} {
		order: 1;
	}
`;

const StyledName = styled.div`
	font-size: 18px;
	line-height: 24px;
	letter-spacing: 0.02em;
	font-weight: 700;
	margin: 0 0 10px 0;
	@media ${({ theme }) => theme.media.extraSmallDevices} {
		font-size: 16px;
		line-height: 21px;
		margin: 0 0 8px 0;
	}
`;

const StyledCategory = styled(Link)`
	font-size: 14px;
	line-height: 24px;
	color: rgba(0, 0, 0, 0.6);
	line-height: 18px;
`;

const StyledRemainingCount = styled.div`
	font-weight: 500;
	font-size: 16px;
	color: #129968;
	margin: 20px 0 0 0;
	@media ${({ theme }) => theme.media.extraSmallDevices} {
		font-size: 14px;
		margin: 12px 0 0 0;
	}

	${({ red }) =>
		red &&
		css`
			color: #f00;
		`}
	${({ yellow }) =>
		yellow &&
		css`
			color: #f5cb42;
		`}
`;

export default CartProduct;
