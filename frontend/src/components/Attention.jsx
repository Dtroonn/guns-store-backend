import React from "react";
import styled from "styled-components";

import backgroundJpg from "./../assets/background.jpg";
import { Container, AdaptiveImage } from "../components";

const Attention = () => {
	return (
		<StyledAttention>
			<Container>
				<StyledBody>
					<StyledContent>
						<StyledTitle>
							Наша продукция
							<br />
							<span>не является оружием</span>
						</StyledTitle>
						<StyledText>
							Может приобретаться без специальных разрешений и
							лицензий. Все товары имеют паспорта и
							соответствующие документы.
						</StyledText>
					</StyledContent>
					<StyledImageWrapper>
						<AdaptiveImage
							height="100%"
							width="100%"
							src={backgroundJpg}
						/>
					</StyledImageWrapper>
				</StyledBody>
			</Container>
		</StyledAttention>
	);
};

const StyledAttention = styled.div``;

const StyledBody = styled.div`
	position: relative;
	padding: 70px 104px;
	@media ${({ theme }) => theme.media.largeDevices} {
		padding: 60px 34px;
	}
	@media ${({ theme }) => theme.media.mediumDevices} {
		padding: 40px 0;
	}
	@media ${({ theme }) => theme.media.smallDevices} {
		padding: 30px 0;
	}
`;

const StyledContent = styled.div`
	position: relative;
	z-index: 1;
	display: flex;
	justify-content: space-between;
	@media ${({ theme }) => theme.media.mediumDevices} {
		flex-direction: column;
	}
`;

const StyledImageWrapper = styled.div`
	height: 100%;
	width: 100%;
	top: 0;
	left: 0;
	position: absolute;
	@media ${({ theme }) => theme.media.mediumDevices} {
		width: 200%;
		left: -50%;
	}
`;

const StyledTitle = styled.div`
	font-weight: 700;
	font-size: 24px;
	line-height: 36px;
	letter-spacing: 0.02em;
	text-transform: uppercase;
	color: #ffffff;
	margin: 0 35px 0 0;
	@media ${({ theme }) => theme.media.mediumDevices} {
		font-size: 20px;
		line-height: 30px;
		margin: 0 0 18px 0;
	}
	span {
		color: #ffa621;
		white-space: nowrap;
	}
`;

const StyledText = styled.div`
	font-size: 16px;
	line-height: 24px;
	color: rgba(255, 255, 255, 0.8);
	flex: 0 1 520px;
	@media ${({ theme }) => theme.media.mediumDevices} {
		flex: 1 1 auto;
		max-width: 520px;
	}
`;

export default Attention;
