import React from "react";
import styled, { css } from "styled-components";

const ErrorText = ({ children, ...props }) => {
	return <StyledErrorText {...props}>{children}</StyledErrorText>;
};

const StyledErrorText = styled.div`
	color: #f00;
	font-size: 15px;
	font-weight: 500;
	line-height: 17px;
	margin: ${({ margin }) => margin || "0"};
	${({ small }) =>
		small &&
		css`
			font-size: 14px;
			font-weight: 400;
		`}
`;

export default ErrorText;
