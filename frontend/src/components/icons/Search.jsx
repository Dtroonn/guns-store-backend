import React from "react";
import styled from "styled-components";

const Search = (props) => {
	return (
		<StyledSvg
			width="22"
			height="22"
			viewBox="0 0 22 22"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			style={{ flex: "0 0 22px" }}
		>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M14.643 5.19388C16.9862 7.53703 16.9862 11.336 14.643 13.6792C12.2999 16.0223 8.5009 16.0223 6.15775 13.6792C3.8146 11.336 3.8146 7.53703 6.15775 5.19388C8.5009 2.85074 12.2999 2.85074 14.643 5.19388ZM16.6646 14.4136C19.1663 11.2729 18.9638 6.68624 16.0572 3.77967C12.9331 0.655475 7.86773 0.655475 4.74354 3.77967C1.61934 6.90386 1.61934 11.9692 4.74354 15.0934C7.60634 17.9562 12.099 18.1957 15.2346 15.8119L17.9821 18.5595C18.3726 18.95 19.0058 18.95 19.3963 18.5595C19.7869 18.169 19.7869 17.5358 19.3963 17.1453L16.6646 14.4136Z"
				fill="white"
			/>
		</StyledSvg>
	);
};

const StyledSvg = styled.svg``;

export default Search;
