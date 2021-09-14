import React from "react";
import ReactPaginate from "react-paginate";
import styled from "styled-components";

import { ArrowIcon } from "../components/icons";

const Pagination = React.memo(
	({
		pageCount,
		forcePage,
		marginPagesDisplayed,
		pageRangeDisplayed,
		onPageChange,
	}) => {
		return (
			<StyledPagination>
				<ReactPaginate
					nextLabel={<ArrowIcon small gray rotateStart="-90deg" />}
					previousLabel={<ArrowIcon small gray rotateStart="90deg" />}
					breakLabel={"..."}
					breakClassName={"break-me"}
					pageCount={pageCount}
					marginPagesDisplayed={1}
					pageRangeDisplayed={2}
					onPageChange={onPageChange}
					containerClassName={"pagination"}
					pageLinkClassName={"item"}
					activeClassName={"active"}
					forcePage={forcePage}
				/>
			</StyledPagination>
		);
	}
);

const StyledPagination = styled.div`
	.pagination {
		display: flex;
		li {
			border: 1px solid #e9e9e9;
			&:nth-child(even) {
				border-left: 0;
				border-right: 0;
			}
			&:first-child {
				border-radius: 6px 0px 0px 6px;
			}
			&:last-child {
				border-right: 1px solid #e9e9e9;
				border-radius: 0px 6px 6px 0px;
			}
			&:nth-child(2) {
				&.active {
					border-radius: 6px 0px 0px 6px;
				}
			}

			&:nth-last-child(2) {
				&.active {
					border-radius: 0px 6px 6px 0px;
				}
			}

			&.active {
				border: 1px solid #ffa621;
				background: #ffa621;
				a {
					color: #fff;
				}
			}
			&.disabled {
				display: none;
			}
			a {
				height: 46px;
				min-width: 46px;
				align-items: center;
				padding: 5px;
				justify-content: center;
				display: flex;
				font-size: 20px;
				color: rgba(0, 0, 0, 0.6);
				font-weight: 700;
				font-size: 14px;
				cursor: pointer;
				@media ${({ theme }) => theme.media.extraSmallDevices} {
					height: 32px;
					min-width: 32px;
					font-weight: 500;
					font-size: 9.5px;
				}
			}
		}
	}
`;

export default Pagination;
