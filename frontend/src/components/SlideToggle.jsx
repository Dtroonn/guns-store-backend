import React from "react";
import styled, { css } from "styled-components";

const SlideToggle = ({ active, ...props }) => {
	const containerRef = React.useRef(null);
	const childElemOfffsetHeight =
		containerRef.current && containerRef.current.firstChild.offsetHeight;
	return (
		<StyledContainer
			ref={containerRef}
			active={active}
			height={active ? childElemOfffsetHeight : 0}
			{...props}
		>
			{props.children}
		</StyledContainer>
	);
};

const StyledContainer = styled.div`
	overflow: hidden;
	transition-property: all;
	transition-duration: ${({ duration }) => duration || "0.4s"};
	transition-timing-function: ${({ transitionFunction }) =>
		transitionFunction || "ease"};
	height: 0;
	margin: ${({ margin }) => margin || "0"};
	padding: ${({ padding }) => padding || "0"};
	${({ active }) =>
		active &&
		css`
			height: ${({ height }) => `${height}px`};
		`};
`;

export default SlideToggle;
