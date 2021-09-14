import React from "react";
import styled, { css } from "styled-components";
import { useForm } from "react-hook-form";
import Nouislider from "nouislider-react";
import "nouislider/distribute/nouislider.css";

import FilterItem from "./FilterItem.jsx";
import { Container, Title, CountButton } from "../../components";
import { TextField, Button, Checkbox } from "../forms";
import { CrossIcon, FilterIcon } from "../icons";
import { useBreakpoint } from "../../hooks";

const formatFormData = (data) => {
	const formObj = {
		...data,
		price: { min: data.minPrice, max: data.maxPrice },
	};
	delete formObj.minPrice;
	delete formObj.maxPrice;
	return formObj;
};

const Filterbar = React.memo(
	({ filters, onFiltersSubmit, onFiltersReset, activeFiltersCount }) => {
		const nouisliderRef = React.useRef(null);
		const isLargeDevices = useBreakpoint("min-width", 991.98);
		const [isFilterbarOpenMD, setIsFilterbarOpenMD] = React.useState(false);
		const {
			register,
			handleSubmit,
			setValue,
			getValues,
			reset,
		} = useForm();

		const toggleIsFilterbarOpenMD = (e) => {
			setIsFilterbarOpenMD((isFilterbarOpenMD) => !isFilterbarOpenMD);
			document.body.classList.toggle("lock");
		};

		const handleSliderUpdate = (values) => {
			setValue("minPrice", values[0]);
			setValue("maxPrice", values[1]);
		};

		const handlePriceInputChange = (e) => {
			if (e.target.name === "minPrice") {
				nouisliderRef.current.noUiSlider.set([
					e.target.value,
					getValues("maxPrice"),
				]);
			} else {
				nouisliderRef.current.noUiSlider.set([
					getValues("minPrice"),
					e.target.value,
				]);
			}
		};

		const onFormSubmit = (data, reset) => {
			if (onFiltersSubmit) {
				onFiltersSubmit(formatFormData(data));
			}
			if (!isLargeDevices) {
				toggleIsFilterbarOpenMD();
			}
		};

		const handleFormReset = (e) => {
			e.preventDefault();
			reset({
				minPrice: filters.price.min,
				maxPrice: filters.price.max,
			});
			nouisliderRef.current.noUiSlider.set([
				filters.price.min,
				filters.price.max,
			]);

			if (onFiltersReset) {
				onFiltersReset();
			}
		};

		return (
			<StyledFilterbar>
				{!isLargeDevices && (
					<StyledHeaderMD>
						<CountButton
							onClick={toggleIsFilterbarOpenMD}
							count={activeFiltersCount}
						>
							<FilterIcon active={Boolean(activeFiltersCount)} />
						</CountButton>
						<StyledTitleMd>Фильтры</StyledTitleMd>
					</StyledHeaderMD>
				)}
				<StyledBody
					onClick={toggleIsFilterbarOpenMD}
					isFilterbarOpenMD={isFilterbarOpenMD}
				>
					<StyledForm
						onClick={(e) => e.stopPropagation()}
						onSubmit={handleSubmit(onFormSubmit)}
						isFilterbarOpenMD={isFilterbarOpenMD}
					>
						<Container>
							{!isLargeDevices && (
								<StyledFormHeaderMD>
									<Title>Фильтр</Title>
									<CrossIcon
										onClick={toggleIsFilterbarOpenMD}
									/>
								</StyledFormHeaderMD>
							)}
							<StyledFormBody>
								<StyledPricing>
									<Title extraSmall>Цена, руб.</Title>
									<StyledPricingInputs>
										<StyledPricingInput>
											<TextField
												fontWeight="500"
												textAlign="center"
												largeFont
												onChange={
													handlePriceInputChange
												}
												name="minPrice"
												ref={register({
													valueAsNumber: true,
												})}
												notAdaptive
											/>
										</StyledPricingInput>
										<StyledPricingInput>
											<TextField
												fontWeight="500"
												textAlign="center"
												onChange={
													handlePriceInputChange
												}
												name="maxPrice"
												ref={register({
													valueAsNumber: true,
												})}
												notAdaptive
											/>
										</StyledPricingInput>
									</StyledPricingInputs>
									<StyledNouisliderWrapper>
										<StyledNouislider
											connect
											range={{
												min: filters.price.min,
												max:
													filters.price.max ===
													filters.price.min
														? filters.price.max + 1
														: filters.price.max,
											}}
											start={[
												filters.price.min,
												filters.price.max,
											]}
											step={1}
											onUpdate={handleSliderUpdate}
											instanceRef={nouisliderRef}
											format={{
												to: function (value) {
													return parseInt(value);
												},
												from: function (value) {
													return parseInt(value);
												},
											}}
										/>
									</StyledNouisliderWrapper>
								</StyledPricing>
								<StyledFilters>
									<StyledFiltersTop>
										<StyledFiltersTopItem>
											<Checkbox
												ref={register}
												name="isSale"
												value="true"
												label="Со скидкой"
												labelAtEnd={`(${filters.sale.productsCount})`}
											/>
										</StyledFiltersTopItem>
									</StyledFiltersTop>
									{filters.types.length > 0 && (
										<FilterItem
											isLargeDevices={isLargeDevices}
											title="Тип"
											name="types"
											items={filters.types}
											register={register}
										/>
									)}
									{filters.kinds.length > 0 && (
										<FilterItem
											isLargeDevices={isLargeDevices}
											title="Вид"
											name="kinds"
											items={filters.kinds}
											register={register}
										/>
									)}
								</StyledFilters>
								<StyledButtons>
									<StyledButtonsColumn>
										<Button fw>Применить фильтры</Button>
									</StyledButtonsColumn>
									<StyledButtonsColumn>
										<Button
											onClick={handleFormReset}
											outline
											dark
											fw
										>
											Очистить фильтры
										</Button>
									</StyledButtonsColumn>
								</StyledButtons>
							</StyledFormBody>
						</Container>
					</StyledForm>
				</StyledBody>
			</StyledFilterbar>
		);
	}
);

