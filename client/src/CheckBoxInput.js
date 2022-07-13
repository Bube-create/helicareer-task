import React from "react";
import styled from "styled-components";

const CheckBoxInput = ({ info, imglink, handleNetworkChange, filter }) => {
	return (
		<StyledDiv img={imglink}>
			<input
				name="network"
				value={info}
				type="checkbox"
				id={info}
				checked={filter[info]}
				onChange={handleNetworkChange}
			/>
			<label htmlFor={info}>{info}</label>
		</StyledDiv>
	);
};

export default CheckBoxInput;

const StyledDiv = styled.div`
	width: 80px;
	input {
		display: none;
	}

	label {
		cursor: pointer;
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		font-size: 0.8rem;
		font-weight: 500;
	}

	input:checked + label:before {
		border: 3px solid blue;
		opacity: 1;
	}

	label:before {
		content: "";
		display: block;
		height: 65px;
		width: 65px;
		background-image: url(${(props) => props.img});
		background-position: center;
		background-repeat: no-repeat;
		background-size: 65px 65px;
		border-radius: 50%;
		opacity: 0.7;
	}
`;
