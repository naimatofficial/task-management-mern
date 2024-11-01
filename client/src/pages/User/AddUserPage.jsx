import { message } from "antd";
import UserForm from "../../components/User/UserForm";
import { useCreateUserMutation } from "../../redux/slice/userSlice";
import { useNavigate } from "react-router-dom";

const AddUserPage = () => {
	const [createUser] = useCreateUserMutation();

	const navigate = useNavigate();

	const handleSubmit = async (values) => {
		try {
			await createUser(values).unwrap();
			message.success("User added successfully");
			navigate("/users");
		} catch (error) {
			console.error("Failed to create user:", error);
			message.error(error?.data?.message);
		}
	};
	return (
		<div className="max-w mx-auto mt-10">
			<h1 className="text-2xl font-bold mb-4">Create New User</h1>
			<UserForm mode="add" onSubmit={handleSubmit} />
		</div>
	);
};

export default AddUserPage;
