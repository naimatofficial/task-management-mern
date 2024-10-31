const Step3 = ({ formValues }) => {
	return (
		<div className="bg-white p-6 rounded-lg shadow-md w-1/2 mx-auto mt-8">
			<h3 className="text-2xl font-semibold mb-4 text-gray-800">
				Review Your Details
			</h3>
			<div className="space-y-3">
				<p className="text-gray-700">
					<strong className="font-medium text-gray-900">Name:</strong>{" "}
					{formValues.firstName} {formValues.lastName}
				</p>
				<p className="text-gray-700">
					<strong className="font-medium text-gray-900">Email:</strong>{" "}
					{formValues.email}
				</p>
				<p className="text-gray-700">
					<strong className="font-medium text-gray-900">Address:</strong>{" "}
					{formValues.address}
				</p>
				<p className="text-gray-700">
					<strong className="font-medium text-gray-900">Phone:</strong>{" "}
					{formValues.phone}
				</p>
			</div>
		</div>
	);
};

export default Step3;
