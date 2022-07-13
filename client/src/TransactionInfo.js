import styled from "styled-components";
import { converTimeToAMPm, imageLink } from "./utils";

const TransactionInfo = ({ transaction, date }) => {
	return (
		<StyledDiv className="transaction-info">
			<div className="transaction-info-main">
				<img src={imageLink[transaction.network]} alt="network" />
				<div>
					<div>
						<span className="recipient">
							{transaction.recipient}
						</span>
						<span className="time">
							{converTimeToAMPm(transaction.time)}
						</span>
					</div>

					<div className="amount">
						<p>₦ {transaction.amount}</p>

						<p className={transaction.transactionStatus}>
							{transaction.transactionStatus}
						</p>
					</div>
				</div>
			</div>
		</StyledDiv>
	);
};

export default TransactionInfo;

const StyledDiv = styled.div`
	padding: 16px 0;
	img {
		width: 50px;
		height: 50px;
		border-radius: 50%;
	}

	.transaction-info-main {
		display: flex;
		align-items: center;

		& > div {
			display: flex;

			width: 100%;
			justify-content: space-between;
			padding-left: 12px;
		}

		.amount {
			display: flex;
			flex-direction: column;
			gap: 4px;
			align-items: center;
		}
	}
	.recipient {
		font-size: 1.2rem;
		font-weight: 500;
		text-transform: uppercase;
		display: block;
	}

	.FAILED {
		background: red;
		padding: 6px;
		color: white;
		font-weight: 500;
		border-radius: 4px;
	}

	.SUCCESS {
		background: green;
		padding: 6px;
		color: white;
		font-weight: 500;
		border-radius: 4px;
	}
`;
