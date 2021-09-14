import React from "react";
import styled, { css } from "styled-components";
import NumberFormat from "react-number-format";
import { useForm, Controller } from "react-hook-form";

import { Title, HeaderBlock } from "../components";
import { TextField, Textarea, Button } from "../components/forms";

import {
	setActiveReceiOption,
	setActivePayOption,
	makeOrder,
} from "../redux/actions/ordering";

const OrderingForm = ({
	receiOptions,
	payOptions,
	activeReceiOption,
	activePayOption,
	dispatch,
}) => {
	const { register, handleSubmit, errors, control, getValues } = useForm();
	const [isSubmitting, setIsSubmitting] = React.useState(false);
	const telInputRef = React.useRef(null);

	console.log(errors);

	const onOrderingFormSubmit = async (data) => {
		let newData = Object.assign({}, data);
		Object.keys(newData).forEach((key) => {
			if (newData[key] === 0) return;
			if (!newData[key]) {
				delete newData[key];
			}
		});
		console.log(newData);
		setIsSubmitting(true);
		await dispatch(makeOrder(newData));
		setIsSubmitting(false);
	};

	const handleReceiOptionChange = (e) => {
		dispatch(setActiveReceiOption(e.target.value));
	};

	const handlePayOptionChange = (e) => {
		dispatch(setActivePayOption(e.target.value));
	};

	return (
		<StyledOrderingForm onSubmit={handleSubmit(onOrderingFormSubmit)}>
			<StyledContactDetails>
				<HeaderBlock maxWidth="420px" medium title="контактные данные">
					Вы можете указать только{" "}
					<span>контактные данные и город</span> мы с вами свяжемся и
					сами все заполним за вас
				</HeaderBlock>
				<StyledContactDetailsBody>
					<StyledContactDetailsInput>
						<TextField
							name="name"
							placeholder="Введите имя"
							label="имя"
							id="customerName"
							ref={register({
								required: true,
								minLength: 2,
								maxLength: 20,
							})}
							errText={errors.name ? "Заполните поле" : null}
						/>
					</StyledContactDetailsInput>
					<StyledContactDetailsInput>
						<Controller
							render={({ onChange, value }) => (
								<NumberFormat
									label="Телефон"
									hint="Позвоним по этому номеру для подтверждения заказа"
									customInput={TextField}
									format="+7 ### ### ####"
									allowEmptyFormatting
									mask="_"
									onValueChange={(v) =>
										onChange("7" + v.value)
									}
									errText={
										errors.tel ? "Заполните поле" : null
									}
									getInputRef={telInputRef}
								/>
							)}
							name="tel"
							control={control}
							defaultValue=""
							rules={{
								required: true,
								minLength: 11,
								valueAsNumber: true,
							}}
							onFocus={() => {
								telInputRef.current.focus();
							}}
						/>
					</StyledContactDetailsInput>
					<StyledContactDetailsInput>
						<TextField
							name="email"
							placeholder="Введите почту"
							label="e-mail"
							hint="Сюда отправим всю информацию по заказу"
							errText={
								errors.email &&
								(errors.email.type === "pattern"
									? "Введите корректный email"
									: "Заполните поле")
							}
							ref={register({
								required: true,
								pattern: {
									value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
								},
							})}
						/>
					</StyledContactDetailsInput>
				</StyledContactDetailsBody>
			</StyledContactDetails>
			<StyledOptionsRecei>
				<Title medium>способ получения</Title>
				<StyledOptions>
					{receiOptions.map((option) => (
						<StyledOptionsItem key={option._id}>
							<StyledHiddenRadio
								id={option._id}
								name="receiOptionId"
								type="radio"
								value={option._id}
								checked={option._id === activeReceiOption._id}
								ref={register}
								onChange={handleReceiOptionChange}
							/>
							<StyledOption htmlFor={option._id}>
								<StyledOptionTitle>
									{option.title}
								</StyledOptionTitle>
								{option.description && (
									<StyledOptionText>
										{option.description}
									</StyledOptionText>
								)}
								{option.price > 0 && (
									<StyledOptionPrice>
										{option.price} руб
									</StyledOptionPrice>
								)}
							</StyledOption>
						</StyledOptionsItem>
					))}
				</StyledOptions>
				<StyledOptionsReceiText>
					Дату и время доставки уточнит менеджер после подтверждения
					заказа
				</StyledOptionsReceiText>
			</StyledOptionsRecei>
			<StyledRecipientAddress>
				<Title medium>Адрес получателя</Title>
				<StyledRecipientAddressBody>
					<StyledRecipientAddressInput>
						<TextField
							name="city"
							placeholder="Москва"
							label="город"
							ref={register({
								required: true,
								minLength: 2,
								maxLength: 30,
							})}
							errText={
								errors.city &&
								(errors.city.type === "required"
									? "Заполните поле"
									: "Введите корректный город")
							}
						/>
					</StyledRecipientAddressInput>
					<StyledRecipientAddressInput>
						<TextField
							name="street"
							placeholder="Ул. Тверская, д. 7"
							label="улица, дом"
							ref={register}
						/>
					</StyledRecipientAddressInput>
					<StyledRecipientAddressInput>
						<Controller
							render={({ onChange, value }) => (
								<TextField
									placeholder="2"
									label="подъезд"
									value={value}
									onChange={(e) => {
										if (e.target.value.match(/^[0-9]*$/)) {
											onChange(e.target.value);
										}
									}}
								/>
							)}
							name="entrance"
							control={control}
							defaultValue=""
							rules={{ valueAsNumber: true }}
						/>
					</StyledRecipientAddressInput>
					<StyledRecipientAddressInput>
						<Controller
							render={({ onChange, value }) => (
								<TextField
									placeholder="2"
									label="квартира"
									value={value}
									onChange={(e) => {
										if (e.target.value.match(/^[0-9]*$/)) {
											onChange(e.target.value);
										}
									}}
								/>
							)}
							name="apartment"
							control={control}
							defaultValue=""
							rules={{ valueAsNumber: true }}
						/>
					</StyledRecipientAddressInput>
				</StyledRecipientAddressBody>
			</StyledRecipientAddress>
			<StyledOptionsPay>
				<Title medium>способы оплаты</Title>
				<StyledOptions>
					{payOptions.map((option) => (
						<StyledOptionsItem key={option._id}>
							<StyledHiddenRadio
								id={option._id}
								name="payOptionId"
								type="radio"
								value={option._id}
								ref={register}
								checked={option._id === activePayOption._id}
								onChange={handlePayOptionChange}
							/>
							<StyledOption htmlFor={option._id}>
								<StyledOptionTitle>
									{option.title}
								</StyledOptionTitle>
								{option.description && (
									<StyledOptionText>
										{option.description}
									</StyledOptionText>
								)}
							</StyledOption>
						</StyledOptionsItem>
					))}
				</StyledOptions>
			</StyledOptionsPay>
			<StyledAdditionally>
				<Title medium>дополнительно</Title>
				<StyledAdditionallyBody>
					<Textarea
						name="comment"
						placeholder="Не звонить в дверь"
						ref={register({
							maxLength: 250,
						})}
						errText={errors.comment && "Макс. кол-во символов 250"}
					/>
				</StyledAdditionallyBody>
			</StyledAdditionally>
			<StyledOrderConfirmation>
				<Button fw showLoader={isSubmitting}>
					Подтвердить заказ
				</Button>
				<StyledOrderConfirmationText>
					Нажимая «Подтвердить заказ», вы соглашаетесь c{" "}
					<span>условиями обработки персональных данных</span>.
				</StyledOrderConfirmationText>
			</StyledOrderConfirmation>
		</StyledOrderingForm>
	);
};

