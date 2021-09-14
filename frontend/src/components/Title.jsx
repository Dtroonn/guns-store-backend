import React from "react";
import styled, { css } from "styled-components";

const Title = (props) => {
	return <StyledTitle {...props} />;
};

const StyledTitle = styled.div`
	font-size: 32px;
	font-weight: 700;
	letter-spacing: 0.02em;
	text-transform: uppercase;
	display: block;
	color: #000;
	line-height: 36px;
	margin: ${({ margin }) => margin || "0"};
	@media ${({ theme }) => theme.media.largeDevices} {
		${({ small, extraSmall }) =>
			!small &&
			!extraSmall &&
			css`
				font-size: 28px;
				line-height: 34px;
			`}
	}
	@media ${({ theme }) => theme.media.mediumDevices} {
		${({ small, extraSmall }) =>
			!small &&
			!extraSmall &&
			css`
				font-size: 24px;
			`}
		${({ marginMD }) =>
			marginMD &&
			css`
				margin: ${marginMD};
			`}
	}
	@media ${({ theme }) => theme.media.smallDevices} {
		${({ small, extraSmall }) =>
			!small &&
			!extraSmall &&
			css`
				font-size: 20px;
				line-height: 26px;
			`}
	}
	${({ medium }) =>
		medium &&
		css`
			font-size: 24px;
			@media ${({ theme }) => theme.media.mediumDevices} {
				font-size: 20px;
			}
			@media ${({ theme }) => theme.media.extraSmallDevices} {
				font-size: 18px;
			}
		`}

	${({ small }) =>
		small &&
		css`
			line-height: 24px;
			font-size: 16px;
			text-transform: none;
			letter-spacing: 0;
		`}

	${({ extraSmall }) =>
		extraSmall &&
		css`
			font-size: 14px;
			line-height: 17px;
			@media ${({ theme }) => theme.media.mediumDevices} {
				font-size: 16px;
				line-height: 19px;
			}
		`}
	span {
		color: rgba(0, 0, 0, 0.2);
		letter-spacing: 0;
		margin: 0 0 0 24px;
		@media ${({ theme }) => theme.media.largeDevices} {
			margin: 0 0 0 18px;
		}
		@media ${({ theme }) => theme.media.smallDevices} {
			margin: 0 0 0 14px;
		}
	}
`;

export default Title;
