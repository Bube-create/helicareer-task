import { useQuery, gql, useLazyQuery } from "@apollo/client";
import React, { useState } from "react";
import styled from "styled-components";
import CheckBoxInput from "./CheckBoxInput";
import Modal from "./Modal";
import RadioInput from "./RadioInput";
import TransactionInfo from "./TransactionInfo";
import { convertDate } from "./utils";
const QUERY_ALL_TRANSACTIONS = gql`
	query TransactionQuery {
		transactions {
			id
			date
			network
			recipient
			amount
			time
			transactionStatus
		}
	}
`;

const QUERY_ALL_TRANSACTIONS_WITH_ARGS = gql`
	query Trans($filter: TransactionFilter) {
		transactions(filter: $filter) {
			id
			date
			network
			recipient
			amount
			time
			transactionStatus
		}
	}
`;

const networkOptions = {
	ALL: false,
	AIRTEL: false,
	GLO: false,
	MTN: false,
	ETISALAT: false,
};

const extrafilter = {
	amount: 0,
	transactionStatus: "ALL",
	date: "",
};

const TransactionsPage = () => {
	const [modalToggle, setModalToggle] = useState(false);
	const [filter, setFilter] = useState({
		ALL: true,
		AIRTEL: false,
		GLO: false,
		MTN: false,
		ETISALAT: false,
	});
	const [extraFilter, setExtraFilter] = useState({
		amount: 0,
		transactionStatus: "ALL",
		date: "",
	});
	const [searchInput, setSearchInput] = useState("");
	const { data, loading } = useQuery(QUERY_ALL_TRANSACTIONS);
	const [fetchTransactions, { data: transactionData }] = useLazyQuery(
		QUERY_ALL_TRANSACTIONS_WITH_ARGS
	);

	if (loading) {
		return <div>Loading....</div>;
	}

	function handleNetworkChange(e) {
		const network = e.target.value;
		if (filter[network] === true) {
			fetchTransactions({
				variables: { filter: { network: "ALL" } },
			});
			setFilter({ ...network });
		} else {
			fetchTransactions({
				variables: { filter: { network: e.target.value } },
			});
			setFilter({ ...networkOptions, [network]: !filter[network] });
		}
	}

	function searching(data) {
		return data.filter((item) => {
			if (
				item.recipient
					.toLowerCase()
					.includes(searchInput.trim().toLowerCase())
			) {
				return item;
			}
			return "";
		});
	}
	function handleExtraInput(e, key) {
		if (key === "amount") {
			setExtraFilter({ ...extraFilter, [key]: Number(e.target.value) });
		} else {
			setExtraFilter({ ...extraFilter, [key]: e.target.value });
		}
	}

	function extraInputSubmitHandler(e) {
		e.preventDefault();

		let currentActiveNetWork;
		const networks = filter;
		for (let net in networks) {
			if (networks[net] === true && net !== "ALL") {
				currentActiveNetWork = net;
			}
		}
		if (currentActiveNetWork) {
			fetchTransactions({
				variables: {
					filter: { ...extraFilter, network: currentActiveNetWork },
				},
			});
		} else {
			fetchTransactions({
				variables: {
					filter: { ...extraFilter },
				},
			});
		}

		setModalToggle(false);
	}

	function clearFilter() {
		setExtraFilter({ ...extrafilter });
		fetchTransactions({
			variables: { filter: { network: "ALL" } },
		});
		setSearchInput("");
		setFilter({ ...networkOptions });

		setModalToggle(false);
	}

	function groupByDate(data) {
		// const res = {"2022-07-03" : [], "2022-07-03" : []}
		let res = {};
		for (let element of data) {
			if (res[element.date] === undefined) {
				res[element.date] = [element];
			} else {
				res[element.date] = [...res[element.date], element];
			}
		}

		return res;
	}

	return (
		<>
			<StyledDiv>
				<Modal
					modalToggle={modalToggle}
					closeHandler={() => setModalToggle(false)}
				>
					<StyledForm>
						<form onSubmit={extraInputSubmitHandler}>
							<div className="slider">
								<label htmlFor="amount">min amount (₦): </label>

								<div>
									<input
										type="range"
										id="amount"
										max="10000"
										value={extraFilter.amount}
										onChange={(e) =>
											handleExtraInput(e, "amount")
										}
									/>
									<span>₦ {extraFilter.amount}</span>
								</div>
							</div>

							<StyledRadio>
								<RadioInput
									info={"ALL"}
									handleExtraInput={handleExtraInput}
									extraFilter={extraFilter}
								/>
								<RadioInput
									info={"SUCCESS"}
									handleExtraInput={handleExtraInput}
									extraFilter={extraFilter}
								/>
								<RadioInput
									info={"FAILED"}
									handleExtraInput={handleExtraInput}
									extraFilter={extraFilter}
								/>
							</StyledRadio>

							<div className="date-input">
								<label htmlFor="date">Date From: </label>
								<input
									type="date"
									id="date"
									onChange={(e) =>
										handleExtraInput(e, "date")
									}
									value={extraFilter.date}
								/>
							</div>
							<div className="buttons">
								<button type="submit">Submit</button>
								<button onClick={clearFilter} type="button">
									Clear Filter
								</button>
							</div>
						</form>
					</StyledForm>
				</Modal>
				<div className="search-filter-container">
					<input
						placeholder="Search by receipient "
						value={searchInput}
						onChange={(e) => setSearchInput(e.target.value)}
						className="search-input"
					/>
				</div>

				<StyledCheck>
					<CheckBoxInput
						info={"ALL"}
						handleNetworkChange={handleNetworkChange}
						filter={filter}
						imglink={"./images/all.png"}
					/>

					<CheckBoxInput
						info={"AIRTEL"}
						handleNetworkChange={handleNetworkChange}
						filter={filter}
						imglink={"./images/airtel.jpeg"}
					/>

					<CheckBoxInput
						info={"GLO"}
						handleNetworkChange={handleNetworkChange}
						filter={filter}
						imglink={"./images/glo.jpeg"}
					/>
					<CheckBoxInput
						info={"ETISALAT"}
						handleNetworkChange={handleNetworkChange}
						filter={filter}
						imglink={"./images/9mobile.jpeg"}
					/>
					<CheckBoxInput
						info={"MTN"}
						handleNetworkChange={handleNetworkChange}
						filter={filter}
						imglink={"./images/mtn.png"}
					/>

					<button
						onClick={() => setModalToggle(true)}
						className="more-filters"
					>
						<span>
							<svg
								focusable="false"
								viewBox="0 0 24 24"
								aria-hidden="true"
								className="more-filters-icon"
							>
								<path d="M3 17v2h6v-2H3zM3 5v2h10V5H3zm10 16v-2h8v-2h-8v-2h-2v6h2zM7 9v2H3v2h4v2h2V9H7zm14 4v-2H11v2h10zm-6-4h2V7h4V5h-4V3h-2v6z"></path>
							</svg>
						</span>
						More Flters
					</button>
				</StyledCheck>
				<div>
					{data &&
						transactionData === undefined &&
						Object.keys(groupByDate(data.transactions)).map(
							(date) => {
								if (
									groupByDate(data.transactions)[date]
										.length < 1
								)
									return "";
								return (
									<StyledInfo>
										<p className="date">
											{convertDate(date)}{" "}
											<span className="line"></span>
										</p>

										{searching(
											groupByDate(data.transactions)[date]
										).map((transaction) => {
											return (
												<TransactionInfo
													transaction={transaction}
													date={date}
												/>
											);
										})}
									</StyledInfo>
								);
							}
						)}

					{transactionData &&
						Object.keys(
							groupByDate(transactionData.transactions)
						).map((date) => {
							if (
								groupByDate(transactionData.transactions)[date]
									.length < 1
							)
								return "";
							return (
								<StyledInfo>
									<p className="date">
										{convertDate(date)}{" "}
										<span className="line"></span>
									</p>
									{searching(
										groupByDate(
											transactionData.transactions
										)[date]
									).map((transaction) => {
										return (
											<TransactionInfo
												transaction={transaction}
												date={date}
											/>
										);
									})}
								</StyledInfo>
							);
						})}
				</div>
			</StyledDiv>
		</>
	);
};

