import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

import { TextField, Button } from "../forms";
import { SearchIcon, CrossIcon } from "../icons";

const Search = ({ onSearchSubmit, activeSearch, ...props }) => {
	const history = useHistory();
	const [searchValue, setSearchValue] = React.useState("");

	const handleSearchInputChange = (e) => {
		setSearchValue(e.target.value);
	};

	React.useEffect(() => {
		setSearchValue(activeSearch || "");
	}, [activeSearch]);

	const handleFormSubmit = (e) => {
		history.push({
			pathname: "/products",
			search: `search=${searchValue}`,
		});
		if (onSearchSubmit) {
			onSearchSubmit();
		}
		e.preventDefault();
	};

	const handleFormReset = (e) => {
		setSearchValue("");
		e.preventDefault();
	};

	return (
		<StyledSearchForm onSubmit={handleFormSubmit} {...props}>
			<StyledInputWrapper>
				<TextField
					name="search"
					placeholder="Введите название товара или артикул"
					width="100%"
					notOutline
					padding="0 30px 0 16px"
					paddingSD="0 30px 0 8px"
					onChange={handleSearchInputChange}
					value={searchValue}
				/>
				{searchValue.length > 0 && (
					<StyledCrossReset onClick={handleFormReset}>
						<CrossIcon darkGray />
					</StyledCrossReset>
				)}
			</StyledInputWrapper>

			<Button
				disable={searchValue.length === 0}
				minWidth="none"
				minWidthSD="46px"
				heightSD="46px"
			>
				<SearchIcon />
				<StyledButtonText>Найти</StyledButtonText>
			</Button>
		</StyledSearchForm>
	);
};

const StyledSearchForm = styled.form`
	display: flex;
	background: rgba(241, 241, 241, 0.6);
	border-top-left-radius: 6px;
	border-bottom-left-radius: 6px;
	flex: ${({ flex }) => flex || "0 1 auto"};
`;

const StyledInputWrapper = styled.div`
	width: 100%;
	position: relative;
`;

const StyledCrossReset = styled.div`
	position: absolute;
	right: 12px;
	top: 12.5px;
`;

const StyledButtonText = styled.div`
	margin: 0 0 0 8px;
	@media ${({ theme }) => theme.media.smallDevices} {
		display: none;
	}
`;

export default Search;
