import React from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import NumberFormat from "react-number-format";

import PopupLayout from "./PopupLayout";

import { TextField, Textarea, Button } from "../../components/forms";

const Callback = ({ active, onClosingElementsClick }) => {
	const { register, handleSubmit } = useForm();

	const onFormSubmit = (data) => {
		console.log(data);
	};

	return (
		<PopupLayout
			active={active}
			onClosingElementsClick={onClosingElementsClick}
			maxWidth="472px"
			title="Заполните форму"
		>
			<StyledText>
				Напишите нам что-нибудь интересное, и мы вам перезвоним в
				ближайшее время!
			</StyledText>
			<StyledForm onSubmit={handleSubmit(onFormSubmit)}>
				<StyledInput>
					<TextField
						name="name"
						label="Имя"
						placeholder="Дмитрий"
						ref={register}
					/>
				</StyledInput>
				<StyledInput>
					<NumberFormat
						name="tel"
						label="Телефон"
						customInput={TextField}
						format="+7 ### ### ####"
						allowEmptyFormatting
						mask="_"
						getInputRef={register}
					/>
				</StyledInput>

				<StyledTextarea>
					<Textarea
						name="message"
						label="ваше сообщение"
						placeholder="Хотел бы лично обсудить все моменты"
						ref={register}
					/>
				</StyledTextarea>
				<StyledFormText>
					Отправляя форму, вы принимаете{" "}
					<span>условия передачи информации</span> и{" "}
					<span>политику конфиденциальности</span>.
				</StyledFormText>
				<Button padding="0 45px 0 45px">Отправить</Button>
			</StyledForm>
		</PopupLayout>
	);
};

const StyledText = styled.div`
	font-size: 16px;
	line-height: 24px;
	color: rgba(0, 0, 0, 0.8);
	max-width: 310px;
	margin: 18px 0 0 0;
	@media ${({ theme }) => theme.media.extraSmallDevices} {
		margin: 12px 0 0 0;
	}
`;

const StyledForm = styled.form`
	margin: 25px 0 0 0;
	@media ${({ theme }) => theme.media.extraSmallDevices} {
		margin: 20px 0 0 0;
	}
`;

const StyledInput = styled.div`
	margin: 0 0 20px 0;
`;

const StyledTextarea = styled.div`
	margin: 0 0 18px 0;
`;

const StyledFormText = styled.div`
	font-size: 14px;
	line-height: 21px;
	margin: 0 0 30px 0;
	span {
		color: #ffa621;
		font-weight: 700;
	}
	@media ${({ theme }) => theme.media.extraSmallDevices} {
		margin: 0 0 25px 0;
	}
`;

export default Callback;
