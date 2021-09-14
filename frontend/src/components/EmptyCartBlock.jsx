import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import { Container, Title } from "../components";
import { Button } from "../components/forms";

const EmptyCartBlock = () => {
	return (
		<StyledEmptyCartBlock>
			<Container>
				<Title medium>Моя корзина</Title>
				<StyledText>
					К сожалению, в настоящее время ваша корзина пуста
				</StyledText>
				<Button to="/" as={Link} padding="0 10px">
					Вернуться на главную{" "}
				</Button>
			</Container>
		</StyledEmptyCartBlock>
	);
};

const StyledEmptyCartBlock = styled.div``;

const StyledText = styled.div`
	font-weight: 500;
	margin: 15px 0 15px 0;
	line-height: 20px;
	@media ${({ theme }) => theme.media.smallDevices} {
		font-size: 18px;
	}
`;

export default EmptyCartBlock;
