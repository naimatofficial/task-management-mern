import Loader from "../components/Loader";
import UserTable from "../components/User/UserTable";
import { useGetUsersQuery } from "../redux/userSlice";

const HomePage = () => {
	const { data: users, isLoading, refetch } = useGetUsersQuery({});

	return (
		<div className="container mx-auto py-2 px-4 bg-gray-50">
			{isLoading ? (
				<Loader />
			) : users && users?.doc ? (
				<UserTable users={users?.doc} refetch={refetch} />
			) : (
				<p>Users not found!</p>
			)}
		</div>
	);
};

export default HomePage;
