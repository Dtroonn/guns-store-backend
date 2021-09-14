import React from "react";
import styled from "styled-components";

const Radio = React.forwardRef((props, ref) => {
	return (
		<StyledBody>
			<StyledRadio
				checked={props.checked}
				id={props.value}
				name={props.name}
				value={props.value}
				ref={ref}
				type="radio"
				onChange={props.onChange}
			/>
			<StyledLabel htmlFor={props.value}>{props.label}</StyledLabel>
		</StyledBody>
	);
});

const StyledBody = styled.div`
	display: flex;
	align-items: center;
`;

const StyledRadio = styled.input`
	display: none;
	&:checked {
		& ~ label {
			font-weight: 500;
			color: #000;
			&:after {
				border-color: #d9d9d9;
			}
			&:before {
				opacity: 1;
			}
		}
	}
`;

const StyledLabel = styled.label`
	font-size: 14px;
	position: relative;
	padding: 0 0 0 36px;
	cursor: pointer;
	color: rgba(0, 0, 0, 0.6);
	transition: color 0.4s ease 0s;
	@media ${({ theme }) => theme.mediaFM.largeDevices} {
		&:hover {
			color: #ffa621;
			&:after {
				border-color: #ffa621;
			}
		}
	}
	&:after {
		content: "";
		background: #ffffff;
		border: 1px solid #d9d9d9;
		top: -4px;
		left: 0;
		border-radius: 50%;
		width: 20px;
		height: 20px;
		position: absolute;
		transition: all 0.4s ease 0s;
		z-index: 1;
	}
	&:before {
		content: "";
		background: #ffa621;
		top: 1px;
		left: 5px;
		border-radius: 50%;
		width: 10px;
		height: 10px;
		position: absolute;
		z-index: 2;
		transition: all 0.4s ease 0s;
		opacity: 0;
	}
`;

export default Radio;