const StyledNouisliderWrapper = styled.div`
	@media ${({ theme }) => theme.media.mediumDevices} {
		padding: 0 7px;
	}
`;

const StyledNouislider = styled(Nouislider)`
	.noUi-handle {
		border-radius: 50%;
		height: 20px;
		width: 20px;
		background: #ffa621;
		box-shadow: none;
		border: none;
		padding: 6px;
		top: -8px;
		right: -10px;
		transition: all 0.4s ease 0s;
		&:after,
		&:before {
			display: none;
		}
		&.noUi-active {
			transform: scale(1.25);
		}
		.noUi-touch-area {
			border-radius: 50%;
			height: 8px;
			width: 8px;
			background: #fff;
		}
	}
	&.noUi-target {
		border-radius: 3px;
		border: 1px solid #d9d9d9;
		height: 6px;
	}
	.noUi-connect {
		background: #ffa621;
	}
`;

const StyledFilterbar = styled.div``;

const StyledHeaderMD = styled.div`
	display: flex;
	align-items: center;
`;

const StyledBody = styled.div`
	@media ${({ theme }) => theme.media.mediumDevices} {
		position: fixed;
		background: rgba(0, 0, 0, 0.7);
		top: 0;
		left: 0;
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		width: 100%;
		height: 100%;
		opacity: 0;
		visability: hidden;
		overflow: auto;
		pointer-events: none;
		z-index: 100;
		transition: opacity 0.4s ease 0s;
		${({ isFilterbarOpenMD }) =>
			isFilterbarOpenMD &&
			css`
				opacity: 1;
				pointer-events: all;
				visability: visible;
			`}
	}
`;

const StyledForm = styled.form`
	background: #f9f9f9;
	border-radius: 6px;
	padding: 25px 20px;
	@media ${({ theme }) => theme.media.mediumDevices} {
		background: #fff;
		padding: 0 0 30px 0;
		border-bottom-left-radius: 0;
		border-bottom-right-radius: 0;
		overflow: auto;
		overflow-x: hidden;
		position: relative;
		bottom: -120%;
		transition: all 0.4s ease 0s;
		${({ isFilterbarOpenMD }) =>
			isFilterbarOpenMD &&
			css`
				bottom: 0;
			`}
	}
`;

const StyledFormBody = styled.div``;

const StyledPricing = styled.div`
	margin: 0 0 60px 0;
	@media ${({ theme }) => theme.media.mediumDevices} {
		margin: 0 0 25px 0;
	}
`;

const StyledPricingInputs = styled.div`
	display: flex;
	margin: 17px -12px 23px -12px;
`;

const StyledPricingInput = styled.div`
	flex: 1 1 auto;
	padding: 0 12px;
`;

const StyledFilters = styled.div``;

const StyledFiltersTop = styled.div`
	margin: 0 0 40px 0;
	@media ${({ theme }) => theme.media.mediumDevices} {
		margin: 50px 0 10px 0;
	}
`;

const StyledFiltersTopItem = styled.div``;

const StyledButtons = styled.div`
	display: flex;
	flex-direction: column;
	margin: 40px 0 0 0;
	@media ${({ theme }) => theme.media.mediumDevices} {
		flex-direction: row;
		margin: 30px 0 0 0;
	}
	@media ${({ theme }) => theme.media.extraSmallDevices} {
		flex-direction: column;
	}
`;

const StyledButtonsColumn = styled.div`
	flex: 1 1 auto;
	&:first-child {
		margin: 0 0 20px 0;
		@media ${({ theme }) => theme.media.mediumDevices} {
			margin: 0 0 0 24px;
			order: 2;
		}
		@media ${({ theme }) => theme.media.extraSmallDevices} {
			margin: 0 0 16px 0;
			order: 1;
		}
	}
	&:last-child {
		@media ${({ theme }) => theme.media.mediumDevices} {
			order: 1;
		}
		@media ${({ theme }) => theme.media.extraSmallDevices} {
			order: 2;
		}
	}
`;

const StyledTitleMd = styled.div`
	font-weight: 500;
	font-size: 16px;
	margin: 0 0 0 12px;
`;

const StyledFormHeaderMD = styled.div`
	padding: 30px 0;
	margin: 0 0 20px 0;
	position: relative;
	display: flex;
	align-items: center;
	justify-content: space-between;
	@media ${({ theme }) => theme.media.smallDevices} {
		padding: 22px 0;
	}
	&:after {
		content: "";
		width: 200%;
		position: absolute;
		left: -50%;
		bottom: 0;
		background: #e9e9e9;
		height: 1px;
	}
`;

export default Filterbar;
