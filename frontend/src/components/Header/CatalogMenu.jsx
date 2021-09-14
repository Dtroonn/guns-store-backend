import React from "react";
import styled, { css } from "styled-components";
import { Link } from "react-router-dom";

import { MenuIcon, ArrowIcon } from "../../components/icons";
import { Button } from "../forms";
import { SlideToggle } from "../../components";

import { useBreakpoint, useOutsideClick } from "../../hooks";

const MenuList = ({ items, onClickLink, ...props }) => {
	return (
		<StyledList {...props}>
			{items.map((item) => (
				<StyledListItem key={item._id}>
					<StyledLink
						onClick={onClickLink}
						to={`/products/${item.slug}`}
					>
						{item.name}
					</StyledLink>
				</StyledListItem>
			))}
		</StyledList>
	);
};

const CatalogMenu = ({ items, onClickLink, ...props }) => {
	const [isMenuOpen, setIsMenuOpen] = React.useState(false);
	const toggleIsMenuOpen = (e) => {
		setIsMenuOpen((isMenuOpen) => !isMenuOpen);
	};

	const CatalogMenuRef = React.useRef(null);
	const largeDevices = useBreakpoint("min-width", 991.98);

	useOutsideClick(largeDevices ? [CatalogMenuRef] : null, () =>
		setIsMenuOpen(false)
	);

	const handleClickLink = () => {
		setIsMenuOpen(false);
		if (onClickLink) {
			onClickLink();
		}
	};

	return (
		<StyledCatalogMenu ref={CatalogMenuRef} {...props}>
			{largeDevices && (
				<Button onClick={toggleIsMenuOpen} active={isMenuOpen}>
					<MenuIcon active={isMenuOpen} />
					<StyledTitle>Каталог товаров</StyledTitle>
				</Button>
			)}
			{!largeDevices && (
				<StyledHeaderMobile onClick={toggleIsMenuOpen}>
					<StyledTitle>Каталог</StyledTitle>
					<ArrowIcon
						rotateStart="-90deg"
						active={isMenuOpen}
						rotateEnd="0"
						duration="1s"
					/>
				</StyledHeaderMobile>
			)}
			{largeDevices ? (
				<StyledMenuWrapper isMenuOpen={isMenuOpen}>
					<MenuList
						onClickLink={handleClickLink}
						items={items}
						isMenuOpen={!isMenuOpen}
					/>
				</StyledMenuWrapper>
			) : (
				<SlideToggle
					margin="0 -1000px"
					padding="0 1000px"
					duration="1s"
					active={isMenuOpen}
				>
					<MenuList onClickLink={handleClickLink} items={items} />
				</SlideToggle>
			)}
		</StyledCatalogMenu>
	);
};

const StyledCatalogMenu = styled.div`
	position: relative;
	margin: ${({ margin }) => margin || "0"};
	@media ${({ theme }) => theme.media.smallDevices} {
		margin: ${({ marginSD, margin }) => marginSD || margin || "0"};
	}
`;
const StyledTitle = styled.div`
	font-weight: 500;
	font-size: 16px;
	color: #fff;
	margin: 0 0 0 8px;
	@media ${({ theme }) => theme.media.mediumDevices} {
		font-size: 18px;
		font-weight: 700;
		margin: 0 20px 0 0;
		color: #000;
		letter-spacing: 0.02em;
		text-transform: uppercase;
	}
`;
const StyledMenuWrapper = styled.div`
	background: #ffffff;
	z-index: 50;
	min-width: 312px;
	border-radius: 6px;
	top: 55px;
	left: 0;
	transition: all 0.4s ease 0s;
	box-shadow: 0px 2px 14px rgba(0, 0, 0, 0.1);
	position: absolute;
	transform: scale(0);
	padding: 15px;
	${({ isMenuOpen }) =>
		isMenuOpen &&
		css`
			transform: scale(1);
		`}
`;
const StyledList = styled.ul`
	@media ${({ theme }) => theme.mediaFM.largeDevices} {
		${({ isMenuOpen }) =>
			isMenuOpen &&
			css`
				opacity: 0; ;
			`}
	}
`;
const StyledListItem = styled.li`
	cursor: pointer;
	transition: all 0.4s ease 0s;
	border-radius: 6px;
	&:hover {
		@media ${({ theme }) => theme.mediaFM.largeDevices} {
			background: #ffa621;
			a {
				color: #fff;
			}
		}
	}
	@media ${({ theme }) => theme.media.mediumDevices} {
		position: relative;
		&:after {
			content: "";
			display: block;
			height: 1px;
			width: 200%;
			bottom: 0;
			left: -50%;
			position: absolute;
			background: #e9e9e9;
		}
	}
`;
const StyledLink = styled(Link)`
	display: block;
	padding: 15px 15px;
	transition: color 0.4s ease 0s;
	font-weight: 500;
	font-size: 16px;
	color: #000;
	@media ${({ theme }) => theme.media.mediumDevices} {
		padding: 20px 0;
	}
	@media ${({ theme }) => theme.media.smallDevices} {
		padding: 15px 0;
	}
`;

const StyledHeaderMobile = styled.div`
	padding: 24px 0;
	position: relative;
	display: flex;
	align-items: center;
	justify-content: space-between;
	&:after,
	&:before {
		content: "";
		display: block;
		height: 1px;
		width: 200%;
		left: -50%;
		position: absolute;
		background: #e9e9e9;
	}
	&:after {
		bottom: 0;
	}
	&:before {
		top: 0;
	}
	@media ${({ theme }) => theme.media.mediumDevices} {
		padding: 18px 0;
	}
`;

export default CatalogMenu;
