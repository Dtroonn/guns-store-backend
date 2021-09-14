import React from "react";
import styled from "styled-components";

import { Title, SlideToggle } from "../../components";
import { Checkbox } from "../forms";
import { ArrowIcon } from "../icons";

const ItemsList = ({ items, name, register }) => {
	return (
		<StyledList>
			{items.map((item) => (
				<StyledListItem key={item._id}>
					<Checkbox
						ref={register}
						name={name}
						value={item.slug}
						label={item.name}
						labelAtEnd={`(${item.productsCount})`}
					/>
				</StyledListItem>
			))}
		</StyledList>
	);
};

const FilterItem = ({ title, isLargeDevices, items, name, register }) => {
	const [isOpenMD, setIsOpenMD] = React.useState(false);
	const toggleIsOpenMD = (e) => {
		setIsOpenMD((isOpenMD) => !isOpenMD);
	};

	return (
		<StyledFilterItem>
			<StyledHeader onClick={isLargeDevices ? null : toggleIsOpenMD}>
				<Title margin="0 0 7px 0" marginMD="0 0 12px 0" extraSmall>
					{title}
				</Title>
				{!isLargeDevices && (
					<ArrowIcon margin="-10px 0 0 0" active={isOpenMD} />
				)}
			</StyledHeader>
			{isLargeDevices ? (
				<ItemsList items={items} name={name} register={register} />
			) : (
				<SlideToggle active={isOpenMD}>
					<ItemsList items={items} name={name} register={register} />
				</SlideToggle>
			)}
		</StyledFilterItem>
	);
};

const StyledFilterItem = styled.div`
	margin: 0 0 50px 0;
	&:last-child {
		margin: 0;
	}
	@media ${({ theme }) => theme.media.mediumDevices} {
		margin: 0;
		position: relative;
		padding: 20px 0 5px 0;
		&:after,
		&:before {
			content: "";
			width: 200%;
			position: absolute;
			left: -50%;
			background: #e9e9e9;
			height: 1px;
		}
		&:after {
			bottom: 0;
		}
		&:before {
			top: 0;
		}
		&:nth-child(even) {
			&:before,
			&:after {
				display: none;
			}
		}
		&:last-child {
			&:after {
				display: block;
			}
		}
	}
`;

const StyledHeader = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
`;

const StyledList = styled.ul``;

const StyledListItem = styled.li`
	padding: 10px 0;
	@media ${({ theme }) => theme.media.mediumDevices} {
		padding: 15px 0;
	}
`;

export default FilterItem;
