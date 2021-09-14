import React from "react";
import styled, { css } from "styled-components";

const Arrow = (props) => {
	return (
		<StyledSvg
			viewBox="0 0 14 9"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			{...props}
		>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M13.5703 2.59371C14.1432 2.02073 14.1432 1.09174 13.5703 0.518759C12.9973 -0.0542222 12.0683 -0.0542242 11.4953 0.518757L7.00041 5.01367L2.50468 0.517944C1.9317 -0.0550366 1.00272 -0.0550367 0.429737 0.517945C-0.143245 1.09093 -0.143246 2.01991 0.429735 2.59289L5.92148 8.08464C5.93469 8.09893 5.94824 8.11302 5.96212 8.1269C6.5351 8.69988 7.46409 8.69989 8.03707 8.12691L8.03788 8.12609L13.5703 2.59371Z"
			/>
		</StyledSvg>
	);
};

const StyledSvg = styled.svg`
	width: 14px;
	height: 9px;
	fill: #000;
	margin: ${({ margin }) => margin || "0"};
	transition-property: all;
	transition-duration: ${({ duration }) => duration || "0.4s"};
	transition-timing-function: ease;
	transform: rotate(${({ rotateStart }) => rotateStart || "0"});
	${({ small }) =>
		small &&
		css`
			width: 10px;
			height: 6px;
		`}
	${({ gray }) =>
		gray &&
		css`
			fill: #666666;
		`}
	${({ active }) =>
		active &&
		css`
			transform: rotate(${({ rotateEnd }) => rotateEnd || "-180deg"});
		`};
`;

export default Arrow;
