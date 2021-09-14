import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { Container, Title } from "../components";

const Home = () => {
	const categories = useSelector(({ filters }) => filters.categories);
	return (
		<React.Fragment>
			<StyledCategories>
				<Container>
					<Title>Категории товаров</Title>
					<StyledCategoriesRow>
						{categories.map((category) => (
							<StyledCategoriesColumn
								key={category._id}
								to={`/products/${category.slug}`}
							>
								<StyledCategoriesItem>
									<StyledCategoriesItemTitle>
										{category.name}
									</StyledCategoriesItemTitle>
									<StyledCategoriesItemCount>
										{category.productsCount} товаров
									</StyledCategoriesItemCount>
								</StyledCategoriesItem>
							</StyledCategoriesColumn>
						))}
					</StyledCategoriesRow>
				</Container>
			</StyledCategories>
		</React.Fragment>
	);
};

const StyledCategories = styled.div``;

const StyledCategoriesRow = styled.div`
	display: flex;
	margin: 35px -12px 0 -12px;
	flex-wrap: wrap;
	@media ${({ theme }) => theme.media.mediumDevices} {
		margin: 25px -12px 0 -12px;
	}
	@media ${({ theme }) => theme.media.smallDevices} {
		margin: 25px -8px 0 -8px;
	}
	@media ${({ theme }) => theme.media.extraSmallDevices} {
		margin: 15px -8px 0 -8px;
	}
`;

const StyledCategoriesColumn = styled(Link)`
	flex: 0 1 25%;
	padding: 0 12px;
	margin: 0 0 24px 0;
	@media ${({ theme }) => theme.media.largeDevices} {
		flex: 0 1 33.333%;
	}
	@media ${({ theme }) => theme.media.mediumDevices} {
		flex: 0 1 50%;
	}
	@media ${({ theme }) => theme.media.smallDevices} {
		padding: 0 8px;
	}
	@media ${({ theme }) => theme.media.extraSmallDevices} {
		flex: 0 1 100%;
	}
`;

const StyledCategoriesItem = styled.div`
	height: 100%;
	padding: 55px 30px;
	background: #23282e;
	transition: all 0.4s ease 0s;
	border-radius: 6px;
	@media ${({ theme }) => theme.media.smallDevices} {
		padding: 40px 20px;
	}
	@media ${({ theme }) => theme.media.extraSmallDevices} {
		padding: 20px 15px;
	}
	&:hover {
		@media ${({ theme }) => theme.mediaFM.largeDevices} {
			background: #ffa621;
			div {
				&:last-child {
					color: #ffffff;
				}
			}
		}
	}
`;

const StyledCategoriesItemTitle = styled.div`
	font-size: 18px;
	line-height: 28px;
	letter-spacing: 0.02em;
	text-transform: uppercase;
	color: #ffffff;
	font-weight: 700;
	margin: 0 0 10px 0;
	@media (max-width: 510px) {
		font-size: 16px;
		line-height: 24px;
	}
	@media ${({ theme }) => theme.media.extraSmallDevices} {
	}
`;

const StyledCategoriesItemCount = styled.div`
	font-weight: 500;
	font-size: 16px;
	color: rgba(255, 255, 255, 0.8);
	transition: all 0.4s ease 0s;
	@media (max-width: 510px) {
		font-size: 14px;
	}
`;

export default Home;
