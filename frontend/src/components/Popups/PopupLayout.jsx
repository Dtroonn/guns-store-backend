import React from "react";
import styled, { css } from "styled-components";

import { CrossIcon } from "../../components/icons";

import { Title } from "../../components";

const PopupLayout = ({
	active,
	onClosingElementsClick,
	title,
	children,
	maxWidth,
}) => {
	const isFirstTimeDidMountRef = React.useRef(false);

	React.useEffect(() => {
		if (active) {
			const lockPaddingValue =
				window.innerWidth -
				document.querySelector("#root").offsetWidth +
				"px";
			document.body.style.paddingRight = lockPaddingValue;
			document.body.classList.add("popup-lock");
			return;
		}
		if (!active && isFirstTimeDidMountRef.current) {
			setTimeout(() => {
				document.body.style.paddingRight = "0px";
				document.body.classList.remove("popup-lock");
			}, 400);
		}
		isFirstTimeDidMountRef.current = true;
	}, [active]);

	const handleClosingElementsClick = () => {
		if (onClosingElementsClick) {
			onClosingElementsClick();
		}
	};

	return (
		<StyledPopupLayout active={active} onClick={handleClosingElementsClick}>
			<StyledContent
				maxWidth={maxWidth}
				active={active}
				onClick={(e) => e.stopPropagation()}
			>
				{title && (
					<StyledHeader>
						<Title medium>{title}</Title>
						<StyledCrossIcon onClick={handleClosingElementsClick}>
							<CrossIcon />
						</StyledCrossIcon>
					</StyledHeader>
				)}
				{children}
			</StyledContent>
		</StyledPopupLayout>
	);
};

const StyledPopupLayout = styled.div`
	top: 0;
	left: 0;
	position: fixed;
	width: 100%;
	height: 100%;
	opacity: 0;
	pointer-events: none;
	z-index: 100;
	transition: opacity 0.4s ease 0s;
	background: rgba(0, 0, 0, 0.7);
	padding: 25px;
	overflow: auto;
	display: flex;
	align-items: center;
	justify-content: center;
	${({ active }) =>
		active &&
		css`
			pointer-events: all;
			opacity: 1;
		`}
`;

const StyledContent = styled.div`
	background: #ffffff;
	border-radius: 6px;
	transform: scale(0);
	transition: all 0.4s ease 0s;
	padding: 25px 40px 25px 40px;
	margin: auto;
	max-width: ${({ maxWidth }) => maxWidth || "500px"};
	@media ${({ theme }) => theme.media.extraSmallDevices} {
		padding: 20px 25px 20px 25px;
	}
	${({ active }) =>
		active &&
		css`
			transform: scale(1);
		`};
`;

const StyledHeader = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
`;

const StyledCrossIcon = styled.div`
	margin: 0 0 0 25px;
`;

export default PopupLayout;
