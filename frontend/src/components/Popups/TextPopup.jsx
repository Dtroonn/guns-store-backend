import React from "react";
import styled from "styled-components";

import PopupLayout from "./PopupLayout";

const TextPopup = (props) => {
	return (
		<PopupLayout {...props} title="Что-то пошло не так...">
			<StyledText>{props.text}</StyledText>
		</PopupLayout>
	);
};

const StyledText = styled.div`
	font-size: 18px;
	font-weight: 500;
	line-height: 22px;
	margin: 10px 0 0 0;
`;

export default TextPopup;
