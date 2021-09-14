import React from "react";
import styled from "styled-components";

import { Button } from "../components/forms";

const CountButton = ({ count, children, ...props }) => {
	return (
		<Button
			hv="true"
			outline="true"
			padding={count ? "0 5px" : "0"}
			{...props}
		>
			{children}
			{count > 0 && <StyledCounter>{count}</StyledCounter>}
		</Button>
	);
};

const StyledCounter = styled.div`
	background: #ffa621;
	border-radius: 6px;
	padding: 0px 7px;
	margin: 0 0 0 10px;
	height: 24px;
	min-width: 24px;
	display: flex;
	align-items: center;
	justify-content: center;
	font-weight: 500;
	color: #fff;
	font-size: 14px;
	@media ${({ theme }) => theme.media.extraSmallDevices} {
		height: 22px;
		min-width: 22px;
		font-size: 13px;
	}
`;

export default CountButton;
