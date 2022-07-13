const { gql } = require("apollo-server");

const typeDefs = gql`
	type Transaction {
		id: ID!
		date: String!
		network: Providers!
		transactionStatus: Status!
		recipient: String!
		amount: Int!
		time: String!
	}

	input TransactionFilter {
		amount: Int
		transactionStatus: Status
		date: String
		network: Providers
	}

	type Query {
		transactions(filter: TransactionFilter): [Transaction!]!
	}

	# had to use etisalat because numbers cant start enum names
	enum Providers {
		ALL
		AIRTEL
		MTN
		GLO
		ETISALAT
	}

	enum Status {
		SUCCESS
		FAILED
		ALL
	}
`;

module.exports = { typeDefs };
