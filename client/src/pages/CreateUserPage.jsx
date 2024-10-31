import { useEffect, useState } from "react";
import MultiStepForm from "../components/Multisteps/MultiStepForm";
import Loader from "../components/Loader";

const CreateUserPage = () => {
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		// Simulate a loader with a 0.2 second delay
		const timer = setTimeout(() => {
			setLoading(false);
		}, 200);

		// Clean up the timer if the component unmounts
		return () => clearTimeout(timer);
	}, []);

	return loading ? (
		<Loader />
	) : (
		<div>
			<MultiStepForm />
		</div>
	);
};

export default CreateUserPage;
