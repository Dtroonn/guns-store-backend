import React from "react";
import styled from "styled-components";

const AdaptiveImage = ({ src, ...props }) => {
	return (
		<StyledImageWrapper {...props}>
			<StyledImage src={src} />
		</StyledImageWrapper>
	);
};

const StyledImageWrapper = styled.div`
	position: relative;
	height: ${({ height }) => height || "auto"};
	width: ${({ width }) => width || "auto"};
	margin: ${({ margin }) => margin || "0"};
	padding: ${({ padding }) => padding || "0"};
`;

const StyledImage = styled.img`
	object-fit: cover;
	position: absolute;
	height: 100%;
	width: 100%;
	top: 0;
	left: 0;
`;

export default AdaptiveImage;
