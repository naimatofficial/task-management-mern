import { useEffect, useState } from "react";

const DateTime = () => {
	const [dateTime, setDateTime] = useState(new Date());

	useEffect(() => {
		const timer = setInterval(() => {
			setDateTime(new Date());
		}, 1000);
		return () => clearInterval(timer);
	}, []);

	const formatDate = dateTime.toLocaleDateString("en-US", {
		weekday: "long",
		year: "numeric",
		month: "long",
		day: "numeric",
	});

	const formatTime = dateTime.toLocaleTimeString("en-US", {
		hour: "2-digit",
		minute: "2-digit",
		second: "2-digit",
	});

	return (
		<div className="flex items-center justify-center flex-col p-4 bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-lg shadow-lg w-full mb-4">
			<div className="text-3xl font-bold mb-2">{formatTime}</div>
			<div className="text-lg font-medium">{formatDate}</div>
		</div>
	);
};

export default DateTime;
