import React from "react";
import styled from "styled-components";

const Plus = () => {
	return (
		<StyledSvg
			width="12"
			height="12"
			viewBox="0 0 12 12"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M5 11C5 11.5523 5.44772 12 6 12C6.55228 12 7 11.5523 7 11V7L11 7C11.5523 7 12 6.55228 12 6C12 5.44771 11.5523 5 11 5L7 5V1C7 0.447715 6.55228 0 6 0C5.44772 0 5 0.447715 5 1V5L1 5C0.447715 5 0 5.44772 0 6C0 6.55229 0.447715 7 1 7L5 7V11Z"
				fill="white"
			/>
		</StyledSvg>
	);
};

const StyledSvg = styled.svg``;

export default Plus;
