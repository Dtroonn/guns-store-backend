import React from "react";
import styled from "styled-components";

import telegram from "../assets/icons/socials/telegram.svg";
import vk from "../assets/icons/socials/vk.svg";
import youtube from "../assets/icons/socials/youtube.svg";
import instagram from "../assets/icons/socials/instagram.svg";

const Socials = (props) => {
	return (
		<StyledSocials>
			<StyledItem target="_blank" href="https://web.telegram.org">
				<StyledIcon src={telegram} />
			</StyledItem>
			<StyledItem target="_blank" href="https://vk.com">
				<StyledIcon src={vk} />
			</StyledItem>
			<StyledItem target="_blank" href="https://youtube.com">
				<StyledIcon src={youtube} />
			</StyledItem>
			<StyledItem target="_blank" href="https://instagram.com">
				<StyledIcon src={instagram} />
			</StyledItem>
		</StyledSocials>
	);
};

const StyledSocials = styled.div`
	display: flex;
`;

const StyledItem = styled.a`
	display: flex;
	align-items: center;
	justify-content: center;
	height: 40px;
	width: 40px;
	margin: 0 8px 0 0;
	border: 1px solid #e9e9e9;
	border-radius: 8px;
	transition: all 0.4s ease 0s;
	&:last-child {
		margin: 0;
	}
	@media ${({ theme }) => theme.mediaFM.largeDevices} {
		&:hover {
			border: 1px solid #ffa621;
		}
	}
`;
const StyledIcon = styled.img``;

export default Socials;
