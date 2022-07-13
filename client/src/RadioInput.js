const RadioInput = ({ info, handleExtraInput, extraFilter }) => {
	return (
		<div>
			{" "}
			<input
				type="radio"
				id={info}
				name="transactionStatus"
				value={info}
				checked={extraFilter.transactionStatus === info}
				onChange={(e) => handleExtraInput(e, "transactionStatus")}
			/>
			<label htmlFor={info}>{info}</label>
		</div>
	);
};

export default RadioInput;