const StyledOrderingForm = styled.form`
	@media ${({ theme }) => theme.media.mediumDevices} {
		max-width: 392px;
	}
`;

const StyledContactDetails = styled.div``;

const StyledContactDetailsBody = styled.div`
	max-width: 392px;
	margin: 35px 0 0 0;
	@media ${({ theme }) => theme.media.smallDevices} {
		margin: 25px 0 0 0;
	}
`;

const StyledContactDetailsInput = styled.div`
	margin: 0 0 40px 0;
	@media ${({ theme }) => theme.media.smallDevices} {
		margin: 0 0 30px 0;
	}
	@media ${({ theme }) => theme.media.extraSmallDevices} {
		margin: 0 0 20px 0;
	}
	&:last-child {
		margin: 0;
	}
`;

const StyledOptionsRecei = styled.div`
	margin: 100px 0;
	@media ${({ theme }) => theme.media.mediumDevices} {
		margin: 80px 0;
	}
	@media ${({ theme }) => theme.media.smallDevices} {
		margin: 60px 0;
	}
	@media ${({ theme }) => theme.media.extraSmallDevices} {
		margin: 40px 0;
	}
`;

const StyledOptionsReceiText = styled.div`
	font-weight: 500;
	font-size: 16px;
	line-height: 24px;
`;

