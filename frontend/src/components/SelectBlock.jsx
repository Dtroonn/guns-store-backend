import React from "react";
import styled, { css } from "styled-components";

import { Radio } from "../components/forms";
import { ArrowIcon, CrossIcon } from "../components/icons";
import { useBreakpoint, useOutsideClick } from "../hooks";

const SelectBlock = React.memo(
	({ title, items, selectedValue, onItemSelect, ...props }) => {
		const largeDevices = useBreakpoint("min-width", 991.98);
		const selectBodyRef = React.useRef(null);
		const selectHeaderRef = React.useRef(null);

		const [isSelectOpen, setIsSelectOpen] = React.useState(false);

		useOutsideClick([selectHeaderRef, selectBodyRef], () => {
			setIsSelectOpen((isSelectOpen) => {
				if (isSelectOpen) {
					document.body.classList.remove("lock");
					return false;
				}
			});
		});

		const toggleisSelectOpen = (e) => {
			setIsSelectOpen((isSelectOpen) => !isSelectOpen);
			if (!largeDevices) {
				document.body.classList.toggle("lock");
			}
		};

		const handleRadioChange = (e) => {
			if (onItemSelect) {
				onItemSelect(e.target.value);
			}
			toggleisSelectOpen();
		};

		const activeLabel = items.find((item) => item.value === selectedValue)
			.name;

		return (
			<StyledSelectBlock {...props}>
				<StyledHeader
					ref={selectHeaderRef}
					onClick={toggleisSelectOpen}
				>
					<StyledTitle>
						{title}
						<span>{activeLabel}</span>
					</StyledTitle>
					<ArrowIcon small active={isSelectOpen} />
				</StyledHeader>
				<StyledBodyWrapper isSelectOpen={isSelectOpen}>
					<StyledBody ref={selectBodyRef} isSelectOpen={isSelectOpen}>
						{!largeDevices && (
							<StyledHeaderMd>
								<StyledHeaderTitleMd>
									{title}
								</StyledHeaderTitleMd>
								<CrossIcon onClick={toggleisSelectOpen} />
							</StyledHeaderMd>
						)}
						<StyledList isHidden={!isSelectOpen}>
							{items.map((item, index) => (
								<StyledListItem key={index}>
									<Radio
										name="selectItem"
										value={item.value}
										label={item.name}
										onChange={handleRadioChange}
										checked={item.value === selectedValue}
									/>
								</StyledListItem>
							))}
						</StyledList>
					</StyledBody>
				</StyledBodyWrapper>
			</StyledSelectBlock>
		);
	}
);

const StyledSelectBlock = styled.div`
	position: relative;
`;

const StyledHeader = styled.div`
	position: relative;
	cursor: pointer;
	z-index: 3;
	display: flex;
	align-items: center;
`;

const StyledTitle = styled.div`
	font-weight: 500;
	font-size: 16px;
	margin: 0 14px 0 0;
	@media ${({ theme }) => theme.media.extraSmallDevices} {
		font-size: 14px;
	}
	span {
		color: #ffa621;
		margin: 0 0 0 10px;
		text-transform: lowercase;
	}
`;

const StyledBodyWrapper = styled.div`
	top: -20px;
	left: -19px;
	position: absolute;
	z-index: 2;
	@media ${({ theme }) => theme.mediaFM.largeDevices} {
		transform: scale(0);
		transition: all 0.4s ease 0s;
		${({ isSelectOpen }) =>
			isSelectOpen &&
			css`
				transform: scale(1);
			`}
	}
	@media ${({ theme }) => theme.media.mediumDevices} {
		position: fixed;
		top: 0;
		width: 100%;
		height: 100%;
		left: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 100;
		pointer-events: none;
		&:after {
			content: "";
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			opacity: 0;
			background: rgba(0, 0, 0, 0.7);
			transition: opacity 0.4s ease 0s;
		}
		${({ isSelectOpen }) =>
			isSelectOpen &&
			css`
				visability: visible;
				pointer-events: all;
				&:after {
					opacity: 1;
				}
			`}
	}
`;

const StyledBody = styled.div`
	padding: 62px 20px 24px 20px;
	background: #ffffff;
	box-shadow: 0px 2px 14px rgba(0, 0, 0, 0.1);
	border-radius: 6px;
	min-width: 377px;
	transform: scale(0);
	transition: all 0.4s ease 0s;
	@media ${({ theme }) => theme.media.mediumDevices} {
		padding: 0;
		min-width: auto;
		flex: 0 1 392px;
		z-index: 1;
	}
	${({ isSelectOpen }) =>
		isSelectOpen &&
		css`
			transform: scale(1);
		`}
`;

const StyledList = styled.ul`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	@media ${({ theme }) => theme.media.mediumDevices} {
		padding: 30px 24px;
	}
	${({ isHidden }) =>
		isHidden &&
		css`
			opacity: 0;
		`}
`;

const StyledListItem = styled.li`
	margin: 0 0 20px 0;
	&:last-child {
		margin: 0;
	}
	@media ${({ theme }) => theme.media.mediumDevices} {
		margin: 0 0 30px 0;
	}
`;

const StyledHeaderMd = styled.div`
	padding: 30px 24px;
	border-bottom: 1px solid #e9e9e9;
	display: flex;
	align-items: center;
	justify-content: space-between;
`;
const StyledHeaderTitleMd = styled.div`
	font-size: 18px;
	font-weight: 700;
	letter-spacing: 0.02em;
	text-transform: uppercase;
`;

export default SelectBlock;
