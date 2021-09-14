import React from "react";
import styled from "styled-components";

const Minus = () => {
	return (
		<StyledSvg
			width="12"
			height="2"
			viewBox="0 0 12 2"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<rect
				x="12"
				y="2"
				width="12"
				height="2"
				rx="1"
				transform="rotate(180 12 2)"
				fill="white"
			/>
		</StyledSvg>
	);
};

const StyledSvg = styled.svg``;

export default Minus;
