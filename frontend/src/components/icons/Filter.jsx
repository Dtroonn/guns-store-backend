import React from "react";
import styled, { css } from "styled-components";

const Filter = (props) => {
	return (
		<StyledSvg
			width="22"
			height="22"
			viewBox="0 0 22 22"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			{...props}
		>
			<path
				d="M21.9026 0.655981C21.7557 0.375135 21.4643 0.199219 21.1474 0.199219H0.852668C0.53547 0.199219 0.244699 0.374877 0.0974434 0.655981C-0.0498118 0.937085 -0.0290577 1.27646 0.151456 1.53711L7.78814 12.5739V20.9487C7.78814 21.4197 8.16988 21.8015 8.64086 21.8015H13.3593C13.8302 21.8015 14.212 21.4197 14.212 20.9487V12.5739L21.8486 1.53715C22.0288 1.2762 22.0496 0.936828 21.9026 0.655981ZM12.658 11.8227C12.5594 11.9654 12.5065 12.1345 12.5065 12.3079V20.0961H9.49354V12.3078C9.49354 12.1345 9.44069 11.9653 9.34203 11.8226L2.47965 1.90467H19.5207L12.658 11.8227Z"
				fill="black"
				fillOpacity="0.2"
			/>
		</StyledSvg>
	);
};

const StyledSvg = styled.svg`
	${({ active }) =>
		active &&
		css`
			path {
				fill-opacity: 1;
				fill: #ffa621;
			}
		`}
`;

export default Filter;
