import { message } from "antd";
import UserForm from "../../components/User/UserForm";
import { useNavigate, useParams } from "react-router-dom";
import {
	useGetUserDetailsQuery,
	useUpdateUserMutation,
} from "../../redux/slice/userSlice";
import Loader from "../../components/shared/Loader";
import useAuth from "../../hooks/useAuth";

const EditUserPage = () => {
	const { id } = useParams();
	const {
		data: user,
		isLoading: userLoading,
		refetch,
	} = useGetUserDetailsQuery(id, {
		skip: !id,
	});

	const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation({});

	const navigate = useNavigate();
	const member = useAuth();

	const isAdmin = member?.role === "admin";

	const handleSubmit = async (values) => {
		try {
			await updateUser({ id, ...values }).unwrap();
			message.success("User updated successfully");
			refetch();

			isAdmin ? navigate("/users") : navigate(`/users/profile`);
		} catch (error) {
			console.error("Failed to update User:", error);
			message.error(error?.data?.message);
		}
	};

	return userLoading ? (
		<Loader />
	) : (
		<div className="max-w mx-auto mt-10">
			<h1 className="text-2xl font-bold mb-4">Edit User</h1>
			{user && user?.doc ? (
				<UserForm
					mode="edit"
					onSubmit={handleSubmit}
					isLoading={isUpdating}
					initialValues={user?.doc}
				/>
			) : (
				<p>User details not found!</p>
			)}
		</div>
	);
};

export default EditUserPage;
