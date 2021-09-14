import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";

import { Socials } from "../../components";

import { setIsActiveCallbackPopup } from "../../redux/actions/popups";

const InfoBlock = (props) => {
	const dispatch = useDispatch();
	const handleOrderCallLinkClick = (e) => {
		dispatch(setIsActiveCallbackPopup(true));
		e.preventDefault();
	};

	return (
		<StyledInfoBlock {...props}>
			<StyledItem>
				<StyledContactLink href="tel:+79670169197">
					+7 967 016 91 97
				</StyledContactLink>
				<StyledOrderCallLink
					href="#"
					onClick={handleOrderCallLinkClick}
				>
					Заказать звонок
				</StyledOrderCallLink>
			</StyledItem>
			<StyledItem>
				<StyledContactLink href="mailto:222@papigun.ru">
					222@papigun.ru
				</StyledContactLink>
				<StyledItemText>Служба поддержки</StyledItemText>
			</StyledItem>
			<Socials />
		</StyledInfoBlock>
	);
};

const StyledInfoBlock = styled.div`
	display: flex;
	align-items: center;
	margin: ${({ margin }) => margin || "0"};
	@media ${({ theme }) => theme.media.smallDevices} {
		flex-direction: column;
		align-items: center;
	}
`;

const StyledItem = styled.div`
	margin: 0 50px 0 0;
	@media ${({ theme }) => theme.media.largeDevices} {
		margin: 0 30px 0 0;
	}
	@media ${({ theme }) => theme.media.smallDevices} {
		margin: 0 0 30px 0;
	}
`;
const StyledContactLink = styled.a`
	font-weight: 500;
	font-size: 20px;
	color: #000000;
	display: block;
	margin: 0 0 8px 0;
	transition: all 0.4s ease 0s;
	@media ${({ theme }) => theme.mediaFM.largeDevices} {
		&:hover {
			color: #ffa621;
		}
	}
	@media ${({ theme }) => theme.media.largeDevices} {
		font-size: 17px;
	}
	@media ${({ theme }) => theme.media.mediumDevices} {
		font-size: 18px;
	}
`;

const StyledOrderCallLink = styled.a`
	font-weight: 700;
	font-size: 14px;
	color: #ffa621;
	@media ${({ theme }) => theme.mediaFM.largeDevices} {
		&:hover {
			text-decoration: underline;
		}
	}
`;

const StyledItemText = styled.div`
	font-size: 14px;
	color: rgba(0, 0, 0, 0.4);
`;

export default InfoBlock;
