import React from "react";
import styled from "styled-components";

import checkMark from "../../assets/icons/checkMark.svg";

const Checkbox = React.forwardRef((props, ref) => {
	return (
		<StyledBody>
			<StyledCheckbox
				checked={props.checked}
				ref={ref}
				id={props.value}
				name={props.name}
				value={props.value}
				type="checkbox"
			/>
			<StyledLabel htmlFor={props.value}>
				{props.label}{" "}
				{props.labelAtEnd && <span>{props.labelAtEnd}</span>}
			</StyledLabel>
		</StyledBody>
	);
});

const StyledBody = styled.div`
	display: flex;
	align-items: center;
`;

const StyledCheckbox = styled.input`
	display: none;
	&:checked {
		& ~ label {
			font-weight: 500;
			color: #000;
			span {
				color: #000;
			}
			&:after {
				background: #ffa621;
				border-color #ffa621;
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
	line-height: 18px;
	cursor: pointer;
	color: rgba(0, 0, 0, 0.6);
	transition: color 0.4s ease 0s;
	span {
		color: #000;
		font-weight: bold;
		margin: 0 0 0 5px;
		transition: color 0.4s ease 0s;
	}
	@media ${({ theme }) => theme.mediaFM.largeDevices} {
		&:hover {
			color: #ffa621;
			span {
				color: #ffa621;
			}
			&:after {
				border-color: #ffa621;
			}
		}
	}
	&:after {
		content: "";
		background: #fff;
		border: 1px solid #d9d9d9;
		top: -2px;
		left: 0;
		border-radius: 6px;
		width: 20px;
		height: 20px;
		position: absolute;
		z-index: 1;
		transition: all 0.4s ease 0s;
	}
	&:before {
		content: "";
		background: url(${checkMark}) center / 100% no-repeat;
		top: 3px;
		left: 5px;
		width: 10px;
		height: 10px;
		position: absolute;
		z-index: 2;
		transition: all 0.4s ease 0s;
		opacity: 0;
	}
`;

export default Checkbox;