const StyledOptions = styled.div`
	margin: 40px -12px 0 -12px;
	display: flex;
	flex-wrap: wrap;
	@media ${({ theme }) => theme.media.smallDevices} {
		margin: 30px -12px 0 -12px;
	}

	@media ${({ theme }) => theme.media.extraSmallDevices} {
	}
`;

const StyledOptionsItem = styled.div`
	padding: 0 12px;
	margin: 0 0 24px 0;
`;

const StyledOption = styled.label`
	min-height: 116px;
	height: 100%;
	width: 184px;
	border-radius: 6px;
	border: 1px solid #d9d9d9;
	padding: 12px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	text-align: center;
	cursor: pointer;
	transition: all 0.4s ease 0s;
	${({ small }) =>
		small &&
		css`
			min-height: 100px;
		`}
`;

const StyledOptionText = styled.div`
	font-size: 14px;
	line-height: 21px;
	color: rgba(0, 0, 0, 0.6);
	transition: all 0.4s ease 0s;
`;

const StyledOptionPrice = styled(StyledOptionText)`
	font-weight: 700;
`;

const StyledHiddenRadio = styled.input`
	display: none;
	&:checked {
		& ~ label {
			background: #ffa621;
			border: 1px solid #ffa621;
			div {
				color: #fff;
			}
			h6 {
				color: #fff;
			}
		}
	}
`;

const StyledOptionTitle = styled.h6`
	color: rgba(0, 0, 0, 0.6);
	letter-spacing: 0.02em;
	text-transform: uppercase;
	line-height: 21px;
	font-weight: 700;
	font-size: 14px;
	margin: 0 0 5px 0;
	transition: all 0.4s ease 0s;
`;

const StyledRecipientAddress = styled.div``;

const StyledRecipientAddressBody = styled.div`
	display: flex;
	flex-wrap: wrap;
	margin: 40px -12px 0 -12px;
	@media ${({ theme }) => theme.media.mediumDevices} {
		display: block;
	}
	@media ${({ theme }) => theme.media.smallDevices} {
		margin: 30px -12px 0 -12px;
	}
`;

const StyledRecipientAddressInput = styled.div`
	flex: 0 0 50%;
	padding: 0 12px;
	margin: 0 0 40px 0;
	@media ${({ theme }) => theme.media.smallDevices} {
		margin: 0 0 30px 0;
	}
	@media ${({ theme }) => theme.media.extraSmallDevices} {
		margin: 0 0 20px 0;
	}
`;

const StyledOptionsPay = styled.div`
	margin: 60px 0 76px 0;
	@media ${({ theme }) => theme.media.mediumDevices} {
		margin: 80px 0 56px 0;
	}
	@media ${({ theme }) => theme.media.smallDevices} {
		margin: 60px 0 36px 0;
	}
	@media ${({ theme }) => theme.media.extraSmallDevices} {
		margin: 40px 0 16px 0;
	}
`;

const StyledAdditionally = styled.div``;

const StyledAdditionallyBody = styled.div`
	max-width: 392px;
	margin: 40px 0 0 0;
	@media ${({ theme }) => theme.media.smallDevices} {
		margin: 30px 0 0 0;
	}
`;

const StyledOrderConfirmation = styled.div`
	max-width: 392px;
	margin: 40px 0 0 0;
	@media ${({ theme }) => theme.media.mediumDevices} {
		margin: 0;
		position: absolute;
		bottom: 0;
	}
`;

const StyledOrderConfirmationText = styled.div`
	font-size: 14px;
	line-height: 21px;
	margin: 15px 0 0 0;
	span {
		color: #ffa621;
	}
`;

export default OrderingForm;