export default TransactionsPage;

const StyledDiv = styled.div`
	padding: 0 8px;
	max-width: 800px;
	margin: 0 auto;
	.date {
		display: flex;
		gap: 16px;
		align-items: center;
		justify-content: space-between;
		font-size: 1.5rem;
		font-weight: 500;
		.line {
			display: inline-block;
			height: 1px;
			background: blue;
			flex: 1;
		}
	}

	.search-filter-container {
		margin-top: 72px;
		.search-input {
			font-size: 1.1rem;
			border: 1px solid grey;
			border-radius: 20px;
			padding: 8px;
			padding-left: 18px;
			width: 90%;
			max-width: 500px;
			margin: 0 auto;
			display: block;

			& {
				padding-left: 40px;
				background: url("./images/search.png") no-repeat left;
				background-size: 20px;
				background-position: 3% 50%;
			}
		}

		.search-input:focus {
			outline: none;
			border: 1px solid transparent;
			box-shadow: 0px 0px 3px black;
		}
	}

	.time {
		font-size: 0.8rem;
		display: block;
	}

	input,
	label {
		cursor: pointer;
	}

	button {
		box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
		transition: 0.25s;
		cursor: pointer;
	}
	button:hover,
	button:focus {
		border-color: rgb(132, 79, 252);
	}
`;

const StyledCheck = styled.div`
	display: flex;
	flex-wrap: wrap;
	gap: 20px;
	justify-content: center;
	margin: 32px 0;

	.more-filters {
		align-self: center;
		padding: 12px;
		border-radius: 16px;
		border: 0;
		cursor: pointer;
		display: flex;
		align-items: center;

		gap: 4px;
		.more-filters-icon {
			height: 20px;
			width: 20px;
		}
	}
`;

const StyledInfo = styled.div`
	margin: 16px 0;
	.transaction-info:not(:last-child) {
		border-bottom: 1px solid;
	}
`;

const StyledForm = styled.div`
	.slider {
		label {
			display: block;
		}

		input {
			width: 80%;
			max-width: 350px;
		}

		& > div {
			display: flex;
			justify-content: space-between;
			padding-right: 8px;
		}
		margin: 24px 0;
	}

	.date-input {
		margin: 24px 0;
		label {
			display: block;
			margin-bottom: 8px;
		}
		input {
			width: 65%;
			display: block;
		}
	}

	.buttons {
		display: flex;
		justify-content: space-between;
		margin-top: 32px;
		button {
			border: 0;
			padding: 8px;
			border-radius: 8px;
		}
	}
`;

const StyledRadio = styled.div`
	display: flex;
	justify-content: space-between;
	padding: 0 8px;

	input {
		width: 20px;
		height: 20px;
		display: inline-block;
		margin-right: 4px;
	}
`;
