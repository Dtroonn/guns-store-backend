import React from "react";
import styled from "styled-components";

import PopupLayout from "./PopupLayout";

import { SuccessIcon } from "../icons";

const OrderSuccessPopup = (props) => {
	return (
		<PopupLayout {...props} title="Поздравляем!">
			<StyledBody>
				<StyledText>
					Ваш заказ успешно оформлен! В ближайшее время с вами
					свяжется специалист.
				</StyledText>
				<SuccessIcon big />
			</StyledBody>
		</PopupLayout>
	);
};

const StyledBody = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin: 10px 0 0 0;
`;

const StyledText = styled.div`
	font-size: 20px;
	line-height: 24px;
	margin: 0 0 10px 0;
	font-weight: 500;
	@media ${({ theme }) => theme.media.extraSmallDevices} {
		font-size: 18px;
	}
`;

export default OrderSuccessPopup;
