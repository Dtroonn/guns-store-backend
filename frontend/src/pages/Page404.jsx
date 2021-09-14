import React from "react";
import styled from "styled-components";

import { Title, Container } from "../components";

const Page404 = () => {
	return (
		<React.Fragment>
			<StyledPage404>
				<Container>
					<Title>Страница не найдена</Title>
				</Container>
			</StyledPage404>
		</React.Fragment>
	);
};

const StyledPage404 = styled.div``;

export default Page404;
