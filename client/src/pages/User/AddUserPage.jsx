import UserForm from "../../components/User/UserForm";

const AddUserPage = () => {
	const handleSubmit = (values) => {
		console.log("Updating task:", values);
		// Call API to update task
	};

	return (
		<div className="max-w mx-auto mt-10">
			<h1 className="text-2xl font-bold mb-4">Create New User</h1>
			<UserForm mode="add" onSubmit={handleSubmit} />
		</div>
	);
};

export default AddUserPage;
