import React from "react";
import styled, { css, keyframes } from "styled-components";

const MainPreloader = () => {
	return (
		<StyledMainPreloader>
			<StyledLoader>
				<StyledLoaderItem item_1 />
				<StyledLoaderItem item_2 />
				<StyledLoaderItem item_4 />
				<StyledLoaderItem item_3 />
			</StyledLoader>
		</StyledMainPreloader>
	);
};

const loaderAnimation = keyframes`
0%, 10% {
    transform: perspective(136px) rotateX(-180deg);
    opacity: 0;
  }
  25%, 75% {
    transform: perspective(136px) rotateX(0deg);
    opacity: 1;
  }
  90%, 100% {
    transform: perspective(136px) rotateY(180deg);
    opacity: 0;
  }
`;

const StyledMainPreloader = styled.div`
	height: 100vh;
	display: flex;
	align-items: center;
	justify-content: center;
	background: #fff;
`;

const StyledLoader = styled.div`
	width: 73px;
	height: 73px;
	position: relative;
	transform: rotateZ(45deg);
`;

const StyledLoaderItem = styled.div`
	position: relative;
	transform: rotateZ(45deg);
	width: 50%;
	height: 50%;
	float: left;
	transform: scale(1.1);
	&:before {
		content: "";
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: #ffa621;
		animation: ${loaderAnimation} 2.76s infinite linear both;
		transform-origin: 100% 100%;
	}
	${({ item_2 }) =>
		item_2 &&
		css`
			transform: scale(1.1) rotateZ(90deg);
			&:before {
				animation-delay: 0.35s;
			}
		`}

	${({ item_3 }) =>
		item_3 &&
		css`
			transform: scale(1.1) rotateZ(180deg);
			&:before {
				animation-delay: 0.69s;
			}
		`}
	
	${({ item_4 }) =>
		item_4 &&
		css`
			transform: scale(1.1) rotateZ(270deg);
			&:before {
				animation-delay: 1.04s;
			}
		`}
`;

export default MainPreloader;
