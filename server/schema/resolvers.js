const { MockData } = require("../MockData");

function amountChecker(MockDataArray, filterAmount) {
	if (Number(filterAmount) === 0) return MockDataArray;
	return MockDataArray.filter(
		(items) => items.amount >= Number(filterAmount)
	);
}

function dateChecker(MockDataArray, filterDate) {
	if (filterDate === "") return MockDataArray;
	return MockDataArray.filter((items) => items.date >= filterDate);
}

function networkChecker(MockDataArray, filterNetwork) {
	return MockDataArray.filter((items) => items.network === filterNetwork);
}

function transactionStatusChecker(MockDataArray, filterTransactionStatus) {
	if (filterTransactionStatus === "ALL") return MockDataArray;
	return MockDataArray.filter(
		(items) => items.transactionStatus === filterTransactionStatus
	);
}

const resolvers = {
	Query: {
		transactions: (parent, args) => {
			console.log(args);
			// console.log(Object.keys(args), "asdasd");

			if (args === {}) {
				return MockData;
			}
			if (args.filter && Object.keys(args.filter).length >= 1) {
				let moddedArray = [];
				let moddedArrayUsed = false; //doing this because moddedArray could return an empty array if none of the elements passed it condition

				for (let keys of Object.keys(args.filter)) {
					switch (keys) {
						case "amount":
							if (moddedArray.length <= 0) {
								moddedArray = amountChecker(
									MockData,
									args.filter[keys]
								);
								moddedArrayUsed = true;
							} else {
								moddedArray = amountChecker(
									moddedArray,
									args.filter[keys]
								);
							}

							break;
						case "transactionStatus":
							if (moddedArray.length <= 0) {
								moddedArray = transactionStatusChecker(
									MockData,
									args.filter[keys]
								);
								moddedArrayUsed = true;
							} else {
								moddedArray = transactionStatusChecker(
									moddedArray,
									args.filter[keys]
								);
							}
							break;
						case "network":
							if (moddedArray.length <= 0) {
								if (args.filter.network === "ALL") {
									return MockData;
								}
								moddedArray = networkChecker(
									MockData,
									args.filter[keys]
								);
								moddedArrayUsed = true;
							} else {
								moddedArray = networkChecker(
									moddedArray,
									args.filter[keys]
								);
							}
							break;
						case "date":
							if (moddedArray.length <= 0) {
								moddedArray = dateChecker(
									MockData,
									args.filter[keys]
								);
								moddedArrayUsed = true;
							} else {
								moddedArray = dateChecker(
									moddedArray,
									args.filter[keys]
								);
							}
							break;
						default:
							break;
					}

					if (moddedArrayUsed && moddedArray.length < 1) {
						return [];
					}
				}

				return moddedArray;
			} else {
				return MockData;
			}
		},
	},
};

module.exports = { resolvers };
