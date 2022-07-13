var months = [
	"Jan",
	"Feb",
	"Mar",
	"Apr",
	"May",
	"Jun",
	"Jul",
	"Aug",
	"Sept",
	"Oct",
	"Nov",
	"Dec",
];
const imageLink = {
	AIRTEL: "./images/airtel.jpeg",
	GLO: "./images/glo.jpeg",
	MTN: "./images/mtn.png",
	ETISALAT: "./images/9mobile.jpeg",
};

function convertDate(date_str) {
	let temp_date = date_str.split("-");
	return (
		temp_date[2] +
		" " +
		months[Number(temp_date[1]) - 1] +
		" " +
		temp_date[0]
	);
}

function converTimeToAMPm(timeString) {
	const timeString12hr = new Date(
		"1970-01-01T" + timeString + "Z"
	).toLocaleTimeString("en-US", {
		timeZone: "UTC",
		hour12: true,
		hour: "numeric",
		minute: "numeric",
	});

	return timeString12hr;
}

export { convertDate, imageLink, converTimeToAMPm };
