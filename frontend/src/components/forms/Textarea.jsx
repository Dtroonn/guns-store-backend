import React from "react";
import TextareaAutosize from "react-textarea-autosize";
import styled, { css } from "styled-components";

import { ErrorText } from "../forms";

const Textarea = React.forwardRef(({ errText, ...props }, ref) => {
	return (
		<StyledBody>
			{props.label && (
				<StyledLabel htmlFor={props.name}>{props.label}</StyledLabel>
			)}
			<StyledTextarea
				id={props.name}
				ref={ref}
				{...props}
				err={errText}
			/>
			{errText && (
				<ErrorText small margin="7px 0 0 ">
					{errText}
				</ErrorText>
			)}
		</StyledBody>
	);
});

const StyledBody = styled.div``;

const StyledTextarea = styled(TextareaAutosize)`
	border: 1px solid #d9d9d9;
	border-radius: 6px;
	resize: none;
	overflow: hidden;
	min-height: 170px;
	width: 100%;
	padding: 14px 16px;
	font-size: 16px;
	line-height: 19px;
	${({ err }) =>
		err &&
		css`
			border-color: #f00;
			&::placeholder {
				color: #f00;
			}
		`}
	&::placeholder {
		color: rgba(0, 0, 0, 0.2);
	}
	&:focus {
		border-color: #ffa621;
		&::placeholder {
			font-size: 0;
		}
	}
`;

const StyledLabel = styled.label`
	letter-spacing: 0.02em;
	text-transform: uppercase;
	font-size: 14px;
	font-weight: 700;
	display: inline-block;
	margin: 0 0 10px 0;
`;

export default Textarea;
