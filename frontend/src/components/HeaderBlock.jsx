import React from "react";
import styled, { css } from "styled-components";

import { Title } from "../components";

const HeaderBlock = ({ title, children, ...props }) => {
	return (
		<StyledHeaderBlock>
			<Title {...props}>{title}</Title>
			<StyledText {...props}>{children}</StyledText>
		</StyledHeaderBlock>
	);
};

const StyledHeaderBlock = styled.div``;

const StyledText = styled.div`
	font-size: 16px;
	line-height: 24px;
	margin: 38px 0 0 0;
	max-width: ${({ maxWidth }) => maxWidth || "none"};
	span {
		color: #000;
		font-weight: 700;
	}

	${({ medium }) =>
		medium &&
		css`
			margin: 18px 0 0 0;
		`}
`;

export default HeaderBlock;
