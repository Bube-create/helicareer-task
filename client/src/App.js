import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import styled from "styled-components";
import TransactionsPage from "./TransactionsPage";

function App() {
	const client = new ApolloClient({
		cache: new InMemoryCache(),
		uri: "http://localhost:4000/graphql",
	});

	return (
		<ApolloProvider client={client}>
			<div className="App">
				<StyledHeader>Sub For Me Transaction History</StyledHeader>
				<TransactionsPage />
			</div>
		</ApolloProvider>
	);
}

export default App;

const StyledHeader = styled.h1`
	text-align: center;
	padding-top: 40px;
`;
