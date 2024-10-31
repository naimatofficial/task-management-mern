import { useNavigate, useParams } from "react-router-dom";
import {
	useGetUserDetailsQuery,
	useUpdateUserMutation,
} from "../redux/slice/userSlice";
import UserEditForm from "../components/User/UserEditForm";
import Loader from "../components/Loader";
import { message } from "antd";

const UserEditPage = () => {
	const { id } = useParams();
	const {
		data: user,
		isLoading: userDetailsLoading,
		refetch,
	} = useGetUserDetailsQuery(id, { skip: !id });

	const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();

	const navigate = useNavigate();

	const handleFormSubmit = async (values) => {
		try {
			if (values && id) {
				const user = { ...values, id };
				await updateUser(user).unwrap();
				navigate("/");
				refetch();
				message.success("User updated successfully.");
			}
		} catch (error) {
			console.log(`User not updated`, error);
			message.error(error?.data?.message);
		}
	};

	return userDetailsLoading ? (
		<Loader />
	) : user && user?.doc ? (
		<div className="w-1/2 mx-auto p-8 bg-gray-50 shadow-md">
			<h2 className="text-2xl text-gray-900 font-bold">Edit User Details</h2>
			{isUpdating ? (
				<Loader />
			) : (
				<UserEditForm initialValues={user?.doc} onFinish={handleFormSubmit} />
			)}
		</div>
	) : (
		<h2>User Details not found!</h2>
	);
};

export default UserEditPage;
