import styled from "styled-components";

//parent component handles all the state
const Modal = ({ modalToggle, closeHandler, children }) => {
	return (
		<>
			{modalToggle && (
				<ModalBackGround onClick={closeHandler}>
					<ModalBody onClick={(e) => e.stopPropagation()}>
						<button onClick={closeHandler} className="close-btn">
							<img src="./images/cancel.png" alt="close" />
						</button>
						{children}
					</ModalBody>
				</ModalBackGround>
			)}
		</>
	);
};
export default Modal;

const ModalBackGround = styled.div`
	position: fixed;
	z-index: 1;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
	overflow: auto;
	background-color: rgba(0, 0, 0, 0.5);
`;

const ModalBody = styled.div`
	background: white;
	border-radius: 8px;
	padding: 20px;
	margin: 10% auto;
	max-width: 500px;

	.close-btn {
		border: 0;
		background: none;
		box-shadow: none;
		img {
			width: 25px;
		}
	}
`;
