import React from "react";
import styled from "styled-components";

import { Title, Container } from "../components";

const DevelopingPage = () => {
	return (
		<React.Fragment>
			<StyledDevelopingPage>
				<Container>
					<Title>Страница в разработке</Title>
				</Container>
			</StyledDevelopingPage>
		</React.Fragment>
	);
};

const StyledDevelopingPage = styled.div``;

export default DevelopingPage;
