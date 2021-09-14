import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Authentication = () => {
	return (
		<StyledBody>
			<StyledLink to="/developing-page">Войти</StyledLink>
			<StyledLink to="/developing-page">Зарегистрироваться</StyledLink>
		</StyledBody>
	);
};

const StyledBody = styled.div`
	padding: 14px 0 0 0;
	@media ${({ theme }) => theme.media.mediumDevices} {
		padding: 0;
	}
`;
const StyledLink = styled(Link)`
	font-size: 16px;
	font-weight: 500;
	display: inline-block;
	color: #000;
	&:first-child {
		margin: 0 41px 0 0;
		@media ${({ theme }) => theme.media.largeDevices} {
			margin: 0 25px 0 0;
		}
	}
	transition: all 0.4s ease 0s;
	@media ${({ theme }) => theme.mediaFM.largeDevices} {
		&:hover {
			color: #ffa621;
		}
	}
	@media ${({ theme }) => theme.media.largeDevices} {
		font-size: 15px;
	}
	@media ${({ theme }) => theme.media.mediumDevices} {
		display: block;
		font-size: 16px;
		padding: 20px 0;
		position: relative;
		margin: 0;
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
	@media ${({ theme }) => theme.media.smallDevices} {
		padding: 15px 0;
	}
`;

export default Authentication;
