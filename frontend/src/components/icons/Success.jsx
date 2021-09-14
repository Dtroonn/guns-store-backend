import React from "react";
import styled, { css } from "styled-components";

const Success = (props) => {
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
				d="M16.4922 7.38268C16.1536 7.02561 15.589 7.00988 15.2314 7.34938L9.53757 12.7492L6.82178 9.96085C6.47781 9.60794 5.91385 9.60021 5.56064 9.94422C5.20774 10.2879 5.20031 10.8524 5.54397 11.2053L8.8737 14.624C9.0482 14.8033 9.2801 14.8936 9.51261 14.8936C9.73321 14.8936 9.95381 14.8121 10.1265 14.6489L16.459 8.64355C16.8163 8.30462 16.8314 7.74005 16.4922 7.38268Z"
				fill="#129968"
			/>
			<path
				d="M11 0C4.93453 0 0 4.93453 0 11C0 17.0655 4.93453 22 11 22C17.0655 22 22 17.0655 22 11C22 4.93453 17.0655 0 11 0ZM11 20.2162C5.9183 20.2162 1.78376 16.082 1.78376 11C1.78376 5.9183 5.91826 1.78376 11 1.78376C16.082 1.78376 20.2162 5.91826 20.2162 11C20.2162 16.082 16.082 20.2162 11 20.2162Z"
				fill="#129968"
			/>
		</StyledSvg>
	);
};

const StyledSvg = styled.svg`
	${({ big }) =>
		big &&
		css`
			width: 70px;
			height: 70px;
			@media ${({ theme }) => theme.media.extraSmallDevices} {
				width: 60px;
				height: 60px;
			}
		`}
`;

export default Success;
