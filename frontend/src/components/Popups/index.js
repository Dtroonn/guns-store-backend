import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector, shallowEqual } from "react-redux";

import CallbackPopup from "./Callback";
import TextPopup from "./TextPopup";
import OrderSuccessPopup from "./OrderSuccessPopup";

import {
	setIsActiveCallbackPopup,
	setTextPopup,
	setIsActiveOrderSuccessPopup,
} from "../../redux/actions/popups";

const Popups = () => {
	const dispatch = useDispatch();
	const {
		isActiveCallbackPopup,
		textPopup,
		isActiveOrderSuccessPopup,
	} = useSelector(
		({ popups }) => ({
			isActiveCallbackPopup: popups.isActiveCallbackPopup,
			textPopup: popups.textPopup,
			isActiveOrderSuccessPopup: popups.isActiveOrderSuccessPopup,
		}),
		shallowEqual
	);

	const onCloseCallbackPopupClick = () => {
		dispatch(setIsActiveCallbackPopup(false));
	};

	const onCloseCartErrorPopupClick = () => {
		dispatch(setTextPopup(false));
	};

	const onCloseOrderSuccessPopupClick = () => {
		dispatch(setIsActiveOrderSuccessPopup(false));
	};

	return (
		<StyledPopups>
			<CallbackPopup
				active={isActiveCallbackPopup}
				onClosingElementsClick={onCloseCallbackPopupClick}
			/>
			<TextPopup
				active={textPopup.isActive}
				text={textPopup.text}
				onClosingElementsClick={onCloseCartErrorPopupClick}
			/>
			<OrderSuccessPopup
				active={isActiveOrderSuccessPopup}
				onClosingElementsClick={onCloseOrderSuccessPopupClick}
			/>
		</StyledPopups>
	);
};

const StyledPopups = styled.div``;

export default Popups;
